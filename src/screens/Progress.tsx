import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { cn } from "../lib/utils";

interface HistoryEntry {
  id: string;
  date: string;
  mode: string;
  scenarioTitle: string;
  scenarioTopic: string;
  messages: { role: string; text: string }[];
}

interface SessionStats {
  totalSessions: number;
  totalMessages: number;
  vocabWords: number;
  fluencyScore: number;
  confidence: number;
  grammarAccuracy: number;
  topicMastery: {
    topic: string;
    icon: string;
    percent: number;
    count: number;
  }[];
  recentSessions: HistoryEntry[];
}

function loadStats(): SessionStats {
  let history: HistoryEntry[] = [];
  let vocab: string[] = [];
  try {
    const h = localStorage.getItem("verba_history");
    if (h) history = JSON.parse(h);
  } catch {
    /* ignore */
  }
  try {
    const v = localStorage.getItem("verba_vocab_bank");
    if (v) vocab = JSON.parse(v);
  } catch {
    /* ignore */
  }

  const totalSessions = history.length;
  const totalMessages = history.reduce(
    (sum, s) => sum + (s.messages?.length || 0),
    0,
  );
  const vocabWords = vocab.length;
  const avgMessages = totalSessions > 0 ? totalMessages / totalSessions : 0;

  const fluencyScore = Math.min(
    100,
    Math.round(30 + totalSessions * 6 + totalMessages * 0.3 + vocabWords * 0.1),
  );
  const confidence = Math.min(100, Math.round(40 + avgMessages * 8));
  const grammarAccuracy = Math.min(
    100,
    Math.round(50 + totalSessions * 4 + avgMessages * 2),
  );

  // Topic mastery
  const topicCounts: Record<string, number> = {};
  history.forEach((s) => {
    const t = s.scenarioTopic || "General";
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  });
  const topicIconMap: Record<string, string> = {
    Travel: "flight",
    Work: "work",
    "Daily Life": "chat",
    Dining: "restaurant",
    General: "psychology",
  };
  const topicMastery = Object.entries(topicCounts)
    .map(([topic, count]) => ({
      topic,
      icon: topicIconMap[topic] || "psychology",
      percent: Math.min(100, Math.round(20 + count * 15)),
      count,
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 4);

  return {
    totalSessions,
    totalMessages,
    vocabWords,
    fluencyScore,
    confidence,
    grammarAccuracy,
    topicMastery,
    recentSessions: history.slice(0, 6).reverse(),
  };
}

function getDayLabel(dateStr: string): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateStr).getDay()] || "—";
}

