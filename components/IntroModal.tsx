"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { INTRO_SLIDES, type IntroSlide } from "@/data/introSlides";

const STORAGE_KEY = "route66_intro_seen";

export interface IntroModalProps {
  slides?: IntroSlide[];
  storageKey?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function IntroModal({
  slides = INTRO_SLIDES,
  storageKey = STORAGE_KEY,
  open: controlledOpen,
  onOpenChange,
}: IntroModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const hasSeenIntro =
    typeof window !== "undefined" && localStorage.getItem(storageKey) === "true";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isControlled) return;
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(storageKey)) setInternalOpen(true);
  }, [isControlled, storageKey]);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  function close() {
    if (typeof window !== "undefined") localStorage.setItem(storageKey, "true");
    setStep(0);
    setOpen(false);
  }

  function next() {
    if (step === slides.length - 1) close();
    else setStep(step + 1);
  }

  if (!mounted || !open) return null;

  const slide = slides[step];
  if (!slide) return null;

  const modal = (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 10000 }}
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
        }}
        onClick={hasSeenIntro ? close : undefined}
      />

      {/* modal box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(24rem, 92vw)",
          height: 450,
          display: "flex",
          flexDirection: "column",
          padding: 20,
          borderRadius: 16,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* close button - only if user has seen intro before */}
        {hasSeenIntro && (
          <button
            type="button"
            onClick={close}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: 6,
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}

        {/* content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: slide.image ? "flex-start" : "center",
            alignItems: slide.image ? undefined : "center",
            textAlign: slide.image ? undefined : "center",
            gap: 16,
            overflow: "hidden",
          }}
        >
          {step === 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image src="/rt66logo.png" alt="Route 66" width={94} height={94} style={{ objectFit: "contain" }} />
            </div>
          )}
          {slide.image && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>
              <Image src={slide.image} alt="" fill style={{ objectFit: "contain" }} sizes="24rem" />
            </div>
          )}
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", fontWeight: 300, lineHeight: 1.6 }}>
            {slide.body}
          </p>
        </div>

        {/* dots + next */}
        <div style={{ flexShrink: 0, paddingTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
            {slides.map((_, i) => (
              <span
                key={i}
                style={{
                  height: 8,
                  width: i === step ? 24 : 8,
                  borderRadius: 4,
                  background: i === step ? "#00838f" : "rgba(255,255,255,0.4)",
                  transition: "width 0.2s, background 0.2s",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 8,
              border: "none",
              background: "#00838f",
              color: "white",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {step === slides.length - 1 ? "Get started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
