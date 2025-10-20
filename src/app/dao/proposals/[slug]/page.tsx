"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Image from "next/image";

import RoleImage1 from "@/assets/images/dao/Leader.webp";
import RoleImage2 from "@/assets/images/dao/Validator.webp";
import RoleImage3 from "@/assets/images/dao/Managers.webp";
import RoleImage4 from "@/assets/images/dao/Thinkers.webp";
import RoleImage5 from "@/assets/images/dao/Contributors.webp";

import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";

interface Proposal {
  proposalNumber: number;
  proposalTitle: string;
  createdByRole: string;
  summary: string;
  votingPeriod: string;
  requiredRole: string;
  votes: { vote: "yes" | "no" | "abstain" }[];
}

export default function ProposalDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const proposalId = params.slug as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [selectedVote, setSelectedVote] = useState<
    "yes" | "no" | "abstain" | null
  >(null);
  const [loadingVote, setLoadingVote] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [yesPct, setYesPct] = useState(0);
  const [noPct, setNoPct] = useState(0);
  const [abstainPct, setAbstainPct] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const roleImages = {
    leader: RoleImage1,
    validator: RoleImage2,
    manager: RoleImage3,
    thinker: RoleImage4,
    contributor: RoleImage5,
  };

  const extractProposalNumber = (id: string): number => {
    const match = id?.match(/\d+/); // extract the first number
    return match ? parseInt(match[0]) : 0;
  };

  const handleVoteSelection = (vote: "yes" | "no" | "abstain") => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }
    setSelectedVote(vote);
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(
          `https://api.v1.indexx.ai/api/v1/dao/getProposalDetail/${proposalId}`
        );
        const data = await response.json();

        const yesVotes =
          data?.data?.votes?.filter((v: any) => v.vote === "yes").length ?? 0;
        const noVotes =
          data?.data?.votes?.filter((v: any) => v.vote === "no").length ?? 0;
        const abstainVotes =
          data?.data?.votes?.filter((v: any) => v.vote === "abstain").length ??
          0;
        const totalVotes = yesVotes + noVotes + abstainVotes;

        const mappedProposal: Proposal = {
          proposalNumber: extractProposalNumber(data?.data?.proposalId),
          proposalTitle: data?.data?.title ?? "Untitled",
          createdByRole: data?.data?.createdByRole?.toLowerCase() ?? "leader",
          summary:
            data?.data?.summary ??
            data?.data?.description ??
            "No summary provided.",
          votingPeriod: formatVotingPeriod(
            data?.data?.startDate,
            data?.data?.endDate
          ),
          requiredRole: data?.data?.roleRequired ?? "Member",
          votes: data?.data?.votes ?? [],
        };

        if (
          user?.email &&
          data?.data?.votes?.some((v: any) => v.user === user.email)
        ) {
          setHasVoted(true);
        }

        setYesPct(Math.round((yesVotes / totalVotes) * 100) || 0);
        setNoPct(Math.round((noVotes / totalVotes) * 100) || 0);
        setAbstainPct(Math.round((abstainVotes / totalVotes) * 100) || 0);

        setProposal(mappedProposal);
      } catch (err) {
        console.error("Failed to fetch proposal details:", err);
      }
    };

    fetchProposal();
  }, [proposalId]);

  const formatVotingPeriod = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleDateString()} – ${e.toLocaleDateString()}`;
  };

  if (!proposal) {
    return (
      <div className="mt-40 container mx-auto px-4 text-center text-3xl">
        Loading proposal...
      </div>
    );
  }

  const submitVote = async () => {
    if (!proposalId || !selectedVote || !user) return;
    setLoadingVote(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/voteProposal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            proposalId,
            vote: selectedVote,
            user: user?.email,
          }),
        }
      );

      if (res.ok) {
        setVoteSuccess(true);
      } else {
        const errorData = await res.json();
        alert("Vote failed: " + errorData.message);
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Vote submission failed.");
    } finally {
      setLoadingVote(false);
    }
  };

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mt-40 md:mt-60 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-bold text-primary">
          DAO Proposal Detail & Voting
        </h2>
        <h1 className="text-2xl mb-4 font-semibold">
          Proposal <span className="text-5xl">#{proposal.proposalNumber}</span>{" "}
          — {proposal.proposalTitle}
        </h1>
      </div>

      <div className="mt-20 md:mt-40">
        <h2 className="text-3xl md:text-6xl xl:text-8xl font-bold mb-8">
          Proposal Details
        </h2>

        <div className="mt-0 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Created By
          </h3>
          <div className="mt-6 flex items-center">
            <Image
              src={
                roleImages[proposal.createdByRole as keyof typeof roleImages]
              }
              alt="Role image"
              className="w-14 mr-2 md:mr-4"
            />
            <p className="text-2xl md:text-3xl">
              {proposal.createdByRole.charAt(0).toUpperCase() +
                proposal.createdByRole.slice(1)}{" "}
              Gopher
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Summary:
          </h3>
          <div className="mt-6">
            <span className="text-xl md:text-2xl xl:text-3xl">
              {proposal.summary}
            </span>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Voting Period:
          </h3>
          <div className="mt-6">
            <span className="text-xl md:text-2xl xl:text-3xl">
              {proposal.votingPeriod}
            </span>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Required Role
          </h3>
          <div className="mt-6">
            <span className="text-xl md:text-2xl xl:text-3xl">
              {proposal.requiredRole}
            </span>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Current Vote Results
          </h3>
          <div className="mt-10 max-w-2xl">
            <div className="flex justify-between mb-2 text-xl md:text-2xl xl:text-3xl">
              <span className="text-green-600">Yes: {yesPct}%</span>
              <span className="text-red-600">No: {noPct}%</span>
              <span className="text-gray-600">Abstain: {abstainPct}%</span>
            </div>
            <div className="relative w-full h-4 md:h-6 bg-secondary rounded-full overflow-hidden flex">
              <div
                className="h-full bg-green-600"
                style={{ width: `${yesPct}%` }}
              />
              <div
                className="h-full bg-red-600"
                style={{ width: `${noPct}%` }}
              />
              <div
                className="h-full bg-gray-500 rounded-r-full"
                style={{ width: `${abstainPct}%` }}
              />
            </div>
          </div>
        </div>

        {hasVoted ? (
          <p className="text-blue-600 text-xl mt-4">
            ✅ You have already voted on this proposal.
          </p>
        ) : (
          <>
            {/* Voting Buttons */}
            <div className="mt-20 md:mt-40 flex flex-col items-center gap-10">
              <div className="flex gap-10 md:gap-24">
                <CustomButton
                  text="Vote Yes"
                  index={0}
                  handleButtonClick={() => handleVoteSelection("yes")}
                  isActive={selectedVote === "yes"}
                />
                <CustomButton
                  text="Vote No"
                  index={1}
                  handleButtonClick={() => handleVoteSelection("no")}
                  isActive={selectedVote === "no"}
                />
                <CustomButton
                  text="Abstain"
                  index={2}
                  handleButtonClick={() => handleVoteSelection("abstain")}
                  isActive={selectedVote === "abstain"}
                />
              </div>

              {selectedVote && (
                <CustomButton
                  text={
                    loadingVote
                      ? "Submitting..."
                      : `Submit ${selectedVote.toUpperCase()}`
                  }
                  index={3}
                  handleButtonClick={submitVote}
                  isActive={true}
                />
              )}

              {voteSuccess && (
                <p className="text-green-600 text-xl mt-4">
                  ✅ Vote submitted successfully!
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onRegisterClick={() => setIsLoginPopupOpen(false)}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
