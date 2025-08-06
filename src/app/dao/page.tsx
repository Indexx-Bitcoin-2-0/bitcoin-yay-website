"use client";

import Image from "next/image";
import { useState } from "react";

import ArtImage1 from "@/assets/images/dao/art-1.svg";

import RoleImage1 from "@/assets/images/dao/Leader.webp";
import RoleImage2 from "@/assets/images/dao/Validator.webp";
import RoleImage3 from "@/assets/images/dao/Managers.webp";
import RoleImage4 from "@/assets/images/dao/Thinkers.webp";
import RoleImage5 from "@/assets/images/dao/Contributors.webp";

import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

import CustomButton2 from "@/components/CustomButton2";
import PopupComponent from "@/components/PopupComponent";

const daoRolesData = {
  leaders: {
    id: "leaders",
    image: RoleImage1,
    title: "Leaders Gopher",
    subtitle: "Guide the DAO's Strategic Vision",
    subtitle2: "“Lead with wisdom. Govern with vision.”",
    description:
      "Leaders Gophers sit at the top of the DAO hierarchy. They oversee high-level decisions, shape protocol direction, manage treasury resources, and represent the collective voice of the community. With proven dedication and influence, they safeguard the long-term sustainability of the DAO.",
    keyResponsibilities: [
      "Propose and approve strategic innovations",
      "Oversee treasury and ecosystem-wide changes",
      "Promote or demote roles within the community",
      "Lead multi-role initiatives and set DAO-wide priorities",
      "Final authority on proposal decisions",
    ],
    whyItMatters:
      "Leaders ensure balance, fairness, and vision. They are the trusted stewards of the DAO's future.",
  },
  validators: {
    id: "validators",
    image: RoleImage2,
    title: "Validators Gopher",
    subtitle: "Protect the Integrity of the DAO",
    subtitle2: "“Defend the DAO. Uphold its values.”",
    description:
      "Validators Gophers are guardians of trust and fairness. They review identity verifications, flag malicious actors, and validate community votes. Their vigilance preserves the DAO’s credibility and ensures a safe, fair ecosystem for all members.",
    keyResponsibilities: [
      "Verify KYC and identity submissions",
      "Flag/report rule-breakers or suspicious activity",
      "Approve/reject task and proposal validations",
      "Confirm the legitimacy of voting outcome",
    ],
    whyItMatters:
      "Without Validators, the DAO risks manipulation and loss of trust. Their role keeps governance clean and reliable.",
  },
  managers: {
    id: "managers",
    image: RoleImage3,
    title: "Managers Gopher",
    subtitle: "Lead Tasks. Drive Execution.",
    subtitle2: " “Organize the flow. Empower the team.”",
    description:
      "Managers Gophers ensure plans become progress. They oversee community task forces, assign responsibilities, and make sure DAO initiatives move forward efficiently. Bridging between strategy and execution, they empower others and deliver results",
    keyResponsibilities: [
      "Assign and oversee tasks to Contributors",
      "Moderate community discussions",
      "Ensure timely execution of proposals",
      "Manage role performance within initiatives",
    ],
    whyItMatters:
      "Managers turn great ideas into reality by aligning action with intent. They are the operational backbone of DAO productivity.",
  },
  thinkers: {
    id: "thinkers",
    image: RoleImage4,
    title: "Thinkers Gopher",
    subtitle: "Where Ideas Become Action",
    subtitle2: "“Every great change starts with a Thinker.”",
    description:
      "Thinkers Gophers are the creative force behind the DAO’s evolution. They draft new proposals, initiate bold innovations, and push the boundaries of what's possible. Their ideas shape the policies, products, and direction of the community.",
    keyResponsibilities: [
      "Create and submit strategic proposals",
      "Drive innovation through research and discussion",
      "Collaborate across roles to develop big ideas",
      "Host brainstorming and proposal sessions",
    ],
    whyItMatters:
      "Thinkers keep the DAO evolving. They help it grow smarter, stronger, and more forward-thinking with every idea shared.",
  },
  contributors: {
    id: "contributors",
    image: RoleImage5,
    title: "Contributors Gopher",
    subtitle: "Fuel the DAO Through Action",
    subtitle2: "“Build the future one task at a time.”",
    description:
      "Contributors Gophers are the active participants who keep the DAO moving. From completing daily tasks to voting on entry-level proposals, they earn reputation by staying engaged, consistent, and reliable. This role is the DAO’s energetic foundation.",
    keyResponsibilities: [
      "Complete basic and ongoing tasks",
      "Participate in early-stage proposals",
      "Build up reputation through action",
      "Support DAO operations at the ground level",
    ],
    whyItMatters:
      "Contributors make up the heartbeat of the DAO. Without them, ideas and governance would never reach the real world.",
  },
};

// export const metadata = {
//   title: "Ying Yang DAO - Decentralized Governance Powered by Reputation",
//   description:
//     "Join Ying Yang DAO, a decentralized governance platform where your contributions earn you reputation and influence. Participate as Leaders, Validators, Managers, Thinkers, or Contributors in shaping the future.",
//   openGraph: {
//     title: "Ying Yang DAO - Decentralized Governance Powered by Reputation",
//     description:
//       "Join Ying Yang DAO, a decentralized governance platform where your contributions earn you reputation and influence. Participate as Leaders, Validators, Managers, Thinkers, or Contributors in shaping the future.",
//   },
// };

