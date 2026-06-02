"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

interface MediaItem {
  id: string;
  type: "video" | "audio" | "photo";
  title: string;
  durationOrPages: string;
  instructor: string;
  description: string;
  thumbnailColor: string; // Dynamic background for the media cards instead of complex images
}

export default function Media() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(30);

  const mediaLibrary: MediaItem[] = [
    {
      id: "media-1",
      type: "video",
      title: "How to FaceTime and Zoom with Your Grandkids",
      durationOrPages: "12 mins",
      instructor: "Alice Green",
      description: "A step-by-step visual guide on connecting your iPad or smartphone to FaceTime and Zoom. Learn how to accept incoming calls, mute/unmute, and use playful filters with children.",
      thumbnailColor: "from-blue-600 to-indigo-700",
    },
    {
      id: "media-2",
      type: "video",
      title: "Spotting and Avoiding Online Banking Scams",
      durationOrPages: "15 mins",
      instructor: "Officer Tech Safe",
      description: "Essential guide on how to protect your passwords, identify suspicious links, recognize fraudulent emails, and navigate secure portals safely.",
      thumbnailColor: "from-amber-600 to-orange-700",
    },
    {
      id: "audio",
      type: "audio",
      title: "The Senior Demo Gardener Podcast - Episode 24",
      durationOrPages: "45 mins",
      instructor: "GardenPete",
      description: "Listen to Pete talk about late spring seedling preparation, soil nourishment recipes, and quick tricks to discourage pests without heavy chemicals.",
      thumbnailColor: "from-emerald-600 to-teal-700",
    },
    {
      id: "media-4",
      type: "photo",
      title: "Senior Demo Photography Contest Gallery",
      durationOrPages: "18 Photos",
      instructor: "Community Submissions",
      description: "Browse the stunning photography submissions by our very own members, capturing morning sunrises, garden harvests, and family celebrations.",
      thumbnailColor: "from-purple-600 to-pink-700",
    }
  ];

  const handleOpenMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsPlaying(false);
    setPlaybackProgress(Math.floor(Math.random() * 60) + 10);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dynamic Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        
        {/* Title Section */}
        <section 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-6 border-b-2 border-surface-variant"
          aria-labelledby="media-heading"
        >
          <div>
            <h2 id="media-heading" className="font-display text-headline-lg md:text-display text-primary font-extrabold tracking-tight mb-2">
              Media Hub
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-bold leading-relaxed">
              Step-by-step video lessons, senior podcasts, and galleries crafted for crystal-clear learning.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Media Library Column */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaLibrary.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenMedia(item)}
                  className="bg-surface-container-lowest border-2 border-outline-variant hover:border-primary rounded-3xl p-5 shadow-sm transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-between hover:scale-[1.015] active:scale-[1.015] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] active:shadow-[0_8px_20px_rgba(0,0,0,0.06)] min-h-[340px]"
                >
                  <div className="space-y-4">
                    {/* Media Mock Image representation */}
                    <div className={`w-full h-40 bg-gradient-to-br ${item.thumbnailColor} rounded-2xl flex items-center justify-center border border-outline-variant shadow-inner relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                      <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
                        {item.type === "video" && <Icons.Play size={32} className="text-white fill-white ml-1" />}
                        {item.type === "audio" && <Icons.Forum size={30} className="text-white fill-white" />}
                        {item.type === "photo" && <Icons.Star size={30} className="text-white fill-white" />}
                      </div>
                      
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white font-bold text-body-sm px-2.5 py-1 rounded-lg text-xs tracking-wider">
                        {item.durationOrPages}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-surface-container-high border border-outline-variant text-label-md font-bold text-on-surface-variant rounded-xl capitalize">
                        {item.type}
                      </span>
                      <span className="text-body-md font-bold text-secondary text-sm">
                        By {item.instructor}
                      </span>
                    </div>

                    <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors font-extrabold leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-surface-variant flex justify-between items-center">
                    <span className="font-label-lg text-label-lg text-primary flex items-center gap-2 group-hover:underline font-extrabold">
                      {item.type === "video" && "Watch Lesson"}
                      {item.type === "audio" && "Listen Now"}
                      {item.type === "photo" && "View Gallery"}
                      <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Help Desk */}
            <section className="bg-surface-container border-2 border-outline-variant rounded-3xl p-6 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-4 font-extrabold pb-3 border-b-2 border-surface-variant flex items-center gap-2">
                <Icons.Sparkles size={24} />
                Learning Support
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6 font-bold">
                Having trouble viewing videos or launching zoom? Get free tech assistance from our student volunteers.
              </p>
              <button className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-bold py-4 px-6 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer">
                Contact Volunteer Desk
              </button>
            </section>

            <Sidebar />
          </div>

        </div>
      </main>

      {/* Realistic Interactive Media Player Modal Overlay */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="bg-surface border-4 border-outline-variant max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden relative flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b-2 border-surface-variant flex justify-between items-start gap-4">
              <div>
                <span className="px-3 py-1 bg-primary-container text-on-primary-container border border-outline text-label-md font-bold rounded-xl capitalize mb-2 inline-block">
                  {selectedMedia.type} Lesson
                </span>
                <h3 className="font-headline-lg text-headline-md sm:text-headline-lg text-primary font-extrabold leading-snug">
                  {selectedMedia.title}
                </h3>
                <p className="text-body-md text-secondary font-bold text-sm">Instructor: {selectedMedia.instructor}</p>
              </div>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="w-12 h-12 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Media Player"
              >
                <Icons.Close size={24} />
              </button>
            </div>

            {/* Modal Screen Player Representation */}
            <div className="bg-black relative aspect-video flex flex-col justify-end">
              
              {/* Playback Simulation Graphic */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedMedia.thumbnailColor} opacity-90 flex flex-col items-center justify-center text-white p-6 text-center`}>
                {isPlaying ? (
                  <div className="space-y-4">
                    <span className="inline-block animate-pulse w-3 h-3 rounded-full bg-red-600 mr-2" />
                    <span className="text-label-lg font-bold uppercase tracking-widest text-xs bg-black/40 px-3 py-1 rounded-full">
                      Playing Lesson
                    </span>
                    <p className="text-headline-md font-bold tracking-tight px-4">{selectedMedia.title}</p>
                    <div className="flex justify-center gap-1">
                      <div className="w-1.5 h-6 bg-white rounded-full animate-bounce" />
                      <div className="w-1.5 h-6 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-6 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handlePlayToggle}
                    className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/35 border-2 border-white/60 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <Icons.Play size={40} className="text-white fill-white ml-1.5" />
                  </button>
                )}
              </div>

              {/* Player Control HUD */}
              <div className="relative z-10 p-4 bg-black/60 backdrop-blur-sm border-t border-white/10 text-white space-y-3">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div 
                    className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = Math.round((clickX / rect.width) * 100);
                      setPlaybackProgress(percentage);
                    }}
                  >
                    <div className="h-full bg-primary-container rounded-full" style={{ width: `${playbackProgress}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-white/70 font-mono">
                    <span>
                      {selectedMedia.type === "photo" 
                        ? `${Math.floor((playbackProgress/100) * parseInt(selectedMedia.durationOrPages)) || 1} / ${selectedMedia.durationOrPages}`
                        : `0${Math.floor((playbackProgress/100) * 12)}:${Math.floor((playbackProgress % 10) * 6)}`
                      }
                    </span>
                    <span>{selectedMedia.durationOrPages}</span>
                  </div>
                </div>

                {/* Buttons HUD */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handlePlayToggle}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2.5 border border-white/20 cursor-pointer active:scale-95 transition-all"
                    >
                      {isPlaying ? (
                        <span className="font-extrabold text-sm px-2">Pause</span>
                      ) : (
                        <span className="font-extrabold text-sm px-2">Play</span>
                      )}
                    </button>
                    <span className="text-body-sm font-bold text-xs text-white/80">
                      Volume: 80%
                    </span>
                  </div>
                  
                  <span className="text-body-sm text-xs font-bold text-white/60">
                    High Quality CC
                  </span>
                </div>

              </div>

            </div>

            {/* Modal Body */}
            <div className="p-6 bg-surface-container">
              <h4 className="font-label-lg text-label-lg text-primary font-extrabold mb-2">Lesson Highlights</h4>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {selectedMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
