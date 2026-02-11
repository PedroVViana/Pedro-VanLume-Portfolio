import React from 'react';
import { Icon } from '@iconify/react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5581994952030';
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      onClick={handleClick}
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <Icon icon="logos:whatsapp-icon" width="32" height="32" className="drop-shadow-sm" />
      <span className="absolute right-full mr-4 bg-white text-apple-text-primary px-3 py-1.5 rounded-apple-md text-sm font-bold shadow-apple-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-apple-border">
        Chamar no WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
