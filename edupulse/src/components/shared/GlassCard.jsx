import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverable = true, delay = 0, style, ...props }) {
  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -5, boxShadow: '0 16px 48px rgba(45,49,66,0.18)' } : {}}
      style={{ padding: 24, ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
