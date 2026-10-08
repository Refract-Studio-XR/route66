import { useState, useEffect } from "react";

// Highlights one element after the intro closes. Give each element a different
// startDelayMs so the highlights play one after the other.
const useIntroPulse = (startDelayMs: number, triggerEvents = ["route66_intro_pulse"]) => {
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
    triggerEvents.forEach((eventName) => window.addEventListener(eventName, handler));
    return () => {
      triggerEvents.forEach((eventName) => window.removeEventListener(eventName, handler));
      clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDelayMs]);

  useEffect(() => {
    if (!showPulse) return;
    const fadeTimer = setTimeout(() => setPulseFading(true), 1500);
    const removeTimer = setTimeout(() => setShowPulse(false), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [showPulse]);

  return { showPulse, pulseFading, stopPulse: () => setShowPulse(false) };
};

export default useIntroPulse;
