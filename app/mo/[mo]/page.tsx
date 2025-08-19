import { notFound } from "next/navigation";
import type { Metadata } from "next";
// Enable `"resolveJsonModule": true` in tsconfig.json
import microorganismsData from "@/data/microorganisms.json";

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
  [k: string]: unknown;
};

const microorganisms = microorganismsData as Mo[];

// Pre-generate /mo/[mo] for every entry
export async function generateStaticParams() {
  return microorganisms.map((item) => ({ mo: item.mo }));
}

// Unknown slugs => 404
export const dynamicParams = false;

// Next 15: params is a Promise
export async function generateMetadata(
  { params }: { params: Promise<{ mo: string }> }
): Promise<Metadata> {
  const { mo } = await params;
  const item = microorganisms.find((m) => m.mo === mo);
  return { title: item ? item.fullname : "Microorganism not found" };
}

export default async function MoPage(
  { params }: { params: Promise<{ mo: string }> }
) {
  const { mo } = await params;
  const item = microorganisms.find((m) => m.mo === mo);
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
