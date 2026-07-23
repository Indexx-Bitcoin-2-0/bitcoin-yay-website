import { API_BASE_URL } from "@/lib/api-config";

export type SocialCampaignApp = "bitcoinyay" | "emmm";
export type SocialCampaignStatus = "pending" | "approved" | "rejected";

export interface CampaignSubmission {
  status: SocialCampaignStatus;
  submittedAt: string;
  rejectionReason?: string;
  rewardDays?: number;
  rewardGranted?: boolean;
}

const PRESIGN_ENDPOINT = `${API_BASE_URL}/api/v1/social-campaign/presign`;
const SUBMISSIONS_ENDPOINT = `${API_BASE_URL}/api/v1/social-campaign/submissions`;
const MY_SUBMISSION_ENDPOINT = `${API_BASE_URL}/api/v1/social-campaign/submissions/me`;

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

const unwrapApiData = (value: unknown): Record<string, unknown> =>
  asRecord(asRecord(value).data);

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

export const requestPresignedUpload = async (
  app: SocialCampaignApp,
  mimeType: string
): Promise<{ uploadUrl: string; key: string }> => {
  const response = await fetch(PRESIGN_ENDPOINT, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ app, mimeType }),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to prepare upload."));
  }

  const data = unwrapApiData(payload);
  return {
    uploadUrl: String(data.uploadUrl ?? ""),
    key: String(data.key ?? ""),
  };
};

const uploadFileToS3 = async (uploadUrl: string, file: File): Promise<void> => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error(`Failed to upload ${file.name}.`);
  }
};

export const uploadImagesForApp = async (
  app: SocialCampaignApp,
  files: File[]
): Promise<string[]> => {
  const keys: string[] = [];
  for (const file of files) {
    const { uploadUrl, key } = await requestPresignedUpload(app, file.type);
    await uploadFileToS3(uploadUrl, file);
    keys.push(key);
  }
  return keys;
};

export const getMySubmission = async (): Promise<CampaignSubmission | null> => {
  const response = await fetch(MY_SUBMISSION_ENDPOINT, {
    headers: authHeaders(),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to load your submission."));
  }

  const data = asRecord(payload).data;
  if (!data) return null;

  const record = asRecord(data);
  return {
    status: record.status as SocialCampaignStatus,
    submittedAt: String(record.submittedAt ?? ""),
    rejectionReason: record.rejectionReason ? String(record.rejectionReason) : undefined,
    rewardDays: record.rewardDays !== undefined ? Number(record.rewardDays) : undefined,
    rewardGranted: Boolean(record.rewardGranted),
  };
};

export const submitCampaign = async (params: {
  bitcoinyayImageKeys: string[];
  emmmImageKeys: string[];
}): Promise<CampaignSubmission> => {
  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(params),
  });
  const payload = await parseJsonSafe(response);
  if (isApiFailure(response, payload)) {
    throw new Error(getApiErrorMessage(payload, "Failed to submit your campaign entry."));
  }

  const record = unwrapApiData(payload);
  return {
    status: (record.status as SocialCampaignStatus) ?? "pending",
    submittedAt: String(record.submittedAt ?? new Date().toISOString()),
    rejectionReason: record.rejectionReason ? String(record.rejectionReason) : undefined,
  };
};
