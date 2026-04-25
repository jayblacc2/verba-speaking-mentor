import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";

export default function Review() {
  return (
    <PageTransition className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24 md:mb-12">
        {/* Header Section with Asymmetry */}
        <div className="mb-12 md:w-3/4">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight leading-tight">Great discussion! Let's review.</h2>
          <p className="font-body text-lg text-on-surface-variant md:w-4/5 font-medium leading-relaxed">Here are a few gentle corrections and vocabulary highlights from our conversation about Travel Itineraries.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Grammar Review Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold text-secondary flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
              Gentle Corrections
            </h3>

            {/* Correction Card 1 */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] hover:bg-primary-container/10 transition-colors duration-300 border border-outline-variant/15 shadow-sm">
              <div className="flex items-start gap-5">
                <div className="bg-error-container/30 text-error p-3 rounded-full shrink-0 border border-error/10">
                  <span className="material-symbols-outlined">close</span>
                </div>
                <div className="w-full">
                  <p className="font-body text-on-surface-variant italic mb-3 line-through decoration-error/60 decoration-2 text-lg">"I go to Paris next week."</p>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl mt-4 flex items-start gap-4 shadow-[0_8px_16px_-4px_rgba(53,47,69,0.08)] border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary shrink-0 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <p className="font-body font-bold text-primary mb-2 text-lg">"I am going to Paris next week." <span className="text-on-surface-variant font-medium text-base">or</span> "I will go to Paris next week."</p>
                      <p className="font-body text-sm text-on-surface-variant mt-2 bg-surface-container-low inline-block px-3 py-2 rounded-lg font-medium leading-relaxed">For planned future events, use the present continuous or 'will'.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Correction Card 2 */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] hover:bg-primary-container/10 transition-colors duration-300 border border-outline-variant/15 shadow-sm">
              <div className="flex items-start gap-5">
                <div className="bg-error-container/30 text-error p-3 rounded-full shrink-0 border border-error/10">
                  <span className="material-symbols-outlined">close</span>
                </div>
                <div className="w-full">
                  <p className="font-body text-on-surface-variant italic mb-3 line-through decoration-error/60 decoration-2 text-lg">"The flight was much delays."</p>
                  <div className="bg-surface-container-lowest p-5 rounded-2xl mt-4 flex items-start gap-4 shadow-[0_8px_16px_-4px_rgba(53,47,69,0.08)] border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary shrink-0 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <p className="font-body font-bold text-primary mb-2 text-lg">"The flight was much delayed." <span className="text-on-surface-variant font-medium text-base">or</span> "There were many delays."</p>
                      <p className="font-body text-sm text-on-surface-variant mt-2 bg-surface-container-low inline-block px-3 py-2 rounded-lg font-medium leading-relaxed">Use the adjective 'delayed' to describe the flight, or the plural noun 'delays' if referring to events.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vocabulary & Progress Column */}
          <div className="lg:col-span-5 flex flex-col gap-8 mt-8 lg:mt-0">
            {/* Vocabulary Mastery */}
            <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/20 shadow-sm relative overflow-hidden">
              <div className="absolute -top-6 -right-6 opacity-[0.03]">
                <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-8 flex items-center gap-2 relative z-10">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Vocabulary Mastery
              </h3>
              <div className="flex flex-col gap-4 relative z-10">
                {/* Vocab Item 1 (Used) */}
                <Link to="/flashcards" className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between border-l-[6px] border-secondary shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                  <div>
                    <p className="font-headline font-bold text-xl text-on-surface hover:text-primary transition-colors">Itinerary</p>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1">A planned route or journey.</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </Link>

                {/* Vocab Item 2 (Used) */}
                <Link to="/flashcards" className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between border-l-[6px] border-secondary shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                  <div>
                    <p className="font-headline font-bold text-xl text-on-surface hover:text-primary transition-colors">Layover</p>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1">A period of rest or waiting before a further stage in a journey.</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </Link>

                {/* Vocab Item 3 (Missed) */}
                <Link to="/flashcards" className="bg-surface-variant/50 p-5 rounded-2xl flex items-center justify-between outline outline-1 outline-outline-variant/30 outline-offset-0 hover:outline-primary/50 transition-colors cursor-pointer group">
                  <div>
                    <p className="font-headline font-bold text-xl text-on-surface-variant group-hover:text-primary transition-colors">Excursion</p>
                    <p className="font-body text-sm text-on-surface-variant font-medium opacity-80 mt-1">A short journey or trip.</p>
                  </div>
                  <span className="material-symbols-outlined text-outline text-3xl shrink-0 group-hover:text-primary/50 transition-colors">radio_button_unchecked</span>
                </Link>
              </div>
            </div>

            {/* Next Steps Action */}
            <div className="bg-gradient-to-br from-primary to-primary-container p-[2px] rounded-[2.5rem] shadow-xl shadow-primary/10 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-surface-container-lowest rounded-[2.4rem] p-10 h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-3xl">mic_none</span>
                </div>
                <h4 className="font-headline text-2xl font-bold text-on-surface mb-3">Ready to try again?</h4>
                <p className="font-body text-base text-on-surface-variant mb-8 font-medium px-4">Practice these corrections in a short follow-up scenario.</p>
                <Link to="/conversation" className="block text-center bg-primary text-on-primary font-headline font-semibold text-lg py-4 px-10 rounded-full w-full hover:bg-primary-dim transition-all shadow-md hover:shadow-lg active:scale-95">
                  Start Practice
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </PageTransition>
  );
}
