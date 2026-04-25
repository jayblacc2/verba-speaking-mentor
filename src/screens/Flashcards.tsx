import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../lib/utils";

export default function Flashcards() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  const [vocabWords, setVocabWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("verba_vocab_bank");
      if (stored) {
        const words = JSON.parse(stored);
        if (words && words.length > 0) {
          setVocabWords(words);
        } else {
          showToast({
            message:
              "No saved words yet. Start a conversation to build your vocab bank!",
            type: "info",
            duration: 5000,
          });
        }
      }
    } catch (e) {}
  }, []);

  const fallbackWord = "Excursion";
  const displayWord =
    vocabWords.length > 0 ? vocabWords[currentIndex] : fallbackWord;
  const totalWords = vocabWords.length > 0 ? vocabWords.length : 1;
  const currentCardNumber = currentIndex + 1;

  const progressPercent = (currentCardNumber / totalWords) * 100;

  const handleNext = (difficulty: "hard" | "good" | "easy") => {
    if (currentIndex < vocabWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      showToast({
        message: "Deck complete! Restarting from the beginning.",
        type: "success",
      });
    }
    setIsFlipped(false);

    const messages = {
      hard: "Marked as hard — you'll see this again soon.",
      good: "Marked as good — steady progress!",
      easy: "Marked as easy — moving to long-term review.",
    };
    showToast({ message: messages[difficulty], type: "info" });
  };

  return (
    <PageTransition className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface/90 backdrop-blur-md w-full top-0 sticky flex justify-between items-center px-6 py-4 z-50 border-b border-outline-variant/10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 duration-200 flex items-center justify-center"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            arrow_back
          </span>
        </button>
        <h1 className="font-headline font-bold text-primary text-xl text-center flex-grow tracking-tight">
          Vocabulary Flashcards
        </h1>
        <button className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 duration-200 flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col px-6 py-8 md:px-12 md:max-w-4xl md:mx-auto w-full relative z-10 pb-32">
        {/* Progress Indicator */}
        <div className="w-full mb-12">
          <div className="flex justify-between items-end mb-3 px-1">
            <span className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              Set Progress
            </span>
            <span className="font-headline text-sm font-bold text-secondary">
              Card {currentCardNumber} of {totalWords}
            </span>
          </div>
          <div className="h-3 w-full bg-secondary-container rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <div
              className="h-full bg-secondary rounded-full shadow-[0_2px_4px_rgba(57,104,84,0.3)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard Area */}
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-lg mx-auto">
          {vocabWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-8 px-6">
              <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">
                style
              </span>
              <p className="text-lg font-headline font-bold text-on-surface mb-1">
                No Saved Words
              </p>
              <p className="text-sm text-on-surface-variant max-w-xs mb-6">
                Practice conversations and tap the bookmark icon on grammar tips
                to build your vocabulary bank.
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="bg-primary text-on-primary font-headline font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary-dim transition-colors active:scale-95 shadow-md shadow-primary/20"
              >
                Start Practicing
              </button>
            </div>
          ) : (
            <>
              {/* 3D Flip Container */}
              <div className="w-full perspective-[1000px]">
                <div
                  className={cn(
                    "relative w-full min-h-[480px] preserve-3d transition-transform ease-[cubic-bezier(0.4,0,0.2,1)]",
                    !prefersReducedMotion && "duration-700",
                    isFlipped && "rotateY-180",
                  )}
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transitionDuration: prefersReducedMotion ? "0s" : undefined,
                  }}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-8px_rgba(53,47,69,0.1)] border border-outline-variant/20 flex flex-col justify-center items-center text-center">
                    <h2 className="font-headline font-extrabold text-[3.5rem] md:text-[4.5rem] text-primary leading-tight mb-6 tracking-tight capitalize">
                      {displayWord}
                    </h2>
                    <p className="text-on-surface-variant font-body text-base font-medium">
                      Tap card or icon to reveal meaning
                    </p>

                    {/* Flip Button */}
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline-variant hover:text-primary hover:bg-primary-container/20 transition-all active:scale-95"
                      aria-label="Reveal definition"
                    >
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        sync
                      </span>
                    </button>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 backface-hidden bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-8px_rgba(53,47,69,0.1)] border border-outline-variant/20 flex flex-col justify-center text-center"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <h3 className="font-headline font-extrabold text-2xl md:text-3xl text-primary leading-tight mb-6 tracking-tight capitalize">
                      {displayWord}
                    </h3>

                    {displayWord === fallbackWord && (
                      <span className="font-body text-lg text-on-surface-variant font-medium bg-surface-container px-6 py-2 rounded-full inline-block tracking-wide shadow-sm border border-outline-variant/10 mb-6 self-center">
                        /ɪkˈskɜː.ʒən/
                      </span>
                    )}

                    <div className="space-y-6 text-left w-full">
                      <div>
                        <span className="font-headline text-sm font-bold text-secondary uppercase tracking-widest block mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">
                            menu_book
                          </span>
                          Definition
                        </span>
                        <p className="font-body text-lg text-on-surface leading-relaxed font-medium">
                          {displayWord === fallbackWord
                            ? "A short journey or trip, especially one engaged in as a leisure activity."
                            : "Saved from your recent conversation practice."}
                        </p>
                      </div>

                      {displayWord === fallbackWord && (
                        <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10 relative overflow-hidden">
                          <div className="absolute -right-4 -bottom-4 opacity-5">
                            <span
                              className="material-symbols-outlined text-primary text-8xl"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              format_quote
                            </span>
                          </div>
                          <span className="font-headline text-sm font-bold text-primary uppercase tracking-widest block mb-2 relative z-10 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">
                              chat_bubble
                            </span>
                            Example
                          </span>
                          <p className="font-body text-base text-on-surface-variant italic leading-relaxed relative z-10 font-medium">
                            "The students went on an educational{" "}
                            <strong className="text-primary font-bold">
                              excursion
                            </strong>{" "}
                            to the natural history museum."
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Flip Back Button */}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline-variant hover:text-primary hover:bg-primary-container/20 transition-all active:scale-95"
                      aria-label="Show word"
                    >
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        sync
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Confidence rating (outside card) */}
              <div className="w-full mt-8 flex justify-between gap-4">
                <button
                  onClick={() => handleNext("hard")}
                  className="flex-1 py-4 rounded-full bg-error-container/20 text-error-dim font-headline font-bold text-lg hover:bg-error-container/40 transition-colors border border-error-container/30 active:scale-95"
                >
                  Hard
                </button>
                <button
                  onClick={() => handleNext("good")}
                  className="flex-1 py-4 rounded-full bg-primary/10 text-primary font-headline font-bold text-lg hover:bg-primary/20 transition-colors border border-primary/20 active:scale-95 shadow-[0_4px_12px_rgba(44,100,133,0.1)]"
                >
                  Good
                </button>
                <button
                  onClick={() => handleNext("easy")}
                  className="flex-1 py-4 rounded-full bg-secondary-container text-on-secondary-container font-headline font-bold text-lg hover:bg-secondary transition-colors hover:text-on-secondary shadow-[0_4px_12px_rgba(57,104,84,0.2)] active:scale-95 border border-secondary/20"
                >
                  Easy
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
