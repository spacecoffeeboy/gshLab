import published from "@/content/published.json";
import { publicContent } from "@/lib/content";
import { Explorer } from "@/components/explorer";
export default function Discover() {
  return <Explorer items={publicContent(published)} />;
}
