import React from 'react';
import Section from '../../ui/Section';
import Container from '../../ui/Container';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import { cn } from '@/lib/utils';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  year: string;
  bullets: string[];
  skills: string[];
  color: 'blue' | 'red' | 'orange';
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      year: '2021',
      title: 'Software Engineer & Founder',
      company: 'DevLume',
      period: '2021 – Atual',
      bullets: [
        'Lidero o desenvolvimento de aplicações SaaS com ownership integral.',
        'Construo produtos digitais focados em UX e performance extrema.',
        'Implemento integrações estratégicas via APIs REST e Firebase.'
      ],
      skills: ['React', 'Node.js', 'Tailwind', 'Firebase', 'APIs REST', 'Next.js'],
      color: 'blue'
    },
    {
      id: 2,
      year: '2022',
      title: 'Desenvolvedor de Software',
      company: 'O-PitBlast',
      period: '2022 – 2023',
      bullets: [
        'Refatorei interfaces críticas em software de simulação 3D (WPF/C#).',
        'Desenvolvi ferramentas internas de automação para decisões técnicas.',
        'Gerenciei fluxos de versionamento e CI/CD via Azure DevOps.'
      ],
      skills: ['C#', 'WPF', 'XAML', 'Azure DevOps', 'Git', '.NET'],
      color: 'red'
    },
    {
      id: 3,
      year: '2025',
      title: 'Engenheiro de Software Fullstack',
      company: 'Engeman',
      period: 'Mai 2025 – Atual',
      bullets: [
        'Desenvolvo interfaces dinâmicas para gestão de processos e produtividade.',
        'Projeto integrações complexas entre ecossistemas React e Spring Boot.',
        'Implemento arquiteturas de estado escaláveis e ambientes dockerizados.'
      ],
      skills: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Docker', 'PostgreSQL', 'MongoDB'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          border: 'border-l-red-500',
          accent: 'bg-red-500',
          text: 'text-red-500',
          bgLight: 'bg-red-500/10',
          marker: 'bg-red-500',
          yearText: 'text-black/20 group-hover:text-black/50',
          badgeHover: 'group-hover/card:border-red-500/30 group-hover/card:text-red-500'
        };
      case 'orange':
        return {
          border: 'border-l-orange-500',
          accent: 'bg-orange-500',
          text: 'text-orange-500',
          bgLight: 'bg-orange-500/10',
          marker: 'bg-orange-500',
          yearText: 'text-black/20 group-hover:text-black/50',
          badgeHover: 'group-hover/card:border-orange-500/30 group-hover/card:text-orange-500'
        };
      default:
        return {
          border: 'border-l-apple-accent-blue',
          accent: 'bg-apple-accent-blue',
          text: 'text-apple-accent-blue',
          bgLight: 'bg-apple-accent-blue/10',
          marker: 'bg-apple-accent-blue',
          yearText: 'text-black/20 group-hover:text-black/50',
          badgeHover: 'group-hover/card:border-apple-accent-blue/30 group-hover/card:text-apple-accent-blue'
        };
    }
  };

  return (
    <Section spacing="md" className="bg-apple-bg-primary overflow-hidden">
      <Container>
        <div className="mb-20 text-center">
          <h3 className="text-apple-accent-purple font-bold text-xs tracking-[0.2em] uppercase mb-4">
            Trajetória
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-apple-text-primary tracking-tight">
            Experiência Profissional
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          {/* Linha Temporal Central - Sutil e Definida */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[1px] bg-apple-border md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const colors = getColorClasses(exp.color);
              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center group">

                  {/* Marcador/Ano na Linha */}
                  <div className={cn("absolute left-[20px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ring-4 ring-white z-20 transition-colors duration-300", colors.accent)} />

                  {/* Label de Ano (Lado oposto ao card no desktop) */}
                  <div className={`hidden md:flex absolute w-[43%] top-1/2 -translate-y-1/2 ${index % 2 === 0 ? 'left-[57%]' : 'right-[57%] justify-end'}`}>
                    <span className={cn("text-4xl font-black transition-colors duration-500 italic select-none", colors.yearText)}>
                      {exp.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[48%] pl-10 md:pl-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:order-2'}`}>
                    <Card className={cn("p-6 md:p-8 bg-white/50 hover:bg-white transition-all shadow-apple-sm group-hover:shadow-apple-md border-apple-border/50 relative overflow-hidden group/card border-l-4", colors.border)}>
                      {/* Linha de sotaque no topo do card ao passar o mouse */}
                      <div className={cn("absolute top-0 left-0 w-1 h-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300", colors.accent)} />

                      <div className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn("text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest", colors.bgLight, colors.text)}>{exp.year}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-apple-text-primary">{exp.title}</h3>
                        <p className={cn("font-semibold", colors.text)}>{exp.company}</p>
                        <span className="text-[11px] font-bold text-apple-text-tertiary uppercase tracking-wider">{exp.period}</span>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={cn("mt-2 w-1 h-1 rounded-full shrink-0", colors.marker)} />
                            <span className="text-sm text-apple-text-secondary leading-relaxed font-medium">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-apple-border/30">
                        {exp.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className={cn("text-[9px] font-bold uppercase tracking-wider border-apple-border text-apple-text-tertiary px-2 py-0.5 transition-colors", colors.badgeHover)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Experience;
