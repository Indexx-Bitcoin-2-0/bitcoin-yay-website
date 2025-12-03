export interface ActiveLiquidityPoolResponse {
  current?: number;
  currentLiquidity?: number;
  target?: number;
  targetLiquidity?: number;
  poolCapacity?: number;
  poolSize?: number;
  initialBalanceUsd?: number;
  remainingBalanceUsd?: number;
  cooldownEnd?: string | number;
  cooldown_end?: string | number;
  cooldownExpiresAt?: string | number;
  retryAt?: string | number;
  retry_at?: string | number;
  nextRetryAt?: string | number;
}

export interface NormalizedActiveLiquidityPool {
  current: number;
  target: number;
  poolCapacity?: number;
  poolSize?: number;
  remainingBalanceUsd?: number;
}

const ALCHEMY_ACTIVE_POOL_URL =
  "https://api.v1.indexx.ai/api/v2/bitcoinyay/alchemy/liquidity/pools/active";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Could not read the liquidity pool – the request was malformed.",
  403: "Access to the liquidity pool is restricted. Please log in or try again later.",
  429: "Too many requests while loading the liquidity pool.",
  500: "The liquidity service is temporarily unavailable.",
};

export const DEFAULT_ACTIVE_LIQUIDITY_POOL: NormalizedActiveLiquidityPool = {
  current: 650_000,
  target: 1_000_000,
};

export async function fetchActiveLiquidityPool(
  token?: string,
  signal?: AbortSignal
): Promise<NormalizedActiveLiquidityPool> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(ALCHEMY_ACTIVE_POOL_URL, {
    headers,
    signal,
    cache: "no-cache",
  });

  const body = await response.json().catch(() => null);
  const payload =
    ((body?.data ?? body) as ActiveLiquidityPoolResponse | null) ?? null;

  if (!response.ok) {
    const message = getPoolErrorMessage(response.status, payload, response.headers);
    throw new Error(message);
  }

  if (!payload) {
    throw new Error("Received invalid liquidity data.");
  }

  return normalizeActiveLiquidityPool(payload);
}

const getPoolErrorMessage = (
  status: number,
  payload: ActiveLiquidityPoolResponse | null,
  headers: Headers
): string => {
  let message = STATUS_MESSAGES[status] ?? "Unable to load the liquidity pool.";

  if (status === 429) {
    const cooldown = formatCooldownTimestamp(payload, headers);
    if (cooldown) {
      message = `${message} Try again after ${cooldown}.`;
    }
  }

  return message;
};

const formatCooldownTimestamp = (
  payload: ActiveLiquidityPoolResponse | null,
  headers: Headers
): string | null => {
  const candidates = [
    payload?.cooldownEnd,
    payload?.cooldown_end,
    payload?.cooldownExpiresAt,
    payload?.retryAt,
    payload?.retry_at,
    payload?.nextRetryAt,
  ];

  for (const candidate of candidates) {
    const formatted = formatTimestamp(candidate);
    if (formatted) {
      return formatted;
    }
  }

  const retryAfter = headers.get("Retry-After");
  if (retryAfter) {
    const parsed = parseRetryAfter(retryAfter);
    if (parsed) {
      return parsed;
    }
  }

  return null;
};

const normalizeActiveLiquidityPool = (
  payload: ActiveLiquidityPoolResponse
): NormalizedActiveLiquidityPool => {
  const current =
    toFiniteNumber(payload.current) ??
    toFiniteNumber(payload.currentLiquidity) ??
    toFiniteNumber(payload.poolSize) ??
    computeCurrentFromUsd(payload) ??
    DEFAULT_ACTIVE_LIQUIDITY_POOL.current;

  let target =
    toFiniteNumber(payload.target) ??
    toFiniteNumber(payload.targetLiquidity) ??
    toFiniteNumber(payload.poolCapacity) ??
    toFiniteNumber(payload.initialBalanceUsd);

  if (!target || target <= 0) {
    target = Math.max(current, 1);
  }

  return {
    current,
    target,
    poolCapacity:
      toFiniteNumber(payload.poolCapacity) ?? toFiniteNumber(payload.target) ?? target,
    poolSize: toFiniteNumber(payload.poolSize) ?? toFiniteNumber(payload.current) ?? current,
    remainingBalanceUsd: toFiniteNumber(payload.remainingBalanceUsd),
  };
};

const computeCurrentFromUsd = (
  payload: ActiveLiquidityPoolResponse
): number | undefined => {
  const initial = toFiniteNumber(payload.initialBalanceUsd);
  const remaining = toFiniteNumber(payload.remainingBalanceUsd);

  if (initial === undefined || remaining === undefined) {
    return undefined;
  }

  return Math.max(initial - remaining, 0);
};

const toFiniteNumber = (value?: number | string): number | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(parsed)) {
    return parsed;
  }

  return undefined;
};

const formatTimestamp = (value?: string | number): string | null => {
  if (value === undefined || value === null) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleString();
};

const parseRetryAfter = (headerValue: string): string | null => {
  const asNumber = Number(headerValue);
  if (!Number.isNaN(asNumber)) {
    const date = new Date(Date.now() + asNumber * 1000);
    return date.toLocaleString();
  }

  return formatTimestamp(headerValue);
};
