"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import CustomButton2 from "@/components/CustomButton2";
import LoginButtonImage from "@/assets/images/buttons/login-button.webp";
import SubmitButtonImage from "@/assets/images/buttons/submit-button.webp";
import ImageUploadSection, {
  UploadedImage,
} from "@/components/social-campaign/ImageUploadSection";
import {
  CampaignSubmission,
  SocialCampaignStatus,
  getMySubmission,
  submitCampaign,
  uploadImagesForApp,
} from "@/lib/social-campaign";

const STATUS_META: Record<
  SocialCampaignStatus,
  { label: string; color: string; icon: string }
> = {
  pending: { label: "Pending Review", color: "#FFC107", icon: "⏳" },
  approved: { label: "Approved", color: "#4CAF50", icon: "✅" },
  rejected: { label: "Rejected", color: "#F44336", icon: "✕" },
};

const SocialCampaignPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submission, setSubmission] = useState<CampaignSubmission | null>(null);

  const [btcyImages, setBtcyImages] = useState<UploadedImage[]>([]);
  const [emmmImages, setEmmmImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<{ btcy?: string; emmm?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const loadSubmission = useCallback(async () => {
    try {
      setLoadingSubmission(true);
      setLoadError(null);
      const current = await getMySubmission();
      setSubmission(current);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Failed to load your campaign status. Please try again."
      );
    } finally {
      setLoadingSubmission(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      setLoginOpen(true);
      setChecked(true);
      return;
    }
    setChecked(true);
    loadSubmission();
  }, [user, isLoading, loadSubmission]);

  const handleSubmit = async () => {
    if (!user || submitting) return;

    const nextErrors: { btcy?: string; emmm?: string } = {};
    if (btcyImages.length === 0)
      nextErrors.btcy = "Please upload at least one Bitcoin Yay screenshot.";
    if (emmmImages.length === 0)
      nextErrors.emmm = "Please upload at least one EMMM screenshot.";
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      setSubmitStage("Uploading Bitcoin Yay screenshots…");
      const [bitcoinyayImageKeys, emmmImageKeys] = await Promise.all([
        uploadImagesForApp(
          "bitcoinyay",
          btcyImages.map((img) => img.file)
        ),
        (async () => {
          setSubmitStage("Uploading EMMM screenshots…");
          return uploadImagesForApp(
            "emmm",
            emmmImages.map((img) => img.file)
          );
        })(),
      ]);

      setSubmitStage("Submitting your campaign entry…");
      const sub = await submitCampaign({ bitcoinyayImageKeys, emmmImageKeys });

      [...btcyImages, ...emmmImages].forEach((img) =>
        URL.revokeObjectURL(img.previewUrl)
      );
      setBtcyImages([]);
      setEmmmImages([]);
      setSubmission(sub);
      setJustSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit your campaign entry. Please try again."
      );
      // A submission may already exist (e.g. race from another tab) — refresh to reflect the true state.
      loadSubmission();
    } finally {
      setSubmitStage(null);
      setSubmitting(false);
    }
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
          Sign in to join the campaign
        </h1>
        <p className="max-w-md text-tertiary">
          You need to be logged in to submit your social media campaign proof.
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

  const showForm =
    !loadingSubmission && !loadError && (!submission || submission.status === "rejected");

  return (
    <div className="min-h-screen bg-[#202020] px-4 pb-24 pt-28 md:px-8">
      <div className="mx-auto w-full max-w-3xl mt-10">
        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Submit Your Social Proof
          </h1>
          <p className="mt-3 text-tertiary">
            Follow our official channels, upload your screenshots, and claim your reward.
          </p>
        </div>

        {/* Loading current submission status */}
        {loadingSubmission && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 text-center text-tertiary">
            Loading your campaign status…
          </div>
        )}

        {/* Failed to load current submission status */}
        {loadError && (
          <div className="mb-6 rounded-2xl border border-[#F44336]/40 bg-[#F44336]/10 p-5 text-center">
            <p className="text-sm font-semibold text-[#F44336]">{loadError}</p>
            <button
              type="button"
              onClick={loadSubmission}
              className="mt-3 rounded-full border border-primary px-5 py-2 text-sm font-bold text-primary"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success banner (just submitted) */}
        {justSubmitted && (
          <div className="mb-6 rounded-2xl border border-[#4CAF50]/40 bg-[#4CAF50]/10 p-5 text-center">
            <p className="text-lg font-bold text-[#4CAF50]">
              Submission received successfully!
            </p>
            <p className="mt-1 text-sm text-tertiary">
              Our team will review your documents shortly.
            </p>
          </div>
        )}

        {/* Already submitted -> status card */}
        {!loadingSubmission && submission && !showForm && (
          <StatusCard submission={submission} />
        )}

        {/* Form (new or after rejection) */}
        {showForm && (
          <>
            {submission?.status === "rejected" && (
              <div className="mb-6 rounded-2xl border border-[#F44336]/40 bg-[#F44336]/10 p-5">
                <p className="font-bold text-[#F44336]">
                  Your previous submission was rejected.
                </p>
                {submission.rejectionReason ? (
                  <p className="mt-1 text-sm text-tertiary">
                    Reason: {submission.rejectionReason}
                  </p>
                ) : null}
                <p className="mt-1 text-sm text-tertiary">
                  You can upload a new submission below.
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#2a2a2a] p-5 md:p-6">
              <h2 className="mb-3 text-lg font-bold text-white">Instructions</h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-tertiary">
                <li>
                  Follow <span className="text-white">all official Bitcoin Yay</span> social
                  media accounts (Facebook, Instagram, X, LinkedIn).
                </li>
                <li>
                  Follow <span className="text-white">all official EMMM</span> social media
                  accounts.
                </li>
                <li>Take screenshots showing that you are following each account.</li>
                <li>Upload the screenshots in the matching sections below and submit.</li>
              </ol>
              <p className="mt-3 text-sm text-tertiary">
                Our team will review your submission and approve your reward once all
                requirements are met.
              </p>
            </div>

            {/* Upload sections */}
            <div className="space-y-6">
              <ImageUploadSection
                title="Bitcoin Yay Social Media Proof"
                hint="Screenshots proving you follow all Bitcoin Yay accounts — Facebook, Instagram, X (Twitter), LinkedIn, and any other official BTCY platforms."
                images={btcyImages}
                onChange={(imgs) => {
                  setBtcyImages(imgs);
                  if (imgs.length) setErrors((e) => ({ ...e, btcy: undefined }));
                }}
                error={errors.btcy}
                disabled={submitting}
              />

              <ImageUploadSection
                title="EMMM Social Media Proof"
                hint="Screenshots proving you follow all official EMMM social media accounts."
                images={emmmImages}
                onChange={(imgs) => {
                  setEmmmImages(imgs);
                  if (imgs.length) setErrors((e) => ({ ...e, emmm: undefined }));
                }}
                error={errors.emmm}
                disabled={submitting}
              />
            </div>

            {/* Submit error */}
            {submitError && (
              <div className="mt-6 rounded-2xl border border-[#F44336]/40 bg-[#F44336]/10 p-4 text-center">
                <p className="text-sm font-semibold text-[#F44336]">{submitError}</p>
              </div>
            )}

            {/* Submit */}
            <div className="mt-8 flex justify-center">
              <CustomButton2
                image={SubmitButtonImage}
                text={submitting ? submitStage ?? "Submitting…" : "Submit Campaign"}
                onClick={handleSubmit}
                disabled={submitting}
                imageStyling="w-32"
                ariaLabel="Submit Campaign"
              />
            </div>
            <p className="mt-3 text-center text-xs text-tertiary">
              Only one active submission per user is allowed.
            </p>
          </>
        )}

        {/* Back to home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-tertiary underline-offset-2 hover:text-primary hover:underline"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{ submission: CampaignSubmission }> = ({ submission }) => {
  const meta = STATUS_META[submission.status];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#2a2a2a] p-6 md:p-8">
      <h2 className="mb-6 text-center text-xl font-bold text-white">Campaign Status</h2>

      <div className="mb-6 rounded-xl border border-[#4CAF50]/30 bg-[#4CAF50]/10 p-4 text-center">
        <p className="text-[#4CAF50]">
          ✅ Your campaign documents have already been submitted.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-tertiary">Current Status</span>
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
          style={{ color: meta.color, backgroundColor: `${meta.color}22` }}
        >
          <span>{meta.icon}</span>
          {meta.label}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-tertiary">Submitted On</span>
        <span className="text-sm text-white">
          {new Date(submission.submittedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {submission.status === "approved" && (
        <p className="mt-6 rounded-xl bg-primary/10 p-4 text-center text-sm text-primary">
          🎁 Your reward ({submission.rewardDays ?? 14} Days of Turbo Mining Power) has been
          applied to your account.
        </p>
      )}

      <p className="mt-6 text-center text-xs text-tertiary">
        You cannot submit another request unless your previous submission is rejected or
        removed by an administrator.
      </p>
    </div>
  );
};

export default SocialCampaignPage;
