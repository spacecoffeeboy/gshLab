import { z } from "zod";
import topics from "../content/topics.json";
const text = z.string().trim().min(1);
const source = z.object({
  sourceId: text,
  kind: z.enum([
    "reddit_post",
    "reddit_comment",
    "official_report",
    "statistical_table",
    "other",
  ]),
  organizationOrCommunity: text,
  title: text.optional(),
  url: z
    .url()
    .refine((url) => /^https?:\/\//.test(url))
    .nullable(),
  publishedAt: text.nullable().optional(),
  accessedAt: z.iso.date().nullable().optional(),
  referencePeriod: text.nullable().optional(),
  population: text.nullable().optional(),
  unit: text.nullable().optional(),
  notes: z.string().optional(),
  evidenceBasis: z.enum(["external", "operator_excerpt"]).default("external"),
  evidenceText: text.optional(),
});
const base = z.object({
  id: text,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sourceType: z.enum(["reddit", "official_statistics", "mixed"]),
  status: z.enum([
    "draft",
    "needs_verification",
    "approved",
    "published",
    "archived",
  ]),
  language: z.literal("en"),
  title: text,
  topicIds: z
    .array(text)
    .min(1)
    .refine(
      (ids) =>
        new Set(ids).size === ids.length &&
        ids.every((id) => topics.some((topic) => topic.id === id)),
      "Topics must be unique IDs from content/topics.json",
    ),
  tags: z.array(text).default([]),
  audienceTags: z
    .array(z.enum(["short-trip", "long-trip", "short-stay", "long-stay"]))
    .optional(),
  context: text,
  question: text,
  options: z
    .array(z.object({ id: text, text }))
    .min(2)
    .max(4),
  insight: text,
  sources: z.array(source),
  editorNotes: z.string().optional(),
  createdAt: text.optional(),
  updatedAt: text.optional(),
  publishedAt: text.nullable().optional(),
  verification: z
    .object({
      reviewedBy: text,
      reviewedAt: z.iso.date(),
      answerEvidence: text.optional(),
    })
    .optional(),
});
export const contentSchema = z
  .discriminatedUnion("kind", [
    base.extend({
      kind: z.literal("quiz"),
      correctOptionId: text,
      feedbackByOption: z.record(z.string(), text),
      reveal: z.never().optional(),
    }),
    base.extend({
      kind: z.literal("reveal"),
      correctOptionId: z.null().optional(),
      reveal: text,
      revealMode: z.enum(["prediction", "reflection"]).default("reflection"),
      observedOptionId: text.nullable().optional(),
      revealHeadline: text.optional(),
      feedbackByOption: z.never().optional(),
    }),
  ])
  .superRefine((item, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: "custom", message });
    const ids = item.options.map((o) => o.id);
    if (new Set(ids).size !== ids.length) fail("Option IDs must be unique");
    if (item.kind === "quiz") {
      if (!ids.includes(item.correctOptionId))
        fail("Correct option must exist");
      if (
        ids.some((id) => !item.feedbackByOption[id]) ||
        Object.keys(item.feedbackByOption).some((id) => !ids.includes(id))
      )
        fail("Feedback must match every option");
    }
    if (item.kind === "reveal") {
      if (item.revealMode === "reflection" && item.observedOptionId != null)
        fail("Reflection cannot have an observed option");
      if (item.observedOptionId != null && !ids.includes(item.observedOptionId))
        fail("Observed option must exist");
    }
    if (item.status === "published") {
      if (!item.verification)
        fail("Publication requires a recorded editorial review");
      if (
        !item.sources.length ||
        item.sources.some((s) =>
          s.evidenceBasis === "operator_excerpt"
            ? !s.evidenceText || item.sourceType === "official_statistics"
            : !s.url || !s.accessedAt,
        )
      )
        fail("Publication requires checked URLs and dates or explicit supplied-excerpt evidence");
      if (item.kind === "quiz" && item.sourceType !== "reddit") {
        const official = item.sources.filter(
          (s) => s.kind === "official_report" || s.kind === "statistical_table",
        );
        if (
          !official.length ||
          official.some(
            (s) => !s.referencePeriod || !s.population || !s.unit,
          ) ||
          !item.verification?.answerEvidence
        )
          fail(
            "Statistics require period, population, unit and reviewed answer evidence",
          );
      }
    }
  });
export type Content = z.infer<typeof contentSchema>;
export function parseCollection(input: unknown): Content[] {
  const items = z.array(contentSchema).parse(input);
  for (const field of ["id", "slug"] as const)
    if (new Set(items.map((i) => i[field])).size !== items.length)
      throw new Error(`Duplicate ${field}`);
  return items;
}
export function publicContent(input: unknown) {
  return parseCollection(input)
    .filter((i) => i.status === "published")
    .map(({ editorNotes, verification, ...item }) => ({
      ...item,
      sources: item.sources.map(({ notes, evidenceText, ...source }) => source),
    }));
}
