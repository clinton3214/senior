"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icons } from "@/components/Icons";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "activity">("posts");
  const [profilePosts, setProfilePosts] = useState<
    Array<{ authorName: string; authorInitials: string; timeAgo: string; text: string }>
  >([]);
  const [newPostText, setNewPostText] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

  const stats = [
    { label: "Status", value: "VIP Member", icon: Icons.Badge },
    { label: "Last Seen", value: "2 hours ago", icon: Icons.Clock },
    { label: "Joined", value: "Oct 12, 2021", icon: Icons.Calendar },
    { label: "Messages", value: "1,432", icon: Icons.Forum },
    { label: "Reaction Score", value: "8,901", icon: Icons.Heart, highlight: true },
    { label: "Location", value: "Portland, OR", icon: Icons.Location },
  ];

  const activityTimeline = [
    {
      icon: Icons.Forum,
      action: "Replied to",
      target: "Best knee-friendly exercises for home",
      category: "Health & Wellness",
      timeAgo: "3 hours ago",
    },
    {
      icon: Icons.Heart,
      action: "Reacted ❤️ to",
      target: "GardenPete's post",
      category: "Gardening",
      timeAgo: "5 hours ago",
    },
    {
      icon: Icons.Edit,
      action: "Started thread",
      target: "My favorite British mystery novels",
      category: "Hobbies",
      timeAgo: "1 day ago",
    },
    {
      icon: Icons.Forum,
      action: "Replied to",
      target: "Accessible European River Cruises",
      category: "Travel",
      timeAgo: "2 days ago",
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setProfilePosts([
      {
        authorName: "You",
        authorInitials: "ME",
        timeAgo: "Just now",
        text: newPostText.trim(),
      },
      ...profilePosts,
    ]);
    setNewPostText("");
    setShowPostForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        {/* Profile Header Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Avatar & Primary Info Card */}
          <div className="md:col-span-4 bg-surface-container-low border-2 border-outline-variant rounded-3xl p-6 flex flex-col items-center text-center gap-4">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-md relative group cursor-pointer bg-primary-container flex items-center justify-center">
              <Icons.Person size={64} className="text-on-primary-container" />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <Icons.Edit size={24} className="text-on-primary" />
              </div>
            </div>

            {/* Name & Badge */}
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                Eleanor Vance
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Icons.Verified size={20} className="text-primary" />
                <span className="font-label-lg text-label-lg text-primary font-bold">VIP Member</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed max-w-xs mx-auto">
                Gardening enthusiast and retired architect. Always looking for the perfect cup of tea.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-3 mt-auto pt-4 border-t-2 border-surface-variant">
              <button className="flex-1 min-h-[56px] bg-primary text-on-primary font-label-lg text-label-lg font-bold rounded-2xl hover:bg-primary-container transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm">
                <Icons.Edit size={20} aria-hidden="true" />
                Edit Profile
              </button>
              <button
                aria-label="Report User"
                className="min-h-[56px] px-4 bg-surface text-secondary border-2 border-outline-variant rounded-2xl hover:bg-surface-variant hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer active:scale-95"
              >
                <Icons.Flag size={20} />
              </button>
            </div>
          </div>

          {/* Stats Grid Card */}
          <div className="md:col-span-8 bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-2 font-bold">
                      <StatIcon size={18} className="text-outline" aria-hidden="true" />
                      {stat.label}
                    </span>
                    <span className={`font-headline-md text-headline-md font-extrabold ${stat.highlight ? "text-primary" : "text-on-surface"}`}>
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          {/* Tab Bar */}
          <div className="flex border-b-2 border-surface-variant mb-8 gap-1">
            <button
              onClick={() => setActiveTab("posts")}
              className={`font-label-lg text-label-lg pb-3 px-5 flex items-center gap-2 transition-all cursor-pointer font-bold ${
                activeTab === "posts"
                  ? "text-primary border-b-4 border-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-t-2xl"
              }`}
            >
              <Icons.Grid size={20} aria-hidden="true" />
              Profile Posts
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`font-label-lg text-label-lg pb-3 px-5 flex items-center gap-2 transition-all cursor-pointer font-bold ${
                activeTab === "activity"
                  ? "text-primary border-b-4 border-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-t-2xl"
              }`}
            >
              <Icons.History size={20} aria-hidden="true" />
              Latest Activity
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "posts" && (
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 min-h-[400px]">
              {/* Existing posts */}
              {profilePosts.length > 0 && (
                <div className="space-y-4 mb-8">
                  {profilePosts.map((post, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-surface-container rounded-2xl border border-outline-variant flex gap-4 transition-all hover:bg-surface-container-high"
                    >
                      <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container border border-outline flex items-center justify-center font-extrabold text-body-md flex-shrink-0">
                        {post.authorInitials}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-body-md font-bold text-on-surface">{post.authorName}</span>
                          <span className="text-label-md text-outline flex items-center gap-1">
                            <Icons.Clock size={14} />
                            {post.timeAgo}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {post.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state / Write Form */}
              {profilePosts.length === 0 && !showPostForm && (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6 text-outline border border-outline-variant">
                    <Icons.Edit size={48} />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-extrabold">
                    No Profile Posts Yet
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">
                    Eleanor hasn&apos;t posted anything on her profile feed recently. Check back later or write a message.
                  </p>
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="mt-8 min-h-[56px] px-8 bg-surface text-primary border-2 border-primary rounded-2xl hover:bg-primary-container hover:text-on-primary-container transition-colors font-label-lg text-label-lg font-bold flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Icons.Edit size={20} />
                    Write a message on Eleanor&apos;s profile
                  </button>
                </div>
              )}

              {/* Post form (also shown after posts exist) */}
              {(showPostForm || profilePosts.length > 0) && (
                <form onSubmit={handlePostSubmit} className="space-y-4 pt-4 border-t-2 border-surface-variant">
                  <label
                    htmlFor="profile-post-input"
                    className="block font-label-lg text-label-lg text-on-surface-variant font-bold"
                  >
                    Write on Eleanor&apos;s profile
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="profile-post-input"
                      type="text"
                      placeholder="Share a kind thought or memory..."
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      className="flex-1 px-4 py-3.5 border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all placeholder:text-outline"
                    />
                    <button
                      type="submit"
                      disabled={!newPostText.trim()}
                      className="bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed font-label-lg text-label-lg font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 min-h-[48px] transition-all cursor-pointer active:scale-95 flex-shrink-0"
                    >
                      Post
                      <Icons.ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8">
              <h3 className="font-headline-md text-headline-md text-primary font-extrabold mb-6 flex items-center gap-2">
                <Icons.History size={24} />
                Recent Activity
              </h3>
              <div className="space-y-1">
                {activityTimeline.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="border-l-4 border-primary pl-6 py-5 relative hover:bg-surface-container-low rounded-r-2xl transition-colors"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[13px] top-6 w-6 h-6 rounded-full bg-primary-container border-2 border-primary flex items-center justify-center">
                        <ItemIcon size={14} className="text-on-primary-container" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          <span className="font-bold">{item.action}</span>{" "}
                          <span className="text-primary font-bold">&ldquo;{item.target}&rdquo;</span>{" "}
                          in <span className="text-secondary font-bold">{item.category}</span>
                        </p>
                        <span className="text-label-md text-outline flex items-center gap-1.5 font-bold">
                          <Icons.Clock size={14} />
                          {item.timeAgo}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
