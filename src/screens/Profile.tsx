import { useState } from "react";
import { Link } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { useTheme } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { cn } from "../lib/utils";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("Alex Johnson");
  const [learningGoal, setLearningGoal] = useState(
    "Conversational fluency for travel",
  );
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=33");
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const [editName, setEditName] = useState(name);
  const [editGoal, setEditGoal] = useState(learningGoal);

  const handleSave = () => {
    setName(editName);
    setLearningGoal(editGoal);
    setIsEditing(false);
    showToast({ message: "Profile updated successfully", type: "success" });
  };

  return (
    <PageTransition className="bg-surface text-on-surface font-body min-h-screen">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-surface/80 backdrop-blur-md z-40 flex items-center justify-between">
        <h1 className="text-3xl font-headline font-bold">Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditName(name);
                setEditGoal(learningGoal);
                setIsEditing(false);
              }}
              className="text-on-surface-variant text-sm font-label font-bold px-3 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-primary text-on-primary text-sm font-label font-bold px-4 py-2 rounded-full shadow-sm"
            >
              Save
            </button>
          </div>
        )}
      </header>

      <main className="px-6 py-6 pb-32">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-sm"
            />
            {isEditing && (
              <button
                onClick={() => {
                  // In a real app, this would open a file picker
                  const newAvatarId = Math.floor(Math.random() * 70);
                  setAvatar(`https://i.pravatar.cc/150?img=${newAvatarId}`);
                }}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm border-2 border-surface"
              >
                <span className="material-symbols-outlined text-[16px]">
                  photo_camera
                </span>
              </button>
            )}
          </div>

          {!isEditing ? (
            <h2 className="text-2xl font-headline font-bold mb-1">{name}</h2>
          ) : (
            <div className="w-full max-w-sm mb-2">
              <label className="text-[12px] font-label font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">
                Display Name
              </label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-high rounded-xl font-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-label font-bold uppercase tracking-wide">
              Intermediate
            </span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-label font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                local_fire_department
              </span>{" "}
              14 Day Streak
            </span>
          </div>
        </div>

        {/* Level and XP Section */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow mb-6 border border-outline-variant/20 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-headline font-bold text-lg text-on-surface">
              Level 4: Conversationalist
            </span>
            <span className="font-label font-bold text-primary text-sm">
              1,240 XP
            </span>
          </div>
          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="w-full flex justify-between text-xs font-label text-on-surface-variant font-medium">
            <span>Level 4</span>
            <span>260 XP to Level 5</span>
          </div>
        </div>

        {/* Goal Section */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow mb-6 border border-outline-variant/20">
          <h3 className="text-sm font-label font-bold text-outline uppercase tracking-wider mb-3">
            Learning Goal
          </h3>
          {!isEditing ? (
            <p className="font-body text-on-surface-variant text-[15px] leading-relaxed flex items-start gap-3">
              <span className="material-symbols-outlined text-primary shrink-0">
                flag
              </span>
              {learningGoal}
            </p>
          ) : (
            <textarea
              value={editGoal}
              onChange={(e) => setEditGoal(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-high rounded-xl font-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow min-h-[80px]"
            />
          )}
        </div>

        {/* Theme Preference */}
        <div className="mt-8 mb-2">
          <h3 className="text-sm font-label font-bold text-outline-variant uppercase tracking-wider mb-3 px-2">
            Appearance
          </h3>
          <button
            onClick={toggleTheme}
            className="w-full bg-surface-container-lowest rounded-2xl p-4 ambient-shadow border border-outline-variant/20 flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </span>
              <span className="font-body text-on-surface font-medium">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <div
              className={cn(
                "w-12 h-7 rounded-full relative transition-colors duration-300",
                theme === "dark" ? "bg-primary" : "bg-outline-variant",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-on-primary shadow-sm transition-transform duration-300",
                  theme === "dark" ? "translate-x-6" : "translate-x-1",
                )}
              />
            </div>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center justify-between mt-8 mb-4 px-2">
          <h3 className="text-sm font-label font-bold text-outline-variant uppercase tracking-wider">
            Recent Activity
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-5 ambient-shadow border border-outline-variant/20 flex flex-col items-center justify-center text-center">
            <span
              className="material-symbols-outlined text-secondary mb-2 text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              chat
            </span>
            <span className="text-2xl font-headline font-bold text-on-surface mb-1">
              12
            </span>
            <span className="text-xs font-label text-on-surface-variant">
              Conversations
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-5 ambient-shadow border border-outline-variant/20 flex flex-col items-center justify-center text-center">
            <span
              className="material-symbols-outlined text-tertiary mb-2 text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology
            </span>
            <span className="text-2xl font-headline font-bold text-on-surface mb-1">
              340
            </span>
            <span className="text-xs font-label text-on-surface-variant">
              Words Learned
            </span>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="flex items-center justify-between mt-8 mb-4 px-2">
          <h3 className="text-sm font-label font-bold text-outline-variant uppercase tracking-wider">
            Achievements
          </h3>
          <button className="text-primary text-xs font-label font-bold tracking-wide">
            VIEW ALL
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {/* Unlocked Badge */}
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-4 ambient-shadow border border-outline-variant/20 flex flex-col items-center justify-center text-center group transition-transform active:scale-95">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                social_leaderboard
              </span>
            </div>
            <span className="text-sm font-headline font-bold text-on-surface mb-1">
              Starter
            </span>
            <span className="text-[10px] font-label text-on-surface-variant leading-tight">
              10 Conversations
            </span>
          </div>

          {/* Unlocked Badge */}
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-4 ambient-shadow border border-outline-variant/20 flex flex-col items-center justify-center text-center group transition-transform active:scale-95">
            <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-tertiary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-sm font-headline font-bold text-on-surface mb-1">
              Grammar Guru
            </span>
            <span className="text-[10px] font-label text-on-surface-variant leading-tight">
              90% Grammar Score
            </span>
          </div>

          {/* Locked Badge */}
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-4 border border-outline-variant/10 flex flex-col items-center justify-center text-center opacity-70 grayscale">
            <div className="w-16 h-16 rounded-full bg-outline-variant/20 flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-on-surface-variant text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                public
              </span>
            </div>
            <span className="text-sm font-headline font-bold text-on-surface-variant mb-1">
              Polyglot
            </span>
            <span className="text-[10px] font-label text-on-surface-variant leading-tight">
              Learn 1000 Words
            </span>
          </div>
        </div>

        {/* Settings Links */}
        <div className="bg-surface-container-lowest rounded-[1.5rem] overflow-hidden ambient-shadow border border-outline-variant/20 mt-8">
          <Link
            to="/flashcards"
            className="w-full px-6 py-4 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors text-left border-b border-outline-variant/10"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-secondary-container/50 text-secondary-dim flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  style
                </span>
              </span>
              <span className="font-body font-medium text-on-surface">
                Vocabulary Bank & Flashcards
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </Link>
          <Link
            to="/history"
            className="w-full px-6 py-4 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors text-left border-b border-outline-variant/10"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-tertiary-container/50 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  history
                </span>
              </span>
              <span className="font-body font-medium text-on-surface">
                Past Conversations
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </Link>
          <button className="w-full px-6 py-4 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors text-left border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-secondary-container/50 text-secondary-dim flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
              </span>
              <span className="font-body font-medium text-on-surface">
                Notifications
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </button>
          <button className="w-full px-6 py-4 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors text-left border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-primary-container/50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  language
                </span>
              </span>
              <span className="font-body font-medium text-on-surface">
                Target Language
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </button>
          <button className="w-full px-6 py-4 flex flex-row items-center justify-between hover:bg-surface-container-high transition-colors text-left">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-error-container/50 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>
              </span>
              <span className="font-body font-medium text-error">Log Out</span>
            </div>
          </button>
        </div>
      </main>
    </PageTransition>
  );
}
