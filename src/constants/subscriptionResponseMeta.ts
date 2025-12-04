export const SUBSCRIPTION_RESPONSE_FIELDS: Array<{
  label: string;
  param: string;
}> = [
  { label: "Record ID", param: "recordId" },
  { label: "Subscription ID", param: "subscription_id" },
  { label: "Agreement ID", param: "agreementId" },
  { label: "Token", param: "token" },
  { label: "BA Token", param: "ba_token" },
  { label: "Session ID", param: "sessionId" },
  { label: "Approval URL", param: "approvalUrl" },
  { label: "Session URL", param: "sessionUrl" },
];

const DEFAULT_PLAN_NAME = "Turbo Mining";

const PLAN_MATCHERS: Array<[string, string]> = [
  ["electric", "Electric Mining"],
  ["nuclear", "Nuclear Mining"],
  ["power", "Power Mining"],
  ["turbo", "Turbo Mining"],
];

const PLAN_ROUTE_MAP: Record<string, string> = {
  electric: "/mining/electric-mining",
  turbo: "/mining/turbo-mining",
  nuclear: "/mining/nuclear-mining",
  power: "/mining/power-mining",
};

export const derivePlanName = (value?: string | null) => {
  const normalized = (value ?? "").toLowerCase();
  const match = PLAN_MATCHERS.find(([key]) => normalized.includes(key));
  return match ? match[1] : DEFAULT_PLAN_NAME;
};

export const derivePlanRoute = (value?: string | null) => {
  const normalized = (value ?? "").toLowerCase();
  const match = Object.entries(PLAN_ROUTE_MAP).find(([key]) =>
    normalized.includes(key)
  );
  return match ? match[1] : "/subscription";
};
