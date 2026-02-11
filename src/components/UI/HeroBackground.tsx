import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const HeroBackground: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 50, stiffness: 200 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleCheckMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleCheckMobile();
        window.addEventListener('resize', handleCheckMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', handleCheckMobile);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY, isMobile]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-white">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Animated Subtle Spotlight */}
            {!isMobile && (
                <motion.div
                    className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.07]"
                    style={{
                        background: 'radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)',
                        left: smoothX,
                        top: smoothY,
                        x: '-50%',
                        y: '-50%',
                    }}
                />
            )}

            {/* Static Subtle Gradients for Depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-[0.03] bg-apple-accent-blue" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-[0.03] bg-apple-accent-purple" />
        </div>
    );
};

export default HeroBackground;
