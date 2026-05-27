"use client";

import { motion } from "framer-motion";
import StampText from "./StampText";
import TechBadge from "./TechBadge";

const TECH_STACK = [
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "Express",
  "Prisma",
  "Tailwind CSS",
  "Socket.io",
  "Git",
  "Docker",
];

export default function About() {
  return (
    <section id="about" className="section-bg relative mx-auto max-w-5xl overflow-hidden px-6 py-24">
      {/* Chains backdrop — left side, wheat-pasted feel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/atmosphere/chains.png"
        alt=""
        role="presentation"
        className="pointer-events-none absolute top-[5%] left-[-8%] h-[90%] w-auto select-none"
        style={{
          opacity: 0.06,
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.8) brightness(1.3)",
          transform: "rotate(-8deg)",
        }}
      />
      {/* Second chains pass — upper right corner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/atmosphere/chains.png"
        alt=""
        role="presentation"
        className="pointer-events-none absolute top-[-12%] right-[2%] h-[81%] w-auto select-none"
        style={{
          opacity: 0.05,
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.8) brightness(1.3)",
          transform: "rotate(-25deg)",
        }}
      />

      <StampText text="About" as="h2" className="relative z-10 mb-12 text-4xl md:text-5xl" />

      <div className="relative z-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-body text-lg leading-relaxed text-text-primary">
            Developer with 4 years of production experience. I think in edge
            cases, write code that handles failure before it ships, and care
            about reliability as much as features.
          </p>
          <p className="mt-4 font-body text-base text-text-muted">
            Based in Buenos Aires.
          </p>
        </motion.div>

        {/* Tech stack badges */}
        <div>
          <p
            className="mb-4 font-display text-sm uppercase tracking-widest text-text-muted"
            style={{ transform: "rotate(-1deg)" }}
          >
            Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, i) => (
              <TechBadge key={tech} name={tech} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
