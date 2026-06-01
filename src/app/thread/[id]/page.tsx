"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Icons } from "@/components/Icons";

const THREADS: Record<
  string,
  {
    category: string;
    timeAgo: string;
    title: string;
    replies: number;
    authorInitials: string;
    authorName: string;
    fullText: string;
  }
> = {
  "retirement-1": {
    category: "Finance",
    timeAgo: "2 hours ago",
    title: "Maximizing Social Security Benefits in 2026",
    replies: 42,
    authorInitials: "JD",
    authorName: "JohnDoe77",
    fullText:
      "I've been reading through the new federal guidelines and wanted to share some strategies for those of us turning 65 this year. It seems there are a few overlooked claiming options that could make a real difference in monthly benefits.\n\nFirst, if you were born between 1960 and 1962, there's a new bridge benefit that covers the gap between early retirement and full eligibility. Second, spousal benefits have been restructured — if your partner earned significantly less, you may be able to claim up to 50% of their benefit on top of your own.\n\nI spoke with my local Social Security office last week and they confirmed these changes. Has anyone else looked into this? I'd love to hear your experiences.",
  },
  "retirement-2": {
    category: "Downsizing",
    timeAgo: "5 hours ago",
    title: "Moving from a 4-bedroom house to a condo: My experience",
    replies: 18,
    authorInitials: "MS",
    authorName: "Martha_S",
    fullText:
      "The process of decluttering 30 years of memories was daunting, but I finally made the move to a smaller space. Here is what I wish I knew before starting this transition.\n\nThe emotional weight of going through old photo albums, children's drawings, and holiday decorations was harder than I expected. My advice: take it one room at a time and give yourself permission to keep the things that truly matter.\n\nThe practical side was easier. I hired a senior move manager who specialized in downsizing. They helped with everything from floor plans to donation pickups. The condo itself is wonderful — one level, modern appliances, and a community garden downstairs.",
  },
  "hobby-1": {
    category: "Gardening",
    timeAgo: "1 day ago",
    title: "Spring Planting Guide for Zone 6",
    replies: 12,
    authorInitials: "GP",
    authorName: "GardenPete",
    fullText:
      "Getting an early start on heirloom tomatoes this year. Is anyone else starting seeds indoors or preparing soil beds early? Let's swap tips.\n\nI've found that starting Brandywine and Cherokee Purple varieties under grow lights 8 weeks before the last frost gives them the best head start. The key is keeping soil temperature around 75°F — I use a simple seedling heat mat.\n\nFor soil preparation, I've been layering compost, aged manure, and crushed eggshells into my raised beds. The calcium from the eggshells really helps prevent blossom end rot later in the season.",
  },
  "hobby-2": {
    category: "Travel",
    timeAgo: "2 days ago",
    title: "Accessible European River Cruises",
    replies: 8,
    authorInitials: "TR",
    authorName: "TravelRoy",
    fullText:
      "Looking for recommendations for cruise lines that cater well to limited mobility. Planning an anniversary trip and want smooth excursions.\n\nMy wife uses a walker, and we've found that not all cruise lines are equally accommodating. We had a wonderful experience with AmaWaterways last year — they had level boarding, wide cabin doorways, and accessible bathrooms.\n\nWe're now looking at the Danube route for our 40th anniversary. Has anyone done the Budapest to Vienna stretch? I'm particularly interested in hearing about the shore excursion accessibility.",
  },
};

const COMMENTS: Record<
  string,
  Array<{ authorName: string; authorInitials: string; timeAgo: string; text: string }>
> = {
  "retirement-1": [
    {
      authorName: "Robert_K",
      authorInitials: "RK",
      timeAgo: "1 hour ago",
      text: "I called the local Social Security office yesterday. The wait times are a bit long, but they confirmed that filing at 70 gives a full 8% annual increase!",
    },
    {
      authorName: "Sarah_M",
      authorInitials: "SM",
      timeAgo: "30 mins ago",
      text: "John, do you know if these guidelines also apply if I'm receiving a partial pension from my state government?",
    },
    {
      authorName: "Dave_G",
      authorInitials: "DG",
      timeAgo: "20 mins ago",
      text: "This is incredibly helpful. I'm turning 66 next month and had no idea about the bridge benefit. Thank you for sharing!",
    },
  ],
  "retirement-2": [
    {
      authorName: "Dave_G",
      authorInitials: "DG",
      timeAgo: "4 hours ago",
      text: "Downsizing was the best decision my wife and I made. Getting rid of the lawnmower and snow blower felt like a vacation!",
    },
    {
      authorName: "Linda_J",
      authorInitials: "LJ",
      timeAgo: "2 hours ago",
      text: "The hardest part for me was sorting through old family photos. We ended up digitizing most of them to save physical space.",
    },
  ],
  "hobby-1": [
    {
      authorName: "Clara_H",
      authorInitials: "CH",
      timeAgo: "18 hours ago",
      text: "I started my heirloom tomatoes under grow lights in my basement last week. They are already 3 inches tall! Let's hope there's no late frost.",
    },
    {
      authorName: "Martha_S",
      authorInitials: "MS",
      timeAgo: "12 hours ago",
      text: "Pete, have you tried adding fish emulsion to your watering schedule? It made a huge difference for my tomatoes last year.",
    },
  ],
  "hobby-2": [
    {
      authorName: "Henry_P",
      authorInitials: "HP",
      timeAgo: "1 day ago",
      text: "We did the Rhine River cruise with AmaWaterways last autumn. They have fully wheelchair-accessible cabins, level boarding ramps, and wonderful tours.",
    },
    {
      authorName: "GardenPete",
      authorInitials: "GP",
      timeAgo: "20 hours ago",
      text: "Roy, we did Budapest to Vienna in 2024. The shore excursions in Bratislava were very flat and walkable. Highly recommend it!",
    },
  ],
};

