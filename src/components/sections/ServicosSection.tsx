import React from 'react';
import { Wrench, Globe, Zap, ShoppingCart, Code } from 'lucide-react';
import Button from '../UI/Button';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServicosSection: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services: Service[] = [
    {
      id: 1,
      title: 'Manutenção e Suporte',
      subtitle: 'Seu sistema sempre funcionando perfeitamente',
      description: 'Garanta que seu site ou sistema esteja sempre atualizado, seguro e funcionando sem interrupções. Ofereço suporte técnico contínuo, correções rápidas e atualizações preventivas para evitar problemas antes que aconteçam. Mantenha sua operação rodando 24/7 sem preocupações.',
      icon: Wrench
    },
    {
      id: 2,
      title: 'Desenvolvimento de Sites',
      subtitle: 'Presença digital que converte visitantes em clientes',
      description: 'Crie um site moderno, responsivo e otimizado que realmente funciona para o seu negócio. Desenvolvo sites que não apenas impressionam visualmente, mas que carregam rápido, aparecem no Google e convertem visitantes em clientes. Do design à publicação, tudo pensado para resultados.',
      icon: Globe
    },
    {
      id: 3,
      title: 'Automações de Processos',
      subtitle: 'Economize tempo e reduza erros com automação inteligente',
      description: 'Transforme tarefas repetitivas em processos automatizados que trabalham por você. Desenvolvo soluções que integram sistemas, eliminam trabalho manual e reduzem custos operacionais. Mais eficiência, menos erros e mais tempo para focar no que realmente importa no seu negócio.',
      icon: Zap
    },
    {
      id: 4,
      title: 'E-commerces',
      subtitle: 'Venda online com uma plataforma que realmente converte',
      description: 'Monte sua loja virtual completa com carrinho, pagamentos, gestão de estoque e painel administrativo. Desenvolvo e-commerces seguros, rápidos e otimizados para vendas, com integração de gateways de pagamento e sistemas de entrega. Transforme visitantes em compradores recorrentes.',
      icon: ShoppingCart
    },
    {
      id: 5,
      title: 'Sistemas Web',
      subtitle: 'Soluções personalizadas que resolvem problemas reais',
      description: 'Desenvolvo sistemas web completos sob medida para as necessidades específicas do seu negócio. Desde CRMs e painéis administrativos até plataformas complexas com múltiplos módulos. Arquitetura sólida, interface intuitiva e performance que suporta crescimento. Soluções que realmente resolvem problemas e geram resultados mensuráveis.',
      icon: Code
    }
  ];

  const renderServiceCard = (service: Service, cardClass?: string) => {
    const IconComponent = service.icon;
    return (
      <div key={service.id} className={`servico-card ${cardClass || ''}`}>
        <div className="servico-card-header">
          <div className="servico-card-icon">
            <IconComponent />
          </div>
          <div className="servico-card-header-text">
            <h3 className="servico-card-title">{service.title}</h3>
            <p className="servico-card-subtitle">{service.subtitle}</p>
          </div>
        </div>
        <p className="servico-card-description">{service.description}</p>
        <div className="servico-card-button">
          <Button variant="primary" onClick={scrollToContact}>
            Entrar em Contato
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section id="servicos" className="servicos-section">
      <div className="servicos-container">
        <div className="servicos-grid">
          {/* Coluna esquerda - 2 cards em coluna */}
          <div className="servicos-left-column">
            {renderServiceCard(services[0], 'servico-card-1')}
            {renderServiceCard(services[1], 'servico-card-2')}
          </div>

          {/* Box direito - 2 cards em linha no topo e card 5 abaixo */}
          <div className="servicos-right-section">
            <div className="servicos-right-box">
              {renderServiceCard(services[2], 'servico-card-3')}
              {renderServiceCard(services[3], 'servico-card-4')}
            </div>
            <div className="servicos-bottom-card">
              {renderServiceCard(services[4], 'servico-card-5')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;

