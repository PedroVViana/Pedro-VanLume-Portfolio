import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';

import feedback4Image from '../../assets/feedback4.jpeg';
import feedback5Image from '../../assets/feedback5.jpeg';
import feedback6Image from '../../assets/feedback6.jpeg';
import resultado126kImage from '../../assets/126k.jpg';
import resultado11kImage from '../../assets/11k.png';
import tenisImage from '../../assets/tenis.jpeg';

interface FeedbackItem {
  id: number;
  image: string;
  alt: string;
}

const feedbackItems: FeedbackItem[] = [
  {
    id: 1,
    image: resultado126kImage,
    alt: 'Resultado financeiro e retorno do projeto',
  },
  {
    id: 2,
    image: resultado11kImage,
    alt: 'Faturamento e recorrência de vendas',
  },
  {
    id: 3,
    image: tenisImage,
    alt: 'Feedback de cliente e autoridade de marca',
  },
  {
    id: 4,
    image: feedback4Image,
    alt: 'Feedback de entrega do projeto',
  },
  {
    id: 5,
    image: feedback5Image,
    alt: 'Feedback de suporte e agilidade',
  },
  {
    id: 6,
    image: feedback6Image,
    alt: 'Feedback de satisfação e recomendação',
  },
];

const DepoimentosSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeImage, setActiveImage] = useState<FeedbackItem | null>(null);

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

  // Fechar lightbox com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage]);

  return (
    <Section id="depoimentos" className="bg-[var(--color-bg-primary)]">
      <Container>
        <div
          ref={sectionRef}
          className={`depoimentos ${inView ? 'depoimentos--in-view' : ''} ${reducedMotion ? 'depoimentos--reduced-motion' : ''}`}
        >
          <header className="depoimentos__header">
            <p className="depoimentos__eyebrow">PROVA SOCIAL & RESULTADOS</p>
            <h2 className="depoimentos__title">O que dizem sobre trabalhar comigo</h2>
            <p className="depoimentos__description">
              Depoimentos reais, métricas alcançadas e comprovações de impacto gerado para clientes e parceiros.
            </p>
          </header>

          <div className="depoimentos__grid">
            {feedbackItems.map((item, index) => (
              <article
                key={item.id}
                className="depoimentos__card"
                style={
                  inView && !reducedMotion
                    ? { transitionDelay: `${index * 80}ms` }
                    : undefined
                }
                onClick={() => setActiveImage(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveImage(item);
                  }
                }}
                aria-label={`Visualizar feedback ${item.id} em tamanho real`}
              >
                <div className="depoimentos__card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="depoimentos__card-img"
                    loading="lazy"
                  />
                  <div className="depoimentos__card-overlay">
                    <span className="depoimentos__card-zoom-btn">
                      <ZoomIn size={18} aria-hidden />
                      <span>Ampliar</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal Lightbox para visualização em alta resolução */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização em alta resolução"
        >
          <button
            type="button"
            className="fixed top-5 right-5 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            aria-label="Fechar visualização"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.image}
              alt={activeImage.alt}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default DepoimentosSection;
