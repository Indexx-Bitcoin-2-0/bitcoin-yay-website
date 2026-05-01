import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const SUBSCRIPTIONS_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bitcoinyay/subscriptions`
  : "";

export async function POST(request: Request) {
  if (!SUBSCRIPTIONS_BASE_URL) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_API_URL configuration" },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();
    const response = await axios.post(
      `${SUBSCRIPTIONS_BASE_URL}/purchase-test`,
      payload,
      {
        timeout: 180000,
      }
    );

    console.log("Subscription purchase proxy response:", response.data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (err) {
    console.log("Subscription purchase proxy error:", err);
    const error = err as AxiosError;
    console.error("Subscription purchase proxy error:", error.message);

    if (error.response?.data) {
      return NextResponse.json(error.response.data, {
        status: error.response.status || 500,
      });
    }

    return NextResponse.json(
      { error: "Unable to forward subscription purchase request" },
      { status: 500 }
    );
  }
}
