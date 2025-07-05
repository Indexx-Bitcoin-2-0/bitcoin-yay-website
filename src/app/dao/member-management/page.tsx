"use client";

import { useState } from "react";
import { ChevronDown, Check, ArrowUp, ArrowDown, Flag } from "lucide-react";

import CustomButton2 from "@/components/CustomButton2";
import CheckMarkButton from "@/assets/images/buttons/check-mark-button.svg";

// Dummy data for member management - pure API-like data
const memberData = [
  {
    id: 1,
    name: "Mark Zack",
    status: "Guardian",
  },
  {
    id: 2,
    name: "Thomas Sites",
    status: "Captain",
  },
  {
    id: 3,
    name: "Grant Cordane",
    status: "Worker",
  },
  {
    id: 4,
    name: "Philip Stein",
    status: "Worker",
  },
  {
    id: 5,
    name: "Calvin Klein",
    status: "Visionary",
  },
  {
    id: 6,
    name: "Peter Pan",
    status: "Visionary",
  },
];

// Available actions for all members
const availableActions = [
  {
    id: "promote",
    label: "Promote 1 Level Higher",
    icon: ArrowUp,
  },
  {
    id: "demote",
    label: "Demote 1 Level Lower",
    icon: ArrowDown,
  },
  {
    id: "flag",
    label: "Flag account",
    icon: Flag,
  },
];

export default function MemberManagement() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedActions, setSelectedActions] = useState<{
    [key: number]: string;
  }>({});

  const handleActionSelect = (memberId: number, action: string) => {
    setSelectedActions((prev) => ({
      ...prev,
      [memberId]: action,
    }));
    setOpenDropdown(null);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    console.log("Saving changes:", selectedActions);
    // Here you would typically send the changes to an API
  };

  // Action dropdown component
  const ActionDropdown = ({ member }: { member: (typeof memberData)[0] }) => {
    const selectedAction = selectedActions[member.id];
    const selectedActionObj = availableActions.find(
      (action) => action.label === selectedAction
    );

    return (
      <div className="relative min-w-[300px] md:min-w-[360px]">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === member.id ? null : member.id)
          }
          className="flex items-center gap-3 p-3 hover:bg-bg2 rounded-md cursor-pointer text-tertiary border border-bg w-full min-w-[300px] md:min-w-[360px]"
        >
          {selectedActionObj && (
            <selectedActionObj.icon className="w-6 h-6" strokeWidth={2.5} />
          )}
          <span className="text-base md:text-2xl flex-1 text-left">
            {selectedAction || "Select Action"}
          </span>
          <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {openDropdown === member.id && (
          <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-10 border border-bg min-w-[300px] md:min-w-[360px]">
            <div className="py-1">
              {availableActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleActionSelect(member.id, action.label)}
                    className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-base md:text-2xl cursor-pointer flex items-center gap-3"
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={2.5} />
                    <span className="flex-1">{action.label}</span>
                    {selectedAction === action.label && (
                      <Check className="w-5 h-5 ml-auto" strokeWidth={2.5} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div>
        <h1 className="text-3xl md:text-7xl text-center font-semibold">
          Member Management
        </h1>
      </div>

      <div className="mt-20 md:mt-40 flex justify-center">
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-1/3" />
              <col className="w-1/4" />
              <col className="w-5/12" />
            </colgroup>
            <thead>
              <tr className="border-b border-bg">
                <th className="text-left py-6 px-4 text-xl md:text-4xl font-bold text-tertiary">
                  Contributor
                </th>
                <th className="text-left py-6 px-4 text-xl md:text-4xl font-bold text-tertiary">
                  Status
                </th>
                <th className="text-left py-6 px-4 text-xl md:text-4xl font-bold text-tertiary">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member) => (
                <tr key={member.id} className="border-b border-bg">
                  <td className="py-6 px-4">
                    <span className="text-base md:text-2xl text-tertiary">
                      {member.name}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-base md:text-2xl text-tertiary">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <ActionDropdown member={member} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center mt-20 mb-40 md:mt-30">
        <div className="w-34" onClick={handleSaveChanges}>
          <CustomButton2 image={CheckMarkButton} text="Save changes" link="#" />
        </div>
      </div>
    </div>
  );
}
