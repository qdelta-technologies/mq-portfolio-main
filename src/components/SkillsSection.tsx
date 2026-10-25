import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Bot, BrainCircuit, Braces, Cloud, Code2, Database, FileText,
  GitBranch, Megaphone, Palette, PenTool, Sparkles, Workflow,
  type LucideIcon,
} from 'lucide-react';
import { AmbientSection } from './AmbientSection';
import { SectionHeader } from './SectionHeader';
import { useSiteMotion } from './SiteMotion';

interface OrbitSkill {
  id: string;
  label: string;
  description: string;
  Icon: LucideIcon;
  angle: number;
}

interface OrbitRing {
  id: string;
  skills: OrbitSkill[];
}

// A focused selection from the skills and tools listed in portfolioData.ts.
const ORBITS: OrbitRing[] = [
  {
    id: 'inner',
    skills: [
      { id: 'react', label: 'React', description: 'Component-driven web interfaces', Icon: Braces, angle: 0 },
      { id: 'python', label: 'Python', description: 'Development and data workflows', Icon: Code2, angle: 90 },
      { id: 'figma', label: 'Figma', description: 'Prototypes and visual systems', Icon: PenTool, angle: 180 },
      { id: 'ai-automation', label: 'AI Automation', description: 'Practical AI-powered workflows', Icon: BrainCircuit, angle: 270 },
    ],
  },
  {
    id: 'middle',
    skills: [
      { id: 'nextjs', label: 'Next.js', description: 'Modern web applications', Icon: Code2, angle: 32 },
      { id: 'n8n', label: 'n8n', description: 'Connected workflow automation', Icon: Workflow, angle: 104 },
      { id: 'chatgpt', label: 'ChatGPT', description: 'Generative AI for practical tasks', Icon: Bot, angle: 150 },
      { id: 'github', label: 'Git & GitHub', description: 'Version control and collaboration', Icon: GitBranch, angle: 248 },
      { id: 'uiux', label: 'UI/UX Design', description: 'User-focused digital experiences', Icon: Palette, angle: 340 },
    ],
  },
  {
    id: 'outer',
    skills: [
      { id: 'make', label: 'Make', description: 'No-code connected automations', Icon: Workflow, angle: 0 },
      { id: 'supabase', label: 'Supabase', description: 'Backend services and data', Icon: Database, angle: 51 },
      { id: 'prompting', label: 'Prompt Engineering', description: 'Structured prompts for AI systems', Icon: Sparkles, angle: 90 },
      { id: 'canva', label: 'Canva', description: 'Visual assets and content design', Icon: Palette, angle: 130 },
      { id: 'content', label: 'Content Writing', description: 'Clear digital storytelling', Icon: FileText, angle: 206 },
      { id: 'social', label: 'Social Media Marketing', description: 'Content and audience strategy', Icon: Megaphone, angle: 257 },
      { id: 'crm', label: 'CRM Management', description: 'Organized customer workflows', Icon: Cloud, angle: 309 },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [selected, setSelected] = useState<OrbitSkill>(ORBITS[0].skills[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.08 });
  const { reducedMotion, pageVisible } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const orbitY = useTransform(smoothProgress, [0, 1], ['-1.2%', '1.2%']);

  return (
    <AmbientSection
      id="skills"
      ref={sectionRef}
      pattern="constellation"
      data-orbit-active={!reducedMotion && pageVisible && inView}
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FAF9F6] border-t border-stroke/75 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Skills & Tools" watermark="SKILLS">
          <span>Tools I Use to Build, Design and </span>
          <span className="text-violet-600">Innovate.</span>
        </SectionHeader>

        <div className="skill-orbit-shell mx-auto">
          <motion.div className="skill-orbit-stage" style={{ y: reducedMotion ? 0 : orbitY }} role="group" aria-label="Skills and tools">
            <div className="skill-orbit-core" aria-hidden="true">
              <span className="skill-orbit-core__letters">MQ</span>
              <span className="skill-orbit-core__caption">Creative × Technical</span>
            </div>

            {ORBITS.map(ring => (
              <div className={`skill-orbit-ring skill-orbit-ring--${ring.id}`} key={ring.id}>
                {ring.skills.map(skill => {
                  const radians = skill.angle * Math.PI / 180;
                  const position = {
                    left: `${50 + Math.cos(radians) * 50}%`,
                    top: `${50 + Math.sin(radians) * 50}%`,
                  };
                  const active = selected.id === skill.id;
                  return (
                    <div className="skill-orbit-item" key={skill.id} style={position}>
                      <div className="skill-orbit-label">
                        <button
                          type="button"
                          className="skill-orbit-pill"
                          aria-pressed={active}
                          onClick={() => setSelected(skill)}
                        >
                          <span className="skill-orbit-pill__icon"><skill.Icon aria-hidden="true" size={16} strokeWidth={2} /></span>
                          <span className="skill-orbit-pill__text">{skill.label}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </AmbientSection>
  );
};

export default SkillsSection;
