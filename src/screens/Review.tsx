import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";

interface HistoryEntry {
  id: string;
  date: string;
  mode: string;
  scenarioTitle: string;
  scenarioTopic: string;
  messages: { role: string; text: string }[];
}

function getLastSession(): HistoryEntry | null {
  try {
    const raw = localStorage.getItem("verba_history");
    if (!raw) return null;
    const arr: HistoryEntry[] = JSON.parse(raw);
    return arr[0] || null;
  } catch {
    return null;
  }
}

function getVocab(): string[] {
  try {
    const raw = localStorage.getItem("verba_vocab_bank");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Review() {
  const [session, setSession] = useState<HistoryEntry | null>(getLastSession);
  const [vocab, setVocab] = useState<string[]>(getVocab);

  useEffect(() => {
    setSession(getLastSession());
    setVocab(getVocab());
    const onStorage = () => {
      setSession(getLastSession());
      setVocab(getVocab());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const userMessages = useMemo(
    () => (session?.messages || []).filter((m) => m.role === "user"),
    [session],
  );

  return (
    <PageTransition className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24 md:mb-12">
        {/* Header Section */}
        <div className="mb-12 md:w-3/4">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight leading-tight">
            {session ? "Great discussion! Let's review." : "Ready to practice?"}
          </h2>
          <p className="font-body text-lg text-on-surface-variant md:w-4/5 font-medium leading-relaxed">
            {session
              ? `Here are your messages from "${session.scenarioTitle}" on ${formatDate(session.date)}.`
              : "Complete your first conversation to see a personalized review with your responses and vocabulary."}
          </p>
        </div>

        {session ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* User Messages Review Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="font-headline text-2xl font-bold text-secondary flex items-center gap-2 mb-2">
                <span
                  className="material-symbols-outlined text-secondary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  edit_note
                </span>
                Your Responses
              </h3>

              {userMessages.length > 0 ? (
                userMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] hover:bg-primary-container/10 transition-colors duration-300 border border-outline-variant/15 shadow-sm"
                  >
                    <div className="flex items-start gap-5">
                      <div className="bg-primary-container/40 text-primary p-3 rounded-full shrink-0 border border-primary/10">
                        <span className="material-symbols-outlined">
                          chat_bubble
                        </span>
                      </div>
                      <div className="w-full">
                        <p className="font-body text-on-surface text-lg leading-relaxed">
                          "{msg.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/15 shadow-sm text-center">
                  <p className="font-body text-on-surface-variant">
                    No user responses recorded in this session.
                  </p>
                </div>
              )}
            </div>

            {/* Vocabulary & Progress Column */}
            <div className="lg:col-span-5 flex flex-col gap-8 mt-8 lg:mt-0">
              {/* Vocabulary Mastery */}
              <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/20 shadow-sm relative overflow-hidden">
                <div className="absolute -top-6 -right-6 opacity-[0.03]">
                  <span
                    className="material-symbols-outlined text-[120px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-8 flex items-center gap-2 relative z-10">
                  <span
                    className="material-symbols-outlined text-tertiary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  Vocabulary Bank
                </h3>
                <div className="flex flex-col gap-4 relative z-10">
                  {vocab.length > 0 ? (
                    vocab.slice(0, 5).map((word) => (
                      <Link
                        key={word}
                        to="/flashcards"
                        className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between border-l-[6px] border-secondary shadow-sm hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        <div>
                          <p className="font-headline font-bold text-xl text-on-surface hover:text-primary transition-colors">
                            {word}
                          </p>
                        </div>
                        <span
                          className="material-symbols-outlined text-secondary text-3xl shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="font-body text-on-surface-variant text-center py-4">
                      Save words during conversations to see them here.
                    </p>
                  )}
                </div>
              </div>

              {/* Next Steps Action */}
              <div className="bg-gradient-to-br from-primary to-primary-container p-[2px] rounded-[2.5rem] shadow-xl shadow-primary/10 hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-surface-container-lowest rounded-[2.4rem] p-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mb-6 text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      mic_none
                    </span>
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-on-surface mb-3">
                    Ready to try again?
                  </h4>
                  <p className="font-body text-base text-on-surface-variant mb-8 font-medium px-4">
                    Practice your responses in a new scenario.
                  </p>
                  <Link
                    to="/conversation"
                    className="block text-center bg-primary text-on-primary font-headline font-semibold text-lg py-4 px-10 rounded-full w-full hover:bg-primary-dim transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Start Practice
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">
              menu_book
            </span>
            <p className="text-lg font-headline font-bold text-on-surface mb-2">
              No sessions to review
            </p>
            <p className="text-sm text-on-surface-variant max-w-xs mb-8">
              Complete a conversation to see your responses and saved vocabulary
              here for review.
            </p>
            <Link
              to="/explore"
              className="px-6 py-3 bg-primary text-on-primary font-headline font-bold rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Explore Scenarios
            </Link>
          </div>
        )}
      </main>
    </PageTransition>
  );
}
