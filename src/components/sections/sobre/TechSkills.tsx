import React, { useState, useCallback, useMemo } from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import { IconCloud } from '../../ui/interactive-icon-cloud';
import { motion, AnimatePresence } from 'framer-motion';

const TechSkills: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<{ name: string; slug: string; svg?: string } | null>(null);
  const [hoveredTech, setHoveredTech] = useState<{ name: string; slug: string; svg?: string } | null>(null);

  // Memoizando a lista de slugs para que o array seja estável entre renders
  const slugs = useMemo(() => [
    "react",
    "nextdotjs",
    "typescript",
    "tailwindcss",
    "nodedotjs",
    "express",
    "java",
    "springboot",
    "postgresql",
    "docker",
    "git",
    "mongodb",
    "html5",
    "css3",
    "javascript"
  ], []);

  const handleIconClick = useCallback((icon: any) => {
    setSelectedTech({
      name: icon.title,
      slug: icon.slug,
      svg: icon.svg
    });
  }, []);

  const handleIconHover = useCallback((icon: any | null) => {
    if (icon) {
      setHoveredTech({
        name: icon.title,
        slug: icon.slug,
        svg: icon.svg
      });
    } else {
      setHoveredTech(null);
    }
  }, []);

  const activeDisplay = hoveredTech || selectedTech;
  const displayName = activeDisplay?.name || 'Explore a Nuvem';
  const displaySvg = activeDisplay?.svg;

  return (
    <Section spacing="sm" className="bg-apple-bg-primary py-20 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex flex-col items-center lg:items-start gap-3">
                <h3 className="text-apple-accent-purple font-bold text-xs tracking-[0.2em] uppercase">
                  Stack Técnica
                </h3>
                <div className="h-[1.5px] w-8 bg-apple-accent-blue/20" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-apple-text-primary tracking-tight leading-[1.05]">
                Tecnologias que <br />
                <span className="text-apple-accent-blue">impulsionam resultados.</span>
              </h2>

              <p className="text-lg text-apple-text-secondary leading-relaxed max-w-xl font-medium mx-auto lg:mx-0">
                Uso um arsenal tecnológico moderno para construir aplicações escaláveis, performáticas e bonitas. Do backend robusto à interface pixel-perfect.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['Frontend', 'Backend', 'DevOps', 'Design'].map((tag) => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-apple-bg-secondary text-apple-text-tertiary border border-apple-border/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-center lg:justify-start pt-4">
                <div className="min-w-[320px] h-28 bg-white border border-apple-border shadow-apple-sm rounded-2xl p-4 flex items-center gap-5 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-apple-accent-blue/5 border border-apple-accent-blue/10 flex items-center justify-center shrink-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {displaySvg ? (
                        <motion.div
                          key={activeDisplay?.slug}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="w-10 h-10 flex items-center justify-center text-apple-accent-blue [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current"
                          dangerouslySetInnerHTML={{ __html: displaySvg }}
                        />
                      ) : (
                        <motion.div
                          key="dot"
                          className="w-3 h-3 rounded-full bg-apple-accent-blue animate-pulse"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col text-left justify-center">
                    <span className="text-[10px] font-bold text-apple-text-tertiary uppercase tracking-[0.1em] mb-1">
                      {hoveredTech ? 'Visualizando' : (selectedTech ? 'Stack Selecionada' : 'Foco Atual')}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayName}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex flex-col"
                      >
                        <span className="text-xl font-bold text-apple-text-primary leading-tight">
                          {displayName}
                        </span>
                        {activeDisplay?.slug && (
                          <span className="text-xs text-apple-text-secondary font-medium mt-0.5">
                            ID: {activeDisplay.slug}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-apple-accent-blue/5 blur-[100px] rounded-full" />

            <div className="relative w-full max-w-[500px]">
              <IconCloud
                iconSlugs={slugs}
                onIconHover={handleIconHover}
                onIconClick={handleIconClick}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default TechSkills;
