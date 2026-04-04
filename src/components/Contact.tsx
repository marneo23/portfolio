"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StampText from "./StampText";

export default function Contact() {
  const backdropRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(backdropRef, { once: true, margin: "-200px" });

  return (
    <section id="contact" className="section-bg relative mx-auto max-w-2xl overflow-hidden px-6 py-24">
      {/* Skull/hands backdrop — centered behind form, slow reveal */}
      <motion.img
        ref={backdropRef}
        src="/images/atmosphere/skull-crosshatch.jpg"
        alt=""
        role="presentation"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        style={{
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.5) brightness(1.2)",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.06 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 mb-12 flex justify-center">
        <StampText text="Contact" as="h2" className="text-2xl" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-body text-base text-text-muted">
          Want to work together? Drop me a line.
        </p>
        <motion.a
          href="mailto:martin.neo2312@gmail.com"
          className="border-2 border-accent-hot bg-accent-hot px-6 py-3 font-display text-sm uppercase tracking-widest text-bg-primary"
          style={{ boxShadow: "4px 4px 0 var(--ink-black)" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          martin.neo2312@gmail.com
        </motion.a>
      </motion.div>
    </section>
  );
}
