import React from 'react';
import Button from '../UI/Button';
import avatarImage from '../../assets/avatar.png';
import AnimatedBackground from '../UI/AnimatedBackground';
import ScrollIndicator from '../UI/ScrollIndicator';

const HomeSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="h-screen w-full flex items-start justify-center bg-neutral-white px-4 pt-8 md:pt-12 relative overflow-hidden"
    >
      <AnimatedBackground />
      <div className="max-w-7xl w-full mx-auto relative z-10 pt-2 md:pt-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          <div className="flex-1 space-y-2 md:space-y-3 animate-fade-in">
            <div className="space-y-1 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-tight">
                <span className="text-gradient text-xl sm:text-2xl md:text-3xl lg:text-4xl sm:whitespace-nowrap">
                  Desenvolvimento Fullstack & Design
                </span>
                <br/> 
                <span className="text-primary-blue text-base sm:text-lg md:text-xl lg:text-2xl">para produtos digitais escaláveis e bem construídos.</span>
              </h1>
            </div>
            
            <div className="divider-gradient"></div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-dark/80 leading-relaxed max-w-2xl font-light">
              Desenvolvo aplicações completas — do front ao back — unindo arquitetura sólida, UX clara e performance. Interfaces modernas, APIs eficientes e experiências digitais bem estruturadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Button 
                variant="primary"
                onClick={() => scrollToSection('portfolio')}
              >
                Portfolio
              </Button>
              <Button 
                variant="secondary"
                onClick={() => scrollToSection('contato')}
              >
                Fale Comigo
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0 lg:w-1/2 flex justify-center lg:justify-end">
            <div className="hero-avatar overflow-hidden shadow-lg">
              <img 
                src={avatarImage} 
                alt="Avatar" 
                className="w-full max-w-xs lg:max-w-sm h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default HomeSection;

