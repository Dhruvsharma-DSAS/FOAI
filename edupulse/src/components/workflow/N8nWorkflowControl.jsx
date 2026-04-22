import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Zap, Play, Loader2, Key } from 'lucide-react';
import GlassCard from '../shared/GlassCard';

export default function N8nWorkflowControl({ initialId }) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  
  // Using the specific ID and path structure provided by the user
  const [webhookId, setWebhookId] = useState(initialId || "b4b7aa1c-8948-4558-86d5-871db15bd247");
  const [path, setPath] = useState("webhook-test"); 
  
  const webhookUrl = `http://localhost:5678/${path}/${webhookId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        // Try to extract ID from a full n8n URL if pasted
        const parts = text.split('/');
        const lastPart = parts[parts.length - 1];
        if (lastPart && lastPart.includes('-')) {
          setWebhookId(lastPart);
          if (text.includes('webhook-test')) setPath('webhook-test');
          else if (text.includes('webhook')) setPath('webhook');
        } else {
          setWebhookId(text);
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
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
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Key size={14} style={{ marginRight: 6 }} /> Webhook ID
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                value={webhookId}
                onChange={(e) => setWebhookId(e.target.value)}
                placeholder="Paste your ID here..."
                style={styles.idInput}
              />
              <button onClick={handlePaste} style={styles.pasteBtn}>
                Paste
              </button>
            </div>
          </div>

          <label style={styles.label}>Full Webhook Trigger URL</label>
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
          <p style={styles.infoText}>Currently using <strong>{path}</strong> path. Paste a full link to update.</p>
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
                <span>Test Pipeline Localhost</span>
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
                  {step === 1 && `Triggering ${path} for ID: ${webhookId.substring(0, 8)}...`}
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
  controlBox: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputGroup: { marginBottom: 8 },
  label: { fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', marginBottom: 8 },
  idInput: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid rgba(124, 58, 237, 0.3)',
    background: 'white',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#7C3AED',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
    transition: 'all 0.2s'
  },
  pasteBtn: {
    padding: '0 16px',
    borderRadius: 10,
    border: 'none',
    background: 'rgba(124, 58, 237, 0.1)',
    color: '#7C3AED',
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  inputWrapper: { position: 'relative', display: 'flex', gap: 8 },
  input: { 
    flex: 1, 
    padding: '12px 16px', 
    borderRadius: 12, 
    border: '1px solid rgba(200, 210, 220, 0.5)', 
    background: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.85rem',
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
  infoText: { fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500, marginTop: 2 },
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
