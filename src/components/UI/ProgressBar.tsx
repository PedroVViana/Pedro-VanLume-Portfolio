import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0
        ? (scrollTop / totalScrollableHeight) * 100
        : 0;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress();

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[110] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-apple-accent-blue to-apple-accent-purple transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

