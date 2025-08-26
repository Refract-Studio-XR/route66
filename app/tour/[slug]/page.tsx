import { tourStops } from "@/data/artourstops";
import { notFound } from "next/navigation";
import TourStopClient from "@/components/TourStopClient";

// Generate static params for all tour stops
export function generateStaticParams() {
  return tourStops.map((stop) => ({
    slug: stop.slug,
  }));
}

export default function TourStopPage({ params }: { params: { slug: string } }) {
  // Find the current stop based on the slug
  const stop = tourStops.find((s) => s.slug === params.slug);

  // If stop not found, return 404
  if (!stop) {
    return notFound();
  }

  return <TourStopClient stop={stop} />;
}
