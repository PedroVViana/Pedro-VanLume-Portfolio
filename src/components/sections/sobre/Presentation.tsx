import React, { useState, useEffect } from 'react';
import { Layers, Briefcase, Zap } from 'lucide-react';
import { ProjectButton } from '@/components/ui/project-button';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { DownloadButton } from '@/components/ui/download-button';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import avatarImage from '@/assets/avatar.png';

const Presentation: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section id="sobre" spacing="none" className="bg-white py-24 sm:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-24">

          {/* Lado Esquerdo: Foto Editorial (Compacta) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#F5F5F7] shadow-apple-lg group">
              <img
                src={avatarImage}
                alt="Pedro Van-Lume"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Lado Direito: Conteúdo Semântico Organizado */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-10">
            <div className="space-y-6">
              <div className="flex flex-col items-start gap-3">
                <span className="text-apple-accent-purple font-bold text-xs tracking-[0.2em] uppercase">
                  Sobre Mim
                </span>
                <div className="h-[1.5px] w-8 bg-apple-accent-purple/20" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-apple-text-primary tracking-tight leading-[1.05]">
                Interfaces intuitivas, <br />
                <span className="text-apple-accent-purple">arquitetura sólida.</span>
              </h2>

              <p className="text-lg md:text-xl text-apple-text-secondary leading-relaxed max-w-xl font-medium">
                Meu foco é resolver problemas complexos com simplicidade técnica. Transformo requisitos em experiências que parecem naturais para quem as usa.
              </p>
            </div>

            {/* Micro-cards de Info (Compactos) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Layers, label: 'Projetos Entregues', value: '+100', color: 'blue' },
                { icon: Briefcase, label: 'Carreira', value: '+4 Anos', color: 'purple' },
                { icon: Zap, label: 'PageSpeed Performance', value: '+90', color: 'blue' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#F5F5F7]/50 border border-apple-border hover:bg-white hover:shadow-apple-sm transition-all group">
                  <div className={`w-8 h-8 rounded-full mb-4 flex items-center justify-center ${item.color === 'blue' ? 'bg-apple-accent-blue/10 text-apple-accent-blue' : 'bg-apple-accent-purple/10 text-apple-accent-purple'}`}>
                    <item.icon size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-apple-text-primary mb-0.5">{item.value}</h3>
                  <p className="text-[10px] text-apple-text-tertiary font-bold uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs Consistentes com a Hero */}
            <div className={`flex flex-wrap items-center gap-6 transition-all duration-700 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <ProjectButton onClick={() => scrollToSection('portfolio')} />
              <GetStartedButton
                text="Trabalhe Comigo"
                onClick={() => scrollToSection('contato')}
              />
              <DownloadButton
                text="Download CV"
                onClick={() => window.open('/cv.pdf', '_blank')}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Presentation;
