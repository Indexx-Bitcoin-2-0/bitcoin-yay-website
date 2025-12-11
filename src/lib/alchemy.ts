import {
  ALCHEMY_CREATE_API_ROUTE,
  ALCHEMY_COMPLETE_API_ROUTE,
  ALCHEMY_CONFIG_API_ROUTE,
  ALCHEMY_GET_USER_SUBSCRIPTION,
  GET_MINING_STATUS_API_ROUTE,
  ALCHEMY_PROCESS_API_ROUTE,
  ALCHEMY_COMPLETE_V2_API_ROUTE,
  ALCHEMY_SESSIONS_API_ROUTE,
  GET_USER_BTCY_BALANCE_API_ROUTE,
  GET_USER_MINING_BALANCE_API_ROUTE,
  GET_USER_WALLET_BALANCE_API_ROUTE,
} from "@/routes";

export const ALCHEMY_DISABLED = false;

export interface CreateAlchemyData {
  email: string;
  inputAmount: number;
  userType: "free" | "electric" | "quantum" | "nuclear" | "turbo";
}

export interface CreateAlchemyResponse {
  success: boolean;
  message?: string;
  status?: number;
  session?: {
    _id: string;
    sessionId: string;
    email: string;
    coinName: string;
    userType: string;
    inputAmount: number;
    multiplier: number;
    resultAmount: number;
    category: string;
    status: string;
    startedAt: string;
    notes: string;
    isJackpot: boolean;
    streakCount: number;
    referralCodeUsed: string;
    __v: number;
  };
  error?: string;
}

export interface CompleteAlchemyData {
  sessionId: string;
}

export interface CompleteAlchemyResponse {
  success: boolean;
  message?: string;
  status?: number;
  session?: {
    _id: string;
    sessionId: string;
    email: string;
    coinName: string;
    userType: string;
    inputAmount: number;
    multiplier: number;
    resultAmount: number;
    category: string;
    status: string;
    startedAt: string;
    notes: string;
    isJackpot: boolean;
    streakCount: number;
    referralCodeUsed: string;
    __v: number;
    completedAt: string;
    durationMinutes: number;
  };
  error?: string;
}

export interface ProcessAlchemyData {
  email: string;
  nuggetTokens: number;
  userType: string;
  referralCodeUsed?: string;
  nftBoostApplied?: boolean;
}

export type WithdrawalType = "indexx" | "solana" | "tron";

export interface CompleteAlchemyProcessData {
  sessionId: string;
  withdrawalType?: WithdrawalType;
  withdrawalAddress?: string;
}

export interface AlchemyProcessResponse {
  success: boolean;
  message?: string;
  status?: number;
  session?: AlchemySessionRecord;
  error?: string;
}

export interface AlchemyConfigItem {
  input: number;
  multiplierRange: string;
  probabilities: Record<string, number>;
}

export interface AlchemyConfigResponse {
  success: boolean;
  message?: string;
  status?: number;
  session?: {
    free: AlchemyConfigItem[];
    electric: AlchemyConfigItem[];
    turbo: AlchemyConfigItem[];
    nuclear: AlchemyConfigItem[];
    quantum: AlchemyConfigItem[];
  };
  error?: string;
}

/**
 * Gets the access token from localStorage
 */
function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("bitcoinYayAuth") || "{}")
    .access_token;
}

async function parseJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    const fallback =
      (await response.text().catch(() => "")) || "Unable to parse response body";
    console.error("parseJsonSafe fallback:", fallback, error);
    return { error: fallback };
  }
}
/**
 * Creates a new alchemy session
 */
export async function createAlchemy(
  data: CreateAlchemyData
): Promise<CreateAlchemyResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }

    const response = await fetch(ALCHEMY_CREATE_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(result.error || "Failed to start alchemy session");
    }

    return {
      success: true,
      message: result.message,
      status: result.status,
      session: result.session,
    };
  } catch (error) {
    console.error("Create alchemy error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to start alchemy session",
    };
  }
}

/**
 * Completes an alchemy session and gets the result
 */
