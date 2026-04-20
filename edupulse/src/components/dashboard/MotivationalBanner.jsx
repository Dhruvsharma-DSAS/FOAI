import React from 'react';
import { motion } from 'framer-motion';
import { getMotivationalMessage, getRiskColor } from '../../utils/helpers';
import { Lightbulb, Sparkles } from 'lucide-react';

export default function MotivationalBanner({ risk, suggestion, delay = 0 }) {
  const color = getRiskColor(risk);
  const message = getMotivationalMessage(risk);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      style={{ ...styles.container, borderLeft: `6px solid ${color}`, background: `${color}10` }}
    >
      <div style={styles.main}>
        <div style={{ ...styles.iconWrap, background: color }}>
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <h3 style={{ ...styles.msg, color }}>{message}</h3>
          <div style={styles.suggestionWrap}>
            <Lightbulb size={14} style={{ marginTop: 2 }} />
            <p style={styles.suggestion}>{suggestion}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  container: {
    padding: '24px 30px', borderRadius: 20, display: 'flex', alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden', position: 'relative',
  },
  main: { display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 2 },
  iconWrap: {
    width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  msg: { fontSize: '1.2rem', marginBottom: 4, fontWeight: 800 },
  suggestionWrap: { display: 'flex', gap: 8, color: '#7A7D8B' },
  suggestion: { fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4 },
};
