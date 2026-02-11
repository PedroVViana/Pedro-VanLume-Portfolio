import React from 'react';
import Presentation from './sobre/Presentation';
import TechSkills from './sobre/TechSkills';
import Experience from './sobre/Experience';

const SobreSection: React.FC = () => {
  return (
    <div id="sobre">
      <Presentation />
      <Experience />
      <TechSkills />
    </div>
  );
};

export default SobreSection;

