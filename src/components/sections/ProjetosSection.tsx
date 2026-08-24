import React, { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';

interface Projeto {
  id: number;
  repo: string;
  subtitle: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  liveUrl?: string;
}

const SECTION_DESCRIPTION =
  'Arquitetura, testes e decisões técnicas à vista. Todo código aberto.';

const projetos: Projeto[] = [
  {
    id: 1,
    repo: 'Agent-IA-RAG-finance',
    subtitle: 'Plataforma multiagente de análise financeira',
    description:
      'Orquestração de agentes por grafo com LangGraph e pipeline RAG sobre ChromaDB. Arquitetura em camadas, degradação graciosa quando um agente falha, audit trail por execução e 104 testes automatizados.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB', 'pytest'],
    repoUrl: 'https://github.com/PedroVViana/Agent-IA-RAG-finance',
  },
  {
    id: 2,
    repo: 'SistemaDeFila_Java',
    subtitle: 'Processamento assíncrono de jobs com mensageria',
    description:
      'Fila durável com RabbitMQ e PostgreSQL, Clean Architecture em quatro camadas e política de retry com 3 tentativas antes de marcar a mensagem como FAILED.',
    technologies: ['Java', 'Spring Boot', 'RabbitMQ', 'PostgreSQL'],
    repoUrl: 'https://github.com/PedroVViana/SistemaDeFila_Java',
  },
  {
    id: 3,
    repo: 'lib-devlume-pixel',
    subtitle: 'Design system próprio em monorepo',
    description:
      'Biblioteca de componentes React em packages/ui com app de showcase, construída para consistência de UI em escala e reuso entre produtos.',
    technologies: ['React', 'TypeScript', 'Monorepo'],
    repoUrl: 'https://github.com/PedroVViana/lib-devlume-pixel',
  },
  {
    id: 4,
    repo: 'FinApp',
    subtitle: 'App de finanças pessoais, open source e no ar',
    description:
      'Regras de negócio centralizadas em uma camada de domínio testável, design system unificado entre desktop e mobile, e regras de segurança do Firestore reescritas por coleção com validação de dado.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Vite', 'Recharts'],
    repoUrl: 'https://github.com/PedroVViana/FinApp',
    liveUrl: 'https://fin-app-lemon.vercel.app',
  },
  {
    id: 5,
    repo: 'barberflow-calendar',
    subtitle: 'Agendamento para barbearias, no ar',
    description:
      'Dashboards por perfil de usuário, disponibilidade semanal configurável e gestão de bloqueios de agenda.',
    technologies: ['React', 'TypeScript'],
    repoUrl: 'https://github.com/PedroVViana/barberflow-calendar',
    liveUrl: 'https://barberflow-calendar.vercel.app',
  },
  {
    id: 6,
    repo: 'tempo-certo',
    subtitle: 'Lembretes de medicação de uso contínuo, no ar',
    description:
      'Fluxo de rotinas e notificações desenhado para faixas etárias diferentes, com registro diário de adesão ao tratamento.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repoUrl: 'https://github.com/PedroVViana/tempo-certo',
    liveUrl: 'https://tempo-certo-wine.vercel.app',
  },
];

function ProjetoCard({ projeto }: { projeto: Projeto }) {
  return (
    <article className="projeto-card">
      <p className="projeto-card__repo">
        <Github size={15} strokeWidth={2} aria-hidden="true" />
        {projeto.repo}
      </p>
      <h3 className="projeto-card__subtitle">{projeto.subtitle}</h3>
      <p className="projeto-card__desc">{projeto.description}</p>

      <ul className="projeto-card__chips" aria-label={`Tecnologias de ${projeto.repo}`}>
        {projeto.technologies.map((tech) => (
          <li key={tech} className="projeto-card__chip">
            {tech}
          </li>
        ))}
      </ul>

      <div className="projeto-card__links">
        <a
          href={projeto.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="projeto-card__link"
        >
          <Github size={15} strokeWidth={2} aria-hidden="true" />
          Ver código
          <span className="sr-only"> de {projeto.repo} no GitHub</span>
        </a>
        {projeto.liveUrl && (
          <a
            href={projeto.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="projeto-card__link"
          >
            <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
            Ver online
            <span className="sr-only"> o projeto {projeto.repo}</span>
          </a>
        )}
      </div>
    </article>
  );
}

const ProjetosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(reduced.matches);
    const onReduce = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    reduced.addEventListener('change', onReduce);
    return () => reduced.removeEventListener('change', onReduce);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Section id="projetos" className="bg-[var(--color-bg-primary)]">
      <Container>
        <div
          ref={sectionRef}
          className={`projetos ${inView ? 'projetos--in-view' : ''} ${reducedMotion ? 'projetos--reduced-motion' : ''}`}
        >
          <header className="projetos__header">
            <p className="projetos__eyebrow">CÓDIGO ABERTO</p>
            <h2 className="projetos__title">Projetos</h2>
            <p className="projetos__description">{SECTION_DESCRIPTION}</p>
          </header>

          <div className="projetos__grid">
            {projetos.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ProjetosSection;
