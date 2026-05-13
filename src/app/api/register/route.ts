import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/api-config";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  countryCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

interface RegisterResponse {
  message?: string;
  token?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const payload: RegisterPayload = await request.json();

    // Basic validation
    if (!payload.email || !payload.password || !payload.confirmPassword) {
      return NextResponse.json(
        { error: "Email, password, and confirm password are required" },
        { status: 400 }
      );
    }

    const response = await axios.post<RegisterResponse>(
      `${API_BASE_URL}/api/v1/inex/user/registerwithapp`,
      payload,
      { timeout: 180000 } // 3 minutes
    );

    console.log("Register response:", response.data);

    return NextResponse.json(
      { data: response.data },
      { status: 200 }
    );

  } catch (err) {
    const error = err as AxiosError<RegisterResponse>;
    console.error("Error in registration:", error.response?.data);

    if (error.response?.data) {
      return NextResponse.json(
        error.response.data,
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
