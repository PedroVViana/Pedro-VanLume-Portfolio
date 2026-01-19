import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Github } from 'lucide-react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import Button from '../UI/Button';

const ContatoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Formulário enviado:', formData);
    // Resetar formulário
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contato" className="contato-section">
      <div className="contato-container">
        <h2 className="contato-title">Vamos conversar sobre seu próximo projeto</h2>
        <p className="contato-subtitle">Estou pronto para transformar suas ideias em realidade. Entre em contato e vamos criar algo incrível juntos.</p>
        
        <div className="contato-grid">
          {/* Card de Formulário */}
          <div className="contato-form-card">
            <h3 className="contato-form-title">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} action="https://formsubmit.co/pedro.vvviana@gmail.com" method="POST" className="contato-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>
              
              <Button variant="primary" type="submit">
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Card de Informações */}
          <div className="contato-info-card">
            <h3 className="contato-info-title">Informações de Contato</h3>
            
            <div className="contato-info-list">
              <div className="contato-info-item">
                <div className="contato-info-icon">
                  <Mail />
                </div>
                <div className="contato-info-content">
                  <h4>Email</h4>
                  <a href="mailto:pedro.vvviana@gmail.com">pedro.vvviana@gmail.com</a>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-icon">
                  <Phone />
                </div>
                <div className="contato-info-content">
                  <h4>Telefone</h4>
                  <a href="tel:+5581994952030">81 99495-2030</a>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-icon">
                  <MapPin />
                </div>
                <div className="contato-info-content">
                  <h4>Localização</h4>
                  <p>Pernambuco, Brasil</p>
                </div>
              </div>

              <div className="contato-info-item">
                <div className="contato-info-icon">
                  <Clock />
                </div>
                <div className="contato-info-content">
                  <h4>Horários</h4>
                  <p>Segunda a Sexta: 9h - 18h</p>
                </div>
              </div>
            </div>

            <div className="contato-social">
              <h4>Redes Sociais</h4>
              <div className="contato-social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github />
                  <span>GitHub</span>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTiktok />
                  <span>TikTok</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;

