import { tourStops, TourStop } from "./artourstops";
import { muralsData } from "./muralsData";
import { v4 as uuidv4 } from "uuid";
import { locationData, LocationData } from "./locationData";

// Convert murals data to TourStop format
const muralStops: TourStop[] = muralsData.map((mural) => ({
  coordinates: [mural.x, mural.y],
  id: uuidv4(),
  title: mural.name,
  artist: "Refract Studio",
  location: mural.name,
  description: "A beautiful mural along Route 66",
  artistStatement:
    "This mural represents the rich cultural heritage and artistic expression found along the historic Route 66 corridor.",
  artistImage: "/olivia.jpg",
  arUrl: "",
  duration: 30,
  coverImage: "/olivia.jpg",
  slug: `mural-${mural.name.toLowerCase().replace(/\s+/g, "-")}`,
  audioUrl: "/audio/mural-audio.mp3",
  visible: false,
}));

// Export combined data
export const allTourStops: TourStop[] = [...tourStops, ...muralStops];

// Export individual datasets
export { tourStops, muralStops, muralsData, locationData };
export type { TourStop, LocationData };
