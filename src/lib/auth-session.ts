export const AUTH_SESSION_INVALID_EVENT = "bitcoin-yay:auth-session-invalid";

export const invalidateAuthSession = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_SESSION_INVALID_EVENT));
};

const getBearerToken = (authorization?: string | null): string | null => {
  if (!authorization) return null;
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
};

export const isAuthorizationTokenExpired = (
  authorization?: string | null
): boolean => {
  const token = getBearerToken(authorization);
  if (!token) return false;

  try {
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) return false;
    const normalized = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const payload = JSON.parse(window.atob(padded)) as { exp?: number };
    return typeof payload.exp === "number" && Date.now() >= payload.exp * 1000;
  } catch {
    return false;
  }
};

export const invalidateIfAuthorizationExpired = (
  authorization?: string | null
): boolean => {
  const expired = isAuthorizationTokenExpired(authorization);
  if (expired) invalidateAuthSession();
  return expired;
};

export const isInvalidAuthError = (message?: string): boolean =>
  Boolean(
    message &&
      /(unauthorized|invalid\s+(?:or\s+expired\s+)?token|expired\s+token|invalid\s+session)/i.test(
        message
      )
  );

export const handleAuthFailure = (
  response: Pick<Response, "status">,
  payload?: { error?: string; message?: string }
): boolean => {
  const invalid =
    response.status === 401 ||
    isInvalidAuthError(payload?.error) ||
    isInvalidAuthError(payload?.message);

  if (invalid) invalidateAuthSession();
  return invalid;
};
