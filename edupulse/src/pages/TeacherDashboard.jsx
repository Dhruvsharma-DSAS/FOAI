import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Navbar from '../components/layout/Navbar';
import StatCard from '../components/teacher/StatCard';
import StudentTable from '../components/teacher/StudentTable';
import GlassCard from '../components/shared/GlassCard';
import { Users, TrendingUp, AlertTriangle, CheckCircle, FileBarChart, PieChart, BarChart3 } from 'lucide-react';

export default function TeacherDashboard() {
  const { students, setStudents, getClassStats } = useData();
  const stats = getClassStats();

  const handleUpdate = (email, field, value) => {
    const updated = students.map(s => {
      if (s['Email'] === email) {
        const isNumeric = typeof s[field] === 'number';
        return { ...s, [field]: isNumeric ? Number(value) || 0 : value };
      }
      return s;
    });
    setStudents(updated);
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.content}>
        <div style={styles.header}>
          <h1>Teacher Control Panel 📊</h1>
          <p style={styles.subtitle}>Analyzing student engagement and performance trends</p>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <StatCard icon={<Users size={22} />} label="Total Students" value={stats.total} color="#3B82F6" delay={0.1} />
          <StatCard icon={<TrendingUp size={22} />} label="Avg Engagement" value={stats.avgScore} color="#FF6B35" delay={0.2} />
          <StatCard icon={<AlertTriangle size={22} />} label="High Risk" value={stats.highRisk} color="#E71D73" delay={0.3} />
          <StatCard icon={<CheckCircle size={22} />} label="Low Risk" value={stats.lowRisk} color="#2EC4B6" delay={0.4} />
        </div>

        {/* Main Data Table */}
        <div style={styles.section}>
          <StudentTable students={students} onUpdate={handleUpdate} />
        </div>

        {/* Analytics Row */}
        <div style={styles.analyticsGrid}>
          <GlassCard delay={0.5} style={styles.chartPlaceholder}>
            <div style={styles.chartHeader}><PieChart size={18} /> <h3>Risk Distribution</h3></div>
            <div style={styles.placeholderBox}>
               <div style={{...styles.circle, border: '12px solid #2EC4B6', borderRightColor: '#E71D73', borderBottomColor: '#F4A261'}} />
               <div style={styles.legend}>
                 <div><span style={{background:'#2EC4B6'}} /> Low: {stats.lowRisk}</div>
                 <div><span style={{background:'#F4A261'}} /> Med: {stats.mediumRisk}</div>
                 <div><span style={{background:'#E71D73'}} /> High: {stats.highRisk}</div>
               </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.6} style={styles.chartPlaceholder}>
            <div style={styles.chartHeader}><BarChart3 size={18} /> <h3>Engagement Trend</h3></div>
            <div style={styles.placeholderBox}>
               <div style={styles.fakeBars}>
                 {[40, 70, 55, 90, 65, 80].map((h, i) => (
                   <div key={i} style={{...styles.fakeBar, height: h + '%', background: i % 2 ? '#FF6B35' : '#C3CFE2'}} />
                 ))}
               </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.7} style={styles.reportCard}>
            <div style={styles.reportOverlay}>
              <FileBarChart size={32} color="#7A7D8B" />
              <h3>Class Performance Report</h3>
              <p>Coming Soon — Full AI-generated insights</p>
              <button disabled style={styles.disabledBtn}>Generate Report</button>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', padding: '100px 40px 60px' },
  content: { maxWidth: 1400, margin: '0 auto' },
  header: { marginBottom: 32 },
  subtitle: { color: '#7A7D8B', fontWeight: 600, marginTop: 4 },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 },
  section: { marginBottom: 40 },
  analyticsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 },
  chartPlaceholder: { height: 320, display: 'flex', flexDirection: 'column' },
  chartHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, color: '#7A7D8B' },
  placeholderBox: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30 },
  circle: { width: 140, height: 140, borderRadius: '50%' },
  legend: { display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', fontWeight: 700 },
  fakeBars: { display: 'flex', alignItems: 'flex-end', gap: 12, height: 120, width: '80%' },
  fakeBar: { flex: 1, borderRadius: '4px 4px 0 0' },
  reportCard: { height: 320, background: 'rgba(255,255,255,0.4)', position: 'relative', overflow: 'hidden' },
  reportOverlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 30 },
  disabledBtn: { marginTop: 20, padding: '10px 24px', borderRadius: 10, border: 'none', background: '#A0A3AE', color: 'white', fontWeight: 700, cursor: 'not-allowed' },
};
