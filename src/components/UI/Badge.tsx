import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    className = '',
    icon,
}) => {
    const variants = {
        primary: 'bg-apple-accent-purple text-white',
        secondary: 'bg-apple-bg-secondary text-apple-text-primary border border-apple-border',
        outline: 'bg-transparent text-apple-text-secondary border border-apple-border',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
            {icon && <span className="w-3.5 h-3.5">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
