"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const BG_IMAGES = [
  "/images/bg/bg-0.jpg",
  "/images/bg/bg-1.jpg",
  "/images/bg/bg-2.jpg",
  "/images/bg/bg-3.jpg",
  "/images/bg/bg-4.jpg",
  "/images/bg/bg-5.jpg",
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const rotation = ((index * 5 + 2) % 5) - 2; // -2 to 2 deg
  const bgImage = BG_IMAGES[index % BG_IMAGES.length];

  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden bg-bg-secondary p-6 section-bg ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{
        rotate: `${rotation}deg`,
        boxShadow: "3px 4px 0px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.4)",
      }}
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{
        y: -4,
        boxShadow: "4px 5px 0px var(--accent-hot), 1px 2px 0px rgba(0, 0, 0, 0.4)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Background atmosphere image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgImage}
        alt=""
        role="presentation"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        style={{
          opacity: 0.05,
          mixBlendMode: "lighten",
          filter: "grayscale(1) contrast(1.5) brightness(1.2)",
        }}
      />

      {/* Thumbnail — use pre-halftoned images via scripts/halftone.js */}
      {project.thumbnail ? (
        <div className="relative mb-4 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            width={800}
            height={450}
            className="relative w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
            style={{ filter: "contrast(1.2) brightness(0.9)" }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "contrast(1.6) brightness(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "contrast(1.2) brightness(0.9)"; }}
          />
        </div>
      ) : (
        /* Placeholder thumbnail */
        <div
          className="relative mb-4 flex h-32 items-center justify-center overflow-hidden md:h-40"
          style={{ backgroundColor: "var(--bg-texture)" }}
        >
          <span className="relative font-display text-lg uppercase tracking-widest text-text-muted/30">
            {project.title}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="relative font-display text-xl uppercase tracking-wider text-text-primary transition-colors duration-200 group-hover:text-accent-hot">
        {project.title}
      </h3>

      {/* Description */}
      <p className="relative mt-2 font-body text-sm text-text-muted">
        {project.description}
      </p>

      {/* Summary for featured */}
      {project.featured && project.summary && (
        <p className="relative mt-3 font-body text-sm leading-relaxed text-text-primary">
          {project.summary}
        </p>
      )}

      {/* Tags — rotation-only roughness, no SVG filter */}
      <div className="relative mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border-[1.5px] border-accent-cool/40 px-2 py-0.5 font-body text-xs uppercase text-accent-cool transition-transform duration-150 hover:scale-105 hover:border-accent-hot hover:text-accent-hot"
            style={{
              borderRadius: 0,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="relative mt-auto flex gap-4 pt-5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-accent-hot px-3 py-1 font-body text-xs uppercase tracking-wider text-accent-hot transition-colors hover:bg-accent-hot hover:text-bg-primary"
          >
            Live
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-text-muted px-3 py-1 font-body text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-text-primary hover:text-text-primary"
          >
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
}
