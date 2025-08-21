import {
  ALCHEMY_CREATE_API_ROUTE,
  ALCHEMY_COMPLETE_API_ROUTE,
  ALCHEMY_CONFIG_API_ROUTE,
  ALCHEMY_GET_USER_SUBSCRIPTION,
  GET_USER_BTCY_BALANCE_API_ROUTE,
} from "@/routes";

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

export interface UserBTCYBalanceResponse {
  status: number;
  data: {
    email: string;
    balance: number;
    totalBTCYBalance: number;
    userType: string;
    plan: string;
  };
  error?: string;
}

export async function getUserBTCYBalance(email: string): Promise<UserBTCYBalanceResponse> {
  try {
    const response = await fetch(
      `${GET_USER_BTCY_BALANCE_API_ROUTE}/${email}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch user BTCY balance");
    }

    return result;
  } catch (error) {
    return {
      status: 500,
      data: { email, balance: 0, totalBTCYBalance: 0, userType: "" },
      error: error instanceof Error ? error.message : "Failed to fetch user BTCY balance",
    };
  }
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