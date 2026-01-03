import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const SUBSCRIPTIONS_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/bitcoinyay/subscriptions`
  : "";

export async function GET(request: Request) {
  if (!SUBSCRIPTIONS_BASE_URL) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_API_URL configuration" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(request.url);
    console.log("Forwarding subscription history request to:", `${SUBSCRIPTIONS_BASE_URL}/history${url.search}`);
    const response = await axios.get(
      `${SUBSCRIPTIONS_BASE_URL}/history${url.search}`,
      {
        timeout: 180000,
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (err) {
    const error = err as AxiosError;
    console.error("Subscription history proxy error:", error.message);

    if (error.response?.data) {
      return NextResponse.json(error.response.data, {
        status: error.response.status || 500,
      });
    }

    return NextResponse.json(
      { error: "Unable to forward subscription history request" },
      { status: 500 }
    );
  }
}
