"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StampText from "./StampText";

interface Demo {
  slug: string;
  title: string;
  url: string;
}

const DEMOS: Demo[] = [
  {
    slug: "cinematch",
    title: "CineMatch",
    url: "#", // TODO: replace with real demo URL
  },
  {
    slug: "taskboard",
    title: "Taskboard API",
    url: "#", // TODO: replace with real demo URL
  },
];

export default function Demos() {
  const [current, setCurrent] = useState(0);
  const demo = DEMOS[current];

  return (
    <section id="demos" className="section-bg mx-auto max-w-5xl px-6 py-24">
      <StampText text="Live Demos" as="h2" className="mb-12 text-2xl" />

      <div className="relative">
        {/* Tape label */}
        <div
          className="relative z-10 mx-auto -mb-3 w-fit px-6 py-1"
          style={{
            backgroundColor: "var(--accent-warm)",
            transform: "rotate(-1deg)",
            boxShadow: "2px 2px 0 var(--ink-black)",
          }}
        >
          <span className="font-display text-xs uppercase tracking-widest text-bg-primary">
            {demo.title}
          </span>
        </div>

        {/* Ripped paper frame */}
        <div
          className="relative overflow-hidden bg-bg-secondary"
          style={{
            boxShadow: "6px 6px 0 var(--ink-black)",
            clipPath:
              "polygon(0% 2%, 3% 0%, 7% 1.5%, 12% 0%, 16% 2%, 21% 0.5%, 27% 1%, 33% 0%, 38% 2%, 44% 0.5%, 50% 1.5%, 56% 0%, 62% 2%, 68% 0.5%, 74% 1%, 80% 0%, 85% 1.5%, 91% 0%, 95% 2%, 100% 0%, 100% 98%, 97% 100%, 93% 98.5%, 88% 100%, 83% 98%, 78% 100%, 72% 99%, 67% 100%, 61% 98%, 55% 99.5%, 50% 98%, 44% 100%, 38% 98.5%, 32% 100%, 27% 98%, 21% 99.5%, 15% 100%, 9% 98%, 4% 100%, 0% 98%)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={demo.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {demo.url === "#" ? (
                <div className="flex h-80 items-center justify-center md:h-[28rem]">
                  <p className="font-body text-sm text-text-muted">
                    Demo URL pending &mdash; will embed here
                  </p>
                </div>
              ) : (
                <iframe
                  src={demo.url}
                  title={`${demo.title} demo`}
                  className="h-80 w-full border-0 md:h-[28rem]"
                  loading="lazy"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {DEMOS.map((d, i) => (
            <button
              key={d.slug}
              onClick={() => setCurrent(i)}
              aria-label={`Show ${d.title} demo`}
              className={`h-4 w-4 rounded-full border-2 transition-colors ${
                i === current
                  ? "border-accent-hot bg-accent-hot"
                  : "border-text-muted bg-transparent hover:border-text-primary"
              }`}
              style={{
                boxShadow: i === current ? "2px 2px 0 var(--ink-black)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile fallback note */}
      <p className="mt-4 text-center font-body text-xs text-text-muted md:hidden">
        For the best experience, view demos on desktop.
      </p>
    </section>
  );
}
