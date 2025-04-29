import CustomStyledConatiner from "@/components/CustomStyledContainer";

export default function PricingPage() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Bitcoin Yay Pricing
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>
    </div>
  );
}
