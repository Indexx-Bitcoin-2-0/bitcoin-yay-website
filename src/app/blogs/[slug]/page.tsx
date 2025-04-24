import CustomStyledConatiner from "@/components/CustomStyledContainer";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { type Components } from "react-markdown";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  link: string;
}

// In a real application, this would be fetched from an API or database
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Smart Crypto: Empowering Investors Amidst Today's Crypto Market Volatility",
    description:
      "In today's volatile crypto market, smart investors are finding ways to navigate uncertainty and challenges. Find out how smart crypto is helping them manage their investments.",
    date: "March 14, 2025",
    image: "/blog1.png",
    category: "Announcement",
    link: "/blogs/smart-crypto-empowering-investors",
  },
  // ... other blog posts
];

const getPostContent = (slug: string) => {
  // This is a placeholder. In a real app, you would fetch the markdown content from your data source
  if (slug === "smart-crypto-empowering-investors") {
    return `The cryptocurrency landscape is dynamic, with recent events highlighting both opportunities and challenges. Amidst these developments, Smart Crypto stands out as a platform designed to help investors navigate the complexities of the crypto market with confidence and ease.

## Russian Central Bank's Proposal: A Shift Towards Crypto Investment

The Russian Central Bank has recently proposed allowing "specially qualified" investors — wealthy individuals meeting specific financial criteria — to participate in cryptocurrency investments. This marks a notable shift from the bank's previous stance against cryptocurrencies, aiming to increase market transparency while acknowledging the inherent risks associated with crypto trading.

**How Smart Crypto Assists:** For investors entering the crypto market under such regulatory changes, Smart Crypto offers a secure and transparent platform. Our AI-driven system provides real-time market analysis, helping investors make informed decisions while managing risks effectively.

## Abu Dhabi's MGX Invests $2 Billion into Binance: Institutional Confidence in Crypto

In a significant move, Abu Dhabi's investment group MGX has invested $2 billion into Binance, the world's largest cryptocurrency exchange. This investment underscores the growing institutional confidence in the crypto industry and aligns with the UAE's vision of becoming a global hub for digital assets.

**How Smart Crypto Plays a Role:** Institutional investments often signal market maturity and stability. Smart Crypto leverages such trends by integrating institutional-grade tools and insights into our platform, enabling individual investors to benefit from strategies traditionally reserved for large entities.

## Bolivia Turns to Crypto for Energy Imports: Embracing Digital Solutions

Facing a shortage of dollars and fuel, Bolivia's state energy firm YPFB has turned to cryptocurrency to pay for energy imports. This innovative approach highlights the practical applications of digital assets in addressing real-world economic challenges.

**Smart Crypto's Contribution:** As cryptocurrencies gain acceptance in various sectors, Smart Crypto provides users with the tools to diversify their portfolios and capitalize on emerging trends. Our platform's automated portfolio management ensures that investments are optimized in response to such global developments.`;
  }
  return null;
};

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-12 mb-6 text-white">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 mb-6 leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-blue-400 font-semibold">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-400 pl-4 my-6 italic text-gray-300">
      {children}
    </blockquote>
  ),
};

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogPost({ params }: PageProps) {
  const content = getPostContent(params.slug);

  if (!content) {
    notFound();
  }

  const post = blogPosts.find((post: BlogPost) =>
    post.link.endsWith(params.slug)
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 my-4">
          <span className="text-sm text-blue-400">{post.category}</span>
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>
      </CustomStyledConatiner>

      <article className="prose prose-invert prose-lg max-w-none mt-8">
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
