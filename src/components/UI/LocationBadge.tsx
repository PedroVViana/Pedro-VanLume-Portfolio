import React from 'react';
import { Globe } from 'lucide-react';

const LocationBadge: React.FC = () => {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 border border-apple-border rounded-full backdrop-blur-sm transition-all group">
            <div className="flex items-center justify-center w-4 h-4 bg-[#8c52ff] rounded-full">
                <Globe size={10} style={{ color: '#FFFFFF' }} />
            </div>
            <span className="text-[10px] font-bold text-apple-text-primary tracking-tight">
                Me localizo no <span className="text-[#8c52ff]">Brasil</span>
            </span>
        </div>
    );
};

export default LocationBadge;
