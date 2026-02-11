import React from 'react';

interface SectionProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    spacing?: 'none' | 'sm' | 'md' | 'lg' | 'hero';
}

const Section: React.FC<SectionProps> = ({
    id,
    children,
    className = '',
    spacing = 'md',
}) => {
    const spacingStyles = {
        none: 'py-0',
        sm: 'py-12 md:py-16',
        md: 'py-20 md:py-28',
        lg: 'py-32 md:py-44',
        hero: 'min-height-[100vh] flex items-center',
    };

    return (
        <section id={id} className={`w-full relative ${spacingStyles[spacing]} ${className}`}>
            {children}
        </section>
    );
};

export default Section;
