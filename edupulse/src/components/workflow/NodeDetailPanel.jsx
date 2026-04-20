import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORY_COLORS, CATEGORY_LABELS } from './WorkflowData';

export default function NodeDetailPanel({ node, onClose }) {
  if (!node) return null;
  const color = CATEGORY_COLORS[node.type] || '#7A7D8B';

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={styles.panel}
    >
      <button onClick={onClose} style={styles.closeBtn}>✕</button>

      {/* Category badge */}
      <span style={{
        display: 'inline-block', padding: '5px 14px', borderRadius: 20,
        background: `${color}15`, color, fontSize: '0.7rem', fontWeight: 800,
        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12,
      }}>
        {CATEGORY_LABELS[node.type] || node.type}
      </span>

      <h2 style={styles.name}>{node.name}</h2>
      <p style={styles.subtitle}>{node.subtitle}</p>

      <div style={styles.section}>
        <h4 style={styles.secTitle}>🔍 What It Does</h4>
        <p style={styles.secText}>{node.what}</p>
      </div>

      <div style={styles.section}>
        <h4 style={styles.secTitle}>💡 Why It Matters</h4>
        <p style={styles.secText}>{node.why}</p>
      </div>

      {node.formula && (
        <div style={{ ...styles.section, padding: '12px 16px', background: `${color}08`, borderRadius: 12, border: `1px solid ${color}20` }}>
          <h4 style={{ ...styles.secTitle, color }}>📐 Formula</h4>
          <p style={{ ...styles.secText, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{node.formula}</p>
        </div>
      )}

      {node.aiModel && (
        <div style={{ ...styles.section, padding: '12px 16px', background: 'rgba(249,115,22,0.06)', borderRadius: 12, border: '1px solid rgba(249,115,22,0.15)' }}>
          <h4 style={{ ...styles.secTitle, color: '#F97316' }}>🤖 AI Model</h4>
          <p style={{ ...styles.secText, fontWeight: 700 }}>{node.aiModel}</p>
        </div>
      )}

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

const styles = {
  panel: {
    position: 'fixed', top: 90, right: 24, bottom: 24, width: 400, zIndex: 110,
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
    borderRadius: 24, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.5)', overflowY: 'auto',
  },
  closeBtn: {
    position: 'absolute', top: 20, right: 20, background: 'none', border: 'none',
    fontSize: '1.2rem', cursor: 'pointer', color: '#A0A3AE',
  },
  name: { fontSize: '1.4rem', marginBottom: 4, color: '#1E293B', fontFamily: "'Baloo 2',cursive", fontWeight: 800 },
  subtitle: { fontSize: '0.85rem', color: '#64748B', marginBottom: 24, fontWeight: 600 },
  section: { marginTop: 24 },
  secTitle: { fontSize: '0.75rem', color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800 },
  secText: { fontSize: '0.9rem', color: '#334155', lineHeight: 1.65, fontWeight: 500 },
  row: { display: 'flex', gap: 16, marginTop: 24 },
  half: { flex: 1 },
  dataTag: { fontSize: '0.8rem', background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 10, color: '#64748B', fontWeight: 600, lineHeight: 1.5 },
};
