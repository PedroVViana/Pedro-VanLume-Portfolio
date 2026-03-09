import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectButton } from '@/components/ui/project-button';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { AuroraBackground } from '@/components/ui/aurora-background';
import LocationBadge from '@/components/ui/LocationBadge';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

const HomeSection: React.FC = () => {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <Section id="home" spacing="none" className="min-h-screen overflow-hidden relative">
      <AuroraBackground className="h-screen w-full pt-[var(--navbar-height)]">
        <Container className="flex-1 flex flex-col items-center justify-center relative z-30 py-12">
          <motion.div
            className="max-w-4xl w-full flex flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Bloco Superior de Contexto (Header da Hero) */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-14">
              <LocationBadge />
              <div className="flex flex-col items-center">
                <span className="text-apple-accent-purple font-bold text-[11px] sm:text-[12px] tracking-[0.4em] uppercase">
                  Software House · Soluções sob medida
                </span>
                <div className="h-[1.5px] w-10 bg-apple-accent-blue/20 mt-3" />
              </div>
            </motion.div>

            {/* Headline Monumental Style Apple */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl lg:text-[88px] font-bold text-apple-text-primary tracking-tight leading-[0.95] mb-8"
            >
              Transformamos ideias <br />
              <span className="text-apple-accent-purple">complexas em produtos</span> escaláveis
            </motion.h1>

            {/* Subheadline Elegante */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-apple-text-secondary leading-relaxed max-w-2xl mb-12 font-medium"
            >
              Soluções de software sob medida para otimizar sua operação — com foco em ROI, performance e escalabilidade.
            </motion.p>

            {/* CTAs com Estilo Refinado */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 relative z-[100]"
            >
              <ProjectButton onClick={() => scrollToSection('portfolio')} />
              <GetStartedButton
                text="Solicitar Orçamento"
                onClick={() => scrollToSection('contato')}
              />
            </motion.div>
          </motion.div>
        </Container>
      </AuroraBackground>
    </Section>
  );
};

export default HomeSection;
