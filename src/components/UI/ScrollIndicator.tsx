import React from 'react';
import { Mouse, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="scroll-indicator">
      <motion.div
        className="flex flex-col items-center gap-1 scroll-indicator-icons"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Mouse size={24} className="scroll-indicator-icon" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="scroll-indicator-icon" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;

