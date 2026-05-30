"use client";

import React, { useState } from "react";
import { Icons } from "./Icons";

export interface ThreadProps {
  id: string;
  category: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  replies: number;
  authorInitials: string;
  authorName: string;
}

const INITIAL_COMMENTS: Record<string, Array<{ authorName: string; authorInitials: string; timeAgo: string; text: string }>> = {
  "Maximizing Social Security Benefits in 2026": [
    { authorName: "Robert_K", authorInitials: "RK", timeAgo: "1 hour ago", text: "I called the local Social Security office yesterday. The wait times are a bit long, but they confirmed that filing at 70 gives a full 8% annual increase!" },
    { authorName: "Sarah_M", authorInitials: "SM", timeAgo: "30 mins ago", text: "John, do you know if these guidelines also apply if I'm receiving a partial pension from my state government?" }
  ],
  "Moving from a 4-bedroom house to a condo: My experience": [
    { authorName: "Dave_G", authorInitials: "DG", timeAgo: "4 hours ago", text: "Downsizing was the best decision my wife and I made. Getting rid of the lawnmower and snow blower felt like a vacation!" },
    { authorName: "Linda_J", authorInitials: "LJ", timeAgo: "2 hours ago", text: "The hardest part for me was sorting through old family photos. We ended up digitizing most of them to save physical space." }
  ],
  "Spring Planting Guide for Zone 6": [
    { authorName: "Clara_H", authorInitials: "CH", timeAgo: "18 hours ago", text: "I started my heirloom tomatoes under grow lights in my basement last week. They are already 3 inches tall! Let's hope there's no late frost." }
  ],
  "Accessible European River Cruises": [
    { authorName: "Henry_P", authorInitials: "HP", timeAgo: "1 day ago", text: "We did the Rhine River cruise with AmaWaterways last autumn. They have fully wheelchair-accessible cabins, level boarding ramps, and wonderful tours." }
  ]
};

export default function ThreadCard({
  id,
  category,
  timeAgo,
  title,
  excerpt,
  replies: initialRepliesCount,
  authorInitials,
  authorName,
}: ThreadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [repliesCount, setRepliesCount] = useState(initialRepliesCount);
  const [comments, setComments] = useState(INITIAL_COMMENTS[title] || []);
  const [newCommentText, setNewCommentText] = useState("");

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    // Create a new comment block
    const commentToAdd = {
      authorName: "You (Member)",
      authorInitials: "ME",
      timeAgo: "Just now",
      text: newCommentText.trim(),
    };

    setComments([...comments, commentToAdd]);
    setRepliesCount(prev => prev + 1);
    setNewCommentText("");
  };

  return (
    <article 
      onClick={handleCardClick}
      className={`bg-surface-container-lowest border-2 border-outline-variant hover:border-primary hover:scale-[1.012] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_24px_1px_rgba(255,255,255,0.12)] rounded-3xl p-6 transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[260px] md:min-h-[220px] outline-none focus-within:ring-4 focus-within:ring-primary/20 ${
        isExpanded ? "ring-4 ring-primary/10 border-primary" : ""
      } active:scale-[1.012] active:border-primary active:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:active:shadow-[0_0_24px_1px_rgba(255,255,255,0.12)]`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Main Details */}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1.5 bg-surface-container-high border border-outline-variant text-label-md font-bold text-on-surface-variant rounded-xl">
              {category}
            </span>
            <span className="text-body-md font-bold text-outline flex items-center gap-1.5" aria-label={`Posted ${timeAgo}`}>
              <Icons.Clock size={18} aria-hidden="true" />
              {timeAgo}
            </span>
          </div>

          <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-3 font-extrabold leading-snug">
            {title}
          </h4>
          <p className={`font-body-md text-body-md text-on-surface-variant leading-relaxed transition-all ${
            isExpanded ? "" : "line-clamp-2"
          }`}>
            {excerpt}
          </p>
        </div>

        {/* Replies Widget */}
        <div 
          className="flex flex-row md:flex-col items-center justify-center gap-2 bg-surface-container border border-outline-variant p-4 rounded-2xl min-w-[100px] w-full md:w-auto h-auto md:h-28 self-stretch md:self-auto transition-colors"
          aria-label={`${repliesCount} replies`}
        >
          <span className="font-display text-headline-md md:text-headline-lg text-primary font-extrabold">{repliesCount}</span>
          <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
            replies
          </span>
        </div>
      </div>

      {/* Expanded Comments Section */}
      {isExpanded && (
        <div 
          className="mt-6 pt-6 border-t-2 border-surface-variant space-y-6 w-full"
          onClick={(e) => e.stopPropagation()} // Prevent clicking within expanded body from toggling expansion
        >
          <div className="space-y-4">
            <h5 className="font-label-lg text-label-lg text-primary font-extrabold flex items-center gap-2">
              <Icons.Forum size={20} />
              Discussion Thread ({comments.length} comments)
            </h5>
            
            {comments.length === 0 ? (
              <p className="text-body-md text-outline italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {comments.map((comment, index) => (
                  <div key={index} className="p-4 bg-surface-container rounded-2xl border border-outline-variant flex gap-4 transition-all hover:bg-surface-container-high">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center text-body-sm font-extrabold flex-shrink-0">
                      {comment.authorInitials}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-body-md font-bold text-secondary text-sm">{comment.authorName}</span>
                        <span className="text-body-sm text-outline text-xs flex items-center gap-1">
                          <Icons.Clock size={14} />
                          {comment.timeAgo}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Reply Form */}
          <form onSubmit={handleReplySubmit} className="space-y-3 pt-2">
            <label htmlFor={`reply-input-${id}`} className="block font-label-md text-label-md text-on-surface-variant font-bold">
              Join the conversation
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id={`reply-input-${id}`}
                type="text"
                placeholder="Share your experience or ask a question..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/20 bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all placeholder:text-outline"
              />
              <button 
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed font-label-lg text-label-lg font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 min-h-[48px] transition-all cursor-pointer active:scale-95 flex-shrink-0"
              >
                <span>Reply</span>
                <Icons.PlusCircle size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer details */}
      <div className="mt-6 pt-4 border-t-2 border-surface-variant flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center text-body-md font-extrabold">
            {authorInitials}
          </div>
          <span className="font-body-md text-body-md font-bold text-secondary">{authorName}</span>
        </div>

        <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 group-hover:underline font-extrabold min-h-[48px]">
          {isExpanded ? "Collapse thread" : "Read thread"} 
          <Icons.ArrowRight size={18} className={`transition-transform ${
            isExpanded ? "rotate-90" : "group-hover:translate-x-1"
          }`} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
