import React from 'react';
import { Icon } from '@iconify/react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5581994952030'; // Número com código do país
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      className="whatsapp-button"
      onClick={handleClick}
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <Icon icon="logos:whatsapp-icon" width="28" height="28" />
    </button>
  );
};

export default WhatsAppButton;
