"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlchemySessionRecord,
  getAlchemySessionsByEmail,
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

export default function AlchemyHistoryPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [sessions, setSessions] = useState<AlchemySessionRecord[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

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
          status?.toLowerCase() === "completed"
            ? "bg-green-400"
            : "bg-yellow-400"
        }`}
      ></div>
      <span className="text-sm text-white">{status ?? "Unknown"}</span>
    </div>
  );

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
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, index) => {
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

                    return (
                      <tr key={sessionId} className="border-b border-bg2">
                        <td className="py-10 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white font-mono">
                              {sessionId}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(sessionId, sessionId)
                              }
                              className="p-1 hover:bg-bg2 rounded transition-colors"
                              title="Copy"
                            >
                              <Copy
                                className={`w-4 h-4 ${
                                  copiedId === sessionId
                                    ? "text-primary"
                                    : "text-tertiary"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-white">
                          {stage}
                        </td>
                        <td className="py-4 px-4 text-sm text-white">
                          {formatAmount(session.inputAmount)}
                        </td>
                        <td className="py-4 px-4 text-sm text-white">
                          {formatAmount(session.resultAmount)}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary font-semibold">
                          {multiplier}
                        </td>
                        <td className="py-4 px-4 text-sm text-white">
                          {algorithmInfo}
                        </td>
                        <td className="py-4 px-4 text-sm text-white">
                          {completed}
                        </td>
                        <td className="py-4 px-4">
                          {renderStatusDot(session.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {sessions.map((session, index) => {
                const sessionId =
                  session.sessionId ?? session._id ?? `${index}`;
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
                          onClick={() =>
                            copyToClipboard(sessionId, sessionId)
                          }
                          className="p-1 hover:bg-bg2 rounded transition-colors flex-shrink-0"
                          title="Copy"
                        >
                          <Copy
                            className={`w-4 h-4 ${
                              copiedId === sessionId
                                ? "text-primary"
                                : "text-tertiary"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
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
                      <p className="text-xs text-tertiary mb-1">
                        Initial Nuggets
                      </p>
                      <p className="text-sm text-white">
                        {formatAmount(session.inputAmount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-tertiary mb-1">Final Tokens</p>
                      <p className="text-sm text-white">
                        {formatAmount(session.resultAmount)}
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
                  </div>
                );
              })}
            </div>
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
