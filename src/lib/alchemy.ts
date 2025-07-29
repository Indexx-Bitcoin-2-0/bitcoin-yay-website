import { ALCHEMY_CREATE_API_ROUTE, ALCHEMY_COMPLETE_API_ROUTE } from "@/routes";

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
