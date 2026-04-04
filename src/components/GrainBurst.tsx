"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function GrainBurst({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const grain = document.querySelector<HTMLElement>(".grain");
    if (!grain) return;

    grain.style.transition = "opacity 0.2s ease";
    grain.style.opacity = "0.22";
    const timer = setTimeout(() => {
      grain.style.opacity = "";
      grain.style.transition = "";
    }, 200);

    return () => clearTimeout(timer);
  }, [isInView]);

  return <div ref={ref}>{children}</div>;
}
