"use client";

import { useEffect, useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";

export default function Proposals() {
  const [currentPage, setCurrentPage] = useState(1);
  const proposalsPerPage = 10;
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [isVoting, setIsVoting] = useState(false);
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);

  const [votingProposalId, setVotingProposalId] = useState<string | null>(null);
  const [isVotePopupOpen, setIsVotePopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const router = useRouter();
  const { user } = useAuth();

  const handleViewDetailsOnNewPage = (proposal: any) => {
    router.push(`/dao/proposals/${proposal.proposalId}`);
  };

  const fetchProposals = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/listProposal`
      );
      const data = response.data?.data || [];

      const mappedData = data.map((item: any, index: number) => {
        const timeRemaining = calculateTimeRemaining(item.endDate);

        const yesVotes = item.votes.filter((v: any) => v.vote === "yes").length;
        const noVotes = item.votes.filter((v: any) => v.vote === "no").length;

        const userHasVoted =
          user?.email && item.votes?.some((v: any) => v.user === user.email);

        return {
          id: index + 1,
          title: item.title,
          description: item.description,
          status: item.status,
          creator: item.createdBy,
          createdOn: new Date(item.startDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          proposalId: item.proposalId,
          timeRemaining,
          yesVotes,
          noVotes,
          hoursRemaining: extractHoursLeft(timeRemaining),
          hasVoted: userHasVoted,
        };
      });

      setProposals(mappedData);
    } catch {
      setError("Failed to fetch proposals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  function calculateTimeRemaining(endDate: string): string {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Completed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h`;
  }

  function extractHoursLeft(time: string): number {
    const match = time.match(/(\d+)d\s*(\d+)h/);
    if (match) {
      return parseInt(match[1]) * 24 + parseInt(match[2]);
    }
    return 999;
  }

  const getFilteredProposals = () => {
    switch (selectedCategory) {
      case "Recent":
        return [...proposals].sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
      case "Popular":
        return [...proposals].sort(
          (a, b) => b.yesVotes + b.noVotes - (a.yesVotes + a.noVotes)
        );
      case "Ending Soon":
        return proposals
          .filter(
            (p) => p.status === "Voting" && p.timeRemaining !== "Completed"
          )
          .sort((a, b) => a.hoursRemaining - b.hoursRemaining);
      default:
        return proposals;
    }
  };

  const filteredProposals = getFilteredProposals();
  const totalPages = Math.ceil(filteredProposals.length / proposalsPerPage);
  const startIndex = (currentPage - 1) * proposalsPerPage;
  const endIndex = startIndex + proposalsPerPage;
  const currentProposals = filteredProposals.slice(startIndex, endIndex);

  const categories = ["Recent", "Popular", "Ending Soon"];

  const handleCategoryClick = (index: number) => {
    const category = categories[index];
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleTitleClick = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsDescriptionExpanded(false);
    setIsPopupOpen(true);
  };

  const getCleanDescription = (description: string) => {
    return description.replace(/\.{3,}$/, "").trim();
  };

  const handleVoteNow = (proposalId: string) => {
    if (!user) {
      setIsLoginPopupOpen(true);
      setOpenDropdown(null);
      return;
    }
    const selected = proposals.find((p) => p.proposalId === proposalId);
    setVotingProposalId(proposalId);
    setVoteMessage(null);
    setSelectedProposal(selected); // track the full proposal
    setIsVotePopupOpen(true);
    setOpenDropdown(null);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "voting":
          return "bg-primary";
        case "passed":
          return "bg-green-500";
        case "rejected":
          return "bg-red-500";
        default:
          return "bg-bg3";
      }
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
        <span className="text-base text-secondary">{status}</span>
      </div>
    );
  };

  const ActionDropdown = ({ proposal }: { proposal: any }) => (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === proposal.id ? null : proposal.id)
        }
        className="p-2 hover:bg-bg2 rounded-full cursor-pointer"
      >
        <MoreVertical className="w-6 h-6" />
      </button>
      {openDropdown === proposal.id && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-bg2 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => handleViewDetailsOnNewPage(proposal)}
              className="w-full px-4 py-2 text-left text-secondary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer"
            >
              View Details
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={() => handleVoteNow(proposal.proposalId)}
              className="w-full px-4 py-2 text-left text-secondary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer"
            >
              Vote Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div className="flex items-center gap-2 mt-8">
        <button
          onClick={() => canGoPrevious && setCurrentPage(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            canGoPrevious
              ? "bg-primary text-secondary hover:scale-105"
              : "bg-[#c06b0a] cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-12 h-12 rounded-full border-1 flex items-center justify-center text-lg font-medium ${
              page === currentPage
                ? "border-primary text-primary"
                : "text-secondary hover:bg-bg2"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => canGoNext && setCurrentPage(currentPage + 1)}
          disabled={!canGoNext}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            canGoNext
              ? "bg-primary text-secondary hover:scale-105"
              : "bg-[#c06b0a] cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const VoteBreakdown = ({
    yesVotes,
    noVotes,
  }: {
    yesVotes: number;
    noVotes: number;
  }) => {
    const totalVotes = yesVotes + noVotes;
    const yesPercent = totalVotes ? (yesVotes / totalVotes) * 100 : 0;
    const noPercent = totalVotes ? (noVotes / totalVotes) * 100 : 0;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary">Yes: {yesPercent.toFixed(1)}%</span>
          <span className="text-bg3">No: {noPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-l-full transition-all duration-300"
            style={{ width: `${yesPercent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // const handleVoteClick = (proposalId: string) => {
  //   if (!user) {
  //     setIsLoginPopupOpen(true);
  //     return;
  //   }
  //   setVotingProposalId(proposalId);
  //   setIsVotePopupOpen(true);
  // };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const submitVote = async (vote: "yes" | "no") => {
    if (!votingProposalId || !user) return;

    setIsVoting(true);
    setVoteMessage(null); // Reset message
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/voteProposal`,
        {
          proposalId: votingProposalId,
          vote,
          user: user?.email,
        }
      );

      setVoteMessage("✅ Your vote has been recorded.");
      fetchProposals();
    } catch (error) {
      console.error("Vote submission failed:", error);
      setVoteMessage("❌ Failed to submit your vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="mt-40 container mx-auto px-4">
      {/* Header */}
      <div className="text-center mt-20">
        <h2 className="text-lg md:text-2xl mb-4 font-bold">DAO Governance</h2>
        <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
          Proposal Card List
        </h1>
        <p className="text-xl md:text-2xl mt-4">
          Review and vote on community proposals
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex md:gap-4 items-center mt-10 justify-center">
        {categories.map((category, index) => (
          <CustomButton
            key={index}
            index={index}
            text={category}
            handleButtonClick={handleCategoryClick}
            isActive={selectedCategory === category}
          />
        ))}
      </div>

      {/* Proposals Table */}
      <div className="mt-40">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bg3">
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Proposal Title
                </th>
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Status Badge
                </th>
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Creator
                </th>
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Time Remaining
                </th>
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Votes Breakdown
                </th>
                <th className="text-left py-6 px-4 text-base md:text-2xl font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-bg3">
                  <td className="py-6 px-4">
                    <span
                      onClick={() => handleTitleClick(proposal)}
                      className="text-base text-secondary underline cursor-pointer hover:text-primary"
                    >
                      {proposal.title}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="py-6 px-4 text-secondary">
                    {proposal.creator}
                  </td>
                  <td className="py-6 px-4 text-secondary">
                    {proposal.timeRemaining}
                  </td>
                  <td className="py-6 px-4">
                    <VoteBreakdown
                      yesVotes={proposal.yesVotes}
                      noVotes={proposal.noVotes}
                    />
                  </td>
                  <td className="py-6 px-4">
                    <ActionDropdown proposal={proposal} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination />

        {/* No Data Message */}
        {currentProposals.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-bg3 text-lg">No proposals found.</p>
          </div>
        )}
      </div>

      {/* Proposal Detail Popup */}
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setIsDescriptionExpanded(false);
        }}
      >
        {selectedProposal && (
          <div className="w-90 md:w-140 xl:w-200 py-10 xl:py-20 px-10 md:px-14 xl:px-30 bg-bg">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 text-center">
              Proposal Description
            </h2>
            <div className="space-y-4 text-tertiary">
              <div className="text-base md:text-xl leading-relaxed">
                <div
                  className={`${
                    isDescriptionExpanded
                      ? "max-h-30 overflow-y-auto"
                      : "max-h-24 overflow-hidden"
                  } transition-all duration-300 ease-in-out`}
                >
                  <p className="mb-4">
                    {isDescriptionExpanded
                      ? getCleanDescription(selectedProposal.description)
                      : selectedProposal.description}
                  </p>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="text-primary cursor-pointer hover:underline font-medium"
                  >
                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>

              <div className="space-y-3 mt-8 text-tertiary">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">Status:</p>
                  <p className="text-xl">{selectedProposal.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">Creator:</p>
                  <p className="text-xl">{selectedProposal.creator}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">Created On:</p>
                  <p className="text-xl">{selectedProposal.createdOn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">Proposal ID:</p>
                  <p className="text-xl">{selectedProposal.proposalId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">Voting Deadline:</p>
                  <p className="text-xl">
                    Ends in {selectedProposal.timeRemaining}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </PopupComponent>

      <PopupComponent
        isOpen={isVotePopupOpen}
        onClose={() => {
          setIsVotePopupOpen(false);
          setVotingProposalId(null);
          setVoteMessage(null); // clear message
        }}
      >
        <div className="w-80 md:w-120 p-6 md:p-10">
          <h2 className="text-xl md:text-3xl font-bold text-center text-primary mb-6">
            Cast Your Vote
          </h2>

          {selectedProposal?.hasVoted ? (
            <p className="text-lg text-center text-blue-600 font-medium">
              ✅ You have already voted on this proposal.
            </p>
          ) : (
            <>
              <p className="text-base md:text-lg text-center text-secondary mb-6">
                Do you support this proposal?
              </p>

              <div className="flex justify-center gap-6">
                <CustomButton
                  text={isVoting ? "Voting..." : "Vote Yes"}
                  index={0}
                  handleButtonClick={() => submitVote("yes")}
                />
                <CustomButton
                  text={isVoting ? "Voting..." : "Vote No"}
                  index={1}
                  handleButtonClick={() => submitVote("no")}
                />
              </div>

              {voteMessage && (
                <div className="mt-6 text-center text-lg font-medium text-tertiary">
                  {voteMessage}
                </div>
              )}
            </>
          )}
        </div>
      </PopupComponent>

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
