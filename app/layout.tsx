import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

const corma = localFont({
  src: "../public/fonts/Corma.otf",
  variable: "--font-corma",
});

export const metadata: Metadata = {
  title: "Route 66 Remixed Augmented Reality Tour",
  description:
    "Explore Route 66 through immersive audio and augmented reality experiences",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={corma.variable}
    >
      <body>{children}</body>
    </html>
  );
}
