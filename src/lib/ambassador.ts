import axios from "axios";
import { AMBASSADOR_REGISTER_API_ROUTE } from "@/routes";
import { getAccessToken } from "./auth";

export interface AmbassadorRegisterResponse {
  success: boolean;
  message?: string;
  error: string;
}

export interface AmbassadorRegisterData {
  fullName: string;
  email: string;
  telegramHandle: string;
  primaryChannels: string;
  audienceSize: string;
  regions: string;
  contentNiche: string;
  topPostsLinks: string;
  shortPitch: string;
}

export async function registerAmbassador(data: AmbassadorRegisterData): Promise<AmbassadorRegisterResponse> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found. Please login first.");
    }

    const response = await axios.post(AMBASSADOR_REGISTER_API_ROUTE, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = response.data;

    if (response.status !== 200 && response.status !== 201) {
      return {
        success: false,
        error: result.response.data.error || "Failed to register ambassador",
      };
    }

    return result;
  } catch (error: any) {
    const errorMessage = error.response?.data.error || "Failed to register ambassador";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
