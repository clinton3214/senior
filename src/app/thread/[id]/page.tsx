"use client";

import React, { useState, useEffect } from "react";
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
    category: "Retirement Planning",
    timeAgo: "2 hours ago",
    title: "Maximizing Social Security Benefits in 2026",
    replies: 42,
    authorInitials: "JD",
    authorName: "JohnDoe77",
    fullText:
      "I've been reading through the new federal guidelines and wanted to share some strategies for those of us turning 65 this year. It seems there are a few overlooked claiming options that could make a real difference in monthly benefits.\n\nFirst, if you were born between 1960 and 1962, there's a new bridge benefit that covers the gap between early retirement and full eligibility. Second, spousal benefits have been restructured — if your partner earned significantly less, you may be able to claim up to 50% of their benefit on top of your own.\n\nI spoke with my local Social Security office last week and they confirmed these changes. Has anyone else looked into this? I'd love to hear your experiences.",
  },
  "retirement-2": {
    category: "Retirement Planning",
    timeAgo: "5 hours ago",
    title: "Moving from a 4-bedroom house to a condo: My experience",
    replies: 18,
    authorInitials: "MS",
    authorName: "Martha_S",
    fullText:
      "The process of decluttering 30 years of memories was daunting, but I finally made the move to a smaller space. Here is what I wish I knew before starting this transition.\n\nThe emotional weight of going through old photo albums, children's drawings, and holiday decorations was harder than I expected. My advice: take it one room at a time and give yourself permission to keep the things that truly matter.\n\nThe practical side was easier. I hired a senior move manager who specialized in downsizing. They helped with everything from floor plans to donation pickups. The condo itself is wonderful — one level, modern appliances, and a community garden downstairs.",
  },
  "hobby-1": {
    category: "Hobbies & Interests",
    timeAgo: "1 day ago",
    title: "Spring Planting Guide for Zone 6",
    replies: 12,
    authorInitials: "GP",
    authorName: "GardenPete",
    fullText:
      "Getting an early start on heirloom tomatoes this year. Is anyone else starting seeds indoors or preparing soil beds early? Let's swap tips.\n\nI've found that starting Brandywine and Cherokee Purple varieties under grow lights 8 weeks before the last frost gives them the best head start. The key is keeping soil temperature around 75°F — I use a simple seedling heat mat.\n\nFor soil preparation, I've been layering compost, aged manure, and crushed eggshells into my raised beds. The calcium from the eggshells really helps prevent blossom end rot later in the season.",
  },
  "hobby-2": {
    category: "Hobbies & Interests",
    timeAgo: "2 days ago",
    title: "Accessible European River Cruises",
    replies: 8,
    authorInitials: "TR",
    authorName: "TravelRoy",
    fullText:
      "Looking for recommendations for cruise lines that cater well to limited mobility. Planning an anniversary trip and want smooth excursions.\n\nMy wife uses a walker, and we've found that not all cruise lines are equally accommodating. We had a wonderful experience with AmaWaterways last year — they had level boarding, wide cabin doorways, and accessible bathrooms.\n\nWe're now looking at the Danube route for our 40th anniversary. Has anyone done the Budapest to Vienna stretch? I'm particularly interested in hearing about the shore excursion accessibility.",
  },
  "health-1": {
    category: "Health & Wellness",
    timeAgo: "3 hours ago",
    title: "Best Knee-Friendly Exercises for Home",
    replies: 32,
    authorInitials: "CH",
    authorName: "Clara_H",
    fullText:
      "Let's share home workouts that are gentle on joints but keep us active. I've found some excellent routines using chair yoga and resistance bands that have really helped with my flexibility and knee pain.\n\nSince retiring, I noticed my knees got stiffer if I sat too long. I bought a set of fabric resistance bands and a sturdy metal chair, and now do 15 minutes of seated leg extensions, heel slides, and wall sits every morning.\n\nIt doesn't strain the joints but strengthens the quadriceps which support the knees. What knee-friendly exercises have worked wonders for you?",
  },
  "tech-1": {
    category: "Technology & Support",
    timeAgo: "6 hours ago",
    title: "Getting Started with Voice-to-Text on Smartphones",
    replies: 14,
    authorInitials: "DG",
    authorName: "TechDave",
    fullText:
      "If your fingers or eyes get tired typing, voice-to-text is a total game changer. Let me share how to set it up easily on iPhone and Android, and some quick dictation tips.\n\nFirst, make sure dictation is enabled in your keyboard settings. On both iPhone and Android, look for the microphone icon on your keyboard—not the message input mic (which sends voice clips), but the one on the actual keyboard itself. Tap it once, speak clearly, and say your punctuation like 'comma' or 'period'.\n\nIt saves so much strain on arthritic hands! Let me know if you run into any setup issues, I'm happy to help troubleshoot.",
  },
  "travel-1": {
    category: "Travel & Adventure",
    timeAgo: "1 day ago",
    title: "Grand Canyon Railway vs. Driving: Advice needed",
    replies: 25,
    authorInitials: "TR",
    authorName: "TravelRoy",
    fullText:
      "We are planning a trip to Arizona in September and want to know if the historic train ride from Williams is worth it compared to driving. Looking for advice on accessibility.\n\nMy wife uses a walker, and we want to know if the train cars are easy to board and if there is ample storage space. Also, does the train crew help with boarding? We would love to hear from anyone who has taken this historic line recently.",
  },
  "cooking-1": {
    category: "Cooking & Recipes",
    timeAgo: "2 days ago",
    title: "The Secrets to Perfect Sugar-Free Baking",
    replies: 19,
    authorInitials: "MS",
    authorName: "BakerMartha",
    fullText:
      "Baking for diabetic family members is tricky. I've been experimenting with monk fruit, erythritol, and almond flour. Let's exchange recipes that actually taste good!\n\nI've found that monk fruit sweeteners blend much better into cake batters than stevia, which can leave a bitter aftertaste. Also, adding a tiny pinch of xanthan gum helps maintain structure in gluten-free, sugar-free pastries. What are your go-to baking substitutes?",
  },
  "arts-1": {
    category: "Creative Arts",
    timeAgo: "3 days ago",
    title: "Watercolors for Beginners: What supplies do I actually need?",
    replies: 11,
    authorInitials: "EV",
    authorName: "ArtisticVance",
    fullText:
      "Starting watercolor painting as a brand new hobby! Should I get student-grade pans or invest in professional grade blocks? What brushes would you recommend for older hands?\n\nI want to avoid cheap brush sets that shed hairs all over the paper. At the same time, I don't want to spend hundreds of dollars. What is a good middle ground for paper and pigments?",
  },
};

