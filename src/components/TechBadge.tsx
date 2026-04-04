"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface TechBadgeProps {
  name: string;
  index?: number;
}

export default function TechBadge({ name, index = 0 }: TechBadgeProps) {
  const reduced = useReducedMotion();
  const rotation = ((index * 7 + 3) % 7) - 3;

  return (
    <motion.span
      className="inline-block cursor-default border-[1.5px] border-accent-cool px-3 py-1 font-body text-xs uppercase tracking-wider text-accent-cool"
      style={{
        rotate: `${rotation}deg`,
        boxShadow: "3px 3px 0 var(--ink-black)",
        borderRadius: 0,
      }}
      initial={reduced ? false : { opacity: 0, scale: 0, rotate: rotation - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{
        duration: reduced ? 0 : 0.3,
        delay: reduced ? 0 : index * 0.06,
        ease: "easeOut",
      }}
      whileHover={reduced ? {} : { rotate: 0, scale: 1.1 }}
    >
      {name}
    </motion.span>
  );
}
