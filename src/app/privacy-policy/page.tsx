import CustomStyledConatiner from "@/components/CustomStyledContainer";
import React from "react";

const InfoSection = ({
  title = "",
  desc = "",
  content = "",
  endingLine = "",
}: {
  title?: string;
  desc?: string;
  content?: React.ReactNode;
  endingLine?: string;
}) => {
  return (
    <div className={`${title != "" && "mt-30"}`}>
      <h2 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16 text-secondary">
        {title}
      </h2>
      <h5
        className={`text-xl md:text-2xl font-medium ${
          title != "" && "my-6"
        } text-tertiary`}
      >
        {desc}
      </h5>
      {content && (
        <ul className="list-disc text-sm md:text-base my-4 mx-6 text-tertiary flex flex-col gap-3">
          {content}
        </ul>
      )}
      <p
        className={`text-sm md:text-lg font-normal text-tertiary ${
          content != "" && "my-4"
        } my-4`}
      >
        {endingLine}
      </p>
    </div>
  );
};

const ListItemHeading = ({ children }: { children: string }) => {
  return <span className="text-sm md:text-base font-semibold">{children}</span>;
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
                <ListItemHeading>Directly from You</ListItemHeading> – When you
                voluntarily provide information through account registration,
                communication, or transactions.
              </li>
              <li>
                <ListItemHeading>Automated Technologies</ListItemHeading> –
                Information collected through cookies, web beacons, and tracking
                technologies when you use our Services.
              </li>
              <li>
                <ListItemHeading>Third-Party Sources</ListItemHeading> – Data
                obtained from service providers, analytics platforms, and social
                media integrations.
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
                <ListItemHeading>
                  Contact & Identity Information
                </ListItemHeading>{" "}
                – Name, phone number, email address, username, and linked social
                media accounts.
              </li>
              <li>
                <ListItemHeading>User-Generated Content</ListItemHeading> –
                Messages, comments, reactions, and media shared in forums or
                community spaces.
              </li>
              <li>
                <ListItemHeading>Transaction Data</ListItemHeading> – Records of
                cryptocurrency transactions sent, received, or processed through
                Bitcoin Yay.
              </li>
              <li>
                <ListItemHeading>Feedback & Correspondence</ListItemHeading> –
                Survey responses, customer support interactions, and other
                inquiries.
              </li>
              <li>
                <ListItemHeading>Marketing Preferences</ListItemHeading> –
                Choices related to promotional communications and engagement
                with our campaigns.
              </li>
            </>
          }
        />

        <InfoSection
          title="B. Know Your Customer (KYC) & Compliance Data"
          desc="To comply with Anti-Money Laundering (AML), Know-Your-Customer (KYC), and Counter-Terrorist Financing (CTF) regulations, Bitcoin Yay collects identity verification data, including:"
          content={
            <>
              <li>
                <ListItemHeading>Government-issued IDs </ListItemHeading>
                (passport, driver's license, national identity card)
              </li>
              <li>
                <ListItemHeading>Proof of Address </ListItemHeading> (utility
                bills, bank statements)
              </li>
              <li>
                <ListItemHeading>Selfie images or videos</ListItemHeading> for
                identity confirmation.
              </li>
              <li>
                <ListItemHeading>
                  Source of funds and wealth declarations
                </ListItemHeading>
              </li>
            </>
          }
          endingLine="KYC data is processed securely using human and AI-based
              verification technologies to ensure compliance and prevent
              fraudulent activities. By using our KYC services, users consent to
              the use of AI verification tools for identity authentication."
        />

        <InfoSection
          title="C. Information Collected from Third Parties"
          desc="We may receive additional data from:"
          content={
            <>
              <li>
                <ListItemHeading>Other users</ListItemHeading> (e.g., if a user
                shares their contacts and you are listed as one of them)
              </li>
              <li>
                <ListItemHeading>
                  Social media and login providers
                </ListItemHeading>{" "}
                (Facebook, Google, Apple Sign-In)
              </li>
              <li>
                <ListItemHeading>
                  Public databases and blockchain transactions
                </ListItemHeading>
              </li>
            </>
          }
          endingLine="Some social media features, such as 'Like' and 'Share' buttons,
                may collect data based on your interactions. Your use of these
                features is governed by the privacy policies of the respective
                platforms."
        />

        <InfoSection
          title="D. Automatically Collected Data"
          desc="When you use our Services, we collect:"
          content={
            <>
              <li>
                <ListItemHeading>Device Information</ListItemHeading> – Model,
                OS version, browser type, and unique device identifiers.
              </li>
              <li>
                <ListItemHeading>Usage & Activity Data</ListItemHeading> –
                Mining frequency, transactions, account behavior, and engagement
                with Bitcoin Yay tools.
              </li>
              <li>
                <ListItemHeading>Location Information</ListItemHeading> – GPS
                data, IP addresses, and network details (with user consent).
              </li>
              <li>
                <ListItemHeading>Log Information</ListItemHeading> – Browser
                activity, access times, page visits, and referring URLs.
              </li>
            </>
          }
          endingLine="We use cookies and analytics tools (e.g., Google Analytics) to improve user experience and optimize our Services. Learn more in our [Cookies Policy]."
        />

        <InfoSection
          title="E. Data Security & Protection"
          desc="Bitcoin Yay implements robust security measures, including:"
          content={
            <>
              <li>
                <ListItemHeading>End-to-end encryption</ListItemHeading> for
                sensitive data.
              </li>
              <li>
                <ListItemHeading>AI-powered fraud detection</ListItemHeading> to
                prevent unauthorized access.
              </li>
              <li>
                <ListItemHeading>Strict KYC compliance</ListItemHeading> to
                ensure a secure crypto ecosystem.
              </li>
            </>
          }
          endingLine="We never request or store private wallet keys or passphrases. Users should never share this information with anyone."
        />

        <InfoSection
          title="2. How We Use Your Information"
          desc="We use collected data for the following purposes:"
          content={
            <>
              <li>
                <ListItemHeading>
                  To provide and enhance our Services
                </ListItemHeading>
                (e.g., crypto transactions, account management).
              </li>
              <li>
                <ListItemHeading>To ensure compliance</ListItemHeading> with
                legal, regulatory, and security standards.
              </li>
              <li>
                <ListItemHeading>
                  To personalize user experience
                </ListItemHeading>
                and deliver relevant content.
              </li>
              <li>
                <ListItemHeading>
                  To facilitate KYC verification
                </ListItemHeading>
                and prevent fraud.
              </li>
              <li>
                <ListItemHeading>
                  To improve customer support and engagement.
                </ListItemHeading>
              </li>
              <li>
                <ListItemHeading>
                  To communicate updates promotions, and service notifications.
                </ListItemHeading>
                ,
              </li>
            </>
          }
        />

        <InfoSection
          title="3. Data Sharing & Third-Party Disclosures"
          desc="Bitcoin Yay does not sell user data. However, we may share information with:"
          content={
            <>
              <li>
                <ListItemHeading>Regulatory authorities</ListItemHeading> (for
                legal compliance).
              </li>
              <li>
                <ListItemHeading>Service providers</ListItemHeading> (for
                payment processing, KYC, and analytics).
              </li>
              <li>
                <ListItemHeading>Blockchain networks</ListItemHeading> (to
                validate transactions).
              </li>
            </>
          }
        />

        <InfoSection
          title="4. Your Privacy Rights"
          desc="Depending on your jurisdiction, you may have rights to:"
          content={
            <>
              <li>
                <ListItemHeading>Access and correct your data</ListItemHeading>.
              </li>
              <li>
                <ListItemHeading>Request data deletion</ListItemHeading>.
              </li>
              <li>
                <ListItemHeading>
                  Opt out of marketing communications
                </ListItemHeading>
                .
              </li>
              <li>
                <ListItemHeading>Restrict data processing</ListItemHeading> in
                certain cases.
              </li>
              <p className="text-sm md:text-lg font-normal text-tertiary my-4">
                For privacy-related inquiries, contact us at{" "}
                <span
                  className="text-primary cursor-pointer"
                  // onClick={() =>
                  //   (window.location.href = "mailto:privacy@bitcoinyay.com")
                  // }
                >
                  privacy@bitcoinyay.com.
                </span>
              </p>
            </>
          }
        />

        <InfoSection
          title="5. Policy Updates"
          desc="Depending on your jurisdiction, you may have rights to:"
          endingLine="Bitcoin Yay may update this Privacy Policy periodically. Continued use of our Services after updates constitutes acceptance of the revised terms. For more details, visit [Bitcoin Yay Privacy Policy] or reach out to our support team."
        />

        <InfoSection
          title="How We Use Information"
          desc="To Provide Our Services"
          content={
            <>
              We utilize your information in the following ways:
              <li>
                Develop, operate, improve, deliver, maintain, and protect our
                services.
              </li>
              <li>
                Communicate with you by sending confirmations, technical
                notices, updates, security alerts, support messages, and
                administrative notifications.
              </li>
              <li>
                Monitor and analyze platform usage to enhance performance and
                user experience.
              </li>
              <li>
                Personalize your experience by suggesting relevant connections,
                message templates, or customized content, including
                advertisements.
              </li>
              <li>Enhance the security and integrity of our services.</li>
              <li>
                Verify user identities and safeguard against fraudulent,
                unauthorized, or illegal activities.
              </li>
              <li>
                Utilize cookies and similar technologies to improve service
                functionality and user interaction.
              </li>
            </>
          }
        />

        <InfoSection
          desc="To Comply with Legal Obligations"
          endingLine="We may process your personal information as required to comply
                  with applicable laws, regulatory requirements, and legal
                  proceedings, including responding to subpoenas or government
                  requests."
        />

        <InfoSection
          desc="To Optimize Our Platform"
          endingLine="To ensure an optimal user experience, we may use your data to
                  operate, maintain, and improve our services. Additionally, we
                  use this information to respond to user inquiries, feedback,
                  and provide customer support."
        />

        <InfoSection
          desc="To Fulfill User Requests"
          endingLine="With your consent, we may use or share your personal
                  information when you request specific actions regarding your
                  data or opt into third-party marketing communications."
        />

        <InfoSection
          title="Sharing of Personal Information"
          desc="Bitcoin Yay does not sell or share personal information with third parties without user consent, except under the following circumstances:"
          content={
            <>
              <li>
                <ListItemHeading>Affiliates:</ListItemHeading>We may disclose
                personal data to our subsidiaries and corporate affiliates as
                necessary to provide and improve our services.
              </li>
              <li>
                <ListItemHeading>Business Transfers: </ListItemHeading> In the
                event of a business transaction such as a merger, acquisition,
                financing, or asset transfer, we may share personal data with
                the involved parties before and after the transaction.
              </li>
            </>
          }
          endingLine=""
        />

        <InfoSection
          title="Compliance, Protection, and Safet"
          desc="We may disclose personal information to:"
          content={
            <>
              <li>Comply with applicable laws and regulatory requirements.</li>
              <li>
                Respond to lawful requests, subpoenas, or legal processes.
              </li>
              <li>Enforce our agreements, policies, and Terms of Use.</li>
              <li>
                Protect the rights, safety, and security of our users,
                employees, and partners.
              </li>
              <li>
                Address emergencies, including security breaches and fraud
                prevention.
              </li>
            </>
          }
        />

        <InfoSection
          desc="Professional Advisors and Service Providers"
          endingLine="We may share information with third-party service providers that assist in operating our platform, including customer support, hosting, payment processing, identity verification (KYC), legal services, and auditing."
        />

        <InfoSection
          desc="KYC Verification"
          endingLine="To comply with regulatory requirements, we collaborate with KYC validators who verify user identities. KYC validators may be individuals or service providers who have undergone necessary compliance checks. Only the essential subset of user KYC data is shared for identity verification purposes."
        />

        <InfoSection
          desc="Aggregated or De-identified Data"
          endingLine="We may share aggregated or de-identified data that does not identify individual users for analytics, research, or business purposes."
        />

        <InfoSection
          desc="Advertising Networks"
          endingLine="While Bitcoin Yay does not directly share personal data with ad networks, third-party advertising services within our platform may request device identifiers to deliver targeted advertisements."
        />

        <InfoSection
          desc="Additional User-Authorized Sharing"
          endingLine="Users may opt to share their information with third parties. Such sharing is governed by the privacy policies of those third parties."
        />

        <InfoSection
          desc="Users Outside the United States"
          endingLine="Bitcoin Yay operates globally, and user data may be processed in jurisdictions where data protection laws may differ from those in the user's home country. By using our services, you consent to the transfer and processing of your data in accordance with this policy. EU users should refer to the 'Notice to EU Data Subjects' for details on data transfers outside the European Economic Area (EEA)."
        />

        <InfoSection
          desc="Data Security"
          endingLine="We implement industry-standard security measures to protect personal information. However, data transmission over the internet is inherently insecure, and we cannot guarantee absolute security. Users are responsible for safeguarding their account credentials, including passwords and authentication methods. If a security breach is suspected, we may suspend account access pending investigation."
        />

        <InfoSection
          desc="Information Retention"
          endingLine="We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, comply with legal requirements, prevent fraud, resolve disputes, and enforce our Terms of Use. Once the retention period expires, data may be deleted or anonymized."
        />

        <InfoSection title="User Rights and Choices" />

        <InfoSection
          desc="Access, Updates, and Deletion"
          endingLine="Users can access and manage their personal data through their account settings. Requests for data correction, deletion, or restriction can be made via customer support."
        />

        <InfoSection
          desc="Consent Withdrawal"
          endingLine="We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, comply with legal requirements, prevent fraud, resolve disputes, and enforce our Terms of Use. Once the retention period expires, data may be deleted or anonymized."
        />

        <InfoSection
          desc="Tracking Technologies"
          endingLine="Users may disable cookies and tracking technologies through browser settings. For more details, refer to our 'Cookies Policy.'"
        />
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          For privacy-related inquiries, contact us at{" "}
          <span
            className="text-primary cursor-pointer"
            // onClick={() =>
            //   (window.location.href = "mailto:privacy@bitcoinyay.com")
            // }
          >
            privacy@bitcoinyay.com.
          </span>
        </p>

        <InfoSection desc="Google Analytics" />
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          You may manage your preferences regarding the use of Google Analytics
          cookies by visiting{" "}
          <span
            className="text-primary cursor-pointer"
            // onClick={() =>
            //   (window.location.href = "mailto:privacy@bitcoinyay.com")
            // }
          >
            Google Analytics Opt-out Browser Add-on
          </span>{" "}
          and downloading the relevant tool.
        </p>
        <InfoSection desc="Contact Information" />
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          We welcome any comments or questions regarding this Privacy Policy.
          You can reach us at:{" "}
          <span
            className="text-primary cursor-pointer"
            // onClick={() =>
            //   (window.location.href = "mailto:privacy@bitcoinyay.com")
            // }
          >
            Privacy Contact.
          </span>
        </p>

        <InfoSection
          desc="Changes to This Privacy Policy"
          endingLine="Bitcoin Yay reserves the right to modify this Privacy Policy at any time. We encourage you to periodically review this page for updates regarding our privacy practices. Any changes will be reflected in the 'Last Updated' date above. Modifications will become effective upon posting or as otherwise specified at the time of publication. Your continued use of our website and services after any changes indicates your acceptance of the updated Privacy Policy."
        />

        <InfoSection
          desc="Children's Privacy"
          endingLine="Our services are not intended for, nor directed at, individuals under the age of 13. In compliance with the Children's Online Privacy Protection Act (COPPA), we do not knowingly collect personal data from individuals under 13. If we discover that we have inadvertently collected such information, we will use it solely to respond to the child or their parent/legal guardian, informing them that they cannot use our services. The data will then be promptly deleted."
        />

        <InfoSection
          desc="Notice to California Residents"
          content={
            <>
              In accordance with California Civil Code Section 1789.3,
              California residents may direct consumer rights inquiries to the
              Complaint Assistance Unit of the Division of Consumer Services of
              the California Department of Consumer Affairs:
              <li>Address: 1625 North Market Blvd., Sacramento, CA 95834</li>
              <li>Phone: (916) 445-1254 or (800) 952-5210.</li>
            </>
          }
          endingLine=""
        />
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          For additional information regarding California residents' data
          privacy rights, please visit our{" "}
          <span
            className="text-primary cursor-pointer"
            // onClick={() =>
            //   (window.location.href = "mailto:privacy@bitcoinyay.com")
            // }
          >
            California Consumer Privacy Notice.
          </span>
        </p>

        <InfoSection
          desc="Notice to EU Data Subjects"
          endingLine="In compliance with the General Data Protection Regulation (GDPR), Bitcoin Yay recognizes 'personal information' as 'personal data.' Certain information you provide may be classified as 'sensitive data' under the GDPR, including details such as ethnicity recorded on government-issued identification documents."
        />

        <ListItemHeading>Legal Basis for Processing :</ListItemHeading>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          We process personal data only when legally permitted. The following
          table outlines our processing purposes and legal justifications:
        </p>
      </div>
    </div>
  );
}
