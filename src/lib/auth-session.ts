export const AUTH_SESSION_INVALID_EVENT = "bitcoin-yay:auth-session-invalid";

export const invalidateAuthSession = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_SESSION_INVALID_EVENT));
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
