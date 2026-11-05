import topics from "../content/topics.json";
import type { Content } from "./content";
export { topics };
export function topicLabel(id: string) {
  return topics.find((t) => t.id === id)?.label || id;
}
const normalize = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
/** Search pre-answer copy and editorial tags; never match hidden answers or source notes. */
export function matchesSearch(item: Content, query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  const haystack = normalize(
    [
      item.title,
      item.context,
      item.question,
      ...item.topicIds.map(topicLabel),
      ...item.tags,
    ].join(" "),
  );
  return words.every((word) => haystack.includes(word));
}