const COMMENTS: Record<
  string,
  Array<{ authorName: string; authorInitials: string; timeAgo: string; text: string }>
> = {
  "retirement-1": [
    { authorName: "Robert_K", authorInitials: "RK", timeAgo: "1 hour ago", text: "I called the local Social Security office yesterday. The wait times are a bit long, but they confirmed that filing at 70 gives a full 8% annual increase!" },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "30 mins ago", text: "John, do you know if these guidelines also apply if I'm receiving a partial pension from my state government?" },
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "20 mins ago", text: "This is incredibly helpful. I'm turning 66 next month and had no idea about the bridge benefit. Thank you for sharing!" },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "15 mins ago", text: "Remember that you can calculate your exact benefit amounts using the official SSA estimator tool online. It is surprisingly clean and simple." },
    { authorName: "Henry_P", authorInitials: "HP", timeAgo: "10 mins ago", text: "I claimed at 62 due to health concerns, and while the benefit is lower, it was definitely the right choice for me. Always evaluate your health!" },
    { authorName: "GardenPete", authorInitials: "GP", timeAgo: "5 mins ago", text: "John, thank you for writing this out. Navigating these federal sites is usually such a massive headache!" },
    { authorName: "TravelRoy", authorInitials: "TR", timeAgo: "Just now", text: "Excellent overview. I will share this with my younger brother who is starting to plan his retirement next year." },
  ],
  "retirement-2": [
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "4 hours ago", text: "Downsizing was the best decision my wife and I made. Getting rid of the lawnmower and snow blower felt like a vacation!" },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "2 hours ago", text: "The hardest part for me was sorting through old family photos. We ended up digitizing most of them to save physical space." },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "1 hour ago", text: "Martha, did you have to sell a lot of your furniture? Condo layouts can be so different from old houses." },
    { authorName: "Robert_K", authorInitials: "RK", timeAgo: "30 mins ago", text: "Seeding a new life in a condo is great. Not having to deal with building maintenance is a huge weight off my shoulders!" },
    { authorName: "GardenPete", authorInitials: "GP", timeAgo: "10 mins ago", text: "Martha, I love that your new condo has a community garden. That sounds absolutely perfect!" },
  ],
  "hobby-1": [
    { authorName: "Clara_H", authorInitials: "CH", timeAgo: "18 hours ago", text: "I started my heirloom tomatoes under grow lights in my basement last week. They are already 3 inches tall! Let's hope there's no late frost." },
    { authorName: "Martha_S", authorInitials: "MS", timeAgo: "12 hours ago", text: "Pete, have you tried adding fish emulsion to your watering schedule? It made a huge difference for my tomatoes last year." },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "6 hours ago", text: "I am trying Zone 6 tomatoes for the first time this year. This eggshell trick is exactly what I was looking for!" },
    { authorName: "TravelRoy", authorInitials: "TR", timeAgo: "2 hours ago", text: "Brilliant tips. I usually buy nursery starts, but starting seeds indoors sounds like a lovely winter-ender project." },
  ],
  "hobby-2": [
    { authorName: "Henry_P", authorInitials: "HP", timeAgo: "1 day ago", text: "We did the Rhine River cruise with AmaWaterways last autumn. They have fully wheelchair-accessible cabins, level boarding ramps, and wonderful tours." },
    { authorName: "GardenPete", authorInitials: "GP", timeAgo: "20 hours ago", text: "Roy, we did Budapest to Vienna in 2024. The shore excursions in Bratislava were very flat and walkable. Highly recommend it!" },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "10 hours ago", text: "Cruises are so great for limited mobility. We did an ocean cruise last year, but river cruises sound much more intimate and scenic." },
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "5 hours ago", text: "Thank you for the AmaWaterways recommendation. Accessibility is our number one priority when booking travel these days." },
  ],
  "health-1": [
    { authorName: "Martha_S", authorInitials: "MS", timeAgo: "2 hours ago", text: "Chair yoga has been a lifesaver for my back stiffness! I highly recommend it to anyone who feels a bit creaky in the morning." },
    { authorName: "GardenPete", authorInitials: "GP", timeAgo: "2 hours ago", text: "I do 10 minutes of gentle stretching before going out to work in the garden. It saves me so much soreness later!" },
    { authorName: "Robert_K", authorInitials: "RK", timeAgo: "1 hour ago", text: "Clara, could you share the resistance band routine you use? My physical therapist recommended bands but I'm not sure where to start." },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "45 mins ago", text: "Wall sits are surprisingly tough but they really do work. Seeding strength in the legs makes standing up from low chairs so much easier." },
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "20 mins ago", text: "Great advice. Keeping moving is the secret to aging well. Seated leg extensions are perfect to do while watching the news!" },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "5 mins ago", text: "I started using bands last month and my knee pain has decreased significantly. Consistency is definitely the key." },
  ],
  "tech-1": [
    { authorName: "JohnDoe77", authorInitials: "JD", timeAgo: "5 hours ago", text: "Dave, this is a lifesaver! I have mild arthritis in my knuckles and typing long replies was getting painful. Using voice-to-text now!" },
    { authorName: "Clara_H", authorInitials: "CH", timeAgo: "4 hours ago", text: "Does anyone know if voice-to-text works well if you have a slight accent? I worry it will misinterpret half of my sentences." },
    { authorName: "TechDave", authorInitials: "DG", timeAgo: "3 hours ago", text: "Clara, modern smartphones are incredibly smart. They adapt to your speech patterns over a few days. Definitely give it a try!" },
    { authorName: "Martha_S", authorInitials: "MS", timeAgo: "2 hours ago", text: "My granddaughter showed me how to use the microphone button yesterday. It's like magic! I dictated a whole email in two minutes." },
    { authorName: "Henry_P", authorInitials: "HP", timeAgo: "1 hour ago", text: "Great tips on saying punctuation. I kept sending messages without periods until I read your post!" },
  ],
  "travel-1": [
    { authorName: "GardenPete", authorInitials: "GP", timeAgo: "20 hours ago", text: "Roy, the Grand Canyon Railway is fantastic! The crew is extremely helpful, and they have ramp boarding for walker and wheelchair users." },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "18 hours ago", text: "Driving can be stressful with the tourist traffic around the Canyon. The train is much more relaxing and has beautiful scenery." },
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "15 hours ago", text: "We took the train last spring. They have different classes of service—the dome cars are gorgeous, but the standard Pullman cars are very accessible too." },
    { authorName: "Clara_H", authorInitials: "CH", timeAgo: "10 hours ago", text: "Is there a lot of walking once you arrive at the Grand Canyon Depot? My husband can walk short distances but needs rests." },
    { authorName: "TravelRoy", authorInitials: "TR", timeAgo: "8 hours ago", text: "Pete and Sarah, thank you! This is exactly the reassurance we needed. We will look into booking the morning train." },
  ],
  "cooking-1": [
    { authorName: "Eleanor Vance", authorInitials: "EV", timeAgo: "1 day ago", text: "Martha, I would love your sugar-free chocolate chip cookie recipe! My husband was recently diagnosed as pre-diabetic." },
    { authorName: "BakerMartha", authorInitials: "MS", timeAgo: "20 hours ago", text: "Eleanor, I will post the recipe in the Cooking board tonight! The secret is using almond flour for a lower carb impact." },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "15 hours ago", text: "Almond flour is excellent, but it absorbs moisture differently. I usually add an extra egg yolk to keep the cakes moist." },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "10 hours ago", text: "Have you tried allulose? It caramelizes much more like real sugar than monk fruit or stevia. Perfect for sugar-free flans!" },
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "4 hours ago", text: "This is a great thread. Diabetic-friendly desserts that actually taste like the real thing are hard to find." },
  ],
  "arts-1": [
    { authorName: "Eleanor Vance", authorInitials: "EV", timeAgo: "2 days ago", text: "Welcome to the watercolor club! I recommend starting with a student-grade set like Cotman. It is very affordable but has excellent pigments." },
    { authorName: "Martha_S", authorInitials: "MS", timeAgo: "1 day ago", text: "For paper, always buy 140lb (300gsm) cold press. Anything thinner will warp and buckle as soon as it gets wet!" },
    { authorName: "Clara_H", authorInitials: "CH", timeAgo: "20 hours ago", text: "I bought a cheap brush set from a local craft store and regretted it instantly. The hairs kept sticking to my beautiful blue sky!" },
    { authorName: "ArtisticVance", authorInitials: "EV", timeAgo: "15 hours ago", text: "Martha and Clara, thank you! Seeding a good start is so important. I will order some 140lb paper and a couple of round brushes." },
  ],
};

