"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
export type TextSize = "normal" | "large" | "largest";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  textSize: TextSize;
  changeTextSize: (size: TextSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [textSize, setTextSize] = useState<TextSize>("normal");

  useEffect(() => {
    // Access localStorage safely on the client side
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = savedTheme || systemTheme;
    
    setTheme(activeTheme);
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Text Size Initialization
    const savedTextSize = localStorage.getItem("textSize") as TextSize | null;
    const activeTextSize = savedTextSize || "normal";
    setTextSize(activeTextSize);
    applyTextSizeClass(activeTextSize);

    // Register Service Worker for PWA support
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered on scope:", reg.scope))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }
  }, []);

  const applyTextSizeClass = (size: TextSize) => {
    const root = document.documentElement;
    root.classList.remove("text-scale-normal", "text-scale-large", "text-scale-largest");
    root.classList.add(`text-scale-${size}`);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const changeTextSize = (size: TextSize) => {
    setTextSize(size);
    localStorage.setItem("textSize", size);
    applyTextSizeClass(size);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, textSize, changeTextSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
