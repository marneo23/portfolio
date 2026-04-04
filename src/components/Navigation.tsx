"use client";

import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-end gap-2 px-4 py-3 mix-blend-difference sm:gap-6 sm:px-6 sm:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="group relative min-h-[44px] min-w-[44px] flex items-center justify-center font-body text-xs uppercase tracking-widest text-flash-white"
        >
          {item.label}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-0 bg-flash-white transition-all duration-300 group-hover:w-full"
          />
        </a>
      ))}
    </motion.nav>
  );
}
