"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

interface UpdateItem {
  id: string;
  type: "announcement" | "discussion" | "achievement";
  title: string;
  excerpt: string;
  timeAgo: string;
  tag: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  likes: number;
}

export default function WhatsNew() {
  const [activeFilter, setActiveFilter] = useState<"all" | "announcement" | "discussion" | "achievement">("all");
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const updates: UpdateItem[] = [
    {
      id: "up-1",
      type: "announcement",
      title: "GoldenCircles Accessibility Upgrades Completed",
      excerpt: "To continue supporting our community members, we have rolled out Level 3 accessibility compliance. This includes 200% screen zoom safety, custom high-contrast touch guides, and extra large navigation buttons.",
      timeAgo: "2 hours ago",
      tag: "Platform News",
      icon: Icons.Sparkles,
      likes: 24,
    },
    {
      id: "up-2",
      type: "discussion",
      title: "New Group: Grandparenting Tips & Story Swapping",
      excerpt: "By popular request, we have opened a dedicated group for grandparents. Share your favorite books, toddler recipes, and how you manage video calls across time zones!",
      timeAgo: "1 day ago",
      tag: "New Forum",
      icon: Icons.Forum,
      likes: 42,
    },
    {
      id: "up-3",
      type: "achievement",
      title: "Milestone: 12,000 Active Members!",
      excerpt: "Our community continues to grow! Today we officially welcomed our 12,000th member. We are so incredibly proud of the supportive, warm space everyone has helped build here.",
      timeAgo: "2 days ago",
      tag: "Community Update",
      icon: Icons.Star,
      likes: 67,
    },
    {
      id: "up-4",
      type: "announcement",
      title: "Security Spotlight: Protecting Your Personal Information Online",
      excerpt: "In our upcoming virtual workshop, we will share simple, direct tips to keep your browsing secure, spot suspicious emails, and use two-factor authentication safely. Sign up is free for all members.",
      timeAgo: "3 days ago",
      tag: "Safety First",
      icon: Icons.Person,
      likes: 19,
    }
  ];

  const activeMembers = [
    { name: "GardenPete", initial: "GP", role: "Green Thumb", active: "Online Now" },
    { name: "MedicareRoy", initial: "MR", role: "Medicare Advisor", active: "10 mins ago" },
    { name: "Martha_S", initial: "MS", role: "Community Elder", active: "2 hours ago" },
    { name: "Alice_K", initial: "AK", role: "Book Club Lead", active: "Online Now" }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredUpdates = activeFilter === "all" 
    ? updates 
    : updates.filter(u => u.type === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dynamic Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        
        {/* Title Block */}
        <section 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-6 border-b-2 border-surface-variant"
          aria-labelledby="whats-new-heading"
        >
          <div>
            <h2 id="whats-new-heading" className="font-display text-headline-lg md:text-display text-primary font-extrabold tracking-tight mb-2">
              What's New
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-bold leading-relaxed">
              Explore the latest site developments, community announcements, and platform updates.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 p-2 bg-surface-container border-2 border-outline-variant rounded-3xl shadow-xs">
              {(["all", "announcement", "discussion", "achievement"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-3 rounded-2xl font-label-lg text-label-md font-bold transition-all active:scale-[0.97] cursor-pointer ${
                    activeFilter === filter
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface border-2 border-transparent hover:border-outline-variant"
                  }`}
                >
                  {filter === "all" && "All Activities"}
                  {filter === "announcement" && "Announcements"}
                  {filter === "discussion" && "Forums & Groups"}
                  {filter === "achievement" && "Achievements"}
                </button>
              ))}
            </div>

            {/* Updates list */}
            <div className="space-y-6">
              {filteredUpdates.map((item) => {
                const ItemIcon = item.icon;
                const isLiked = likedItems[item.id];
                return (
                  <article 
                    key={item.id}
                    className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary rounded-3xl p-6 shadow-sm transition-all duration-300 ease-out flex gap-6 hover:scale-[1.01] active:scale-[1.01] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] active:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center border border-outline flex-shrink-0">
                      <ItemIcon size={26} aria-hidden="true" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-label-md font-bold text-on-surface-variant rounded-xl">
                          {item.tag}
                        </span>
                        <span className="text-body-md font-bold text-outline flex items-center gap-1">
                          <Icons.Clock size={16} />
                          {item.timeAgo}
                        </span>
                      </div>
                      <h4 className="font-headline-md text-headline-md text-on-surface font-extrabold leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {item.excerpt}
                      </p>
                      
                      <div className="pt-2 flex items-center gap-4">
                        <button 
                          onClick={(e) => handleLike(item.id, e)}
                          className={`flex items-center gap-2 px-4 py-2 border-2 rounded-2xl font-bold text-label-md transition-all cursor-pointer active:scale-90 ${
                            isLiked
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface-container-low text-secondary border-outline-variant hover:border-primary hover:text-primary"
                          }`}
                        >
                          <Icons.Star size={18} className={isLiked ? "fill" : ""} />
                          <span>{isLiked ? item.likes + 1 : item.likes} {isLiked ? "Recommended" : "Recommend"}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Active Members Showcase */}
            <section className="bg-surface-container border-2 border-outline-variant rounded-3xl p-6 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 font-extrabold pb-3 border-b-2 border-surface-variant">
                Active Contributors
              </h3>
              <div className="space-y-4">
                {activeMembers.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl flex items-center justify-between gap-4 transition-all hover:bg-surface-container-low cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center font-extrabold text-body-md">
                        {member.initial}
                      </div>
                      <div>
                        <h4 className="font-label-lg text-label-lg font-extrabold text-on-surface leading-snug">{member.name}</h4>
                        <p className="text-body-sm text-secondary text-xs font-bold">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        member.active === "Online Now" ? "bg-green-600 animate-pulse" : "bg-outline"
                      }`} />
                      <span className="text-body-sm text-outline text-xs font-bold">{member.active}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Sidebar />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
