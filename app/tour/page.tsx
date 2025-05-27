"use client";

import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";

export default function TourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-990 to-black text-white overflow-auto">
      <div className="container mx-auto px-3 py-4 relative">
        <MapScene />
        <TourStopsDrawer />
      </div>
    </div>
  );
}
