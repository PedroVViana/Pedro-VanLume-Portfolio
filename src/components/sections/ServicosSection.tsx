import React from 'react';
import { Code2, ShoppingCart, Zap, LayoutTemplate, Wrench } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Card from '../ui/Card';

interface Service {
  id: number;
  title: string;
  micro: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Soluções Corporativas',
    micro: 'SISTEMAS WEB SOB MEDIDA',
    description: 'Dashboards, CRMs e ERPs com foco em eficiência operacional e escalabilidade.',
    icon: Code2,
  },
  {
    id: 2,
    title: 'E-commerce & Vendas',
    micro: 'LOJAS DE ALTA CONVERSÃO',
    description: 'E-commerces rápidos, seguros e otimizados para vender mais.',
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: 'Automação Inteligente',
    micro: 'PROCESSOS QUE TRABALHAM POR VOCÊ',
    description: 'Integrações e automações via APIs para reduzir tarefas repetitivas.',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Landing Pages & Performance',
    micro: 'PÁGINAS QUE CONVERTEM',
    description: 'LPs com SEO, velocidade e copy orientada a resultados.',
    icon: LayoutTemplate,
  },
  {
    id: 5,
    title: 'Manutenção & Suporte',
    micro: 'EVOLUÇÃO CONTÍNUA',
    description: 'Correções, melhorias e monitoramento para manter tudo estável.',
    icon: Wrench,
  },
];

const ServicosSection: React.FC = () => {
  const scrollToContactAndFocusName = () => {
    const section = document.getElementById('contato');
    const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
    if (section) {
      const offset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => nameInput?.focus({ preventScroll: true }), 400);
    }
  };

  return (
    <Section id="servicos" className="bg-[var(--color-bg-primary)]">
      <Container>
        <header className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--color-accent-purple)] font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            O QUE FAÇO
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Serviços & Soluções
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
            Construo produtos digitais com foco em performance, UX e escala.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                hoverable={false}
                className="p-8 flex flex-col h-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] transition-all duration-200 ease-out hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 hover:border-[rgba(0,0,0,0.12)]"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center mb-6 text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-light)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                  {service.micro}
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={scrollToContactAndFocusName}
                  className="mt-auto text-xs font-bold uppercase tracking-widest text-[var(--color-accent-purple)] hover:text-[var(--color-text-primary)] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 rounded"
                >
                  SOLICITAR ORÇAMENTO →
                </button>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default ServicosSection;
