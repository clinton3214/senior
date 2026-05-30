"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");
  
  // Registration Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState("65-74");
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const interestOptions = ["Gardening", "Finance & Social Security", "Hobbies & Travel", "Health & Wellness", "Technology Help"];

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setShowSuccessModal(true);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setAgeGroup("65-74");
    setInterests([]);
    setErrors({});
    setShowSuccessModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dynamic Header */}
      <Header />

      {/* Main Content container */}
      <main className="flex-1 w-full max-w-max-width mx-auto px-4 py-8 md:px-6 md:py-10">
        
        {/* Title Block */}
        <section 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-6 border-b-2 border-surface-variant"
          aria-labelledby="membership-heading"
        >
          <div>
            <h2 id="membership-heading" className="font-display text-headline-lg md:text-display text-primary font-extrabold tracking-tight mb-2">
              Membership Portal
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-bold leading-relaxed">
              Explore custom tiers built to elevate your social learning and online security.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form and Plans Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Plans Selection */}
            <section className="space-y-6">
              <h3 className="font-headline-md text-headline-md text-primary font-extrabold flex items-center gap-2">
                <Icons.Star size={26} className="text-primary" />
                Select Your Plan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Plan 1: Free */}
                <div 
                  onClick={() => setSelectedPlan("free")}
                  className={`p-6 border-4 rounded-3xl shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[300px] hover:scale-[1.015] active:scale-[1.015] ${
                    selectedPlan === "free" 
                      ? "bg-surface border-primary ring-4 ring-primary/10" 
                      : "bg-surface-container-lowest border-outline-variant hover:border-primary"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-headline-md text-headline-md font-extrabold text-secondary">Free Circle</span>
                      <span className="px-3 py-1 bg-surface-container-high border border-outline-variant text-label-md font-bold rounded-xl text-on-surface">Active</span>
                    </div>
                    <p className="font-display text-headline-lg font-extrabold text-primary">$0 <span className="text-body-md text-secondary font-bold">/ forever</span></p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Participate in our core public discussion forums, browse shared community media lessons, and read recipes.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-surface-variant flex items-center justify-between text-primary font-bold font-label-lg">
                    <span>{selectedPlan === "free" ? "✓ Currently Selected" : "Select Free Circle"}</span>
                    <Icons.ArrowRight size={20} />
                  </div>
                </div>

                {/* Plan 2: Premium */}
                <div 
                  onClick={() => setSelectedPlan("premium")}
                  className={`p-6 border-4 rounded-3xl shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[300px] hover:scale-[1.015] active:scale-[1.015] ${
                    selectedPlan === "premium" 
                      ? "bg-surface border-primary ring-4 ring-primary/10 shadow-lg" 
                      : "bg-surface-container-lowest border-outline-variant hover:border-primary"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-headline-md text-headline-md font-extrabold text-primary">Golden Circle</span>
                      <span className="px-3 py-1 bg-primary text-on-primary text-label-md font-bold rounded-xl shadow-xs">Premium Choice</span>
                    </div>
                    <p className="font-display text-headline-lg font-extrabold text-primary">$5 <span className="text-body-md text-secondary font-bold">/ month</span></p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Unlock safe direct messaging, create private groups, download lesson files, attend online security workshops, and access 1-on-1 tech help.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-surface-variant flex items-center justify-between text-primary font-bold font-label-lg">
                    <span>{selectedPlan === "premium" ? "✓ Currently Selected" : "Upgrade to Golden Circle"}</span>
                    <Icons.ArrowRight size={20} />
                  </div>
                </div>

              </div>
            </section>

            {/* Interactive Registration Form */}
            <section className="bg-surface-container-lowest border-2 border-outline-variant rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b-2 border-surface-variant pb-4">
                <h3 className="font-headline-md text-headline-md text-primary font-extrabold">
                  Create Your Account
                </h3>
                <p className="text-body-md text-on-surface-variant font-bold leading-relaxed">
                  Sign up for the <span className="text-primary font-extrabold capitalize">{selectedPlan} Plan</span> in just a few minutes.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Full Name field */}
                <div className="space-y-2">
                  <label htmlFor="reg-name" className="block font-label-lg text-label-lg text-on-surface font-extrabold">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3.5 border-2 rounded-2xl outline-none font-body-md text-body-md bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface focus:ring-4 focus:ring-primary/20 transition-all ${
                      errors.fullName ? "border-red-600" : "border-outline-variant focus:border-primary"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 font-bold text-body-sm flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address field */}
                <div className="space-y-2">
                  <label htmlFor="reg-email" className="block font-label-lg text-label-lg text-on-surface font-extrabold">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="e.g. johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3.5 border-2 rounded-2xl outline-none font-body-md text-body-md bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface focus:ring-4 focus:ring-primary/20 transition-all ${
                      errors.email ? "border-red-600" : "border-outline-variant focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 font-bold text-body-sm flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Age Group Radio Panel */}
                <div className="space-y-2">
                  <span className="block font-label-lg text-label-lg text-on-surface font-extrabold mb-1">
                    Age Group
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["55-64", "65-74", "75-84", "85+"].map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`py-3.5 px-4 rounded-2xl font-bold text-body-md border-2 transition-all cursor-pointer text-center ${
                          ageGroup === age
                            ? "bg-primary border-primary text-on-primary shadow-sm"
                            : "bg-surface-container-low text-secondary border-outline-variant hover:border-primary"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests check-boxes */}
                <div className="space-y-2">
                  <span className="block font-label-lg text-label-lg text-on-surface font-extrabold mb-1">
                    What topics are you most interested in? (Select all that apply)
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {interestOptions.map((interest) => {
                      const isSelected = interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-4.5 py-3 border-2 rounded-2xl font-bold text-label-md transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? "bg-primary-container text-on-primary-container border-primary shadow-sm"
                              : "bg-surface-container-low text-secondary border-outline-variant hover:border-primary"
                          }`}
                        >
                          <span>{interest}</span>
                          <span>{isSelected ? "✓" : "+"}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t-2 border-surface-variant">
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold font-label-lg text-label-lg py-4 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[56px]"
                  >
                    Confirm Registration - Join Free
                  </button>
                </div>

              </form>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Membership Guarantee */}
            <section className="bg-surface-container border-2 border-outline-variant rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-headline-md text-headline-md text-primary font-extrabold pb-3 border-b-2 border-surface-variant flex items-center gap-2">
                <Icons.Star size={24} />
                Our Commitment
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                GoldenCircles is run by seniors, for seniors. We will never sell your personal information, display intrusive ads, or charge hidden fees. Your security is our number one mission.
              </p>
            </section>

            <Sidebar />
          </div>

        </div>
      </main>

      {/* Celebration Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="bg-surface border-4 border-outline-variant max-w-lg w-full rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container border border-outline flex items-center justify-center mx-auto shadow-md">
              <Icons.Sparkles size={40} />
            </div>

            <div className="space-y-2">
              <h3 className="font-headline-lg text-headline-lg text-primary font-extrabold">
                Welcome to GoldenCircles!
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface font-bold">
                Congratulations, {fullName}!
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Your registration for the <span className="text-primary font-extrabold capitalize">{selectedPlan} Plan</span> was successful. An email containing your login guides has been sent to <span className="text-primary font-bold">{email}</span>.
              </p>
            </div>

            <div className="p-4 bg-surface-container border border-outline-variant rounded-2xl text-left space-y-2">
              <h4 className="font-label-lg text-label-lg text-primary font-extrabold">Next Steps:</h4>
              <ul className="text-body-md text-on-surface-variant leading-relaxed list-disc list-inside space-y-1 font-medium">
                <li>Head to the Forums to say hello to everyone!</li>
                <li>Visit the Media hub to check out beginner videos.</li>
                <li>Reach out to our Tech Help Desk if you need assistance.</li>
              </ul>
            </div>

            <button 
              onClick={handleResetForm}
              className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-bold py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer min-h-[56px]"
            >
              Start Exploring Now
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
