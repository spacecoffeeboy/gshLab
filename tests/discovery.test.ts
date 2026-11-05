import { test } from "node:test";
import assert from "node:assert/strict";
import kindness from "../content/kindness.json";
import samples from "../content/samples.json";
import { parseCollection } from "../lib/content";
import { topics, matchesSearch } from "../lib/discovery";
test("broad topic registry excludes detail tags and validates content references", () => {
  assert.equal(
    topics.some((t) => t.id === "kindness"),
    false,
  );
  const items = parseCollection([...kindness, ...samples]);
  assert.ok(
    items.every((i) =>
      i.topicIds.every((id) => topics.some((t) => t.id === id)),
    ),
  );
  assert.throws(() =>
    parseCollection([{ ...kindness[0], topicIds: ["kindness"] }]),
  );
});
test("tag search is case insensitive, intersects topics and does not search hidden results", () => {
  const items = parseCollection(kindness);
  assert.equal(items.filter((i) => matchesSearch(i, " KINDNESS ")).length, 4);
  assert.equal(
    items.filter(
      (i) => i.topicIds.includes("travel") && matchesSearch(i, "kindness"),
    ).length,
    2,
  );
  assert.equal(
    items.filter((i) => matchesSearch(i, "language barrier")).length,
    1,
  );
  assert.equal(matchesSearch(items[0], "An umbrella, not a ride."), false);
  assert.equal(
    matchesSearch(
      { ...items[0], editorNotes: "private-editor-key" },
      "private-editor-key",
    ),
    false,
  );
  assert.equal(items.filter((i) => matchesSearch(i, "unfindable")).length, 0);
});
