"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import TourStopList from "./TourStopList";
import TourStopDetailDrawer from "./TourStopDetailDrawer";
import { TourStop } from "@/data/tourStops";

const snapPoints = [0.3, 0.8];

const TourStopsDrawer = () => {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(snapPoints[0]);
  const [selectedTourStop, setSelectedTourStop] = useState<TourStop | null>(
    null
  );

  const handleSelectTourStop = (stop: TourStop) => {
    setSelectedTourStop(stop);
    setActiveSnapPoint(snapPoints[0]);
  };
  const handleCloseDetail = () => setSelectedTourStop(null);

  return (
    <>
      <Drawer
        open={true}
        shouldScaleBackground={true}
        dismissible={false}
        snapPoints={snapPoints}
        activeSnapPoint={activeSnapPoint}
        setActiveSnapPoint={setActiveSnapPoint}
        modal={false}
      >
        <DrawerContent
          className={`flex flex-col rounded-t-2xl bg-zinc-900 border border-zinc-800 border-b-0 bottom-0 left-0 right-0 z-20 shadow-lg outline-none ring-0 focus:ring-0 h-[110vh] box-border ${
            activeSnapPoint === 0.8 ? "pb-[200px]" : "pb-[700px]"
          }`}
        >
          <DrawerHeader className="text-left p-4">
            <DrawerTitle className="text-white">Tour Stops</DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Explore various tour stops. Drag to see more details.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto mt-4 px-4">
            <TourStopList
              drawerOpen={activeSnapPoint === 0.8}
              onSelectTourStop={handleSelectTourStop}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <TourStopDetailDrawer
        key={selectedTourStop?.id}
        tourStop={selectedTourStop}
        open={!!selectedTourStop}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TourStopsDrawer;