export async function completeAlchemy(
  data: CompleteAlchemyData
): Promise<CompleteAlchemyResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("You need to login first to participate in alchemy");
    }

    const response = await fetch(ALCHEMY_COMPLETE_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(result.error || "Failed to complete alchemy session");
    }

    return {
      success: true,
      message: result.message,
      status: result.status,
      session: result.session,
    };
  } catch (error) {
    console.error("Complete alchemy error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to complete alchemy session",
    };
  }
}

/**
 * Processes a new click-and-convert Alchemy session using the v2 endpoint.
 */
const extractApiErrorMessage = (payload: any): string | null => {
  if (!payload) return null;
  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  if (Array.isArray(payload.messages) && payload.messages.length > 0) {
    return payload.messages.filter(Boolean).join(" ");
  }
  return null;
};

const formatAlchemyCooldownMessage = (message: string): string | null => {
  const match = message.match(/Next session available on ([\dTZ:\-+.]+)/i);
  if (!match || !match[1]) {
    return null;
  }

  const isoString = match[1].replace(/[.,;:]+$/, "");
  const nextAttempt = new Date(isoString);
  if (Number.isNaN(nextAttempt.getTime())) {
    return null;
  }

  let formattedDate: string;
  try {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
      timeZoneName: "short",
    }).format(nextAttempt);
  } catch {
    formattedDate = nextAttempt.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return message.includes("locked")
    ? `Alchemy sessions are currently locked. You can try again on ${formattedDate}.`
    : `Next session opens on ${formattedDate}.`;
};

export async function processAlchemyConversion(
  data: ProcessAlchemyData
): Promise<AlchemyProcessResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("You need to login first to participate in alchemy");
    }

    const response = await fetch(ALCHEMY_PROCESS_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...data,
        referralCodeUsed: data.referralCodeUsed ?? "",
        nftBoostApplied: data.nftBoostApplied ?? false,
      }),
    });

    const result = await parseJsonSafe(response);
    const sessionPayload = result.session ?? result.data ?? null;

    if (!response.ok) {
      const apiErrorMessage = extractApiErrorMessage(result);
      const formattedMessage = apiErrorMessage
        ? formatAlchemyCooldownMessage(apiErrorMessage) ?? apiErrorMessage
        : "Failed to process alchemy session";
      throw new Error(formattedMessage);
    }

    return {
      success: true,
      message: result.message ?? null,
      status: result.status ?? null,
      session: sessionPayload,
    };
  } catch (error) {
    console.error("Process alchemy error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process alchemy session",
    };
  }
}

/**
 * Completes a click-and-convert Alchemy session via the v2 endpoint.
 */
export async function completeAlchemyProcess(
  data: CompleteAlchemyProcessData
): Promise<AlchemyProcessResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("You need to login first to participate in alchemy");
    }

    const response = await fetch(ALCHEMY_COMPLETE_V2_API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        sessionId: data.sessionId,
        withdrawalType: data.withdrawalType ?? "indexx",
        withdrawalAddress: data.withdrawalAddress ?? "",
      }),
    });

    const result = await parseJsonSafe(response);
    const sessionPayload = result.session ?? result.data ?? null;

    if (!response.ok) {
      throw new Error(result.error || "Failed to complete alchemy session");
    }

    return {
      success: true,
      message: result.message,
      status: result.status,
      session: sessionPayload,
    };
  } catch (error) {
    console.error("Complete alchemy process error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to complete alchemy session",
    };
  }
}

/**
 * Fetches alchemy configuration for all types
 */
export async function getAlchemyConfig(): Promise<AlchemyConfigResponse> {
  try {
    const accessToken = getAccessToken();
    console.log("log", accessToken)
    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }

    const response = await fetch(ALCHEMY_CONFIG_API_ROUTE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await parseJsonSafe(response);
    console.log("result", result)
    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch alchemy config");
    }

    return {
      success: true,
      message: result.message,
      status: result.status,
      session: result.session,
    };
  } catch (error) {
    console.log("Get alchemy config error:", error);
    console.error("Get alchemy config error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch alchemy config",
    };
  }
}

export interface UserSubscriptionResponse {
  status: number;
  data: {
    email: string;
    plan: string;
    speedBoost: number;
    userType: string; // "Free Mining", "Power Mining", etc.
  };
  error?: string;
}

