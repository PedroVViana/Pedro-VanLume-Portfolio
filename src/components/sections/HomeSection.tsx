import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { ProjectButton } from '@/components/ui/project-button';
import { DownloadButton } from '@/components/ui/download-button';
import { GlowyWavesBg } from '@/components/ui/glowy-waves-bg';
import LocationBadge from '@/components/ui/LocationBadge';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Users, Activity, Layers, Briefcase } from 'lucide-react';
import resumeFile from '@/assets/resume-Pedro-Vanlume.pdf';

const metrics = [
  { icon: Users, label: 'usuários atendidos em sistema industrial', value: '5.000+', color: 'blue' },
  { icon: Activity, label: 'sessões simultâneas em pico', value: '500', color: 'purple' },
  { icon: Layers, label: 'módulos do sistema, 15+ construídos do zero', value: '20 de 22', color: 'blue' },
  { icon: Briefcase, label: 'construindo aplicações em produção', value: '5 anos', color: 'purple' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/PedroVViana' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/pedro-vanlume-0230551b9/' },
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
            initial={false}
            animate="visible"
          >
            {/* Bloco Superior de Contexto */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-10">
              <LocationBadge />
            </motion.div>

            {/* Nome */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl lg:text-[88px] font-bold text-apple-text-primary tracking-tight leading-[0.95] mb-5"
            >
              Pedro Van-Lume
            </motion.h1>

            {/* Cargo */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl font-semibold text-apple-accent-purple mb-8"
            >
              Desenvolvedor Front-end · React, TypeScript e Next.js
            </motion.p>

            {/* Texto */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-apple-text-secondary leading-relaxed max-w-2xl mb-12 font-medium"
            >
              Construo interfaces para produtos que precisam funcionar todo dia, não só no dia do deploy.
              No último ano respondi pelo front-end de um sistema de engenharia industrial usado por mais de
              5.000 pessoas em refinarias e plataformas de petróleo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 relative z-[100]"
            >
              <ProjectButton text="Ver projetos" onClick={() => scrollToSection('projetos')} />
              <DownloadButton
                text="Baixar currículo"
                href={resumeFile}
                downloadName="curriculo-pedro-van-lume.pdf"
              />
            </motion.div>

            {/* Links sociais */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-6 mt-8 relative z-[100]"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-apple-text-secondary hover:text-apple-accent-purple transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent-purple focus-visible:ring-offset-2 rounded"
                >
                  <social.icon size={18} aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              ))}
            </motion.div>

            {/* Metrics cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-12 relative z-[100]"
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
                    <item.icon size={14} aria-hidden="true" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] leading-none">
                    {item.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] text-center leading-tight text-balance">
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
