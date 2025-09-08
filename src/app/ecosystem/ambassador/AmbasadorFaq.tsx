import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ArtImage9 from "@/assets/images/eco/ambassador/art-9.webp";

export default function AmbassadorFaq() {
  return (
    <div className="my-80 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto">
      <div className="w-full flex justify-between md:justify-start">
        <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold mt-10">
          FAQs
        </h2>
        <Image src={ArtImage9} alt="Art Image 9" className="w-54" />
      </div>

      {/* FAQ Accordions */}
      <div className="w-full mt-16">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border border-bg3 rounded-lg px-6 bg-transparent"
          >
            <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
              Do you publish payout amounts publicly?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-tertiary my-4">
              We discuss incentives privately with each creator. You’ll receive
              a tailored plan with clear milestones.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-bg3 rounded-lg px-6 bg-transparent"
          >
            <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
              Is there a minimum audience size?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-tertiary my-4">
              temp
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-bg3 rounded-lg px-6 bg-transparent"
          >
            <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
              How do milestones work?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-tertiary my-4">
              temp
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border border-bg3 last:border-b-1 rounded-lg px-6 bg-transparent"
          >
            <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
            Can we co-create campaigns?
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-tertiary my-4">
              temp
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
