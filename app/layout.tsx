import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Route 66 Audio Tour",
  description: "Explore Route 66 through immersive audio experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Fix for iOS Safari viewport height issue
            function setAppHeight() {
              document.documentElement.style.setProperty('--app-height', \`\${window.innerHeight}px\`);
            }
            window.addEventListener('resize', setAppHeight);
            setAppHeight();
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
