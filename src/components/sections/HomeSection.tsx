import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectButton } from '@/components/ui/project-button';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { GlowyWavesBg } from '@/components/ui/glowy-waves-bg';
import LocationBadge from '@/components/ui/LocationBadge';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Layers, Briefcase, Zap, TrendingUp } from 'lucide-react';

const metrics = [
  { icon: Layers, label: 'Projetos Desenvolvidos', value: '+100', color: 'blue' },
  { icon: Briefcase, label: 'Anos de Experiência', value: '+4 Anos', color: 'purple' },
  { icon: TrendingUp, label: 'Receita Impulsionada', value: '+R$ 500k', color: 'blue' },
  { icon: Zap, label: 'Tecnologias Dominadas', value: '15+', color: 'purple' },
];

const HomeSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
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
    <Section id="home" spacing="none" className="min-h-screen overflow-hidden relative bg-white">
      {/* Canvas de ondas animadas */}
      <GlowyWavesBg />

      {/* Brilho central sutil sobre as ondas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[480px] w-[560px] rounded-full bg-[#8c52ff]/[0.06] blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#0071E3]/[0.05] blur-[110px]" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-[var(--navbar-height)]">
        <Container className="flex flex-col items-center justify-center py-12">
          <motion.div
            className="max-w-4xl w-full flex flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Bloco Superior de Contexto */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-14">
              <LocationBadge />
              <div className="flex flex-col items-center">
                <span className="text-apple-accent-purple font-bold text-[11px] sm:text-[12px] tracking-[0.4em] uppercase">
                  Portfólio Pessoal · Pedro Van-Lume
                </span>
                <div className="h-[1.5px] w-10 bg-apple-accent-blue/20 mt-3" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl lg:text-[88px] font-bold text-apple-text-primary tracking-tight leading-[0.95] mb-8"
            >
              Transformando ideias <br />
              <span className="text-apple-accent-purple">em produtos digitais</span> <br />
              bem construídos.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-apple-text-secondary leading-relaxed max-w-2xl mb-12 font-medium"
            >
              Desenvolvedor Front-end e Engenheiro de IA especializado em sistemas web, automações, e-commerces e produtos digitais orientados a resultado.
              {' '}Projetos que já contribuíram para mais de R$ 500 mil em receita, incluindo cases com até 25x de retorno sobre investimento em mídia.
            </motion.p>

            {/* CTAs */}
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

            {/* Metrics cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mt-10 relative z-[100]"
            >
              {metrics.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 py-4 px-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-[var(--color-border)] shadow-[var(--shadow-sm)]"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${item.color === 'blue'
                        ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]'
                        : 'bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]'
                      }`}
                  >
                    <item.icon size={14} />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] leading-none">
                    {item.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
};

export default HomeSection;
