import published from "../content/published.json";
import samples from "../content/samples.json";
import kindness from "../content/kindness.json";
import redditDrafts from "../content/reddit-drafts.json";
import { parseCollection, publicContent } from "./content";
parseCollection([...published, ...samples, ...kindness, ...redditDrafts]);
console.log(
  `Content valid: ${publicContent(published).length} published, ${samples.length + kindness.length + redditDrafts.length} unpublished samples`,
);
