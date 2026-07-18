"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLens } from "@/lib/lens";
import { LENSES, lensConfig } from "@/lib/content";

/**
 * The signature control: flips the whole page between the AI Systems and
 * Backend framings. Always visible in the nav. Keyboard-operable as a radio group.
 */
export default function LensToggle({ size = "md" }: { size?: "sm" | "md" }) {
  const { lens, setLens } = useLens();
  const reduce = useReducedMotion();

  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div
      role="radiogroup"
      aria-label="Choose focus: AI systems or backend"
      className="relative inline-flex items-center rounded-full border border-line bg-panel/70 p-1 backdrop-blur"
    >
      {LENSES.map((key) => {
        const active = lens === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLens(key)}
            className={`relative z-10 rounded-full font-mono font-medium tracking-wide transition-colors ${pad} ${
              active ? "text-ground" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lens-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {lensConfig[key].short}
          </button>
        );
      })}
    </div>
  );
}
