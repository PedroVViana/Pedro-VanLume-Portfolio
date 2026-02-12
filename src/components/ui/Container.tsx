import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    size = 'lg',
}) => {
    const sizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1440px]',
        full: 'max-w-full',
    };

    return (
        <div className={`mx-auto px-6 md:px-12 w-full ${sizes[size]} ${className}`}>
            {children}
        </div>
    );
};

export default Container;
