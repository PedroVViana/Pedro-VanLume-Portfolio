import React from 'react';
import { Icon } from '@iconify/react';
import zustandImage from '../../../assets/zuntand.jpg';

interface TechItem {
  id: number;
  name: string;
  icon?: string;
  image?: string;
  color: string;
  iconSize?: string; // Tamanho personalizado para cada ícone (ex: '2.4rem', '2.8rem', etc.)
}

const TechSkills: React.FC = () => {
  const technologies: TechItem[] = [
    {
      id: 1,
      name: 'React.js',
      icon: 'logos:react',
      color: '#61DAFB',
      iconSize: '3.5rem'
    },
    {
      id: 2,
      name: 'JavaScript',
      icon: 'logos:javascript',
      color: '#F7DF1E',
      iconSize: '3.5rem'
    },
    {
      id: 3,
      name: 'HTML',
      icon: 'logos:html-5',
      color: '#E34F26',
      iconSize: '3.5rem'
    },
    {
      id: 4,
      name: 'CSS',
      icon: 'logos:css-3',
      color: '#1572B6',
      iconSize: '3.5rem'
    },
    {
      id: 5,
      name: 'JAVA',
      icon: 'logos:java',
      color: '#ED8B00',
      iconSize: '3.5rem'
    },
    {
      id: 6,
      name: 'Spring Boot',
      icon: 'logos:spring-icon',
      color: '#6DB33F',
      iconSize: '3.5rem'
    },
    {
      id: 7,
      name: 'Firebase',
      icon: 'logos:firebase',
      color: '#FFCA28',
      iconSize: '3.5rem'
    },
    {
      id: 8,
      name: 'Mongo DB',
      icon: 'logos:mongodb',
      color: '#47A248',
      iconSize: '3.5rem'
    },
    {
      id: 9,
      name: 'TypeScript',
      icon: 'logos:typescript-icon',
      color: '#3178C6',
      iconSize: '3.5rem'
    },
    {
      id: 10,
      name: 'JEST',
      icon: 'logos:jest',
      color: '#C21325',
      iconSize: '3.5rem'
    },
    {
      id: 11,
      name: 'Testing-Library',
      icon: 'logos:testing-library',
      color: '#E33332',
      iconSize: '3.5rem'
    },
    {
      id: 12,
      name: 'REDUX',
      icon: 'logos:redux',
      color: '#764ABC',
      iconSize: '3.5rem'
    },
    {
      id: 13,
      name: 'ZUSTAND',
      image: zustandImage,
      color: '#FFD43B',
        iconSize: '3.5rem'
    },
    {
      id: 14,
      name: 'Node.js',
      icon: 'logos:nodejs-icon',
      color: '#339933',
      iconSize: '3.5rem'
    },
    {
      id: 15,
      name: 'Express',
      icon: 'logos:express',
      color: '#000000',
      iconSize: '3.5rem'
    },
    {
      id: 16,
      name: 'Docker',
      icon: 'logos:docker-icon',
      color: '#2496ED',
      iconSize: '3.5rem'
    },
    {
      id: 17,
      name: 'Python',
      icon: 'logos:python',
      color: '#3776AB',
      iconSize: '3.5rem'
    },
    {
      id: 18,
      name: 'Next.js',
      icon: 'logos:nextjs-icon',
      color: '#000000',
      iconSize: '3.5rem'
    },
    {
      id: 19,
      name: 'Tailwind CSS',
      icon: 'logos:tailwindcss-icon',
      color: '#06B6D4',
      iconSize: '3.5rem'
    }
  ];

  return (
    <div className="tech-skills">
      <div className="tech-skills-container">
        <h2 className="tech-skills-title">Quais tecnologias eu uso?</h2>
        
        <div className="tech-skills-pixel-grid">
          {technologies.map((tech) => {
            return (
              <div 
                key={tech.id} 
                className="tech-skill-pixel"
                style={{
                  ['--tech-color' as string]: tech.color
                } as React.CSSProperties}
              >
                <div 
                  className="tech-skill-pixel-icon"
                  style={tech.iconSize ? { width: tech.iconSize, height: tech.iconSize } : {}}
                >
                  {tech.image ? (
                    <img 
                      src={tech.image} 
                      alt={tech.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <Icon 
                      icon={tech.icon!} 
                      width={tech.iconSize || '2.4rem'} 
                      height={tech.iconSize || '2.4rem'} 
                    />
                  )}
                </div>
                <span className="tech-skill-pixel-name">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechSkills;
