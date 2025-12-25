import React, { useEffect, useRef, useState } from 'react';
import Button from '../../UI/Button';
import perfilImage from '../../../assets/perfil.jpg';
import resumePDF from '../../../assets/resume-Pedro-Vanlume.pdf';

const Presentation: React.FC = () => {
  const presentationRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pixelSize = 20; // Tamanho de cada pixel em px
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (presentationRef.current && spotlightRef.current) {
        const rect = presentationRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Usa requestAnimationFrame para atualização suave
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.left = `${x}px`;
            spotlightRef.current.style.top = `${y}px`;
          }
        });
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = '-1000px';
        spotlightRef.current.style.top = '-1000px';
      }
    };

    const presentation = presentationRef.current;
    if (presentation) {
      presentation.addEventListener('mousemove', handleMouseMove, { passive: true });
      presentation.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        presentation.removeEventListener('mousemove', handleMouseMove);
        presentation.removeEventListener('mouseleave', handleMouseLeave);
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [pixelGrid, setPixelGrid] = useState<Array<{ id: string; x: number; y: number }>>([]);

  useEffect(() => {
    // Cria uma grade de pixels
    const createPixelGrid = () => {
      if (!presentationRef.current) return [];

      const rect = presentationRef.current.getBoundingClientRect();
      const cols = Math.ceil(rect.width / pixelSize);
      const rows = Math.ceil(rect.height / pixelSize);
      const pixels = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          pixels.push({
            id: `${row}-${col}`,
            x: col * pixelSize,
            y: row * pixelSize,
          });
        }
      }

      return pixels;
    };

    const updateGrid = () => {
      if (presentationRef.current) {
        setPixelGrid(createPixelGrid());
      }
    };

    // Aguarda um frame para garantir que o elemento está renderizado
    const timer = setTimeout(updateGrid, 0);
    window.addEventListener('resize', updateGrid);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateGrid);
    };
  }, [pixelSize]);

  return (
    <div ref={presentationRef} className="presentation">
      {/* Grade de pixels fixos no fundo */}
      <div className="presentation-pixel-grid">
        {pixelGrid.map((pixel) => (
          <div
            key={pixel.id}
            className="presentation-pixel"
            style={{
              left: `${pixel.x}px`,
              top: `${pixel.y}px`,
            }}
          />
        ))}
      </div>

      {/* Spotlight que passa por cima */}
      <div
        ref={spotlightRef}
        className="presentation-spotlight"
      />

      <div className="presentation-background-decoration"></div>
      <div className="presentation-container">
        <div className="presentation-image-wrapper">
          <div className="presentation-image-glow"></div>
          <div className="presentation-image">
            <img src={perfilImage} alt="Perfil" />
          </div>
          <div className="presentation-stats">
            <div className="presentation-stat-card">
              <div className="presentation-stat-number">+80</div>
              <div className="presentation-stat-label">projetos registrados</div>
            </div>
            <div className="presentation-stat-card">
              <div className="presentation-stat-number">+4</div>
              <div className="presentation-stat-label">anos de experiência</div>
            </div>
          </div>
        </div>
        <div className="presentation-content">
          <div className="presentation-badge">
            <span>Fullstack Developer</span>
          </div>
          <h2 className="presentation-title">
            Sistemas que Fazem Sentido de Ponta a Ponta
          </h2>
          <p className="presentation-text">
            Sou um desenvolvedor fullstack que enxerga cada produto como um sistema vivo: precisa ser claro, responsivo e funcional de ponta a ponta. Minha abordagem combina análise precisa, arquitetura bem pensada e uma preocupação real com a experiência do usuário. Já trabalhei em diferentes cenários — de startups a softwares corporativos — sempre com o mesmo objetivo: entregar soluções estáveis, inteligentes e que realmente resolvem o que se propõem a resolver.
          </p>
          <div className="presentation-buttons">
            <Button variant="primary" onClick={() => window.open(resumePDF, '_blank')}>
              Download CV
            </Button>
            <Button
              variant="secondary"
              onClick={() => scrollToSection('portfolio')}
            >
              Ver Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;

