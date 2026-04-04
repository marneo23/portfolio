"use client";

import StampText from "./StampText";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-bg relative mx-auto max-w-5xl overflow-hidden px-6 py-24">
      {/* Halftone abstract backdrop — right margin, very faint */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/atmosphere/halftone-abstract.jpg"
        alt=""
        role="presentation"
        className="pointer-events-none absolute top-[10%] right-[-15%] w-[45%] max-w-[550px] select-none"
        style={{
          opacity: 0.04,
          mixBlendMode: "lighten",
          transform: "rotate(3deg)",
          filter: "grayscale(1) invert(1) contrast(1.5)",
        }}
      />

      <StampText text="Projects" as="h2" className="relative z-10 mb-12 text-2xl" />

      <div className="relative z-10 grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
