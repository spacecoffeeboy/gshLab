import { notFound } from "next/navigation";
import samples from "@/content/samples.json";
import kindness from "@/content/kindness.json";
import redditDrafts from "@/content/reddit-drafts.json";
import { parseCollection } from "@/lib/content";
import { Explorer } from "@/components/explorer";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Editorial preview — Almeng-E",
  robots: { index: false, follow: false },
};
export default async function Preview({searchParams}:{searchParams:Promise<{batch?:string}>}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const {batch}=await searchParams;
  return <Explorer items={parseCollection(batch === "reddit-01" ? redditDrafts : [...kindness,...samples])} preview />;
}
