import { tourStops } from "@/data/artourstops";
import { notFound } from "next/navigation";
import TourStopClient from "@/components/TourStopClient";

// Generate static params for all tour stops
export function generateStaticParams() {
  return tourStops.map((stop) => ({
    slug: stop.slug,
  }));
}

export default async function TourStopPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // Find the current stop based on the slug
  const stop = tourStops.find((s) => s.slug === params.slug);

  // If stop not found, return 404
  if (!stop) {
    return notFound();
  }

  return <TourStopClient stop={stop} />;
}
