import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PixelProps {
  x: number;
  delay: number;
  duration: number;
  screenHeight: number;
  xOffset: number;
}

const Pixel: React.FC<PixelProps> = ({ x, delay, duration, screenHeight, xOffset }) => {
  return (
    <motion.div
      className="pixel-drop"
      initial={{ y: -20, x: 0 }}
      animate={{
        y: screenHeight + 20,
        x: xOffset,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        left: `${x}%`,
      }}
    />
  );
};

const AnimatedBackground: React.FC = () => {
  const [screenHeight, setScreenHeight] = useState(1000);

  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const pixels = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 15,
    xOffset: (Math.random() * 20 - 10),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pixels.map((pixel) => (
        <Pixel
          key={pixel.id}
          x={pixel.x}
          delay={pixel.delay}
          duration={pixel.duration}
          screenHeight={screenHeight}
          xOffset={pixel.xOffset}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;

