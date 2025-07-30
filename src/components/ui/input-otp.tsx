"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputOTPProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ length, value, onChange, className, disabled, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const refs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, digit: string) => {
      if (digit.length > 1) {
        digit = digit.slice(-1);
      }

      const newValue = value.split("");
      newValue[index] = digit;
      const updatedValue = newValue.join("").slice(0, length);
      onChange(updatedValue);

      // Move to next input if digit was entered
      if (digit && index < length - 1) {
        refs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        refs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      const digits = paste.replace(/\D/g, "").slice(0, length);
      onChange(digits);
    };

    return (
      <div
        ref={ref}
        className={cn("flex gap-2 justify-center", className)}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(-1)}
            disabled={disabled}
            className={cn(
              "w-12 h-12 text-center text-lg font-semibold border rounded-md",
              "border-bg3 bg-transparent text-tertiary",
              "focus:border-primary focus:outline-none hover:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              activeIndex === index && "border-primary",
              className
            )}
          />
        ))}
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

export { InputOTP };
