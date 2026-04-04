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
    slug: "cinematch",
    title: "CineMatch",
    description: "Real-time movie matching platform with WebSocket integration.",
    summary:
      "Built a live matching engine where users swipe on movies and get matched when both like the same title. Socket.io handles real-time sync, JWT secures sessions, and PostgreSQL stores everything.",
    tags: ["Node.js", "Socket.io", "PostgreSQL", "JWT", "Express"],
    liveUrl: "#",
    codeUrl: "https://github.com/marneo23",
    featured: true,
  },
  {
    slug: "taskboard",
    title: "Taskboard API",
    description: "Task management REST API with role-based access control.",
    summary:
      "Full CRUD API with JWT auth, RBAC middleware, input validation, and structured error handling. Built from scratch without AI to deepen understanding of auth patterns.",
    tags: ["Node.js", "TypeScript", "Prisma", "PostgreSQL", "Express"],
    liveUrl: "#",
    codeUrl: "https://github.com/marneo23",
    featured: true,
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    description: "Wheat-paste inspired developer portfolio. You're looking at it.",
    tags: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    codeUrl: "https://github.com/marneo23",
  },
  {
    slug: "qa-framework",
    title: "QA Automation Framework",
    description: "Selenium + Cucumber test framework for production apps.",
    tags: ["Selenium", "Cucumber", "Java", "CI/CD"],
    codeUrl: "https://github.com/marneo23",
  },
  {
    slug: "placeholder-1",
    title: "Project Five",
    description: "Coming soon — another project to showcase.",
    tags: ["TBD"],
  },
];