export default function DAO() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const openPopup = (roleId: string) => {
    setSelectedRole(roleId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRole(null);
  };

  const renderPopupContent = () => {
    if (
      !selectedRole ||
      !daoRolesData[selectedRole as keyof typeof daoRolesData]
    )
      return null;

    const roleData = daoRolesData[selectedRole as keyof typeof daoRolesData];

    return (
      <div className="p-4 md:p-8 w-90 md:w-140 lg:w-auto max-w-2xl max-h-[80vh] lg:max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0 lg:w-64">
            <Image
              src={roleData.image}
              alt={roleData.title}
              className="w-full h-auto max-w-64 mx-auto"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-primary text-3xl lg:text-[40px] font-bold mb-2">
              {roleData.title}
            </h2>
            <p className="text-base font-medium mb-2">{roleData.subtitle}</p>
            <p className="text-base font-medium mb-2">{roleData.subtitle2}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-base text-center mb-8">{roleData.description}</p>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Key Responsibilities:
            </h3>
            <ul className="space-y-4">
              {roleData.keyResponsibilities.map((responsibility, index) => (
                <li key={index} className="text-base">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Why It Matters:</h3>
            <p className="text-base">{roleData.whyItMatters}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold ">YingYang DAO</h2>
        <h1 className="text-3xl md:text-5xl xl:text-[82px] mb-4 font-semibold max-w-5xl text-primary">
          Welcome to Ying Yang DAO – Powered by Reputation
        </h1>
        <p className="text-xl md:text-2xl mt-4">
          Your contributions shape the future
        </p>
        <Image src={ArtImage1} alt="Art Image 1" className="w-full md:mt-10" />
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold">
            What is Ying Yang DAO?
          </h3>
          <p className="text-base max-w-5xl mt-2">
            Ying Yang DAO is a decentralized governance platform where your
            contributions, actions, and community engagement earn you reputation
            and influence. It’s built on a fair, transparent system that rewards
            dedication and empowers every role—from leaders to creators—to
            participate in shaping the future of the DAO.
          </p>
        </div>
      </div>

      <div className="mt-80 mx-auto">
        <div className="px-4 md:px-20 lg:px-40">
          <h3 className="text-2xl md:text-3xl font-bold text-primary">
            Ying Yang DAO Roles
          </h3>
          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Your Role, Your Power.
          </h2>
          <p className="text-lg mt-4">
            Step into a world where your actions, ideas, and commitment define
            your reputation. At Yin Yang DAO, every member counts. Whether
            you&apos;re a Royal, Guardian, Captain, Visionary, or Worker—your
            voice powers real change. Earn recognition, influence decisions, and
            help govern a decentralized future built on balance and purpose.
          </p>
        </div>

        <div className="mt-40 max-w-7xl mx-auto px-4">
          <div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-24">
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage1} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Leaders Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Serve on the high council, guiding the DAO&apos;s strategic
                  vision.
                </p>
                <button className="mt-10">
                  <CustomButton2
                    image={PointingButtonImage}
                    text="View Role"
                    onClick={() => openPopup("leaders")}
                    imageStyling="w-26"
                  />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage2} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Validators Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Protect the integrity of the community with vigilance and
                  moderation.
                </p>
                <button className="mt-10">
                  <CustomButton2
                    image={PointingButtonImage}
                    text="View Role"
                    onClick={() => openPopup("validators")}
                    imageStyling="w-26"
                  />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage3} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Managers Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Lead task forces and ensure objectives are executed with
                  precision.
                </p>
                <button className="mt-10">
                  <CustomButton2
                    image={PointingButtonImage}
                    text="View Role"
                    onClick={() => openPopup("managers")}
                    imageStyling="w-26"
                  />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage4} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Thinkers Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Bring bold ideas to life through proposal creation and
                  innovation.
                </p>
                <button className="mt-10">
                  <CustomButton2
                    image={PointingButtonImage}
                    text="View Role"
                    onClick={() => openPopup("thinkers")}
                    imageStyling="w-26"
                  />
                </button> 
              </div>
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage5} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Contributors Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Power the DAO through consistent, hands-on contributions.
                </p>
                <button className="mt-10">
                  <CustomButton2
                    image={PointingButtonImage}
                    text="View Role"
                    onClick={() => openPopup("contributors")}
                    imageStyling="w-26"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 flex items-center justify-center gap-10 md:gap-24 px-4">
        <CustomButton2
          image={ArrowRightButtonImage}
          text="View My Dashboard"
          link="/dao/dashboard"
          imageStyling="w-42"
        />
        <CustomButton2
          image={ArrowRightButtonImage}
          text="View Proposals"
          link="/dao/proposals"
          imageStyling="w-42"
        />
        {/* <CustomButton2
          image={ArrowRightButtonImage}
          text="Explore Tasks"
          link="#"
          imageStyling="w-42"
        />{" "} */}
      </div>

      {/* Popup Component */}
      <PopupComponent isOpen={isPopupOpen} onClose={closePopup}>
        {renderPopupContent()}
      </PopupComponent>
    </div>
  );
}
