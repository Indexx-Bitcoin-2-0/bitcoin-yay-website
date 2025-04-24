import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Store the deletion request in the database

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/deleteaccount`,
      {
        email: email,
      }
    );

    console.log(response?.data);
    // return NextResponse.json(
    //   { message: "Data deletion request received" },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error("Error processing data deletion request:", error?.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
