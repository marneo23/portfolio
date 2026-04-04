import GrainOverlay from "@/components/GrainOverlay";
import GrainBurst from "@/components/GrainBurst";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";
import LoadSequence from "@/components/LoadSequence";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";

export default function Home() {
  return (
    <LoadSequence>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <GrainOverlay />
      <Navigation />
      <KonamiEasterEgg />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <GrainBurst><About /></GrainBurst>
        <SectionDivider />
        <GrainBurst><Projects /></GrainBurst>
        <SectionDivider />
        <GrainBurst><Contact /></GrainBurst>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-text-muted">
            &copy; {new Date().getFullYear()} Mart&iacute;n &mdash; Built with grit
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a
              href="https://github.com/marneo23"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center font-body text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent-hot"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center font-body text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent-hot"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>
    </LoadSequence>
  );
}
