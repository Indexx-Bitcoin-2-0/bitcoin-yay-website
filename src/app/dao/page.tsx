import Image from "next/image";

import ArtImage1 from "@/assets/images/dao/art-1.svg";

import RoleImage1 from "@/assets/images/dao/Leader.webp";
import RoleImage2 from "@/assets/images/dao/Validator.webp";
import RoleImage3 from "@/assets/images/dao/Managers.webp";
import RoleImage4 from "@/assets/images/dao/Thinkers.webp";
import RoleImage5 from "@/assets/images/dao/Contributors.webp";

import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";

import CustomButton2 from "@/components/CustomButton2";

export default function DAO() {
  return (
    <div className="mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold ">
          YingYang DAO
        </h2>
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
              </div>
              <div className="flex flex-col items-center justify-center w-80">
                <Image src={RoleImage5} alt="role 1" className="w-50" />
                <h4 className="mt-6 text-3xl font-bold text-primary">
                  Contributors Gopher
                </h4>
                <p className="mt-6 text-lg text-center">
                  Power the DAO through consistent, hands-on contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 flex items-center justify-center gap-10 md:gap-24 px-4">
        <CustomButton2
          image={ArrowRightButtonImage}
          text="View My Dashboard"
          link="#"
          imageStyling="w-42"
        />{" "}
        <CustomButton2
          image={ArrowRightButtonImage}
          text="Explore Tasks"
          link="#"
          imageStyling="w-42"
        />{" "}
        <CustomButton2
          image={ArrowRightButtonImage}
          text="View Proposals"
          link="#"
          imageStyling="w-42"
        />
      </div>
    </div>
  );
}
