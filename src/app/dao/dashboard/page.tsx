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
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoginPopup from "@/components/LoginPopup";

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
  _id: string;
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
  const { user, isLoading } = useAuth(); // Get authenticated user
  const [userData, setUserData] = useState<DashboardData | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const router = useRouter();

  const roleImages = {
    leader: RoleImage1,
    validator: RoleImage2,
    manager: RoleImage3,
    thinker: RoleImage4,
    contributor: RoleImage5,
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/getDashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }), // use email from checkAuth
          }
        );

        console.log(response);
        const result = await response.json();
        console.log("result", result);
        setUserData(result.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    // Check authentication status when loading is complete
    if (!isLoading) {
      if (!user) {
        setIsLoginPopupOpen(true);
        return;
      }
      fetchDashboardData();
    }
  }, [user, isLoading]);

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl">Loading...</div>;
  }

  // Show login popup if user is not authenticated
  if (!user) {
    return (
      <>
        <div className="mt-40 container mx-auto px-4">
          <div className="mx-auto">
            <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-lg md:text-2xl mb-4 font-bold ">
                YingYang DAO
              </h2>
              <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
                Dashboard
              </h1>
              <p className="text-xl md:text-2xl mt-4">
                Please log in to access your dashboard.
              </p>
            </div>
          </div>
        </div>
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={handleCloseLoginPopup}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  if (!userData) {
    return (
      <div className="mt-40 text-center text-3xl">
        Loading dashboard data...
      </div>
    );
  }

  const getRoleKey = (role: string): keyof typeof roleImages => {
    const normalized = role.toLowerCase().split(" ")[0]; // e.g., "Leader Gopher" → "leader"
    if (
      ["leader", "validator", "manager", "thinker", "contributor"].includes(
        normalized
      )
    ) {
      return normalized as keyof typeof roleImages;
    }
    return "contributor";
  };

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mx-auto">
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg md:text-2xl mb-4 font-bold ">YingYang DAO</h2>

          <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
            {userData.role} Dashboard
          </h1>

          <div className="flex justify-center mt-6">
            <Image
              src={roleImages[getRoleKey(userData.role)]}
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
                src={roleImages[getRoleKey(userData.role)]}
                alt="Role image"
                className="w-14 mr-4"
              />

              <p className="text-3xl">{userData.role} Gopher</p>
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
              {(userData.powers || []).map(
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
            (Activity & Tasks)
          </h2>

          {/* Assigned Tasks */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-6xl font-semibold">
              Assigned Tasks
            </h3>
            <ul className="mt-6 list-disc pl-6 space-y-4">
              {userData?.assignedTasks.map((task) => (
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
                <div key={activity?._id} className="flex items-center">
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