export default function Progress() {
  const [stats, setStats] = useState<SessionStats>(loadStats);

  useEffect(() => {
    setStats(loadStats());
    const onStorage = () => setStats(loadStats());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const fluencyOffset = useMemo(
    () => 276 - (276 * stats.fluencyScore) / 100,
    [stats.fluencyScore],
  );

  const hasData = stats.totalSessions > 0;

  return (
    <PageTransition className="bg-surface text-on-surface min-h-screen flex flex-col pb-24 md:pb-0 font-body">
      {/* TopAppBar */}
      <header className="bg-surface/90 backdrop-blur-md w-full top-0 sticky z-40 border-b border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9mJFSpWCbCgWREFRNE_fiaE5omJvV3aC2HAcHm1mKfsxSc-SXw1-92bPhEJ0TnKVvR3KHiXMZnj-vnBRotafiYcMfg1RQ3qbOv7D3ETNHRSosxW-n1fGuPUjpAyG0b_9dFz2UBTjMrvSFBs1tocnVMZvCt13u819qNPYJ93uaVeWaSXhjQ-xgSpAFZQgnBPoio7nqF2sqMo62Qt7U9fYsk7nATX6epwMlQy65B_GvDV6XHycD3lo6XIhGgSD6XvfXpA-CIK0CY3s"
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full border-2 border-primary/20 shadow-sm"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-primary font-headline tracking-tight">
              Resonant Mentor
            </h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors text-primary active:scale-95">
            <span className="material-symbols-outlined font-light text-[26px]">
              settings
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full px-4 md:px-8 py-8 flex flex-col gap-6 md:gap-10">
        {/* Dashboard Content */}
        <div className="flex-grow flex flex-col gap-8 md:gap-10 w-full max-w-4xl mx-auto">
          {hasData ? (
            <>
              {/* Hero Section / Overall Status */}
              <section className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-lowest p-8 md:p-12 shadow-[0_12px_40px_-8px_rgba(53,47,69,0.08)] border border-outline-variant/20 flex flex-col md:flex-row items-center gap-10 md:gap-12">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-container rounded-full blur-[100px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-container rounded-full blur-[80px] opacity-40 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

                <div className="flex-grow space-y-5 text-center md:text-left z-10">
                  <h2 className="font-headline text-4xl md:text-5xl text-primary font-extrabold leading-tight tracking-tight">
                    {stats.fluencyScore > 60
                      ? "Finding Your Voice"
                      : "Keep Practicing"}
                  </h2>
                  <p className="font-body text-on-surface-variant text-lg max-w-lg font-medium leading-relaxed">
                    {stats.totalSessions} session
                    {stats.totalSessions === 1 ? "" : "s"} completed,{" "}
                    {stats.totalMessages} message
                    {stats.totalMessages === 1 ? "" : "s"} exchanged,{" "}
                    {stats.vocabWords} word
                    {stats.vocabWords === 1 ? "" : "s"} saved.
                  </p>
                </div>

                <div className="flex-shrink-0 z-10 relative">
                  {/* Circular Progress Hero */}
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-surface-container-high flex items-center justify-center relative shadow-[inset_0_4px_16px_rgba(0,0,0,0.06)] border border-outline-variant/10">
                    <svg
                      className="absolute w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="text-secondary-container"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="none"
                        r="44"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-secondary drop-shadow-[0_4px_12px_rgba(57,104,84,0.4)]"
                        strokeWidth="8"
                        strokeDasharray="276"
                        strokeDashoffset={fluencyOffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        r="44"
                        cx="50"
                        cy="50"
                        style={{
                          transition: "stroke-dashoffset 1.5s ease-out",
                        }}
                      />
                    </svg>
                    <div className="text-center">
                      <span className="font-headline text-[3.5rem] font-black text-primary tracking-tighter">
                        {stats.fluencyScore}
                      </span>
                      <span className="text-2xl font-bold text-primary">%</span>
                      <div className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">
                        Fluency Score
                      </div>
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
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        record_voice_over
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary bg-secondary-container px-3 py-1.5 rounded-full border border-secondary/20 shadow-sm">
                      <span className="material-symbols-outlined text-[16px] font-bold">
                        trending_up
                      </span>{" "}
                      +{Math.min(stats.totalSessions * 2, 25)}%
                    </span>
                  </div>
                  <div className="mb-2">
                    <h3 className="font-headline text-xl text-on-surface font-bold tracking-tight">
                      Speaking Confidence
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1.5">
                      {stats.totalSessions} session
                      {stats.totalSessions === 1 ? "" : "s"} practiced
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                      <div
                        className="h-full bg-secondary rounded-full shadow-[0_2px_4px_rgba(57,104,84,0.3)] transition-all duration-700"
                        style={{ width: `${stats.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stat Card 2: Grammar Accuracy */}
                <div className="bg-surface-container-lowest rounded-[2rem] p-7 md:p-8 shadow-[0_8px_24px_-6px_rgba(53,47,69,0.05)] border border-outline-variant/20 flex flex-col gap-6 lg:col-span-2 transition-all hover:bg-primary-container/10 group hover:border-primary/20">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[1.25rem] bg-primary-container/60 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          spellcheck
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline text-xl text-on-surface font-bold tracking-tight">
                          Grammar Accuracy
                        </h3>
                        <p className="font-body text-sm text-on-surface-variant font-medium mt-1.5">
                          Based on conversation flow
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-bold text-tertiary-dim bg-tertiary-container/60 px-4 py-1.5 rounded-full border border-tertiary-dim/20 shadow-sm hidden sm:flex">
                      {stats.grammarAccuracy >= 75 ? "Goal Met" : "Improving"}
                    </span>
                  </div>

                  {/* Weekly trend bars from real session lengths */}
                  <div className="mt-2 flex-grow flex items-end justify-between gap-3 h-32 pb-2 px-1">
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const session = stats.recentSessions[i];
                      const pct = session
                        ? Math.min(
                            100,
                            Math.max(15, (session.messages?.length || 0) * 12),
                          )
                        : 0;
                      const isToday = i === 5;
                      return (
                        <div
                          key={i}
                          className="w-full bg-surface-container-highest rounded-t-xl relative group/bar hover:bg-primary-container transition-colors duration-300 flex items-end overflow-hidden"
                          style={{ height: `${Math.max(pct, 10)}%` }}
                        >
                          <div
                            className={cn(
                              "w-full rounded-t-xl h-full group-hover/bar:bg-primary transition-colors",
                              isToday
                                ? "bg-primary"
                                : `bg-primary/${40 + i * 10}`,
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs font-headline font-bold text-on-surface-variant px-2 uppercase tracking-wider">
                    {stats.recentSessions.length > 0
                      ? stats.recentSessions.map((s, i) => (
                          <span
                            key={i}
                            className={
                              i === stats.recentSessions.length - 1
                                ? "text-primary font-black"
                                : ""
                            }
                          >
                            {getDayLabel(s.date)}
                          </span>
                        ))
                      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Today"].map(
                          (d, i) => (
                            <span
                              key={i}
                              className={
                                i === 5 ? "text-primary font-black" : ""
                              }
                            >
                              {d}
                            </span>
                          ),
                        )}
                  </div>
                </div>
              </div>

              {/* Topic Mastery List */}
              <section className="bg-surface-container-low/50 rounded-[2.5rem] p-7 md:p-10 border border-outline-variant/15 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-headline text-2xl font-extrabold text-primary tracking-tight">
                    Topic Mastery
                  </h3>
                </div>
                <div className="flex flex-col gap-5">
                  {stats.topicMastery.map((topic) => (
                    <div
                      key={topic.topic}
                      className="bg-surface-container-lowest p-5 rounded-2xl flex items-center gap-5 transition-all hover:bg-primary-container/10 border border-outline-variant/20 hover:border-primary/20 shadow-sm cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-[1rem] bg-surface-container flex items-center justify-center text-primary-dim shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span
                          className="material-symbols-outlined text-[24px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {topic.icon}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-headline font-bold text-on-surface text-base md:text-lg mb-2">
                          {topic.topic}
                        </h4>
                        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
                          <div
                            className="bg-secondary h-full rounded-full shadow-[0_1px_3px_rgba(57,104,84,0.3)] transition-all duration-700"
                            style={{ width: `${topic.percent}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 w-16">
                        <span className="font-headline font-black text-secondary text-xl">
                          {topic.percent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center text-center py-20 px-6">
              <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">
                query_stats
              </span>
              <p className="text-lg font-headline font-bold text-on-surface mb-2">
                No progress yet
              </p>
              <p className="text-sm text-on-surface-variant max-w-xs mb-8">
                Complete your first conversation to see personalized fluency
                stats and topic mastery.
              </p>
              <Link
                to="/explore"
                className="px-6 py-3 bg-primary text-on-primary font-headline font-bold rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Start Practicing
              </Link>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
