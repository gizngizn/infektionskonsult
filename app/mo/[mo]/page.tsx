import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";

// Small index (safe to import)
import slugs from "@/../public/micro/_slugs.json"; // array of strings

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

export async function generateStaticParams() {
  // If you want to limit prerendering, slice here:
  // return (slugs as string[]).slice(0, 2000).map(mo => ({ mo }));
  return (slugs as string[]).map((mo) => ({ mo }));
}

export const dynamicParams = false; // 404 for unknown slugs
export const revalidate = false;    // files in /public are immutable

async function fetchOne(mo: string): Promise<Mo | null> {
  // Build absolute URL to our own static file
  const h = headers();
  const host = h.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";
  const url = `${protocol}://${host}/micro/${mo}.json`;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) return null;
  return (await res.json()) as Mo;
}

export async function generateMetadata(
  { params }: { params: Promise<{ mo: string }> }
): Promise<Metadata> {
  const { mo } = await params;
  const item = await fetchOne(mo);
  return { title: item ? item.fullname : "Microorganism not found" };
}

export default async function MoPage(
  { params }: { params: Promise<{ mo: string }> }
) {
  const { mo } = await params;
  const item = await fetchOne(mo);
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
