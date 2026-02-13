"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { INTRO_SLIDES, type IntroSlide } from "@/data/introSlides";

const DEFAULT_STORAGE_KEY = "route66_intro_seen";

export interface IntroModalProps {
  slides?: IntroSlide[];
  storageKey?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function IntroModal({
  slides = INTRO_SLIDES,
  storageKey = DEFAULT_STORAGE_KEY,
  open: controlledOpen,
  onOpenChange,
}: IntroModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [step, setStep] = useState(0);

  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (isControlled) return;
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(storageKey)) setInternalOpen(true);
  }, [isControlled, storageKey]);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (typeof window !== "undefined") window.localStorage.setItem(storageKey, "true");
      setStep(0);
    }
    setOpen(nextOpen);
  };

  const currentSlide = slides[step];
  const isLastSlide = step === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      if (typeof window !== "undefined") window.localStorage.setItem(storageKey, "true");
      setStep(0);
      setOpen(false);
    } else {
      setStep((s) => s + 1);
    }
  };

  if (!currentSlide) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[min(24rem,92vw)] h-[450px] flex flex-col overflow-hidden p-4 sm:p-5 bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl text-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        <DialogTitle className="sr-only">
          Tour tips — step {step + 1} of {slides.length}
        </DialogTitle>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
          {step === 0 && (
            <div className="flex justify-center">
              <Image src="/rt66logo.png" alt="Route 66" width={72} height={72} className="object-contain" />
            </div>
          )}

          {currentSlide.image && (
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
              <Image
                src={currentSlide.image}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 24rem) 92vw, 24rem"
              />
            </div>
          )}

          {currentSlide.title && (
            <h2 className="font-corma text-lg font-semibold text-white tracking-wide">
              {currentSlide.title}
            </h2>
          )}

          <DialogDescription asChild>
            <p className="text-base text-gray-200 font-light leading-relaxed">
              {currentSlide.body}
            </p>
          </DialogDescription>
        </div>

        <div className="flex-shrink-0 pt-4 space-y-2 flex flex-col items-center">
          <div className="flex justify-center gap-1" aria-label={`Slide ${step + 1} of ${slides.length}`}>
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === step ? "w-6 bg-route66Turquoise" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            className="w-full sm:w-auto bg-route66Turquoise hover:bg-route66Turquoise/90 text-white font-medium tracking-wide"
          >
            {isLastSlide ? "Get started" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
