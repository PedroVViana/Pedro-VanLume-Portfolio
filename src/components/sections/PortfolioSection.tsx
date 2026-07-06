import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import finelyPlannedImage from '../../assets/finely-planned.png';
import homenzcolatinaImage from '../../assets/homenz.png';
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
  'Seleção de projetos desenvolvidos: sistemas e landing pages sob medida para otimizar processos, analisar dados e gerar resultados reais.';

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: 'Homenz Colatina',
    description: `Objetivo: Atrair leads qualificados e gerar vendas para a inauguração da nova unidade.
Desafio: Destacar a clínica em um mercado competitivo de estética masculina e otimizar a conversão de tráfego pago.
Atuação: Desenvolvimento do site focado em performance, SEO técnico, UX/UI responsivo e otimização de conversão (CRO).
Resultado: Mais de R$ 126k faturados com 25x de retorno sobre investimento em mídia (trabalho em parceria com a agência de tráfego).`,
    badge: '🏆 CASE DE DESTAQUE | 25x ROI',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'SEO Técnico', 'Otimização de Conversão'],
    image: homenzcolatinaImage,
    projectUrl: 'https://homenzcolatina.com/',
    category: 'site',
  },
  {
    id: 2,
    title: 'LeveProMedico',
    description: `Objetivo: Centralizar a operação de clínicas médicas com prontuário eletrônico e agendamento.
Desafio: Garantir alta disponibilidade, segurança de dados sensíveis e interface intuitiva para médicos e secretários.
Atuação: Engenharia de front-end, arquitetura de estado com Redux e integração de APIs.
Resultado: Redução de 40% no tempo operacional de agendamento e prontuários digitais seguros em produção.`,
    badge: '🏢 SISTEMA CORPORATIVO',
    technologies: ['React', 'Node.js', 'Docker', 'Redux', 'TypeScript'],
    image: levepromedicoImage,
    projectUrl: 'https://levepromedico.com.br/assinar/',
    category: 'sistema',
  },
  {
    id: 3,
    title: 'Meta Ads Insights — Dashboard de BI',
    description: `Objetivo: Facilitar a tomada de decisão em tráfego pago através de relatórios em tempo real.
Desafio: Processar e renderizar grandes volumes de dados de campanhas sem perda de performance.
Atuação: Otimização de performance de renderização, modelagem de gráficos e consumo de APIs de marketing.
Resultado: Aumento de 30% na velocidade de análise de métricas por equipes de growth.`,
    badge: '📈 CONVERSÃO & DADOS',
    technologies: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
    image: metaAdsImage,
    projectUrl: 'https://meta-ads-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 4,
    title: 'Finely Planned — Planejamento Financeiro',
    description: `Objetivo: Proporcionar controle financeiro claro e prático para gestão de orçamentos e gastos.
Desafio: Sincronização em tempo real e cálculos de balanços dinâmicos e precisos.
Atuação: Desenvolvimento completo do app, modelagem do banco Firebase e gerenciamento de estado global.
Resultado: Interface intuitiva que reduziu erros de lançamentos financeiros manuais de usuários ativos.`,
    badge: '🏢 SISTEMA CORPORATIVO',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Redux'],
    image: finelyPlannedImage,
    projectUrl: 'https://finely-planned.vercel.app/',
    category: 'sistema',
  },
  {
    id: 5,
    title: 'Texto Maestro',
    description: `Objetivo: Escalar a produção de conteúdo com refinamento gramatical e estilístico via inteligência artificial.
Desafio: Integrar a API do GPT garantindo respostas rápidas, streaming de texto e experiência de escrita fluida.
Atuação: Engenharia de prompts, integração de LLM e criação de editor de texto dinâmico.
Resultado: Redução de 60% no tempo de revisão e edição de posts de blogs e newsletters.`,
    badge: '🤖 IA & SAAS',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'TypeScript'],
    image: textoMaestroImage,
    projectUrl: 'https://texto-maestro.vercel.app/',
    category: 'sistema',
  },
  {
    id: 6,
    title: 'Tempo Certo',
    description: `Objetivo: Garantir a correta adesão a tratamentos médicos de pacientes de uso contínuo.
Desafio: Criar um fluxo simples de notificações e lembretes para públicos de diferentes faixas etárias.
Atuação: Desenvolvimento front-end responsivo, usabilidade e gerenciamento de rotinas de hidratação.
Resultado: Alta taxa de adesão diária de usuários e engajamento constante nos registros de medicação.`,
    badge: '⚡ AUTOMAÇÃO',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    image: tempoCertoImage,
    projectUrl: 'https://tempo-certo-wine.vercel.app/login',
    category: 'sistema',
  },
  {
    id: 7,
    title: 'CV-Insignes',
    description: `Objetivo: Automatizar a triagem de candidatos por meio de inteligência artificial.
Desafio: Processar currículos em PDF de diversos layouts e realizar matching inteligente com as vagas.
Atuação: Integração de modelos generativos de IA, front-end dinâmico e tratamento de dados complexos.
Resultado: Redução de 80% no tempo gasto em triagem inicial de candidatos por equipes de RH.`,
    badge: '🤖 IA & SAAS',
    technologies: ['Next.js', 'React', 'TypeScript', 'IA Generativa', 'Tailwind'],
    image: cvInsignesImage,
    projectUrl: 'https://cv-insights.vercel.app/',
    category: 'sistema',
  },
  {
    id: 8,
    title: 'Clínica Fluxo',
    description: `Objetivo: Elevar o posicionamento de marca de uma clínica de fisioterapia e gerar novos agendamentos.
Desafio: Criar uma experiência visual premium com carregamento instantâneo.
Atuação: Otimização de conversão, animações de micro-interações fluidas com GSAP e SEO técnico.
Resultado: Aumento de 35% nos cliques de contato para agendamentos via busca orgânica no Google.`,
    badge: '📈 CONVERSÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'GSAP'],
    image: clinicaFluxoImage,
    projectUrl: 'https://clinica-fluxo-de-fisioterapia-premi.vercel.app/',
    category: 'site',
  },
  {
    id: 9,
    title: 'Borges Tennis Academy',
    description: `Objetivo: Aumentar a captação de alunos para a academia de tênis.
Desafio: Comunicar a metodologia de ensino e diferenciais de forma clara e orientada à ação.
Atuação: Desenvolvimento de site institucional performático e estruturação de formulários integrados.
Resultado: Canal estável de captação de leads qualificados gerando novas matrículas mensalmente.`,
    badge: '🏆 CASE',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: borgesAcademyImage,
    projectUrl: 'https://borgestennisacademy.com/',
    category: 'site',
  },
  {
    id: 10,
    title: 'Consórcio da Vez',
    description: `Objetivo: Desmistificar o consórcio e atrair interessados em simulações.
Desafio: Apresentar tabelas de valores e benefícios de forma clara em telas de qualquer tamanho.
Atuação: Desenvolvimento de landing page focada em conversão (CRO) e legibilidade móvel.
Resultado: Aumento no envio de simulações qualificadas em relação à página institucional anterior.`,
    badge: '📈 CONVERSÃO',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    image: consorcioDaVezImage,
    projectUrl: 'https://consorciodavez.com.br/',
    category: 'site',
  },
  {
    id: 11,
    title: 'Vanlume Tráfego',
    description: `Objetivo: Vender templates n8n de automação de tráfego pago.
Desafio: Demonstrar o funcionamento e valor das automações em uma única página de vendas.
Atuação: Criação da landing page, copy focada em ganho de produtividade e checkout integrado.
Resultado: Vendas automatizadas e validação de produto digital com zero fricção de atendimento.`,
    badge: '⚡ AUTOMAÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: vanlumetrafegoImage,
    projectUrl: 'https://vanlumetrafego.com.br/',
    category: 'site',
  },
  {
    id: 12,
    title: 'Template de Agência Imobiliária',
    description: `Objetivo: Atrair interessados em compra e avaliação de imóveis de alto padrão.
Desafio: Organizar a curadoria de fotos pesadas sem comprometer a performance e velocidade de carregamento.
Atuação: Desenvolvimento e otimização de imagens, micro-animações premium e formulários orientados.
Resultado: Carregamento em menos de 1.5s e excelente usabilidade móvel.`,
    badge: '📈 CONVERSÃO',
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
  const [activeCategory, setActiveCategory] = useState<'sistemas' | 'sites'>('sites');

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
