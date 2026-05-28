"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src="/images/atmosphere/cats-posterized.jpg"
        alt=""
        role="presentation"
        className="pointer-events-none absolute top-[8vh] left-[-6%] w-[34%] max-w-[260px] select-none lg:top-auto lg:bottom-0 lg:left-[-5%] lg:w-[42%] lg:max-w-[560px]"
        style={{
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.6) brightness(0.95)",
          y: reduced ? 0 : y,
          opacity: reduced ? 0.12 : scrollOpacity,
        }}
        initial={reduced ? false : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      />
      <motion.img
        src="/images/atmosphere/nubes.png"
        alt=""
        role="presentation"
        className="pointer-events-none absolute top-[8vh] right-[-6%] w-[34%] max-w-[260px] select-none lg:top-auto lg:bottom-0 lg:right-[0%] lg:w-[42%] lg:max-w-[560px]"
        style={{
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.8) brightness(1.2) invert(1)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          scaleX: -1,
          y: reduced ? 0 : y,
          opacity: reduced ? 0.14 : scrollOpacity,
        }}
        initial={reduced ? false : { opacity: 0, scaleY: 1.05 }}
        animate={{ opacity: 0.14, scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
