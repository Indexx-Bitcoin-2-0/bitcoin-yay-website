import { API_BASE_URL } from "@/lib/api-config";
import { getUserMiningBalance, getUserWalletBalance } from "@/lib/alchemy";

export type KycStatus = "approved" | "pending" | "missing" | "unknown";
export type TransferSource = "mined" | "withdrawn";

export interface TransferRecipient {
  id: string;
  name: string;
  email: string;
  kycStatus: KycStatus;
}

export interface TransferRulesCheck {
  isOwner: boolean;
  senderKyc: KycStatus;
  minedBalance: number;
  withdrawnBalance: number;
  referralCount: number;
}

export interface SubmitTransferResult {
  transactionId: string;
  amount: number;
  recipientEmail: string;
}

export const MIN_TRANSFER_NUGGETS = 5000;
export const MIN_TRANSFER_REFERRALS = 25;

const TRANSFER_ENDPOINT = `${API_BASE_URL}/api/v1/mining/nuggets/transfer`;
const REFERRALS_ENDPOINT = `${API_BASE_URL}/api/v1/inex/user/referrals`;
const PROFILE_ENDPOINT = `${API_BASE_URL}/api/v1/inex/user/getProfileDetails`;
const USER_DETAILS_ENDPOINT = `${API_BASE_URL}/api/v1/inex/user/getUserDetails`;

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("bitcoinYayAuth") || "{}")
      .access_token;
  } catch {
    return window.localStorage.getItem("access_token");
  }
};

