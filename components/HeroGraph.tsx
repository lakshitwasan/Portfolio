"use client";

import { useEffect, useRef } from "react";
import { lensConfig, type Lens } from "@/lib/content";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
}

/**
 * Ambient node-graph behind the hero. Tinted to the live `--accent` (which tracks
 * both lens and theme) and re-labelled per lens: AI shows agent/retriever/router…,
 * Backend shows api/service/queue/postgres… Honors prefers-reduced-motion by
 * drawing a single static frame.
 */
export default function HeroGraph({ lens }: { lens: Lens }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    // Read the accent triplet from the cascaded CSS variable so we match theme+lens.
    let accent = "120 120 120";
    const readAccent = () => {
      const v = getComputedStyle(canvas).getPropertyValue("--accent").trim();
      if (v) accent = v;
    };
    readAccent();

    const labels = lensConfig[lens].graphNodes;
    const nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Node count and link distance both scale with canvas area, so the constellation
    // looks equally connected on a narrow phone and on an ultrawide monitor.
    let LINK = 150;
    const seed = () => {
      nodes.length = 0;
      const total = Math.max(26, Math.min(96, Math.round((W * H) / 14000)));
      const spacing = Math.sqrt((W * H) / total); // avg distance between nodes
      LINK = Math.max(120, Math.min(240, spacing * 1.7));
      for (let i = 0; i < total; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: i < labels.length ? 3.2 : 1.4 + Math.random() * 1.6,
          label: i < labels.length ? labels[i] : undefined,
        });
      }
    };

    resize();
    seed();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${accent} / ${(1 - d / LINK) * 0.55})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes + labels
      ctx.font = "11px var(--font-mono), monospace";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.label ? `rgb(${accent})` : `rgba(${accent} / 0.7)`;
        ctx.fill();

        if (n.label) {
          ctx.fillStyle = `rgb(${accent})`;
          ctx.fillText(n.label, n.x + n.r + 6, n.y);
        }
      }
    };

    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      draw();
    } else {
      loop();
    }

    // Re-read accent when the theme class flips.
    const observer = new MutationObserver(readAccent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [lens]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-90 [mask-image:radial-gradient(125%_105%_at_72%_28%,black,transparent)]"
    />
  );
}
