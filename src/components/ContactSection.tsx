import React from 'react';
import { SectionHeader } from './SectionHeader';
import { AmbientSection } from './AmbientSection';
import { ContactPanel } from './ContactPanel';

export const ContactSection: React.FC = () => {
  return (
    <AmbientSection id="contact" pattern="contact" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-stroke/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Let's Work Together" watermark="CONTACT">
          <span>Have a </span>
          <span className="text-violet-600">project</span>
          <span> in mind?</span>
        </SectionHeader>
        
        <ContactPanel />

      </div>
    </AmbientSection>
  );
};

export default ContactSection;
