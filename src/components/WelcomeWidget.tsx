import React from "react";

export default function WelcomeWidget() {
  return (
    <section className="bg-primary-container text-on-primary-container rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 border-primary shadow-lg min-h-[280px] flex flex-col justify-between">
      <div className="relative z-10 max-w-lg">
        <h3 className="font-headline-lg text-headline-lg mb-3 text-on-primary font-extrabold tracking-tight">
          Join GoldenCircles
        </h3>
        <p className="font-body-md text-body-md mb-6 text-on-primary-container font-medium leading-relaxed opacity-95">
          Create a free account today to participate in discussions, send private messages, and customize your reading view.
        </p>
      </div>

      <div className="relative z-10 w-full">
        <button className="w-full sm:w-auto bg-surface-container-lowest text-primary hover:bg-surface border-2 border-transparent hover:border-primary font-label-lg text-label-lg font-bold py-4 px-8 rounded-2xl transition-all shadow-md active:scale-[0.97] active:bg-surface-container-low min-h-[56px] cursor-pointer">
          Sign Up Today
        </button>
      </div>

      {/* Modern abstract graphic background shape */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary opacity-30 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
