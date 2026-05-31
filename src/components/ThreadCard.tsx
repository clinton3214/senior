import React from "react";
import Link from "next/link";
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

export default function ThreadCard({
  id,
  category,
  timeAgo,
  title,
  excerpt,
  replies,
  authorInitials,
  authorName,
}: ThreadProps) {
  return (
    <Link href={`/thread/${id}`} className="block outline-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-3xl">
      <article className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary hover:scale-[1.012] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_24px_1px_rgba(255,255,255,0.12)] rounded-3xl p-6 transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between min-h-[260px] md:min-h-[220px] active:scale-[1.012] active:border-primary active:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:active:shadow-[0_0_24px_1px_rgba(255,255,255,0.12)]">
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
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          </div>

          {/* Replies Widget */}
          <div
            className="flex flex-row md:flex-col items-center justify-center gap-2 bg-surface-container border border-outline-variant p-4 rounded-2xl min-w-[100px] w-full md:w-auto h-auto md:h-28 self-stretch md:self-auto transition-colors"
            aria-label={`${replies} replies`}
          >
            <span className="font-display text-headline-md md:text-headline-lg text-primary font-extrabold">{replies}</span>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
              replies
            </span>
          </div>
        </div>

        {/* Footer details */}
        <div className="mt-6 pt-4 border-t-2 border-surface-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center text-body-md font-extrabold">
              {authorInitials}
            </div>
            <span className="font-body-md text-body-md font-bold text-secondary">{authorName}</span>
          </div>

          <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 group-hover:underline font-extrabold min-h-[48px]">
            Read thread
            <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}
