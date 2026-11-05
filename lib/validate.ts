import published from "../content/published.json";
import samples from "../content/samples.json";
import kindness from "../content/kindness.json";
import { parseCollection, publicContent } from "./content";
parseCollection([...published, ...samples, ...kindness]);
console.log(
  `Content valid: ${publicContent(published).length} published, ${samples.length + kindness.length} unpublished samples`,
);
