import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Github } from 'lucide-react';
import { FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Button from '../UI/Button';

const ContatoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <form
              action={`https://formsubmit.co/${import.meta.env.VITE_CONTACT_EMAIL}`}
              method="POST"
              className="contato-form"
            >
              {/* Campos ocultos do FormSubmit */}
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_captcha" value="false" />

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
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Assunto da mensagem"
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
                  <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>{import.meta.env.VITE_CONTACT_EMAIL}</a>
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
                <a href="https://www.linkedin.com/in/pedro-vanlume-0230551b9/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/PedroVViana" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github />
                  <span>GitHub</span>
                </a>
                <a href="https://www.tiktok.com/@devlume__" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTiktok />
                  <span>TikTok</span>
                </a>
                <a href="https://wa.me/5581994952030" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
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
