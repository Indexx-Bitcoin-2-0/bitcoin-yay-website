"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton2 from "@/components/CustomButton2";
import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";

// Dummy data structure
const dummyTasks = [
  {
    id: 1,
    task: "Review KYC submissions",
    roleRequired: "Leaders Gopher",
    category: "Compliance",
    deadline: "June 18, 2025",
    reputationRequired: "600+",
  },
  {
    id: 2,
    task: "Review KYC submissions",
    roleRequired: "Validators Gopher",
    category: "Compliance",
    deadline: "June 18, 2025",
    reputationRequired: "450+",
  },
  {
    id: 3,
    task: "Review KYC submissions",
    roleRequired: "Managers Gopher",
    category: "Compliance",
    deadline: "June 18, 2025",
    reputationRequired: "320+",
  },
  {
    id: 4,
    task: "Review KYC submissions",
    roleRequired: "Thinkers Gopher",
    category: "Compliance",
    deadline: "June 18, 2025",
    reputationRequired: "280+",
  },
  {
    id: 5,
    task: "Review KYC submissions",
    roleRequired: "Contributors Gopher",
    category: "Compliance",
    deadline: "June 18, 2025",
    reputationRequired: "220+",
  },
  {
    id: 6,
    task: "Design review for new features",
    roleRequired: "Royal",
    category: "Design",
    deadline: "June 20, 2025",
    reputationRequired: "800+",
  },
  {
    id: 7,
    task: "Code review for smart contracts",
    roleRequired: "Guardian",
    category: "Review",
    deadline: "June 22, 2025",
    reputationRequired: "500+",
  },
  {
    id: 8,
    task: "Governance proposal review",
    roleRequired: "Captain",
    category: "Governance",
    deadline: "June 25, 2025",
    reputationRequired: "400+",
  },
];

export default function TaskCenter() {
  const [filteredTasks, setFilteredTasks] = useState(dummyTasks);
  const [filters, setFilters] = useState({
    role: "",
    category: "",
    deadline: "",
    reputation: "",
  });

  // Filter options
  const roleOptions = ["Royal", "Guardian", "Captain", "Visionary", "Worker"];
  const categoryOptions = ["Design", "Review", "Governance", "Compliance"];
  const deadlineOptions = ["All", "New", "Upcoming", "Expired"];
  const reputationOptions = [
    "0",
    "20",
    "40",
    "60",
    "80",
    "100",
    "120",
    "140",
    "160",
    "180",
    "200",
  ];

  // Apply filters
  const applyFilters = (newFilters: typeof filters) => {
    let filtered = dummyTasks;

    if (newFilters.role && newFilters.role !== "all") {
      filtered = filtered.filter((task) =>
        task.roleRequired.toLowerCase().includes(newFilters.role.toLowerCase())
      );
    }

    if (newFilters.category && newFilters.category !== "all") {
      filtered = filtered.filter(
        (task) =>
          task.category.toLowerCase() === newFilters.category.toLowerCase()
      );
    }

    if (newFilters.reputation && newFilters.reputation !== "all") {
      const repValue = parseInt(newFilters.reputation);
      filtered = filtered.filter((task) => {
        const taskRep = parseInt(task.reputationRequired.replace("+", ""));
        return taskRep >= repValue;
      });
    }

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div className="mt-40 container mx-auto px-4">
      <div className="mx-auto">
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-lg md:text-2xl mb-4 font-bold ">
            DAO Task Center
          </h2>

          <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold text-primary">
            DAO Task Center – Contribute Based on Your Role & Reputation
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            Take part in shaping the DAO. Complete tasks based on your
            reputation and role.
          </p>
        </div>
      </div>

      <div className="mt-20">
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Select
              value={filters.role}
              onValueChange={(value) => handleFilterChange("role", value)}
            >
              <SelectTrigger className="w-full bg-bg border-bg3 text-secondary text-lg hover:border-primary focus:border-primary focus-within:border-primary transition-colors">
                <SelectValue placeholder="Role" className="text-lg" />
              </SelectTrigger>
              <SelectContent className="bg-bg2 border-0">
                <SelectItem
                  value="all"
                  className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                >
                  All Roles
                </SelectItem>
                {roleOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-full bg-bg border-bg3 text-secondary text-lg hover:border-primary focus:border-primary focus-within:border-primary transition-colors">
                <SelectValue placeholder="Category" className="text-lg" />
              </SelectTrigger>
              <SelectContent className="bg-bg2 border-0">
                <SelectItem
                  value="all"
                  className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                >
                  All Categories
                </SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.deadline}
              onValueChange={(value) => handleFilterChange("deadline", value)}
            >
              <SelectTrigger className="w-full bg-bg border-bg3 text-secondary text-lg hover:border-primary focus:border-primary focus-within:border-primary transition-colors">
                <SelectValue placeholder="Deadline" className="text-lg" />
              </SelectTrigger>
              <SelectContent className="bg-bg2 border-0">
                {deadlineOptions.map((option, index) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {index > 0 && (
                        <span className="ml-2 text-bg3">
                          {index === 1
                            ? "20"
                            : index === 2
                            ? "40"
                            : index === 3
                            ? "60"
                            : "80"}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.reputation}
              onValueChange={(value) => handleFilterChange("reputation", value)}
            >
              <SelectTrigger className="w-full bg-bg border-bg3 text-secondary text-lg hover:border-primary focus:border-primary focus-within:border-primary transition-colors">
                <SelectValue
                  placeholder="Reputation Required"
                  className="text-lg"
                />
              </SelectTrigger>
              <SelectContent className="bg-bg2 border-0">
                <SelectItem
                  value="all"
                  className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                >
                  All Reputation
                </SelectItem>
                {reputationOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-secondary text-lg hover:bg-primary hover:text-bg focus:bg-primary focus:text-bg"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Task List Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold">Task List</h2>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Task</th>
                <th>Role Required</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Reputation Required</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  className="[&>td]:border [&>td]:border-bg3  [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8"
                >
                  <td className="text-base md:text-lg">{task.task}</td>
                  <td className="text-base md:text-lg">{task.roleRequired}</td>
                  <td className="text-base md:text-lg">{task.category}</td>
                  <td className="text-base md:text-lg">{task.deadline}</td>
                  <td className="text-base md:text-lg">
                    {task.reputationRequired}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-bg3 text-lg">
              No tasks found matching the selected filters.
            </p>
          </div>
        )}
      </div>
      <div>
        <div className="mt-40 flex items-center justify-center gap-10 md:gap-24 px-4">
          <CustomButton2
            image={ArrowRightButtonImage}
            text="Claim Task"
            link="#"
            imageStyling="w-42"
          />{" "}
          <CustomButton2
            image={ArrowRightButtonImage}
            text="Submit Proof"
            link="#"
            imageStyling="w-42"
          />
        </div>
      </div>
    </div>
  );
}
