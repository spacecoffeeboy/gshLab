import { test } from "node:test";
import assert from "node:assert/strict";
import samples from "../content/samples.json";
import { parseCollection, publicContent } from "../lib/content";
test("unverified and approved content never enters public feed", () => {
  assert.equal(publicContent(samples).length, 0);
  assert.equal(
    publicContent(samples.map((i) => ({ ...i, status: "approved" }))).length,
    0,
  );
});
test("reject duplicate identifiers, missing feedback and invalid correct option", () => {
  assert.throws(() => parseCollection([samples[0], samples[0]]));
  assert.throws(() =>
    parseCollection([{ ...samples[0], correctOptionId: "missing" }]),
  );
  assert.throws(() =>
    parseCollection([{ ...samples[0], feedbackByOption: {} }]),
  );
  assert.throws(() =>
    parseCollection([{ ...samples[1], correctOptionId: "A" }]),
  );
});
test("publishing requires checked sources and recorded human review", () => {
  assert.throws(() =>
    parseCollection([{ ...samples[0], status: "published" }]),
  );
  const item = {
    ...samples[0],
    status: "published",
    verification: {
      reviewedBy: "Test editor",
      reviewedAt: "2026-11-04",
      answerEvidence: "Test fixture only",
    },
    sources: [
      {
        ...samples[0].sources[0],
        url: "https://example.com/report",
        accessedAt: "2026-11-04",
      },
    ],
  };
  assert.equal(publicContent([item]).length, 1);
  assert.throws(() =>
    parseCollection([
      { ...item, sources: [{ ...item.sources[0], population: null }] },
    ]),
  );
  assert.throws(() =>
    parseCollection([
      {
        ...item,
        sources: [{ ...item.sources[0], url: "javascript:alert(1)" }],
      },
    ]),
  );
});

test("kindness reveals preserve independent sources and mode rules", async () => {
  const { default: kindness } = await import("../content/kindness.json");
  const items = parseCollection(kindness);
  assert.equal(items.length, 4);
  assert.equal(new Set(items.map((i) => i.sources[0].sourceId)).size, 4);
  assert.ok(
    items.every(
      (i) => i.status === "needs_verification" && i.options.length === 2,
    ),
  );
  assert.equal(publicContent(kindness).length, 0);
  assert.throws(() =>
    parseCollection([{ ...kindness[1], observedOptionId: "A" }]),
  );
  assert.throws(() =>
    parseCollection([{ ...kindness[0], observedOptionId: "X" }]),
  );
  assert.throws(() =>
    parseCollection([{ ...kindness[0], correctOptionId: "B" }]),
  );
});
