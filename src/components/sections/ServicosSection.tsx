import React from 'react';
import { LayoutTemplate, Server, Sparkles, RefreshCcw } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';

interface Capability {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const capabilities: Capability[] = [
  {
    id: 1,
    title: 'Interfaces em produção',
    subtitle: 'React, Next.js, Angular e TypeScript · design system, testes automatizados, PageSpeed 90+',
    icon: LayoutTemplate,
  },
  {
    id: 2,
    title: 'APIs e integrações',
    subtitle: 'Node.js, TypeScript e FastAPI · autenticação, pagamentos, filas e processamento assíncrono',
    icon: Server,
  },
  {
    id: 3,
    title: 'Aplicações com IA generativa',
    subtitle: 'RAG, sistemas multiagentes e integração com LLM APIs',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Modernização de sistemas legados',
    subtitle: 'Refatoração incremental, unificação de interfaces e decisões de arquitetura documentadas',
    icon: RefreshCcw,
  },
];

function CapabilityRow({ capability }: { capability: Capability }) {
  const Icon = capability.icon;
  return (
    <li className="group flex items-start gap-5 border-t border-[var(--color-border)] py-7 md:py-9 last:border-b transition-all duration-300">
      <div className="w-9 h-9 mt-1 shrink-0 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-light)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
          {capability.title}
        </h3>
        <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed mt-1.5 max-w-2xl transition-transform duration-300 group-hover:translate-x-1.5">
          {capability.subtitle}
        </p>
      </div>
    </li>
  );
}

const ServicosSection: React.FC = () => {
  return (
    <Section id="especialidades" className="bg-[var(--color-bg-primary)]">
      <Container>
        {/* Header */}
        <header className="mb-4 max-w-3xl">
          <p className="text-[var(--color-accent-purple)] font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            ESPECIALIDADES
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight">
              O que eu construo
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed md:max-w-sm">
              Aplicações que precisam funcionar todo dia, não só no dia do deploy.
            </p>
          </div>
        </header>

        {/* Lista de especialidades */}
        <ul className="relative flex flex-col list-none">
          {capabilities.map((cap) => (
            <CapabilityRow key={cap.id} capability={cap} />
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export default ServicosSection;
