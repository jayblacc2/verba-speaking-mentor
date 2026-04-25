import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "../components/PageTransition";
import { SCENARIOS } from "../data/scenarios";
import { cn } from "../lib/utils";

const FILTERS = ["All Topics", "Travel", "Work", "Daily Life", "Dining"];

export default function Explore() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScenarios = SCENARIOS.filter((s) => {
    const matchesFilter =
      activeFilter === "All Topics" || s.topic === activeFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageTransition className="bg-surface text-on-surface min-h-screen">
      {/* TopAppBar Mobile */}
      <header className="md:hidden fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-4 bg-surface/80 backdrop-blur-md shadow-[0_4px_12px_rgba(53,47,69,0.05)]">
        <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors active:scale-95">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            language
          </span>
        </button>
        <div className="text-2xl font-headline font-extrabold text-primary tracking-tight">
          Verba
        </div>
        <button className="w-8 h-8 rounded-full overflow-hidden active:scale-95 transition-transform border border-outline-variant/30">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw31GpksLNmYwT_ia1lKcXkyGTBWKot59gFtAqsjkmgHTXANkrXQDv4QLuA1IyQGVhhpyjpOHfEaX_eM2b4yoXRcdtUNp64MwXiuC2LlJaIEYlAq9QHkF6jUDTkt_Ra686H5m7R9kaT6euPnj0_pGuVBp3I-GB4UAZh2qcT_QFqQ6CSC30mXSy-DUxlX7RJRrGqzX_dtYk593_LPjjMYI2e-r8bi8H6zx2nwGQ2MMiReN6qMnnw24XOWK5flqVggr5zFjTnvXN5H8"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </header>

      {/* Web Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-surface-container-low flex-col justify-between py-8 px-6 shadow-[12px_0_24px_-4px_rgba(53,47,69,0.05)] z-40">
        <div>
          <div className="text-3xl font-headline font-extrabold text-primary tracking-tight mb-12 flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              language
            </span>
            Verba
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/explore"
              className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary-container/30 text-primary font-bold transition-all duration-300"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                explore
              </span>
              <span className="font-label">Explore</span>
            </Link>
            <Link
              to="/conversation"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface opacity-70 hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined">mic</span>
              <span className="font-label">Practice</span>
            </Link>
            <Link
              to="/review"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface opacity-70 hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span className="font-label">Review</span>
            </Link>
            <Link
              to="/progress"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-on-surface opacity-70 hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined">query_stats</span>
              <span className="font-label">Progress</span>
            </Link>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-primary/10 transition-colors text-left border border-transparent hover:border-outline-variant/30">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByVj2i_i9Xb9pNAYtj0RlAahDaL96Q2_fwWY947LeXD08IjyZ_NkNgxjovwCbCQ3vWMC4AeK2n8qNai6nXwvyMBziLLX6b2FrTtdvUfmss2RzBmDGZuMKeFFnx5gtw4BK9BT9gejXiEk8vzwSZGbVKATB6PnSmzZeD8nJPqVRIgM0UG5nMEG27Dnccl0Eb0gZIGnRHfkzDhlRvm4JODOZrCvz2YborJp49BoV2YtXK6i-rb9DPdbjuh9dhAVH7Y3KJir7uvc8ZWo4"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 overflow-hidden">
            <p className="font-label font-bold text-sm truncate text-on-surface">
              Alex Johnson
            </p>
            <p className="font-label text-xs opacity-70 truncate text-on-surface">
              Intermediate
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface opacity-70">
            settings
          </span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="md:ml-64 px-4 sm:px-6 md:px-12 py-8 pt-24 md:pt-8 max-w-7xl mx-auto h-full pb-20 md:pb-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-[3.5rem] leading-tight font-headline font-extrabold text-on-surface mb-2 tracking-tight pl-2">
            Discover
            <br />
            <span className="text-primary">Conversations</span>
          </h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg mb-8 max-w-2xl pl-2">
            Find scenarios that match your goals and start speaking naturally.
          </p>

          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">
                search
              </span>
            </div>
            <input
              type="text"
              placeholder="Search topics, words, or situations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-full font-body text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 ambient-shadow border-none transition-shadow"
            />
            <button className="absolute inset-y-2 right-2 px-6 bg-primary text-on-primary rounded-full font-label font-medium hover:bg-primary-dim transition-colors flex items-center gap-2">
              Search
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 no-scrollbar pl-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-2.5 rounded-full font-label font-medium whitespace-nowrap transition-colors border",
                activeFilter === filter
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-highest text-on-surface hover:bg-primary-container/30 hover:text-primary border-outline-variant/15",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grouped Scenarios */}
        <div>
          {filteredScenarios.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
              <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">
                search_off
              </span>
              <p className="text-lg font-headline font-bold text-on-surface mb-1">
                No scenarios found
              </p>
              <p className="text-sm text-on-surface-variant max-w-xs">
                Try adjusting your search terms or filters to discover more
                practice topics.
              </p>
            </div>
          )}

          {FILTERS.filter((f) => f !== "All Topics").map(
            (category, catIndex) => {
              if (activeFilter !== "All Topics" && activeFilter !== category)
                return null;

              const categoryScenarios = filteredScenarios.filter(
                (s) => s.topic === category,
              );
              if (categoryScenarios.length === 0) return null;

              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-headline font-bold text-on-surface mb-6 flex items-center gap-3">
                    {category}
                    <span className="text-sm font-label text-on-surface-variant font-normal bg-surface-container-high px-2.5 py-0.5 rounded-full">
                      {categoryScenarios.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryScenarios.map((scenario, index) => {
                      // Feature the first item of the first category when showing All Topics
                      const isFeatured =
                        catIndex === 0 &&
                        index === 0 &&
                        activeFilter === "All Topics" &&
                        searchQuery === "";

                      return (
                        <div
                          key={scenario.id}
                          onClick={() =>
                            navigate("/conversation", { state: { scenario } })
                          }
                          className={cn(
                            "flex flex-col min-h-[300px] rounded-[1.5rem] bg-surface-container-lowest overflow-hidden group cursor-pointer ambient-shadow hover:bg-primary-container/10 transition-colors border border-transparent hover:border-primary/20",
                            isFeatured ? "md:flex-row lg:col-span-2" : "",
                          )}
                        >
                          <div
                            className={cn(
                              "relative overflow-hidden",
                              isFeatured
                                ? "w-full md:w-2/5 h-48 md:h-full"
                                : "h-40 w-full",
                            )}
                          >
                            <img
                              src={scenario.image}
                              alt={scenario.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full text-primary font-label text-xs font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">
                                {scenario.icon}
                              </span>{" "}
                              {scenario.topic}
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex-1 flex flex-col",
                              isFeatured ? "p-8 justify-center" : "p-6",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={cn(
                                  "px-2.5 py-1 rounded-lg text-xs font-bold font-label",
                                  scenario.levelColor,
                                )}
                              >
                                {scenario.level}
                              </span>
                              <span className="text-on-surface-variant text-sm flex items-center gap-1 font-body">
                                <span className="material-symbols-outlined text-[16px]">
                                  schedule
                                </span>{" "}
                                {scenario.duration}
                              </span>
                            </div>
                            <h3
                              className={cn(
                                "font-headline font-bold text-on-surface mb-2 group-hover:text-primary transition-colors",
                                isFeatured ? "text-2xl mb-3" : "text-xl",
                              )}
                            >
                              {scenario.title}
                            </h3>
                            <p
                              className={cn(
                                "font-body text-on-surface-variant line-clamp-2",
                                isFeatured ? "mb-6" : "text-sm mb-4",
                              )}
                            >
                              {scenario.description}
                            </p>

                            <div
                              className={cn(
                                "flex items-center justify-between mt-auto flex-wrap gap-2",
                                isFeatured
                                  ? ""
                                  : "pt-4 border-t border-outline-variant/10",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex items-center gap-4 font-label text-on-surface-variant flex-wrap",
                                  isFeatured ? "text-sm" : "text-xs",
                                )}
                              >
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="material-symbols-outlined text-primary"
                                    style={{
                                      fontSize: isFeatured ? "24px" : "16px",
                                    }}
                                  >
                                    text_snippet
                                  </span>
                                  <span>{scenario.vocabCount} Words</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="material-symbols-outlined text-primary"
                                    style={{
                                      fontSize: isFeatured ? "24px" : "16px",
                                    }}
                                  >
                                    forum
                                  </span>
                                  <span>
                                    {scenario.dialogueCount} Dialogues
                                  </span>
                                </div>
                              </div>
                              {isFeatured ? (
                                <button className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                                  <span className="material-symbols-outlined">
                                    play_arrow
                                  </span>
                                </button>
                              ) : (
                                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
                                  arrow_forward
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      <button className="fixed bottom-24 md:bottom-8 right-6 md:right-12 px-6 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold flex items-center gap-3 ambient-shadow hover:scale-105 active:scale-95 transition-all z-40 shadow-xl shadow-primary/20">
        <span className="material-symbols-outlined">add_comment</span>
        <span>Custom Topic</span>
      </button>
    </PageTransition>
  );
}
