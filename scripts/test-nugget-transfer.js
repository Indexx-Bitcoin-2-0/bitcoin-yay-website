#!/usr/bin/env node

/**
 * Nugget transfer smoke test.
 *
 * Default mode is a safe preflight for sunkuomkarsai12121@gmail.com.
 * It checks referrals, KYC, mined balance, withdrawn Stellar BTCY balance, and
 * validates the requested recipient/source/amount. It does not submit a
 * transfer unless EXECUTE_TRANSFER=true is set.
 *
 * Examples:
 *   node scripts/test-nugget-transfer.js
 *   RECIPIENT_EMAIL=receiver@example.com node scripts/test-nugget-transfer.js
 *   BTCY_ACCESS_TOKEN=... RECIPIENT_EMAIL=receiver@example.com EXECUTE_TRANSFER=true node scripts/test-nugget-transfer.js
 */

const DEFAULT_API_BASE_URL = "https://api.v1.indexx.ai";
const API_BASE_URL = (
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  DEFAULT_API_BASE_URL
).replace(/\/$/, "");

const SENDER_EMAIL =
  process.env.SENDER_EMAIL || "sunkuomkarsai12121@gmail.com";
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "";
const AMOUNT = Number(process.env.AMOUNT || 5000);
const SOURCE = process.env.SOURCE || "mined";
const EXECUTE_TRANSFER = process.env.EXECUTE_TRANSFER === "true";
const ACCESS_TOKEN =
  process.env.BTCY_ACCESS_TOKEN || process.env.ACCESS_TOKEN || "";
const REQUEST_ORIGIN = process.env.REQUEST_ORIGIN || "https://www.bitcoinyay.com";

const MIN_TRANSFER_NUGGETS = 5000;
const MIN_TRANSFER_REFERRALS = 25;

const routes = {
  referrals: (email) =>
    `${API_BASE_URL}/api/v1/inex/user/referrals/${encodeURIComponent(email)}`,
  profile: (email) =>
    `${API_BASE_URL}/api/v1/inex/user/getProfileDetails/${encodeURIComponent(email)}`,
  details: (email) =>
    `${API_BASE_URL}/api/v1/inex/user/getUserDetails/${encodeURIComponent(email)}`,
  miningBalance: (email) =>
    `${API_BASE_URL}/api/v1/mining/getUserMiningBalance/BTCY/${encodeURIComponent(email)}`,
  walletBalance: (email) =>
    `${API_BASE_URL}/api/v1/inex/user/getBalance/${encodeURIComponent(email)}/BTCY/Stellar`,
  transfer: `${API_BASE_URL}/api/v1/mining/nuggets/transfer`,
};

const headers = () => ({
  "Content-Type": "application/json",
  Origin: REQUEST_ORIGIN,
  ...(ACCESS_TOKEN ? { Authorization: `Bearer ${ACCESS_TOKEN}` } : {}),
});

const asRecord = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value : {};

const unwrapApiData = (value) => {
  let current = asRecord(value);
  for (let index = 0; index < 3; index += 1) {
    const nested = current.data;
    if (!nested || typeof nested !== "object" || Array.isArray(nested)) break;
    current = asRecord(nested);
  }
  return current;
};

const toSafeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const parseJsonSafe = async (response) => {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { data: text };
  }
};

const apiErrorMessage = (payload, fallback) => {
  if (typeof payload === "string") return payload;
  if (typeof payload?.data === "string") return payload.data;
  return payload?.message || payload?.data?.message || payload?.error || fallback;
};

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers(),
      ...(options.headers || {}),
    },
  });
  const payload = await parseJsonSafe(response);
  const payloadStatus = Number(payload?.status);
  if (!response.ok || (Number.isFinite(payloadStatus) && payloadStatus >= 400)) {
    throw new Error(apiErrorMessage(payload, `${response.status} ${response.statusText}`));
  }
  return payload;
};

