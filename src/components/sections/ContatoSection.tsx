import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Github, BookOpen } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Card from '../ui/Card';

const WHATSAPP_URL = 'https://wa.me/5581994952030?text=' + encodeURIComponent('Olá! Gostaria de conversar sobre um projeto.');

const ContatoSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Section id="contato" className="bg-[var(--color-bg-primary)] pb-24 md:pb-28">
      <Container>
        <header className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[var(--color-accent-purple)] font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            CONTATO
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">
            Vamos conversar sobre seu próximo projeto
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
            Me diga o contexto e eu retorno com um plano claro de execução.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Form */}
          <Card
            hoverable={false}
            className="p-8 md:p-10 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] transition-all duration-200 ease-out hover:shadow-[var(--shadow-md)]"
          >
            <form
              action="https://formsubmit.co/pedro.vvviana@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value="Novo contato do portfólio" />
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                  Nome
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/25 focus:border-[var(--color-accent-purple)] transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/25 focus:border-[var(--color-accent-purple)] transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-[var(--color-text-secondary)]">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Conte-me sobre seu projeto..."
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/25 focus:border-[var(--color-accent-purple)] transition-all duration-200 resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-[var(--radius-sm)] bg-[var(--color-text-primary)] text-white font-semibold text-sm shadow-[var(--shadow-sm)] hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2"
                >
                  Enviar Mensagem
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-sm font-semibold text-[var(--color-accent-purple)] hover:text-[var(--color-text-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 rounded"
                >
                  Falar no WhatsApp →
                </a>
              </div>
            </form>
          </Card>

          {/* Info card + Social */}
          <div className="space-y-8">
            <Card
              hoverable={false}
              className="p-8 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]"
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                Contato direto
              </h3>
              <ul className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'pedro.vvviana@gmail.com', href: 'mailto:pedro.vvviana@gmail.com' },
                  { icon: Phone, label: 'WhatsApp', value: '+55 81 99495-2030', href: 'https://wa.me/5581994952030' },
                  { icon: MapPin, label: 'Local', value: 'Pernambuco, Brasil' },
                  { icon: Clock, label: 'Horário', value: 'Seg–Sex, 9h–18h' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-accent-purple)]">
                      <item.icon size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-[var(--color-text-primary)] font-medium hover:text-[var(--color-accent-purple)] hover:underline decoration-2 underline-offset-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 rounded"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[var(--color-text-primary)] font-medium">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/pedro-vanlume-0230551b9/' },
                { icon: Github, label: 'GitHub', url: 'https://github.com/PedroVViana' },
                { icon: BookOpen, label: 'Blog', url: 'https://devlumeblogs.com/' },
                { icon: FaInstagram, label: 'Instagram', url: 'https://www.instagram.com/devlume__?igsh=MTBuZHZ3Y3ZkYWZpdA==' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-purple)] hover:underline decoration-2 underline-offset-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] focus-visible:ring-offset-2 rounded"
                >
                  <social.icon size={18} />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContatoSection;
