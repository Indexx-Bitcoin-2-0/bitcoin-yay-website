"use client";

import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

import CheckMarkIcon from "@/assets/images/icons/check-mark.webp";
import CrossMarkIcon from "@/assets/images/icons/cross-mark.webp";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Dummy data object - pure data like API response
const journeyData = {
  currentScore: 200,
  chartData: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [45, 55, 78, 85, 120, 135, 165, 175, 190, 195, 200, 210],
  },
  roleHistory: ["Joined as Worker Bee", "Promoted to Captain Bee"],
  contributionLog: [
    {
      type: "completed",
      description: "Completed 4 Tasks",
      count: 4,
      status: "success",
    },
    {
      type: "missed",
      description: "Missed 2 submissions",
      count: 2,
      status: "failed",
    },
    {
      type: "pending",
      description: "3 Tasks in Progress",
      count: 3,
      status: "pending",
    },
  ],
};

export default function Journey() {
  // Prepare chart data with styling
  const chartDataFormatted = {
    labels: journeyData.chartData.labels,
    datasets: [
      {
        label: "Reputation Score",
        data: journeyData.chartData.values,
        borderColor: "#FFFFFF",
        backgroundColor: "#ff8728",
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#FFFFFF",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Chart.js options - clean style without grid
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#FFFFFF",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "#FFFFFF",
      },
    },
  };

  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div>
        <h1 className="text-3xl md:text-7xl font-semibold">
          My Gophers DAO Journey
        </h1>
        <p className="mt-20 text-3xl font-medium">Reputation Score</p>
        <p className="mt-4 text-8xl md:text-9xl font-bold text-primary">
          {journeyData.currentScore}
        </p>
      </div>

      <div className="mt-20 md:mt-40">
        <h3 className="text-3xl font-medium mb-6">Reputation over Time</h3>
        <div className="w-full h-60 md:h-120 p-6 rounded-lg bg-bg2 max-w-6xl">
          <Line data={chartDataFormatted} options={chartOptions} />
        </div>
      </div>

      <div className="mt-20 md:mt-40">
        <h3 className="text-3xl md:text-6xl font-semibold">Role History:</h3>
        <div className="mt-4 space-y-3">
          {journeyData.roleHistory.map((role, index) => (
            <p key={index} className="text-xl md:text-2xl">
              {role}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-40">
        <h3 className="text-3xl md:text-6xl font-semibold">
          Contribution Log:
        </h3>
        <div className="flex flex-col gap-4 mt-10">
          {journeyData.contributionLog.map((contribution, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={
                  contribution.status === "success"
                    ? CheckMarkIcon
                    : CrossMarkIcon
                }
                alt={
                  contribution.status === "success"
                    ? "Check Mark"
                    : "Cross Mark"
                }
                className="w-12 h-12"
              />
              <p className="text-xl md:text-2xl">{contribution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
