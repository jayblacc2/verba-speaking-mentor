import { Link } from "react-router-dom";

export default function Progress() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col pb-24 md:pb-0 font-body">
      {/* TopAppBar */}
      <header className="bg-surface/90 backdrop-blur-md w-full top-0 sticky z-40 border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex-shrink-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9mJFSpWCbCgWREFRNE_fiaE5omJvV3aC2HAcHm1mKfsxSc-SXw1-92bPhEJ0TnKVvR3KHiXMZnj-vnBRotafiYcMfg1RQ3qbOv7D3ETNHRSosxW-n1fGuPUjpAyG0b_9dFz2UBTjMrvSFBs1tocnVMZvCt13u819qNPYJ93uaVeWaSXhjQ-xgSpAFZQgnBPoio7nqF2sqMo62Qt7U9fYsk7nATX6epwMlQy65B_GvDV6XHycD3lo6XIhGgSD6XvfXpA-CIK0CY3s" alt="User Avatar" className="w-full h-full object-cover rounded-full border-2 border-primary/20 shadow-sm" />
            </div>
            <h1 className="text-2xl font-extrabold text-primary font-headline tracking-tight">Resonant Mentor</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary active:scale-95">
            <span className="material-symbols-outlined font-light text-[26px]">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-6 md:gap-10 md:flex-row">
        
        {/* Web Side Navigation (Hidden on Mobile, done in Layout) */}
        
        {/* Dashboard Content */}
        <div className="flex-grow flex flex-col gap-8 md:gap-10 w-full max-w-4xl mx-auto md:ml-64">
          
          {/* Hero Section / Overall Status */}
          <section className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-lowest p-8 md:p-12 shadow-[0_12px_40px_-8px_rgba(53,47,69,0.08)] border border-outline-variant/20 flex flex-col md:flex-row items-center gap-10 md:gap-12">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-container rounded-full blur-[100px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-container rounded-full blur-[80px] opacity-40 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="flex-grow space-y-5 text-center md:text-left z-10">
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-extrabold leading-tight tracking-tight">Finding Your Voice</h2>
              <p className="font-body text-on-surface-variant text-lg max-w-lg font-medium leading-relaxed">
                Your fluency is blossoming. You've consistently maintained your practice streak, and your pronunciation clarity has noticeably improved this week.
              </p>
            </div>
            
            <div className="flex-shrink-0 z-10 relative">
              {/* Circular Progress Hero */}
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-surface-container-high flex items-center justify-center relative shadow-[inset_0_4px_16px_rgba(0,0,0,0.06)] border border-outline-variant/10">
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-secondary-container" strokeWidth="8" stroke="currentColor" fill="none" r="44" cx="50" cy="50"></circle>
                  <circle className="text-secondary drop-shadow-[0_4px_12px_rgba(57,104,84,0.4)]" strokeWidth="8" strokeDasharray="276" strokeDashoffset="60" strokeLinecap="round" stroke="currentColor" fill="none" r="44" cx="50" cy="50" style={{ transition: "stroke-dashoffset 1.5s ease-out" }}></circle>
                </svg>
                <div className="text-center">
                  <span className="font-headline text-[3.5rem] font-black text-primary tracking-tighter">78</span><span className="text-2xl font-bold text-primary">%</span>
                  <div className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">Fluency Score</div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Stat Card 1: Speaking Confidence */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-7 md:p-8 shadow-[0_8px_24px_-6px_rgba(53,47,69,0.05)] border border-outline-variant/20 flex flex-col gap-6 transition-all hover:bg-primary-container/10 group hover:border-primary/20">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-[1.25rem] bg-secondary-container/60 flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>record_voice_over</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-bold text-secondary bg-secondary-container px-3 py-1.5 rounded-full border border-secondary/20 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] font-bold">trending_up</span> +12%
                </span>
              </div>
              <div className="mb-2">
                <h3 className="font-headline text-xl text-on-surface font-bold tracking-tight">Speaking Confidence</h3>
                <p className="font-body text-sm text-on-surface-variant font-medium mt-1.5">Hesitation pauses decreased</p>
              </div>
              {/* Thick Stroke Bar */}
              <div className="mt-auto pt-2">
                <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                  <div className="h-full bg-secondary rounded-full w-[85%] shadow-[0_2px_4px_rgba(57,104,84,0.3)]"></div>
                </div>
              </div>
            </div>

            {/* Stat Card 2: Grammar Accuracy */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-7 md:p-8 shadow-[0_8px_24px_-6px_rgba(53,47,69,0.05)] border border-outline-variant/20 flex flex-col gap-6 lg:col-span-2 transition-all hover:bg-primary-container/10 group hover:border-primary/20">
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-primary-container/60 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>spellcheck</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-on-surface font-bold tracking-tight">Grammar Accuracy</h3>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1.5">Past tense consistency</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold text-tertiary-dim bg-tertiary-container/60 px-4 py-1.5 rounded-full border border-tertiary-dim/20 shadow-sm hidden sm:flex">
                  Goal Met
                </span>
              </div>
              
              {/* Simple Trend Line Concept (Visual) */}
              <div className="mt-2 flex-grow flex items-end justify-between gap-3 h-32 pb-2 px-1">
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[30%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"><div className="w-full bg-primary/40 rounded-t-xl h-full group-hover/bar:bg-primary transition-colors"></div></div>
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[45%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"><div className="w-full bg-primary/50 rounded-t-xl h-full group-hover/bar:bg-primary transition-colors"></div></div>
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[40%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"><div className="w-full bg-primary/60 rounded-t-xl h-full group-hover/bar:bg-primary transition-colors"></div></div>
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[60%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"><div className="w-full bg-primary/70 rounded-t-xl h-full group-hover/bar:bg-primary transition-colors"></div></div>
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[75%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"><div className="w-full bg-primary/80 rounded-t-xl h-full group-hover/bar:bg-primary transition-colors"></div></div>
                <div className="w-full bg-surface-container-highest rounded-t-xl h-[90%] relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden shadow-[0_-4px_12px_rgba(44,100,133,0.15)] z-10"><div className="w-full bg-primary rounded-t-xl h-full"></div></div>
              </div>
              <div className="flex justify-between text-xs font-headline font-bold text-on-surface-variant px-2 uppercase tracking-wider">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span className="text-primary font-black">Today</span>
              </div>
            </div>
          </div>

          {/* Topic Mastery List */}
          <section className="bg-surface-container-low/50 rounded-[2.5rem] p-7 md:p-10 border border-outline-variant/15 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl font-extrabold text-primary tracking-tight">Topic Mastery</h3>
              <button className="text-primary font-headline text-sm font-bold hover:underline bg-primary/5 px-4 py-2 rounded-full transition-colors hover:bg-primary/10">View All</button>
            </div>
            <div className="flex flex-col gap-5">
              
              {/* Topic Item */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-5 transition-all hover:bg-primary-container/10 border border-outline-variant/20 hover:border-primary/20 shadow-sm cursor-pointer group">
                <div className="w-12 h-12 rounded-[1rem] bg-surface-container flex items-center justify-center text-primary-dim shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline font-bold text-on-surface text-base md:text-lg mb-2">Professional Introductions</h4>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                    <div className="bg-secondary h-full rounded-full w-[90%] shadow-[0_1px_3px_rgba(57,104,84,0.3)]"></div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 w-16">
                  <span className="font-headline font-black text-secondary text-xl">90%</span>
                </div>
              </div>

              {/* Topic Item 2 */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-5 transition-all hover:bg-primary-container/10 border border-outline-variant/20 hover:border-primary/20 shadow-sm cursor-pointer group">
                <div className="w-12 h-12 rounded-[1rem] bg-surface-container flex items-center justify-center text-primary-dim shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline font-bold text-on-surface text-base md:text-lg mb-2">Travel & Navigation</h4>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                    <div className="bg-secondary h-full rounded-full w-[65%] shadow-[0_1px_3px_rgba(57,104,84,0.3)]"></div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 w-16">
                  <span className="font-headline font-black text-secondary text-xl">65%</span>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
