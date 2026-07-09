"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  KycStatus,
  MIN_TRANSFER_NUGGETS,
  MIN_TRANSFER_REFERRALS,
  TransferRecipient,
  TransferRulesCheck,
  TransferSource,
  getReferralRecipients,
  loadTransferRulesCheck,
  submitNuggetTransfer,
} from "@/lib/nugget-transfer";

const formatNuggets = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 5 });

const KYC_BADGE: Record<KycStatus, { label: string; color: string }> = {
  approved: { label: "KYC Verified", color: "#4CAF50" },
  pending: { label: "KYC Pending", color: "#FFC107" },
  missing: { label: "No KYC", color: "#F44336" },
  unknown: { label: "KYC Unknown", color: "#9CA3AF" },
};

type Step = "recipient" | "amount" | "review" | "success";

const initialRules: TransferRulesCheck = {
  isOwner: false,
  senderKyc: "unknown",
  minedBalance: 0,
  withdrawnBalance: 0,
  referralCount: 0,
};

const KycBadge: React.FC<{ status: KycStatus }> = ({ status }) => {
  const { label, color } = KYC_BADGE[status];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
};

const Avatar: React.FC<{ name: string; email: string }> = ({ name, email }) => {
  const label = name || email || "?";
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
      {label.charAt(0).toUpperCase()}
    </div>
  );
};

