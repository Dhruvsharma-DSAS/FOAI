import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginCard() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { loginStudent, loginTeacher } = useAuth();
  const { students } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (role === 'student') {
      result = loginStudent(email, password, students);
    } else {
      result = loginTeacher(teacherId, password);
    }

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate(role === 'student' ? '/student' : '/teacher');
    }, 800);
  };

  return (
    <motion.div
      animate={
        success ? { scale: 1.05, boxShadow: '0 0 40px rgba(46,196,182,0.5)' }
        : error ? { x: [0, -10, 10, -10, 10, 0] }
        : { y: [0, -8, 0] }
      }
      transition={
        success ? { duration: 0.5 } 
        : error ? { duration: 0.5 }
        : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
      style={{
        ...styles.card,
        border: success ? '1.5px solid #00B894' : error ? '1.5px solid #E17055' : '1.5px solid rgba(255,255,255,0.5)',
      }}
    >
      {/* Logo */}
      <div style={styles.logoWrap}>
        <h1 style={styles.logoText}>
          {'EduPulse'.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -30, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <p style={styles.subtitle}>AI-Powered Student Engagement Tracker</p>
      </div>

      {/* Role Toggle */}
      <div style={styles.toggle}>
        <div style={{
          ...styles.toggleSlider,
          transform: role === 'teacher' ? 'translateX(100%)' : 'translateX(0)',
        }} />
        <button
          onClick={() => { setRole('student'); setError(''); }}
          style={{ ...styles.toggleBtn, color: role === 'student' ? 'white' : '#7A7D8B' }}
        >
          🎓 Student
        </button>
        <button
          onClick={() => { setRole('teacher'); setError(''); }}
          style={{ ...styles.toggleBtn, color: role === 'teacher' ? 'white' : '#7A7D8B' }}
        >
          👨‍🏫 Teacher
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {role === 'student' ? (
            <motion.div key="student" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
              <div style={styles.inputGroup}>
                <Mail size={16} style={styles.inputIcon} />
                <input
                  type="email" placeholder="Enter your email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="teacher" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
              <div style={styles.inputGroup}>
                <User size={16} style={styles.inputIcon} />
                <input
                  type="text" placeholder="Teacher ID" value={teacherId}
                  onChange={e => setTeacherId(e.target.value)}
                  style={styles.input}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={styles.inputGroup}>
          <Lock size={16} style={styles.inputIcon} />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading || success}
          style={{
            ...styles.submitBtn,
            opacity: loading || success ? 0.7 : 1,
          }}
        >
          {loading ? '⏳ Logging in...' : success ? '✅ Success!' : '🚀 Login'}
        </motion.button>
      </form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            style={styles.error}
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const styles = {
  card: {
    width: 420, maxWidth: '90vw', padding: '40px',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    border: '1.5px solid rgba(255,255,255,0.5)',
    borderRadius: 28,
    boxShadow: '0 20px 60px rgba(108,92,231,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
    transition: 'border-color 0.3s',
  },
  logoWrap: { textAlign: 'center', marginBottom: 28 },
  logoText: {
    fontFamily: "'Baloo 2', cursive", fontSize: '2.4rem', fontWeight: 800,
    background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: { fontSize: '0.85rem', color: '#7A7D8B', marginTop: 4, fontWeight: 500 },
  toggle: {
    display: 'flex', background: 'rgba(45,49,66,0.06)',
    borderRadius: 12, padding: 4, marginBottom: 24, position: 'relative',
  },
  toggleSlider: {
    position: 'absolute', top: 4, left: 4,
    width: 'calc(50% - 4px)', height: 'calc(100% - 8px)',
    background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
    borderRadius: 10, transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    boxShadow: '0 2px 8px rgba(108,92,231,0.3)',
  },
  toggleBtn: {
    flex: 1, padding: '11px 16px', border: 'none', background: 'transparent',
    fontFamily: "'Nunito', sans-serif", fontSize: '0.92rem', fontWeight: 700,
    cursor: 'pointer', borderRadius: 10, position: 'relative', zIndex: 2,
    transition: 'color 0.3s',
  },
  inputGroup: { position: 'relative', marginBottom: 14 },
  inputIcon: {
    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
    color: '#A0A3AE', pointerEvents: 'none',
  },
  input: {
    width: '100%', padding: '14px 18px 14px 42px',
    border: '2px solid rgba(45,49,66,0.08)', borderRadius: 12,
    fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem',
    color: '#2D3142', background: 'rgba(255,255,255,0.6)',
    outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  submitBtn: {
    width: '100%', padding: '15px', marginTop: 8, border: 'none', borderRadius: 14,
    background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
    color: 'white', fontFamily: "'Nunito', sans-serif", fontSize: '1.05rem',
    fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(108,92,231,0.35)',
  },
  error: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'rgba(225,112,85,0.1)', color: '#E17055',
    padding: '10px 16px', borderRadius: 10, fontSize: '0.85rem',
    fontWeight: 600, marginTop: 12,
  },
};
