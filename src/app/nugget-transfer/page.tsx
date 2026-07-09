"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import CustomButton2 from "@/components/CustomButton2";
import LoginButtonImage from "@/assets/images/buttons/login-button.webp";
import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import BackButtonImage from "@/assets/images/buttons/back-button.webp";
import SendButtonImage from "@/assets/images/buttons/send-button.webp";
import RetryButtonImage from "@/assets/images/buttons/retry-button.webp";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";

// ---------------------------------------------------------------------------
// Frontend-only Nugget Transfer (mirrors the mobile flow, minus the 5-ad gate).
// All data is mocked; every backend touchpoint is marked TODO(backend).
// ---------------------------------------------------------------------------

type KycStatus = "approved" | "pending" | "missing";

interface Recipient {
  id: string;
  name: string;
  email: string;
  kycStatus: KycStatus;
}

// TODO(backend): fetch the user's referral members instead of this mock list.
const MOCK_RECIPIENTS: Recipient[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", kycStatus: "approved" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", kycStatus: "approved" },
  { id: "3", name: "Charlie Diaz", email: "charlie@example.com", kycStatus: "pending" },
  { id: "4", name: "Dana Lee", email: "dana@example.com", kycStatus: "missing" },
  { id: "5", name: "Evan Wright", email: "evan@example.com", kycStatus: "approved" },
];

// TODO(backend): read the real transferable Nugget balance + sender KYC status.
const MOCK_BALANCE = 12234.25266;
const SENDER_KYC: KycStatus = "approved";
const MIN_TRANSFER = 1;

const formatNuggets = (v: number) =>
  v.toLocaleString("en-US", { maximumFractionDigits: 5 });

const KYC_BADGE: Record<KycStatus, { label: string; color: string }> = {
  approved: { label: "KYC Verified", color: "#4CAF50" },
  pending: { label: "KYC Pending", color: "#FFC107" },
  missing: { label: "No KYC", color: "#F44336" },
};

