import { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectModal, ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { ImageLightbox, type LightboxItem } from './components/ImageLightbox';
import { PROJECTS, type ProjectItem } from './data/portfolioData';

export function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const projectTriggerRef = useRef<HTMLElement | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const openProject = (projectId: string, trigger: HTMLElement) => {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return;
    projectTriggerRef.current = trigger;
    setActiveProject(project);
  };

  const openLightbox = (item: LightboxItem, trigger: HTMLElement) => {
    lightboxTriggerRef.current = trigger;
    setLightboxItem(item);
  };

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-[#ddd2d0] selection:bg-[#fb8472]/25 selection:text-[#fff6f4]">
      <div inert={activeProject !== null || lightboxItem !== null}>
        <Navbar />

        <main>
          <HeroSection />
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
          onClose={() => setActiveProject(null)}
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
