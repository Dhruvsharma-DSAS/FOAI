import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/shared/Mascot';
import ClassroomScene from '../components/shared/ClassroomScene';
import AnimatedWorld from '../components/shared/AnimatedWorld';
import LoadingScreen from '../components/shared/LoadingScreen';
import { useData } from '../context/DataContext';
import { ArrowRight, ChevronDown, Brain, BarChart3, Shield, Users, Zap, Target, GraduationCap, FileSpreadsheet, Bot, LineChart } from 'lucide-react';
import N8nPipelineSection from '../components/workflow/N8nPipelineSection';
import N8nWorkflowControl from '../components/workflow/N8nWorkflowControl';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* Mouse-reactive floating shape */
function FloatingShape({ children, x, y, delay = 0, duration = 6, size = 40, depth = 1 }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 12, -12, 0], scale: [1, 1.05, 1] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.6, rotate: 25, filter: 'drop-shadow(0 8px 20px rgba(108,92,231,0.3))' }}
      style={{ position: 'absolute', left: x, top: y, fontSize: size, cursor: 'pointer', zIndex: 2, userSelect: 'none', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))', transition: 'filter 0.3s' }}
    >{children}</motion.div>
  );
}

/* Floating 3D book */
function FloatingBook({ x, y, color, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotateY: [0, 180, 360], rotateZ: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.5 }}
      style={{ position: 'absolute', left: x, top: y, zIndex: 2, cursor: 'pointer', perspective: 200 }}
    >
      <div style={{ width: 36, height: 48, background: color, borderRadius: '3px 8px 8px 3px', boxShadow: `4px 4px 12px ${color}40`, border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 18, height: 1.5, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
      </div>
    </motion.div>
  );
}

/* Floating pencil */
function FloatingPencil({ x, y, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [15, -15, 15] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.4 }}
      style={{ position: 'absolute', left: x, top: y, zIndex: 2, cursor: 'pointer' }}
    >
      <svg width="40" height="10" viewBox="0 0 40 10">
        <rect x="0" y="1" width="30" height="8" rx="1" fill="#FDCB6E" />
        <polygon points="30,1 40,5 30,9" fill="#F5D0A9" />
        <rect x="30" y="2" width="3" height="6" fill="#DFE6E9" />
        <rect x="0" y="1" width="4" height="8" rx="1" fill="#E17055" />
      </svg>
    </motion.div>
  );
}

