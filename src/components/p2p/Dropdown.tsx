"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export type DropdownOption = { label: string; value: string };

// Reusable dropdown matching the /quantum-mining "Network" selector.
export default function Dropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
  className = "",
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 p-3 hover:bg-bg2 rounded-md cursor-pointer text-tertiary border border-bg3 w-full text-base focus:border-primary hover:border-primary"
      >
        <span className="flex-1 text-left">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-20 border border-bg">
          <div className="py-1 max-h-64 overflow-auto">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-base cursor-pointer flex items-center gap-3"
              >
                <span className="flex-1">{o.label}</span>
                {value === o.value && (
                  <Check className="w-5 h-5 ml-auto" strokeWidth={2.5} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
