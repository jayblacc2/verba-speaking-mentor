import { Link } from "react-router-dom";

export default function Flashcards() {
  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface/90 backdrop-blur-md w-full top-0 sticky flex justify-between items-center px-6 py-4 z-50 border-b border-outline-variant/10 shadow-sm">
        <Link to="/review" className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 duration-200 flex items-center justify-center">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
        </Link>
        <h1 className="font-headline font-bold text-primary text-xl text-center flex-grow tracking-tight">8. Vocabulary Flashcards</h1>
        <button className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 duration-200 flex items-center justify-center">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col px-6 py-8 md:px-12 md:max-w-4xl md:mx-auto w-full relative z-10 pb-32">
        
        {/* Progress Indicator */}
        <div className="w-full mb-12">
          <div className="flex justify-between items-end mb-3 px-1">
            <span className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest">Set Progress</span>
            <span className="font-headline text-sm font-bold text-secondary">Card 4 of 20</span>
          </div>
          <div className="h-3 w-full bg-secondary-container rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <div className="h-full bg-secondary rounded-full w-1/5 shadow-[0_2px_4px_rgba(57,104,84,0.3)] transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Flashcard Area */}
        <div className="flex-grow flex flex-col justify-center items-center relative perspective-[1000px]">
          
          {/* The Card */}
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-8px_rgba(53,47,69,0.1)] border border-outline-variant/20 relative min-h-[450px] flex flex-col justify-center items-center text-center transition-transform duration-500 hover:-translate-y-2">
            
            {/* Front Content (Target Word) */}
            <div className="w-full flex flex-col items-center justify-center flex-1">
              <h2 className="font-headline font-extrabold text-[3.5rem] md:text-[4rem] text-primary leading-tight mb-4 tracking-tight">Excursion</h2>
              
              {/* Phonetic & Secondary info */}
              <div className="mt-4 space-y-8 w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                <span className="font-body text-xl text-on-surface-variant font-medium bg-surface-container px-6 py-2 rounded-full inline-block tracking-wide shadow-sm border border-outline-variant/10">
                  /ɪkˈskɜː.ʒən/
                </span>
                
                <div className="space-y-6 text-left mt-8 w-full border-t border-outline-variant/20 pt-8">
                  <div>
                    <span className="font-headline text-sm font-bold text-secondary uppercase tracking-widest block mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">menu_book</span>
                      Definition
                    </span>
                    <p className="font-body text-xl text-on-surface leading-relaxed font-medium">A short journey or trip, especially one engaged in as a leisure activity.</p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-3xl mt-4 border border-primary/10 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5">
                      <span className="material-symbols-outlined text-primary text-submit text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                    </div>
                    <span className="font-headline text-sm font-bold text-primary uppercase tracking-widest block mb-2 relative z-10 flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      Example
                    </span>
                    <p className="font-body text-lg text-on-surface-variant italic leading-relaxed relative z-10 font-medium">
                      "The students went on an educational <strong className="text-primary font-bold">excursion</strong> to the natural history museum."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip Action Indicator */}
            <button className="absolute top-8 right-8 text-outline-variant hover:text-primary transition-colors hover:rotate-180 duration-500">
              <span className="material-symbols-outlined text-3xl">sync</span>
            </button>

            {/* Confidence rating (Revealed state) */}
            <div className="w-full mt-10 pt-4 flex justify-between gap-4 animate-[fadeInUp_0.5s_ease-out]">
              <button onClick={() => {}} className="flex-1 py-4 rounded-full bg-error-container/20 text-error-dim font-headline font-bold text-lg hover:bg-error-container/40 transition-colors border border-error-container/30 active:scale-95">Hard</button>
              <button onClick={() => {}} className="flex-1 py-4 rounded-full bg-primary/10 text-primary font-headline font-bold text-lg hover:bg-primary/20 transition-colors border border-primary/20 active:scale-95 shadow-[0_4px_12px_rgba(44,100,133,0.1)]">Good</button>
              <button onClick={() => {}} className="flex-1 py-4 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-lg hover:bg-secondary transition-colors hover:text-on-secondary shadow-[0_4px_12px_rgba(57,104,84,0.2)] active:scale-95 border border-secondary/20">Easy</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