export default function ThreadDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const thread = THREADS[id];
  const initialComments = COMMENTS[id] || [];

  const [comments, setComments] = useState(initialComments);
  const [newReplyText, setNewReplyText] = useState("");
  const [replyCount, setReplyCount] = useState(thread?.replies ?? 0);

  // Mock seeding of initial likes to look realistic
  const seedLikes = id === "retirement-1" 
    ? 24 
    : id === "retirement-2" 
      ? 12 
      : id === "hobby-1" 
        ? 8 
        : 5;

  const [likeCount, setLikeCount] = useState(seedLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      
      // Play mobile vibration if supported
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    setComments([
      ...comments,
      {
        authorName: "You (Member)",
        authorInitials: "ME",
        timeAgo: "Just now",
        text: newReplyText.trim(),
      },
    ]);
    setReplyCount((prev) => prev + 1);
    setNewReplyText("");
  };

  // Thread not found
  if (!thread) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6 text-outline border border-outline-variant">
            <Icons.Search size={48} />
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold mb-3">
            Thread Not Found
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed mb-8">
            We couldn&apos;t find the discussion you&apos;re looking for. It may have been moved or removed.
          </p>
          <Link
            href="/"
            className="min-h-[56px] px-8 bg-primary text-on-primary rounded-2xl font-label-lg text-label-lg font-bold flex items-center gap-2 hover:bg-primary-container transition-colors cursor-pointer active:scale-95"
          >
            <Icons.ArrowLeft size={20} />
            Back to Forums
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-surface-container-low border-2 border-outline-variant hover:border-primary text-primary font-label-lg font-bold rounded-2xl transition-all mb-8 cursor-pointer active:scale-95 hover:bg-surface-container"
        >
          <Icons.ArrowLeft size={20} />
          Back to Forums
        </Link>

        {/* Main Thread Card — Full View */}
        <article className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 md:p-8 shadow-sm mb-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1.5 bg-surface-container-high border border-outline-variant text-label-md font-bold text-on-surface-variant rounded-xl">
              {thread.category}
            </span>
            <span className="text-body-md font-bold text-outline flex items-center gap-1.5">
              <Icons.Clock size={18} aria-hidden="true" />
              {thread.timeAgo}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-headline-lg text-headline-lg md:text-display text-on-surface font-extrabold tracking-tight mb-6 leading-tight">
            {thread.title}
          </h1>

          {/* Full Body Text */}
          <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line mb-8 max-w-3xl">
            {thread.fullText}
          </div>

          {/* Author footer */}
          <div className="pt-6 border-t-2 border-surface-variant flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center text-body-md font-extrabold flex-shrink-0">
                {thread.authorInitials}
              </div>
              <div>
                <span className="font-body-md font-bold text-on-surface block">{thread.authorName}</span>
                <span className="text-label-md text-secondary font-bold">Thread Author</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                aria-label={isLiked ? "Unlike thread" : "Like thread"}
                className={`min-h-[48px] px-4.5 rounded-2xl border-2 flex items-center gap-2 font-bold transition-all active:scale-95 cursor-pointer text-body-md ${
                  isLiked
                    ? "bg-primary-container text-on-primary-container border-primary font-extrabold"
                    : "bg-surface hover:bg-surface-container-low text-secondary border-outline-variant hover:border-outline"
                }`}
              >
                <Icons.Heart size={18} className={isLiked ? "fill text-primary" : ""} />
                <span>{likeCount}</span>
              </button>

              {/* Replies Widget */}
              <div className="flex items-center gap-2 bg-surface-container border border-outline-variant px-4 py-2.5 rounded-2xl h-12">
                <Icons.Forum size={20} className="text-primary" />
                <span className="font-headline-md text-headline-md text-primary font-extrabold">{replyCount}</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
                  replies
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Discussion Thread Section */}
        <section className="bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2 mb-6 pb-4 border-b-2 border-surface-variant">
            <Icons.Forum size={24} />
            Discussion ({comments.length} comments)
          </h2>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-body-md text-outline italic py-6 text-center">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-4 mb-8">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-5 bg-surface-container rounded-2xl border border-outline-variant flex gap-4 transition-all hover:bg-surface-container-high"
                >
                  <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center text-body-sm font-extrabold flex-shrink-0">
                    {comment.authorInitials}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-body-md font-bold text-on-surface">{comment.authorName}</span>
                      <span className="text-label-md text-outline flex items-center gap-1 font-bold">
                        <Icons.Clock size={14} />
                        {comment.timeAgo}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="space-y-4 pt-6 border-t-2 border-surface-variant">
            <label
              htmlFor="thread-reply-input"
              className="block font-label-lg text-label-lg text-on-surface-variant font-bold"
            >
              Join the conversation
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="thread-reply-input"
                type="text"
                placeholder="Share your experience or ask a question..."
                value={newReplyText}
                onChange={(e) => setNewReplyText(e.target.value)}
                className="flex-1 px-4 py-3.5 border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all placeholder:text-outline"
              />
              <button
                type="submit"
                disabled={!newReplyText.trim()}
                className="bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed font-label-lg text-label-lg font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 min-h-[48px] transition-all cursor-pointer active:scale-95 flex-shrink-0"
              >
                Post Reply
                <Icons.ArrowRight size={18} />
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
