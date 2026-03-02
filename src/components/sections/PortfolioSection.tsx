import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import finelyPlannedImage from '../../assets/finely-planned.png';
import easyPackImage from '../../assets/EasyPack.png';
import textoMaestroImage from '../../assets/textoMaestro.png';
import levepromedicoImage from '../../assets/levepromedico.png';
import metaAdsImage from '../../assets/meta-ads.png';
import tempoCertoImage from '../../assets/tempoCerto.png';
import cvInsignesImage from '../../assets/cvInsignes.png';
import clinicaFluxoImage from '../../assets/clinicafluxo.png';
import borgesAcademyImage from '../../assets/borgesAcademy.png';
import consorcioDaVezImage from '../../assets/consorcioDaVez.png';
import vanlumetrafegoImage from '../../assets/vanlumetrafego.png';
import templateImobiliariaImage from '../../assets/templateImobiliaria.png';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  badge?: string;
  technologies: string[];
  image: string;
  projectUrl: string;
  category: 'sistema' | 'site';
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
    category: 'sistema',
  },
  {
    id: 2,
    title: 'Meta Ads Insights — Dashboard de BI',
    description: 'Dashboard de BI para tráfego pago com integração de APIs e visualização de dados complexos em tempo real.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
    image: metaAdsImage,
    projectUrl: 'https://meta-ads-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 3,
    title: 'Finely Planned — Planejamento Financeiro',
    description: 'Dashboard de orçamento e gastos com indicadores em tempo real, comparações mensais e visão rápida do saldo disponível — feito para manter decisões simples e consistentes.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Redux', 'Firebase'],
    image: finelyPlannedImage,
    projectUrl: 'https://finely-planned.vercel.app/',
    category: 'sistema',
  },
  {
    id: 4,
    title: 'Texto Maestro',
    description: 'Editor inteligente com LLMs para refinamento gramatical e estilístico de textos em português.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind', 'TypeScript'],
    image: textoMaestroImage,
    projectUrl: 'https://texto-maestro.vercel.app/',
    category: 'sistema',
  },
  {
    id: 5,
    title: 'EasyHub Pack',
    description: 'Marketplace de assets digitais para criativos com checkout integrado e alta conversão.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: easyPackImage,
    projectUrl: 'https://easyhubpack.com/',
    category: 'site',
  },
  {
    id: 6,
    title: 'Tempo Certo',
    description: 'Ferramenta para controle rigoroso da rotina de saúde: registro de doses de medicamentos e acompanhamento de metas de hidratação com foco na facilidade de uso.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    image: tempoCertoImage,
    projectUrl: 'https://tempo-certo-wine.vercel.app/login',
    category: 'sistema',
  },
  {
    id: 7,
    title: 'CV-Insignes',
    description: 'Engenharia de Prompt e IA Generativa para análise de currículos.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'IA Generativa', 'Tailwind'],
    image: cvInsignesImage,
    projectUrl: 'https://cv-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 8,
    title: 'Clínica Fluxo',
    description:
      'Refatoração completa da presença digital da Clínica Fluxo, com design minimalista e sofisticado para elevar a percepção de valor da marca.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'GSAP'],
    image: clinicaFluxoImage,
    projectUrl: 'https://clinica-fluxo-de-fisioterapia-premi.vercel.app/',
    category: 'site',
  },
  {
    id: 9,
    title: 'Borges Tennis Academy',
    description:
      'Site institucional para uma academia de tênis na Flórida, com foco em autoridade, programas e captação de leads qualificados.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: borgesAcademyImage,
    projectUrl: 'https://borgestennisacademy.com/',
    category: 'site',
  },
  {
    id: 10,
    title: 'Consórcio da Vez',
    description:
      'Landing page para uma agência de consórcio, com comunica\u00e7\u00e3o direta sobre benef\u00edcios reais, provas sociais e simula\u00e7\u00e3o de planos.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: consorcioDaVezImage,
    projectUrl: 'https://consorciodavez.com.br/',
    category: 'site',
  },
  {
    id: 11,
    title: 'Vanlume Tráfego',
    description:
      'Landing page focada na venda de templates de automa\u00e7\u00e3o n8n para Meta Ads, com destaque para ganhos de produtividade e automa\u00e7\u00e3o em tempo real.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: vanlumetrafegoImage,
    projectUrl: 'https://vanlumetrafego.com.br/',
    category: 'site',
  },
  {
    id: 12,
    title: 'Template de Agência Imobiliária',
    description:
      'Landing page template para agências imobiliárias, com foco em curadoria de imóveis, provas sociais e captação de leads qualificados.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP', 'ScrollTrigger'],
    image: templateImobiliariaImage,
    projectUrl: 'https://agencia-imobiliaria.vercel.app/',
    category: 'site',
  },
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const overlayId = `portfolio-card-${item.id}`;

  return (
    <article
      className="portfolio-card portfolio-card--grid"
      aria-labelledby={overlayId}
    >
      <div className="portfolio-card__img-wrap">
        <img
          src={item.image}
          alt=""
          className="portfolio-card__bg"
          loading="lazy"
        />
      </div>
      <div className="portfolio-card__overlay" id={overlayId}>
        {item.badge && (
          <span className="portfolio-card__badge">{item.badge}</span>
        )}
        <h3 className="portfolio-card__title">{item.title}</h3>
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
  const [activeCategory, setActiveCategory] = useState<'sistemas' | 'sites'>('sistemas');

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

  const filteredData =
    activeCategory === 'sistemas'
      ? portfolioData.filter((p) => p.category === 'sistema')
      : portfolioData.filter((p) => p.category === 'site');

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

          <nav
            className="portfolio__menu"
            role="tablist"
            aria-label="Filtrar portfólio por tipo"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'sistemas'}
              aria-controls="portfolio-panel-sistemas"
              id="portfolio-tab-sistemas"
              className={`portfolio__menu-btn ${activeCategory === 'sistemas' ? 'portfolio__menu-btn--active' : ''}`}
              onClick={() => setActiveCategory('sistemas')}
            >
              Sistemas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'sites'}
              aria-controls="portfolio-panel-sites"
              id="portfolio-tab-sites"
              className={`portfolio__menu-btn ${activeCategory === 'sites' ? 'portfolio__menu-btn--active' : ''}`}
              onClick={() => setActiveCategory('sites')}
            >
              Sites
            </button>
          </nav>

          <div
            id={activeCategory === 'sistemas' ? 'portfolio-panel-sistemas' : 'portfolio-panel-sites'}
            role="tabpanel"
            aria-labelledby={activeCategory === 'sistemas' ? 'portfolio-tab-sistemas' : 'portfolio-tab-sites'}
            className="portfolio__cards"
          >
            {filteredData.length > 0 ? (
              <div className="portfolio__grid">
                {filteredData.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="portfolio__empty">Nenhum projeto nesta categoria.</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PortfolioSection;
