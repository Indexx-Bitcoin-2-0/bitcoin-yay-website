import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface DeleteAccountResponse {
  message?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const response = await axios.post<DeleteAccountResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/login`,
      { email, password }
    );

    console.log("Login response:", response.data);
    return NextResponse.json(
      { data: response.data },
      { status: 200 }
    );

  } catch (err) {
    const error = err as AxiosError<DeleteAccountResponse>;
    console.error("Error in data deletion:", error.response?.data);

    // Handle axios errors
    if (error.response?.data) {
      return NextResponse.json(
        error.response.data,
        { status: error.response.status || 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}