import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">
      <header className="bg-surface/80 backdrop-blur-md w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-5xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            <span className="font-headline font-black text-primary text-xl tracking-tight">Verba</span>
          </Link>
          <Link to="/explore" className="font-headline text-lg font-bold tracking-tight text-on-surface-variant hover:bg-primary/10 rounded-lg transition-colors px-4 py-1">
            Skip
          </Link>
        </div>
      </header>

      <main className="relative flex flex-col md:flex-row items-stretch flex-1">
        {/* Left Column: Editorial Content (Visual Anchor) */}
        <section className="hidden md:flex flex-col justify-center items-start w-1/2 p-16 bg-surface-container-low relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/30 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-lg">
            <div className="mb-8 inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-medium tracking-wide text-sm font-label">WELCOME TO VERBA</span>
            </div>
            <h1 className="font-headline font-bold text-6xl leading-[1.1] text-on-surface mb-8 tracking-tight">
              Find your <span className="text-primary">voice</span> in any language.
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed font-light mb-12">
              Professional fluency isn't about memorization—it's about resonance. Join a space designed for natural growth and sophisticated dialogue.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">record_voice_over</span>
                </div>
                <span className="text-on-surface font-medium">Real-time adaptive feedback</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container">auto_awesome</span>
                </div>
                <span className="text-on-surface font-medium">Context-aware AI mentoring</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Auth Form */}
        <section className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-surface relative">
          <div className="w-full max-w-md">
            <div className="mb-12">
              <h2 className="font-headline text-4xl font-bold text-on-surface mb-3 tracking-tight">Verba</h2>
              <p className="text-on-surface-variant mb-8">Begin your journey with your mentor today.</p>
              
              <div className="inline-flex p-1.5 bg-surface-container-high rounded-full w-full">
                <button 
                  onClick={() => setActiveTab('signin')}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'signin' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'signup' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Create Account
                </button>
              </div>
            </div>

            <form className="space-y-6 mb-10" onSubmit={handleSubmit}>
              {activeTab === 'signup' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-on-surface-variant px-1">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full px-5 py-4 bg-surface-container-high border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-widest text-on-surface-variant px-1">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full px-5 py-4 bg-surface-container-high border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold tracking-widest text-on-surface-variant">PASSWORD</label>
                  {activeTab === 'signin' && (
                    <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</a>
                  )}
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 bg-surface-container-high border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                />
              </div>
              
              <button 
                type="submit" 
                className="block text-center w-full py-4 bg-primary text-on-primary rounded-full font-headline font-semibold text-lg shadow-[0_12px_24px_-4px_rgba(44,100,133,0.2)] active:scale-95 transition-all"
              >
                {activeTab === 'signin' ? 'Sign In to Verba' : 'Create Account'}
              </button>
            </form>

            <div className="relative mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/15"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-surface text-on-surface-variant font-medium tracking-widest">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => navigate('/onboarding')} className="flex items-center justify-center gap-3 px-6 py-3.5 bg-surface-container-lowest border border-outline-variant/15 rounded-full hover:bg-surface-container-high transition-colors">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7C8d5FXyp8u4_SZwZLalOj-yUemh-v2iP4lkb-jV4_5hiXjnJsJkr68VZgcgqTBqr1bILnw4N68cJ2n1CqbvQWqndnlZNX3-5jqM6ci4MMeECuoo8dYm_x51ERbLuGACGon1Ha9ir8kWNol6uEjTiuluAlM29SG7mK2bKInMohGYGd8icskzYBlOi4BrGLUqkGw5L-mCDCtml78QaeLiGR8bpkrwdEq9kRgk4R1p-NTsIcGB9MjLWMCpJ4PewMxCshaGnIVJnWnc" alt="Google" className="w-5 h-5"/>
                <span className="text-sm font-semibold text-on-surface">Google</span>
              </button>
              <button onClick={() => navigate('/onboarding')} className="flex items-center justify-center gap-3 px-6 py-3.5 bg-surface-container-lowest border border-outline-variant/15 rounded-full hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
                <span className="text-sm font-semibold text-on-surface">Apple</span>
              </button>
            </div>
            
            <footer className="mt-12 text-center">
              <p className="text-sm text-on-surface-variant">
                By continuing, you agree to our <a href="#" className="text-primary font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-medium hover:underline">Privacy Policy</a>.
              </p>
            </footer>
          </div>
        </section>
      </main>

      {/* Contextual Aesthetic Element */}
      <div className="fixed bottom-12 right-12 hidden lg:flex flex-col items-end pointer-events-none">
        <div className="bg-surface-container-lowest/40 backdrop-blur-xl p-4 rounded-3xl border border-outline-variant/10 shadow-2xl mb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-end h-4">
              <div className="w-1 bg-secondary rounded-full h-2 animate-pulse"></div>
              <div className="w-1 bg-secondary rounded-full h-4 animate-pulse" style={{animationDelay: "0.1s"}}></div>
              <div className="w-1 bg-secondary rounded-full h-3 animate-pulse" style={{animationDelay: "0.2s"}}></div>
              <div className="w-1 bg-secondary rounded-full h-4 animate-pulse" style={{animationDelay: "0.3s"}}></div>
            </div>
            <span className="text-xs font-semibold text-secondary tracking-widest">LISTENING MODE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
