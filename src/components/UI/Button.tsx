import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      className={`btn ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

