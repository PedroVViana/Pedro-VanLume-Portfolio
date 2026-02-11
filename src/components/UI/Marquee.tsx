import React from 'react';

const Marquee: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-[0.03] z-0">
            <div className="whitespace-nowrap animate-marquee flex">
                <span className="text-[20vw] font-black uppercase tracking-tighter mx-4">
                    Pedro Van-Lume — Pedro Van-Lume — Pedro Van-Lume — Pedro Van-Lume —
                </span>
                <span className="text-[20vw] font-black uppercase tracking-tighter mx-4">
                    Pedro Van-Lume — Pedro Van-Lume — Pedro Van-Lume — Pedro Van-Lume —
                </span>
            </div>
        </div>
    );
};

export default Marquee;
