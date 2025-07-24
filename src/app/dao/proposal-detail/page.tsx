"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import RoleImage1 from "@/assets/images/dao/Leader.webp";
import RoleImage2 from "@/assets/images/dao/Validator.webp";
import RoleImage3 from "@/assets/images/dao/Managers.webp";
import RoleImage4 from "@/assets/images/dao/Thinkers.webp";
import RoleImage5 from "@/assets/images/dao/Contributors.webp";

import CustomButton from "@/components/CustomButton";

interface Proposal {
  proposalNumber: number;
  proposalTitle: string;
  createdByRole: string;
  summary: string;
  votingPeriod: string;
  requiredRole: string;
  voteResults: number;
}


export default function ProposalDetail() {
  const roleImages = {
    leader: RoleImage1,
    validator: RoleImage2,
    manager: RoleImage3,
    thinker: RoleImage4,
    contributor: RoleImage5,
  };

  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(
          "https://api.v1.indexx.ai/getProposalDetail/685e9d113fff7ac9045ab8fa"
        );
        const data = await response.json();

        // You may need to adjust these based on actual API response shape
        const mappedProposal: Proposal = {
          proposalNumber: data.proposalNumber ?? 0,
          proposalTitle: data.title ?? "Untitled",
          createdByRole: data.createdByRole?.toLowerCase() ?? "manager",
          summary: data.summary ?? data.description ?? "No summary provided.",
          votingPeriod: "July 24 – July 31", // You can format data.startDate & data.endDate
          requiredRole: data.roleRequired ?? "Member",
          voteResults: Math.round(
            (data.upvotes / (data.upvotes + data.downvotes)) * 100
          ) || 0,
        };

        setProposal(mappedProposal);
      } catch (err) {
        console.error("Failed to fetch proposal details:", err);
      }
    };

    fetchProposal();
  }, []);

  if (!proposal) {
    return (
      <div className="mt-40 container mx-auto px-4 text-center text-3xl">
        Loading proposal...
      </div>
    );
  }


  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mt-40 md:mt-60 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-bold text-primary">
          DAO Proposal Detail & Voting
        </h2>
        <h1 className="text-2xl mb-4 font-semibold">
          Proposal <span className="text-5xl">#{proposal.proposalNumber}</span> —{" "}
          {proposal.proposalTitle}
        </h1>
      </div>

      <div className="mt-20 md:mt-40">
        <h2 className="text-3xl md:text-6xl xl:text-8xl font-bold mb-8">
          Proposal Details
        </h2>

        {/* Created By */}
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

        {/* Summary */}
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

        {/* Voting Period */}
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

        {/* Required Role */}
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

        {/* Current Vote Results */}
        <div className="mt-10 md:mt-20">
          <h3 className="text-2xl md:text-4xl xl:text-[54px] font-semibold">
            Current Vote Results
          </h3>
          <div className="mt-10 max-w-2xl">
            <div className="flex items-center justify-between text-xl md:text-2xl xl:text-3xl mb-1">
              <span className="text-primary">Yes: {proposal.voteResults}%</span>
              <span>NO: {100 - proposal.voteResults}%</span>
            </div>
            <div className="w-full mt-6 bg-secondary rounded-full h-4 md:h-6">
              <div
                className="bg-primary h-4 md:h-6 rounded-full transition-all duration-300"
                style={{ width: `${proposal.voteResults}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-40 flex items-center justify-center gap-10 md:gap-24 px-4">
          <CustomButton
            text="Vote Yes"
            index={0}
            handleButtonClick={() => { }}
            isActive={false}
          />
          <CustomButton
            text="Vote No"
            index={1}
            handleButtonClick={() => { }}
            isActive={false}
          />
          <CustomButton
            text="Abstain"
            index={2}
            handleButtonClick={() => { }}
            isActive={false}
          />
        </div>
      </div>
    </div>
  );
}
