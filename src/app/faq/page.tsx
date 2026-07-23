"use client";

import React, { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "./faqData";

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const normalizedQuery = query.trim().toLowerCase();

  // Filter by category + free-text search across question and answer.
  const filteredCategories = useMemo(() => {
    return faqCategories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        items: normalizedQuery
          ? cat.items.filter(
            (item) =>
              item.q.toLowerCase().includes(normalizedQuery) ||
              item.a.toLowerCase().includes(normalizedQuery)
          )
          : cat.items,
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, normalizedQuery]);

  const totalResults = filteredCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <div className="container mx-auto mt-40">
      {/* Hero header */}
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl md:text-3xl mb-2 font-bold text-primary">
          Help Center
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-tertiary text-lg md:text-xl font-light">
          Everything you need to know about Bitcoin Yay — mining, plans,
          airdrops, referrals, the Mining Station, payments, and more. Search or
          browse by topic.
        </p>
      </div>

      {/* Search */}
      <div className="mt-12 max-w-2xl mx-auto px-4 w-full">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            aria-label="Search frequently asked questions"
            className="w-full rounded-full border border-bg2 bg-transparent py-4 pl-12 pr-12 text-base md:text-lg text-secondary placeholder:text-tertiary outline-none focus:border-primary transition-colors"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 px-4 max-w-5xl mx-auto">
        <CategoryChip
          label="All Topics"
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {faqCategories.map((cat) => (
          <CategoryChip
            key={cat.id}
            label={cat.title}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </div>

      {/* Result count when searching */}
      {normalizedQuery.length > 0 && (
        <p className="mt-8 text-center text-tertiary text-base">
          {totalResults > 0
            ? `${totalResults} result${totalResults === 1 ? "" : "s"} for “${query.trim()}”`
            : `No results for “${query.trim()}”`}
        </p>
      )}

      {/* FAQ sections */}
      <div className="mt-12 mb-40 max-w-4xl mx-auto px-4">
        {totalResults === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-secondary mb-2">
              No matching questions
            </p>
            <p className="text-tertiary text-lg">
              Try a different keyword or browse all topics.
            </p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section key={cat.id} className="mb-16 scroll-mt-40" id={cat.id}>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {cat.title}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {cat.items.map((item, index) => (
                  <AccordionItem
                    key={`${cat.id}-${index}`}
                    value={`${cat.id}-${index}`}
                    className="border border-bg2 rounded-lg px-6 bg-transparent last:border-b"
                  >
                    <AccordionTrigger className="text-left text-lg md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg text-tertiary my-4 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm md:text-base font-medium border transition-colors ${active
        ? "bg-primary border-primary text-black"
        : "border-bg2 text-tertiary hover:border-primary hover:text-primary"
        }`}
    >
      {label}
    </button>
  );
}
