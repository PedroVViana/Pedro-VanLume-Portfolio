import React from 'react';
import Presentation from './sobre/Presentation';
import TechSkills from './sobre/TechSkills';
import Experience from './sobre/Experience';

const SobreSection: React.FC = () => {
  return (
    <section id="sobre" className="sobre-section">
      <Presentation />
      <Experience />
      <TechSkills />
    </section>
  );
};

export default SobreSection;

