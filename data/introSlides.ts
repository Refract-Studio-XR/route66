export interface IntroSlide {
  id?: string;
  image?: string;
  title?: string;
  body: string;
}

export const INTRO_SLIDES: IntroSlide[] = [
  {
    body:
      "This is an augmented reality tour. Here are some tips to make your experience go smoothly!",
  },
  {
    image: "/intro/headphones_suggested.webp",
    body:
      "We suggest headphones if you have them. Listen to the poem first, then start the experience.",
  },
  {
    image: "/intro/line_up.webp",
    body: "Line up the white drawing with the location, and press start.",
  },
  {
    image: "/intro/tap_to_place.webp",
    body: "Tap the screen to adjust the AR at any time.",
  },
  {
    image: "/intro/dont_walk_backwards.webp",
    body: "Be careful of your surroundings. Don't walk backwards!",
  },
  {
    image: "/intro/big_movements.webp",
    body: "Try not to make big fast movements when viewing the AR.",
  },
  {
    body:
      "No app download required—everything is on the Route 66 Remixed website.",
  },
  {
    image: "/intro/map.webp",
    body: "Check out the map to see more pieces across Route 66. Have fun!",
  },
];
