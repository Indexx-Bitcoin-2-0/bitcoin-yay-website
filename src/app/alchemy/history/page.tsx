"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";
import Link from "next/link";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlchemySessionRecord,
  ClickConvertSessionState,
  getAlchemySessionsByEmail,
  saveClickConvertSessionState,
} from "@/lib/alchemy";

function formatAmount(value?: number | string): string {
  if (value === undefined || value === null) return "—";
  if (typeof value === "number") {
    return value.toLocaleString("en-US");
  }
  return value;
}

function formatMultiplier(value?: number | string): string {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "number") {
    return `x${value.toFixed(2)}`;
  }
  return value.toString();
}

function formatDate(value?: string): string {
  if (!value) return "—";
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return value;
  }
  return new Date(parsed).toLocaleString("en-US");
}

const RECORDS_PER_PAGE = 10;

export default function AlchemyHistoryPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [sessions, setSessions] = useState<AlchemySessionRecord[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isAuthLoading, user]);

  useEffect(() => {
    if (!user) {
      setSessions([]);
      setIsLoadingSessions(false);
      return;
    }

    let isActive = true;
    setIsLoadingSessions(true);
    setSessionsError(null);

    const loadSessions = async () => {
      const result = await getAlchemySessionsByEmail(user.email);
      if (!isActive) return;
      if (result.error) {
        setSessionsError(result.error);
      }
      setSessions(result.sessions ?? []);
      setIsLoadingSessions(false);
    };

    loadSessions();

    return () => {
      isActive = false;
    };
  }, [user]);

  const handleLoginSuccess = () => setIsLoginPopupOpen(false);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const handleRegisterClick = () => setIsLoginPopupOpen(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredSessions = normalizedSearchTerm
    ? sessions.filter((session) => {
        const sessionId = (session.sessionId ?? session._id ?? "").toString();
        return sessionId.toLowerCase().includes(normalizedSearchTerm);
      })
    : sessions;

  const getSessionTimestamp = (session: AlchemySessionRecord) => {
    const dateValue =
      session.completedAt ?? session.startedAt ?? session.createdAt ?? "";
    const parsed = Date.parse(dateValue);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const sortedSessions = useMemo(
    () =>
      [...filteredSessions].sort(
        (a, b) => getSessionTimestamp(b) - getSessionTimestamp(a)
      ),
    [filteredSessions]
  );

  const totalPages = Math.max(1, Math.ceil(sortedSessions.length / RECORDS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedSessions = sortedSessions.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  const handleViewClaimInstructions = (session: AlchemySessionRecord) => {
    const state: ClickConvertSessionState = {
      ...session,
      sessionId: session.sessionId ?? session._id ?? "",
      email: user?.email ?? session.email ?? "",
      inputAmount: session.inputAmount ?? 0,
      createdAt:
        session.createdAt ?? session.startedAt ?? session.completedAt ?? new Date().toISOString(),
      startedAt: session.startedAt ?? session.createdAt,
      completedAt: session.completedAt,
    };

    saveClickConvertSessionState(state);
  };

  if (isAuthLoading) {
    return (
      <div className="mt-40 text-center text-3xl text-white">Loading...</div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-bg0 text-white flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Alchemy History
            </h1>
            <p className="text-sm md:text-base text-tertiary">
              Please log in to see your Nuggets-to-BTCY conversion history.
            </p>
            <button
              onClick={() => setIsLoginPopupOpen(true)}
              className="rounded-full border border-bg2 px-6 py-3 text-sm md:text-base font-semibold text-white hover:text-primary transition-colors"
            >
              Log in to continue
            </button>
          </div>
        </div>
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={handleCloseLoginPopup}
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={handleRegisterClick}
        />
      </>
    );
  }

  const renderStatusDot = (status?: string) => (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          status?.toLowerCase() === "completed" ? "bg-green-400" : "bg-yellow-400"
        }`}
      ></div>
      <span className="text-sm text-white">{status ?? "Unknown"}</span>
    </div>
  );

  const paginationSummary = filteredSessions.length
    ? `Showing ${Math.min(paginatedSessions.length, filteredSessions.length)} of ${filteredSessions.length} sessions`
    : "No sessions match your search yet.";

  return (
    <div className="min-h-screen bg-bg0 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 py-8 md:py-12 mt-40">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Alchemy History
          </h1>
          <p className="text-sm md:text-base text-tertiary">
            All Nuggets-to-BTCY conversions tied to your account via email.
          </p>
        </div>

        {isLoadingSessions ? (
          <p className="text-center text-lg text-tertiary">
            Loading your sessions...
          </p>
        ) : sessionsError ? (
          <p className="text-center text-lg text-red-500">{sessionsError}</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-lg text-tertiary">
            No Alchemy sessions found for your account.
          </p>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="w-full md:max-w-sm">
                <label
                  htmlFor="sessionSearch"
                  className="text-xs uppercase tracking-[0.3em] text-tertiary mb-1 block"
                >
                  Search sessions
                </label>
                <input
                  id="sessionSearch"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Enter transaction ID"
                  className="w-full rounded-lg border border-bg2 bg-bg1 px-4 py-3 text-sm text-white placeholder:text-tertiary focus:border-primary focus:outline-none"
                />
              </div>
              <p className="text-sm text-tertiary">{paginationSummary}</p>
            </div>

            {filteredSessions.length === 0 ? (
              <p className="text-center text-lg text-tertiary">
                No sessions match that session ID.
              </p>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full bg-transparent border-collapse">
                    <thead>
                      <tr className="border-b border-bg2">
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Transaction ID
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Stage
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Initial Nuggets
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Final Tokens
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Multiplier
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Details
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Completed
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Status
                        </th>
                        <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSessions.map((session, index) => {
                        const sessionId = session.sessionId ?? session._id ?? `${index}`;
                        const stage =
                          session.category ??
                          session.stage ??
                          session.notes ??
                          "Alchemy";
                        const algorithmInfo = session.notes ?? session.category ?? "—";
                        const multiplier = formatMultiplier(
                          session.multiplier ?? session.resultAmount
                        );
                        const completed = formatDate(
                          session.completedAt ?? session.startedAt ?? session.createdAt
                        );
                        const isStatusCompleted =
                          session.status?.toLowerCase() === "completed";

                        return (
                          <tr key={sessionId} className="border-b border-bg2">
                            <td className="py-10 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-white font-mono">
                                  {sessionId}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(sessionId, sessionId)}
                                  className="p-1 hover:bg-bg2 rounded transition-colors"
                                  title="Copy"
                                >
                                  <Copy
                                    className={`w-4 h-4 ${
                                      copiedId === sessionId ? "text-primary" : "text-tertiary"
                                    }`}
                                  />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-white">{stage}</td>
                            <td className="py-4 px-4 text-sm text-white">
                              {formatAmount(session.inputAmount)}
                              <span className="text-sm uppercase tracking-[0.1em] text-white ml-1">BTCY</span>
                            </td>
                            <td className="py-4 px-4 text-sm text-white">
                              {formatAmount(session.resultAmount)}
                              <span className="text-sm uppercase tracking-[0.1em] text-white ml-1">BTCY</span>
                            </td>
                            <td className="py-4 px-4 text-sm text-primary font-semibold">
                              {multiplier}
                            </td>
                            <td className="py-4 px-4 text-sm text-white">
                              {algorithmInfo}
                            </td>
                            <td className="py-4 px-4 text-sm text-white">{completed}</td>
                            <td className="py-4 px-4">{renderStatusDot(session.status)}</td>
                            <td className="py-4 px-4">
                              {isStatusCompleted ? (
                                <span className="text-xs text-tertiary">Completed</span>
                              ) : (
                                <Link
                                  href="/alchemy/outcome/result"
                                  onClick={() => handleViewClaimInstructions(session)}
                                  className="rounded-full border border-primary px-4 py-2 text-xs text-primary hover:bg-primary/10 transition-colors inline-flex items-center justify-center"
                                >
                                  Claim
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {paginatedSessions.map((session, index) => {
                    const sessionId = session.sessionId ?? session._id ?? `${index}`;
                    const stage =
                      session.category ??
                      session.stage ??
                      session.notes ??
                      "Alchemy";
                    const multiplier = formatMultiplier(
                      session.multiplier ?? session.resultAmount
                    );
                    const completed = formatDate(
                      session.completedAt ?? session.startedAt ?? session.createdAt
                    );
                    const isStatusCompleted =
                      session.status?.toLowerCase() === "completed";

                    return (
                      <div
                        key={`mobile-${sessionId}`}
                        className="border border-bg2 rounded-lg p-5 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-sm text-white font-mono">
                              {sessionId}
                            </span>
                            <button
                              onClick={() => copyToClipboard(sessionId, sessionId)}
                              className="p-1 hover:bg-bg2 rounded transition-colors flex-shrink-0"
                              title="Copy"
                            >
                              <Copy
                                className={`w-4 h-4 ${
                                  copiedId === sessionId ? "text-primary" : "text-tertiary"
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                session.status?.toLowerCase() === "completed"
                                  ? "bg-green-400"
                                  : "bg-yellow-400"
                              }`}
                            ></div>
                            <span className="text-sm text-white">
                              {session.status ?? "Completed"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Stage</p>
                          <p className="text-sm text-white">{stage}</p>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Multiplier</p>
                          <p className="text-sm text-primary font-semibold">
                            {multiplier}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Initial Nuggets</p>
                          <p className="text-sm text-white">
                          {formatAmount(session.inputAmount)}
                            <span className="text-sm uppercase tracking-[0.1em] text-white ml-1">BTCY</span>
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Final Tokens</p>
                          <p className="text-sm text-white">
                          {formatAmount(session.resultAmount)}
                            <span className="text-sm uppercase tracking-[0.1em] text-white ml-1">BTCY</span>
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Details</p>
                          <p className="text-sm text-white">
                            {session.notes ?? stage}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-tertiary mb-1">Completed</p>
                          <p className="text-sm text-white">{completed}</p>
                        </div>

                        <div>
                          {isStatusCompleted ? (
                            <p className="text-xs text-tertiary">Completed</p>
                          ) : (
                            <Link
                              href="/alchemy/outcome/result"
                              onClick={() => handleViewClaimInstructions(session)}
                              className="rounded-full border border-primary px-4 py-2 text-xs text-primary hover:bg-primary/10 transition-colors inline-flex items-center justify-center w-full text-center"
                            >
                              Claim
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredSessions.length > RECORDS_PER_PAGE && (
                  <div className="mt-6 flex flex-col gap-3 items-center justify-between text-sm text-tertiary md:flex-row">
                    <p>
                      Showing {" "}
                      <span className="text-white">{paginatedSessions.length}</span>
                      {" "}of {filteredSessions.length} sessions
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage <= 1}
                        className="rounded-full border border-bg2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:border-white/20 disabled:text-white/40"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-white">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage >= totalPages}
                        className="rounded-full border border-bg2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:cursor-not-allowed disabled:border-white/20 disabled:text-white/40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleRegisterClick}
      />
    </div>
  );
}