const StepDots: React.FC<{ step: Step }> = ({ step }) => {
  const order: Step[] = ["recipient", "amount", "review"];
  const idx = order.indexOf(step === "success" ? "review" : step);

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {order.map((item, index) => (
        <React.Fragment key={item}>
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              index <= idx ? "bg-primary" : "bg-white/20"
            }`}
          />
          {index < order.length - 1 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                index < idx ? "bg-primary" : "bg-white/20"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const SourceOption: React.FC<{
  active: boolean;
  title: string;
  description: string;
  balance: number;
  onClick: () => void;
}> = ({ active, title, description, balance, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border p-4 text-left transition-colors ${
      active
        ? "border-primary bg-primary/10"
        : "border-white/10 bg-[#202020] hover:border-primary/60"
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <p className="font-bold text-white">{title}</p>
      <span className="rounded-full border border-primary/60 px-2 py-1 text-xs font-bold text-primary">
        {formatNuggets(balance)}
      </span>
    </div>
    <p className="mt-2 text-sm text-tertiary">{description}</p>
  </button>
);

const NuggetTransferPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loadingContext, setLoadingContext] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading your transfer eligibility..."
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [rules, setRules] = useState<TransferRulesCheck>(initialRules);
  const [recipients, setRecipients] = useState<TransferRecipient[]>([]);

  const [step, setStep] = useState<Step>("recipient");
  const [search, setSearch] = useState("");
  const [recipient, setRecipient] = useState<TransferRecipient | null>(null);
  const [source, setSource] = useState<TransferSource>("mined");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [kycBlock, setKycBlock] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [txnId, setTxnId] = useState("");

  const senderEmail = user?.email ?? "";
  const selectedBalance = source === "mined" ? rules.minedBalance : rules.withdrawnBalance;
  const sourceLabel = source === "mined" ? "Mined Balance" : "Withdrawn Balance";

  const loadContext = useCallback(
    async (message = "Loading your transfer eligibility...") => {
      if (!senderEmail) return;

      try {
        setLoadingMessage(message);
        setLoadingContext(true);
        setLoadError(null);
        const recipientResult = await getReferralRecipients(senderEmail);
        const rulesResult = await loadTransferRulesCheck(senderEmail, recipientResult);
        setRecipients(recipientResult.recipients);
        setRules(rulesResult);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Failed to load transfer details. Please try again."
        );
      } finally {
        setLoadingContext(false);
      }
    },
    [senderEmail]
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user) setLoginOpen(true);
    setChecked(true);
  }, [user, isLoading]);

  useEffect(() => {
    if (!checked || !user) return;
    loadContext("Loading your transfer eligibility...");
  }, [checked, loadContext, user]);

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q)
    );
  }, [recipients, search]);

  const numericAmount = Number(amount);
  const hasAmount = amount.trim().length > 0 && Number.isFinite(numericAmount);
  const canUseTransfer =
    rules.isOwner && rules.senderKyc === "approved" && !loadingContext && !loadError;

  const validateAmount = (): string | null => {
    if (!hasAmount) return "Enter an amount.";
    if (numericAmount <= 0) return "Enter an amount greater than zero.";
    if (!Number.isInteger(numericAmount)) return "Enter a whole number of Nuggets.";
    if (numericAmount < MIN_TRANSFER_NUGGETS) {
      return `Minimum transfer is ${formatNuggets(MIN_TRANSFER_NUGGETS)} Nuggets.`;
    }
    if (numericAmount > selectedBalance) {
      return `Amount exceeds your available ${sourceLabel.toLowerCase()}.`;
    }
    return null;
  };

  const handleRecipientSelect = (nextRecipient: TransferRecipient) => {
    setRecipient(nextRecipient);
    setSubmitError(null);

    if (nextRecipient.kycStatus !== "approved") {
      setKycBlock("You can only send Nuggets to KYC verified users.");
      return;
    }

    setKycBlock(null);
    setStep("amount");
  };

  const goToReview = () => {
    const error = validateAmount();
    setAmountError(error);
    setSubmitError(null);
    if (error) return;

    if (!rules.isOwner) {
      setKycBlock(
        `Transfer Nuggets is only available for Mining Station owners with ${MIN_TRANSFER_REFERRALS} or more referrals.`
      );
      return;
    }
    if (rules.senderKyc !== "approved") {
      setKycBlock("You must complete KYC verification before sending Nuggets.");
      return;
    }
    if (!recipient || recipient.kycStatus !== "approved") {
      setKycBlock("You can only send Nuggets to KYC verified users.");
      return;
    }

    setKycBlock(null);
    setStep("review");
  };

  const handleConfirm = async () => {
    if (!recipient || submitting) return;

    const error = validateAmount();
    setAmountError(error);
    setSubmitError(null);
    if (error) {
      setStep("amount");
      return;
    }

    try {
      setSubmitting(true);
      const result = await submitNuggetTransfer({
        senderEmail,
        recipientEmail: recipient.email,
        amount: numericAmount,
        source,
      });
      setTxnId(result.transactionId || "Pending");
      await loadContext("Loading transfer details...");
      window.dispatchEvent(new Event("btcy-balances:refresh"));
      setStep("success");
    } catch (transferError) {
      setSubmitError(
        transferError instanceof Error
          ? transferError.message
          : "Transfer failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep("recipient");
    setRecipient(null);
    setSource("mined");
    setAmount("");
    setAmountError(null);
    setKycBlock(null);
    setSubmitError(null);
    setTxnId("");
    setSearch("");
    loadContext("Loading your transfer eligibility...");
  };

  if (isLoading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#202020] pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#202020] px-6 pt-24 text-center">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Sign in to transfer Nuggets
        </h1>
        <p className="max-w-md text-tertiary">
          You need to be logged in to send BTCY Nuggets.
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
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Transfer Nuggets
          </h1>
          <p className="mt-2 text-tertiary">
            Send BTCY Nuggets to KYC-verified referral members.
          </p>
        </div>

        {loadingContext && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 text-center text-tertiary">
            {loadingMessage}
          </div>
        )}

        {loadError && (
          <div className="mb-6 rounded-2xl border border-[#F44336]/40 bg-[#F44336]/10 p-5 text-center">
            <p className="text-sm font-semibold text-[#F44336]">{loadError}</p>
            <button
              type="button"
              onClick={() => loadContext("Loading your transfer eligibility...")}
              className="mt-3 rounded-full border border-primary px-5 py-2 text-sm font-bold text-primary"
            >
              Retry
            </button>
          </div>
        )}

        {!loadingContext && !loadError && !canUseTransfer && (
          <div className="mx-auto max-w-xl rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
            <h2 className="text-xl font-bold text-white">Transfer Nuggets Locked</h2>
            <p className="mt-3 text-sm text-tertiary">
              Transfer Nuggets is only available for Mining Station owners with{" "}
              {MIN_TRANSFER_REFERRALS} or more referrals and completed KYC.
            </p>
            <div className="mt-5 grid gap-3 text-left text-sm text-tertiary sm:grid-cols-2">
              <div className="rounded-xl bg-[#202020] p-4">
                <p className="text-xs uppercase text-tertiary">Your referrals</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {rules.referralCount}/{MIN_TRANSFER_REFERRALS}
                </p>
              </div>
              <div className="rounded-xl bg-[#202020] p-4">
                <p className="text-xs uppercase text-tertiary">KYC status</p>
                <p className="mt-2">
                  <KycBadge status={rules.senderKyc} />
                </p>
              </div>
            </div>
          </div>
        )}

        {canUseTransfer && step !== "success" && <StepDots step={step} />}

        {canUseTransfer && step === "recipient" && (
          <div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your referrals by name or email"
              className="mb-4 w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-white placeholder:text-tertiary focus:border-primary focus:outline-none"
            />
            {kycBlock && (
              <div className="mb-4 rounded-xl border border-[#F44336]/40 bg-[#F44336]/10 p-4">
                <p className="text-sm font-semibold text-[#F44336]">{kycBlock}</p>
              </div>
            )}
            <div className="space-y-3">
              {filteredRecipients.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleRecipientSelect(item)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#2a2a2a] p-4 text-left transition-colors hover:border-primary"
                >
                  <Avatar name={item.name} email={item.email} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{item.name}</p>
                    <p className="truncate text-sm text-tertiary">{item.email}</p>
                  </div>
                  <KycBadge status={item.kycStatus} />
                </button>
              ))}
              {filteredRecipients.length === 0 && (
                <p className="py-8 text-center text-tertiary">
                  No referral recipients found.
                </p>
              )}
            </div>
          </div>
        )}

        {canUseTransfer && step === "amount" && recipient && (
          <div>
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#2a2a2a] p-4">
              <Avatar name={recipient.name} email={recipient.email} />
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase text-tertiary">To</p>
                <p className="truncate font-bold text-white">{recipient.name}</p>
                <p className="truncate text-sm text-tertiary">{recipient.email}</p>
              </div>
              <KycBadge status={recipient.kycStatus} />
            </div>

            <div className="mb-6 grid gap-3 md:grid-cols-2">
              <SourceOption
                active={source === "mined"}
                title="Mined Balance"
                description="Currently mined, unwithdrawn BTCY Nugget balance."
                balance={rules.minedBalance}
                onClick={() => {
                  setSource("mined");
                  setAmountError(null);
                }}
              />
              <SourceOption
                active={source === "withdrawn"}
                title="Withdrawn Balance"
                description="BTCY Nuggets already withdrawn and available in your Stellar wallet record."
                balance={rules.withdrawnBalance}
                onClick={() => {
                  setSource("withdrawn");
                  setAmountError(null);
                }}
              />
            </div>

            <label className="mb-2 block text-sm font-semibold text-tertiary">
              Amount (BTCY Nuggets)
            </label>
            <div
              className={`flex items-center rounded-xl border bg-[#2a2a2a] px-4 ${
                amountError ? "border-[#F44336]" : "border-white/10"
              }`}
            >
              <input
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value.replace(/[^0-9]/g, ""));
                  setAmountError(null);
                  setKycBlock(null);
                  setSubmitError(null);
                }}
                inputMode="numeric"
                placeholder="0.00"
                className="w-full bg-transparent py-4 text-2xl font-bold text-white placeholder:text-tertiary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setAmount(String(Math.floor(selectedBalance)));
                  setAmountError(null);
                }}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-primary"
              >
                MAX
              </button>
            </div>
            <p className="mt-2 text-sm text-tertiary">
              Available from {sourceLabel}: {formatNuggets(selectedBalance)} Nuggets
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

            <div className="mt-4 rounded-xl border border-white/10 bg-[#202020] p-4">
              <p className="text-sm font-bold text-white">Requirements</p>
              <p className="mt-2 text-sm leading-6 text-tertiary">
                Minimum transfer is {formatNuggets(MIN_TRANSFER_NUGGETS)} Nuggets.
                Sender must have at least {MIN_TRANSFER_REFERRALS} referrals. Receiver
                always gets the transfer into transferable mining balance.
              </p>
            </div>

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

        {canUseTransfer && step === "review" && recipient && (
          <div>
            <div className="mb-6 text-center">
              <p className="text-4xl font-extrabold text-primary">
                {formatNuggets(numericAmount)}
              </p>
              <p className="mt-1 text-sm text-tertiary">BTCY Nuggets</p>
              <p className="mt-3 inline-flex rounded-full border border-primary px-4 py-1 text-sm font-bold text-primary">
                From {sourceLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-5">
              <p className="mb-3 text-xs uppercase text-tertiary">Recipient</p>
              <div className="flex items-center gap-3">
                <Avatar name={recipient.name} email={recipient.email} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-white">{recipient.name}</p>
                  <p className="truncate text-sm text-tertiary">{recipient.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#202020] p-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-tertiary">Selected balance source</span>
                <span className="font-semibold text-white">{sourceLabel}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-sm">
                <span className="text-tertiary">Transfer fee</span>
                <span className="font-semibold text-white">No fee</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-sm">
                <span className="text-tertiary">You send</span>
                <span className="font-semibold text-white">
                  {formatNuggets(numericAmount)} Nuggets
                </span>
              </div>
              <p className="mt-4 text-xs text-tertiary">
                Receiver will receive this in transferable mining balance.
              </p>
            </div>

            {submitError && (
              <div className="mt-4 rounded-xl border border-[#F44336]/40 bg-[#F44336]/10 p-4">
                <p className="text-sm font-semibold text-[#F44336]">{submitError}</p>
              </div>
            )}

            {submitting && (
              <div className="mt-4 rounded-xl border border-white/10 bg-[#2a2a2a] p-4 text-center text-sm font-semibold text-tertiary">
                Loading transfer details...
              </div>
            )}

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
                text={submitting ? "Sending..." : "Confirm & Send"}
                onClick={handleConfirm}
                disabled={submitting}
                imageStyling="h-24 w-auto object-contain"
                ariaLabel="Confirm and send"
              />
            </div>
          </div>
        )}

        {canUseTransfer && step === "success" && recipient && (
          <div className="mt-18 rounded-2xl bg-[#2a2a2a] p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Transfer Successful</h2>
            <p className="mt-2 text-tertiary">
              You sent{" "}
              <span className="font-bold text-primary">
                {formatNuggets(numericAmount)} Nuggets
              </span>{" "}
              to {recipient.name}.
            </p>
            <div className="mx-auto mt-6 max-w-xs rounded-xl bg-[#202020] p-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-tertiary">Transaction ID</span>
                <span className="truncate font-mono text-white">{txnId}</span>
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
