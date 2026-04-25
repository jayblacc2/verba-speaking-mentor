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

function computeScore(
  session: HistoryEntry | null,
  vocabCount: number,
): number {
  if (!session) return 0;
  const msgCount = session.messages?.length || 0;
  const base = 40;
  const msgBonus = Math.min(msgCount * 3, 30);
  const vocabBonus = Math.min(vocabCount * 2, 15);
  return Math.min(100, Math.round(base + msgBonus + vocabBonus));
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function Summary() {
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

  const score = useMemo(
    () => computeScore(session, vocab.length),
    [session, vocab.length],
  );
  const userMessages = useMemo(
    () => (session?.messages || []).filter((m) => m.role === "user"),
    [session],
  );

  return (
    <PageTransition className="bg-surface text-on-surface font-body min-h-screen pb-24 md:pb-0 flex flex-col items-center">
      {/* TopAppBar */}
      <header className="bg-surface/80 backdrop-blur-md text-primary font-headline text-2xl font-semibold tracking-tight w-full top-0 sticky flex justify-between items-center px-6 py-4 z-40 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <Link
            to="/explore"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors scale-95 active:scale-90"
          >
            <span className="material-symbols-outlined text-on-surface hover:text-primary">
              arrow_back
            </span>
          </Link>
          <span className="font-bold">Verba</span>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors scale-95 active:scale-90">
            <span className="material-symbols-outlined text-on-surface hover:text-primary">
              more_vert
            </span>
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl px-6 md:px-12 pt-8 pb-16 flex-grow flex flex-col gap-12">
        {/* Hero Section: Score */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 w-full">
          <div className="flex-1 space-y-4">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent max-w-lg leading-tight">
              {session ? "Session Complete." : "Ready to Start?"}
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-md font-medium">
              {session
                ? `You practiced "${session.scenarioTitle}" on ${formatDate(session.date)} with ${session.messages?.length || 0} messages exchanged.`
                : "Complete your first conversation to see a personalized session summary here."}
            </p>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary to-primary-container p-1.5 flex items-center justify-center relative shrink-0 shadow-[0_12px_40px_-8px_rgba(44,100,133,0.3)]">
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-2xl"></div>
            <div className="w-full h-full bg-surface rounded-full flex flex-col items-center justify-center z-10">
              <span className="font-headline text-6xl md:text-7xl font-bold text-primary">
                {score}
              </span>
              <span className="font-body text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">
                Score
              </span>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {/* Conversation Highlights / User Messages */}
          <section className="md:col-span-8 flex flex-col gap-6">
            <h2 className="font-headline text-2xl font-bold text-primary">
              {userMessages.length > 0 ? "Your Responses" : "Highlights"}
            </h2>
            {userMessages.length > 0 ? (
              <div className="flex flex-col gap-4">
                {userMessages.slice(0, 3).map((msg, i) => (
                  <div
                    key={i}
                    className="bg-surface-container-low rounded-[2rem] p-6 md:p-8 flex flex-col gap-3 transition-colors hover:bg-primary-container/10 border border-transparent hover:border-primary/10 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-container/40 flex items-center justify-center shrink-0 border border-primary/10">
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          chat_bubble
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-widest font-bold">
                          You said
                        </span>
                        <p className="font-body text-lg text-on-surface font-medium leading-relaxed">
                          "{msg.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-[2rem] p-6 md:p-8 border border-outline-variant/20 shadow-sm text-center">
                <p className="font-body text-on-surface-variant">
                  Your conversation responses will appear here for review after
                  your first session.
                </p>
              </div>
            )}
          </section>

          {/* Vocabulary & Actions */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Vocabulary Recap */}
            <section className="bg-surface-container-highest rounded-[2rem] p-6 flex flex-col gap-5 border border-outline-variant/20 shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-10">
                <span
                  className="material-symbols-outlined text-[80px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
              </div>
              <h2 className="font-headline text-xl font-bold text-primary flex items-center gap-2 relative z-10">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
                Vocabulary Bank
              </h2>
              {vocab.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2.5 relative z-10">
                    {vocab.slice(0, 6).map((word) => (
                      <div
                        key={word}
                        className="bg-surface rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-outline-variant/15"
                      >
                        <span
                          className="material-symbols-outlined text-tertiary text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-body text-sm font-bold text-on-surface">
                          {word}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-xs text-on-surface-variant mt-2 font-medium relative z-10 bg-surface/50 inline-block px-3 py-1.5 rounded-lg border border-outline-variant/10">
                    {vocab.length} word{vocab.length === 1 ? "" : "s"} saved in
                    your bank.
                  </p>
                </>
              ) : (
                <p className="font-body text-sm text-on-surface-variant relative z-10">
                  Save words during conversations to see them here.
                </p>
              )}
            </section>

            {/* Actions */}
            <section className="bg-surface-container-low rounded-[2rem] p-6 flex flex-col gap-4 mt-auto border border-outline-variant/15 shadow-sm">
              <Link
                to="/explore"
                className="w-full bg-primary text-on-primary font-headline font-semibold text-lg py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-primary-dim transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
              >
                Continue Learning
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                to="/conversation"
                className="w-full bg-secondary-container/50 text-on-secondary-container font-headline font-semibold text-lg py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-secondary-container transition-all border border-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <span className="material-symbols-outlined">replay</span>
                {session ? "Try Same Scenario" : "Start Practicing"}
              </Link>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
