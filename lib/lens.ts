"use client";

import { createContext, useContext } from "react";
import type { Lens } from "./content";

export interface LensContextValue {
  lens: Lens;
  setLens: (lens: Lens) => void;
}

export const LensContext = createContext<LensContextValue | null>(null);

export function useLens(): LensContextValue {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used within a LensProvider");
  return ctx;
}

/** Map a pathname to its preset lens (used by the /ai and /backend deep links). */
export function lensFromPath(pathname: string): Lens {
  if (pathname.startsWith("/backend")) return "backend";
  if (pathname.startsWith("/ai")) return "ai";
  return "ai"; // default
}

/** Canonical path for a lens, kept in the URL bar as the user toggles. */
export function pathForLens(lens: Lens): string {
  return lens === "backend" ? "/backend" : "/ai";
}
