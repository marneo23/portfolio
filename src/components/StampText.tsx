"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface StampTextProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  offsetColor?: string;
}

export default function StampText({
  text,
  as: Tag = "h2",
  className = "",
  offsetColor = "var(--accent-hot)",
}: StampTextProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={reduced ? false : { scale: 1.3, opacity: 0, rotate: -2 }}
      whileInView={{ scale: 1, opacity: 1, rotate: -1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
    >
      {/* Misregistration shadow layer */}
      <Tag
        aria-hidden="true"
        className="absolute inset-0 select-none font-display uppercase tracking-widest"
        style={{
          color: offsetColor,
          transform: "translate(3px, 3px)",
          mixBlendMode: "multiply",
        }}
      >
        {text}
      </Tag>
      {/* Main text */}
      <Tag className="relative font-display uppercase tracking-widest">
        {text}
      </Tag>
    </motion.div>
  );
}