export async function getUserSubscription(email: string): Promise<UserSubscriptionResponse> {
  try {
    const response = await fetch(
      `${ALCHEMY_GET_USER_SUBSCRIPTION}/${email}`,
      {
        method: "GET",
      }
    );

    const result = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch user subscription");
    }

    return result;
  } catch (error) {
    console.error("getUserSubscription error:", error);
    return {
      status: 500,
      data: { email, plan: "", speedBoost: 0, userType: "" },
      error:
        error instanceof Error ? error.message : "Failed to fetch user subscription",
    };
  }
}

export interface MiningStatusData {
  miningRate?: number | string;
  sessionStartTime?: string;
  lastClaimTime?: string;
  sessionEndTime?: string;
  isMiningActive?: boolean;
}

export interface MiningStatusResponse {
  status: number;
  data?: MiningStatusData;
  error?: string;
}

export async function getMiningStatus(
  email: string
): Promise<MiningStatusResponse> {
  if (!email) {
    return {
      status: 400,
      error: "Email is required",
    };
  }

  try {
    const encodedEmail = encodeURIComponent(email);
    const url = `${GET_MINING_STATUS_API_ROUTE}/${encodedEmail}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const result = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch mining status");
    }

    return {
      status: response.status,
      data: result?.data ?? result,
    };
  } catch (error) {
    console.error("getMiningStatus error:", error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Failed to fetch mining status",
    };
  }
}

const toFiniteNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
};

const toSafeNumber = (value: unknown): number => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const sumNumbers = (...values: Array<unknown>): number =>
  values.reduce<number>((total, value) => {
    const numericValue = toFiniteNumber(value);
    return numericValue !== undefined ? total + numericValue : total;
  }, 0);

const pickFirstNumber = (...values: Array<unknown>): number => {
  for (const value of values) {
    if (value === undefined || value === null) continue;
    const numericValue = toFiniteNumber(value);
    if (numericValue !== undefined) {
      return numericValue;
    }
  }

  return 0;
};

interface UserMiningBalanceData {
  email: string;
  transferableBalance: number;
  unverifiedBalance: number;
  migratedBalance: number;
  totalBalance: number;
}

export interface UserMiningBalanceResponse {
  status: number;
  data: UserMiningBalanceData;
  error?: string;
}

export interface UserWalletBalanceResponse {
  status: number;
  data: {
    email: string;
    symbol?: string;
    network?: string;
    balance: number;
    [key: string]: unknown;
  };
  error?: string;
}

const normalizeMiningBalance = (
  email: string,
  raw: unknown
): UserMiningBalanceData => {
  const source =
    raw && typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  const transferableBalance =
    toFiniteNumber(source["transferableBalance"]) ??
    toFiniteNumber(source["transferableBTCYBalance"]) ??
    0;

  const unverifiedBalance =
    toFiniteNumber(source["unverifiedBalance"]) ??
    toFiniteNumber(source["pendingBalance"]) ??
    toFiniteNumber(source["pendingBTCYBalance"]) ??
    0;

  const migratedBalance =
    toFiniteNumber(source["migratedBalance"]) ??
    toFiniteNumber(source["migratedBTCYBalance"]) ??
    0;

  const totalBalance =
    toFiniteNumber(source["totalBalance"]) ??
    toFiniteNumber(source["balance"]) ??
    sumNumbers(transferableBalance, unverifiedBalance, migratedBalance);

  return {
    email,
    transferableBalance,
    unverifiedBalance,
    migratedBalance,
    totalBalance,
  };
};

export async function getUserMiningBalance(email: string): Promise<UserMiningBalanceResponse> {
  const emptyData = normalizeMiningBalance(email, undefined);

  if (!email) {
    return {
      status: 400,
      data: emptyData,
      error: "Email is required to fetch mining balance",
    };
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      `${GET_USER_MINING_BALANCE_API_ROUTE}/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers,
      }
    );

    const result = await parseJsonSafe(response);

    const status =
      typeof result?.status === "number" ? result.status : response.status;

    const normalized = normalizeMiningBalance(email, result?.data ?? result);

    const rawError =
      typeof result?.message === "string"
        ? result.message
        : typeof result?.error === "string"
          ? result.error
          : undefined;

    return {
      status,
      data: normalized,
      error: response.ok ? undefined : rawError,
    };
  } catch (error) {
    return {
      status: 500,
      data: emptyData,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch mining balance",
    };
  }
}

