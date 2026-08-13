// Reusable business-rule note explaining Company Buyback vs P2P eligibility.
// Placed on Buy BTCY, Wallet, Alchemy, Sell, P2P and FAQ per the spec.

type Props = {
  className?: string;
  /** "full" shows the two-line explanation; "compact" is a single line. */
  variant?: "full" | "compact";
};

export default function BuybackRuleNote({
  className = "",
  variant = "full",
}: Props) {
  return (
    <div
      className={`rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-tertiary ${className}`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden className="mt-0.5 text-primary">
          ⓘ
        </span>
        <div className="space-y-1 leading-relaxed">
          <p>
            <span className="font-semibold text-white">Purchased BTCY</span>{" "}
            (bought directly from the company) may be eligible for the{" "}
            <span className="text-primary font-medium">Company Buyback</span>{" "}
            program.
          </p>
          {variant === "full" && (
            <p>
              <span className="font-semibold text-white">Earned BTCY</span> (from
              Mining &amp; Alchemy) is{" "}
              <span className="text-primary font-medium">not</span> eligible for
              Company Buyback and must be traded on the{" "}
              <span className="text-primary font-medium">P2P Marketplace</span>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