const authHeaders = (): HeadersInit => {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseJsonSafe = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const unwrapApiData = (value: unknown): Record<string, unknown> => {
  let current = asRecord(value);
  for (let index = 0; index < 3; index += 1) {
    const nested = current.data;
    if (!nested || typeof nested !== "object" || Array.isArray(nested)) break;
    current = asRecord(nested);
  }
  return current;
};

const getApiErrorMessage = (payload: unknown, fallback: string) => {
  const record = asRecord(payload);
  const data = record.data;
  const dataRecord = asRecord(data);

  if (typeof payload === "string") return payload;
  if (typeof data === "string") return data;
  return String(record.message || dataRecord.message || record.error || fallback);
};

const isApiFailure = (response: Response, payload: unknown): boolean => {
  const status = Number(asRecord(payload).status);
  return !response.ok || (Number.isFinite(status) && status >= 400);
};

const toSafeNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeKycStatus = (raw: unknown): KycStatus => {
  const value = String(raw ?? "").toLowerCase().trim();
  if (
    ["approved", "verified", "success", "completed", "complete", "true", "passed"].includes(
      value
    )
  ) {
    return "approved";
  }
  if (["pending", "processing", "in_review", "submitted"].includes(value)) {
    return "pending";
  }
  if (["missing", "none", "unverified", "rejected", "false", ""].includes(value)) {
    return "missing";
  }
  return "unknown";
};

const extractKycStatus = (profile: unknown): KycStatus => {
  const profileRecord = asRecord(profile);
  const profileData = asRecord(profileRecord.data);
  const profileKyc = asRecord(profileRecord.kyc);
  const profileDataKyc = asRecord(profileData.kyc);
  const payload =
    profileData.user ??
    profileData.userDetails ??
    profileRecord.data ??
    profileRecord.user ??
    profileRecord.userDetails ??
    profile ??
    {};
  const payloadRecord = asRecord(payload);
  const payloadKyc = asRecord(payloadRecord.kyc);

  const statusCandidate =
    payloadRecord.kycStatus ??
    payloadRecord.kyc_status ??
    payloadKyc.status ??
    profileRecord.kycStatus ??
    profileData.kycStatus ??
    profileRecord.kyc_status ??
    profileData.kyc_status ??
    profileKyc.status ??
    profileDataKyc.status;

  const normalizedStatus = normalizeKycStatus(statusCandidate);
  if (normalizedStatus === "approved" || normalizedStatus === "pending") {
    return normalizedStatus;
  }

  const isKycPass =
    typeof payloadRecord.isKYCPass === "boolean"
      ? payloadRecord.isKYCPass
      : typeof profileRecord.isKYCPass === "boolean"
        ? profileRecord.isKYCPass
        : typeof profileData.isKYCPass === "boolean"
          ? profileData.isKYCPass
          : typeof payloadRecord.isKycVerified === "boolean"
            ? payloadRecord.isKycVerified
            : typeof profileRecord.isKycVerified === "boolean"
              ? profileRecord.isKycVerified
              : typeof profileData.isKycVerified === "boolean"
                ? profileData.isKycVerified
                : undefined;

  if (isKycPass === true) return "approved";
  if (isKycPass === false) return normalizedStatus === "missing" ? "missing" : "unknown";

  return normalizedStatus;
};

const mergeKycStatus = (primary: KycStatus, fallback: KycStatus): KycStatus => {
  if (primary === "approved" || fallback === "approved") return "approved";
  if (primary === "pending" || fallback === "pending") return "pending";
  if (primary === "missing" || fallback === "missing") return "missing";
  return "unknown";
};

const getUserProfile = async (email: string) => {
  const response = await fetch(`${PROFILE_ENDPOINT}/${encodeURIComponent(email)}`, {
    headers: authHeaders(),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to load user profile."));
  }
  return payload;
};

const getUserDetails = async (email: string) => {
  const response = await fetch(`${USER_DETAILS_ENDPOINT}/${encodeURIComponent(email)}`, {
    method: "POST",
    headers: authHeaders(),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to load user details."));
  }
  return payload;
};

export const getKycStatusForEmail = async (email: string): Promise<KycStatus> => {
  if (!email) return "unknown";
  try {
    const profile = await getUserProfile(email);
    const profileStatus = extractKycStatus(profile);
    if (profileStatus === "approved") return profileStatus;

    const details = await getUserDetails(email);
    return mergeKycStatus(profileStatus, extractKycStatus(details));
  } catch {
    return "unknown";
  }
};

export const getReferralRecipients = async (
  email: string
): Promise<{ recipients: TransferRecipient[]; count: number }> => {
  if (!email) return { recipients: [], count: 0 };

  const response = await fetch(`${REFERRALS_ENDPOINT}/${encodeURIComponent(email)}`, {
    headers: authHeaders(),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to load referral members."));
  }

  const data = unwrapApiData(payload);
  const members = Array.isArray(data.userDetails)
    ? (data.userDetails as Array<Record<string, unknown>>)
    : [];
  const count = Number.isFinite(Number(data.count)) ? Number(data.count) : members.length;

  const recipients = await Promise.all(
    members
      .filter((member) => {
        const memberEmail = String(member.email ?? "").trim();
        return memberEmail && memberEmail.toLowerCase() !== email.toLowerCase();
      })
      .map(async (member, index): Promise<TransferRecipient> => {
        const memberEmail = String(member.email ?? "").trim();
        const directKyc = extractKycStatus(member);
        const kycStatus =
          directKyc === "approved" ? directKyc : await getKycStatusForEmail(memberEmail);
        return {
          id: String(member._id ?? member.id ?? memberEmail ?? index),
          name: String(member.userName ?? member.username ?? member.name ?? memberEmail),
          email: memberEmail,
          kycStatus,
        };
      })
  );

  return { recipients, count };
};

export const loadTransferRulesCheck = async (
  senderEmail: string,
  referralsOverride?: { count: number }
): Promise<TransferRulesCheck> => {
  const [miningBalance, walletBalance, referrals, senderKyc] = await Promise.all([
    getUserMiningBalance(senderEmail),
    getUserWalletBalance(senderEmail, "BTCY", "Stellar"),
    referralsOverride ?? getReferralRecipients(senderEmail),
    getKycStatusForEmail(senderEmail),
  ]);

  const minedBalance = toSafeNumber(miningBalance.data?.transferableBalance);
  const withdrawnBalance = toSafeNumber(walletBalance.data?.balance);

  return {
    isOwner: referrals.count >= MIN_TRANSFER_REFERRALS,
    senderKyc,
    minedBalance,
    withdrawnBalance,
    referralCount: referrals.count,
  };
};

export const submitNuggetTransfer = async (params: {
  senderEmail: string;
  recipientEmail: string;
  amount: number;
  source: TransferSource;
}): Promise<SubmitTransferResult> => {
  if (!params.senderEmail) throw new Error("Sender email is required.");
  if (!params.recipientEmail) throw new Error("Recipient email is required.");
  if (params.senderEmail.toLowerCase() === params.recipientEmail.toLowerCase()) {
    throw new Error("You cannot transfer Nuggets to your own account.");
  }
  if (!Number.isFinite(params.amount) || params.amount < MIN_TRANSFER_NUGGETS) {
    throw new Error(`Minimum transfer is ${MIN_TRANSFER_NUGGETS} Nuggets.`);
  }

  const response = await fetch(TRANSFER_ENDPOINT, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      senderEmail: params.senderEmail,
      recipientEmail: params.recipientEmail,
      amount: params.amount,
      source: params.source,
      client: "web",
      asset: "BTCY_NUGGET",
    }),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload) || asRecord(payload).success === false) {
    throw new Error(getApiErrorMessage(payload, "Failed to submit Nugget transfer."));
  }

  const data = unwrapApiData(payload);
  return {
    transactionId: String(data.transactionId ?? data.id ?? ""),
    amount: toSafeNumber(data.amount ?? params.amount),
    recipientEmail: String(data.recipientEmail ?? params.recipientEmail),
  };
};
