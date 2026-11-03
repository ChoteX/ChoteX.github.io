import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { ImageLightbox, type LightboxItem } from './components/ImageLightbox';

export function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-[#ddd2d0] selection:bg-[#fb8472]/25 selection:text-[#fff6f4]">
      <Navbar />

      <main>
        <HeroSection />
        <ProjectsSection onOpenLightbox={setLightboxItem} />
        <TimelineSection />
        <SkillsSection />
      </main>

      <Footer />

      <ImageLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </div>
  );
}

export default App;
