export interface Project {
  slug: string;
  title: string;
  description: string;
  summary?: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  thumbnail?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "aerle",
    title: "Aerle",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    summary:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    tags: ["TBD"],
    codeUrl: "https://github.com/marneo23",
  },
  {
    slug: "map",
    title: "MAP",
    description: "Multi-agent pipeline for orchestrating LLM workflows.",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["Python", "LLM", "Agents"],
    codeUrl: "https://github.com/marneo23",
  },
  {
    slug: "cinematch",
    title: "CineMatch",
    description: "Real-time movie matching platform with WebSocket integration.",
    summary:
      "Built a live matching engine where users swipe on movies and get matched when both like the same title. Socket.io handles real-time sync, JWT secures sessions, and PostgreSQL stores everything.",
    tags: ["Node.js", "Socket.io", "PostgreSQL", "JWT", "Express"],
    liveUrl: "#",
    codeUrl: "https://github.com/marneo23",
  },
  {
    slug: "nexus",
    title: "Nexus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: ["TBD"],
    codeUrl: "https://github.com/marneo23",
  },
];
