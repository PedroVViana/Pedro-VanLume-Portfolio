import React from 'react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  highlight?: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: 'Desenvolvedor Fullstack — Projetos Freelancers',
      company: 'Freelancer',
      period: '2021 – Atual',
      description: 'Atuação em soluções digitais modernas e escaláveis para diferentes nichos, sempre com foco em clareza, desempenho e experiência do usuário. Participei desde a concepção até a entrega final, implementando integrações, interfaces e fluxos completos. Um dos destaques foi a implementação de CRM integrado ao site, gerando +30% de engajamento no primeiro mês.',
      highlight: 'Ambiente ágil, entregas de ponta a ponta e foco em produtos reais.'
    },
    {
      id: 2,
      title: 'Software Developer',
      company: 'O-PitBlast',
      period: '2022 – 2023',
      description: 'Trabalhei no desenvolvimento de funcionalidades e interfaces para um software técnico de simulação 3D. Colaborei na análise de requisitos, refatoração de código e criação de ferramentas internas que otimizaram processos da equipe. Essa experiência fortaleceu minha capacidade de entender sistemas complexos e traduzi-los em soluções claras e funcionais.'
    },
    {
      id: 3,
      title: 'Desenvolvedor de Sistemas',
      company: 'Engeman',
      period: '2025 – Atual',
      description: 'Responsável por desenvolver interfaces modernas e responsivas para softwares corporativos, com forte ênfase em arquitetura, componentização e boas práticas de UX/UI. Atuei integrando front-end e back-end via APIs REST, implementando gerenciamento de estado e participando do desenvolvimento de APIs e microserviços. Os resultados incluem melhorias mensuráveis na produtividade operacional e ganho de eficiência em processos internos.'
    }
  ];

  return (
    <div className="experience">
      <div className="experience-container">
        <h2 className="experience-title">Experiência que constrói como Desenvolvedor</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`experience-item ${index % 2 === 0 ? 'experience-item-right' : 'experience-item-left'}`}
            >
              <div className="experience-card-wrapper">
                <div className="experience-card">
                  <div className="experience-card-header">
                    <h3 className="experience-card-title">{exp.title}</h3>
                    <span className="experience-card-company">{exp.company}</span>
                    <span className="experience-card-period">{exp.period}</span>
                  </div>
                  <p className="experience-card-description">{exp.description}</p>
                  {exp.highlight && (
                    <p className="experience-card-highlight">{exp.highlight}</p>
                  )}
                </div>
              </div>
              <div className="experience-timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
