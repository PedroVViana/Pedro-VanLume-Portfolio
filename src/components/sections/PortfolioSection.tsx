import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import homenzcolatinaImage from '../../assets/homenz.png';
import finAppImage from '../../assets/finapp.jpg';
import metaAdsImage from '../../assets/meta-ads.png';
import EasyPack from '../../assets/EasyPack.png';
import tempoCertoImage from '../../assets/tempoCerto.png';
import borgesAcademyImage from '../../assets/borgesAcademy.png';
import consorcioDaVezImage from '../../assets/consorcioDaVez.png';
import afetivaImage from '../../assets/afetiva.jpg';

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
    id: 3,
    title: 'FinApp - Plataforma de gestão e planejamento financeiro',
    description: `O FinApp é um sistema web moderno de controle financeiro e planejamento patrimonial, projetado para transformar dados brutos em decisões financeiras estratégicas em tempo real. A plataforma centraliza a gestão de receitas, despesas fixas e variáveis, projeção de saldo e acompanhamento detalhado de metas e orçamentos mensais.`,
    badge: '🏢 SISTEMA CORPORATIVO',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Redux'],
    image: finAppImage,
    projectUrl: 'https://fin-app-two.vercel.app/login',
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
    title: 'EasyPack',
    description: `Projeto com objetivo de vender um pack de PSD de artes de photoshop, o projeto foi entregue a 2 anos atras e o resultado obtido pelo dono foi de RS11.000 no primeiro mês e durante os dois anos ele teve uma recorrencia de R$1.200 sem investir em trafego.`,
    badge: '⚡ AUTOMAÇÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    image: EasyPack,
    projectUrl: '',
    category: 'site',
  },
  {
    id: 12,
    title: 'Landing Page da Empresa Afetiva',
    description: `Projeto desenvolvido para transformar a presença digital da clínica, conectando a psicóloga a novos pacientes por meio de uma experiência moderna e acolhedora.`,
    badge: '📈 CONVERSÃO',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP', 'ScrollTrigger'],
    image: afetivaImage,
    projectUrl: 'https://afetivamultidisciplinar.com.br/',
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

          <div className="portfolio__cards">
            {portfolioData.length > 0 ? (
              <div className="portfolio__grid">
                {portfolioData.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="portfolio__empty">Nenhum projeto cadastrado.</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PortfolioSection;
