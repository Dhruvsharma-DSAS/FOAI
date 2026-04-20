import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Premium loading screen inspired by Book project's LoadingScreen */
export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #F8FAFE 0%, #EDE7FE 50%, #D6EAF8 100%)',
          }}
        >
          {/* Animated logo text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1, rotate: [0, 3, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: "'Baloo 2', cursive", fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 800, background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', filter: 'drop-shadow(0 4px 20px rgba(108,92,231,0.3))',
            }}
          >
            EduPulse
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ color: '#636E72', fontSize: '1rem', fontWeight: 600, marginTop: 8 }}
          >
            Loading your learning world...
          </motion.p>

          {/* Bouncing dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -14, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: i === 0 ? '#6C5CE7' : i === 1 ? '#0984E3' : '#00CED1',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