export default function LoginPage() {
  const { loading } = useData();
  const navigate = useNavigate();

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative' }}>
      <AnimatedWorld />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <LoadingScreen show={loading} />

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navLogo}><span style={S.logoIcon}>E</span><span style={S.logoText}>EduPulse</span></div>
        <div style={S.navLinks}>
          <a href="#features" style={S.navLink}>Features</a>
          <a href="#how" style={S.navLink}>How It Works</a>
          <a href="#who" style={S.navLink}>For Who</a>
          <a href="#workflow" style={S.navLink}>n8n Pipeline</a>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/login')} style={S.navBtn}>Login →</motion.button>
        </div>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <FloatingShape x="5%" y="15%" delay={0}>⭐</FloatingShape>
        <FloatingShape x="85%" y="10%" delay={1} size={50}>🧩</FloatingShape>
        <FloatingShape x="90%" y="60%" delay={0.5} size={35}>📚</FloatingShape>
        <FloatingShape x="8%" y="70%" delay={2}>✏️</FloatingShape>
        <FloatingShape x="75%" y="80%" delay={1.5} size={30}>🎯</FloatingShape>
        <FloatingShape x="15%" y="45%" delay={0.8} size={28}>💡</FloatingShape>
        <FloatingShape x="50%" y="8%" delay={1.2} size={32}>🎓</FloatingShape>

        {/* Decorative circles */}
        <div style={{ ...S.decoCircle, width: 300, height: 300, top: -80, right: -60, background: 'rgba(108,92,231,0.08)' }} />
        <div style={{ ...S.decoCircle, width: 200, height: 200, bottom: -40, left: -40, background: 'rgba(0,206,209,0.08)' }} />
        <div style={{ ...S.decoCircle, width: 120, height: 120, top: '40%', right: '20%', background: 'rgba(253,203,110,0.12)' }} />

        <div style={S.heroGrid}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={S.heroLeft}>
            <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} style={S.heroBadge}>🚀 AI-Powered Education</motion.span>
            <h1 style={S.heroTitle}>Track Student<br /><span style={{ color: '#6C5CE7' }}>Engagement</span><br />Like Never Before</h1>
            <p style={S.heroDesc}>Where every student's voice is heard, every classroom comes alive, and teachers get real-time AI insights to transform education.</p>
            <div style={S.heroBtns}>
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(108,92,231,0.4)' }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/login')} style={S.ctaBtn}>Get Started <ArrowRight size={18} /></motion.button>
              <motion.a href="#features" whileHover={{ scale: 1.05 }} style={S.ghostBtn}>Learn More <ChevronDown size={16} /></motion.a>
            </div>
            <div style={S.trustBar}>
              {[{ n: '500+', l: 'Students' }, { n: '98%', l: 'Accuracy' }, { n: '⚡', l: 'Real-time' }].map((s, i) => (
                <div key={i} style={S.trustItem}><strong style={S.trustNum}>{s.n}</strong><span style={S.trustLabel}>{s.l}</span></div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} style={S.heroRight}>
            <div style={{ position: 'relative' }}>
              <ClassroomScene width={520} />
              {/* Mascot floating on top */}
              <div style={{ position: 'absolute', top: -60, right: -30, zIndex: 5 }}>
                <Mascot size={100} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={S.scrollHint}>
          <ChevronDown size={24} color="#B2BEC3" /><span style={{ color: '#B2BEC3', fontSize: '0.8rem' }}>Scroll to explore</span>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ ...S.section, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={S.inner}>
          <motion.div variants={fadeUp} style={S.secHead}>
            <span style={{ ...S.badge, background: '#EDE7FE', color: '#6C5CE7' }}>✨ Features</span>
            <h2 style={S.secTitle}>Everything You Need to<br /><span style={{ color: '#6C5CE7' }}>Transform Engagement</span></h2>
            <p style={S.secDesc}>EduPulse combines AI, real-time analytics, and beautiful design to give teachers and students an unprecedented view into classroom engagement.</p>
          </motion.div>
          <div style={S.featGrid}>
            {[
              { icon: <Brain size={26} />, title: 'AI Sentiment Analysis', desc: 'Groq-powered NLP analyzes student feedback to detect emotional tone and engagement signals.', c: '#6C5CE7' },
              { icon: <BarChart3 size={26} />, title: 'Live Engagement Scores', desc: 'A weighted formula combines quiz, self-assessment, teacher evaluation, and AI analysis.', c: '#00CED1' },
              { icon: <Shield size={26} />, title: 'Risk Detection', desc: 'Automatic Low/Medium/High risk classification so teachers can intervene early.', c: '#E17055' },
              { icon: <Users size={26} />, title: 'Dual Dashboards', desc: 'Personalized views for students and teachers with role-based access control.', c: '#0984E3' },
              { icon: <Zap size={26} />, title: 'N8N Automation', desc: 'Fully automated pipeline from Google Form to processed AI insights in 30 seconds.', c: '#FDCB6E' },
              { icon: <Target size={26} />, title: 'Smart Suggestions', desc: 'AI-generated improvement tips personalized to each student\'s weak areas.', c: '#00B894' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(108,92,231,0.12)' }} style={S.featCard}>
                <div style={{ ...S.featIcon, background: `${f.c}15`, color: f.c }}>{f.icon}</div>
                <h3 style={S.featTitle}>{f.title}</h3>
                <p style={S.featDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ ...S.section, background: 'rgba(255,255,255,0.5)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={S.inner}>
          <motion.div variants={fadeUp} style={S.secHead}>
            <span style={{ ...S.badge, background: '#E0F7FA', color: '#00CED1' }}>⚡ How It Works</span>
            <h2 style={S.secTitle}>From Form to <span style={{ color: '#00CED1' }}>Insight</span> in Seconds</h2>
          </motion.div>
          <div style={S.stepsGrid}>
            {[
              { s: '01', icon: <FileSpreadsheet size={28} />, t: 'Student Fills Form', d: 'Quick Google Form rating understanding, interest, pace, and feedback.', c: '#0984E3' },
              { s: '02', icon: <Bot size={28} />, t: 'AI Analyzes', d: 'N8N sends feedback to Groq AI for sentiment analysis.', c: '#6C5CE7' },
              { s: '03', icon: <LineChart size={28} />, t: 'Scores Calculated', d: 'Custom JS weighs all inputs to compute Final Engagement Score.', c: '#00CED1' },
              { s: '04', icon: <GraduationCap size={28} />, t: 'Dashboard Updates', d: 'Results appear instantly with risk flags and suggestions.', c: '#00B894' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} style={S.stepCard}>
                <div className="mono" style={{ ...S.stepNum, color: s.c }}>{s.s}</div>
                <div style={{ ...S.stepIcon, background: `${s.c}12`, color: s.c }}>{s.icon}</div>
                <h3 style={S.stepTitle}>{s.t}</h3>
                <p style={S.stepDesc}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHO */}
      <section id="who" style={{ ...S.section, background: '#2D3436' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={S.inner}>
          <motion.div variants={fadeUp} style={S.secHead}>
            <span style={{ ...S.badge, background: 'rgba(108,92,231,0.2)', color: '#A29BFE' }}>🎯 Who It's For</span>
            <h2 style={{ ...S.secTitle, color: 'white' }}>Built for <span style={{ color: '#00CED1' }}>Real Classrooms</span></h2>
          </motion.div>
          <div style={S.rolesGrid}>
            {/* Teacher Card */}
            <motion.div variants={fadeUp} whileHover={{ y: -8, background: 'rgba(108,92,231,0.12)' }} style={{ ...S.roleCard, background: 'rgba(255,255,255,0.06)' }}>
              {/* Animated Teacher SVG */}
              <motion.svg width="100" height="100" viewBox="0 0 100 100" animate={{ y: [0,-4,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <circle cx="50" cy="30" r="18" fill="#F5D0A9" />
                <path d="M35,28 Q40,15 50,13 Q60,15 65,28" fill="#8B4513" />
                <circle cx="44" cy="30" r="2.5" fill="#2D3436" />
                <circle cx="56" cy="30" r="2.5" fill="#2D3436" />
                <path d="M47,37 Q50,40 53,37" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="42" y="25" width="7" height="5" rx="2.5" fill="none" stroke="#A0A0A0" strokeWidth="1.2" />
                <rect x="51" y="25" width="7" height="5" rx="2.5" fill="none" stroke="#A0A0A0" strokeWidth="1.2" />
                <line x1="49" y1="28" x2="51" y2="28" stroke="#A0A0A0" strokeWidth="1" />
                <path d="M35,48 Q35,75 30,95 L70,95 Q65,75 65,48Z" fill="#6C5CE7" />
                <motion.line x1="35" y1="55" x2="22" y2="68" stroke="#F5D0A9" strokeWidth="4" strokeLinecap="round" animate={{ x2: [22, 18, 22] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.line x1="65" y1="55" x2="78" y2="65" stroke="#F5D0A9" strokeWidth="4" strokeLinecap="round" animate={{ x2: [78, 82, 78] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <rect x="75" y="58" width="16" height="12" rx="2" fill="#DFE6E9" />
                <rect x="77" y="60" width="12" height="8" rx="1" fill="#74B9FF" />
              </motion.svg>
              <h3 style={{ fontSize: '1.6rem', fontFamily: "'Baloo 2',cursive", color: 'white', margin: '16px 0 24px' }}>For Teachers</h3>
              <ul style={S.roleList}>
                {['📊 View scores for every student', '🚨 Spot high-risk students instantly', '✏️ Edit scores & add remarks', '📈 Analyze trends with charts', '🔍 Search, sort & filter roster', '📋 Generate performance reports'].map((it, j) => <li key={j} style={S.roleItem}>{it}</li>)}
              </ul>
            </motion.div>

            {/* Student Card */}
            <motion.div variants={fadeUp} whileHover={{ y: -8, background: 'rgba(0,206,209,0.12)' }} style={{ ...S.roleCard, background: 'rgba(255,255,255,0.06)' }}>
              {/* Animated Student SVG */}
              <motion.svg width="100" height="100" viewBox="0 0 100 100" animate={{ y: [0,-4,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <circle cx="50" cy="32" r="18" fill="#FFEAA7" />
                <path d="M32,24 Q40,12 50,10 Q60,12 68,24" fill="#2D3436" />
                <circle cx="44" cy="32" r="2.5" fill="#2D3436" />
                <circle cx="56" cy="32" r="2.5" fill="#2D3436" />
                <circle cx="45" cy="31" r="1" fill="white" />
                <circle cx="57" cy="31" r="1" fill="white" />
                <path d="M46,39 Q50,43 54,39" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M35,50 Q35,78 30,95 L70,95 Q65,78 65,50Z" fill="#00CED1" />
                <motion.line x1="65" y1="58" x2="78" y2="42" stroke="#FFEAA7" strokeWidth="4" strokeLinecap="round" animate={{ x2: [78,82,78], y2: [42,38,42] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <motion.circle cx="80" cy="40" r="3" fill="#FFEAA7" animate={{ cy: [40,36,40] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <polygon points="50,6 30,18 50,30 70,18" fill="#2D3436" />
                <rect x="42" y="18" width="16" height="3" fill="#2D3436" />
                <line x1="67" y1="18" x2="72" y2="28" stroke="#2D3436" strokeWidth="2" />
                <circle cx="72" cy="30" r="3" fill="#FDCB6E" />
              </motion.svg>
              <h3 style={{ fontSize: '1.6rem', fontFamily: "'Baloo 2',cursive", color: 'white', margin: '16px 0 24px' }}>For Students</h3>
              <ul style={S.roleList}>
                {['🎯 See your Engagement Score /100', '📖 Detailed metric breakdown', '💬 Read teacher\'s remarks', '🌟 Get AI improvement tips', '📊 Understand your risk level', '💪 Stay motivated & track progress'].map((it, j) => <li key={j} style={S.roleItem}>{it}</li>)}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* N8N WORKFLOW — 27-Node Pipeline Visualization */}
      <N8nPipelineSection />

      {/* Webhook Control Section */}
      <section id="webhook-control" style={{ padding: '0 48px 100px', background: 'transparent' }}>
        <div style={S.inner}>
          <N8nWorkflowControl />
        </div>
      </section>

      {/* Extra floating elements between sections */}
      <div style={{ position: 'relative', height: 0, overflow: 'visible' }}>
        <FloatingBook x="8%" y="-40px" color="#6C5CE7" delay={0} />
        <FloatingBook x="88%" y="-60px" color="#E17055" delay={1} />
        <FloatingBook x="45%" y="-50px" color="#00CED1" delay={0.5} />
        <FloatingPencil x="75%" y="-30px" delay={0.5} />
        <FloatingPencil x="15%" y="-55px" delay={1.5} />
        <FloatingShape x="20%" y="-50px" delay={0.3} size={30}>🦋</FloatingShape>
        <FloatingShape x="60%" y="-45px" delay={1.2} size={28}>🐦</FloatingShape>
        <FloatingShape x="35%" y="-65px" delay={0.7} size={24}>🌸</FloatingShape>
        <FloatingShape x="80%" y="-35px" delay={1.8} size={22}>🍃</FloatingShape>
      </div>

      {/* CTA BANNER — replaces inline login */}
      <section style={{ ...S.section, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'visible' }}>
        <FloatingShape x="5%" y="20%" delay={0.5} size={32}>📖</FloatingShape>
        <FloatingShape x="90%" y="30%" delay={1} size={28}>🎒</FloatingShape>
        <FloatingBook x="85%" y="60%" color="#00CED1" delay={0.8} />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ ...S.inner, textAlign: 'center' }}>
          <h2 style={S.secTitle}>Ready to <span style={{ color: '#6C5CE7' }}>Get Started?</span></h2>
          <p style={{ ...S.secDesc, marginBottom: 40 }}>Login as a student to see your engagement score, or as a teacher to analyze your classroom.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <Mascot size={120} />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(108,92,231,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{ ...S.ctaBtn, fontSize: '1.3rem', padding: '20px 48px', borderRadius: 20 }}
            >
              Login Now <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLogo}><span style={S.logoIcon}>E</span><span style={{ ...S.logoText, color: 'white' }}>EduPulse</span></div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>AI-Powered Student Engagement Tracker — FOAI Project</p>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', marginTop: 8 }}>Made with ❤️ by Dhruv Sharma • 2026</p>
      </footer>
      </div>{/* close z-index:1 wrapper */}
    </div>
  );
}

const S = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(248,250,254,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.04)' },
  navLogo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoIcon: { width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6C5CE7,#0984E3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontFamily: "'Baloo 2',cursive", fontSize: '1.1rem' },
  logoText: { fontFamily: "'Baloo 2',cursive", fontSize: '1.4rem', fontWeight: 800, color: '#2D3436' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 28 },
  navLink: { textDecoration: 'none', color: '#636E72', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' },
  navBtn: { padding: '10px 24px', border: 'none', borderRadius: 12, background: '#6C5CE7', color: 'white', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' },

  hero: { position: 'relative', padding: '100px 48px 80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center', maxWidth: 1300, margin: '0 auto', width: '100%' },
  heroLeft: { position: 'relative', zIndex: 3 },
  heroBadge: { display: 'inline-block', padding: '10px 24px', borderRadius: 30, background: '#EDE7FE', color: '#6C5CE7', fontSize: '1rem', fontWeight: 800, marginBottom: 24 },
  heroTitle: { fontFamily: "'Baloo 2',cursive", fontSize: 'clamp(2.5rem,5.5vw,4rem)', fontWeight: 800, color: '#2D3436', lineHeight: 1.1, marginBottom: 24 },
  heroDesc: { fontSize: '1.2rem', color: '#636E72', lineHeight: 1.7, marginBottom: 36, maxWidth: 520, fontFamily: "'Nunito',sans-serif" },
  heroBtns: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  ctaBtn: { display: 'flex', alignItems: 'center', gap: 10, padding: '18px 40px', border: 'none', borderRadius: 18, background: 'linear-gradient(135deg,#6C5CE7,#0984E3)', color: 'white', fontFamily: "'Baloo 2',cursive", fontSize: '1.15rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 30px rgba(108,92,231,0.35)' },
  ghostBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '18px 32px', border: '2px solid #DFE6E9', borderRadius: 18, background: 'rgba(255,255,255,0.8)', color: '#2D3436', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', textDecoration: 'none' },
  trustBar: { display: 'flex', gap: 40, marginTop: 48 },
  trustItem: { display: 'flex', flexDirection: 'column' },
  trustNum: { fontSize: '1.6rem', color: '#6C5CE7', fontFamily: "'Baloo 2',cursive", fontWeight: 800 },
  trustLabel: { fontSize: '0.85rem', color: '#B2BEC3', fontWeight: 600, fontFamily: "'Nunito',sans-serif" },
  heroRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 3 },
  classroomCard: { background: 'white', borderRadius: 20, padding: 0, width: 280, boxShadow: '0 15px 40px rgba(0,0,0,0.08)', border: '1px solid #F1F3F5', overflow: 'hidden' },
  classHeader: { display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: '#F8FAFE', fontSize: '0.8rem', fontWeight: 700, color: '#636E72' },
  classDot1: { width: 8, height: 8, borderRadius: '50%', background: '#E17055' },
  classDot2: { width: 8, height: 8, borderRadius: '50%', background: '#FDCB6E' },
  classDot3: { width: 8, height: 8, borderRadius: '50%', background: '#00B894', marginRight: 8 },
  classBody: { padding: '16px' },
  miniStudent: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  miniBar: { height: 8, borderRadius: 4 },

  decoCircle: { position: 'absolute', borderRadius: '50%', zIndex: 0 },
  scrollHint: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 40 },

  section: { padding: '120px 48px', position: 'relative' },
  inner: { maxWidth: 1300, margin: '0 auto' },
  secHead: { textAlign: 'center', marginBottom: 72 },
  badge: { display: 'inline-block', padding: '8px 22px', borderRadius: 30, fontSize: '0.95rem', fontWeight: 800, marginBottom: 20, fontFamily: "'Nunito',sans-serif" },
  secTitle: { fontFamily: "'Baloo 2',cursive", fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 800, color: '#2D3436', lineHeight: 1.15, marginBottom: 18 },
  secDesc: { fontSize: '1.15rem', color: '#636E72', maxWidth: 650, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Nunito',sans-serif" },

  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 28 },
  featCard: { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderRadius: 24, padding: '40px 32px', border: '1px solid rgba(255,255,255,0.6)', transition: 'all 0.3s', cursor: 'default', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' },
  featIcon: { width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  featTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#2D3436', marginBottom: 10, fontFamily: "'Baloo 2',cursive" },
  featDesc: { fontSize: '0.95rem', color: '#636E72', lineHeight: 1.7, fontFamily: "'Nunito',sans-serif" },

  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 },
  stepCard: { textAlign: 'center', padding: '36px 24px', borderRadius: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', transition: 'all 0.3s' },
  stepNum: { fontSize: '2.5rem', fontWeight: 700, opacity: 0.12, marginBottom: 10, fontFamily: "'Baloo 2',cursive" },
  stepIcon: { width: 60, height: 60, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  stepTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#2D3436', marginBottom: 10, fontFamily: "'Baloo 2',cursive" },
  stepDesc: { fontSize: '0.9rem', color: '#636E72', lineHeight: 1.6, fontFamily: "'Nunito',sans-serif" },

  rolesGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 },
  roleCard: { borderRadius: 28, padding: '48px 40px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' },
  roleList: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 },
  roleItem: { color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', lineHeight: 1.5, fontFamily: "'Nunito',sans-serif" },

  footer: { padding: '56px 24px', background: '#2D3436', textAlign: 'center' },
  footerLogo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 },
};
