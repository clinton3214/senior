"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Icons } from "./Icons";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigationItems = [
    { label: "Forums", icon: Icons.Forum, href: "#", active: true },
    { label: "What's New", icon: Icons.Sparkles, href: "#" },
    { label: "Media", icon: Icons.Play, href: "#" },
    { label: "Membership", icon: Icons.Star, href: "#" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-surface text-on-surface w-full h-24 flex justify-between items-center px-6 border-b-4 border-outline-variant shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="h-12 min-w-[48px] px-3 flex items-center justify-center gap-2 text-primary hover:bg-surface-container rounded-lg transition-colors border border-outline-variant active:scale-95"
          >
            <Icons.Menu size={24} aria-hidden="true" />
            <span className="text-body-md font-bold">Menu</span>
          </button>
          <span className="font-display text-headline-md font-bold text-primary tracking-tight">
            GoldenCircles
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="h-12 px-3 flex items-center justify-center gap-2 bg-surface-container-low text-primary hover:bg-surface-container rounded-lg border border-outline-variant transition-colors active:scale-95"
          >
            {theme === "light" ? (
              <Icons.Moon size={22} aria-hidden="true" />
            ) : (
              <Icons.Sun size={22} aria-hidden="true" />
            )}
            <span className="text-label-md font-bold hidden sm:inline">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Sidebar Menu) */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative z-50 flex flex-col p-6 bg-surface text-on-surface w-80 h-full border-r-4 border-outline-variant shadow-2xl transition-transform duration-300 transform translate-x-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-surface-variant">
              <span className="font-display text-headline-md font-bold text-primary">GoldenCircles</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="h-12 w-12 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded-full border border-outline-variant transition-colors"
              >
                <Icons.Close size={24} />
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-surface-container rounded-xl border border-outline-variant">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container border border-outline flex items-center justify-center overflow-hidden">
                <Icons.Person size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Welcome back,</p>
                <p className="font-body-md font-bold text-primary">Community Member</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col gap-3">
              {navigationItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl text-body-lg font-bold border-2 transition-all ${
                      item.active
                        ? "bg-primary text-on-primary border-primary shadow-sm"
                        : "bg-surface-container-low text-on-surface-variant border-transparent hover:border-outline-variant hover:bg-surface-container"
                    }`}
                  >
                    <IconComponent size={24} aria-hidden="true" />
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Footer controls inside Mobile menu */}
            <div className="mt-auto pt-6 border-t-2 border-surface-variant flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="h-12 w-full flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-variant text-on-surface border-2 border-outline rounded-xl font-bold transition-colors"
              >
                {theme === "light" ? (
                  <Icons.Moon size={22} aria-hidden="true" />
                ) : (
                  <Icons.Sun size={22} aria-hidden="true" />
                )}
                {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              </button>
              <button className="h-14 w-full bg-primary text-on-primary font-bold text-label-lg rounded-xl shadow-sm hover:bg-primary-container transition-colors active:scale-95">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-40 bg-surface text-on-surface w-full max-w-max-width mx-auto px-6 h-24 justify-between items-center border-b-4 border-outline-variant shadow-sm">
        <div className="flex items-center gap-8 h-full">
          <span className="font-display text-headline-md lg:text-display font-bold text-primary tracking-tight">
            GoldenCircles
          </span>
          <nav className="flex items-center gap-2 h-full font-label-lg">
            {navigationItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className={`h-16 px-4 flex items-center gap-2 border-b-4 text-body-md font-bold transition-all hover:bg-surface-container-low ${
                    item.active
                      ? "text-primary border-primary"
                      : "text-on-surface-variant border-transparent hover:text-primary"
                  }`}
                >
                  <IconComponent size={20} aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Global Toolbar and Controls */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Icons.Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search forums..."
              className="pl-10 pr-4 py-3 border-2 border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all w-64 font-body-md text-body-md"
            />
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark visual display"
            className="h-12 px-4 flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container text-primary border-2 border-outline-variant rounded-xl font-bold transition-colors active:scale-95"
          >
            {theme === "light" ? (
              <Icons.Moon size={20} aria-hidden="true" />
            ) : (
              <Icons.Sun size={20} aria-hidden="true" />
            )}
            <span className="text-body-md font-bold">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          {/* User Account */}
          <button className="h-12 px-4 flex items-center justify-center gap-2 hover:bg-surface-container text-primary border-2 border-outline-variant rounded-xl font-bold transition-colors active:scale-95">
            <Icons.Person size={20} className="text-primary" aria-hidden="true" />
            <span className="text-body-md font-bold">Profile</span>
          </button>
        </div>
      </header>
    </>
  );
}
