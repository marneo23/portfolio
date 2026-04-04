"use client";

export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-16 h-[30px] w-full md:my-20"
      style={{
        backgroundColor: "var(--bg-secondary)",
        opacity: 0.3,
        clipPath:
          "polygon(0% 60%, 2% 30%, 5% 70%, 8% 25%, 11% 55%, 14% 20%, 17% 65%, 20% 35%, 23% 75%, 26% 15%, 29% 50%, 32% 30%, 35% 70%, 38% 20%, 41% 60%, 44% 35%, 47% 80%, 50% 25%, 53% 55%, 56% 15%, 59% 65%, 62% 40%, 65% 75%, 68% 20%, 71% 50%, 74% 30%, 77% 70%, 80% 25%, 83% 55%, 86% 15%, 89% 60%, 92% 35%, 95% 75%, 98% 20%, 100% 50%, 100% 100%, 0% 100%)",
      }}
    />
  );
}
