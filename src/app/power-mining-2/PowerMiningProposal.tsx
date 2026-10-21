"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";

const proposedTiers = [
  {
    amount: "$5,000",
    name: "Starter",
    description: "A proposed entry tier for evaluating a defined service.",
  },
  {
    amount: "$10,000",
    name: "Growth",
    description: "A proposed middle tier for comparing service scope.",
  },
  {
    amount: "$20,000",
    name: "Scale",
    description: "A proposed upper tier, subject to the same launch gates.",
  },
];

const launchSteps = [
  {
    number: "01",
    title: "Audit the current rewards",
    description:
      "Map how Nuggets are created, funded, recorded, converted, and withdrawn. Reconcile user balances, outstanding obligations, complaints, and payment flows.",
    outcome: "Deliverable: verified money-and-reward flow map",
  },
  {
    number: "02",
    title: "Define what customers receive",
    description:
      "Decide whether this is a real computing/mining service, an app rewards membership, or another product. Specify equipment or service, duration, fees, eligibility, and fulfilment.",
    outcome: "Deliverable: product specification with measurable service",
  },
  {
    number: "03",
    title: "Validate economics and review",
    description:
      "Model costs and reward obligations without relying on new package sales. Have qualified counsel review the actual mechanics, customer terms, redemption, and every marketing claim before launch.",
    outcome: "Gate: documented economics and counsel approval",
  },
  {
    number: "04",
    title: "Pilot useful customer value",
    description:
      "Run a limited, measured pilot only after the gates above. Test onboarding, actual service delivery, reward reconciliation, redemption, support load, and repeat use before scaling acquisition.",
    outcome: "Success: repeat use and reliable fulfilment—not sign-ups alone",
  },
];

type ProposedTier = (typeof proposedTiers)[number];

