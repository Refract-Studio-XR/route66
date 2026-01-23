"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  isMapLoaded: boolean;
}

export default function LoadingScreen({ isMapLoaded }: LoadingScreenProps) {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (isMapLoaded) {
      setShouldExit(true);
    }
  }, [isMapLoaded]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        shouldExit ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ zIndex: 9999 }}
    >
      <div
        className={`relative ${
          shouldExit ? "animate-logo-exit" : "animate-opacity-bounce"
        }`}
        style={{ width: "360px", maxWidth: "90vw", marginTop: "-150px" }}
      >
        <Image
          src="/fonts/rt66remixed.png"
          alt="Route 66 Remixed"
          width={360}
          height={240}
          className="object-contain w-full h-auto"
          style={{
            filter: "drop-shadow(0 0 40px rgba(255, 199, 0, 0.3))",
            WebkitFilter: "drop-shadow(0 0 40px rgba(255, 199, 0, 0.3))",
          }}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
