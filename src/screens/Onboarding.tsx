import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { PageTransition } from "../components/PageTransition";

export default function Onboarding() {
  const [goal, setGoal] = useState<string>("travel");
  const navigate = useNavigate();

  const options = [
    { id: "travel", icon: "flight_takeoff", label: "Travel" },
    { id: "work", icon: "work", label: "Work" },
    { id: "social", icon: "groups", label: "Social" },
    { id: "exam", icon: "school", label: "Exam Prep" },
  ];

  return (
    <PageTransition className="bg-surface text-on-surface font-body min-h-screen flex flex-col antialiased relative">
      <header className="w-full max-w-3xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <Link to="/signin" className="w-12 h-12 rounded-full flex items-center justify-center text-primary bg-surface-container hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </Link>
        <div className="flex-1 max-w-[240px] mx-6">
          <div className="h-5 w-full bg-secondary-container rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <div className="h-full bg-secondary w-2/4 rounded-xl transition-all duration-700 ease-out"></div>
          </div>
          <p className="text-center text-sm font-label text-secondary font-medium mt-2">Step 2 of 4</p>
        </div>
        <div className="w-12 h-12"></div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 flex flex-col pt-8 pb-32">
        <div className="mb-12 pr-12">
          <h1 className="font-headline text-4xl md:text-5xl text-primary font-extrabold tracking-tight leading-tight mb-4">
            What is your learning goal?
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-lg">
            We'll tailor your daily resonance sessions to match your real-world needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {options.map((opt) => (
            <label key={opt.id} className="group relative block cursor-pointer">
              <input 
                type="radio" 
                name="goal" 
                value={opt.id} 
                checked={goal === opt.id}
                onChange={() => setGoal(opt.id)}
                className="peer sr-only" 
              />
              <div className={cn(
                "h-full flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 shadow-[0_12px_24px_-4px_rgba(53,47,69,0.05)]",
                goal === opt.id 
                  ? "bg-primary-container/30 ring-2 ring-primary"
                  : "bg-surface-container-lowest ring-1 ring-outline-variant/15 hover:bg-primary-container/20 hover:ring-outline-variant/30"
              )}>
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                  goal === opt.id ? "bg-surface-container-lowest text-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant group-hover:text-primary"
                )}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: goal === opt.id ? "'FILL' 1" : "'FILL' 0" }}>
                    {opt.icon}
                  </span>
                </div>
                <span className={cn(
                  "font-headline text-xl font-bold transition-colors",
                  goal === opt.id ? "text-primary" : "text-on-surface group-hover:text-primary"
                )}>
                  {opt.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-6 pb-10 flex justify-center backdrop-blur-[20px] bg-surface/80 z-20 shadow-[0_-12px_40px_-10px_rgba(53,47,69,0.08)]">
        <div className="w-full max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <button 
            onClick={() => navigate('/explore')}
            className="relative w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-semibold text-lg tracking-wide hover:scale-[1.01] active:scale-[0.98] transition-transform duration-200 shadow-[0_12px_24px_-4px_rgba(53,47,69,0.15)] flex items-center justify-center gap-2"
          >
            Continue Journey
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
