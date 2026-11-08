import { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectModal, ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { ImageLightbox, type LightboxItem } from './components/ImageLightbox';
import { usePortfolio } from './LanguageContext';

export function App() {
  const { projects: PROJECTS } = usePortfolio();
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = PROJECTS.find((project) => project.id === activeProjectId);
  const projectTriggerRef = useRef<HTMLElement | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const openProject = (projectId: string, trigger: HTMLElement) => {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return;
    projectTriggerRef.current = trigger;
    setActiveProjectId(project.id);
  };

  const openLightbox = (item: LightboxItem, trigger: HTMLElement) => {
    lightboxTriggerRef.current = trigger;
    setLightboxItem(item);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-accent/25 selection:text-ink-strong">
      <div inert={Boolean(activeProject) || lightboxItem !== null}>
        <Navbar />

        <main>
          <HeroSection onOpenProject={openProject} />
          <AboutSection />
          <ProjectsSection onOpenProject={openProject} />
          <TimelineSection />
          <SkillsSection />
        </main>

        <Footer />
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
          onOpenLightbox={openLightbox}
          returnFocus={projectTriggerRef.current}
          isLightboxOpen={lightboxItem !== null}
        />
      )}

      <ImageLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        returnFocus={lightboxTriggerRef.current}
      />
    </div>
  );
}

export default App;
