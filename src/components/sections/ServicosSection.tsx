import React, { useEffect, useRef, useState } from 'react';
import { Code2, ShoppingCart, Zap, LayoutTemplate, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Section from '../ui/Section';
import Container from '../ui/Container';

interface Service {
  id: number;
  title: string;
  micro: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Sistemas sob Medida',
    micro: 'Sistemas web inteligentes',
    description: 'Dashboards, CRMs e ERPs com foco em eficiência operacional e usabilidade.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'E-commerce & Vendas',
    micro: 'Lojas de alta conversão',
    description: 'Desenvolvimento de e-commerces rápidos, seguros e estruturados para conversão.',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Automação Inteligente',
    micro: 'Processos que trabalham por você',
    description: 'Criação de integrações e automações de processos para eliminar tarefas repetitivas.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Landing Pages & Performance',
    micro: 'Páginas que convertem',
    description: 'Landing pages de alta performance com SEO otimizado, velocidade extrema e foco em conversão.',
    icon: LayoutTemplate,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Manutenção & Suporte',
    micro: 'Evolução contínua',
    description: 'Suporte técnico, manutenção preventiva e evolução constante para manter seu software estável.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop',
  },
];

const scaleVariants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  closed:  { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } },
  enter:   { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4,  ease: [0.76, 0, 0.24, 1] } },
};

interface ModalState { active: boolean; index: number }

/* ─── Service row ─────────────────────────────────────────── */
function ServiceRow({
  service,
  index,
  setModal,
  onClick,
}: {
  service: Service;
  index: number;
  setModal: (s: ModalState) => void;
  onClick: () => void;
}) {
  const Icon = service.icon;
  return (
    <button
      type="button"
      className="group w-full text-left flex items-center justify-between border-t border-[var(--color-border)] px-0 py-7 md:py-9 transition-all duration-300 last:border-b hover:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 rounded"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={onClick}
    >
      {/* Left: icon + text */}
      <div className="flex items-center gap-5">
        <div className="w-9 h-9 shrink-0 rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--color-accent-purple)] bg-[var(--color-accent-purple-light)] transition-transform duration-300 group-hover:scale-110">
          <Icon size={18} strokeWidth={1.8} aria-hidden />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight transition-all duration-300 group-hover:translate-x-1.5">
            {service.title}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mt-0.5 transition-all duration-300 group-hover:translate-x-1.5">
            {service.micro}
          </p>
        </div>
      </div>

      {/* Right: CTA */}
      <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-purple)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1.5 whitespace-nowrap ml-6">
        Solicitar →
      </span>
    </button>
  );
}

/* ─── Hover modal ─────────────────────────────────────────── */
function HoverModal({ modal, services: list }: { modal: ModalState; services: Service[] }) {
  const { active, index } = modal;
  const containerRef  = useRef<HTMLDivElement>(null);
  const cursorRef     = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xC = gsap.quickTo(containerRef.current, 'left', { duration: 0.8, ease: 'power3' });
    const yC = gsap.quickTo(containerRef.current, 'top',  { duration: 0.8, ease: 'power3' });
    const xCu = gsap.quickTo(cursorRef.current,  'left', { duration: 0.5, ease: 'power3' });
    const yCu = gsap.quickTo(cursorRef.current,  'top',  { duration: 0.5, ease: 'power3' });
    const xL = gsap.quickTo(labelRef.current,    'left', { duration: 0.45, ease: 'power3' });
    const yL = gsap.quickTo(labelRef.current,    'top',  { duration: 0.45, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xC(e.clientX); yC(e.clientY);
      xCu(e.clientX); yCu(e.clientY);
      xL(e.clientX); yL(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Image container */}
      <motion.div
        ref={containerRef}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        variants={scaleVariants}
        className="pointer-events-none fixed z-[200] hidden lg:flex w-[340px] h-[220px] overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]"
        aria-hidden
      >
        <div
          className="absolute top-0 left-0 w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -220}px` }}
        >
          {list.map((svc) => (
            <div key={svc.id} className="w-full h-[220px]">
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorRef}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        variants={scaleVariants}
        className="pointer-events-none fixed z-[201] hidden lg:flex w-16 h-16 rounded-full bg-[var(--color-accent-purple)] items-center justify-center"
        aria-hidden
      />

      {/* Cursor label */}
      <motion.div
        ref={labelRef}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        variants={scaleVariants}
        className="pointer-events-none fixed z-[202] hidden lg:flex w-16 h-16 rounded-full items-center justify-center text-white text-[11px] font-bold uppercase tracking-widest"
        aria-hidden
      >
        Ver
      </motion.div>
    </>
  );
}

/* ─── Main section ────────────────────────────────────────── */
const ServicosSection: React.FC = () => {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });

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
        {/* Header */}
        <header className="mb-4 max-w-3xl">
          <p className="text-[var(--color-accent-purple)] font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            ESPECIALIDADES
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight">
              Serviços & Soluções
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed md:max-w-sm">
              Desenvolvo sistemas, automações e landing pages sob medida, com foco em eficiência, performance e retorno real.
            </p>
          </div>
        </header>

        {/* Service list */}
        <div className="relative flex flex-col">
          {services.map((svc, i) => (
            <ServiceRow
              key={svc.id}
              service={svc}
              index={i}
              setModal={setModal}
              onClick={scrollToContactAndFocusName}
            />
          ))}
        </div>

        {/* Hover modal (desktop only) */}
        <HoverModal modal={modal} services={services} />
      </Container>
    </Section>
  );
};

export default ServicosSection;
