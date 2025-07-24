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

interface Power {
  name: string;
  status: "completed" | "pending" | "failed";
}

interface Task {
  id: number;
  name: string;
  status: "completed" | "pending" | "failed";
}

interface Activity {
  id: number;
  name: string;
  status: "completed" | "failed";
}

interface DashboardData {
  role: string;
  reputation: number;
  maxReputation: number;
  profileCompletion: number;
  powers: Power[];
  assignedTasks: Task[];
  recentActivity: Activity[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<DashboardData | null>(null);


  const roleImages = {
    leader: RoleImage1,
    validator: RoleImage2,
    manager: RoleImage3,
    thinker: RoleImage4,
    contributor: RoleImage5,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("https://api.v1.indexx.ai/api/v1/dao/getDashboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "user@example.com" }), // replace with dynamic user email if available
        });

        const data = await response.json();

        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!userData) {
    return (
      <div className="mt-40 text-center text-3xl">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mx-auto">
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg md:text-2xl mb-4 font-bold ">
            YingYang DAO
          </h2>

          <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
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
                  width: `${(userData.reputation / userData.maxReputation) * 100
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
