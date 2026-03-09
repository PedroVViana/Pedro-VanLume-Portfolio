import React, { useRef, useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';

interface Testimonial {
  id: number;
  text: string;
  subtitle: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Funcional demais. No primeiro mês já vendemos R$ 11 mil e hoje, mesmo sem rodar anúncios, o sistema ainda rende cerca de R$ 1.200 mensais no automático. Tá show!',
    subtitle: 'Designer Profissional',
  },
  {
    id: 2,
    text: 'Precisávamos elevar o nível da nossa presença digital. O Pedro entregou uma plataforma que transmite a autoridade e o profissionalismo que a nossa marca exige. O impacto na confiança dos novos clientes foi imediato.',
    subtitle: 'Founder, Academia de Tênis',
  },
  {
    id: 3,
    text: 'O Pedro demonstra um domínio técnico excepcional e uma capacidade rara de traduzir requisitos complexos de engenharia em software funcional, escalável e ágil.',
    subtitle: 'Tech Lead, Engeman',
  },
  {
    id: 4,
    text: 'Investi na solução de análise de dados e o retorno foi claro. A clareza que o software traz para as métricas de escala é um diferencial competitivo enorme para quem gere orçamentos altos.',
    subtitle: 'Gestor de Tráfego e Performance',
  },
];

const DepoimentosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Section id="depoimentos" className="bg-[var(--color-bg-primary)]">
      <Container>
        <div
          ref={sectionRef}
          className={`depoimentos ${inView ? 'depoimentos--in-view' : ''} ${reducedMotion ? 'depoimentos--reduced-motion' : ''}`}
        >
          <header className="depoimentos__header">
            <p className="depoimentos__eyebrow">PROVA SOCIAL</p>
            <h2 className="depoimentos__title">O que dizem quem trabalhou com a DevLume</h2>
            <p className="depoimentos__description">
              Resultados reais em lucro, autoridade de marca e competência técnica.
            </p>
          </header>

          <div className="depoimentos__grid">
            {testimonials.map((item, index) => (
              <article
                key={item.id}
                className="depoimentos__card"
                style={
                  inView && !reducedMotion
                    ? { transitionDelay: `${index * 80}ms` }
                    : undefined
                }
              >
                <div className="depoimentos__card-quote">
                  <Quote
                    size={28}
                    strokeWidth={1.2}
                    className="text-[var(--color-accent-purple)]"
                    aria-hidden
                  />
                </div>
                <blockquote className="depoimentos__card-text">{item.text}</blockquote>
                <footer className="depoimentos__card-footer">
                  <cite className="depoimentos__card-cite">{item.subtitle}</cite>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DepoimentosSection;
