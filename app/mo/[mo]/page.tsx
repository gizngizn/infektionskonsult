// app/mo/[mo]/page.tsx
import microorganisms from "@/data/microorganisms.json"; // <-- adjust if needed
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// The shape of a single entry (handy for type-safety later)
type Microorganism = (typeof microorganisms)[number];

/**
 * Tell Next which pages to pre-render at build time.
 * Each object in the returned array becomes a route like /mo/<mo>
 */
export async function generateStaticParams() {
  return microorganisms.map(({ mo }) => ({ mo }));
}

/**
 * Optional: if you *only* want the statically generated pages
 * (and want every other /mo/<something> to 404 at build time),
 * uncomment the next line:
 */
// export const dynamicParams = false;

/**
 * SEO metadata for each microorganism page.
 */
export function generateMetadata(
  { params }: { params: { mo: string } }
): Metadata {
  const micro = microorganisms.find(m => m.mo === params.mo);
  if (!micro) return { title: "Not found" };

  return {
    title: micro.name ?? micro.mo,
    description: micro.description ?? `Details about ${micro.mo}`,
  };
}

/**
 * The page component.
 */
export default function MicroorganismPage(
  { params }: { params: { mo: string } }
) {
  const micro = microorganisms.find(m => m.mo === params.mo) as
    | Microorganism
    | undefined;

  if (!micro) {
    // Triggers the built-in 404 page
    notFound();
  }

  return (
    <>
      <h1>{micro.fullname}</h1>
    </>
  );
}
