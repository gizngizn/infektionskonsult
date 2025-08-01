// app/mo/[mo]/page.tsx
import microorganisms from "@/data/microorganisms.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/** Narrow helper for this route */
interface Params {
  mo: string;
}

type Microorganism = (typeof microorganisms)[number];

/* ----------  static params  ---------- */
export function generateStaticParams() {
  return microorganisms.map(({ mo }) => ({ mo }));
}

/* ----------  metadata  ---------- */
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const micro = microorganisms.find((m) => m.mo === params.mo);
  if (!micro) return { title: "Not found" };

  return {
    title: micro.fullname ?? micro.mo,
    description: micro.description ?? `Details about ${micro.mo}`,
  };
}

/* ----------  page  ---------- */
export default function MicroorganismPage(
  { params }: { params: Params }
) {
  const micro = microorganisms.find((m) => m.mo === params.mo);

  if (!micro) notFound();

  return <h1>{micro.fullname}</h1>;
}
