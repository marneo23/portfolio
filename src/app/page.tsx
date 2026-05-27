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
import ModeShell from "@/components/ModeShell";

export default function Home() {
  return (
    <ModeShell>
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
              &copy; {new Date().getFullYear()} Martin Rodriguez
            </p>
          </footer>
        </main>
      </LoadSequence>
    </ModeShell>
  );
}
