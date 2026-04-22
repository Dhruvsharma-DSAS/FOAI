import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Zap, Play, Loader2 } from 'lucide-react';
import GlassCard from '../shared/GlassCard';

export default function N8nWorkflowControl() {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const webhookUrl = "http://localhost:5678/webhook/student-engagement-sync";

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runPipeline = () => {
    setIsRunning(true);
    setStep(1);
    
    // Simulate pipeline steps
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => {
      setIsRunning(false);
      setStep(4);
      setTimeout(() => {
        // After success, wait a bit and reset to 0
        setTimeout(() => setStep(0), 4000);
      }, 100);
    }, 4500);
  };

  return (
    <GlassCard delay={0.8} style={styles.container}>
      <div style={styles.header}>
        <div style={styles.iconBox}><Zap size={24} color="#7C3AED" /></div>
        <div>
          <h2 style={styles.title}>How Our n8n Pipeline Works ⚡</h2>
          <p style={styles.subtitle}>Automated data orchestration from source to dashboard</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.controlBox}>
          <label style={styles.label}>Webhook Trigger URL</label>
          <div style={styles.inputWrapper}>
            <input 
              readOnly 
              value={webhookUrl} 
              style={styles.input}
            />
            <button onClick={handleCopy} style={styles.copyBtn}>
              {copied ? <Check size={18} color="#10B981" /> : <Copy size={18} />}
            </button>
          </div>
          <p style={styles.infoText}>Use this URL in your Google Forms or external scripts to trigger the sync.</p>
        </div>

        <div style={styles.actionBox}>
          <button 
            onClick={runPipeline} 
            disabled={isRunning}
            style={{
              ...styles.runBtn, 
              opacity: isRunning ? 0.7 : 1,
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            {isRunning ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Running Pipeline...</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Play size={18} fill="currentColor" /> 
                <span>Test Pipeline Locally</span>
              </div>
            )}
          </button>
          
          <AnimatePresence>
            {step > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  ...styles.statusBox,
                  background: step === 4 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(124, 58, 237, 0.05)',
                  borderColor: step === 4 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(124, 58, 237, 0.1)'
                }}
              >
                <div style={{
                  ...styles.statusDot,
                  background: step === 4 ? '#10B981' : '#7C3AED',
                  boxShadow: step === 4 ? '0 0 10px #10B981' : '0 0 10px #7C3AED'
                }} />
                <span style={{
                  ...styles.statusText,
                  color: step === 4 ? '#065F46' : '#4C1D95'
                }}>
                  {step === 1 && "Connecting to local n8n instance..."}
                  {step === 2 && "Processing Student Data via Groq AI..."}
                  {step === 3 && "Updating Dashboard State..."}
                  {step === 4 && "✅ Pipeline Success: Dashboard Updated!"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </GlassCard>
  );
}

const styles = {
  container: { marginTop: 40, padding: 32, background: 'rgba(255, 255, 255, 0.4)' },
  header: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
  iconBox: { padding: 12, borderRadius: 12, background: 'rgba(124, 58, 237, 0.1)' },
  title: { fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', margin: 0 },
  subtitle: { color: '#64748B', fontSize: '0.9rem', marginTop: 4, fontWeight: 500 },
  content: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 },
  controlBox: { display: 'flex', flexDirection: 'column', gap: 10 },
  label: { fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' },
  inputWrapper: { position: 'relative', display: 'flex', gap: 8 },
  input: { 
    flex: 1, 
    padding: '12px 16px', 
    borderRadius: 12, 
    border: '1px solid rgba(200, 210, 220, 0.5)', 
    background: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    color: '#334155',
    fontWeight: 600,
    fontFamily: 'monospace',
    outline: 'none'
  },
  copyBtn: { 
    padding: '0 16px', 
    borderRadius: 12, 
    border: 'none', 
    background: '#FFFFFF', 
    cursor: 'pointer',
    color: '#64748B',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: { fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500, marginTop: 4 },
  actionBox: { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 },
  runBtn: {
    padding: '14px 28px',
    borderRadius: 14,
    border: 'none',
    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
    color: 'white',
    fontWeight: 700,
    fontSize: '1rem',
    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.2)',
    transition: 'transform 0.2s',
    display: 'flex',
    justifyContent: 'center'
  },
  statusBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 20px',
    borderRadius: 12,
    border: '1px solid',
    transition: 'all 0.3s'
  },
  statusDot: { width: 8, height: 8, borderRadius: '50%' },
  statusText: { fontSize: '0.9rem', fontWeight: 700 }
};
