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
        <StampText text="Contact" as="h2" className="text-3xl md:text-4xl" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-body text-base text-text-muted">
          you can find me here:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="mailto:martin.al.rodriguez24@gmail.com"
            aria-label="Email Martin"
            className="inline-flex items-center justify-center border-2 border-accent-hot bg-accent-hot p-4 text-bg-primary"
            style={{ boxShadow: "4px 4px 0 var(--ink-black)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="0" />
              <path d="M2 6l10 7 10-7" />
            </svg>
          </motion.a>
          <motion.a
            href="https://github.com/marneo23"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center border-2 border-accent-hot bg-accent-hot p-4 text-bg-primary"
            style={{ boxShadow: "4px 4px 0 var(--ink-black)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/martin-alejandro-rodriguez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center border-2 border-accent-hot bg-accent-hot p-4 text-bg-primary"
            style={{ boxShadow: "4px 4px 0 var(--ink-black)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
