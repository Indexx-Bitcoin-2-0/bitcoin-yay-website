import {
  ALCHEMY_CREATE_API_ROUTE,
  ALCHEMY_COMPLETE_API_ROUTE,
  ALCHEMY_CONFIG_API_ROUTE,
  ALCHEMY_GET_USER_SUBSCRIPTION,
  GET_MINING_STATUS_API_ROUTE,
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

    const result = await response.json();

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

    const result = await response.json();

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

    const result = await response.json();
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

    const result = await response.json();

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

const sumNumbers = (...values: Array<unknown>): number =>
  values.reduce((total, value) => {
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

    const result = await response.json().catch(() => ({}));

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

export async function getMiningStatus(
  email: string
): Promise<MiningStatusResponse> {
  const emptyData = normalizeMiningStatus(undefined);

  if (!email) {
    return {
      status: 400,
      data: emptyData,
      error: "Email is required to fetch mining status",
    };
  }

  try {
    const response = await fetch(
      `${GET_MINING_STATUS_API_ROUTE}/${encodeURIComponent(email)}`
    );
    const result = await response.json().catch(() => ({}));
    const status =
      typeof result?.status === "number" ? result.status : response.status;
    const normalized = normalizeMiningStatus(result?.data ?? result);

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
          : "Failed to fetch mining status",
    };
  }
}

interface UserWalletBalanceData {
  email: string;
  coinSymbol: string;
  network: string;
  balance: number;
}

export interface UserWalletBalanceResponse {
  status: number;
  data: UserWalletBalanceData;
  error?: string;
}

export interface MiningStatusData {
  isMiningActive: boolean;
  lastClaimTime?: string;
  miningRate: number;
  sessionStartTime?: string;
  sessionEndTime?: string;
}

export interface MiningStatusResponse {
  status: number;
  data: MiningStatusData;
  error?: string;
}

const normalizeMiningStatus = (raw: unknown): MiningStatusData => {
  const source =
    raw && typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  const miningRate =
    toFiniteNumber(source["miningRate"]) ??
    toFiniteNumber(source["miningRatePerHour"]) ??
    0;

  const sessionStartTime =
    typeof source["sessionStartTime"] === "string"
      ? (source["sessionStartTime"] as string)
      : typeof source["startTime"] === "string"
      ? (source["startTime"] as string)
      : undefined;

  const sessionEndTime =
    typeof source["sessionEndTime"] === "string"
      ? (source["sessionEndTime"] as string)
      : typeof source["endTime"] === "string"
      ? (source["endTime"] as string)
      : undefined;

  return {
    isMiningActive: Boolean(source["isMiningActive"]),
    lastClaimTime:
      typeof source["lastClaimTime"] === "string"
        ? (source["lastClaimTime"] as string)
        : undefined,
    miningRate,
    sessionStartTime,
    sessionEndTime,
  };
};

const normalizeWalletBalance = (
  email: string,
  coin: string,
  network: string,
  raw: unknown
): UserWalletBalanceData => {
  const source =
    raw && typeof raw === "object" && raw !== null
      ? (raw as Record<string, unknown>)
      : {};

  const balance =
    toFiniteNumber(source["balance"]) ??
    toFiniteNumber(source["coinBalance"]) ??
    0;

  const coinSymbol =
    typeof source["coinSymbol"] === "string" && source["coinSymbol"]
      ? (source["coinSymbol"] as string)
      : coin;

  const coinNetwork =
    typeof source["coinNetwork"] === "string" && source["coinNetwork"]
      ? (source["coinNetwork"] as string)
      : network;

  return {
    email,
    coinSymbol,
    network: coinNetwork,
    balance,
  };
};

export async function getUserWalletBalance(
  email: string,
  coin: string,
  network: string
): Promise<UserWalletBalanceResponse> {
  const emptyData = normalizeWalletBalance(email, coin, network, undefined);

  if (!email) {
    return {
      status: 400,
      data: emptyData,
      error: "Email is required to fetch wallet balance",
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
      `${GET_USER_WALLET_BALANCE_API_ROUTE}/${encodeURIComponent(email)}/${encodeURIComponent(
        coin
      )}/${encodeURIComponent(network)}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({}),
      }
    );

    const result = await response.json().catch(() => ({}));

    const statusFromResponse =
      typeof result?.status === "number" ? result.status : response.status;

    const normalized = normalizeWalletBalance(
      email,
      coin,
      network,
      result?.data ?? result
    );

    const rawError =
      typeof result?.message === "string"
        ? result.message
        : typeof result?.error === "string"
        ? result.error
        : typeof result?.data === "string"
        ? result.data
        : undefined;

    const isZeroBalanceError =
      typeof rawError === "string" && /balance\s*zero/i.test(rawError);

    const isCoinNotRegisteredError =
      typeof rawError === "string" && /coin\s+not\s+registered/i.test(rawError);

    const treatedAsExpected = response.ok || isZeroBalanceError || isCoinNotRegisteredError;

    return {
      status: treatedAsExpected ? 200 : statusFromResponse,
      data: normalized,
      error:
        treatedAsExpected
          ? undefined
          : rawError,
    };
  } catch (error) {
    return {
      status: 500,
      data: emptyData,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch wallet balance",
    };
  }
}

type RawUserBTCYBalance = {
  email?: string;
  balance?: number | string;
  totalBTCYBalance?: number | string;
  totalBalance?: number | string;
  userType?: string;
  plan?: string;
  nuggetBalance?: number | string;
  nuggetBTCY?: number | string;
  minedBalance?: number | string;
  minedBTCYBalance?: number | string;
  tokenBalance?: number | string;
  tokenBTCY?: number | string;
  purchasedBalance?: number | string;
  purchasedBTCYBalance?: number | string;
  quantumBalance?: number | string;
  quantumBTCYBalance?: number | string;
};

export interface UserBTCYBalanceData {
  email: string;
  balance: number;
  totalBTCYBalance: number;
  userType: string;
  plan: string;
  nuggetBalance: number;
  withdrawnBalance: number;
  tokenBalance: number;
}

export interface UserBTCYBalanceResponse {
  status: number;
  message?: string;
  data: UserBTCYBalanceData;
  error?: string;
}

const normalizeUserBTCYBalance = (
  raw: RawUserBTCYBalance | undefined
): UserBTCYBalanceData => {
  const nuggetBalance = pickFirstNumber(
    raw?.nuggetBalance,
    raw?.nuggetBTCY,
    raw?.minedBalance,
    raw?.minedBTCYBalance,
    raw?.balance
  );

  const tokenBalance = pickFirstNumber(
    raw?.tokenBalance,
    raw?.tokenBTCY,
    raw?.purchasedBalance,
    raw?.purchasedBTCYBalance,
    raw?.quantumBalance,
    raw?.quantumBTCYBalance
  );

  const withdrawnBalance = pickFirstNumber(
    raw?.withdrawnBalance,
    raw?.withdrawableBalance,
    raw?.withdrawableBTCY,
    raw?.walletBalance,
    raw?.stellarBalance
  );

  const explicitTotal =
    toFiniteNumber(raw?.totalBTCYBalance) ??
    toFiniteNumber(raw?.totalBalance);

  const totalBTCYBalance =
    explicitTotal !== undefined ? explicitTotal : nuggetBalance + tokenBalance;

  return {
    email: raw?.email ?? "",
    balance: nuggetBalance, // maintain backwards compatibility
    totalBTCYBalance,
    userType: raw?.userType ?? "",
    plan: raw?.plan ?? "",
    nuggetBalance,
    withdrawnBalance,
    tokenBalance,
  };
};

const createEmptyBalanceData = (email: string): UserBTCYBalanceData => ({
  email,
  balance: 0,
  totalBTCYBalance: 0,
  userType: "",
  plan: "",
  nuggetBalance: 0,
  withdrawnBalance: 0,
  tokenBalance: 0,
});

const joinErrors = (...errors: Array<string | undefined>): string | undefined => {
  const uniqueMessages = [...new Set(errors.filter((value): value is string => Boolean(value && value.trim())).map((value) => value.trim()))];
  return uniqueMessages.length > 0 ? uniqueMessages.join(" | ") : undefined;
};

const fetchLegacyUserBTCYBalance = async (
  email: string
): Promise<UserBTCYBalanceResponse | null> => {
  try {
    const response = await fetch(
      `${GET_USER_BTCY_BALANCE_API_ROUTE}/${encodeURIComponent(email)}`,
      { method: "GET" }
    );

    const result = (await response.json()) as {
      status?: number;
      message?: string;
      error?: string;
      data?: RawUserBTCYBalance;
    };

    if (!response.ok) {
      throw new Error(result.error || result.message || "Failed to fetch user BTCY balance");
    }

    return {
      status: result.status ?? response.status,
      message: result.message,
      data: normalizeUserBTCYBalance(result.data),
      error: result.error,
    };
  } catch (error) {
    console.error("Legacy BTCY balance fallback failed:", error);
    return null;
  }
};

export async function getUserBTCYBalance(email: string): Promise<UserBTCYBalanceResponse> {
  const emptyData = createEmptyBalanceData(email);

  if (!email) {
    return {
      status: 400,
      data: emptyData,
      error: "Email is required to fetch BTCY balance",
    };
  }

  const [
    subscriptionResult,
    miningResult,
    yingYangWalletResult,
    stellarWalletResult,
  ] = await Promise.all([
    getUserSubscription(email),
    getUserMiningBalance(email),
    getUserWalletBalance(email, "BTCY", "Ying Yang Chain"),
    getUserWalletBalance(email, "BTCY", "Stellar"),
  ]);

  const shouldFallbackToLegacy =
    miningResult.status >= 400 && yingYangWalletResult.status >= 400;

  let legacyResponse: UserBTCYBalanceResponse | null = null;

  if (shouldFallbackToLegacy) {
    legacyResponse = await fetchLegacyUserBTCYBalance(email);

    if (legacyResponse) {
      const mergedError = joinErrors(
        legacyResponse.error,
        subscriptionResult.error,
        stellarWalletResult.error
      );

      return {
        ...legacyResponse,
        error: mergedError,
        message: mergedError ? "Balance fetched with partial legacy data" : legacyResponse.message,
        data: {
          ...legacyResponse.data,
          userType: subscriptionResult.data?.userType || legacyResponse.data.userType,
          plan: subscriptionResult.data?.plan || legacyResponse.data.plan,
        },
      };
    }
  }

  const subscriptionPlan = {
    userType: subscriptionResult.data?.userType ?? "",
    plan: subscriptionResult.data?.plan ?? "",
  };

  if (
    subscriptionResult.status >= 400 &&
    !subscriptionPlan.userType &&
    !subscriptionPlan.plan
  ) {
    legacyResponse = legacyResponse ?? (await fetchLegacyUserBTCYBalance(email));
    if (legacyResponse) {
      subscriptionPlan.userType =
        subscriptionPlan.userType || legacyResponse.data.userType;
      subscriptionPlan.plan =
        subscriptionPlan.plan || legacyResponse.data.plan;
    }
  }

  const miningTransferable =
    toFiniteNumber(miningResult.data?.transferableBalance) ?? 0;
  const miningUnverified =
    toFiniteNumber(miningResult.data?.unverifiedBalance) ?? 0;
  const miningMigrated =
    toFiniteNumber(miningResult.data?.migratedBalance) ?? 0;

  const miningTotal = toFiniteNumber(miningResult.data?.totalBalance);
  const nuggetBalance =
    miningTotal !== undefined
      ? miningTotal
      : sumNumbers(miningTransferable, miningUnverified, miningMigrated);

  const withdrawnBalance =
    toFiniteNumber(stellarWalletResult.data?.balance) ?? 0;
  const tokenBalance = toFiniteNumber(
    yingYangWalletResult.data?.balance
  ) ?? 0;
  const totalBTCYBalance = sumNumbers(
    nuggetBalance,
    withdrawnBalance,
    tokenBalance
  );

  const aggregatedError = joinErrors(
    subscriptionResult.error,
    miningResult.error,
    yingYangWalletResult.error,
    stellarWalletResult.error,
    legacyResponse?.error
  );

  return {
    status: aggregatedError ? 206 : 200,
    message: aggregatedError ? "Balance fetched with partial data" : undefined,
    error: aggregatedError,
    data: {
      email,
      balance: nuggetBalance,
      totalBTCYBalance,
      userType: subscriptionPlan.userType,
      plan: subscriptionPlan.plan,
      nuggetBalance,
      withdrawnBalance,
      tokenBalance,
    },
  };
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
