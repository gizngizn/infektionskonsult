import { notFound } from "next/navigation";
import type { Metadata } from "next";
// If TS complains, enable `"resolveJsonModule": true` in tsconfig
import microorganisms from "@/data/microorganisms.json";

type Mo = {
  mo: string;
  fullname: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  rank: string;
  ref?: string;
  source?: string;
  [k: string]: unknown; // allow extras
};

// Pre-generate /mo/[mo] for every entry
export async function generateStaticParams() {
  return (microorganisms as Mo[]).map((item) => ({ mo: item.mo }));
}

// Only allow known params; unknown slugs => 404
export const dynamicParams = false;

export function generateMetadata(
  { params }: { params: { mo: string } }
): Metadata {
  const item = (microorganisms as Mo[]).find((m) => m.mo === params.mo);
  return {
    title: item ? item.fullname : "Microorganism not found",
  };
}

export default function MoPage({ params }: { params: { mo: string } }) {
  const item = (microorganisms as Mo[]).find((m) => m.mo === params.mo);
  if (!item) notFound();

  return (
    <article className="prose max-w-none">
      <h1>{item.fullname}</h1>
      <ul>
        <li><b>MO ID:</b> {item.mo}</li>
        <li><b>Rank:</b> {item.rank}</li>
        <li><b>Kingdom:</b> {item.kingdom}</li>
        <li><b>Phylum:</b> {item.phylum}</li>
        <li><b>Class:</b> {item.class}</li>
        <li><b>Order:</b> {item.order}</li>
        <li><b>Family:</b> {item.family}</li>
        <li><b>Genus:</b> {item.genus}</li>
        <li><b>Species:</b> {item.species}</li>
        {item.ref && <li><b>Ref:</b> {item.ref}</li>}
        {item.source && <li><b>Source:</b> {item.source}</li>}
      </ul>
    </article>
  );
}