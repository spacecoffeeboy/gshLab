"use client";
import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";
import { Feed } from "./feed";
export function shuffled<T>(items: T[], random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
const labels: Record<string, string> = {
  kindness: "Little kindnesses",
  rain: "Rainy days",
  reciprocity: "Paying it forward",
  generosity: "Generosity",
  "language-barrier": "Across languages",
  housing: "Home & living",
  society: "Society",
  "social-etiquette": "Social life",
  work: "Work life",
  food: "Food",
  language: "Language",
  travel: "Travel",
  transport: "Getting around",
  "daily-life": "Everyday life",
  family: "Family",
};
export function Explorer({
  items,
  preview = false,
}: {
  items: Content[];
  preview?: boolean;
}) {
  const [tab, setTab] = useState("topics");
  const [topic, setTopic] = useState("all");
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [queue, setQueue] = useState<Content[] | null>(null);
  const storageKey = preview ? "almengi-preview-saved" : "almengi-saved";
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(value))
        setSaved(value.filter((x: unknown) => typeof x === "string"));
    } catch {
      setNotice("Saved discoveries are unavailable in this browser.");
    }
    setReady(true);
  }, [storageKey]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  function save(id: string) {
    const updated = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setNotice(
        updated.includes(id) ? "Saved on this device." : "Removed from saved.",
      );
    } catch {
      setNotice("Saved for this visit only. Browser storage is unavailable.");
    }
  }
  function open(collection: Content[]) {
    setQueue(collection);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const topics = [...new Set(items.flatMap((i) => i.topicTags))];
  const shown = items.filter((i) =>
    tab === "saved"
      ? saved.includes(i.id)
      : topic === "all" || i.topicTags.includes(topic),
  );
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("feed");
    if (requested === "random") setTab("random");
  }, []);
  const nav = (
    <nav className="feed-tabs" aria-label="Feed">
      <button
        aria-current={tab === "topics" ? "page" : undefined}
        onClick={() => {
          setTab("topics");
          setQueue(null);
        }}
      >
        <span>▦</span> By topic
      </button>
      <button
        aria-current={tab === "random" ? "page" : undefined}
        onClick={() => {
          setTab("random");
          setQueue(null);
        }}
      >
        <span>⤨</span> Random
      </button>
      <button
        aria-current={tab === "saved" ? "page" : undefined}
        onClick={() => {
          setTab("saved");
          setQueue(null);
        }}
      >
        <span>♡</span> Saved{" "}
        <small>
          {saved.filter((id) => items.some((i) => i.id === id)).length}
        </small>
      </button>
    </nav>
  );
  return (
    <div className="discovery-app">
      {preview && (
        <div className="preview-strip">
          DESIGN PREVIEW · Unverified sample content, not for publication
        </div>
      )}
      {nav}
      <div className="toast" role="status">
        {notice}
      </div>
      {queue ? (
        <Feed
          key={queue.map((i) => i.id).join(",")}
          items={queue}
          compact
          onSave={save}
          saved={saved}
          onExit={() => setQueue(null)}
        />
      ) : (
        <main className="explorer">
          {tab !== "topics" && (
            <div className="discovery-heading">
              <div>
                <div className="eyebrow">YOUR DAILY DOSE OF DISCOVERY</div>
                <h1>
                  {tab === "saved" ? (
                    <>
                      The ones you <em>kept.</em>
                    </>
                  ) : tab === "random" ? (
                    <>
                      A little <em>serendipity.</em>
                    </>
                  ) : (
                    <>
                      Where will curiosity
                      <br />
                      take you <em>today?</em>
                    </>
                  )}
                </h1>
                <p>
                  {tab === "saved"
                    ? "Good discoveries deserve another look."
                    : tab === "random"
                      ? "Skip the choosing. See where the next question takes you."
                      : "A surprising fact. A different perspective. A little more Korea."}
                </p>
              </div>
              <span className="discovery-stamp" aria-hidden="true">
                알<br />
                맹이<span>A LITTLE MORE KOREA</span>
              </span>
            </div>
          )}
          {tab === "topics" && (
            <>
              <div className="section-label">
                <h1>Find your kind of curious</h1>
                <span>{items.length} discoveries</span>
              </div>
              <div className="category-filters" aria-label="Topics">
                <button
                  aria-pressed={topic === "all"}
                  onClick={() => setTopic("all")}
                >
                  All topics
                </button>
                {topics.map((t) => (
                  <button
                    key={t}
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                  >
                    {labels[t] || t.replaceAll("-", " ")}
                  </button>
                ))}
              </div>
            </>
          )}
          {tab === "random" ? (
            <section className="shuffle-panel">
              <span aria-hidden="true">⤨</span>
              <h2>
                A new direction.
                <br />
                Every single time.
              </h2>
              <p>
                Quiz or Reveal. Any topic. No repeats until you’ve seen them
                all.
              </p>
              <button
                className="primary"
                disabled={!items.length}
                onClick={() => open(shuffled(items))}
              >
                Start random feed →
              </button>
              <small>You choose when to move on. No timers, no pressure.</small>
            </section>
          ) : (
            <>
              {tab === "saved" && (
                <p className="storage-note">
                  Saved on this browser · No account needed · Removing a save
                  won’t affect the content.
                </p>
              )}
              {tab === "saved" && !ready ? (
                <p role="status">Loading your saved discoveries…</p>
              ) : shown.length ? (
                <div className="discovery-grid">
                  {shown.map((item, n) => (
                    <article
                      className={`discovery-tile tile-${item.kind}`}
                      key={item.id}
                    >
                      <div className="tile-art">
                        <span className="tile-category">
                          {labels[item.topicTags[0]] || item.topicTags[0]}
                        </span>
                        <span className="tile-number">
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        <span className="tile-illustration" aria-hidden="true">
                          {item.kind === "quiz" ? (
                            "⅓"
                          ) : item.topicTags.includes("rain") ? (
                            <svg viewBox="0 0 180 140" aria-hidden="true">
                              <path
                                d="M25 70Q90 -15 155 70Q140 55 123 70Q107 55 90 70Q73 55 57 70Q40 55 25 70Z"
                                fill="currentColor"
                              />
                              <path
                                d="M90 18V110Q90 135 65 120"
                                strokeWidth="8"
                                strokeLinecap="square"
                              />
                            </svg>
                          ) : (
                            "“ ”"
                          )}
                        </span>
                        <span className="tile-art-note">
                          {item.kind === "quiz"
                            ? "A NUMBER WORTH A SECOND LOOK"
                            : "THERE’S MORE TO THE STORY"}
                        </span>
                        <button
                          className="tile-save"
                          aria-label={
                            saved.includes(item.id)
                              ? `Remove ${item.title} from saved`
                              : `Save ${item.title}`
                          }
                          aria-pressed={saved.includes(item.id)}
                          onClick={() => save(item.id)}
                        >
                          {saved.includes(item.id) ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="tile-body">
                        <div className="tile-meta">
                          <span>
                            {item.kind === "quiz"
                              ? "QUIZ · MAKE A GUESS"
                              : "REVEAL · EXPLORE A PERSPECTIVE"}
                          </span>
                          <span>1 min</span>
                        </div>
                        <button
                          className="tile-open"
                          onClick={() =>
                            open([
                              item,
                              ...shown.filter((i) => i.id !== item.id),
                            ])
                          }
                        >
                          <h2>{item.title}</h2>
                          <span aria-hidden="true">→</span>
                        </button>
                        <p>{item.context}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <section className="empty">
                  <span className="empty-art">
                    {tab === "saved" ? "♡" : "✦"}
                  </span>
                  <h2>
                    {tab === "saved"
                      ? "Keep a little curiosity."
                      : "Fresh discoveries are on the way."}
                  </h2>
                  <p>
                    {tab === "saved"
                      ? "Tap Save on a Quiz or Reveal to find it here."
                      : "We’re checking the sources before sharing our first stories."}
                  </p>
                  {tab === "saved" && (
                    <button
                      className="primary"
                      onClick={() => setTab("topics")}
                    >
                      Explore topics →
                    </button>
                  )}
                </section>
              )}
            </>
          )}
          <div className="editorial-note">
            <span>✦</span>
            <p>
              Small questions. Thoughtfully selected.
              <br />
              <strong>A closer look at the Korea beyond the familiar.</strong>
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
