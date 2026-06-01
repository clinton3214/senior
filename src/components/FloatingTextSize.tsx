"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme, TextSize } from "./ThemeProvider";

export default function FloatingTextSize() {
  const { textSize, changeTextSize } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const sizes: Array<{ value: TextSize; label: string; desc: string }> = [
    { value: "normal", label: "A", desc: "Default Size" },
    { value: "large", label: "A+", desc: "20% Larger" },
    { value: "largest", label: "A++", desc: "40% Largest" },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Sizing Popover Menu */}
      {isOpen && (
        <div 
          className="mb-4 p-4 bg-surface/95 backdrop-blur-md border-2 border-outline-variant rounded-3xl shadow-2xl flex flex-col gap-3.5 w-64 animate-scaleUp text-on-surface"
          role="dialog"
          aria-label="Adjust font size controls"
        >
          <span className="font-label-md text-label-md text-on-surface-variant font-extrabold uppercase tracking-wider block border-b-2 border-surface-variant pb-2 text-center">
            Adjust Font Size
          </span>

          <div className="flex flex-col gap-2">
            {sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => {
                  changeTextSize(size.value);
                  // Play subtle vibration on mobile if supported
                  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(15);
                  }
                }}
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all cursor-pointer active:scale-98 ${
                  textSize === size.value
                    ? "bg-primary text-on-primary border-primary font-extrabold shadow-sm scale-[1.02]"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant border-transparent hover:border-outline-variant"
                }`}
              >
                <span className={`font-headline-md leading-none ${size.value === "normal" ? "text-lg" : size.value === "large" ? "text-xl" : "text-2xl font-extrabold"}`}>
                  {size.label}
                </span>
                <span className="font-label-md text-label-md opacity-85 font-bold">
                  {size.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Adjust site font size"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-on-primary hover:bg-primary-container shadow-2xl border-2 border-outline-variant hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer relative group ${
          isOpen ? "bg-primary-container border-primary" : ""
        }`}
      >
        <span className="font-display font-extrabold text-headline-lg select-none leading-none pt-0.5" aria-hidden="true">
          A
        </span>
        
        {/* Subtle tooltip indicator on hover */}
        {!isOpen && (
          <span className="absolute right-16 px-3 py-1.5 bg-surface-container-highest text-on-surface border border-outline rounded-xl font-label-md text-label-md font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:inline">
            Text Size Toggle
          </span>
        )}
      </button>
    </div>
  );
}