export default function ThreadDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [thread, setThread] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newReplyText, setNewReplyText] = useState("");
  const [replyCount, setReplyCount] = useState(0);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Resolve current thread data
    let foundThread = null;
    const savedThreadsStr = localStorage.getItem("threads");
    if (savedThreadsStr) {
      try {
        const savedThreads = JSON.parse(savedThreadsStr);
        foundThread = savedThreads.find((t: any) => t.id === id);
      } catch (e) {}
    }

    if (!foundThread) {
      foundThread = THREADS[id];
    }

    if (foundThread) {
      const actualThreadDetail = THREADS[id] || foundThread;
      const completeThread = {
        ...foundThread,
        fullText: foundThread.fullText || actualThreadDetail.fullText || foundThread.excerpt,
      };
      setThread(completeThread);
      setReplyCount(completeThread.replies ?? 0);

      // Seed likes
      const seedLikes = id === "retirement-1" 
        ? 24 
        : id === "retirement-2" 
          ? 12 
          : id === "hobby-1" 
            ? 8 
            : id === "health-1"
              ? 32
              : id === "tech-1"
                ? 14
                : id === "travel-1"
                  ? 25
                  : id === "cooking-1"
                    ? 19
                    : id === "arts-1"
                      ? 11
                      : 5;

      const savedLikeState = localStorage.getItem("liked_" + id);
      const savedLikeCount = localStorage.getItem("likes_count_" + id);
      if (savedLikeState) {
        setIsLiked(savedLikeState === "true");
      }
      if (savedLikeCount) {
        setLikeCount(parseInt(savedLikeCount));
      } else {
        setLikeCount(seedLikes);
      }
    }

    // 2. Resolve comments
    const savedComments = localStorage.getItem("comments_" + id);
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        setComments(COMMENTS[id] || []);
      }
    } else {
      const defaultComms = COMMENTS[id] || [];
      setComments(defaultComms);
      localStorage.setItem("comments_" + id, JSON.stringify(defaultComms));
    }

    setIsLoaded(true);
  }, [id]);

  const handleLike = () => {
    const nextLiked = !isLiked;
    const nextCount = nextLiked ? likeCount + 1 : likeCount - 1;
    setIsLiked(nextLiked);
    setLikeCount(nextCount);
    localStorage.setItem("liked_" + id, String(nextLiked));
    localStorage.setItem("likes_count_" + id, String(nextCount));

    // Update in global threads list as well to match card count on main page
    const savedThreadsStr = localStorage.getItem("threads");
    if (savedThreadsStr) {
      try {
        const savedThreads = JSON.parse(savedThreadsStr);
        const idx = savedThreads.findIndex((t: any) => t.id === id);
        if (idx > -1) {
          // If the thread is saved, keep it matching
          localStorage.setItem("threads", JSON.stringify(savedThreads));
        }
      } catch (e) {}
    }

    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    const newComment = {
      authorName: "You (Member)",
      authorInitials: "ME",
      timeAgo: "Just now",
      text: newReplyText.trim(),
    };

    const nextComments = [newComment, ...comments];
    setComments(nextComments);
    localStorage.setItem("comments_" + id, JSON.stringify(nextComments));

    const nextReplies = replyCount + 1;
    setReplyCount(nextReplies);

    // Save back to master threads in localStorage
    const savedThreadsStr = localStorage.getItem("threads");
    if (savedThreadsStr) {
      try {
        const savedThreads = JSON.parse(savedThreadsStr);
        const idx = savedThreads.findIndex((t: any) => t.id === id);
        if (idx > -1) {
          savedThreads[idx].replies = nextReplies;
          localStorage.setItem("threads", JSON.stringify(savedThreads));
        }
      } catch (e) {}
    }

    setNewReplyText("");
    setVisibleCommentsCount((prev) => Math.max(prev + 1, 4));
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10 flex items-center justify-center">
          <p className="font-body-lg text-outline">Loading discussion...</p>
        </main>
        <Footer />
      </div>
    );
  }

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
        <section className="bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 space-y-6">
          <h2 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2 pb-4 border-b-2 border-surface-variant">
            <Icons.Forum size={24} />
            Discussion ({comments.length} comments)
          </h2>

          {/* Quick Reply Form */}
          <form onSubmit={handleReplySubmit} className="space-y-4 pb-6 border-b-2 border-surface-variant">
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

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-body-md text-outline italic py-6 text-center">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.slice(0, visibleCommentsCount).map((comment, index) => (
                <div
                  key={index}
                  className="p-5 bg-surface-container rounded-2xl border border-outline-variant flex gap-4 transition-all hover:bg-surface-container-high animate-scaleUp"
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

          {/* Show More / Show Less Toggle Buttons */}
          {comments.length > 3 && (
            <div className="mt-8 pt-2 flex justify-center">
              {visibleCommentsCount < comments.length ? (
                <button
                  onClick={() => setVisibleCommentsCount(comments.length)}
                  className="min-h-[48px] px-6 bg-surface hover:bg-surface-container text-primary border-2 border-primary rounded-2xl font-bold flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Show More Comments ({comments.length - visibleCommentsCount} hidden) 👇
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCommentsCount(3)}
                  className="min-h-[48px] px-6 bg-surface hover:bg-surface-container text-secondary border-2 border-outline-variant rounded-2xl font-bold flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Show Less Comments 👆
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