export interface UserBTCYBalanceResponse {
  status: number;
  data: {
    email?: string;
    plan?: string;
    userType?: string;
    totalBTCYBalance?: number;
    balance?: number;
    [key: string]: unknown;
  };
  error?: string;
}

export async function getUserBTCYBalance(
  email: string
): Promise<UserBTCYBalanceResponse> {
  const emptyData: UserBTCYBalanceResponse = {
    status: 400,
    data: {
      email,
      totalBTCYBalance: 0,
      balance: 0,
    },
    error: "Email is required to fetch BTCY balance",
  };

  if (!email) {
    return emptyData;
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      `${GET_USER_BTCY_BALANCE_API_ROUTE}/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers,
      }
    );
    const result = await parseJsonSafe(response);

    const asRecord = (value: unknown): Record<string, unknown> =>
      value && typeof value === "object" && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {};

    const resultRecord = asRecord(result);
    const dataSource =
      "data" in resultRecord &&
        typeof resultRecord["data"] === "object"
        ? (resultRecord["data"] as Record<string, unknown>)
        : resultRecord;

    const totalBTCYBalance = toSafeNumber(
      pickFirstNumber(
        dataSource["totalBTCYBalance"],
        dataSource["totalBalance"],
        dataSource["balance"],
        dataSource["transferableBTCYBalance"],
        dataSource["btcYBalance"],
        dataSource["availableBalance"]
      )
    );

    const normalizedData = {
      ...dataSource,
      email,
      totalBTCYBalance,
      balance: toSafeNumber(
        pickFirstNumber(
          dataSource["balance"],
          dataSource["totalBTCYBalance"],
          dataSource["totalBalance"],
          totalBTCYBalance
        )
      ),
    };

    const rawError =
      typeof resultRecord["message"] === "string"
        ? (resultRecord["message"] as string)
        : typeof resultRecord["error"] === "string"
          ? (resultRecord["error"] as string)
          : undefined;

    return {
      status:
        typeof resultRecord["status"] === "number"
          ? (resultRecord["status"] as number)
          : response.status,
      data: normalizedData,
      error: response.ok ? undefined : rawError,
    };
  } catch (error) {
    console.error("getUserBTCYBalance error:", error);
    return {
      status: 500,
      data: {
        email,
        totalBTCYBalance: 0,
        balance: 0,
      },
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch BTCY balance",
    };
  }
}

export async function getUserWalletBalance(
  email: string,
  symbol: string,
  network: string
): Promise<UserWalletBalanceResponse> {
  const emptyData: UserWalletBalanceResponse = {
    status: 400,
    data: {
      email,
      symbol,
      network,
      balance: 0,
    },
    error: "Email, symbol, and network are required",
  };

  if (!email || !symbol || !network) {
    return emptyData;
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const endpoint = `${GET_USER_WALLET_BALANCE_API_ROUTE}/${encodeURIComponent(
      email
    )}/${encodeURIComponent(symbol)}/${encodeURIComponent(network)}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
    });
    const result = await parseJsonSafe(response);

    const additionalData =
      result?.data && typeof result.data === "object" && result.data !== null
        ? (result.data as Record<string, unknown>)
        : undefined;

    const isCoinNotRegisteredError =
      response.status === 500 &&
      typeof result?.data === "string" &&
      result.data.toLowerCase().includes("coin not registered");

    if (!response.ok && !isCoinNotRegisteredError) {
      throw new Error(result?.error || "Failed to fetch wallet balance");
    }

    return {
      status: response.status,
      data: {
        email,
        symbol,
        network,
        balance: toSafeNumber(
          additionalData?.balance ?? result?.balance ?? 0
        ),
        ...(additionalData ?? {}),
      },
    };
  } catch (error) {
    console.error("getUserWalletBalance error:", error);
    return {
      status: 500,
      data: {
        email,
        symbol,
        network,
        balance: 0,
      },
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch wallet balance",
    };
  }
}