export default function PowerMiningProposal() {
  const [selectedTier, setSelectedTier] = useState<ProposedTier | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedTier && !dialog.open) {
      dialog.showModal();
    } else if (!selectedTier && dialog.open) {
      dialog.close();
    }
  }, [selectedTier]);

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedTier(null);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#171717] text-white">
      <section className="relative border-b border-white/10 px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <span aria-hidden="true">←</span> Bitcoin Yay
          </Link>

          <div className="mt-16 max-w-4xl md:mt-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Concept review · not an offer
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Power Mining <span className="text-primary">2.0</span>
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/70 md:text-2xl">
              Rebuild the offer around a real, clearly described customer
              benefit—with rewards people can understand and verify.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/55">
              The voice note proposes $5,000, $10,000, and $20,000 tiers and
              mentions a 10%–15% annual return. This concept deliberately does
              not promise interest, yield, profit, or a dollar conversion.
              Those claims must not be used as marketing until the product,
              economics, and legal treatment have been independently reviewed.
            </p>

            <a
              href="#proposed-tiers"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-bold text-black transition hover:bg-orange-300"
            >
              Review the proposed tiers <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </section>

      <section
        id="proposed-tiers"
        className="scroll-mt-10 px-5 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Tier concepts
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Start with scope, not a return target.
            </h2>
            <p className="mt-5 leading-relaxed text-white/60">
              These amounts are unapproved concept placeholders only. No tier
              is available to buy, and the service, duration, pricing basis,
              reward rules, and redemption terms have not been validated.
              Select a tier to see what must be specified before it could be
              considered for launch.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {proposedTiers.map((tier, index) => (
              <article
                key={tier.amount}
                className={`relative flex min-h-72 flex-col rounded-3xl border p-7 ${
                  index === 1
                    ? "border-primary/60 bg-gradient-to-b from-primary/10 to-white/[0.03]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/50">
                      Proposed {tier.name} tier
                    </p>
                    <p className="mt-3 text-4xl font-bold">{tier.amount}</p>
                  </div>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/55">
                    Preview
                  </span>
                </div>
                <p className="mt-6 flex-1 leading-relaxed text-white/60">
                  {tier.description}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/60 px-5 py-3 font-bold text-primary transition hover:bg-primary hover:text-black"
                >
                  Review concept <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] p-5 text-sm leading-relaxed text-amber-100/80">
            <span className="font-bold text-amber-300" aria-hidden="true">
              !
            </span>
            <p>
              Not a purchase page or investment offer. No fixed return, interest
              rate, mining output, token value, liquidity, or USD conversion is
              represented or guaranteed.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              The decision to resolve first
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              What does “mining” mean in this product?
            </h2>
            <p className="mt-5 leading-relaxed text-white/60">
              Establish whether customers receive verifiable computing
              resources and protocol mining output, or app-generated Nuggets
              allocated by an internal rewards system. Do not describe one as
              the other. The ledger, customer promises, and legal review must
              match the real operation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#202020] p-6">
              <p className="text-lg font-bold">If it is a mining service</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Document the computing capacity, provider or pool, operating
                costs, customer allocation method, service period, and
                verifiable payouts.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#202020] p-6">
              <p className="text-lg font-bold">If it is an app rewards model</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Explain how Nuggets are earned, their actual uses and
                restrictions, whether transfer or redemption is available, and
                what funds any rewards.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#202020] p-6 sm:col-span-2">
              <p className="text-lg font-bold">Keep investment fundraising separate</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                If the business wants to raise capital in exchange for
                anticipated financial returns, pause consumer-package
                marketing and obtain qualified legal advice on a separately
                structured offering. Changing labels or paying in tokens does
                not answer the legal question.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Recommended path
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Four gates before a relaunch.
            </h2>
            <p className="mt-5 leading-relaxed text-white/60">
              The near-term goal is not another signup spike. It is a product
              users trust, return to, and can explain to someone else.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {launchSteps.map((step) => (
              <li
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8"
              >
                <span className="text-sm font-bold tracking-[0.18em] text-primary">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/60">
                  {step.description}
                </p>
                <p className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-white/80">
                  {step.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-white/[0.03] to-transparent p-7 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Launch guardrails
              </p>
              <h2 className="mt-4 text-2xl font-bold md:text-4xl">
                Prove the value before promoting the package.
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/60">
                Track 30-day active use, successful redemptions, reward costs
                against independent revenue, support issues, and repeat
                participation. Do not fund earlier users’ rewards with
                purchases from later users. Publish only claims supported by
                records and approved through legal review.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-black">
              <Check size={32} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-xs leading-relaxed text-white/40">
          This page is a product-planning concept based on the supplied voice
          note and project documents. It is not legal, tax, or investment
          advice, and does not establish regulatory compliance. The supplied
          AI-generated documents should be verified by qualified counsel and
          against primary sources before relying on regulatory statements.
        </p>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="tier-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl border border-white/10 bg-[#202020] p-0 text-white shadow-2xl backdrop:bg-black/75"
        onClose={() => setSelectedTier(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedTier && (
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Proposal preview · not for purchase
                </p>
                <h2
                  id="tier-dialog-title"
                  className="mt-3 text-3xl font-bold"
                >
                  {selectedTier.name} · {selectedTier.amount}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close tier details"
                className="rounded-full border border-white/15 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-5 leading-relaxed text-white/60">
              This is an unapproved planning tier, not an available product.
              Before considering a launch, BTCY would need to specify and
              verify:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "The service delivered, duration, and customer entitlement",
                "How any BTCY or Nugget rewards are generated and funded",
                "Whether rewards can be transferred or redeemed, and on what terms",
                "All fees, operating limits, cancellation, and refund terms",
              ].map((requirement) => (
                <li
                  key={requirement}
                  className="flex gap-3 text-sm leading-relaxed text-white/75"
                >
                  <span className="mt-0.5 text-primary" aria-hidden="true">
                    <Check size={16} />
                  </span>
                  {requirement}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-amber-300/25 bg-amber-300/[0.06] p-4 text-sm leading-relaxed text-amber-100/80">
              No 10%–15% annual return, interest, profit, mining output, or
              conversion to USD is promised or estimated.
            </div>
            <button
              type="button"
              onClick={closeDialog}
              className="mt-7 w-full rounded-xl bg-primary px-5 py-3 font-bold text-black transition hover:bg-orange-300"
            >
              Close proposal
            </button>
          </div>
        )}
      </dialog>
    </main>
  );
}
