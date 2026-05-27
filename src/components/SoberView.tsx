import { projects } from "@/lib/projects";

const STACK = [
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "Express",
  "Prisma",
  "Tailwind CSS",
  "Socket.io",
  "Git",
  "Docker",
];

const linkStyle = { color: "#8a9bb4", textDecoration: "underline" };
const headingStyle = { textDecoration: "underline", fontWeight: 700 };

export default function SoberView() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.5 }}>
      <h1 style={{ margin: 0, textAlign: "center" }}>Martin Rodriguez</h1>
      <p style={{ marginTop: 4, color: "#555", textAlign: "center" }}>Software Engineer</p>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={headingStyle}>About</h2>
        <p>
          Developer with 4 years of production experience. I think in edge
          cases, write code that handles failure before it ships, and care
          about reliability as much as features.
        </p>
        <p>Based in Buenos Aires.</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={headingStyle}>Stack</h2>
        <p>{STACK.join(", ")}</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={headingStyle}>Projects</h2>
        <ul>
          {projects.map((p) => {
            const titleHref = p.liveUrl && p.liveUrl !== "#" ? p.liveUrl : p.codeUrl;
            return (
              <li key={p.slug} style={{ marginBottom: "0.75rem" }}>
                {titleHref ? (
                  <a href={titleHref} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <strong>{p.title}</strong>
                  </a>
                ) : (
                  <strong>{p.title}</strong>
                )}
                {" — "}
                {p.description}
                {(p.liveUrl || p.codeUrl) && (
                  <span>
                    {" "}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                        live
                      </a>
                    )}
                    {p.liveUrl && p.codeUrl && " / "}
                    {p.codeUrl && (
                      <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                        code
                      </a>
                    )}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={headingStyle}>Contact</h2>
        <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
          <li>
            <a href="mailto:martin.al.rodriguez24@gmail.com" style={linkStyle}>
              martin.al.rodriguez24@gmail.com
            </a>
          </li>
          <li>
            <a href="https://github.com/marneo23" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/martin-alejandro-rodriguez/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
