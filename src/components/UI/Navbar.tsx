import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64; // Navbar height
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          Pedro Van-Lume
        </div>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
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
};

export default Navbar;

