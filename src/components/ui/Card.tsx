import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hoverable = true,
}) => {
    return (
        <div
            className={`
        bg-white border border-apple-border rounded-apple-lg shadow-apple-sm
        ${hoverable ? 'transition-all duration-300 hover:shadow-apple-md hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