const normalizeKycStatus = (raw) => {
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

const extractKycStatus = (profile) => {
  const profileRecord = asRecord(profile);
  const profileData = asRecord(profileRecord.data);
  const profileKyc = asRecord(profileRecord.kyc);
  const profileDataKyc = asRecord(profileData.kyc);
  const payload =
    profileData.user ||
    profileData.userDetails ||
    profileRecord.data ||
    profileRecord.user ||
    profileRecord.userDetails ||
    profile ||
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

  const normalized = normalizeKycStatus(statusCandidate);
  if (normalized === "approved" || normalized === "pending") {
    return normalized;
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
  if (isKycPass === false) return normalized === "missing" ? "missing" : "unknown";
  return normalized;
};

const mergeKycStatus = (primary, fallback) => {
  if (primary === "approved" || fallback === "approved") return "approved";
  if (primary === "pending" || fallback === "pending") return "pending";
  if (primary === "missing" || fallback === "missing") return "missing";
  return "unknown";
};

const getKycStatusForEmail = async (email) => {
  try {
    const profile = await request(routes.profile(email));
    const profileStatus = extractKycStatus(profile);
    if (profileStatus === "approved") return profileStatus;

    const details = await request(routes.details(email), { method: "POST" });
    return mergeKycStatus(profileStatus, extractKycStatus(details));
  } catch (error) {
    return `unknown (${error.message})`;
  }
};

const getReferralData = async (email) => {
  const payload = await request(routes.referrals(email));
  const data = unwrapApiData(payload);
  const members = Array.isArray(data.userDetails) ? data.userDetails : [];
  const count = Number.isFinite(Number(data.count)) ? Number(data.count) : members.length;
  return { count, members };
};

const getMinedBalance = async (email) => {
  const payload = await request(routes.miningBalance(email));
  const data = unwrapApiData(payload);
  return toSafeNumber(data.transferableBalance);
};

const getWithdrawnBalance = async (email) => {
  const payload = await request(routes.walletBalance(email), { method: "POST" });
  const data = unwrapApiData(payload);
  return toSafeNumber(data.balance);
};

const submitTransfer = async ({ senderEmail, recipientEmail, amount, source }) =>
  request(routes.transfer, {
    method: "POST",
    body: JSON.stringify({
      senderEmail,
      recipientEmail,
      amount,
      source,
      client: "web",
      asset: "BTCY_NUGGET",
    }),
  });

const main = async () => {
  console.log("Nugget transfer smoke test");
  console.log("--------------------------------");
  console.log("API base:", API_BASE_URL);
  console.log("Sender:", SENDER_EMAIL);
  console.log("Recipient:", RECIPIENT_EMAIL || "(not provided)");
  console.log("Amount:", AMOUNT);
  console.log("Source:", SOURCE);
  console.log("Execute transfer:", EXECUTE_TRANSFER);
  console.log("Access token:", ACCESS_TOKEN ? "provided" : "not provided");
  console.log("Request origin:", REQUEST_ORIGIN);
  console.log("");

  if (!["mined", "withdrawn"].includes(SOURCE)) {
    throw new Error("SOURCE must be mined or withdrawn.");
  }
  if (!Number.isFinite(AMOUNT) || AMOUNT <= 0) {
    throw new Error("AMOUNT must be a positive number.");
  }

  const [referrals, senderKyc, minedBalance, withdrawnBalance] = await Promise.all([
    getReferralData(SENDER_EMAIL),
    getKycStatusForEmail(SENDER_EMAIL),
    getMinedBalance(SENDER_EMAIL),
    getWithdrawnBalance(SENDER_EMAIL),
  ]);

  const referralEmails = referrals.members
    .map((member) => String(member?.email || "").trim().toLowerCase())
    .filter(Boolean);
  const selectedBalance = SOURCE === "mined" ? minedBalance : withdrawnBalance;
  const recipientEmail = RECIPIENT_EMAIL.toLowerCase();
  const recipientIsReferral = recipientEmail
    ? referralEmails.includes(recipientEmail)
    : false;
  const recipientKyc = RECIPIENT_EMAIL
    ? await getKycStatusForEmail(RECIPIENT_EMAIL)
    : "not checked";

  console.log("Preflight");
  console.log("---------");
  console.log("Referral count:", referrals.count);
  console.log("Sender KYC:", senderKyc);
  console.log("Mined transferable balance:", minedBalance);
  console.log("Withdrawn Stellar BTCY balance:", withdrawnBalance);
  console.log("Selected source balance:", selectedBalance);
  console.log("Recipient is sender referral:", RECIPIENT_EMAIL ? recipientIsReferral : "not checked");
  console.log("Recipient KYC:", recipientKyc);
  console.log("");

  const failures = [];
  if (referrals.count < MIN_TRANSFER_REFERRALS) {
    failures.push(`sender needs at least ${MIN_TRANSFER_REFERRALS} referrals`);
  }
  if (senderKyc !== "approved") {
    failures.push("sender KYC is not approved");
  }
  if (AMOUNT < MIN_TRANSFER_NUGGETS) {
    failures.push(`amount is below ${MIN_TRANSFER_NUGGETS}`);
  }
  if (AMOUNT > selectedBalance) {
    failures.push(`amount exceeds selected ${SOURCE} balance`);
  }
  if (RECIPIENT_EMAIL && !recipientIsReferral) {
    failures.push("recipient is not in sender referrals");
  }
  if (RECIPIENT_EMAIL && recipientKyc !== "approved") {
    failures.push("recipient KYC is not approved");
  }

  if (!RECIPIENT_EMAIL) {
    const sampleRecipients = referrals.members
      .slice(0, 10)
      .map((member) => String(member?.email || "").trim())
      .filter(Boolean);
    console.log("No RECIPIENT_EMAIL provided. Sample referral emails:");
    sampleRecipients.forEach((email) => console.log("-", email));
    console.log("");
  }

  if (failures.length > 0) {
    console.log("Preflight result: FAIL");
    failures.forEach((failure) => console.log("-", failure));
  } else {
    console.log("Preflight result: PASS");
  }

  if (!EXECUTE_TRANSFER) {
    console.log("");
    console.log("Dry run only. Set EXECUTE_TRANSFER=true to submit a real transfer.");
    return;
  }

  if (!ACCESS_TOKEN) {
    throw new Error("BTCY_ACCESS_TOKEN or ACCESS_TOKEN is required to execute transfer.");
  }
  if (!RECIPIENT_EMAIL) {
    throw new Error("RECIPIENT_EMAIL is required to execute transfer.");
  }
  if (failures.length > 0) {
    throw new Error("Refusing to execute transfer because preflight failed.");
  }

  console.log("");
  console.log("Executing transfer...");
  const before = {
    senderMined: await getMinedBalance(SENDER_EMAIL),
    senderWithdrawn: await getWithdrawnBalance(SENDER_EMAIL),
    recipientMined: await getMinedBalance(RECIPIENT_EMAIL),
  };
  const transferResult = await submitTransfer({
    senderEmail: SENDER_EMAIL,
    recipientEmail: RECIPIENT_EMAIL,
    amount: AMOUNT,
    source: SOURCE,
  });
  const after = {
    senderMined: await getMinedBalance(SENDER_EMAIL),
    senderWithdrawn: await getWithdrawnBalance(SENDER_EMAIL),
    recipientMined: await getMinedBalance(RECIPIENT_EMAIL),
  };

  console.log("Transfer response:", JSON.stringify(transferResult, null, 2));
  console.log("Before balances:", before);
  console.log("After balances:", after);
};

main().catch((error) => {
  console.error("Test failed:", error.message || error);
  process.exitCode = 1;
});
