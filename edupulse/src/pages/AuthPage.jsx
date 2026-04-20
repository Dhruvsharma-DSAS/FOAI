import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/login/LoginCard';
import Mascot from '../components/shared/Mascot';
import AnimatedWorld from '../components/shared/AnimatedWorld';

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated sky background */}
      <AnimatedWorld />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>

        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute', top: 28, left: 28, display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', border: 'none', borderRadius: 14,
            background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
            color: '#6C5CE7', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.06)', fontFamily: "'Nunito',sans-serif",
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </motion.button>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
        >
          <span style={{
            width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg,#6C5CE7,#0984E3)', color: 'white',
            fontWeight: 800, fontFamily: "'Baloo 2',cursive", fontSize: '1.2rem',
          }}>E</span>
          <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: '1.6rem', fontWeight: 800, color: '#2D3436' }}>EduPulse</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Baloo 2',cursive", fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#2D3436', marginBottom: 8, textAlign: 'center' }}
        >
          Welcome <span style={{ color: '#6C5CE7' }}>Back!</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#636E72', fontSize: '1.05rem', marginBottom: 32, textAlign: 'center', fontFamily: "'Nunito',sans-serif", maxWidth: 400 }}
        >
          Login to see your engagement score or analyze your classroom.
        </motion.p>

        {/* Mascot + Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <Mascot size={100} />
          <LoginCard />
        </motion.div>
      </div>
    </div>
  );
}
