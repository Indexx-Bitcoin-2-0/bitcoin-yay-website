import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/deleteaccount`,
      { email }
    );

    return NextResponse.json(
      { message: response.data.message },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error in data deletion:", error?.response?.data);

    // Handle axios errors
    if (error?.response?.data) {
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