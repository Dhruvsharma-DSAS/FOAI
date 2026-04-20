import React from 'react';
import { motion } from 'framer-motion';
import EngagementGauge from './EngagementGauge';

export default function ScoreBreakdown({ studentScore, teacherScore, risk }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Score Breakdown</h3>
      <div style={styles.grid}>
        <MiniGauge label="Student Score" score={studentScore} color="#FF6B35" />
        <MiniGauge label="Teacher Score" score={teacherScore} color="#2EC4B6" />
      </div>
    </div>
  );
}

function MiniGauge({ label, score, color }) {
  const size = 100;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={styles.miniGauge}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(45,49,66,0.06)" strokeWidth={8} />
          <motion.circle
            cx={size/2} cy={size/2} r={radius}
            fill="none" stroke={color} strokeWidth={8}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            strokeDasharray={circumference}
          />
        </svg>
        <div style={styles.miniScore}>
          <span className="mono" style={{ color }}>{Math.round(score)}</span>
        </div>
      </div>
      <div style={styles.miniLabel}>{label}</div>
    </div>
  );
}

const styles = {
  container: { width: '100%' },
  title: { fontSize: '1rem', textAlign: 'center', marginBottom: 20, color: '#7A7D8B' },
  grid: { display: 'flex', justifyContent: 'center', gap: 32 },
  miniGauge: { textAlign: 'center' },
  miniScore: {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    fontWeight: 700, fontSize: '1.2rem',
  },
  miniLabel: { fontSize: '0.75rem', fontWeight: 700, marginTop: 8, color: '#2D3142' },
};
