"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const snapPoints = [0.65, 1];

const TourStopsDrawer = () => {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    string | number | null
  >(snapPoints[0]);

  return (
    <Drawer
      open={true}
      shouldScaleBackground={true}
      dismissible={false}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
      modal={false}
    >
      <DrawerContent className="fixed flex flex-col bg-zinc-900 border border-zinc-800 border-b-0 rounded-t-2xl bottom-0 left-0 right-0 z-20 shadow-lg outline-none ring-0 focus:ring-0 p-4">
        <DrawerHeader className="text-left p-0">
          <DrawerTitle className="text-white">Tour Stops</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Explore various tour stops. Drag to see more details.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-4 text-gray-300">
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>

          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>

          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
          <p>Content for tour stops will be listed here.</p>
          <p>This is a simplified view for testing drawer behavior.</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TourStopsDrawer;
