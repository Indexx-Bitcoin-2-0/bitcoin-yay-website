"use client";

import { useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton from "@/components/CustomButton";

// Dummy data for proposals
const dummyProposals = [
  {
    id: 1,
    title: "Review KYC submissions",
    description:
      "This comprehensive proposal outlines significant improvements to our KYC submission and verification process. The current system has served us well, but as our platform grows and evolves, we need to implement more sophisticated verification methods to ensure compliance with international regulations while maintaining user privacy and security. The proposed changes include implementing automated identity verification using advanced AI algorithms, reducing processing time from 48 hours to under 6 hours, introducing multi-tier verification levels based on transaction amounts, implementing real-time document validation using blockchain technology, establishing partnerships with trusted third-party verification services, creating a more user-friendly interface for document submission, adding support for additional document types and international formats, implementing automated risk scoring systems, establishing clear appeals processes for rejected applications, and creating comprehensive audit trails for regulatory compliance. These improvements will significantly enhance user experience while ensuring we maintain the highest standards of security and regulatory compliance. The implementation timeline spans 6 months with phased rollouts to minimize disruption to existing users.",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 20, 2025",
    proposalId: "#0147 (optional)",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 2,
    title: "Review KYC submissions",
    description:
      "This proposal aims to streamline the KYC verification process by implementing automated checks and reducing manual review time...",
    status: "Passed",
    creator: "@ash.com",
    createdOn: "May 18, 2025",
    proposalId: "#0146",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 3,
    title: "Update governance parameters",
    description:
      "Proposal to modify voting duration from 7 days to 5 days and reduce minimum quorum requirements for faster decision making...",
    status: "Rejected",
    creator: "@ash.com",
    createdOn: "May 15, 2025",
    proposalId: "#0145",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 4,
    title: "Review KYC submissions",
    description:
      "Enhanced KYC procedures to comply with new regulatory requirements and improve security measures...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 22, 2025",
    proposalId: "#0148",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 5,
    title: "Review KYC submissions",
    description: "Standard KYC review process for new user verification...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 21, 2025",
    proposalId: "#0149",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 6,
    title: "Review KYC submissions",
    description: "Quarterly KYC audit and review process...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 19, 2025",
    proposalId: "#0150",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 7,
    title: "Review KYC submissions",
    description: "Enhanced security measures for KYC verification...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 17, 2025",
    proposalId: "#0151",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 8,
    title: "Review KYC submissions",
    description: "Automated KYC processing system implementation...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 16, 2025",
    proposalId: "#0152",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 9,
    title: "Review KYC submissions",
    description: "Final review of KYC submission process improvements...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 14, 2025",
    proposalId: "#0153",
    timeRemaining: "Closed",
    yesVotes: 74,
    noVotes: 26,
  },
  {
    id: 10,
    title: "Review KYC submissions",
    description: "Monthly KYC submission review and approval process...",
    status: "Voting",
    creator: "@ash.com",
    createdOn: "May 13, 2025",
    proposalId: "#0154",
    timeRemaining: "1d 2h",
    yesVotes: 72,
    noVotes: 28,
  },
  {
    id: 11,
    title: "Update governance parameters",
    description:
      "This critical proposal seeks to modernize our governance framework to better serve our growing community and adapt to the evolving DeFi landscape. The current governance system, while functional, faces challenges in terms of participation rates, decision efficiency, and representation fairness. Our proposed updates include several key improvements: implementing quadratic voting to reduce whale influence and increase smaller holder participation, introducing delegate voting systems to improve overall participation rates, establishing governance committees for specialized decision-making areas, implementing proposal templates and standardized processes to improve proposal quality, creating automated execution mechanisms for approved proposals, establishing clear guidelines for emergency governance procedures, implementing reputation-based voting weights that consider historical participation and proposal quality, introducing time-locked voting to prevent last-minute manipulation, creating governance incentives to encourage meaningful participation, and establishing clear appeals and dispute resolution processes. These changes will create a more democratic, efficient, and transparent governance system that can scale with our community's growth while maintaining security and decentralization principles.",
    status: "Voting",
    creator: "@dev.com",
    createdOn: "May 23, 2025",
    proposalId: "#0149",
    timeRemaining: "3d 5h",
    yesVotes: 68,
    noVotes: 32,
  },
  {
    id: 12,
    title: "Modify staking rewards",
    description:
      "Increase staking rewards to incentivize long-term holding and network participation...",
    status: "Passed",
    creator: "@admin.com",
    createdOn: "May 10, 2025",
    proposalId: "#0144",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 13,
    title: "New feature implementation",
    description:
      "Implement advanced trading features and analytics dashboard for users...",
    status: "Rejected",
    creator: "@user.com",
    createdOn: "May 8, 2025",
    proposalId: "#0143",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 14,
    title: "Community funding proposal",
    description:
      "This strategic funding proposal aims to allocate 500,000 tokens from our community treasury to fuel ecosystem growth and community engagement initiatives over the next 12 months. The proposed allocation breaks down as follows: 40% for developer grants and hackathon prizes to encourage innovation and protocol development, 25% for marketing and outreach campaigns to increase brand awareness and user acquisition, 20% for educational content creation including tutorials, documentation, and certification programs, 10% for community events and conferences to build stronger relationships and network effects, and 5% for emergency reserves to handle unexpected opportunities or challenges. The funding will support our mission to build the most robust and user-friendly DeFi ecosystem while ensuring sustainable growth and community participation. Key performance indicators will include number of new developers onboarded, community growth metrics, user engagement rates, and ecosystem adoption metrics. A dedicated oversight committee will be established to ensure transparent fund allocation and regular progress reporting to the community. This investment in our community represents a crucial step toward achieving our long-term vision of decentralized finance accessibility and innovation.",
    status: "Voting",
    creator: "@community.com",
    createdOn: "May 24, 2025",
    proposalId: "#0155",
    timeRemaining: "2d 1h",
    yesVotes: 76,
    noVotes: 24,
  },
  {
    id: 15,
    title: "Security audit proposal",
    description:
      "Conduct comprehensive security audit of smart contracts and infrastructure...",
    status: "Voting",
    creator: "@security.com",
    createdOn: "May 25, 2025",
    proposalId: "#0156",
    timeRemaining: "4d 8h",
    yesVotes: 81,
    noVotes: 19,
  },
  {
    id: 16,
    title: "Update governance parameters",
    description:
      "Proposal to modernize governance framework and improve decision-making processes...",
    status: "Voting",
    creator: "@dev.com",
    createdOn: "May 23, 2025",
    proposalId: "#0149",
    timeRemaining: "3d 5h",
    yesVotes: 68,
    noVotes: 32,
  },
  {
    id: 17,
    title: "Modify staking rewards",
    description:
      "Increase staking rewards to incentivize long-term holding and network participation...",
    status: "Passed",
    creator: "@admin.com",
    createdOn: "May 10, 2025",
    proposalId: "#0144",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 18,
    title: "New feature implementation",
    description:
      "Implement advanced trading features and analytics dashboard for users...",
    status: "Rejected",
    creator: "@user.com",
    createdOn: "May 8, 2025",
    proposalId: "#0143",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 19,
    title: "Community funding proposal",
    description:
      "Allocate treasury funds for community development and outreach programs...",
    status: "Voting",
    creator: "@community.com",
    createdOn: "May 24, 2025",
    proposalId: "#0155",
    timeRemaining: "2d 1h",
    yesVotes: 76,
    noVotes: 24,
  },
  {
    id: 20,
    title: "Security audit proposal",
    description:
      "Conduct comprehensive security audit of smart contracts and infrastructure...",
    status: "Voting",
    creator: "@security.com",
    createdOn: "May 25, 2025",
    proposalId: "#0156",
    timeRemaining: "4d 8h",
    yesVotes: 81,
    noVotes: 19,
  },
  {
    id: 21,
    title: "Update governance parameters",
    description:
      "Proposal to modernize governance framework and improve decision-making processes...",
    status: "Voting",
    creator: "@dev.com",
    createdOn: "May 23, 2025",
    proposalId: "#0149",
    timeRemaining: "3d 5h",
    yesVotes: 68,
    noVotes: 32,
  },
  {
    id: 22,
    title: "Modify staking rewards",
    description:
      "Increase staking rewards to incentivize long-term holding and network participation...",
    status: "Passed",
    creator: "@admin.com",
    createdOn: "May 10, 2025",
    proposalId: "#0144",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 23,
    title: "New feature implementation",
    description:
      "Implement advanced trading features and analytics dashboard for users...",
    status: "Rejected",
    creator: "@user.com",
    createdOn: "May 8, 2025",
    proposalId: "#0143",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 24,
    title: "Community funding proposal",
    description:
      "Allocate treasury funds for community development and outreach programs...",
    status: "Voting",
    creator: "@community.com",
    createdOn: "May 24, 2025",
    proposalId: "#0155",
    timeRemaining: "2d 1h",
    yesVotes: 76,
    noVotes: 24,
  },
  {
    id: 25,
    title: "Security audit proposal",
    description:
      "Conduct comprehensive security audit of smart contracts and infrastructure...",
    status: "Voting",
    creator: "@security.com",
    createdOn: "May 25, 2025",
    proposalId: "#0156",
    timeRemaining: "4d 8h",
    yesVotes: 81,
    noVotes: 19,
  },
  {
    id: 26,
    title: "Update governance parameters",
    description:
      "Proposal to modernize governance framework and improve decision-making processes...",
    status: "Voting",
    creator: "@dev.com",
    createdOn: "May 23, 2025",
    proposalId: "#0149",
    timeRemaining: "3d 5h",
    yesVotes: 68,
    noVotes: 32,
  },
  {
    id: 27,
    title: "Modify staking rewards",
    description:
      "Increase staking rewards to incentivize long-term holding and network participation...",
    status: "Passed",
    creator: "@admin.com",
    createdOn: "May 10, 2025",
    proposalId: "#0144",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 28,
    title: "New feature implementation",
    description:
      "Implement advanced trading features and analytics dashboard for users...",
    status: "Rejected",
    creator: "@user.com",
    createdOn: "May 8, 2025",
    proposalId: "#0143",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 29,
    title: "Community funding proposal",
    description:
      "Allocate treasury funds for community development and outreach programs...",
    status: "Voting",
    creator: "@community.com",
    createdOn: "May 24, 2025",
    proposalId: "#0155",
    timeRemaining: "2d 1h",
    yesVotes: 76,
    noVotes: 24,
  },
  {
    id: 30,
    title: "Security audit proposal",
    description:
      "Conduct comprehensive security audit of smart contracts and infrastructure...",
    status: "Voting",
    creator: "@security.com",
    createdOn: "May 25, 2025",
    proposalId: "#0156",
    timeRemaining: "4d 8h",
    yesVotes: 81,
    noVotes: 19,
  },
  {
    id: 31,
    title: "Update governance parameters",
    description:
      "Proposal to modernize governance framework and improve decision-making processes...",
    status: "Voting",
    creator: "@dev.com",
    createdOn: "May 23, 2025",
    proposalId: "#0149",
    timeRemaining: "3d 5h",
    yesVotes: 68,
    noVotes: 32,
  },
  {
    id: 32,
    title: "Modify staking rewards",
    description:
      "Increase staking rewards to incentivize long-term holding and network participation...",
    status: "Passed",
    creator: "@admin.com",
    createdOn: "May 10, 2025",
    proposalId: "#0144",
    timeRemaining: "Completed",
    yesVotes: 85,
    noVotes: 15,
  },
  {
    id: 33,
    title: "New feature implementation",
    description:
      "Implement advanced trading features and analytics dashboard for users...",
    status: "Rejected",
    creator: "@user.com",
    createdOn: "May 8, 2025",
    proposalId: "#0143",
    timeRemaining: "Failed",
    yesVotes: 32,
    noVotes: 68,
  },
  {
    id: 34,
    title: "Community funding proposal",
    description:
      "Allocate treasury funds for community development and outreach programs...",
    status: "Voting",
    creator: "@community.com",
    createdOn: "May 24, 2025",
    proposalId: "#0155",
    timeRemaining: "2d 1h",
    yesVotes: 76,
    noVotes: 24,
  },
  {
    id: 35,
    title: "Security audit proposal",
    description:
      "Conduct comprehensive security audit of smart contracts and infrastructure...",
    status: "Voting",
    creator: "@security.com",
    createdOn: "May 25, 2025",
    proposalId: "#0156",
    timeRemaining: "4d 8h",
    yesVotes: 81,
    noVotes: 19,
  },
];

export default function Proposals() {
  const [currentPage, setCurrentPage] = useState(1);
  const proposalsPerPage = 10;
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<
    (typeof dummyProposals)[0] | null
  >(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  // Filter proposals based on selected category
  const getFilteredProposals = () => {
    switch (selectedCategory) {
      case "Recent":
        // Sort by creation date (most recent first)
        return [...dummyProposals].sort((a, b) => {
          const dateA = new Date(a.createdOn);
          const dateB = new Date(b.createdOn);
          return dateB.getTime() - dateA.getTime();
        });
      case "Popular":
        // Sort by total votes (yes + no votes)
        return [...dummyProposals].sort((a, b) => {
          const totalVotesA = a.yesVotes + a.noVotes;
          const totalVotesB = b.yesVotes + b.noVotes;
          return totalVotesB - totalVotesA;
        });
      case "Ending Soon":
        // Filter proposals that are still voting and sort by time remaining
        return dummyProposals
          .filter((proposal) => proposal.status === "Voting")
          .sort((a, b) => {
            // Simple sorting based on time remaining (you can enhance this logic)
            const timeA = a.timeRemaining;
            const timeB = b.timeRemaining;

            // Extract hours from time remaining (e.g., "1d 2h" -> 26 hours)
            const getHours = (time: string) => {
              if (
                time === "Completed" ||
                time === "Failed" ||
                time === "Closed"
              )
                return 999;
              const match = time.match(/(\d+)d\s*(\d+)h/);
              if (match) {
                return parseInt(match[1]) * 24 + parseInt(match[2]);
              }
              return 999;
            };

            return getHours(timeA) - getHours(timeB);
          });
      default:
        return dummyProposals;
    }
  };

  const filteredProposals = getFilteredProposals();

  // Calculate pagination
  const totalPages = Math.ceil(filteredProposals.length / proposalsPerPage);
  const startIndex = (currentPage - 1) * proposalsPerPage;
  const endIndex = startIndex + proposalsPerPage;
  const currentProposals = filteredProposals.slice(startIndex, endIndex);

  const categories = ["Recent", "Popular", "Ending Soon"];

  // Handle category button click
  const handleCategoryClick = (index: number) => {
    const category = categories[index];
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle proposal title click
  const handleTitleClick = (proposal: (typeof dummyProposals)[0]) => {
    setSelectedProposal(proposal);
    setIsDescriptionExpanded(false);
    setIsPopupOpen(true);
  };

  // Function to remove trailing dots/ellipsis from description
  const getCleanDescription = (description: string) => {
    return description.replace(/\.{3,}$/, "").trim();
  };

  // Handle view details
  const handleViewDetails = (proposal: (typeof dummyProposals)[0]) => {
    setSelectedProposal(proposal);
    setIsPopupOpen(true);
  };

  // Handle vote now
  const handleVoteNow = (proposalId: number) => {
    // Implement vote functionality
    console.log("Vote on proposal:", proposalId);
    setOpenDropdown(null);
  };

  // Status badge component
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

  // Vote breakdown component
  const VoteBreakdown = ({
    yesVotes,
    noVotes,
  }: {
    yesVotes: number;
    noVotes: number;
  }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary">Yes: {yesVotes}%</span>
          <span className="text-bg3">No: {noVotes}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-l-full transition-all duration-300"
            style={{ width: `${yesVotes}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Action dropdown component
  const ActionDropdown = ({
    proposal,
  }: {
    proposal: (typeof dummyProposals)[0];
  }) => {
    return (
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
                onClick={() => handleViewDetails(proposal)}
                className="w-full px-4 py-2 text-left text-secondary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer"
              >
                View Details
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={() => handleVoteNow(proposal.id)}
                className="w-full px-4 py-2 text-left text-secondary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer"
              >
                Vote Now
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      // Calculate start and end pages to show exactly 5 pages
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust startPage if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Generate page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div className="flex items-center gap-2 mt-8">
        {/* Left Arrow Button */}
        <button
          onClick={() => canGoPrevious && setCurrentPage(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            canGoPrevious
              ? "bg-primary hover:scale-105 transition-all ease-in-out duration-500 text-secondary cursor-pointer"
              : "bg-[#c06b0a] cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-12 h-12 rounded-full border-1 flex items-center justify-center transition-colors text-lg font-medium cursor-pointer ${
              page === currentPage
                ? "border-primary text-primary bg-transparent"
                : "text-secondary hover:bg-bg2 bg-transparent"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow Button */}
        <button
          onClick={() => canGoNext && setCurrentPage(currentPage + 1)}
          disabled={!canGoNext}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            canGoNext
              ? "bg-primary hover:scale-105 transition-all duration-500 text-secondary"
              : "bg-[#c06b0a] cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mx-auto">
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg md:text-2xl mb-4 font-bold ">
            DAO Governance
          </h2>

          <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
            Proposal Card List
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            Review and vote on community proposals
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex md:gap-4 items-center mt-8 justify-center">
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
      </div>

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
                  <td className="py-6 px-4">
                    <span className="text-base text-secondary">
                      {proposal.creator}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-base text-secondary">
                      {proposal.timeRemaining}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <div className="w-32 md:w-40">
                      <VoteBreakdown
                        yesVotes={proposal.yesVotes}
                        noVotes={proposal.noVotes}
                      />
                    </div>
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

        {currentProposals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-bg3 text-lg">No proposals found.</p>
          </div>
        )}
      </div>

      {/* Proposal Details Popup */}
      <PopupComponent
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setIsDescriptionExpanded(false); // Reset expanded state when closing popup
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
                      ? "max-h-30 overflow-y-auto scrollbar-hide"
                      : "max-h-24 overflow-hidden"
                  } transition-all duration-300 ease-in-out`}
                  style={{
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* Internet Explorer 10+ */,
                  }}
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
                <div className="flex items-center">
                  <p className="text-xl font-bold">Status:</p>{" "}
                  <p className=" text-xl">{selectedProposal.status}</p>
                </div>

                <div className="flex items-center">
                  <p className="text-xl font-bold">Creator:</p>{" "}
                  <p className="text-xl">{selectedProposal.creator}</p>
                </div>

                <div className="flex items-center">
                  <p className="text-xl font-bold">Created On:</p>{" "}
                  <p className="text-xl">{selectedProposal.createdOn}</p>
                </div>

                <div className="flex items-center">
                  <p className="text-xl font-bold">Proposal ID:</p>{" "}
                  <p className="text-xl">{selectedProposal.proposalId}</p>
                </div>

                <div className="flex items-center">
                  <p className="text-xl font-bold">Voting Deadline:</p>{" "}
                  <p className="text-xl">
                    Ends in {selectedProposal.timeRemaining}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </PopupComponent>
    </div>
  );
}
