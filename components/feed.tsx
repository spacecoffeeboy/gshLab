"use client";
import { useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { topicLabel } from "@/lib/discovery";
type Item = Content;
export function Feed({
  items,
  preview = false,
  compact = false,
  onSave,
  saved = [],
  onExit,
}: {
  items: Item[];
  preview?: boolean;
  compact?: boolean;
  onSave?: (id: string) => void;
  saved?: string[];
  onExit?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const item = items[index];
  function next() {
    if (index + 1 === items.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
      setRevealed(false);
    }
    requestAnimationFrame(() => heading.current?.focus());
  }
  return (
    <main className={compact ? "player-shell" : undefined}>
      {preview && !compact && (
        <div className="preview-banner">
          Editorial preview · Unverified examples · Not for publication
        </div>
      )}
      {!compact && (
        <section className="intro">
          <div className="eyebrow">
            <span className="tiny-star">✦</span> SMALL QUESTIONS. NEW
            PERSPECTIVES.
          </div>
          <h1>
            A little guess.
            <br />A whole new <em>Korea.</em>
          </h1>
          <p>
            Beyond the familiar. Into the everyday.
            <br />
            Discover the stories and surprises in between.
          </p>
          <div className="intro-bottom">
            <span className="pill">No sign-up. Just curiosity.</span>
            <span className="handwritten">Take a closer look ↘</span>
          </div>
          <div className="orbit" aria-hidden="true">
            <span>한</span>
            <i>✦</i>
            <b>?</b>
          </div>
        </section>
      )}
      {compact && (
        <div className="player-toolbar">
          <button className="back-button" onClick={onExit}>
            ← Back to feed
          </button>
          <span>ONE LITTLE DISCOVERY</span>
        </div>
      )}
      {!item ? (
        <section className="empty">
          <span className="empty-art" aria-hidden="true">
            ✦
          </span>
          <div className="eyebrow">A GOOD DISCOVERY TAKES A LITTLE CARE</div>
          <h2>
            Something worth discovering
            <br />
            is on its way.
          </h2>
          <p>
            We’re checking the sources and putting the finishing touches
            <br className="desktop" /> on our first stories. Come back for a
            fresh look at Korea.
          </p>
          <div className="empty-note">
            Thoughtfully selected. Carefully checked. Always a little
            surprising.
          </div>
        </section>
      ) : done ? (
        <section className="empty">
          <span className="empty-art">✦</span>
          <h2>A little more in the know.</h2>
          <p>You’ve explored every discovery in this collection.</p>
          <button
            className="primary"
            onClick={() => {
              setIndex(0);
              setSelected(null);
              setRevealed(false);
              setDone(false);
            }}
          >
            Explore again →
          </button>
        </section>
      ) : (
        <section className="play-area" aria-label="Discoveries">
          <div className="feed-label">
            <span>TODAY’S LITTLE DISCOVERIES</span>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="progress"
            aria-label={`Discovery ${index + 1} of ${items.length}`}
          >
            {items.map((i, n) => (
              <span key={i.id} className={n <= index ? "active" : ""} />
            ))}
          </div>
          <article className="content-card">
            <div className="card-top">
              {onSave && (
                <button
                  className="save-control"
                  aria-label={
                    saved.includes(item.id)
                      ? "Remove from saved"
                      : "Save discovery"
                  }
                  aria-pressed={saved.includes(item.id)}
                  onClick={() => onSave(item.id)}
                >
                  {saved.includes(item.id) ? "♥ Saved" : "♡ Save"}
                </button>
              )}
              <span className={`kind ${item.kind}`}>
                {item.kind === "quiz"
                  ? "→ THE QUIZ"
                  : item.revealMode === "prediction"
                    ? "✦ REVEAL · PREDICT"
                    : "✦ REVEAL · REFLECT"}
              </span>
              <span className="topic">{topicLabel(item.topicIds[0])}</span>
            </div>
            <h2 ref={heading} tabIndex={-1}>
              {item.title}
            </h2>
            <p className="context">{item.context}</p>
            <fieldset
              disabled={item.kind === "quiz" ? selected !== null : revealed}
            >
              <legend>{item.question}</legend>
              <div className="options">
                {item.options.map((option) => (
                  <button
                    key={option.id}
                    aria-pressed={selected === option.id}
                    className={`option ${selected === option.id ? "chosen" : ""} ${selected && item.kind === "quiz" && item.correctOptionId === option.id ? "correct" : ""}`}
                    onClick={() => setSelected(option.id)}
                  >
                    <span className="option-id">{option.id}</span>
                    <span>{option.text}</span>
                    <span aria-hidden="true">
                      {selected === option.id ? "●" : "→"}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            {!selected && (
              <p className="hint">
                {item.kind === "quiz"
                  ? "Make a guess. Find something new."
                  : item.revealMode === "prediction"
                    ? "Make a guess, then discover what was shared."
                    : "No right or wrong. Just your perspective."}
              </p>
            )}
            {item.kind === "reveal" && !revealed && (
              <div className="reveal-action">
                <p>
                  {item.revealMode === "prediction"
                    ? "What happened next?"
                    : "What would you do?"}
                </p>
                <button
                  className="primary"
                  disabled={!selected}
                  onClick={() => setRevealed(true)}
                >
                  {item.revealMode === "prediction"
                    ? "Reveal what happened"
                    : "Reveal their story"}{" "}
                  →
                </button>
                <small>
                  {selected
                    ? "Your choice is yours. This isn’t a scored answer."
                    : "Choose an option to reveal the story."}
                </small>
              </div>
            )}
            {selected && (item.kind === "quiz" || revealed) && (
              <div className="result" role="status">
                <div className="eyebrow">
                  {item.kind === "quiz"
                    ? selected === item.correctOptionId
                      ? "YOU GOT IT"
                      : "A LITTLE SURPRISE"
                    : item.revealMode === "prediction"
                      ? "WHAT ACTUALLY HAPPENED"
                      : "THEIR EXPERIENCE"}
                </div>
                <h3>
                  {item.kind === "quiz"
                    ? selected === item.correctOptionId
                      ? "Your curiosity paid off."
                      : "Now you know a little more."
                    : item.revealHeadline ||
                      "There’s more than one way to see it."}
                </h3>
                <p>
                  {item.kind === "quiz"
                    ? item.feedbackByOption[selected]
                    : item.reveal}
                </p>
                <div className="insight">
                  <span>THE LITTLE TAKEAWAY</span>
                  <p>{item.insight}</p>
                </div>
                <details>
                  <summary>
                    Take a look at the sources <span aria-hidden="true">→</span>
                  </summary>
                  {item.sources.map((source) => (
                    <div className="source" key={source.sourceId}>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title || source.organizationOrCommunity} →
                        </a>
                      ) : (
                        <span>
                          {source.organizationOrCommunity} · Source pending
                          verification
                        </span>
                      )}
                      <p>
                        {[
                          source.referencePeriod,
                          source.population,
                          source.unit,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  ))}
                </details>
                <button className="primary next" onClick={next}>
                  {index + 1 === items.length
                    ? "Finish this collection"
                    : "Next discovery"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
            {item.tags.length > 0 && (
              <ul
                className="content-tags player-tags"
                aria-label="Content tags"
              >
                {item.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            )}
          </article>
          <p className="below-card">
            A fact can surprise you. A perspective can stay with you.
          </p>
        </section>
      )}
      {!compact && (
        <section className="principles">
          <div>
            <span>01 / GUESS</span>
            <h3>Start with a little curiosity.</h3>
            <p>A quick question about life in Korea.</p>
          </div>
          <div>
            <span>02 / DISCOVER</span>
            <h3>Look beyond the obvious.</h3>
            <p>A checked fact or a real perspective.</p>
          </div>
          <div>
            <span>03 / KNOW</span>
            <h3>Leave with a little more.</h3>
            <p>A fresh detail to take into your day.</p>
          </div>
        </section>
      )}
    </main>
  );
}
