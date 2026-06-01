"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadCard from "@/components/ThreadCard";
import WelcomeWidget from "@/components/WelcomeWidget";
import Sidebar from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Page 1 Threads
  const retirementThreads = [
    {
      id: "retirement-1",
      category: "Finance",
      timeAgo: "2 hours ago",
      title: "Maximizing Social Security Benefits in 2026",
      excerpt: "I've been reading through the new federal guidelines and wanted to share some strategies for those of us turning 65 this year. It seems there are a few overlooked claiming options...",
      replies: 42,
      authorInitials: "JD",
      authorName: "JohnDoe77",
    },
    {
      id: "retirement-2",
      category: "Downsizing",
      timeAgo: "5 hours ago",
      title: "Moving from a 4-bedroom house to a condo: My experience",
      excerpt: "The process of decluttering 30 years of memories was daunting, but I finally made the move to a smaller space. Here is what I wish I knew before starting this transition.",
      replies: 18,
      authorInitials: "MS",
      authorName: "Martha_S",
    },
  ];

  const hobbyThreads = [
    {
      id: "hobby-1",
      category: "Gardening",
      timeAgo: "1 day ago",
      title: "Spring Planting Guide for Zone 6",
      excerpt: "Getting an early start on heirloom tomatoes this year. Is anyone else starting seeds indoors or preparing soil beds early? Let's swap tips.",
      replies: 12,
      authorInitials: "GP",
      authorName: "GardenPete",
    },
    {
      id: "hobby-2",
      category: "Travel",
      timeAgo: "2 days ago",
      title: "Accessible European River Cruises",
      excerpt: "Looking for recommendations for cruise lines that cater well to limited mobility. Planning an anniversary trip and want smooth excursions.",
      replies: 8,
      authorInitials: "TR",
      authorName: "TravelRoy",
    },
  ];

  const healthThreads = [
    {
      id: "health-1",
      category: "Health",
      timeAgo: "3 hours ago",
      title: "Best Knee-Friendly Exercises for Home",
      excerpt: "Let's share home workouts that are gentle on joints but keep us active. I've found some excellent routines using chair yoga and resistance bands that have really helped...",
      replies: 32,
      authorInitials: "CH",
      authorName: "Clara_H",
    },
  ];

  // Page 2 Threads
  const techThreads = [
    {
      id: "tech-1",
      category: "Technology",
      timeAgo: "6 hours ago",
      title: "Getting Started with Voice-to-Text on Smartphones",
      excerpt: "If your fingers or eyes get tired typing, voice-to-text is a total game changer. Let me share how to set it up easily on iPhone and Android, and some quick dictation tips...",
      replies: 14,
      authorInitials: "DG",
      authorName: "TechDave",
    },
  ];

  const travelThreads = [
    {
      id: "travel-1",
      category: "Travel",
      timeAgo: "1 day ago",
      title: "Grand Canyon Railway vs. Driving: Advice needed",
      excerpt: "We are planning a trip to Arizona in September and want to know if the historic train ride from Williams is worth it compared to driving. Looking for advice on accessibility...",
      replies: 25,
      authorInitials: "TR",
      authorName: "TravelRoy",
    },
  ];

  const cookingThreads = [
    {
      id: "cooking-1",
      category: "Cooking",
      timeAgo: "2 days ago",
      title: "The Secrets to Perfect Sugar-Free Baking",
      excerpt: "Baking for diabetic family members is tricky. I've been experimenting with monk fruit, erythritol, and almond flour. Let's exchange recipes that actually taste good!",
      replies: 19,
      authorInitials: "MS",
      authorName: "BakerMartha",
    },
  ];

  const artsThreads = [
    {
      id: "arts-1",
      category: "Arts",
      timeAgo: "3 days ago",
      title: "Watercolors for Beginners: What supplies do I actually need?",
      excerpt: "Starting watercolor painting as a brand new hobby! Should I get student-grade pans or invest in professional grade blocks? What brushes would you recommend for older hands?",
      replies: 11,
      authorInitials: "EV",
      authorName: "ArtisticVance",
    },
  ];

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    // Smooth scroll to top of bento grid on page change
    const target = document.getElementById("forums-anchor");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Accessible Navigation Header */}
      <Header />

      {/* Main Forum View - Compact padding on mobile */}
      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        
        {/* Title and Top Action Header */}
        <section 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-6 border-b-2 border-surface-variant"
          aria-labelledby="main-heading"
        >
          <div>
            <h2 id="main-heading" className="font-display text-headline-lg md:text-display text-primary font-extrabold tracking-tight mb-2">
              Community Forums
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-bold leading-relaxed">
              Join the conversation with fellow members. Designed for absolute clarity and support.
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-bold px-6 py-4 rounded-2xl min-h-[56px] transition-all active:scale-95 shadow-md cursor-pointer">
              <Icons.PlusCircle size={24} aria-hidden="true" />
              Start New Discussion
            </button>
          </div>
        </section>

        {/* Forums Anchor for Pagination Scrolling */}
        <div id="forums-anchor" className="scroll-mt-28" />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Forum Categories Column */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* PAGE 1 RENDER */}
            {currentPage === 1 && (
              <>
                {/* Category 1: Retirement Planning */}
                <section aria-labelledby="retirement-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Savings size={26} aria-hidden="true" />
                    </div>
                    <h3 id="retirement-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Retirement Planning
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {retirementThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>

                {/* Category 2: Hobbies & Interests */}
                <section aria-labelledby="hobbies-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Palette size={26} aria-hidden="true" />
                    </div>
                    <h3 id="hobbies-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Hobbies & Interests
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hobbyThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>

                {/* Category 3: Health & Wellness (NEW) */}
                <section aria-labelledby="health-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Heart size={26} aria-hidden="true" />
                    </div>
                    <h3 id="health-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Health & Wellness
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {healthThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* PAGE 2 RENDER */}
            {currentPage === 2 && (
              <>
                {/* Category 4: Technology & Support (NEW) */}
                <section aria-labelledby="tech-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Sparkles size={26} aria-hidden="true" />
                    </div>
                    <h3 id="tech-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Technology & Support
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {techThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>

                {/* Category 5: Travel & Adventure (NEW) */}
                <section aria-labelledby="travel-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Play size={26} aria-hidden="true" />
                    </div>
                    <h3 id="travel-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Travel & Adventure
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {travelThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>

                {/* Category 6: Cooking & Recipes (NEW) */}
                <section aria-labelledby="cooking-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Clock size={26} aria-hidden="true" />
                    </div>
                    <h3 id="cooking-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Cooking & Recipes
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {cookingThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>

                {/* Category 7: Creative Arts (NEW) */}
                <section aria-labelledby="arts-heading" className="space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline shadow-xs">
                      <Icons.Palette size={26} aria-hidden="true" />
                    </div>
                    <h3 id="arts-heading" className="font-headline-lg text-headline-md md:text-headline-lg text-primary font-extrabold">
                      Creative Arts
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {artsThreads.map((thread) => (
                      <ThreadCard key={thread.id} {...thread} />
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* PAGE 3 RENDER (End of directory) */}
            {currentPage === 3 && (
              <div className="flex flex-col items-center justify-center text-center py-14 bg-surface-container border border-outline-variant rounded-3xl p-8">
                <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6 text-outline border border-outline-variant">
                  <Icons.Forum size={40} className="text-primary" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-extrabold">
                  Directory Completed
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed mb-6">
                  You have reached the end of the forums directory. GoldenCircles is growing daily—check back later for new boards!
                </p>
                <button 
                  onClick={() => handlePageChange(1)}
                  className="min-h-[48px] bg-primary text-on-primary font-bold text-label-lg px-6 py-3 rounded-2xl cursor-pointer hover:bg-primary-container transition-all active:scale-95 shadow-sm"
                >
                  Return to Page 1
                </button>
              </div>
            )}

            {/* Pagination Controls - Optimized for mobile screen widths */}
            <nav 
              className="flex items-center justify-between gap-4 p-4 bg-surface-container border-2 border-outline-variant rounded-3xl shadow-xs"
              aria-label="Forum pagination navigation"
            >
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center justify-center gap-2 h-12 px-4 bg-surface-container-lowest hover:bg-surface text-secondary hover:text-primary border-2 border-outline rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                disabled={currentPage === 1}
              >
                <Icons.ArrowLeft size={20} aria-hidden="true" />
                <span className="hidden sm:inline">Previous Page</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(1)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-2xl font-extrabold transition-all cursor-pointer ${
                    currentPage === 1 
                      ? "bg-primary text-on-primary border-primary" 
                      : "bg-surface-container-lowest hover:bg-surface text-on-surface border-outline-variant active:scale-95"
                  }`}
                  aria-current={currentPage === 1 ? "page" : undefined}
                  aria-label="Page 1"
                >
                  1
                </button>
                <button 
                  onClick={() => handlePageChange(2)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-2xl font-extrabold transition-all cursor-pointer ${
                    currentPage === 2 
                      ? "bg-primary text-on-primary border-primary" 
                      : "bg-surface-container-lowest hover:bg-surface text-on-surface border-outline-variant active:scale-95"
                  }`}
                  aria-current={currentPage === 2 ? "page" : undefined}
                  aria-label="Go to Page 2"
                >
                  2
                </button>
                <button 
                  onClick={() => handlePageChange(3)}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-2xl font-extrabold transition-all cursor-pointer ${
                    currentPage === 3 
                      ? "bg-primary text-on-primary border-primary" 
                      : "bg-surface-container-lowest hover:bg-surface text-on-surface border-outline-variant active:scale-95"
                  }`}
                  aria-current={currentPage === 3 ? "page" : undefined}
                  aria-label="Go to Page 3"
                >
                  3
                </button>
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center justify-center gap-2 h-12 px-4 bg-surface-container-lowest hover:bg-surface text-primary border-2 border-outline rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                disabled={currentPage === 3}
                aria-label="Go to next page"
              >
                <span className="hidden sm:inline">Next Page</span>
                <Icons.ArrowRight size={20} aria-hidden="true" />
              </button>
            </nav>

          </div>

          {/* Sidebar Area Column */}
          <div className="lg:col-span-4 space-y-8">
            <WelcomeWidget />
            <Sidebar />
          </div>

        </div>
      </main>

      {/* Accessible Footer */}
      <Footer />
    </div>
  );
}
