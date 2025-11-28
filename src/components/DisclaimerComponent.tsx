const DisclaimerComponent = () => {
  return (
    <div className="mt-80 text-xs leading-4">
      <p className="my-4">bitcoin-yay Disclaimer</p>

      <ul className="list-decimal pl-6 space-y-2">
        <li>
          General Information and Risks: bitcoin-yay (&quot;BTCY&quot;) is a
          utility token intended solely for use within the bitcoin-yay
          ecosystem. Participation in bitcoin-yay activities, including mobile
          mining, holding tokens, and engaging with ecosystem features, involves
          inherent risks, including but not limited to market volatility,
          technological disruptions, regulatory changes, and cybersecurity
          threats. Users acknowledge these risks by engaging with bitcoin-yay
          services.
        </li>
        <li>
          Not Financial Advice: Information provided by bitcoin-yay, whether via
          website, mobile application, documentation, or communications, is for
          informational purposes only and does not constitute financial advice,
          investment guidance, or recommendations to purchase, sell, or hold any
          cryptocurrency. Users should independently evaluate their
          participation based on their personal financial circumstances and risk
          tolerance.
        </li>
        <li>
          Token Nature: BTCY tokens are not classified as securities or
          financial instruments. They do not represent shares, equity, ownership
          rights, dividends, or profit-sharing arrangements in bitcoin-yay or
          any related entities. BTCY tokens have utility functions strictly
          within the bitcoin-yay ecosystem, such as facilitating transactions,
          engaging in ecosystem activities, and accessing platform-specific
          features.
        </li>
        <li>
          Regulatory Compliance: bitcoin-yay proactively adheres to applicable
          laws and regulations, including Anti-Money Laundering (AML), Know Your
          Customer (KYC), and data privacy legislation. Compliance measures may
          require users to provide personal identification documents and undergo
          identity verification processes. Failure to comply with these
          procedures may result in account limitations or suspension.
        </li>
        <li>
          Data Privacy and Protection: bitcoin-yay collects, processes, and
          stores user data in accordance with applicable data protection
          regulations, including GDPR for European users. All personal data,
          especially sensitive KYC information, is encrypted and securely
          handled. Users have rights concerning their data, including the right
          to access, rectify, delete, and restrict processing of their
          information.
        </li>
        <li>
          Intellectual Property: The name &quot;bitcoin-yay,&quot; its logo,
          branding, and associated trademarks are proprietary assets of Bitcoin
          Yay. Users may not use these trademarks without explicit permission.
          Open-source components of bitcoin-yay’s technology are subject to the
          terms of their respective licenses. Proprietary elements such as
          mobile application code or specific AI technologies remain protected
          intellectual property.
        </li>
        <li>
          Limitation of Liability: bitcoin-yay, its affiliates, partners,
          employees, and representatives shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising out of
          or related to user engagement with bitcoin-yay or related services.
          Users engage with the bitcoin-yay ecosystem at their own risk and
          agree to indemnify bitcoin-yay against any claims or liabilities
          arising from their use.
        </li>
        <li>
          Global Accessibility and Jurisdiction: bitcoin-yay services may not be
          accessible in jurisdictions subject to international sanctions or
          where cryptocurrency services are prohibited. Users must ensure their
          local laws and regulations permit participation. bitcoin-yay reserves
          the right to limit access to features or services based on
          jurisdictional compliance requirements.
        </li>
        <li>
          Policy Changes: bitcoin-yay reserves the right to modify or update
          this disclaimer at any time to reflect changes in the legal landscape,
          operational practices, or platform functionalities. Continued use of
          bitcoin-yay services after updates signifies acceptance of these
          changes.
        </li>
        <li>
          Contact Information: For any questions or concerns regarding this
          disclaimer, please contact us directly at{" "}
          <span
            className="text-primary cursor-pointer hover:underline underline-offset-3"
            onClick={() => {
              window.location.href = "mailto:privacy@bitcoinyay.com";
            }}
          >
            privacy@bitcoinyay.com
          </span>
          .
        </li>
      </ul>
    </div>
  );
};

export default DisclaimerComponent;