const KycBadge: React.FC<{ status: KycStatus }> = ({ status }) => {
  const { label, color } = KYC_BADGE[status];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full  px-2.5 py-1 text-[11px] font-bold"
      style={{ color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
};

const Avatar: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
    {name.charAt(0).toUpperCase()}
  </div>
);

type Step = "recipient" | "amount" | "review" | "success";

const StepDots: React.FC<{ step: Step }> = ({ step }) => {
  const order: Step[] = ["recipient", "amount", "review"];
  const idx = order.indexOf(step === "success" ? "review" : step);
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {order.map((s, i) => (
        <React.Fragment key={s}>
          <div
            className={`h-2 w-2 rounded-full transition-colors ${i <= idx ? "bg-primary" : "bg-white/20"
              }`}
          />
          {i < order.length - 1 && (
            <div
              className={`h-0.5 w-8 transition-colors ${i < idx ? "bg-primary" : "bg-white/20"
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const NuggetTransferPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [step, setStep] = useState<Step>("recipient");
  const [search, setSearch] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [kycBlock, setKycBlock] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    if (isLoading) return;
    if (!user) setLoginOpen(true);
    setChecked(true);
  }, [user, isLoading]);

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MOCK_RECIPIENTS;
    return MOCK_RECIPIENTS.filter(
      (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    );
  }, [search]);

  const numericAmount = parseFloat(amount);
  const hasAmount = amount.trim().length > 0 && !isNaN(numericAmount);

  const validateAmount = (): string | null => {
    if (!hasAmount) return "Enter an amount.";
    if (numericAmount <= 0) return "Enter an amount greater than zero.";
    if (numericAmount < MIN_TRANSFER) return `Minimum transfer is ${MIN_TRANSFER} Nugget.`;
    if (numericAmount > MOCK_BALANCE) return "Amount exceeds your available balance.";
    return null;
  };

  const goToReview = () => {
    const err = validateAmount();
    setAmountError(err);
    if (err) return;

    // KYC gate — both sender and recipient must be approved (like mobile).
    if (SENDER_KYC !== "approved") {
      setKycBlock("You must complete KYC verification before sending Nuggets.");
      return;
    }
    if (recipient && recipient.kycStatus !== "approved") {
      setKycBlock(`${recipient.name} has not completed KYC and cannot receive Nuggets yet.`);
      return;
    }
    setKycBlock(null);
    setStep("review");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    // TODO(backend): POST the transfer (sender, recipient, amount).
    await new Promise((r) => setTimeout(r, 900));
    setTxnId(`TXN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setSubmitting(false);
    setStep("success");
  };

  const resetFlow = () => {
    setStep("recipient");
    setRecipient(null);
    setAmount("");
    setAmountError(null);
    setKycBlock(null);
    setTxnId("");
    setSearch("");
  };

  // ---- Loading ----
  if (isLoading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#202020] pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
      </div>
    );
  }

  // ---- Unauthenticated ----
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#202020] px-6 pt-24 text-center">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Sign in to transfer Nuggets
        </h1>
        <p className="max-w-md text-tertiary">
          You need to be logged in to send BTCY Nuggets to other users.
        </p>
        <CustomButton2
          image={LoginButtonImage}
          text="Login"
          onClick={() => setLoginOpen(true)}
          imageStyling="w-28"
          ariaLabel="Login"
        />
        <LoginPopup
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onRegisterClick={() => setLoginOpen(false)}
          onLoginSuccess={() => setLoginOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202020] px-4 pb-24 pt-40 md:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Transfer Nuggets</h1>
          <p className="mt-2 text-tertiary">
            Send BTCY Nuggets to any verified user in the ecosystem.
          </p>
        </div>

        {step !== "success" && <StepDots step={step} />}

        {/* STEP 1 — Recipient */}
        {step === "recipient" && (
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="mb-4 w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-tertiary focus:border-primary focus:outline-none"
            />
            <div className="space-y-3">
              {filteredRecipients.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRecipient(r);
                    setKycBlock(null);
                    setStep("amount");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#2a2a2a] p-4 text-left transition-colors hover:border-primary"
                >
                  <Avatar name={r.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{r.name}</p>
                    <p className="truncate text-sm text-tertiary">{r.email}</p>
                  </div>
                  <KycBadge status={r.kycStatus} />
                </button>
              ))}
              {filteredRecipients.length === 0 && (
                <p className="py-8 text-center text-tertiary">No recipients found.</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 — Amount */}
        {step === "amount" && recipient && (
          <div>
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#2a2a2a] p-4">
              <Avatar name={recipient.name} />
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase text-tertiary">To</p>
                <p className="truncate font-bold text-white">{recipient.name}</p>
                <p className="truncate text-sm text-tertiary">{recipient.email}</p>
              </div>
              <KycBadge status={recipient.kycStatus} />
            </div>

            <label className="mb-2 block text-sm font-semibold text-tertiary">
              Amount (BTCY Nuggets)
            </label>
            <div
              className={`flex items-center rounded-xl border bg-[#2a2a2a] px-4 ${amountError ? "border-[#F44336]" : "border-white/10"
                }`}
            >
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountError(null);
                  setKycBlock(null);
                }}
                inputMode="decimal"
                placeholder="0.00"
                className="w-full bg-transparent py-4 text-2xl font-bold text-white placeholder:text-tertiary focus:outline-none"
              />
              <button
                onClick={() => setAmount(String(MOCK_BALANCE))}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-primary"
              >
                MAX
              </button>
            </div>
            <p className="mt-2 text-sm text-tertiary">
              Available: {formatNuggets(MOCK_BALANCE)} Nuggets
            </p>
            {amountError && <p className="mt-2 text-sm text-[#F44336]">{amountError}</p>}

            {kycBlock && (
              <div className="mt-4 rounded-xl border border-[#F44336]/40 bg-[#F44336]/10 p-4">
                <p className="text-sm font-semibold text-[#F44336]">{kycBlock}</p>
                <p className="mt-1 text-xs text-tertiary">
                  Both sender and recipient must be KYC-verified to transfer Nuggets.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-start justify-center gap-10">
              <CustomButton2
                image={BackButtonImage}
                text="Back"
                onClick={() => setStep("recipient")}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="Back"
              />
              <CustomButton2
                image={ArrowRightButtonImage}
                text="Continue"
                onClick={goToReview}
                imageStyling="h-34 w-auto object-contain mt-[-20px] mb-[-20px]"
                ariaLabel="Continue"
              />
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === "review" && recipient && (
          <div>
            <div className="mb-6 text-center">
              <p className="text-4xl font-extrabold text-primary">
                {formatNuggets(numericAmount)}
              </p>
              <p className="mt-1 text-sm text-tertiary">BTCY Nuggets</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5">
              <p className="mb-3 text-xs uppercase text-tertiary">Recipient</p>
              <div className="flex items-center gap-3">
                <Avatar name={recipient.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-white">{recipient.name}</p>
                  <p className="truncate text-sm text-tertiary">{recipient.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#202020] p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-tertiary">Transfer fee</span>
                <span className="font-semibold text-white">No fee</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                <span className="text-tertiary">You send</span>
                <span className="font-semibold text-white">
                  {formatNuggets(numericAmount)} Nuggets
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-start justify-center gap-10">
              <CustomButton2
                image={BackButtonImage}
                text="Back"
                onClick={() => setStep("amount")}
                disabled={submitting}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="Back"
              />
              <CustomButton2
                image={SendButtonImage}
                text={submitting ? "Sending…" : "Confirm & Send"}
                onClick={handleConfirm}
                disabled={submitting}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="Confirm and send"
              />
            </div>
          </div>
        )}

        {/* STEP 4 — Success */}
        {step === "success" && recipient && (
          <div className="rounded-2xl  bg-[#2a2a2a] p-8 text-center mt-18" >

            <h2 className="text-2xl font-bold text-white">Transfer Successful</h2>
            <p className="mt-2 text-tertiary">
              You sent{" "}
              <span className="font-bold text-primary">
                {formatNuggets(numericAmount)} Nuggets
              </span>{" "}
              to {recipient.name}.
            </p>
            <div className="mx-auto mt-6 max-w-xs rounded-xl bg-[#202020] p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-tertiary">Transaction ID</span>
                <span className="font-mono text-white">{txnId}</span>
              </div>
            </div>
            <div className="mt-8 flex items-start justify-center gap-10">
              <CustomButton2
                image={RetryButtonImage}
                text="New Transfer"
                onClick={resetFlow}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="New transfer"
              />
              <CustomButton2
                image={CheckMarkButtonImage}
                text="Done"
                onClick={() => router.push("/")}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="Done"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuggetTransferPage;
