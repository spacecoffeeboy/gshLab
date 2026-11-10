"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { topics, topicLabel, matchesSearch } from "@/lib/discovery";
import { Feed } from "./feed";
import { Icon } from "./icon";
export function shuffled<T>(items: T[], random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function Explorer({
  items,
  preview = false,
}: {
  items: Content[];
  preview?: boolean;
}) {
  const [tab, setTab] = useState<"topics" | "random">("topics");
  const [topic, setTopic] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [queue, setQueue] = useState<Content[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const complete = useCallback((id: string, optionId: string) => {
    setAnswers((current) => current[id] ? current : { ...current, [id]: optionId });
  }, []);
  const unseen = items.filter((item) => !answers[item.id]);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("feed") === "random")
      setTab("random");
  }, []);
  const shown = items.filter(
    (item) =>
      (topic === "all" || item.topicIds.includes(topic)) &&
      matchesSearch(item, query),
  );
  const hasFilters = Boolean(query) || topic !== "all";
  function clearFilters() {
    setSearchInput("");
    setQuery("");
    setTopic("all");
  }
  function focusHub() {
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
  }
  function switchTab(next: "topics" | "random") {
    setTab(next);
    setQueue(null);
    focusHub();
  }
  function open(collection: Content[]) {
    setQueue(collection);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className="discovery-app">
      {preview && (
        <div className="preview-strip">
          Editorial preview · Unverified examples · Not for publication
        </div>
      )}
      <nav className="feed-tabs" aria-label="Feed">
        <button
          aria-current={tab === "topics" ? "page" : undefined}
          onClick={() => switchTab("topics")}
        >
          <Icon name="topics" />
          By topic
        </button>
        <button
          aria-current={tab === "random" ? "page" : undefined}
          onClick={() => switchTab("random")}
        >
          <Icon name="shuffle" />
          Random
        </button>
      </nav>
      {queue ? (
        <Feed
          key={queue.map((i) => i.id).join(",")}
          items={queue}
          compact
          completedAnswers={answers}
          onComplete={complete}
          onExit={() => {
            setQueue(null);
            focusHub();
          }}
        />
      ) : (
        <main id="main-content" className="explorer">
          {tab === "topics" ? (
            <>
              <div className="section-label">
                <h1 ref={heading} tabIndex={-1}>
                  Find your kind of curious
                </h1>
                <span>{shown.length} discoveries</span>
              </div>
              {items.length > 0 && (
                <p className="visit-progress" role="status">
                  {items.length - unseen.length} of {items.length} explored this visit · Resets on refresh
                </p>
              )}
              <div className="topic-tools">
                <div className="category-filters" aria-label="Topics">
                  <button
                    aria-pressed={topic === "all"}
                    onClick={() => setTopic("all")}
                  >
                    All topics
                  </button>
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      aria-pressed={topic === t.id}
                      onClick={() => setTopic(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <form
                  className="discovery-search"
                  role="search"
                  aria-label="Search discoveries"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setQuery(searchInput.trim());
                  }}
                >
                  <label className="sr-only" htmlFor="discovery-search-input">
                    Search topics, stories or tags
                  </label>
                  <input
                    id="discovery-search-input"
                    type="search"
                    placeholder="Search stories or tags…"
                    value={searchInput}
                    onChange={(event) => {
                      setSearchInput(event.target.value);
                      if (!event.target.value.trim()) setQuery("");
                    }}
                    maxLength={160}
                    enterKeyHint="search"
                  />
                  <button className="primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div className="search-summary" role="status" aria-atomic="true">
                {query && (
                  <>
                    <span>
                      {shown.length}{" "}
                      {shown.length === 1 ? "discovery" : "discoveries"} for “
                      {query}”
                      {topic !== "all" ? ` in ${topicLabel(topic)}` : ""}
                    </span>
                    <button
                      className="text-button"
                      onClick={() => {
                        setQuery("");
                        setSearchInput("");
                      }}
                    >
                      Clear search
                    </button>
                  </>
                )}
              </div>
              {shown.length ? (
                <div className="discovery-grid">
                  {shown.map((item, n) => (
                    <article
                      className={`discovery-tile tile-${item.kind}`}
                      key={item.id}
                    >
                      <div className="tile-art">
                        <span className="tile-category">
                          {topicLabel(item.topicIds[0])}
                        </span>
                        <span className="tile-number">
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        <span className="tile-illustration" aria-hidden="true">
                          {item.kind === "quiz" ? (
                            "⅓"
                          ) : item.tags.includes("rain") ? (
                            <svg viewBox="0 0 180 140">
                              <path
                                d="M25 70Q90 -15 155 70Q140 55 123 70Q107 55 90 70Q73 55 57 70Q40 55 25 70Z"
                                fill="currentColor"
                              />
                              <path
                                d="M90 18V110Q90 135 65 120"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="7"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : (
                            "“ ”"
                          )}
                        </span>
                      </div>
                      <div className="tile-body">
                        <div className="tile-meta">
                          <span>
                            {item.kind === "quiz"
                              ? "Quiz · Make a guess"
                              : "Reveal · A different perspective"}
                          </span>
                          <span>1 min</span>
                        </div>
                        {answers[item.id] && <span className="explored-badge">✓ Explored</span>}
                        <button
                          className="tile-open"
                          onClick={() =>
                            open([
                              item,
                              ...shown.filter((i) => i.id !== item.id && !answers[i.id]),
                            ])
                          }
                        >
                          <h2>{item.title}</h2>
                          <Icon name="arrow" />
                        </button>
                        <p>{item.context}</p>
                        {item.tags.length > 0 && (
                          <ul
                            className="content-tags"
                            aria-label="Content tags"
                          >
                            {item.tags.map((tag) => (
                              <li key={tag}>#{tag}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <section className="empty">
                  <span className="empty-art" aria-hidden="true">
                    ✦
                  </span>
                  <h2>
                    {items.length > 0 && hasFilters
                      ? "No discoveries found."
                      : "Fresh discoveries are on the way."}
                  </h2>
                  <p>
                    {items.length > 0 && hasFilters
                      ? "Try another keyword or choose a different topic."
                      : "We’re checking the sources before sharing our first stories."}
                  </p>
                  {items.length > 0 && hasFilters && (
                    <button className="primary" onClick={clearFilters}>
                      Clear filters
                    </button>
                  )}
                </section>
              )}
            </>
          ) : (
            <>
              <h1 ref={heading} tabIndex={-1} className="sr-only">
                Random discoveries
              </h1>
              <section className="shuffle-panel">
                <Icon name="shuffle" size={32} />
                <h2>
                  A new direction.
                  <br />
                  Every single time.
                </h2>
                <p>
                  {items.length
                    ? unseen.length
                      ? `${unseen.length} unseen discoveries. Quiz or Reveal, any topic.`
                      : "You’ve explored everything this visit. Revisit a story whenever you like."
                    : "Our first discoveries are being checked. Come back soon for a fresh look at Korea."}
                </p>
                <button
                  className="primary"
                  disabled={!items.length}
                  onClick={() => open(shuffled(unseen.length ? unseen : items))}
                >
                  {items.length && !unseen.length ? "Review random feed" : "Start random feed"}
                  <Icon name="arrow" />
                </button>
                <small>
                  You choose when to move on. No timers, no pressure.
                </small>
              </section>
            </>
          )}
          <div className="editorial-note">
            <span aria-hidden="true">✦</span>
            <p>
              Small questions. Thoughtfully selected.
              <br />A closer look at the Korea beyond the familiar.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