export interface AlchemySessionRecord {
  _id?: string;
  sessionId?: string;
  email?: string;
  userType?: string;
  coinName?: string;
  inputAmount?: number;
  resultAmount?: number;
  multiplier?: number;
  category?: string;
  stage?: string;
  status?: string;
  notes?: string;
  startedAt?: string;
  completedAt?: string;
  durationMinutes?: number;
  createdAt?: string;
}

export interface AlchemySessionsResponse {
  status: number;
  sessions: AlchemySessionRecord[];
  error?: string;
}

export async function getAlchemySessionsByEmail(
  email: string
): Promise<AlchemySessionsResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }

    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(
      `${ALCHEMY_SESSIONS_API_ROUTE}/${encodedEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch alchemy sessions");
    }
    console.log("result", result)
    const sessions =
      result?.session ??
      result?.data?.session ??
      result ??
      [];

    return {
      status: response.status,
      sessions: Array.isArray(sessions) ? sessions : [],
    };
  } catch (error) {
    console.error("getAlchemySessionsByEmail error:", error);
    return {
      status: 500,
      sessions: [],
      error: error instanceof Error ? error.message : "Failed to fetch sessions",
    };
  }
}

const CLICK_CONVERT_SESSION_STORAGE_KEY = "alchemy-click-convert-session";

export interface ClickConvertSessionState extends AlchemySessionRecord {
  sessionId: string;
  email: string;
  inputAmount: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  withdrawalType?: WithdrawalType;
  withdrawalAddress?: string;
}

export const saveClickConvertSessionState = (
  state: ClickConvertSessionState
) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CLICK_CONVERT_SESSION_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn("Unable to persist click-convert session:", error);
  }
};

export const getClickConvertSessionState = (): ClickConvertSessionState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CLICK_CONVERT_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ClickConvertSessionState;
  } catch (error) {
    console.warn("Unable to read click-convert session:", error);
    return null;
  }
};

export const clearClickConvertSessionState = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CLICK_CONVERT_SESSION_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to clear click-convert session:", error);
  }
};

export async function finalizeClickConvertSessionState({
  forceComplete = false,
  withdrawalType,
  withdrawalAddress,
}: {
  forceComplete?: boolean;
  withdrawalType?: WithdrawalType;
  withdrawalAddress?: string;
} = {}): Promise<ClickConvertSessionState | null> {
  const stored = getClickConvertSessionState();
  if (!stored?.sessionId) return null;
  if (stored.completedAt && !forceComplete) {
    return stored;
  }

  const result: any = await completeAlchemyProcess({
    sessionId: stored.sessionId,
    withdrawalType,
    withdrawalAddress,
  });

  if (!result.success || !result.session) {
    throw new Error(result.error || "Missing alchemy session result");
  }

  const updatedState: ClickConvertSessionState = {
    ...stored,
    ...result.session,
    sessionId: result.session.sessionId ?? stored.sessionId,
    email: stored.email,
    inputAmount: stored.inputAmount,
    createdAt: stored.createdAt,
    startedAt:
      result.session.startedAt ??
      stored.startedAt ??
      stored.createdAt,
    completedAt:
      result.session.completedAt ??
      stored.completedAt ??
      new Date().toISOString(),
    withdrawalType: result.session.withdrawalType ?? stored.withdrawalType ?? withdrawalType,
    withdrawalAddress:
      result.session.withdrawalAddress ??
      stored.withdrawalAddress ??
      withdrawalAddress,
  };

  saveClickConvertSessionState(updatedState);
  return updatedState;
}

export function isPlanAllowed(plan: string | null, required: string): boolean {
  const planAccessMap: Record<string, string[]> = {
    "free mining": ["free"],
    "electric power": ["electric"],
    "turbo power": ["electric", "turbo"],
    "nuclear power": ["electric", "turbo", "nuclear"],
    "quantum mining": ["quantum"],
  };

  if (!plan) return false;

  const normalizedPlan = plan.trim().toLowerCase();
  const normalizedRequired = required.trim().toLowerCase();

  return planAccessMap[normalizedPlan]?.includes(normalizedRequired) || false;
}
