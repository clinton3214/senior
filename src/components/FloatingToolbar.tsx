"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme, TextSize } from "./ThemeProvider";
import { Icons } from "./Icons";

export default function FloatingToolbar() {
  const { theme, toggleTheme, textSize, changeTextSize } = useTheme();
  const [isTextOpen, setIsTextOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the text-size popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsTextOpen(false);
      }
    }
    if (isTextOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTextOpen]);

  const sizes: Array<{ value: TextSize; label: string; desc: string }> = [
    { value: "normal", label: "A", desc: "Default Size" },
    { value: "large", label: "A+", desc: "20% Larger" },
    { value: "largest", label: "A++", desc: "40% Largest" },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Text Size Popover Menu */}
      {isTextOpen && (
        <div 
          className="mb-1 p-4 bg-surface/95 backdrop-blur-md border-2 border-outline-variant rounded-3xl shadow-2xl flex flex-col gap-3.5 w-64 animate-scaleUp text-on-surface"
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

      {/* FAB Stack — vertical column of circular buttons */}
      <div className="flex flex-col items-center gap-3">

        {/* Profile FAB — Desktop Only */}
        <a
          href="/profile"
          aria-label="View your profile"
          className="hidden md:flex w-14 h-14 md:w-14 md:h-14 rounded-full bg-surface-container-high text-primary hover:bg-surface-container-highest shadow-xl border-2 border-outline-variant hover:border-primary hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer relative group"
        >
          <Icons.Person size={22} aria-hidden="true" />
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 bg-surface-container-highest text-on-surface border border-outline rounded-xl font-label-md text-label-md font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Profile
          </span>
        </a>

        {/* Theme Toggle FAB — Desktop Only */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          className="hidden md:flex w-14 h-14 md:w-14 md:h-14 rounded-full bg-surface-container-high text-primary hover:bg-surface-container-highest shadow-xl border-2 border-outline-variant hover:border-primary hover:scale-105 active:scale-95 transition-all items-center justify-center cursor-pointer relative group"
        >
          {theme === "light" ? (
            <Icons.Moon size={22} aria-hidden="true" />
          ) : (
            <Icons.Sun size={22} aria-hidden="true" />
          )}
          {/* Tooltip */}
          <span className="absolute right-16 px-3 py-1.5 bg-surface-container-highest text-on-surface border border-outline rounded-xl font-label-md text-label-md font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Text Size FAB — All viewports */}
        <button
          onClick={() => setIsTextOpen(!isTextOpen)}
          aria-expanded={isTextOpen}
          aria-label="Adjust site font size"
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-on-primary hover:bg-primary-container shadow-2xl border-2 border-outline-variant hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer relative group ${
            isTextOpen ? "bg-primary-container border-primary" : ""
          }`}
        >
          <span className="font-display font-extrabold text-headline-lg select-none leading-none pt-0.5" aria-hidden="true">
            A
          </span>
          
          {/* Tooltip on hover */}
          {!isTextOpen && (
            <span className="absolute right-16 px-3 py-1.5 bg-surface-container-highest text-on-surface border border-outline rounded-xl font-label-md text-label-md font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:inline">
              Text Size Toggle
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
