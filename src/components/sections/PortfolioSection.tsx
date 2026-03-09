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
  'Cases reais: sistemas e landing pages que entregam eficiência operacional, decisão baseada em dados e crescimento escalável para negócios.';

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'LeveProMedico',
    description: 'Eficiência operacional em clínicas: prontuário eletrônico, agendamentos e gestão de saúde digital em um único sistema.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'Node.js', 'Docker', 'Redux', 'TypeScript'],
    image: levepromedicoImage,
    projectUrl: 'https://levepromedico.com.br/assinar/',
    category: 'sistema',
  },
  {
    id: 2,
    title: 'Meta Ads Insights — Dashboard de BI',
    description: 'Tomada de decisão baseada em dados de marketing: relatórios e métricas de tráfego pago em tempo real para otimizar investimento.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
    image: metaAdsImage,
    projectUrl: 'https://meta-ads-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 3,
    title: 'Finely Planned — Planejamento Financeiro',
    description: 'Gestão de indicadores e produtividade operacional: visão clara de orçamento, gastos e saldo para decisões financeiras consistentes.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Redux', 'Firebase'],
    image: finelyPlannedImage,
    projectUrl: 'https://finely-planned.vercel.app/',
    category: 'sistema',
  },
  {
    id: 4,
    title: 'Texto Maestro',
    description: 'Produtividade em conteúdo: refinamento gramatical e estilístico com IA para equipes que precisam de texto impecável em escala.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind', 'TypeScript'],
    image: textoMaestroImage,
    projectUrl: 'https://texto-maestro.vercel.app/',
    category: 'sistema',
  },
  {
    id: 5,
    title: 'EasyHub Pack',
    description: 'Conversão e credibilidade: marketplace de assets com checkout integrado e experiência de compra que gera confiança.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: easyPackImage,
    projectUrl: 'https://easyhubpack.com/',
    category: 'site',
  },
  {
    id: 6,
    title: 'Tempo Certo',
    description: 'Adesão e controle de rotina de saúde: registro de medicamentos e metas de hidratação para pacientes e cuidadores.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    image: tempoCertoImage,
    projectUrl: 'https://tempo-certo-wine.vercel.app/login',
    category: 'sistema',
  },
  {
    id: 7,
    title: 'CV-Insignes',
    description: 'Automação de prospecção e enriquecimento de dados: análise de currículos com IA para recrutamento e matching assertivo.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'IA Generativa', 'Tailwind'],
    image: cvInsignesImage,
    projectUrl: 'https://cv-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 8,
    title: 'Clínica Fluxo',
    description: 'Posicionamento de marca e conversão: presença digital minimalista que eleva a percepção de valor e gera agendamentos.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'GSAP'],
    image: clinicaFluxoImage,
    projectUrl: 'https://clinica-fluxo-de-fisioterapia-premi.vercel.app/',
    category: 'site',
  },
  {
    id: 9,
    title: 'Borges Tennis Academy',
    description: 'Autoridade e captação de leads: site institucional que comunica diferenciais e convida à ação para aulas e programas.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: borgesAcademyImage,
    projectUrl: 'https://borgestennisacademy.com/',
    category: 'site',
  },
  {
    id: 10,
    title: 'Consórcio da Vez',
    description: 'Clareza e conversão: landing que explica benefícios reais do consórcio, reforça confiança e direciona para simulação e contato.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: consorcioDaVezImage,
    projectUrl: 'https://consorciodavez.com.br/',
    category: 'site',
  },
  {
    id: 11,
    title: 'Vanlume Tráfego',
    description: 'Venda de produto digital: landing que destaca ganhos de produtividade e automação em Meta Ads para fechamento de templates n8n.',
    badge: 'SISTEMA EM PRODUÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: vanlumetrafegoImage,
    projectUrl: 'https://vanlumetrafego.com.br/',
    category: 'site',
  },
  {
    id: 12,
    title: 'Template de Agência Imobiliária',
    description: 'Captação qualificada para imobiliárias: curadoria de imóveis, provas sociais e formulário orientado a lead para visita e avaliação.',
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
            <p className="portfolio__eyebrow">CASES</p>
            <h2 className="portfolio__title">Projetos que geram resultado</h2>
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
