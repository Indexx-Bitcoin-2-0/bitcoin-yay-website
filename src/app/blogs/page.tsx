import CustomStyledConatiner from "@/components/CustomStyledContainer";
import Image from "next/image";
import Link from "next/link";

import Blog1 from "@/assets/images/blogs/blog-01.svg";
import Blog2 from "@/assets/images/blogs/blog-02.svg";
import Blog3 from "@/assets/images/blogs/blog-03.svg";
import Blog4 from "@/assets/images/blogs/blog-04.svg";
import Blog5 from "@/assets/images/blogs/blog-05.svg";
import Blog6 from "@/assets/images/blogs/blog-06.svg";
import Blog7 from "@/assets/images/blogs/blog-07.svg";
import Blog8 from "@/assets/images/blogs/blog-08.svg";
import Blog9 from "@/assets/images/blogs/blog-09.svg";
import Blog10 from "@/assets/images/blogs/blog-10.svg";
import Blog11 from "@/assets/images/blogs/blog-11.svg";
import Blog12 from "@/assets/images/blogs/blog-12.svg";
interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Smart Crypto: Empowering Investors Amidst Today's Crypto Market Volatility",
    description:
      "In today's volatile crypto market, smart investors are finding ways to navigate uncertainty and challenges. Find out how smart crypto is helping them manage their investments.",
    date: "March 14, 2025",
    image: Blog1,
    category: "Announcement",
    link: "/blogs/smart-crypto-empowering-investors",
  },
  {
    id: 2,
    title: "Smart Money: Why Now Is the Best Time to Invest in Crypto?",
    description:
      "With the crypto market showing signs of recovery and fresh opportunities emerging, learn why smart investors think it's the perfect time to invest in cryptocurrency.",
    date: "March 14, 2025",
    image: Blog2,
    category: "Announcement",
    link: "/blogs/smart-money-crypto-investment",
  },
  {
    id: 3,
    title: "Crypto Simplified: How Smart Crypto is Reshaping the Way We Invest",
    description:
      "Discover how smart crypto is making digital investments simple, safe, and accessible. With cutting-edge tools, smarter investment options, and technical innovations.",
    date: "March 14, 2025",
    image: Blog3,
    category: "Announcement",
    link: "/blogs/crypto-simplified",
  },
  {
    id: 4,
    title: "How to Turn Your Space Crypto into a Money-Making Machine",
    description:
      "Find out how we've taken hold of the value chain's keys and are helping to transform dormant space into real value. Here's why it's not about actually making your price list matter.",
    date: "March 14, 2025",
    image: Blog4,
    category: "Announcement",
    link: "/blogs/space-crypto-money-machine",
  },
  {
    id: 5,
    title: "How Much Is Your Bank Actually Costing You?",
    description:
      "Most people believe that paying high fees is necessary to keep an account in the market. Learn more about how Bitcoin Yay is changing this dynamic right now.",
    date: "March 14, 2025",
    image: Blog5,
    category: "Announcement",
    link: "/blogs/bank-costs-analysis",
  },
  {
    id: 6,
    title: "Smart APY: The Future of Financial Earnings, Simplified",
    description:
      "Ready to say hello to financial freedom? Join Now! Let's dive into how simple but effective scaled-up thinking is going to lead you step by step to financial success.",
    date: "March 14, 2025",
    image: Blog6,
    category: "Announcement",
    link: "/blogs/smart-apy-future",
  },
  {
    id: 7,
    title:
      "Smart Crypto: Empowering Investors Amidst Today's Crypto Market Volatility",
    description:
      "In today's volatile crypto market, smart investors are finding ways to navigate uncertainty and challenges. Find out how smart crypto is helping them manage their investments.",
    date: "March 14, 2025",
    image: Blog7,
    category: "Announcement",
    link: "/blogs/smart-crypto-empowering-investors",
  },
  {
    id: 8,
    title: "Smart Money: Why Now Is the Best Time to Invest in Crypto?",
    description:
      "With the crypto market showing signs of recovery and fresh opportunities emerging, learn why smart investors think it's the perfect time to invest in cryptocurrency.",
    date: "March 14, 2025",
    image: Blog8,
    category: "Announcement",
    link: "/blogs/smart-money-crypto-investment",
  },
  {
    id: 9,
    title: "Crypto Simplified: How Smart Crypto is Reshaping the Way We Invest",
    description:
      "Discover how smart crypto is making digital investments simple, safe, and accessible. With cutting-edge tools, smarter investment options, and technical innovations.",
    date: "March 14, 2025",
    image: Blog9,
    category: "Announcement",
    link: "/blogs/crypto-simplified",
  },
  {
    id: 10,
    title: "How to Turn Your Space Crypto into a Money-Making Machine",
    description:
      "Find out how we've taken hold of the value chain's keys and are helping to transform dormant space into real value. Here's why it's not about actually making your price list matter.",
    date: "March 14, 2025",
    image: Blog10,
    category: "Announcement",
    link: "/blogs/space-crypto-money-machine",
  },
  {
    id: 11,
    title: "How Much Is Your Bank Actually Costing You?",
    description:
      "Most people believe that paying high fees is necessary to keep an account in the market. Learn more about how Bitcoin Yay is changing this dynamic right now.",
    date: "March 14, 2025",
    image: Blog11,
    category: "Announcement",
    link: "/blogs/bank-costs-analysis",
  },
  {
    id: 12,
    title: "Smart APY: The Future of Financial Earnings, Simplified",
    description:
      "Ready to say hello to financial freedom? Join Now! Let's dive into how simple but effective scaled-up thinking is going to lead you step by step to financial success.",
    date: "March 14, 2025",
    image: Blog12,
    category: "Announcement",
    link: "/blogs/smart-apy-future",
  },
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={post.link} className="group">
      <div className="bg-[#1C1C1C] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] h-full flex flex-col">
        <div className="relative h-70 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-primary">{post.category}</span>
            <span className="text-sm text-primary">{post.date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm flex-grow">{post.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default function Blogs() {
  return (
    <div className="mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16">
          News & Blogs
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
