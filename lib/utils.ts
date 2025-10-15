import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Audio file mapping based on stop numbers
const audioFileMap: Record<string, string> = {
  "0": "Portal_Intro.mp3",
  "1": "1_MouthPortal.mp3",
  "2": "2_Crown Portal.mp3",
  "3": "3_Tummy Portal.mp3",
  "4": "4_The Eye Portal.mp3",
  "5": "5_The Sit Portal.mp3",
  "6": "6_The Here Portal.mp3",
  "7": "7_ The Thoracic Portal.mp3",
  "8": "8.1_The blood Portal.mp3",
  "8.2": "8.2_The Hip Portal.mp3",
  "9": "9_The Hair Potal.mp3",
  "10": "10_The Hoof Portal.mp3",
  "11": "11_The Foot Portal.mp3",
  "12": "12_The Cellular Portal-.mp3",
  "13": "13_the Skin Portal.mp3",
  "14": "14_The Palm Potal.mp3",
  "15": "15_The Memory Portal.mp3",
  "16": "16_The Collar Portal.mp3",
  "17": "17_ The Spinal Portal.mp3",
};

/**
 * Get the audio file URL for a given tour stop
 * @param stop - The stop number/id as a string (e.g., "1", "8.1", "2")
 * @returns The full audio file path or null if not found
 */
export function getAudioUrl(stop: string | undefined): string | null {
  if (!stop) return null;

  const filename = audioFileMap[stop];
  if (!filename) return null;

  return `/audio/${filename}`;
}
