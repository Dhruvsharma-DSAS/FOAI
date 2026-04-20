import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NodeDetailPanel({ node, onClose }) {
  if (!node) return null;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={styles.panel}
    >
      <button onClick={onClose} style={styles.closeBtn}>✕</button>
      
      <div style={{ ...styles.icon, background: getBg(node.type) }}>{node.icon}</div>
      <h2 style={styles.name}>{node.name}</h2>
      <span style={{ ...styles.type, background: `${getBg(node.type)}15`, color: getBg(node.type) }}>
        {node.type.toUpperCase()}
      </span>

      <div style={styles.section}>
        <h4 style={styles.secTitle}>What It Does</h4>
        <p style={styles.secText}>{node.what}</p>
      </div>

      <div style={styles.section}>
        <h4 style={styles.secTitle}>Why We Use It</h4>
        <p style={styles.secText}>{node.why}</p>
      </div>

      <div style={styles.row}>
        <div style={styles.half}>
          <h4 style={styles.secTitle}>Data In</h4>
          <p style={styles.dataTag}>{node.dataIn}</p>
        </div>
        <div style={styles.half}>
          <h4 style={styles.secTitle}>Data Out</h4>
          <p style={styles.dataTag}>{node.dataOut}</p>
        </div>
      </div>
    </motion.div>
  );
}

function getBg(type) {
  switch(type) {
    case 'trigger': return '#FF6B35';
    case 'data': return '#3B82F6';
    case 'ai': return '#9333EA';
    case 'code': return '#2EC4B6';
    case 'output': return '#E71D73';
    default: return '#7A7D8B';
  }
}

const styles = {
  panel: {
    position: 'fixed', top: 90, right: 24, bottom: 24, width: 380, zIndex: 110,
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
    borderRadius: 24, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.5)', overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
    fontSize: '1.2rem', cursor: 'pointer', color: '#A0A3AE',
  },
  icon: {
    width: 64, height: 64, borderRadius: 16, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '2rem', marginBottom: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  name: { fontSize: '1.5rem', marginBottom: 8, color: '#2D3142' },
  type: { fontSize: '0.7rem', fontWeight: 800, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em' },
  section: { marginTop: 32 },
  secTitle: { fontSize: '0.9rem', color: '#7A7D8B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.03em' },
  secText: { fontSize: '0.95rem', color: '#2D3142', lineHeight: 1.6, fontWeight: 500 },
  row: { display: 'flex', gap: 16, marginTop: 32 },
  half: { flex: 1 },
  dataTag: { fontSize: '0.8rem', background: 'rgba(0,0,0,0.04)', padding: '8px 12px', borderRadius: 8, color: '#64748B', fontWeight: 600 },
};
