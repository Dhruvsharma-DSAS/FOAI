import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';

export default function MetricCard({ icon, label, value, maxVal, color, type = 'progress', delay = 0 }) {
  const isNumeric = maxVal !== null && maxVal !== undefined;
  const percentage = isNumeric ? (parseFloat(value) / maxVal) * 100 : 0;
  const display = isNumeric ? `${Math.round(parseFloat(value))}${maxVal === 100 ? '%' : '/' + maxVal}` : value;

  return (
    <GlassCard delay={delay} style={styles.card}>
      <span style={styles.icon}>{icon}</span>
      <div className="mono" style={{ ...styles.value, color }}>{display}</div>
      <div style={styles.label}>{label}</div>
      {isNumeric && (
        <div style={styles.barTrack}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
            style={{ ...styles.barFill, background: color }}
          />
        </div>
      )}
    </GlassCard>
  );
}

const styles = {
  card: { textAlign: 'center', padding: '20px 16px', cursor: 'default' },
  icon: { fontSize: '1.8rem', display: 'block', marginBottom: 6 },
  value: { fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 },
  label: { fontSize: '0.8rem', color: '#7A7D8B', fontWeight: 600 },
  barTrack: {
    width: '100%', height: 6, background: 'rgba(45,49,66,0.08)',
    borderRadius: 3, marginTop: 10, overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3 },
};
