import CustomStyledConatiner from "@/components/CustomStyledContainer";
import {
  InfoSection,
  CustomListItem,
  CustomP,
} from "@/components/CustomTypography";

export const metadata = {
  title: "Bitcoin-Yay Terms of Service - Legal Terms & Conditions",
  description:
    "Read Bitcoin-Yay's official Terms of Service covering user agreements, acceptable use policy, intellectual property rights, and legal obligations for using our cryptocurrency platform.",
  openGraph: {
    title: "Bitcoin-Yay Terms of Service - Legal Terms & Conditions",
    description:
      "Read Bitcoin-Yay's official Terms of Service covering user agreements, acceptable use policy, intellectual property rights, and legal obligations for using our cryptocurrency platform.",
  },
};

export default function TermsOfService() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Terms of Service
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>
      <div className="md:p-10 lg:p-18">
        {/* Part 02 */}
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          <span className="text-primary ">IMPORTANT NOTICE:</span> THESE TERMS
          OF SERVICE INCLUDE A BINDING ARBITRATION CLAUSE AND A WAIVER OF CLASS
          ACTION RIGHTS (SEE SECTION 15). PLEASE READ CAREFULLY BEFORE USING OUR
          SERVICES.
        </p>

        <InfoSection
          title="1. Acceptance of Terms"
          endingLine="Welcome to Bitcoin-Yay (Company, we, us, our). These Terms of Service (Terms) govern your access to and use of Bitcoin-Yay's website, platform, mobile applications, and all related services (collectively, the Service)."
        />
        <CustomP start="By using or accessing the Service, you agree to these Terms and our Privacy Policy. If you do not agree, you may not use the Service. Your continued use of the Service constitutes acceptance of any updates to these Terms." />

        <InfoSection
          title="2. Modification of Terms"
          endingLine="We reserve the right to modify these Terms at any time. The latest version will be posted on our website. Your continued use of the Service after modifications signifies your acceptance of the updated Terms."
        />

        <InfoSection
          title="3. Eligibility"
          endingLine="You must be at least 18 years old and legally capable of entering into a binding agreement to use the Service. By using Bitcoin-Yay, you represent that you comply with all applicable laws and regulations in your jurisdiction."
        />

        <InfoSection
          title="4. Account Security"
          endingLine="To use certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account. Notify us immediately of any unauthorized access."
        />

        <InfoSection
          title="5. User Content"
          endingLine="By submitting content (User Content) to Bitcoin-Yay, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display it as part of the Service. You warrant that you own or have the necessary rights to submit such content and that it does not infringe any third-party rights."
        />

        <InfoSection
          title="6. Prohibited Activities"
          content={
            <>
              <CustomListItem content="Violate any applicable laws or regulations." />
              <CustomListItem content="Use the Service for fraudulent or illegal activities." />
              <CustomListItem content="Interfere with the security or functionality of the Service." />
              <CustomListItem content="Post misleading, false, or harmful content." />
            </>
          }
          endingLine="We reserve the right to terminate accounts and take legal action against violations."
        />

        <InfoSection
          title="7. Intellectual Property"
          endingLine="All content provided by Bitcoin-Yay, including but not limited to logos, designs, and software, is owned by us or our licensors and protected by intellectual property laws. You may not use, copy, or distribute our content without permission."
        />

        <InfoSection
          title="8. Third-Party Services"
          endingLine="Bitcoin-Yay may include links to third-party services. We do not endorse or control these third parties and are not responsible for their practices. Use them at your own risk."
        />

        <InfoSection
          title="9. Disclaimers"
          endingLine='The Service is provided "as is" and "as available." We do not guarantee uninterrupted, error-free service. We disclaim all warranties to the fullest extent permitted by law.'
        />

        <InfoSection
          title="10. Limitation of Liability"
          endingLine="Bitcoin-Yay is not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Service, except where prohibited by law."
        />

        <InfoSection
          title="11. Indemnification"
          endingLine="You agree to indemnify and hold Bitcoin-Yay harmless from any claims, damages, or expenses arising from your use of the Service or violation of these Terms."
        />

        <InfoSection
          title="12. Termination"
          endingLine="We may suspend or terminate your access to the Service at any time for any reason, including violations of these Terms."
        />

        <InfoSection
          title="13. Governing Law"
          endingLine="These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles."
        />

        <InfoSection
          title="14. Dispute Resolution"
          endingLine="Disputes will be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]. You waive any right to participate in a class action lawsuit."
        />

        <InfoSection title="15. Contact Information" />

        <CustomP
          start="For any questions about these Terms, contact us at "
          link="[Support Email]."
        />
        <CustomP start="By using Bitcoin-Yay, you agree to these Terms of Service." />
        <InfoSection
          title="Acceptable Use"
          endingLine="By using Bitcoin-Yay, you agree to abide by the following rules.
              You must not:"
        />
        <InfoSection
          content={
            <>
              <CustomListItem content="Copy, reproduce, distribute, modify, adapt, translate, reverse-engineer, decompile, disassemble, create derivative works based on, or attempt to discover the source code of any part of the Bitcoin-Yay website, services, or content." />
              <CustomListItem content="Use the platform to send, store, or share unlawful, infringing, obscene, defamatory, or threatening material, including content that violates third-party rights." />
              <CustomListItem content="Introduce viruses, worms, Trojan horses, or any other malicious code that disrupts the security, integrity, or functionality of Bitcoin-Yay or its users." />
              <CustomListItem content="Use the platform in violation of any applicable local, state, national, or international laws, rules, or regulations." />
              <CustomListItem content="Engage in fraudulent activities, including but not limited to the creation of fake accounts, using automated scripts or bots, or engaging in deceptive practices." />
              <CustomListItem content="Sell, transfer, or acquire user accounts in an unauthorized manner." />
              <CustomListItem content="Participate in unauthorized sales, transfers, or trading of digital assets through Bitcoin-Yay." />
            </>
          }
          endingLine="Failure to adhere to these terms may result in account suspension, termination of access, or the reversal of transactions at Bitcoin-Yay's discretion."
        />

        {/* /////////////////////// */}

        <InfoSection title="Representations, Warranties, and Risks" />

        <InfoSection
          desc="Warranty Disclaimer"
          endingLine='Bitcoin-Yay provides its website, services, and content on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee uninterrupted or error-free access to the platform.'
        />

        <InfoSection
          desc="Risks Associated with Cryptographic Systems"
          endingLine="By using Bitcoin-Yay, you acknowledge that you understand the inherent risks associated with blockchain technology and digital assets. You confirm that you have experience with cryptographic tokens, smart contracts, and decentralized technologies."
        />

        <InfoSection
          desc="Regulatory Risks"
          endingLine="Regulatory changes in various jurisdictions may impact the availability, accessibility, or functionality of Bitcoin-Yay. You acknowledge that legal developments may affect the platform and accept all associated risks."
        />

        <InfoSection
          desc="Security Risks"
          endingLine="Cryptographic systems are subject to vulnerabilities. Advances in computing, including quantum technology, may pose risks to blockchain security. While Bitcoin-Yay takes reasonable security measures, we do not guarantee protection against all potential threats."
        />

        <InfoSection
          desc="Volatility of Digital Assets"
          endingLine="You understand that cryptocurrencies are highly volatile due to market factors, adoption rates, speculation, and regulatory changes. Bitcoin-Yay is not responsible for any financial losses resulting from price fluctuations."
        />

        <InfoSection
          desc="Volatility of Digital Assets"
          endingLine="You acknowledge that blockchain applications, including Bitcoin-Yay, may have coding vulnerabilities. You are responsible for evaluating any third-party tools, services, or smart contracts you interact with through our platform."
        />

        <InfoSection
          title="Waiver, Release, and Indemnity"
          endingLine="By using Bitcoin-Yay, you agree to release and waive any claims against Bitcoin-Yay, its affiliates, officers, employees, and agents for any losses or damages arising from your use of the platform. You further agree to indemnify and hold Bitcoin-Yay harmless from any claims, damages, or expenses resulting from your violation of these terms or your misuse of the services."
        />

        <InfoSection
          title="Limitation of Liability"
          endingLine="Bitcoin-Yay is not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to loss of profits, data, or digital assets. Some jurisdictions may not allow the exclusion of certain liabilities, so some of these limitations may not apply to you."
        />

        <InfoSection
          title="Intellectual Property Rights"
          endingLine="All content, trademarks, logos, and intellectual property associated with Bitcoin-Yay are owned by Bitcoin-Yay or its licensors. You may not use, copy, or distribute any of these materials without prior written consent."
        />

        <InfoSection
          title="Third-Party Links"
          endingLine="Bitcoin-Yay may provide links to third-party websites or services. We do not endorse, control, or assume responsibility for any content or practices of these external platforms. Your use of third-party resources is at your own risk."
        />

        <InfoSection
          title="Account Termination and Suspension"
          endingLine="Bitcoin-Yay reserves the right to suspend or terminate your account at its sole discretion, with or without notice, if you violate these terms or engage in activities deemed harmful to the platform or its users. In the event of termination, you agree to forfeit access to any associated services or features."
        />
        <CustomP
          start="Certain provisions, including but not limited to warranty disclaimers,
          indemnities, and limitations of liability, shall survive termination."
        />

        <InfoSection
          title="No Third-Party Beneficiaries"
          endingLine="Except as expressly stated in these Terms, no third party shall have any rights or benefits under these Terms."
        />

        <InfoSection
          title="Copyright Infringement Claims"
          endingLine="If you believe your copyright, or that of an individual or entity
            you represent, has been infringed on the Bitcoin-Yay platform,
            please submit a written notice (Notice) to our Copyright Agent
            containing the following details:"
        />

        <InfoSection
          content={
            <>
              <CustomListItem content="A description of the copyrighted work or intellectual property allegedly infringed, along with the requested action." />
              <CustomListItem content="A description of where the infringing material is located on the Bitcoin-Yay platform." />
              <CustomListItem content="Your name, address, telephone number, and email address." />
              <CustomListItem content="Documentation verifying ownership of the copyrighted material issued by the relevant authority." />
              <CustomListItem content="A statement affirming your good faith belief that the disputed use is unauthorized by the copyright owner, agent, or law." />
              <CustomListItem content="A declaration, made under penalty of perjury, confirming the accuracy of the information in the Notice and your authorization to act on behalf of the copyright owner." />
              <CustomListItem content="Your electronic or physical signature." />
            </>
          }
        />
        <CustomP start="Copyright Agent Contact:" />
        <CustomP link="[Bitcoin-Yay Copyright Agent]" />
        <CustomP link="[support@bitcoinyay.com]" />

        {/* ///////////////////////////// */}

        <InfoSection
          title="Binding Arbitration and Class Action Waiver"
          desc="PLEASE READ THIS SECTION CAREFULLY – IT AFFECTS YOUR LEGAL RIGHTS,
          INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT."
          endingLine="If you believe your copyright, or that of an individual or entity you
          represent, has been infringed on the Bitcoin-Yay platform, please
          submit a written notice (Notice) to our Copyright Agent containing
          the following details:"
        />
        <InfoSection
          content={
            <>
              <CustomListItem content="A description of the copyrighted work or intellectual property allegedly infringed, along with the requested action." />
              <CustomListItem content="A description of where the infringing material is located on the Bitcoin-Yay platform." />
              <CustomListItem content="Your name, address, telephone number, and email address." />
              <CustomListItem content="Documentation verifying ownership of the copyrighted material issued by the relevant authority." />
              <CustomListItem content="A statement affirming your good faith belief that the disputed use is unauthorized by the copyright owner, agent, or law." />
              <CustomListItem content="A declaration, made under penalty of perjury, confirming the accuracy of the information in the Notice and your authorization to act on behalf of the copyright owner." />
              <CustomListItem content="Your electronic or physical signature." />
            </>
          }
        />
        <CustomP start="Copyright Agent Contact:" />
        <CustomP link="[Bitcoin-Yay Copyright Agent]" />
        <CustomP link="[support@bitcoinyay.com]" />

        <InfoSection
          desc="Initial Dispute Resolution"
          endingLine="Before initiating legal proceedings, the parties shall attempt to resolve disputes in good faith through direct negotiation."
        />

        <InfoSection
          desc="Arbitration Agreement"
          endingLine="If a resolution is not reached within 30 days, either party may initiate binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration shall be the sole means of dispute resolution, excluding any class action proceedings."
        />
        <InfoSection
          content={
            <>
              <CustomListItem content="The arbitrator shall have exclusive authority over disputes, including enforceability and interpretation of these Terms." />
              <CustomListItem content="The arbitrator may grant the same remedies as a court." />
              <CustomListItem content="The decision shall be binding and enforceable in any competent court." />
              <CustomListItem content="By agreeing to arbitration, you waive your right to a jury trial. Arbitration may involve higher costs and limited discovery compared to court proceedings." />
            </>
          }
          endingLine="By agreeing to arbitration, you waive your right to a jury trial. Arbitration may involve higher costs and limited discovery compared to court proceedings."
        />
        <InfoSection
          desc="Location"
          endingLine="Arbitration will be conducted in California, and you agree to jurisdiction in San Mateo County, California, for arbitration-related matters."
        />

        <InfoSection
          desc="Class Action Waiver"
          endingLine="All arbitration proceedings must be conducted on an individual basis. Class actions or collective claims are not permitted. If any part of this waiver is found unenforceable, the arbitration clause shall be null and void."
        />

        <InfoSection
          desc="Exceptions"
          endingLine="This arbitration agreement does not apply to intellectual property claims or small claims court matters."
        />

        <InfoSection desc="Opt-Out Right" />
        <CustomP
          start="You may opt out of arbitration by submitting written notice to "
          link="[support@bitcoinyay.com]"
          end=" within 30 days of your first use of Bitcoin-Yay. Opting out does not affect other Terms provisions."
        />

        <InfoSection
          desc="Amendments to Arbitration Terms"
          endingLine="Bitcoin-Yay may modify this section with 30 days’ notice. Changes will apply prospectively to new claims only."
        />
        <CustomP start="For disputes not subject to arbitration, the exclusive jurisdiction shall be federal and state courts in San Francisco, California." />

        {/* /////////////////////////// */}

        <InfoSection title="General Terms" />

        <InfoSection
          desc="Entire Agreement"
          endingLine="These Terms, along with any additional policies on the site, constitute the complete agreement between you and Bitcoin-Yay."
        />

        <InfoSection
          desc="Waiver and Severability"
          endingLine="Failure to enforce any provision does not constitute a waiver. If any term is deemed invalid, the remainder of the Terms shall remain in effect."
        />

        <InfoSection
          desc="Governing Law"
          endingLine="These Terms are governed by California law, excluding conflict of law principles."
        />

        <InfoSection
          desc="Statute of Limitations"
          endingLine="Any claim related to these Terms must be filed within one (1) year from the event giving rise to the claim, or it shall be permanently barred."
        />

        <InfoSection desc="Communications" />
        <CustomP
          start="For questions or concerns regarding Bitcoin-Yay, contact "
          link="[support@bitcoinyay.com]."
        />

        <InfoSection
          desc="Exceptions"
          endingLine="This arbitration agreement does not apply to intellectual property claims or small claims court matters."
        />

        <InfoSection
          desc="Restrictions on Transfers During Enclosed Period"
          endingLine="If you have passed KYC and migrated Bitcoin-Yay tokens during the enclosed period, you agree to the following:"
        />
        <InfoSection
          content={
            <>
              <CustomListItem content="You will not sell Bitcoin-Yay tokens for fiat or cryptocurrencies before the Open Network launch." />
              <CustomListItem content="You are the sole holder of your account and wallet and will not transfer or share access during the enclosed period." />
              <CustomListItem content="You will not engage in illegal or unauthorized transactions using Bitcoin-Yay tokens." />
            </>
          }
          endingLine="Violation of these terms may result in account suspension, forfeiture of tokens, and other corrective actions deemed necessary by Bitcoin-Yay."
        />

        <InfoSection
          title="Mobile Balance and Token Migration"
          endingLine="Before KYC, your activity on Bitcoin-Yay generates a non-transferable “Mobile Balance,” which has no cash or exchange value. Mobile Balance does not confer ownership rights."
        />
        <CustomP start="Upon successful KYC verification, eligible users may migrate Mobile Balance into Bitcoin-Yay tokens. However, the following conditions apply:" />
        <InfoSection
          content={
            <>
              <CustomListItem content="You must complete KYC and comply with anti-money laundering policies." />
              <CustomListItem content="You must not violate Bitcoin-Yay’s Terms." />
              <CustomListItem content="Your Mobile Balance must be verifiable and free from fraudulent activity." />
              <CustomListItem content="Your jurisdiction must permit cryptocurrency use." />
            </>
          }
          endingLine="If these conditions are not met, your migration may be denied, and your Mobile Balance forfeited."
        />

        <InfoSection
          title="Grace Period and Forfeiture"
          endingLine="Bitcoin-Yay users must complete KYC and token migration within the announced Grace Period. Failure to meet these requirements will result in forfeiture of Mobile Balance."
        />
        <CustomP start="Additionally, your Mobile Balance will be immediately forfeited if:" />
        <InfoSection
          content={
            <>
              <CustomListItem content="You refuse to execute the Token Transfer Agreement." />
              <CustomListItem content="You fail to pass KYC." />
              <CustomListItem content="You engage in fraudulent activity or misrepresent your Mobile Balance." />
              <CustomListItem content="You relocate to a jurisdiction that prohibits cryptocurrency use." />
            </>
          }
          endingLine="By using Bitcoin-Yay, you acknowledge and agree to these Terms. Failure to comply may result in the suspension or termination of your account."
        />
      </div>
    </div>
  );
}
