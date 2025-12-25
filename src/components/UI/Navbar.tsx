import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-fixed' : 'navbar-static'}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          Portfolio
        </div>
        <button 
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={28} className="toggle-icon" />
          ) : (
            <Menu size={28} className="toggle-icon" />
          )}
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <button onClick={() => scrollToSection('home')}>HOME</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('sobre')}>SOBRE</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('portfolio')}>PORTFOLIO</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('servicos')}>SERVIÇOS</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contato')}>CONTATO</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

