// app/mo/[mo]/page.tsx
import microorganisms from "@/data/microorganisms.json";
import { notFound } from "next/navigation";
import type { Metadata, PageProps } from "next";   // ← NEW

type Props = PageProps<{ mo: string }>;
type Microorganism = (typeof microorganisms)[number];

/* ---------- Static params ---------- */
export function generateStaticParams() {
  return microorganisms.map(({ mo }) => ({ mo }));
}

/* ---------- Metadata ---------- */
export async function generateMetadata(
  { params }: Props                // ← USE Props
): Promise<Metadata> {
  const micro = microorganisms.find((m) => m.mo === params.mo);
  if (!micro) return { title: "Not found" };

  return {
    title: micro.fullname ?? micro.mo,
    description: micro.description ?? `Details about ${micro.mo}`,
  };
}

/* ---------- Page ---------- */
export default function MicroorganismPage({ params }: Props) {
  const micro = microorganisms.find((m) => m.mo === params.mo) as
    | Microorganism
    | undefined;

  if (!micro) notFound();

  return <h1>{micro.fullname}</h1>;
}
