import { useState, useEffect } from "react";

// Highlights one element after the intro closes. Give each element a different
// startDelayMs so the highlights play one after the other.
const useIntroPulse = (startDelayMs: number) => {
  const [showPulse, setShowPulse] = useState(false);
  const [pulseFading, setPulseFading] = useState(false);

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout>;
    const handler = () => {
      startTimer = setTimeout(() => {
        setShowPulse(true);
        setPulseFading(false);
      }, startDelayMs);
    };
    window.addEventListener("route66_intro_pulse", handler);
    return () => {
      window.removeEventListener("route66_intro_pulse", handler);
      clearTimeout(startTimer);
    };
  }, [startDelayMs]);

  useEffect(() => {
    if (!showPulse) return;
    const fadeTimer = setTimeout(() => setPulseFading(true), 3000);
    const removeTimer = setTimeout(() => setShowPulse(false), 4000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [showPulse]);

  return { showPulse, pulseFading, stopPulse: () => setShowPulse(false) };
};

export default useIntroPulse;
