import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from './Mascot';
import { X, MessageCircle } from 'lucide-react';

/* Floating character panel — bottom-right corner.
   Inspired by Book_Collection CharacterCrew.tsx */
export default function CharacterCrew() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChar, setActiveChar] = useState(null);

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, pointerEvents: 'none' }}>

      {/* Active character overlay */}
      <AnimatePresence>
        {activeChar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            style={{
              pointerEvents: 'auto', background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              borderRadius: 40, padding: '48px 40px 32px', border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 20px 60px rgba(108,92,231,0.2)', position: 'relative', minWidth: 320,
            }}
          >
            <button
              onClick={() => setActiveChar(null)}
              style={{
                position: 'absolute', top: 16, right: 16, width: 36, height: 36,
                borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(231,76,60,0.15)'; e.target.style.color = '#E74C3C'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(0,0,0,0.08)'; e.target.style.color = 'inherit'; }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
              <Mascot size={180} forceSpeech={true} />
              <p style={{ fontFamily: "'Baloo 2',cursive", fontSize: '1.6rem', color: '#6C5CE7', marginTop: 8 }}>
                EduBuddy
              </p>
              <p style={{ fontSize: '0.8rem', color: '#636E72', fontWeight: 600 }}>Your Learning Companion</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating panel bar */}
      <motion.div
        layout
        style={{
          pointerEvents: 'auto', background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28, padding: 12, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 32px rgba(108,92,231,0.15)', border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              key="expanded"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4, paddingRight: 4 }}
            >
              <motion.button
                whileHover={{ scale: 1.2, y: -6 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveChar(activeChar ? null : 'mascot')}
                style={{
                  width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', cursor: 'pointer',
                  border: activeChar ? '2px solid #6C5CE7' : '2px solid transparent',
                  background: 'rgba(108,92,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: activeChar ? '0 0 12px rgba(108,92,231,0.3)' : 'none', transition: 'all 0.2s',
                }}
              >
                <div style={{ transform: 'scale(0.22)', transformOrigin: 'center' }}>
                  <Mascot size={200} />
                </div>
              </motion.button>
              <div style={{ width: 1, height: 28, background: 'rgba(108,92,231,0.15)', marginLeft: 4, marginRight: 4 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed preview */}
        {!isOpen && (
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: 'rgba(108,92,231,0.12)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.15)', transformOrigin: 'center' }}>
              <Mascot size={200} />
            </div>
          </div>
        )}

        {/* Toggle button */}
        <motion.button
          onClick={() => { setIsOpen(!isOpen); if (isOpen) setActiveChar(null); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isOpen ? 'rgba(108,92,231,0.1)' : 'linear-gradient(135deg, #6C5CE7, #0984E3)',
            color: isOpen ? '#6C5CE7' : 'white',
            boxShadow: isOpen ? 'none' : '0 4px 15px rgba(108,92,231,0.35)',
            transition: 'all 0.3s',
          }}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </motion.div>
    </div>
  );
}
