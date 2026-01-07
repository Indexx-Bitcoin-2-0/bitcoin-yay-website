import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const MINING_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mining`
    : "";

export async function GET(
    request: Request,
    { params }: { params: { coinSymbol: string; email: string } }
) {
    if (!MINING_BASE_URL) {
        return NextResponse.json(
            { error: "Missing NEXT_PUBLIC_API_URL configuration" },
            { status: 500 }
        );
    }

    const { coinSymbol, email } = params;
    if (!coinSymbol || !email) {
        return NextResponse.json(
            { error: "coinSymbol and email are required" },
            { status: 400 }
        );
    }

    try {
        const encodedEmail = encodeURIComponent(email);
        const forwardUrl = `${MINING_BASE_URL}/getUserSubscriptionPlan/${coinSymbol}/${encodedEmail}`;
        console.log("Forwarding mining subscription plan request to:", forwardUrl);
        const response = await axios.get(forwardUrl, { timeout: 180000 });

        return NextResponse.json(response.data, { status: response.status });
    } catch (err) {
        const error = err as AxiosError;
        console.error("Mining subscription plan proxy error:", error.message);

        if (error.response?.data) {
            return NextResponse.json(error.response.data, {
                status: error.response.status || 500,
            });
        }

        return NextResponse.json(
            { error: "Unable to forward mining subscription plan request" },
            { status: 500 }
        );
    }
}
