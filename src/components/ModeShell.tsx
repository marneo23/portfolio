"use client";

import { useState, type ReactNode } from "react";
import SoberView from "./SoberView";

export default function ModeShell({ children }: { children: ReactNode }) {
  const [sober, setSober] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setSober((s) => !s)}
        aria-pressed={sober}
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 100,
          padding: "4px 10px",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "lowercase",
          fontFamily: sober ? "system-ui, sans-serif" : "var(--font-mono), monospace",
          background: sober ? "transparent" : "var(--bg-primary)",
          border: sober ? "1px solid #aaa" : "1.5px solid var(--text-muted)",
          color: sober ? "inherit" : "var(--text-muted)",
          cursor: "pointer",
        }}
      >
        {sober ? "see original" : "sober version"}
      </button>
      {sober ? <SoberView /> : children}
    </>
  );
}
