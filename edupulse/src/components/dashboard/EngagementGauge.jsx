import React from 'react';
import { motion } from 'framer-motion';

export default function EngagementGauge({ score, risk, size = 220 }) {
  const radius = (size - 28) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;

  const color = risk === 'Low Risk' ? '#2EC4B6' : risk === 'Medium Risk' ? '#F4A261' : '#E71D73';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(45,49,66,0.08)" strokeWidth={14}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div style={styles.center}>
        <CountUp target={score} style={{ ...styles.score, color }} />
        <div style={styles.label}>out of 100</div>
      </div>
    </div>
  );
}

function CountUp({ target, style }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    const dur = 1800;
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target]);
  return <span className="mono" style={style}>{val}</span>;
}

const styles = {
  center: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)', textAlign: 'center',
  },
  score: {
    fontFamily: "'Space Mono', monospace", fontSize: '2.8rem',
    fontWeight: 700, lineHeight: 1, display: 'block',
  },
  label: {
    fontSize: '0.75rem', color: '#7A7D8B', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4,
  },
};
