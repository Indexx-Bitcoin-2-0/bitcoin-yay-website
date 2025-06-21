"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Import role images
import RoleImage1 from "@/assets/images/dao/Leader.webp";
import RoleImage2 from "@/assets/images/dao/Validator.webp";
import RoleImage3 from "@/assets/images/dao/Managers.webp";
import RoleImage4 from "@/assets/images/dao/Thinkers.webp";
import RoleImage5 from "@/assets/images/dao/Contributors.webp";

import CorrectIcon from "@/assets/images/dao/dashboard/correct-icon.svg";
import CrossIcon from "@/assets/images/dao/dashboard/cross-icon.svg";
import PendingIcon from "@/assets/images/dao/dashboard/pending-icon.svg";

// Dummy API data - in real app this would come from API
const getDashboardData = () => {
  // Simulate API call - this would normally come from your backend
  return {
    role: "leader", // This would be determined by the API based on user
    reputation: 800,
    maxReputation: 1000,
    profileCompletion: 40,
    powers: [
      { name: "Call vote", status: "completed" },
      { name: "Assign Wallets tasks", status: "completed" },
      { name: "Create proposals", status: "completed" },
    ],
    assignedTasks: [
      { id: 1, name: "Task 1 - Review proposal XYZ", status: "completed" },
      { id: 2, name: "Task 2 - Moderate community", status: "pending" },
    ],
    recentActivity: [
      { id: 1, name: "Voted on 'Changing Staking Rules'", status: "completed" },
      { id: 2, name: "Task: Design update review", status: "failed" },
      { id: 3, name: "Submitted a new proposal", status: "completed" },
    ],
  };
};

export default function Dashboard() {
  const [userData, setUserData] = useState(getDashboardData());

  const roleImages = {
    leader: RoleImage1,
    validator: RoleImage2,
    manager: RoleImage3,
    thinker: RoleImage4,
    contributor: RoleImage5,
  };

  // Simulate API call on component mount
  useEffect(() => {
    // In real app, this would be an actual API call
    const fetchUserData = async () => {
      // const response = await fetch('/api/dashboard');
      // const data = await response.json();
      const data = getDashboardData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mx-auto">
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
            YingYang DAO
          </h2>

          <h1 className="text-4xl md:text-7xl mb-4 font-semibold">
            {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}{" "}
            Gopher Dashboard
          </h1>

          <div className="flex justify-center mt-6">
            <Image
              src={roleImages[userData.role as keyof typeof roleImages]}
              alt="Role image"
              className="w-90"
            />
          </div>

          <p className="mt-6 text-tertiary text-lg">
            Your activity & privileges in the community
          </p>
        </div>

        <div className="mt-40">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-bold mb-8">
            (Profile Summary - {userData.profileCompletion}%)
          </h2>

          {/* My Role */}
          <div className="mt-30">
            <h3 className="text-3xl md:text-6xl font-semibold">My Role</h3>

            <div className="mt-6 flex items-center">
              <Image
                src={roleImages[userData.role as keyof typeof roleImages]}
                alt="Role image"
                className="w-14 mr-4"
              />
              <p className="text-3xl">
                {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}{" "}
                Gopher
              </p>
            </div>
          </div>

          {/* My Reputation */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-6xl font-semibold">
              My Reputation
            </h3>
            <div className="mt-6">
              <span className="text-3xl">
                {userData.reputation} / {userData.maxReputation}
              </span>
            </div>
            <div className="mt-6 w-full max-w-2xl bg-secondary rounded-full h-6">
              <div
                className="bg-primary h-6 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (userData.reputation / userData.maxReputation) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Role-specific Powers */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-6xl font-semibold">
              Role-specific Powers
            </h3>
            <div className="space-y-4 mt-6">
              {userData.powers.map(
                (power: { name: string; status: string }, index: number) => (
                  <div key={index} className="flex items-center">
                    <Image
                      src={
                        power.status === "completed" ? CorrectIcon : CrossIcon
                      }
                      alt="Correct icon"
                      className="w-10 mr-4"
                    />
                    <span className="text-3xl">{power.name}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Activity & Tasks */}
        <div className="mt-40 mb-40">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-bold mb-8">
            (Activity & Tasks - 60%)
          </h2>

          {/* Assigned Tasks */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-6xl font-semibold">
              Assigned Tasks
            </h3>
            <ul className="mt-6 list-disc pl-6 space-y-4">
              {userData.assignedTasks.map((task) => (
                <li key={task.id} className="text-3xl">
                  <div className="flex items-center">
                    <span className="text-3xl">{task.name}</span>
                    <Image
                      src={
                        task.status === "completed"
                          ? CorrectIcon
                          : task.status === "failed"
                          ? CrossIcon
                          : PendingIcon
                      }
                      alt="Status icon"
                      className="w-8 ml-4"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-6xl font-semibold">
              Recent Activity
            </h3>
            <div className="space-y-4 mt-6">
              {userData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <Image
                    src={
                      activity.status === "completed" ? CorrectIcon : CrossIcon
                    }
                    alt="Correct icon"
                    className="w-8 mr-4"
                  />
                  <span className="text-3xl">{activity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
