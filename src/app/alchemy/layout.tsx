import Link from "next/link";
import { ReactNode } from "react";
import { ALCHEMY_DISABLED } from "@/lib/alchemy";

export default function AlchemyLayout({ children }: { children: ReactNode }) {
  if (ALCHEMY_DISABLED) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <div className="text-4xl font-semibold">Alchemy is temporarily offline</div>
        <p className="max-w-xl text-lg text-tertiary">
          We’ve paused all Alchemy conversions for now while we work on the backend. The feature is disabled for every user until the team says otherwise.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary px-6 py-3 text-white transition hover:bg-primary/90"
          >
            Back to home
          </Link>
          <Link
            href="/support/#contact-us"
            className="rounded-full border border-white/40 px-6 py-3 text-white transition hover:bg-white/10"
          >
            Contact support
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
