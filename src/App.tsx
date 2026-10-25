import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExpertiseTicker } from './components/ExpertiseTicker';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PageProgress, SiteMotionProvider, useSiteMotion } from './components/SiteMotion';

const PortfolioPage: React.FC = () => {
  const { reducedMotion, pageVisible } = useSiteMotion();
  return (
    <div data-page-motion={reducedMotion || !pageVisible ? 'paused' : 'running'} className="min-h-screen bg-[#FAF9F6] text-[#0F172A] selection:bg-[#DDD6FE] selection:text-[#5B21B6] flex flex-col font-sans overflow-x-clip">
      <PageProgress />
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col justify-start">
        <HeroSection />
        <ExpertiseTicker />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => <SiteMotionProvider><PortfolioPage /></SiteMotionProvider>;

export default App;
