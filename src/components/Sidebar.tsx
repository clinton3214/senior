import React from "react";
import { Icons } from "./Icons";

export default function Sidebar() {
  const trendingTopics = [
    {
      title: "Best knee-friendly exercises for home",
      category: "Health & Wellness",
      replies: 56,
      href: "#",
    },
    {
      title: "Has anyone tried the new Medicare portal?",
      category: "General Discussion",
      replies: 34,
      href: "#",
    },
    {
      title: "Grandchild's 1st birthday gift ideas (Not toys!)",
      category: "Family",
      replies: 89,
      href: "#",
    },
  ];

  return (
    <aside className="space-y-8 lg:sticky lg:top-28">
      {/* Trending Topics Widget */}
      <section className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-5 sm:p-6 shadow-sm">
        <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3 font-extrabold pb-3 border-b-2 border-surface-variant">
          <Icons.TrendingUp size={28} className="text-primary" aria-hidden="true" />
          Trending Discussions
        </h3>
        
        <ul className="divide-y-2 divide-surface-variant">
          {trendingTopics.map((topic, idx) => (
            <li key={idx} className="group py-4 first:pt-0 last:pb-0">
              <a href={topic.href} className="block space-y-2 cursor-pointer">
                <h4 className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors font-extrabold leading-snug group-hover:underline">
                  {topic.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-body-md font-bold text-secondary">
                  <span>{topic.category}</span>
                  <span className="text-outline">•</span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Forum size={18} className="text-outline" aria-hidden="true" />
                    {topic.replies} replies
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Forum Stats Widget */}
      <section className="bg-surface-container border-2 border-outline-variant rounded-3xl p-5 sm:p-6 shadow-sm">
        <h3 className="font-label-lg text-label-lg text-on-surface-variant mb-6 uppercase tracking-wider font-extrabold pb-3 border-b-2 border-surface-variant">
          Forum Statistics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xs">
            <span className="block font-display text-headline-lg lg:text-display text-primary font-extrabold">12k</span>
            <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wide">Members</span>
          </div>
          <div className="text-center p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xs">
            <span className="block font-display text-headline-lg lg:text-display text-primary font-extrabold">85k</span>
            <span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wide">Posts</span>
          </div>
        </div>
      </section>
    </aside>
  );
}
