import CustomStyledConatiner from "@/components/CustomStyledContainer";
import React from "react";

const InfoSection = ({
  title,
  desc,
  content,
}: {
  title: string;
  desc: string;
  content: React.ReactNode;
}) => {
  return (
    <div className="mt-30">
      <h2 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16">
        {title}
      </h2>
      <h5 className="text-xl font-medium my-6">{desc}</h5>
      <ul className="list-disc text-sm md:text-base my-4 mx-6">{content}</ul>
    </div>
  );
};

export default function PrivacyPolicy() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>
      <div className="md:p-10 lg:p-18">
        {/* Part 02 */}
        <div className="my-20">
          <p className="text-sm md:text-lg font-normal text-tertiary my-4">
            Bitcoin Yay, along with its parent company and affiliates (“Bitcoin
            Yay,” “we,” “our,” or “us”), values the privacy of our users and is
            committed to protecting their personal information. This Privacy
            Policy (“Policy”) outlines how we collect, use, share, and store
            data from users of the Bitcoin Yay website, mobile applications, and
            services (collectively, the “Services”).
          </p>
          <p className="text-sm md:text-lg font-normal text-tertiary my-4">
            By accessing or using our Services, you agree to the terms of this
            Policy and our [Terms of Use], and you consent to our collection,
            use, disclosure, and retention of your information as described
            herein. If you do not agree with any part of this Privacy Policy or
            our Terms of Use, please refrain from using our Services.
          </p>
          <p className="text-sm md:text-lg font-normal text-tertiary my-4">
            If you are visiting our website from the European Union (EU), please
            refer to the Notice to EU Data Subjects for information on our data
            processing and transfer policies. If you are a California resident,
            please review our California Privacy Notice at [link].
          </p>
        </div>

        {/* Part 03 */}
        <InfoSection
          title="1. Information We Collect"
          desc="We collect personal information in three ways:"
          content={
            <>
              <li>
                Directly from You – When you voluntarily provide information
                through account registration, communication, or transactions.
              </li>
              <li>
                Automated Technologies – Information collected through cookies,
                web beacons, and tracking technologies when you use our
                Services.
              </li>
              <li>
                Third-Party Sources – Data obtained from service providers,
                analytics platforms, and social media integrations.
              </li>
              We also aggregate and anonymize data for analytical and business
              purposes.
            </>
          }
        />

        <InfoSection
          title="A. Information You Provide to Us"
          desc="We collect the following types of information:"
          content={
            <>
              <li>
                {" "}
                Contact & Identity Information – Name, phone number, email
                address, username, and linked social media accounts.
              </li>
              <li>
                User-Generated Content – Messages, comments, reactions, and
                media shared in forums or community spaces.
              </li>
              <li>
                Transaction Data – Records of cryptocurrency transactions sent,
                received, or processed through Bitcoin Yay.
              </li>
              <li>
                Feedback & Correspondence – Survey responses, customer support
                interactions, and other inquiries.
              </li>
              <li>
                Marketing Preferences – Choices related to promotional
                communications and engagement with our campaigns.
              </li>
            </>
          }
        />
      </div>
    </div>
  );
}
