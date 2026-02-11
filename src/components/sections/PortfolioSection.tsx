import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import finelyPlannedImage from '../../assets/finely-planned.png';
import easyPackImage from '../../assets/EasyPack.png';
import textoMaestroImage from '../../assets/textoMaestro.png';
import levepromedicoImage from '../../assets/levepromedico.png';
import metaAdsImage from '../../assets/meta-ads.png';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  badge?: string;
  technologies: string[];
  image: string;
  projectUrl: string;
}

const SECTION_DESCRIPTION =
  'Alguns dos projetos em que atuei com foco em produto, performance e experiência do usuário.';

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'LeveProMedico',
    description: 'Sistema de prontuário eletrônico e gestão de clínicas médicas para agendamentos e saúde digital.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'Node.js', 'Docker', 'Redux', 'TypeScript'],
    image: levepromedicoImage,
    projectUrl: 'https://levepromedico.com.br/assinar/',
  },
  {
    id: 2,
    title: 'Meta Ads Insights — Dashboard de BI',
    description: 'Dashboard de BI para tráfego pago com integração de APIs e visualização de dados complexos em tempo real.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
    image: metaAdsImage,
    projectUrl: 'https://meta-ads-insights.vercel.app/',
  },
  {
    id: 3,
    title: 'Finely Planned — Planejamento Financeiro',
    description: 'Dashboard de orçamento e gastos com indicadores em tempo real, comparações mensais e visão rápida do saldo disponível — feito para manter decisões simples e consistentes.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Redux', 'Firebase'],
    image: finelyPlannedImage,
    projectUrl: 'https://finely-planned.vercel.app/',
  },
  {
    id: 4,
    title: 'Texto Maestro',
    description: 'Editor inteligente com LLMs para refinamento gramatical e estilístico de textos em português.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind', 'TypeScript'],
    image: textoMaestroImage,
    projectUrl: 'https://texto-maestro.vercel.app/',
  },
  {
    id: 5,
    title: 'EasyHub Pack',
    description: 'Marketplace de assets digitais para criativos com checkout integrado e alta conversão.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: easyPackImage,
    projectUrl: 'https://easyhubpack.com/',
  },
];

function PortfolioCard({
  item,
  featured,
}: {
  item: PortfolioItem;
  featured?: boolean;
}) {
  const overlayId = `portfolio-card-${item.id}`;
  const TitleTag = featured ? 'h2' : 'h3';

  return (
    <article
      className={`portfolio-card ${featured ? 'portfolio-card--featured' : 'portfolio-card--grid'}`}
      aria-labelledby={overlayId}
    >
      <div
        className="portfolio-card__bg"
        style={{ backgroundImage: `url(${item.image})` }}
        role="img"
        aria-hidden
      />
      <div className="portfolio-card__overlay" id={overlayId}>
        {item.badge && (
          <span className="portfolio-card__badge">{item.badge}</span>
        )}
        <TitleTag className="portfolio-card__title">{item.title}</TitleTag>
        <p className="portfolio-card__desc">{item.description}</p>
        <div className="portfolio-card__chips" aria-label="Tecnologias">
          {item.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className={`portfolio-card__chip portfolio-card__chip--${idx % 6}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="portfolio-card__cta-wrap">
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-card__cta"
          >
            Ver projeto →
          </a>
        </div>
      </div>
    </article>
  );
}

const PortfolioSection: React.FC = () => {
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

  const [featured, ...gridItems] = portfolioData;

  return (
    <Section id="portfolio" className="bg-[var(--color-bg-primary)]">
      <Container>
        <div
          ref={sectionRef}
          className={`portfolio ${inView ? 'portfolio--in-view' : ''} ${reducedMotion ? 'portfolio--reduced-motion' : ''}`}
        >
          <header className="portfolio__header">
            <p className="portfolio__eyebrow">MEU TRABALHO</p>
            <h2 className="portfolio__title">Projetos Selecionados</h2>
            <p className="portfolio__description">{SECTION_DESCRIPTION}</p>
          </header>

          <div className="portfolio__cards">
            <div className="portfolio__featured">
              <PortfolioCard item={featured} featured />
            </div>
            <div className="portfolio__grid">
              {gridItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PortfolioSection;
