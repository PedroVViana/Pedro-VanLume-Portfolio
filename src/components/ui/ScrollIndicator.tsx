import React from 'react';
import { Mouse, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <motion.div
        className="flex flex-col items-center gap-1 text-apple-text-tertiary"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Mouse size={24} className="opacity-50" />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="opacity-50" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;

