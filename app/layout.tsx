import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Route 66 Audio Tour",
  description: "Explore Route 66 through immersive audio experiences",
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
    <html lang="en">
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function setAppHeight() {
                const updateHeight = () => {
                  document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
                };
                window.addEventListener('resize', updateHeight);
                updateHeight();
              })();
            `,
          }}
        /> */}
      </head>

      <body className={`${inter.className} h-app`}>{children}</body>
    </html>
  );
}
