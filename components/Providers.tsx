"use client";

import { useCallback, useState } from "react";
import { LensContext, pathForLens } from "@/lib/lens";
import type { Lens } from "@/lib/content";

/**
 * Lens root — holds the active lens (AI vs Backend), scopes the `data-lens`
 * attribute that drives the `--accent` CSS variable, and keeps the URL (`/ai`
 * or `/backend`) in sync so the current view is shareable. Rendered per page so
 * the deep-link routes can preset the lens.
 */
export default function Providers({
  initialLens,
  children,
}: {
  initialLens: Lens;
  children: React.ReactNode;
}) {
  const [lens, setLensState] = useState<Lens>(initialLens);

  const setLens = useCallback((next: Lens) => {
    setLensState(next);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathForLens(next) + window.location.hash);
    }
  }, []);

  return (
    <LensContext.Provider value={{ lens, setLens }}>
      {/* display:contents keeps this out of layout flow while still scoping --accent. */}
      <div data-lens={lens} style={{ display: "contents" }}>
        {children}
      </div>
    </LensContext.Provider>
  );
}
