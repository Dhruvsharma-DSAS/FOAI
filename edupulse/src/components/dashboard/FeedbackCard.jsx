import React from 'react';
import GlassCard from '../shared/GlassCard';
import { Quote } from 'lucide-react';
import { getFeedbackColor } from '../../utils/helpers';

export default function FeedbackCard({ feedback, sentiment, teacherRemark, delay = 0 }) {
  const color = getFeedbackColor(sentiment);

  return (
    <div style={styles.container}>
      <GlassCard delay={delay} style={{ ...styles.card, borderLeft: `6px solid ${color}` }}>
        <div style={styles.header}>
          <Quote size={20} color={color} fill={color} style={{ opacity: 0.2 }} />
          <h3 style={styles.title}>Your Feedback</h3>
          <span style={{ ...styles.sentiment, background: `${color}15`, color }}>{sentiment}</span>
        </div>
        <p style={styles.text}>"{feedback}"</p>
      </GlassCard>

      <GlassCard delay={delay + 0.1} style={styles.remarkCard}>
        <div style={styles.remarkTape} />
        <h4 style={styles.remarkTitle}>Teacher's Remark</h4>
        <p style={styles.remarkText}>{teacherRemark}</p>
      </GlassCard>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 20 },
  card: { padding: 24, position: 'relative' },
  header: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
  title: { fontSize: '1.1rem', margin: 0 },
  sentiment: { fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: 10, textTransform: 'uppercase' },
  text: { fontSize: '0.95rem', color: '#2D3142', fontStyle: 'italic', lineHeight: 1.6 },
  remarkCard: {
    padding: '30px 24px 24px', background: '#FFFDF5', transform: 'rotate(-1deg)',
    border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  remarkTape: {
    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
    width: 80, height: 24, background: 'rgba(255,107,53,0.15)', borderRadius: 2,
  },
  remarkTitle: { fontSize: '0.9rem', color: '#7A7D8B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' },
  remarkText: { fontFamily: "'Nunito', sans-serif", fontSize: '1rem', color: '#C0392B', fontStyle: 'italic', fontWeight: 600 },
};
