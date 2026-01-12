import React from 'react';
import Button from '../UI/Button';
import habitwaveImage from '../../assets/habitwave.png';
import easyPackImage from '../../assets/EasyPack.png';
import textoMaestroImage from '../../assets/textoMaestro.png';
import levepromedicoImage from '../../assets/levepromedico.png';

interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  projectUrl: string;
}

const PortfolioSection: React.FC = () => {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'HabitWave',
      subtitle: 'Plataforma de Gestão de Hábitos e Produtividade',
      description: 'HabitWave é um aplicativo/web service projetado para ajudar usuários a criar, acompanhar e consolidar hábitos diários de forma clara e objetiva. A plataforma combina gerenciamento de tarefas, rastreamento de progressos e organização de rotinas para transformar objetivos dispersos em hábitos consistentes e mensuráveis.',
      technologies: ['React.js', 'TypeScript', 'TailwindCSS', 'Shadcn/UI', 'Firebase', 'Zustand', 'Jest', 'Testing-Library'],
      image: habitwaveImage,
      projectUrl: 'https://habitwave.com.br/'
    },
    {
      id: 2,
      title: 'EasyHub Pack',
      subtitle: 'Produto Digital para Criadores Visuais',
      description: 'EasyHub Pack é um produto digital voltado a designers e criadores visuais, reunindo recursos profissionais como LUTs cinematográficos, overlays, efeitos visuais e arquivos editáveis para otimizar processos criativos e elevar a qualidade das produções. O projeto envolveu o desenvolvimento de uma landing page focada em clareza, experiência do usuário e conversão, utilizando HTML, CSS e JavaScript, resultando em forte aceitação de mercado e retorno financeiro imediato logo no lançamento, validando tanto o produto quanto a estratégia de posicionamento e apresentação adotada.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Tecnicas de SEO'],
      image: easyPackImage,
      projectUrl: 'https://easyhubpack.com/'
    },
    {
      id: 3,
      title: 'Texto Maestro',
      subtitle: 'Plataforma de IA para melhoria de textos',
      description: 'Texto Maestro é uma aplicação web que usa inteligência artificial para melhorar e reescrever textos em português. Com uma interface intuitiva, a ferramenta permite aprimorar rapidamente textos para correção, formalização, simplificação, persuasão ou otimização para redes sociais.',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Shadcn/UI', 'Firebase', 'Zustand', 'Jest', 'Testing-Library'],
      image: textoMaestroImage,
      projectUrl: 'https://texto-maestro.vercel.app/'
    },
    {
      id: 4,
      title: 'LeveProMedico',
      subtitle: 'Agilidade em Saúde Sem Complicação',
      description: 'O LeveProMedico é uma plataforma online voltada à facilitação de serviços de saúde para pacientes e profissionais. Ela funciona como um centro digital onde é possível acessar agendamentos, consultas, informações clínicas e suporte médico especializado, tudo de forma prática e organizada. O objetivo é reduzir a burocracia no acesso à assistência à saúde e oferecer uma experiência intuitiva tanto para quem busca atendimento quanto para quem presta serviços médicos.',
      technologies: ['Vite', 'TypeScript','javascript', 'Tailwind CSS', 'React.js', 'Firebase', 'Redux', 'Jest', 'Testing-Library', 'Docker', 'Node.js', 'Express'],
      image: levepromedicoImage,
      projectUrl: 'https://levepromedico.com.br/assinar/'
    }
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-title">Alguns dos Projetos que já desenvolvi</h2>
        <p className="portfolio-subtitle">Cada projeto representa uma solução única, desenvolvida com foco em performance, usabilidade e resultados reais para os clientes.</p>
        
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={item.image} alt={item.title} className="portfolio-image" />
              </div>
              
              <div className="portfolio-content">
                <h3 className="portfolio-card-title">{item.title}</h3>
                <p className="portfolio-card-subtitle">{item.subtitle}</p>
                <p className="portfolio-card-description">{item.description}</p>
                
                <div className="portfolio-technologies">
                  {item.technologies.map((tech, index) => (
                    <span key={index} className="portfolio-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="portfolio-card-button">
                  <Button variant="primary" onClick={() => window.open(item.projectUrl, '_blank')}>
                    Ver Projeto
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

