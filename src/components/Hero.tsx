"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import HeroBackdrop from "./HeroBackdrop";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      <HeroBackdrop />

      {/* Title block — subtle backdrop to lift text off the cats */}
      <div
        className="relative z-10 flex flex-col items-center px-6 py-6 sm:px-10 sm:py-8"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 55%, transparent)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      >
        {/* Name — stamped headline with misregistration */}
        <div className="relative text-center">
          {/* Red offset shadow */}
          <h1
            aria-hidden="true"
            className="absolute inset-0 select-none font-display uppercase leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: "var(--accent-hot)",
              transform: "translate(4px, 4px) rotate(-2deg)",
              mixBlendMode: "multiply",
            }}
          >
            MARTIN<br />RODRIGUEZ
          </h1>
          {/* Main name */}
          <motion.h1
            className="relative font-display uppercase leading-[0.95] text-text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ transform: "rotate(-2deg)" }}
            initial={reduced ? false : { scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut", delay: reduced ? 0 : 0.2 }}
          >
            MARTIN<br />RODRIGUEZ
          </motion.h1>
        </div>

        {/* Tagline — monospace subtitle */}
        <motion.p
          className="mt-6 font-body text-lg tracking-wide text-text-muted"
          style={{ transform: "rotate(-0.5deg)" }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.5 }}
        >
          Software Engineer
        </motion.p>
      </div>

      {/* Scroll indicator — arrow only */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center text-text-muted"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.9 }}
      >
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
