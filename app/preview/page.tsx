import { notFound } from "next/navigation";
import samples from "@/content/samples.json";
import kindness from "@/content/kindness.json";
import { parseCollection } from "@/lib/content";
import { Explorer } from "@/components/explorer";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Editorial preview — Almengi",
  robots: { index: false, follow: false },
};
export default function Preview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <Explorer items={parseCollection([...kindness, ...samples])} preview />
  );
}
