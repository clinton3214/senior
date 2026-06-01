import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreadCard from "@/components/ThreadCard";
import WelcomeWidget from "@/components/WelcomeWidget";
import Sidebar from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

export default function Home() {
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Forum Categories Column */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* Category: Retirement Planning */}
            <section aria-labelledby="retirement-heading">
              <div className="flex items-center gap-3.5 mb-6">
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

            {/* Category: Hobbies & Interests */}
            <section aria-labelledby="hobbies-heading">
              <div className="flex items-center gap-3.5 mb-6">
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

            {/* Pagination Controls - Optimized for mobile screen widths */}
            <nav 
              className="flex items-center justify-between gap-4 p-4 bg-surface-container border-2 border-outline-variant rounded-3xl shadow-xs"
              aria-label="Forum pagination navigation"
            >
              <button 
                className="flex items-center justify-center gap-2 h-12 px-4 bg-surface-container-lowest hover:bg-surface text-secondary hover:text-primary border-2 border-outline rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
                disabled
              >
                <Icons.ArrowLeft size={20} aria-hidden="true" />
                <span className="hidden sm:inline">Previous Page</span>
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary border-2 border-primary rounded-2xl font-extrabold transition-all cursor-pointer"
                  aria-current="page"
                  aria-label="Page 1"
                >
                  1
                </button>
                <button 
                  className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest hover:bg-surface text-on-surface border-2 border-outline-variant rounded-2xl font-extrabold transition-all active:scale-95 cursor-pointer"
                  aria-label="Go to Page 2"
                >
                  2
                </button>
                <button 
                  className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest hover:bg-surface text-on-surface border-2 border-outline-variant rounded-2xl font-extrabold transition-all active:scale-95 cursor-pointer"
                  aria-label="Go to Page 3"
                >
                  3
                </button>
              </div>

              <button 
                className="flex items-center justify-center gap-2 h-12 px-4 bg-surface-container-lowest hover:bg-surface text-primary border-2 border-outline rounded-2xl font-bold transition-all active:scale-95 cursor-pointer"
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
