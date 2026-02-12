import React from 'react';

interface DividerProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({
    className = '',
    orientation = 'horizontal',
}) => {
    if (orientation === 'vertical') {
        return <div className={`w-px h-full bg-apple-border ${className}`} />;
    }

    return <div className={`h-px w-full bg-apple-border ${className}`} />;
};

export default Divider;
