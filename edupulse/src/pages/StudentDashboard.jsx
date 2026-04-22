import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Navbar from '../components/layout/Navbar';
import GlassCard from '../components/shared/GlassCard';
import EngagementGauge from '../components/dashboard/EngagementGauge';
import ScoreBreakdown from '../components/dashboard/ScoreBreakdown';
import MetricCard from '../components/dashboard/MetricCard';
import FeedbackCard from '../components/dashboard/FeedbackCard';
import MotivationalBanner from '../components/dashboard/MotivationalBanner';
import N8nWorkflowControl from '../components/workflow/N8nWorkflowControl';
import { getAvatarGradient, getRiskColor, getRiskIcon } from '../utils/helpers';
import { Book, Target, Star, HelpCircle, Zap, ClipboardList, TrendingUp } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { findStudentByEmail, loading } = useData();
  const student = findStudentByEmail(user?.email);

  if (!student) {
    return (
      <div style={styles.empty}>
        <Navbar />
        <div style={{ marginTop: 100 }}>
          <h2>Student Data Not Found</h2>
          <p>Please ensure you are logged in with a registered email.</p>
        </div>
      </div>
    );
  }

  const name = student['Student Name'];
  const score = student['Final Engagement Score'];
  const risk = student['Risk'];

  return (
    <div style={styles.container}>
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.content}
      >
        {/* Header */}
        <div style={styles.header}>
          <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            Welcome back, {name}! <span style={styles.wave}>👋</span>
          </motion.h1>
          <p style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>

        <div style={styles.topRow}>
          {/* Profile Card */}
          <GlassCard style={styles.profileCard} delay={0.1}>
            <div style={{ ...styles.avatar, background: getAvatarGradient(name) }}>{name.charAt(0)}</div>
            <h2 style={styles.profileName}>{name}</h2>
            <div style={styles.profileInfo}>
              <div style={styles.infoItem}><span>ID:</span> <strong>{student['ID']}</strong></div>
              <div style={styles.infoItem}><span>Email:</span> <strong style={{fontSize: '0.8rem'}}>{student['Email']}</strong></div>
            </div>
          </GlassCard>

          {/* Main Score Gauge */}
          <GlassCard style={styles.gaugeCard} delay={0.2}>
            <EngagementGauge score={score} risk={risk} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              style={{ ...styles.riskBadge, background: `${getRiskColor(risk)}15`, color: getRiskColor(risk) }}
            >
              {getRiskIcon(risk)} {risk}
            </motion.div>
          </GlassCard>

          {/* Score Breakdown */}
          <GlassCard style={styles.breakdownCard} delay={0.3}>
            <ScoreBreakdown
              studentScore={student['Student Score']}
              teacherScore={student['Teacher Score']}
              risk={risk}
            />
          </GlassCard>
        </div>

        {/* Metrics Grid */}
        <h3 style={styles.sectionTitle}>Detailed Performance</h3>
        <div style={styles.metricsGrid}>
          <MetricCard icon="📖" label="Understanding" value={student['Understanding (Student)']} maxVal={10} color="#FF6B35" delay={0.4} />
          <MetricCard icon="📝" label="Quiz Performance" value={student['Quiz (%)']} maxVal={100} color="#2EC4B6" delay={0.5} />
          <MetricCard icon="⭐" label="Interest Level" value={student['Interest']} maxVal={10} color="#F4A261" delay={0.6} />
          <MetricCard icon="❓" label="Doubt Status" value={student['Doubt']} color={getDoubtColor(student['Doubt'])} delay={0.7} />
          <MetricCard icon="⚡" label="Pace Feedback" value={student['Pace']} color={getPaceColor(student['Pace'])} delay={0.8} />
          <MetricCard icon="📋" label="Assignment" value={student['Assignment']} maxVal={100} color="#E71D73" delay={0.9} />
          <MetricCard icon="🎯" label="Topic Difficulty" value={student['Topic Difficulty']} color={getDiffColor(student['Topic Difficulty'])} delay={1.0} />
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomGrid}>
          <FeedbackCard
            feedback={student['Feedback']}
            sentiment={student['Feedback Level'] || student['feedback_level']}
            teacherRemark={student['Teacher Remark']}
            delay={1.1}
          />
          <MotivationalBanner
            risk={risk}
            suggestion={student['Suggested Improvement']}
            delay={1.2}
          />
        </div>

        {/* N8N Workflow Section */}
        <N8nWorkflowControl initialId={student['ID']} />
      </motion.div>
    </div>
  );
}

function getDoubtColor(v) { return v === 'None' ? '#2EC4B6' : v === 'Some' ? '#F4A261' : '#E71D73'; }
function getPaceColor(v) { return v === 'Perfect' ? '#2EC4B6' : '#E71D73'; }
function getDiffColor(v) { return v === 'Easy' ? '#2EC4B6' : v === 'Medium' ? '#F4A261' : '#E71D73'; }

const styles = {
  container: { minHeight: '100vh', padding: '100px 40px 60px' },
  content: { maxWidth: 1200, margin: '0 auto' },
  empty: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' },
  header: { marginBottom: 32 },
  wave: { display: 'inline-block', animation: 'wave 2.5s infinite', transformOrigin: '70% 70%' },
  date: { color: '#7A7D8B', fontWeight: 600, fontSize: '0.95rem', marginTop: 4 },
  topRow: { display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: 24, marginBottom: 40 },
  profileCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  avatar: { width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', fontWeight: 800, fontFamily: "'Baloo 2', cursive", marginBottom: 16 },
  profileName: { fontSize: '1.4rem', marginBottom: 12 },
  profileInfo: { display: 'flex', flexDirection: 'column', gap: 6, width: '100%' },
  infoItem: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#7A7D8B', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 4 },
  gaugeCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  riskBadge: { marginTop: 16, padding: '6px 16px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 },
  breakdownCard: { display: 'flex', alignItems: 'center' },
  sectionTitle: { fontSize: '1.4rem', marginBottom: 20, color: '#2D3142' },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 20, marginBottom: 40 },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, alignItems: 'start' },
};
