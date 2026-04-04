"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroBackdrop from "./HeroBackdrop";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <HeroBackdrop />

      {/* Name — big stamped headline with misregistration */}
      <div className="relative z-10 lg:translate-x-[12%]">
        {/* Red offset shadow */}
        <h1
          aria-hidden="true"
          className="absolute inset-0 select-none font-display text-hero uppercase leading-none"
          style={{
            color: "var(--accent-hot)",
            transform: "translate(4px, 4px) rotate(-2deg)",
            mixBlendMode: "multiply",
          }}
        >
          MART&Iacute;N
        </h1>
        {/* Main name */}
        <motion.h1
          className="relative font-display text-hero uppercase leading-none text-text-primary"
          style={{ transform: "rotate(-2deg)" }}
          initial={reduced ? false : { scale: 1.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut", delay: reduced ? 0 : 0.2 }}
        >
          MART&Iacute;N
        </motion.h1>
      </div>

      {/* Tagline — monospace subtitle */}
      <motion.p
        className="relative z-10 mt-4 font-body text-lg tracking-wide text-text-muted lg:translate-x-[12%]"
        style={{ transform: "rotate(-0.5deg)" }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.5 }}
      >
        Full-Stack Developer
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-text-muted"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.9 }}
      >
        <span className="font-body text-sm uppercase tracking-widest">
          Scroll
        </span>
        <motion.span
          className="text-2xl"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          &#8595;
        </motion.span>
      </motion.div>
    </section>
  );
}
