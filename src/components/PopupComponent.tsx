// components/PopupComponent.tsx
"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import CrossImage from "@/assets/images/icons/cross-white.png";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}

const PopupComponent: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  // Respect Esc flag
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={closeOnOutsideClick ? onClose : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal box */}
      <div
        ref={boxRef}
        className="relative z-10 w-full rounded-2xl border border-bg3 bg-bg shadow-xl"
        // Keep clicks inside from closing
        onClick={(e) => e.stopPropagation()}
        // Viewport-fit: width & height behave at any zoom
        style={{
          maxWidth: "min(96vw, 720px)",
          maxHeight: "min(92dvh, 92vh)", // dvh for mobile; vh fallback
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Keep the close button INSIDE the box */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3"
          aria-label="Close"
        >
          <Image
            src={CrossImage}
            alt="Close"
            className="w-8 h-8 hover:scale-110 transition"
          />
        </button>

        {children}
      </div>
    </div>
  );
};

export default PopupComponent;
