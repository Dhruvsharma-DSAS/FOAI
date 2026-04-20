import React from 'react';
import { motion } from 'framer-motion';

/* Animated background layer with flying birds, moving clouds, sun, and scenery */
export default function AnimatedWorld() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Sky gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #D6EAF8 0%, #E8F4FD 40%, #F8FAFE 70%, #F8FAFE 100%)' }} />

      {/* Sun */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', top: 40, right: 120, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, #FDCB6E 30%, #FFEAA7 70%, transparent 100%)', boxShadow: '0 0 60px rgba(253,203,110,0.5), 0 0 120px rgba(253,203,110,0.2)' }}
      />

      {/* Clouds - multiple layers, different speeds */}
      {[
        { top: 30, dur: 45, size: 1, opacity: 0.7, delay: 0 },
        { top: 80, dur: 60, size: 0.7, opacity: 0.5, delay: -20 },
        { top: 50, dur: 35, size: 1.2, opacity: 0.6, delay: -10 },
        { top: 120, dur: 55, size: 0.8, opacity: 0.4, delay: -30 },
        { top: 20, dur: 70, size: 0.6, opacity: 0.35, delay: -45 },
      ].map((c, i) => (
        <motion.svg key={`cloud-${i}`} width={120 * c.size} height={50 * c.size} viewBox="0 0 120 50"
          initial={{ x: -150 }}
          animate={{ x: [typeof window !== 'undefined' ? window.innerWidth + 150 : 1600, -150] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'linear', delay: c.delay }}
          style={{ position: 'absolute', top: c.top, opacity: c.opacity }}>
          <ellipse cx="60" cy="35" rx="50" ry="15" fill="white" />
          <ellipse cx="40" cy="28" rx="30" ry="18" fill="white" />
          <ellipse cx="75" cy="25" rx="25" ry="15" fill="white" />
          <ellipse cx="55" cy="22" rx="22" ry="14" fill="white" />
        </motion.svg>
      ))}

      {/* Flying birds — V formations crossing the sky */}
      {[
        { top: 60, dur: 18, delay: 0, scale: 1 },
        { top: 140, dur: 25, delay: -8, scale: 0.7 },
        { top: 90, dur: 22, delay: -15, scale: 0.85 },
      ].map((b, i) => (
        <motion.svg key={`bird-group-${i}`} width={60 * b.scale} height={30 * b.scale} viewBox="0 0 60 30"
          initial={{ x: -80 }}
          animate={{ x: [typeof window !== 'undefined' ? window.innerWidth + 80 : 1600, -80] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'linear', delay: b.delay }}
          style={{ position: 'absolute', top: b.top }}>
          <BirdV />
        </motion.svg>
      ))}

      {/* Mountains / hills on horizon */}
      <svg viewBox="0 0 1440 200" style={{ position: 'absolute', bottom: '30%', width: '100%', opacity: 0.08 }}>
        <path d="M0,200 L200,60 L350,120 L500,40 L650,100 L800,20 L950,80 L1100,30 L1250,90 L1440,50 L1440,200Z" fill="#6C5CE7" />
      </svg>

      {/* Trees along the bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '0 5%', opacity: 0.06 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={i}
            animate={{ scaleY: [1, 1.02, 1], rotate: [0, 0.5, -0.5, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'bottom center' }}>
            <svg width={30 + (i % 3) * 10} height={60 + (i % 4) * 15} viewBox="0 0 40 80">
              <rect x="17" y="50" width="6" height="30" fill="#8B6F47" />
              <ellipse cx="20" cy="35" rx="18" ry="25" fill="#27AE60" />
              <ellipse cx="12" cy="40" rx="12" ry="18" fill="#2ECC71" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Bird V-formation */
function BirdV() {
  return (
    <g>
      <Bird x={30} y={10} />
      <Bird x={20} y={15} /> <Bird x={40} y={15} />
      <Bird x={12} y={22} /> <Bird x={48} y={22} />
    </g>
  );
}

function Bird({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <motion.path
        d="M-5,0 Q-2,-4 0,0 Q2,-4 5,0"
        fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round"
        animate={{ d: ["M-5,0 Q-2,-4 0,0 Q2,-4 5,0", "M-5,2 Q-2,0 0,2 Q2,0 5,2", "M-5,0 Q-2,-4 0,0 Q2,-4 5,0"] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
    </g>
  );
}
