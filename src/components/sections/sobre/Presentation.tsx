import React from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import TeamMemberCard from '@/components/ui/team-member-card';
import avatarImage from '@/assets/avatar.png';

const Presentation: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => {
      (document.getElementById('contact-name') as HTMLInputElement | null)?.focus({ preventScroll: true });
    }, 450);
  };

  return (
    <Section id="sobre" spacing="none" className="bg-white py-24 sm:py-32 overflow-hidden">
      <Container>

        {/* ── Section header ── */}
        <header className="mb-16 max-w-3xl">
          <span className="text-[var(--color-accent-purple)] font-semibold text-xs tracking-[0.2em] uppercase">
            A DevLume
          </span>
          <div className="h-[1.5px] w-8 bg-[var(--color-accent-purple)]/20 mt-3 mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.05] mb-5">
            Resolvemos problemas de operação{' '}
            <span className="text-[var(--color-accent-purple)]">
              com software que gera resultado.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl font-medium">
            Especializamo-nos em ferramentas que aumentam eficiência operacional: automação de
            prospecção, gestão de indicadores e dashboards para decisão baseada em dados.
          </p>
        </header>

        {/* ── Editorial card ── */}
        <TeamMemberCard
          position="left"
          jobPosition="Founder & Lead Engineer · DevLume"
          firstName="Pedro"
          lastName="Van-Lume"
          imageUrl={avatarImage}
          description="Entregamos sistemas escaláveis com foco em ROI e performance. Sem achismo — só engenharia e resultado mensurável para o seu negócio."
          onCtaClick={scrollToContact}
        />

      </Container>
    </Section>
  );
};

export default Presentation;
