import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  mode: string;
  scenarioTitle: string;
  scenarioTopic: string;
  messages: Message[];
}

export default function History() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [historyList, setHistoryList] = useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  useEffect(() => {
    try {
      const pastHistoryStr = localStorage.getItem("verba_history");
      if (pastHistoryStr) {
        setHistoryList(JSON.parse(pastHistoryStr));
      }
    } catch (e) {
      console.error(e);
      showToast({
        message: "Could not load conversation history",
        type: "error",
      });
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("verba_history");
    setHistoryList([]);
    showToast({ message: "Conversation history cleared", type: "info" });
  };

  if (selectedEntry) {
    return (
      <PageTransition className="bg-surface text-on-surface font-body min-h-screen">
        <header className="px-6 pt-12 pb-6 sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant/10 shadow-sm flex items-center gap-4">
          <button
            onClick={() => setSelectedEntry(null)}
            className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center transition-colors hover:bg-secondary-container/80"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-headline font-bold">
              Conversation Log
            </h1>
            <p className="text-xs text-on-surface-variant font-label">
              {new Date(selectedEntry.date).toLocaleDateString()} - Mode:{" "}
              {selectedEntry.mode || "balanced"}
            </p>
          </div>
        </header>

        <main className="px-4 py-6 pb-32 flex flex-col gap-4">
          {selectedEntry.messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "p-4 rounded-2xl max-w-[85%]",
                msg.role === "model"
                  ? "bg-surface-container-high self-start rounded-tl-sm"
                  : "bg-primary text-on-primary self-end rounded-tr-sm",
              )}
            >
              <div
                className={cn(
                  "text-[10px] uppercase font-bold tracking-wider mb-1 opacity-70",
                  msg.role === "user"
                    ? "text-primary-container"
                    : "text-primary",
                )}
              >
                {msg.role === "model" ? "Verba AI" : "You"}
              </div>
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
            </div>
          ))}
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="bg-surface text-on-surface font-body min-h-screen">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-surface/80 backdrop-blur-md z-40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_back
            </span>
          </button>
          <h1 className="text-3xl font-headline font-bold">
            Past Conversations
          </h1>
        </div>
        {historyList.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-error text-sm font-label font-bold px-3 py-2 rounded-full hover:bg-error/10 transition-colors"
          >
            Clear
          </button>
        )}
      </header>

      <main className="px-6 py-4 pb-32">
        {historyList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 opacity-60">
            <span className="material-symbols-outlined text-6xl mb-4">
              forum
            </span>
            <p className="text-lg font-headline font-bold mb-1">
              No Past Conversations
            </p>
            <p className="text-sm">
              Talk to Verba to start building your history!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {historyList.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full bg-surface-container-lowest rounded-2xl p-5 ambient-shadow border border-outline-variant/20 flex flex-col items-start hover:bg-surface-container-low transition-colors text-left group"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      calendar_today
                    </span>
                    <span className="text-xs font-label font-bold">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs font-label bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full uppercase tracking-wider">
                    {entry.mode || "balanced"}
                  </span>
                </div>

                <p className="text-on-surface text-[15px] font-medium leading-relaxed line-clamp-2 w-full pr-8 relative">
                  "
                  {entry.messages.find((m) => m.role === "user")?.text ||
                    entry.messages[0]?.text}
                  "
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    chevron_right
                  </span>
                </p>
                <div className="mt-3 text-[12px] text-on-surface-variant font-label">
                  {entry.messages.length} messages
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
}
