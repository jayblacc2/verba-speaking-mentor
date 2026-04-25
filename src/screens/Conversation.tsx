import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useToast } from "../contexts/ToastContext";
import { SCENARIOS } from "../data/scenarios";
import { cn, vibrate } from "../lib/utils";
import {
  analyzeSpeech,
  generateAIResponse,
  generateSpeech,
} from "../services/ai";

export default function Conversation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  const [selectedScenario, setSelectedScenario] = useState<any>(
    location.state?.scenario || null,
  );

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [exitTarget, setExitTarget] = useState<"/summary" | "/explore" | null>(
    null,
  );
  const [practiceMode, setPracticeMode] = useState<
    "balanced" | "grammar" | "pronunciation"
  >("balanced");
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const initialAiMessage = selectedScenario
    ? `Welcome to the ${selectedScenario.title} scenario. I will be playing the role of your conversation partner. Let's start!`
    : "Hi! What would you like to talk about today?";

  const [history, setHistory] = useState<
    { role: "user" | "model"; parts: { text: string }[] }[]
  >([
    {
      role: "model",
      parts: [{ text: initialAiMessage }],
    },
  ]);

  const [aiMessage, setAiMessage] = useState(initialAiMessage);
  const [userTranscript, setUserTranscript] = useState("...");
  const [feedback, setFeedback] = useState<any>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("verba_vocab_bank");
      if (stored) setSavedWords(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const handleSaveWord = (word: string) => {
    if (!savedWords.includes(word)) {
      const newWords = [...savedWords, word];
      setSavedWords(newWords);
      localStorage.setItem("verba_vocab_bank", JSON.stringify(newWords));
      showToast({
        message: `"${word}" saved to Vocabulary Bank`,
        type: "success",
      });
    } else {
      const newWords = savedWords.filter((w) => w !== word);
      setSavedWords(newWords);
      localStorage.setItem("verba_vocab_bank", JSON.stringify(newWords));
      showToast({
        message: `"${word}" removed from Vocabulary Bank`,
        type: "info",
      });
    }
  };

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  const playAIResponse = async (text: string) => {
    setIsPlaying(true);
    try {
      const result = await generateSpeech(text);
      if (result && result.data) {
        let mimeType = result.mimeType || "audio/pcm;rate=24000";

        // Force PCM parsing for TTS preview
        if (mimeType.includes("pcm") || !mimeType) {
          // Play raw PCM audio using Web Audio API
          const binaryString = atob(result.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const int16Array = new Int16Array(bytes.buffer);

          let rate = 24000;
          const rateMatch = mimeType?.match(/rate=(\d+)/);
          if (rateMatch) rate = parseInt(rateMatch[1], 10);

          if (!(window as any).sharedAudioCtx) {
            (window as any).sharedAudioCtx = new (
              window.AudioContext || (window as any).webkitAudioContext
            )();
          }
          const audioCtx = (window as any).sharedAudioCtx;
          if (audioCtx.state === "suspended") {
            await audioCtx.resume();
          }

          const audioBuffer = audioCtx.createBuffer(1, int16Array.length, rate);
          const channelData = audioBuffer.getChannelData(0);
          for (let i = 0; i < int16Array.length; i++) {
            channelData[i] = int16Array[i] / 32768.0;
          }
          const source = audioCtx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioCtx.destination);
          source.onended = () => setIsPlaying(false);
          source.start();
        } else {
          // Play standard audio formats
          const audio = new Audio(`data:${mimeType};base64,${result.data}`);
          audio.onended = () => setIsPlaying(false);
          audio.onerror = (err) => {
            console.error("Audio error", err);
            setIsPlaying(false);
            fallbackSpeech(text);
          };
          await audio.play();
        }
      } else {
        fallbackSpeech(text);
      }
    } catch (err) {
      console.error("Audio play failed", err);
      fallbackSpeech(text);
    }
  };

  const fallbackSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis API not supported.");
      setIsPlaying(false);
    }
  };

  const handleSpeak = () => {
    if (isPlaying) {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!(window as any).sharedAudioCtx) {
      (window as any).sharedAudioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    const audioCtx = (window as any).sharedAudioCtx;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    playAIResponse(aiMessage);
  };

  const handlePointerDown = async (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    if (!(window as any).sharedAudioCtx) {
      (window as any).sharedAudioCtx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    const audioCtx = (window as any).sharedAudioCtx;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Stop any current playing audio
    if (isPlaying && "speechSynthesis" in window) speechSynthesis.cancel();
    setIsPlaying(false);
    setIsProcessing(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setMicPermissionDenied(false);
      vibrate(50);
    } catch (err) {
      console.error("Error accessing microphone", err);
      setMicPermissionDenied(true);
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  const processAudio = async () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: mediaRecorderRef.current?.mimeType || "audio/webm",
    });

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      const base64AudioPart = base64data.split(",")[1];
      const mimeType = base64data.split(";")[0].split(":")[1];

      try {
        const analysis = await analyzeSpeech(
          base64AudioPart,
          mimeType,
          practiceMode,
        );

        if (analysis && analysis.transcript) {
          setUserTranscript(analysis.transcript);
          setFeedback(analysis);

          const newHistory = [
            ...history,
            { role: "user", parts: [{ text: analysis.transcript }] },
          ] as { role: "user" | "model"; parts: { text: string }[] }[];
          setHistory(newHistory);

          const aiReply = await generateAIResponse(
            newHistory,
            practiceMode,
            selectedScenario
              ? `${selectedScenario.title} - ${selectedScenario.description}`
              : "",
          );
          if (aiReply) {
            setAiMessage(aiReply);
            setHistory([
              ...newHistory,
              { role: "model", parts: [{ text: aiReply }] },
            ]);
            playAIResponse(aiReply);
          }
        }
      } catch (err) {
        console.error("AI processing failed", err);
      } finally {
        setIsProcessing(false);
      }
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Check if we are actually recording
    if (
      !mediaRecorderRef.current ||
      mediaRecorderRef.current.state === "inactive"
    ) {
      setIsRecording(false);
      setIsProcessing(false);
      return;
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    setIsRecording(false);
    setIsProcessing(true);
    vibrate([30, 20, 30]);

    // Simulate delay to handle natural pauses before finalizing transcription
    processingTimeoutRef.current = setTimeout(() => {
      processAudio();
    }, 1500);
  };

  const handleExitRequest = (target: "/summary" | "/explore") => {
    setExitTarget(target);
    setShowExitConfirm(true);
  };

  const handleExitConfirmed = () => {
    // Only save history if they engaged beyond the first message
    if (history.length > 1) {
      try {
        const pastHistoryStr = localStorage.getItem("verba_history");
        const pastHistory = pastHistoryStr ? JSON.parse(pastHistoryStr) : [];
        const newEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          mode: practiceMode,
          scenarioTitle: selectedScenario?.title || "Free Conversation",
          scenarioTopic: selectedScenario?.topic || "General",
          messages: history.map((item) => ({
            role: item.role,
            text: item.parts[0].text,
          })),
        };
        localStorage.setItem(
          "verba_history",
          JSON.stringify([newEntry, ...pastHistory]),
        );
        showToast({ message: "Session saved to history", type: "success" });
      } catch (e) {
        console.error("Failed to save history", e);
        showToast({ message: "Failed to save session history", type: "error" });
      }
    }
    navigate(exitTarget || "/summary");
  };

  if (!selectedScenario) {
    return (
      <PageTransition className="bg-surface text-on-surface font-body flex-1 flex flex-col items-center justify-center p-6 text-center z-50 min-h-[calc(100dvh-4rem)] md:min-h-0">
        <h2 className="text-3xl font-headline font-bold mb-4">
          Choose a Topic
        </h2>
        <p className="text-on-surface-variant font-body mb-8 max-w-md">
          Select a topic to focus on for this conversation, or return to Explore
          to see all scenarios.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {SCENARIOS.slice(0, 6).map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario);
                const msg = `Welcome to the ${scenario.title} scenario. I will be playing the role of your conversation partner. Let's start!`;
                setAiMessage(msg);
                setHistory([{ role: "model", parts: [{ text: msg }] }]);
              }}
              className="bg-surface-container-low hover:bg-surface-container-high transition-colors px-6 py-4 rounded-2xl border border-outline-variant/20 flex items-center justify-start text-left w-full ambient-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mr-4">
                <span className="material-symbols-outlined">
                  {scenario.icon}
                </span>
              </div>
              <div>
                <h3 className="font-headline font-bold">{scenario.title}</h3>
                <p className="text-xs text-on-surface-variant font-label">
                  {scenario.topic}
                </p>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/explore")}
          className="mt-8 text-primary hover:bg-primary/10 px-6 py-2 rounded-full font-label font-bold transition-colors"
        >
          See All Scenarios
        </button>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
      <header className="w-full sticky top-0 bg-surface/90 backdrop-blur-md flex justify-between items-center px-6 py-4 z-40 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleExitRequest("/explore")}
            className="text-primary hover:bg-primary/10 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_back
            </span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowModeSelector(!showModeSelector)}
              className="flex items-center gap-1 font-headline text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              Verba
              <span
                className="material-symbols-outlined text-[20px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {practiceMode === "grammar"
                  ? "spellcheck"
                  : practiceMode === "pronunciation"
                    ? "record_voice_over"
                    : "tune"}
              </span>
            </button>

            {showModeSelector && (
              <div className="absolute top-full left-0 mt-2 bg-surface rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden w-48 z-50">
                <button
                  onClick={() => {
                    setPracticeMode("balanced");
                    setShowModeSelector(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-surface-container",
                    practiceMode === "balanced" &&
                      "bg-primary/10 text-primary font-medium",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    tune
                  </span>{" "}
                  Balanced
                </button>
                <button
                  onClick={() => {
                    setPracticeMode("grammar");
                    setShowModeSelector(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-surface-container",
                    practiceMode === "grammar" &&
                      "bg-primary/10 text-primary font-medium",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    spellcheck
                  </span>{" "}
                  Focus: Grammar
                </button>
                <button
                  onClick={() => {
                    setPracticeMode("pronunciation");
                    setShowModeSelector(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-surface-container border-t border-outline-variant/10",
                    practiceMode === "pronunciation" &&
                      "bg-primary/10 text-primary font-medium",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    record_voice_over
                  </span>{" "}
                  Focus: Speech
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden hover:opacity-80 transition-opacity cursor-pointer shadow-sm border border-outline-variant/30">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMfyyNBxbOztPovli1CWfrZq1UYrNRUSyDU4XUv9sFhfKRckMflSQpdVWwfmWzaUGn4qbxdBO3nFYdncZ35wklqkndXvBBxOZxms57dIFdTXIk2Fkju8UkQS9YrA2SgUwWO4eRzNfimenHPqGOYgXYOgLidOBiioBuZZPlHm81kqAQKEZ4_W-o1dQsx-rF0UcnLncWEW7DuVyQtvc8D3ldFJmLcB5UvVyN2j9Dhmryjx60lzRDymGsaHEOsYkmhxWtq9A1pIFNs2M"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 md:px-8 pb-32 pt-6 relative max-w-4xl mx-auto w-full">
        {/* Target Vocabulary Peek Bar */}
        <div className="mb-4 self-center max-w-full overflow-x-auto no-scrollbar">
          <div className="bg-surface-container-lowest rounded-full px-5 py-2.5 flex items-center gap-3 border border-outline-variant/20 shadow-sm whitespace-nowrap">
            <span className="text-sm font-label text-on-surface-variant flex items-center gap-1.5 font-medium">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}
              >
                lightbulb
              </span>
              Topic Concept:
            </span>
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-primary bg-primary-container/40 px-3 py-1 rounded-full">
                {selectedScenario.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Mic Permission Denied Inline Banner */}
        <AnimatePresence>
          {micPermissionDenied && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 w-full max-w-lg mx-auto"
            >
              <div className="bg-error-container/60 border border-error/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-error text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mic_off
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-bold text-on-surface text-sm mb-1">
                    Microphone Access Blocked
                  </p>
                  <p className="text-on-surface-variant text-[13px] leading-relaxed mb-3">
                    Verba needs microphone access to hear your voice. Please
                    enable it in your browser settings and try again.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => {
                        try {
                          await navigator.mediaDevices.getUserMedia({
                            audio: true,
                          });
                          setMicPermissionDenied(false);
                          showToast({
                            message: "Microphone access granted",
                            type: "success",
                          });
                        } catch {
                          showToast({
                            message:
                              "Still no microphone access. Check your browser settings.",
                            type: "error",
                            duration: 5000,
                          });
                        }
                      }}
                      className="bg-error text-on-error text-xs font-label font-bold px-4 py-2 rounded-full hover:bg-error/90 transition-colors active:scale-95"
                    >
                      Retry Access
                    </button>
                    <button
                      onClick={() => setMicPermissionDenied(false)}
                      className="text-on-surface-variant text-xs font-label font-bold px-3 py-2 rounded-full hover:bg-surface-container-high transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Dialogue Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 mb-8 min-h-0">
          {/* Main Chat Column */}
          <div className="md:col-span-8 md:col-start-1 flex flex-col min-h-0">
            {/* AI Persona */}
            <div className="relative mb-4 flex flex-col items-center shrink-0">
              <div className="relative">
                {isPlaying && (
                  <>
                    <div
                      className={cn(
                        "absolute inset-0 bg-primary/20 rounded-full blur-xl scale-[1.5]",
                        !prefersReducedMotion && "animate-pulse",
                      )}
                    ></div>
                    <div
                      className={cn(
                        "absolute inset-[-8px] border-2 border-primary/30 rounded-[44px] opacity-50",
                        !prefersReducedMotion && "animate-ping duration-1000",
                      )}
                    ></div>
                  </>
                )}
                <div
                  className={cn(
                    "relative z-10 w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-gradient-to-br from-primary to-primary-dim rounded-[32px] md:rounded-[36px] flex items-center justify-center shadow-[0_10px_25px_rgba(59,130,246,0.2)] transition-transform duration-500",
                    isPlaying ? "scale-105" : "scale-100",
                  )}
                >
                  <span
                    className="material-symbols-outlined text-white"
                    style={{
                      fontVariationSettings: "'FILL' 1",
                      fontSize: "40px",
                    }}
                  >
                    smart_toy
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/30 text-on-surface-variant font-label text-xs font-semibold uppercase tracking-wider">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full mb-[1px]",
                    isPlaying
                      ? cn(
                          "bg-primary",
                          !prefersReducedMotion && "animate-pulse",
                        )
                      : "bg-outline-variant",
                  )}
                ></span>
                AI Tutor {isPlaying ? "Speaking..." : "Listening"}
              </div>
            </div>

            {/* Conversation History */}
            <div className="flex-1 overflow-y-auto min-h-0 mb-4 pr-1 space-y-3">
              {history.map((msg, i) => {
                const isUser = msg.role === "user";
                const isLatest = i === history.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={
                      isLatest && !prefersReducedMotion
                        ? { opacity: 0, y: 12 }
                        : false
                    }
                    animate={isLatest ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "flex w-full",
                      isUser ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                        isUser
                          ? "bg-primary text-on-primary rounded-tr-sm"
                          : "bg-surface-container-high text-on-surface rounded-tl-sm",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[10px] uppercase font-bold tracking-wider block mb-1 opacity-70",
                          isUser ? "text-primary-container" : "text-primary",
                        )}
                      >
                        {isUser ? "You" : "Verba"}
                      </span>
                      {msg.parts[0].text}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Current AI Message Highlight */}
            <div className="text-center shrink-0 mb-4">
              <p className="text-xl md:text-2xl font-medium leading-[1.4] max-w-[500px] mx-auto text-on-surface">
                "{aiMessage}"
              </p>
            </div>

            <div className="flex gap-3 justify-center shrink-0">
              <button
                onClick={handleSpeak}
                className={cn(
                  "bg-surface-container-high rounded-full px-5 h-12 flex items-center justify-center gap-2 transition-all font-label font-medium text-sm",
                  isPlaying
                    ? "text-primary bg-primary-container/40 scale-95"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-container/40",
                )}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: "'FILL' 0",
                    fontSize: "20px",
                  }}
                >
                  {isPlaying ? "stop_circle" : "replay"}
                </span>
                {isPlaying ? "Stop" : "Replay Audio"}
              </button>
              <button className="bg-surface-container-high rounded-full px-5 h-12 text-on-surface-variant hover:text-primary hover:bg-primary-container/40 flex items-center justify-center gap-2 transition-all font-label font-medium text-sm">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: "'FILL' 0",
                    fontSize: "20px",
                  }}
                >
                  translate
                </span>
                Translate
              </button>
              <button
                onClick={() => handleExitRequest("/summary")}
                className="bg-outline-variant/30 text-on-surface-variant font-label font-medium px-6 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors text-sm"
              >
                End Session
              </button>
            </div>
          </div>

          {/* Context/Grammar Sidebar */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-6 justify-start bg-surface-container-lowest border-l border-outline-variant p-6 md:p-8 shrink-0">
            {/* Grammar Feedback Card */}
            {feedback?.grammarTip && feedback.grammarTip.wrong && (
              <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary-container relative overflow-hidden text-left mb-6 max-w-[480px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider block">
                    Grammar Feedback
                  </span>
                  <button
                    onClick={() => handleSaveWord(feedback.grammarTip.right)}
                    className="text-tertiary hover:text-tertiary-dim transition-colors"
                    title={
                      savedWords.includes(feedback.grammarTip.right)
                        ? "Remove from Vocabulary Bank"
                        : "Save to Vocabulary Bank"
                    }
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: savedWords.includes(
                          feedback.grammarTip.right,
                        )
                          ? "'FILL' 1"
                          : "'FILL' 0",
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
                <p className="text-on-surface-variant text-[15px] mb-1 line-through">
                  "{feedback.grammarTip.wrong}"
                </p>
                <p className="text-tertiary text-[18px] font-semibold">
                  "{feedback.grammarTip.right}"
                </p>
                <div className="text-tertiary-dim text-[12px] mt-2 font-medium">
                  {feedback.grammarTip.explanation}
                </div>
              </div>
            )}

            {!feedback && (
              <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary-container relative overflow-hidden text-left mb-6 max-w-[480px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider block">
                    Grammar Feedback
                  </span>
                  <button
                    onClick={() => handleSaveWord("was waiting")}
                    className="text-tertiary hover:text-tertiary-dim transition-colors"
                    title={
                      savedWords.includes("was waiting")
                        ? "Remove from Vocabulary Bank"
                        : "Save to Vocabulary Bank"
                    }
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: savedWords.includes(
                          "was waiting",
                        )
                          ? "'FILL' 1"
                          : "'FILL' 0",
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
                <p className="text-on-surface-variant text-[15px] mb-1 line-through">
                  "I was wait for the train."
                </p>
                <p className="text-tertiary text-[18px] font-semibold">
                  "I was waiting for the train."
                </p>
                <div className="text-tertiary-dim text-[12px] mt-2 font-medium">
                  Use the past continuous ("was waiting") to describe an action
                  that was in progress in the past.
                </div>
              </div>
            )}

            {/* Pronunciation Feedback Card */}
            {feedback?.feedback && (
              <div className="bg-secondary-container rounded-2xl p-5 border border-secondary-container relative overflow-hidden text-left mb-6 max-w-[480px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-secondary-dim uppercase tracking-wider block">
                    Speech Feedback
                  </span>
                </div>
                <div className="space-y-3 mt-3">
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-1">
                      <span>Enunciation & Tone</span>
                      <span className="text-secondary-dim">
                        Score: {feedback.feedback.fluencyScore}
                      </span>
                    </div>
                    <div className="w-full bg-outline-variant/30 rounded-full h-1.5">
                      <div
                        className="bg-secondary-dim h-1.5 rounded-full"
                        style={{ width: `${feedback.feedback.fluencyScore}%` }}
                      ></div>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-1.5 leading-snug">
                      <strong>Tone:</strong> {feedback.feedback.tone} <br />
                      <strong>Enunciation:</strong>{" "}
                      {feedback.feedback.enunciation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!feedback && (
              <div className="bg-secondary-container rounded-2xl p-5 border border-secondary-container relative overflow-hidden text-left mb-6 max-w-[480px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-secondary-dim uppercase tracking-wider block">
                    Pronunciation Feedback
                  </span>
                  <button
                    onClick={() => handleSaveWord("wait")}
                    className="text-secondary-dim hover:text-secondary transition-colors"
                    title={
                      savedWords.includes("wait")
                        ? "Remove from Vocabulary Bank"
                        : "Save to Vocabulary Bank"
                    }
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: savedWords.includes("wait")
                          ? "'FILL' 1"
                          : "'FILL' 0",
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
                <div className="space-y-3 mt-3">
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-1">
                      <span>Enunciation</span>
                      <span className="text-secondary-dim">Needs Work</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 rounded-full h-1.5">
                      <div
                        className="bg-secondary-dim h-1.5 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-1.5 leading-snug">
                      Try to clearly pronounce the 't' in <strong>wait</strong>.
                      It sounded like "way".
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-1">
                      <span>Pacing & Pitch</span>
                      <span className="text-primary">Great!</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interim Transcript */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant flex flex-col justify-end max-w-[480px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      isRecording || isProcessing
                        ? "bg-primary animate-pulse"
                        : "bg-outline-variant",
                    )}
                  ></div>
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest font-label",
                      isRecording || isProcessing
                        ? "text-primary"
                        : "text-outline-variant",
                    )}
                  >
                    {isRecording
                      ? "Listening..."
                      : isProcessing
                        ? "Processing..."
                        : "Not Listening"}
                  </span>
                </div>
                {/* Confidence Level */}
                {feedback && (
                  <div
                    className="flex items-center gap-2"
                    title={`Fluency: ${feedback.feedback?.fluencyScore}`}
                  >
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                      Fluency
                    </span>
                    <div className="flex gap-1 h-3.5">
                      <div
                        className={cn(
                          "w-1.5 rounded-full",
                          feedback.feedback?.fluencyScore > 20
                            ? "bg-tertiary"
                            : "bg-outline-variant",
                        )}
                      ></div>
                      <div
                        className={cn(
                          "w-1.5 rounded-full",
                          feedback.feedback?.fluencyScore > 40
                            ? "bg-tertiary"
                            : "bg-outline-variant",
                        )}
                      ></div>
                      <div
                        className={cn(
                          "w-1.5 rounded-full",
                          feedback.feedback?.fluencyScore > 60
                            ? "bg-tertiary"
                            : "bg-outline-variant",
                        )}
                      ></div>
                      <div
                        className={cn(
                          "w-1.5 rounded-full",
                          feedback.feedback?.fluencyScore > 80
                            ? "bg-tertiary"
                            : "bg-outline-variant",
                        )}
                      ></div>
                    </div>
                  </div>
                )}
                {!feedback && (
                  <div
                    className="flex items-center gap-2"
                    title="Speech-to-Text Confidence: High"
                  >
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                      Confidence
                    </span>
                    <div className="flex gap-1 h-3.5">
                      <div className="w-1.5 bg-tertiary rounded-full"></div>
                      <div className="w-1.5 bg-tertiary rounded-full"></div>
                      <div className="w-1.5 bg-tertiary rounded-full"></div>
                      <div className="w-1.5 bg-outline-variant rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
              <p className="font-body text-lg text-on-surface font-medium opacity-90 leading-relaxed">
                "{userTranscript}"
              </p>
            </div>
          </div>
        </div>

        {/* Press to Talk Control Area */}
        <div className="fixed bottom-[90px] md:bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-1/2 lg:left-[calc(50%+9rem)] lg:-translate-x-1/2 z-40 pointer-events-none w-full max-w-sm px-4">
          <div className="pointer-events-auto bg-surface/80 backdrop-blur-xl rounded-full p-2 shadow-[0_12px_32px_-4px_rgba(53,47,69,0.15)] border border-outline-variant/20 flex items-center justify-between">
            <button className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                keyboard
              </span>
            </button>
            <div className="relative flex items-center justify-center">
              {isRecording && (
                <div
                  className={cn(
                    "absolute inset-0 bg-error/30 rounded-full blur-lg scale-150",
                    !prefersReducedMotion && "animate-pulse",
                  )}
                ></div>
              )}
              <button
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onContextMenu={(e) => e.preventDefault()}
                className={cn(
                  "relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all duration-300 group border-none text-white select-none touch-none",
                  isRecording
                    ? "bg-error scale-95"
                    : isProcessing
                      ? "bg-secondary scale-100 animate-pulse"
                      : "bg-primary hover:scale-105 active:scale-95",
                )}
              >
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isProcessing ? "more_horiz" : "mic"}
                </span>
              </button>
            </div>
            <button className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                more_horiz
              </span>
            </button>
          </div>
          <div className="text-center mt-3 pointer-events-auto">
            <span className="text-[13px] text-on-surface-variant font-medium">
              Hold to speak (English)
            </span>
          </div>
        </div>
      </main>

      {/* Exit Confirmation Dialog */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-surface rounded-3xl p-6 w-full max-w-sm shadow-xl flex flex-col gap-4 border border-outline-variant/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    warning
                  </span>
                </div>
                <h3 className="font-headline text-[22px] font-bold text-on-surface">
                  Are you sure?
                </h3>
              </div>
              <p className="text-on-surface-variant font-body text-base">
                Are you sure you want to{" "}
                {exitTarget === "/summary"
                  ? "end this session"
                  : "leave this conversation"}
                ?
                {exitTarget === "/explore" &&
                  " Your current progress will not be saved."}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-3 rounded-full font-label font-bold tracking-wide bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface hover:text-on-surface border border-outline-variant/10 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExitConfirmed}
                  className="flex-1 py-3 rounded-full font-label font-bold tracking-wide bg-error text-on-error hover:bg-error/90 transition-colors shadow-sm shadow-error/20 active:scale-95"
                >
                  {exitTarget === "/summary" ? "End Session" : "Leave"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
