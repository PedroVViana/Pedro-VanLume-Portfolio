import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Icon } from '@iconify/react';
import HomeSection from './components/sections/HomeSection';
import SobreSection from './components/sections/SobreSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ServicosSection from './components/sections/ServicosSection';
import ContatoSection from './components/sections/ContatoSection';

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0 ? (scrollTop / totalScrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress();
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[110] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-apple-accent-blue to-apple-accent-purple transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          Pedro Van-Lume
        </div>
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><button onClick={() => scrollToSection('home')}>Início</button></li>
          <li><button onClick={() => scrollToSection('sobre')}>Sobre</button></li>
          <li><button onClick={() => scrollToSection('portfolio')}>Portfólio</button></li>
          <li><button onClick={() => scrollToSection('servicos')}>Serviços</button></li>
          <li><button onClick={() => scrollToSection('contato')}>Contato</button></li>
        </ul>
      </div>
    </nav>
  );
}

function WhatsAppButton() {
  const phoneNumber = '5581994952030';
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <button
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      onClick={() => window.open(whatsappUrl, '_blank')}
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <Icon icon="logos:whatsapp-icon" width="32" height="32" className="drop-shadow-sm" />
      <span className="absolute right-full mr-4 bg-white text-apple-text-primary px-3 py-1.5 rounded-apple-md text-sm font-bold shadow-apple-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-apple-border">
        Chamar no WhatsApp
      </span>
    </button>
  );
}

function App() {
  return (
    <div>
      <ScrollProgressBar />
      <Navbar />
      <HomeSection />
      <SobreSection />
      <PortfolioSection />
      <ServicosSection />
      <ContatoSection />
      <WhatsAppButton />
    </div>
  );
}

export default App;
