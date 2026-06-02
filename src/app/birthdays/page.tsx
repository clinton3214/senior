"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import WelcomeWidget from "@/components/WelcomeWidget";
import { Icons } from "@/components/Icons";

interface BirthdayGreeting {
  to: string;
  from: string;
  message: string;
  time: string;
}

export default function BirthdaysPage() {
  const [selectedMember, setSelectedMember] = useState("Martha_S");
  const [customMessage, setCustomMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [greetings, setGreetings] = useState<BirthdayGreeting[]>([
    {
      to: "Martha_S",
      from: "JohnDoe77",
      message: "Happy 72nd birthday Martha! Hope you have a wonderful day in the community garden. 🌻🎂",
      time: "2 hours ago",
    },
    {
      to: "GardenPete",
      from: "TravelRoy",
      message: "Happy birthday Pete! Thanks for all the zone 6 gardening tips, hope to catch up soon! 🎈🎉",
      time: "4 hours ago",
    },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-hide confetti after 4 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleSubmitGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    const fromName = senderName.trim() || "Anonymous Member";
    const newGreeting: BirthdayGreeting = {
      to: selectedMember,
      from: fromName,
      message: customMessage.trim(),
      time: "Just now",
    };

    setGreetings([newGreeting, ...greetings]);
    setCustomMessage("");
    setSenderName("");
    setShowConfetti(true);

    // Vibrate mobile on submit
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100, 30, 100]);
    }
  };

  const celebratingToday = [
    { name: "Martha_S", initials: "MS", age: 72, bg: "bg-primary-container", text: "text-on-primary-container", bio: "Member since 2021. Love gardening & baking sugar-free treats.", emoji: "🎂" },
    { name: "GardenPete", initials: "GP", age: 68, bg: "bg-secondary-container", text: "text-on-secondary-container", bio: "Zone 6 tomato growing champion. Loves community workshops.", emoji: "🎈" },
    { name: "JohnDoe77", initials: "JD", age: 66, bg: "bg-surface-container-high", text: "text-primary", bio: "Bridge card game host. Retired high school history teacher.", emoji: "🎉" },
  ];

  const upcomingBirthdays = [
    { name: "TravelRoy", initials: "TR", date: "June 4 (In 3 days)", age: 71, emoji: "✈️" },
    { name: "Clara_H", initials: "CH", date: "June 9 (In 8 days)", age: 69, emoji: "🎨" },
    { name: "Eleanor Vance", initials: "EV", date: "June 18 (In 17 days)", age: 75, emoji: "🌸" },
    { name: "Dave_G", initials: "DG", date: "June 25 (In 24 days)", age: 67, emoji: "🪵" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
      {/* Dynamic Confetti Simulation Banner overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-center bg-surface/90 backdrop-blur-md border-4 border-primary rounded-3xl p-8 shadow-2xl max-w-sm mx-4 animate-scaleUp">
            <span className="text-6xl block mb-4 animate-bounce">🎉 🥳 🎈</span>
            <h3 className="font-display text-headline-md text-primary font-extrabold mb-2">
              Greeting Sent!
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Your warm birthday message has been posted live. Thank you for celebrating!
            </p>
          </div>
          {/* Confetti particles mock */}
          <div className="absolute top-10 left-1/4 animate-bounce text-4xl opacity-75">🎈</div>
          <div className="absolute top-20 right-1/4 animate-bounce text-4xl delay-200 opacity-75">🎉</div>
          <div className="absolute bottom-20 left-1/3 animate-bounce text-4xl delay-500 opacity-75">🧁</div>
          <div className="absolute bottom-40 right-1/3 animate-bounce text-4xl delay-300 opacity-75">🌸</div>
        </div>
      )}

      <Header />

      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        
        {/* Banner Section */}
        <section className="mb-10 pb-6 border-b-2 border-surface-variant">
          <h1 className="font-display text-headline-lg md:text-display text-primary font-extrabold tracking-tight mb-2">
            🎂 Today&apos;s Birthdays
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-bold leading-relaxed">
            Let&apos;s celebrate our community members today! Write a message, send a card, and make their day special.
          </p>
        </section>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Celebrating Today Cards Grid */}
            <section className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2">
                <span className="text-2xl">🥳</span>
                Celebrating Today
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {celebratingToday.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-5 flex flex-col justify-between items-center text-center shadow-xs transition-all hover:scale-[1.02] hover:border-primary group"
                  >
                    <div className="flex flex-col items-center">
                      {/* Avatar */}
                      <div className={`w-16 h-16 rounded-full ${member.bg} ${member.text} border border-outline flex items-center justify-center text-headline-md font-extrabold mb-3.5 relative`}>
                        {member.initials}
                        <span className="absolute -bottom-1 -right-1 text-xl">{member.emoji}</span>
                      </div>
                      <h3 className="font-body-lg text-body-lg font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <span className="text-label-md text-secondary font-bold uppercase tracking-wider block mt-1">
                        {member.age} years old
                      </span>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedMember(member.name);
                        const form = document.getElementById("greeting-form-anchor");
                        if (form) form.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-5 w-full min-h-[48px] bg-surface hover:bg-primary-container text-primary hover:text-on-primary-container border-2 border-primary rounded-xl font-bold transition-all text-body-md cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      Write Greeting
                      <Icons.ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Greeting Form (Send Cards) */}
            <div id="greeting-form-anchor" className="scroll-mt-28" />
            <section className="bg-surface border-2 border-outline-variant rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2 pb-3 border-b-2 border-surface-variant">
                <span className="text-2xl">✍️</span>
                Send a Birthday Message
              </h2>

              <form onSubmit={handleSubmitGreeting} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select Member dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="greet-member" className="block font-label-lg text-label-lg text-on-surface-variant font-bold">
                      Choose Celebrating Member
                    </label>
                    <select
                      id="greet-member"
                      value={selectedMember}
                      onChange={(e) => setSelectedMember(e.target.value)}
                      className="w-full h-[56px] px-4 border-2 border-outline-variant bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/20 cursor-pointer"
                    >
                      {celebratingToday.map((member) => (
                        <option key={member.name} value={member.name}>
                          {member.name} ({member.age} today)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sender Name */}
                  <div className="space-y-2">
                    <label htmlFor="sender-name" className="block font-label-lg text-label-lg text-on-surface-variant font-bold">
                      Your Name / Nickname
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      placeholder="e.g. Your Initials, or keep anonymous"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full h-[56px] px-4 border-2 border-outline-variant bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Templates Quick Select */}
                <div className="space-y-2.5">
                  <span className="block font-label-lg text-label-lg text-on-surface-variant font-bold">
                    Quick Templates (Click to fill)
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "Wishing you a wonderful year of good health and happiness! 🎂",
                      "Hope your special day is filled with joy, family, and good tea! 🌸☕",
                      "Happy Birthday! Thank you for being such a wonderful part of Senior Demo! 🥳🎉",
                    ].map((template, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCustomMessage(template)}
                        className="text-left text-body-md bg-surface-container hover:bg-surface-container-high border border-outline-variant px-4 py-2.5 rounded-xl transition-all font-bold text-secondary cursor-pointer active:scale-98"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="greeting-msg" className="block font-label-lg text-label-lg text-on-surface-variant font-bold">
                    Write Birthday Message
                  </label>
                  <textarea
                    id="greeting-msg"
                    rows={4}
                    placeholder="Write your celebratory wishes here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full p-4 border-2 border-outline-variant bg-surface-container-lowest text-on-surface rounded-2xl outline-none font-body-md text-body-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/20"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!customMessage.trim()}
                  className="min-h-[56px] w-full md:w-auto px-8 bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer active:scale-95"
                >
                  Send Greeting Card 💌
                </button>
              </form>
            </section>

            {/* Greeting Cards Live Feed */}
            <section className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2">
                <span className="text-2xl">💬</span>
                Live Birthday Wishes ({greetings.length})
              </h2>

              <div className="space-y-4">
                {greetings.map((greet, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-surface-container-low border border-outline-variant rounded-2xl flex gap-4 transition-all hover:bg-surface-container animate-scaleUp"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container border border-outline flex items-center justify-center font-extrabold text-body-md flex-shrink-0">
                      {greet.from.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="font-body-md text-body-md text-on-surface">
                          <span className="font-bold">{greet.from}</span> sent a card to <span className="text-primary font-extrabold">@{greet.to}</span>
                        </p>
                        <span className="text-label-md text-outline flex items-center gap-1 font-bold">
                          <Icons.Clock size={14} />
                          {greet.time}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {greet.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column / Upcoming & Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Upcoming Birthdays widget */}
            <section className="bg-surface-container border-2 border-outline-variant rounded-3xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3 font-extrabold pb-3 border-b-2 border-surface-variant">
                <Icons.Clock size={28} className="text-primary" aria-hidden="true" />
                Upcoming in June
              </h3>

              <div className="space-y-3.5">
                {upcomingBirthdays.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 p-3 bg-surface-container-lowest border border-outline-variant rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container border border-outline flex items-center justify-center font-extrabold text-body-md">
                      {item.initials}
                    </div>
                    <div>
                      <span className="font-body-md font-bold text-on-surface block leading-tight">
                        {item.name} ({item.age} years)
                      </span>
                      <span className="text-label-md text-secondary font-bold">{item.date} {item.emoji}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <WelcomeWidget />
            <Sidebar />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
