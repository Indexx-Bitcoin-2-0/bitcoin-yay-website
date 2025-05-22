"use client";

import CustomStyledConatiner from "@/components/CustomStyledContainer";
import {
  InfoSection,
  CustomListItem,
  CustomP,
} from "@/components/CustomTypography";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
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
            processing and transfer policies.
          </p>
          <p>
            If you are a <span className="font-bold">California resident</span>,
            you are entitled to certain rights under the{" "}
            <span className="font-bold">
              California Consumer Privacy Act (CCPA)
            </span>
            , including the right to request access to your personal
            information, request deletion of your data, and opt out of any data
            sales. Bitcoin Yay does not sell user data. To exercise your
            California privacy rights, please contact us at{" "}
            <Link
              className="text-primary cursor-pointer hover:underline underline-offset-3"
              href="mailto:privacy@bitcoinyay.com"
            >
              privacy@bitcoinyay.com.
            </Link>
          </p>
        </div>

        {/* Part 03 */}
        <InfoSection
          title="1. Information We Collect"
          desc="We collect personal information in three ways:"
          content={
            <>
              <CustomListItem
                title="Directly from You"
                content="– When you voluntarily provide information through account registration, communication, or transactions."
              />
              <CustomListItem
                title="Automated Technologies"
                content="– Information collected through cookies, web beacons, and tracking technologies when you use our Services."
              />
              <CustomListItem
                title="Third-Party Sources"
                content="– Data obtained from service providers, analytics platforms, and social media integrations."
              />
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
              <CustomListItem
                title="Contact & Identity Information"
                content="– Name, phone number, email address, username, and linked social
                media accounts."
              />
              <CustomListItem
                title="User-Generated Content"
                content="– Messages, comments, reactions, and media shared in forums or
                community spaces."
              />
              <CustomListItem
                title="Transaction Data"
                content="– Records of
                cryptocurrency transactions sent, received, or processed through
                Bitcoin Yay."
              />
              <CustomListItem
                title="Feedback & Correspondence"
                content="–
                Survey responses, customer support interactions, and other
                inquiries."
              />
              <CustomListItem
                title="Marketing Preferences"
                content="–
                Choices related to promotional communications and engagement
                with our campaigns."
              />
            </>
          }
        />

        <InfoSection
          title="B. Know Your Customer (KYC) & Compliance Data"
          desc="To comply with Anti-Money Laundering (AML), Know-Your-Customer (KYC), and Counter-Terrorist Financing (CTF) regulations, Bitcoin Yay collects identity verification data, including:"
          content={
            <>
              <CustomListItem
                title="Government-issued IDs"
                content="(passport, driver's license, national identity card)"
              />
              <CustomListItem
                title="Proof of Address"
                content="(utility bills, bank statements)"
              />
              <CustomListItem
                title="Selfie images or videos"
                content="for
                identity confirmation."
              />
              <CustomListItem title="Source of funds and wealth declarations" />
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
              <CustomListItem
                title="Other users"
                content="(e.g., if a user
                shares their contacts and you are listed as one of them)"
              />
              <CustomListItem
                title="Social media and login providers"
                content=" (Facebook, Google, Apple Sign-In)"
              />
              <CustomListItem title="Public databases and blockchain transactions" />
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
              <CustomListItem
                title="Device Information"
                content="– Model,
                OS version, browser type, and unique device identifiers."
              />
              <CustomListItem
                title="Usage & Activity Data"
                content="–
                Mining frequency, transactions, account behavior, and engagement
                with Bitcoin Yay tools."
              />
              <CustomListItem
                title="Location Information"
                content="– GPS
                data, IP addresses, and network details (with user consent)."
              />
              <CustomListItem
                title="Log Information"
                content="– Browser
                activity, access times, page visits, and referring URLs."
              />
            </>
          }
          endingLine="We use cookies and analytics tools (e.g., Google Analytics) to improve user experience and optimize our Services. These tools help us understand how users interact with our platform and allow us to enhance functionality, performance, and security."
        />

        <InfoSection
          title="E. Data Security & Protection"
          desc="Bitcoin Yay implements robust security measures, including:"
          content={
            <>
              <CustomListItem
                title="End-to-end encryption"
                content="for
                sensitive data."
              />
              <CustomListItem
                title="AI-powered fraud detection"
                content="to
                prevent unauthorized access."
              />
              <CustomListItem
                title="Strict KYC compliance"
                content="to
                ensure a secure crypto ecosystem."
              />
            </>
          }
          endingLine="We never request or store private wallet keys or passphrases. Users should never share this information with anyone."
        />

        <InfoSection
          title="2. How We Use Your Information"
          desc="We use collected data for the following purposes:"
          content={
            <>
              <CustomListItem
                title="To provide and enhance our Services"
                content="(e.g., crypto transactions, account management)."
              />
              <CustomListItem
                title="To ensure compliance"
                content="with
                legal, regulatory, and security standards."
              />
              <CustomListItem
                title="To personalize user experience"
                content="and deliver relevant content."
              />
              <CustomListItem
                title="To facilitate KYC verification"
                content="and prevent fraud."
              />
              <CustomListItem title="To improve customer support and engagement." />
              <CustomListItem title="To communicate updates promotions, and service notifications." />
            </>
          }
        />

        <InfoSection
          title="3. Data Sharing & Third-Party Disclosures"
          desc="Bitcoin Yay does not sell user data. However, we may share information with:"
          content={
            <>
              <CustomListItem
                title="Regulatory authorities"
                content="(for
                legal compliance)."
              />
              <CustomListItem
                title="Service providers"
                content="(for
                payment processing, KYC, and analytics)."
              />
              <CustomListItem
                title="Blockchain networks"
                content="(to
                validate transactions)."
              />
            </>
          }
        />

        <InfoSection
          title="4. Your Privacy Rights"
          desc="Depending on your jurisdiction, you may have rights to:"
          content={
            <>
              <CustomListItem
                title="Access and correct your data"
                content="."
              />
              <CustomListItem title="Request data deletion" content="." />
              <CustomListItem
                title="Opt out of marketing communications"
                content="."
              />
              <CustomListItem
                title="Restrict data processing"
                content="in
                certain cases."
              />
            </>
          }
        />
        <CustomP
          start="For privacy-related inquiries, contact us at "
          link="privacy@bitcoinyay.com."
          onClick={() => {
            window.location.href = "mailto:privacy@bitcoinyay.com";
          }}
        />

        <InfoSection
          title="5. Policy Updates"
          desc="Depending on your jurisdiction, you may have rights to:"
          endingLine="Bitcoin Yay may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or services. Continued use of our Services after such updates constitutes acceptance of the revised terms. We encourage users to review this page regularly to stay informed about how we protect your data. If you have any questions or concerns, please contact our support team."
        />

        <InfoSection
          title="How We Use Information"
          desc="To Provide Our Services"
          content={
            <>
              We utilize your information in the following ways:
              <CustomListItem
                content="Develop, operate, improve, deliver, maintain, and protect our
                services."
              />
              <CustomListItem
                content="Communicate with you by sending confirmations, technical
                notices, updates, security alerts, support messages, and
                administrative notifications."
              />
              <CustomListItem
                content="Monitor and analyze platform usage to enhance performance and
                user experience."
              />
              <CustomListItem
                content="Personalize your experience by suggesting relevant connections,
                message templates, or customized content, including
                advertisements."
              />
              <CustomListItem content="Enhance the security and integrity of our services." />
              <CustomListItem
                content="Verify user identities and safeguard against fraudulent,
                unauthorized, or illegal activities."
              />
              <CustomListItem
                content="Utilize cookies and similar technologies to improve service
                functionality and user interaction."
              />
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
              <CustomListItem
                title="Affiliates:"
                content="We may disclose
                personal data to our subsidiaries and corporate affiliates as
                necessary to provide and improve our services."
              />
              <CustomListItem
                title="Business Transfers:"
                content=" In the
                event of a business transaction such as a merger, acquisition,
                financing, or asset transfer, we may share personal data with
                the involved parties before and after the transaction."
              />
            </>
          }
          endingLine=""
        />

        <InfoSection
          title="Compliance, Protection, and Safet"
          desc="We may disclose personal information to:"
          content={
            <>
              <CustomListItem content="Comply with applicable laws and regulatory requirements." />
              <CustomListItem content="Respond to lawful requests, subpoenas, or legal processes." />
              <CustomListItem content="Enforce our agreements, policies, and Terms of Use." />
              <CustomListItem
                content="Protect the rights, safety, and security of our users,
                employees, and partners."
              />
              <CustomListItem
                content="Address emergencies, including security breaches and fraud
                prevention."
              />
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
        <CustomP
          start="For further inquiries, please contact us at "
          link="privacy@bitcoinyay.com."
          onClick={() => {
            window.location.href = "mailto:privacy@bitcoinyay.com";
          }}
        />

        <InfoSection desc="GOOGLE ANALYTICS" />
        <CustomP
          start="You may manage your preferences regarding the use of Google Analytics
          cookies by visiting "
          link="Google Analytics Opt-out Browser Add-on"
          onClick={() => {
            window.open(
              "https://support.google.com/analytics/answer/181881?hl=en",
              "_blank"
            );
          }}
          end=" and downloading the relevant tool."
        />

        <InfoSection desc="Contact Information" />
        <CustomP
          start="We welcome any comments or questions regarding this Privacy Policy.
          You can reach us at: "
          link="privacy@bitcoinyay.com"
          onClick={() => {
            window.location.href = "mailto:privacy@bitcoinyay.com";
          }}
        />

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
              <CustomListItem
                title="Address:"
                content="1625 North Market Blvd., Sacramento, CA 95834"
              />
              <CustomListItem
                title="Phone:"
                content="(916) 445-1254 or (800) 952-5210."
              />
            </>
          }
          endingLine=""
        />
        <CustomP start="For additional information regarding your rights under the California Consumer Privacy Act (CCPA), please contact our support team. We will provide the necessary details or documentation upon request." />

        <InfoSection
          desc="Notice to EU Data Subjects"
          endingLine="In compliance with the General Data Protection Regulation (GDPR), Bitcoin Yay recognizes 'personal information' as 'personal data.' Certain information you provide may be classified as 'sensitive data' under the GDPR, including details such as ethnicity recorded on government-issued identification documents."
        />
        <p className="text-sm md:text-base font-semibold">
          Legal Basis for Processing :
        </p>
        <CustomP
          start=" We process personal data only when legally permitted. The following
          table outlines our processing purposes and legal justifications:"
        />
        <div className="w-full my-24">
          <table className="mx-auto bg-transparent border-2 border-bg2 w-100 md:w-150 table-fixed">
            <thead>
              <tr className="border-b border-bg2 bg-bg1 text-base md:text-xl">
                <th className="py-3 px-4 text-left border-r border-bg2 w-1/2">
                  Processing Purpose
                </th>
                <th className="py-3 px-4 text-left w-1/2">Legal Basis</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              <tr className=" ">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Providing services
                </td>
                <td className="py-3 px-4 w-1/2">Legitimate interest</td>
              </tr>
              <tr className="">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Enabling platform features
                </td>
                <td className="py-3 px-4 w-1/2">Legitimate interest</td>
              </tr>
              <tr className="">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Communication
                </td>
                <td className="py-3 px-4 w-1/2">Legitimate interest</td>
              </tr>
              <tr className="">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Optimization & security
                </td>
                <td className="py-3 px-4 w-1/2">Legitimate interest</td>
              </tr>
              <tr className="">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Fraud prevention & compliance
                </td>
                <td className="py-3 px-4 w-1/2">Legal obligation</td>
              </tr>
              <tr className="">
                <td className="py-3 px-4 border-r border-bg2 w-1/2">
                  Enforcing terms of service
                </td>
                <td className="py-3 px-4 w-1/2">Legitimate interest</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CustomP
          start="Where we rely on consent, you have the right to withdraw it at any time by contacting us via "
          link="privacy@bitcoinyay.com"
          onClick={() => {
            window.location.href = "mailto:privacy@bitcoinyay.com";
          }}
        />

        <InfoSection
          desc="Your Rights Under GDPR :"
          content={
            <>
              <CustomListItem
                title="Opt-out:"
                content="Withdraw consent for marketing communications."
              />
              <CustomListItem
                title="Access:"
                content="Request access to your personal data."
              />
              <CustomListItem
                title="Correction:"
                content="Update or correct inaccuracies in your personal data."
              />
              <CustomListItem
                title="Deletion:"
                content="Request the removal of your data."
              />
              <CustomListItem
                title="Data Portability:"
                content="Obtain a machine-readable copy of your data."
              />
              <CustomListItem
                title="Restriction:"
                content="Limit how your data is processed."
              />
              <CustomListItem
                title="Objection:"
                content="Contest data processing based on legitimate interest."
              />
            </>
          }
        />
        <CustomP
          start="To exercise any of these rights, please contact our support team at "
          link="privacy@bitcoinyay.com"
          onClick={() => {
            window.location.href = "mailto:privacy@bitcoinyay.com";
          }}
          end=" We will respond in accordance with applicable data protection laws."
        />

        <InfoSection
          desc="CROSS-BORDER DATA TRANSFER"
          endingLine="Your data may be transferred to, processed, and stored in the United States. U.S. data protection laws may differ from those in your country. Transfers from the European Economic Area (EEA) are conducted in accordance with European Commission-approved Standard Contractual Clauses or other recognized data transfer mechanisms."
        />
        <CustomP start="If you require further details on how we transfer data internationally, please contact us." />

        <InfoSection
          desc="COOKIES POLICY"
          endingLine="Bitcoin Yay is committed to transparency in the use of cookies and similar tracking technologies."
        />
        <InfoSection desc="Types of Cookies We Use:" />

        <div className="bg-transparent w-full my-20">
          <div className="flex flex-col lg:flex-row justify-center items-start">
            <div className="border-2 border-bg2 w-full lg:w-1/4, max-w-80 mb-10">
              <div className="py-3 px-4 text-left border-bg2 bg-bg1 ">
                Cookie Name
              </div>
              <div className="py-3 px-4">Google Analytics</div>
              <div className="py-3 px-4">Bitcoin Yay Session</div>
            </div>
            <div className="border-2 border-bg2 w-full lg:w-1/4, max-w-80 mb-10 lg:border-l-0">
              <div className="py-3 px-4 text-left border-bg2 bg-bg1 ">
                Purpose
              </div>
              <div className="py-3 px-4">Website analytics</div>
              <div className="py-3 px-4">Maintain user session</div>
            </div>
            <div className="border-2 border-bg2 w-full lg:w-1/4, max-w-80 mb-10 lg:border-l-0">
              <div className="py-3 px-4 text-left border-bg2 bg-bg1 ">Type</div>
              <div className="py-3 px-4">Third-party</div>
              <div className="py-3 px-4">First-party</div>
            </div>
            <div className="border-2 border-bg2 w-full lg:w-1/4, max-w-80 mb-10 lg:border-l-0">
              <div className="py-3 px-4 text-left border-bg2 bg-bg1 ">
                Duration
              </div>
              <div className="py-3 px-4">2 years</div>
              <div className="py-3 px-4">9 days</div>
            </div>
          </div>
        </div>

        <CustomP start="Bitcoin Yay does not track users across third-party websites or apps for advertising purposes without obtaining explicit user consent, in accordance with Apple's AppTrackingTransparency requirements." />
        <InfoSection
          desc="Managing Cookies:"
          endingLine="You can adjust cookie preferences through your browser settings. To learn how to control cookies, visit AboutCookies.org. Note that disabling cookies may impact website functionality."
        />
      </div>
    </div>
  );
}
