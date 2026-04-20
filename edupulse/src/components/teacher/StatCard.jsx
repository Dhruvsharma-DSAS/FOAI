import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import AnimatedCounter from '../shared/AnimatedCounter';

export default function StatCard({ icon, label, value, color, delay = 0, isDecimal = false }) {
  const pulseAnim = color === '#E71D73' && value > 0 ? {
    boxShadow: ['0 0 0 rgba(231,29,115,0)', '0 0 20px rgba(231,29,115,0.3)', '0 0 0 rgba(231,29,115,0)']
  } : {};

  return (
    <GlassCard delay={delay} style={styles.card}>
      <motion.div
        animate={pulseAnim}
        transition={{ duration: 2, repeat: Infinity }}
        style={styles.content}
      >
        <div style={{ ...styles.iconWrap, background: `${color}15`, color }}>
          {icon}
        </div>
        <div style={styles.info}>
          <h3 style={styles.value}>
            <AnimatedCounter target={value} decimals={isDecimal ? 1 : 0} />
          </h3>
          <p style={styles.label}>{label}</p>
        </div>
      </motion.div>
    </GlassCard>
  );
}

const styles = {
  card: { padding: 20 },
  content: { display: 'flex', alignItems: 'center', gap: 16, borderRadius: 12 },
  iconWrap: {
    width: 52, height: 52, borderRadius: 14, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
  },
  info: { display: 'flex', flexDirection: 'column' },
  value: { fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#2D3142', lineHeight: 1 },
  label: { fontSize: '0.85rem', color: '#7A7D8B', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.03em' },
};
