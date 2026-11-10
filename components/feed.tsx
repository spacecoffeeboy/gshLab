"use client";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { topicLabel } from "@/lib/discovery";
import { Icon } from "./icon";
type Item = Content;
export function Feed({
  items,
  preview = false,
  compact = false,
  onExit,
}: {
  items: Item[];
  preview?: boolean;
  compact?: boolean;
  onExit?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const item = items[index];
  const personalAccount = item?.kind === "reveal" && item.sourceType === "reddit";
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const answerVisible = Boolean(
    selected && (item?.kind === "quiz" || revealed),
  );
  useEffect(() => {
    if (answerVisible) {
      resultHeading.current?.focus({ preventScroll: true });
      resultHeading.current?.scrollIntoView?.({
        block: "nearest",
        behavior: "instant",
      });
    }
  }, [answerVisible, index]);
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
    <main id="main-content" className="player-shell">
      {preview && !compact && (
        <div className="preview-banner">
          Editorial preview · Unverified examples · Not for publication
        </div>
      )}
      {compact && (
        <div className="player-toolbar">
          <button className="back-button" onClick={onExit}>
            <Icon name="back" /> Back to feed
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
          <h2 ref={heading} tabIndex={-1}>
            A little more in the know.
          </h2>
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
              <span className={`kind ${item.kind}`}>
                {item.kind === "quiz"
                  ? "→ THE QUIZ"
                  : item.revealMode === "prediction"
                    ? "✦ REVEAL · PREDICT"
                    : "✦ REVEAL · REFLECT"}
              </span>
              <span className="topic">{topicLabel(item.topicIds[0])}</span>
            </div>
            <h1 className="player-title" ref={heading} tabIndex={-1}>
              {item.title}
            </h1>
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
                    <span className="option-state">
                      {selected &&
                        item.kind === "quiz" &&
                        item.correctOptionId === option.id && (
                          <span className="answer-label">Correct answer</span>
                        )}
                      <span aria-hidden="true">
                        {selected === option.id ? "●" : "→"}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            {!selected && item.kind === "quiz" && <p className="hint">Make a guess. Find something new.</p>}
            {item.kind === "reveal" && !revealed && (
              <div className="reveal-action">
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
                      ? personalAccount
                        ? "THE STORY AS SHARED"
                        : "WHAT ACTUALLY HAPPENED"
                      : "THEIR EXPERIENCE"}
                </div>
                <h2 ref={resultHeading} tabIndex={-1}>
                  {item.kind === "quiz"
                    ? selected === item.correctOptionId
                      ? "Your curiosity paid off."
                      : "Now you know a little more."
                    : item.revealHeadline ||
                      "There’s more than one way to see it."}
                </h2>
                {item.kind === "quiz" && (
                  <div className="answer-summary">
                    <span>CORRECT ANSWER</span>
                    <p><strong>{item.correctOptionId} · {item.options.find((option) => option.id === item.correctOptionId)?.text}</strong></p>
                  </div>
                )}
                <p>
                  {item.kind === "quiz"
                    ? item.feedbackByOption[selected]
                    : item.reveal}
                </p>
                <div className="insight">
                  <span>THE LITTLE TAKEAWAY</span>
                  <p>{item.insight}</p>
                </div>
                {personalAccount && !item.sources.some((source) => source.url) ? (
                  <p className="source-details">
                    Adapted from a personal account shared on Reddit. Experiences vary.
                  </p>
                ) : (
                  <details className="source-details">
                    <summary>
                      {item.kind === "quiz" ? "About the data" : "Take a look at the sources"} <span aria-hidden="true">→</span>
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
                            {source.evidenceBasis === "operator_excerpt"
                              ? source.organizationOrCommunity.startsWith("Publisher not identified")
                                ? "Supplied report excerpt · Publisher not specified"
                                : source.organizationOrCommunity
                              : `${source.organizationOrCommunity} · Source pending verification`}
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
                        {source.evidenceBasis === "operator_excerpt" && (
                          <p>Based on a supplied excerpt. The original report has not been independently checked.</p>
                        )}
                      </div>
                    ))}
                  </details>
                )}
                <button className="primary next" onClick={next}>
                  {index + 1 === items.length
                    ? "Finish this collection"
                    : "Next discovery"}{" "}
                  <Icon name="arrow" />
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
    </main>
  );
}
