import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import WorkflowCanvas from '../components/workflow/WorkflowCanvas';
import NodeDetailPanel from '../components/workflow/NodeDetailPanel';
import { Play, Info, Layers } from 'lucide-react';

export default function WorkflowPage() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={styles.container}>
      <Navbar />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.content}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <Layers size={32} color="#FF6B35" />
            <h1>Behind the Scenes: AI Pipeline</h1>
          </div>
          <p style={styles.subtitle}>Explore how our N8N workflow processes student data in real-time</p>
          
          <div style={styles.actions}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ ...styles.playBtn, background: isPlaying ? '#E71D73' : '#FF6B35' }}
            >
              {isPlaying ? '⏹ Stop Demo' : <><Play size={16} fill="white" /> Play Demo</>}
            </button>
            <div style={styles.tip}>
              <Info size={16} /> Click any node to see detailed data flow
            </div>
          </div>
        </div>

        <div style={styles.canvasWrapper}>
          <WorkflowCanvas
            isPlaying={isPlaying}
            selectedId={selectedNode?.id}
            onSelect={setSelectedNode}
          />
        </div>

        <AnimatePresence>
          {selectedNode && (
            <NodeDetailPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </AnimatePresence>

        <div style={styles.footer}>
          <h3>Data Processing Architecture</h3>
          <p>Our pipeline uses Google Sheets for storage, Groq AI for sentiment analysis, and N8N for logical orchestration. Every engagement score is calculated through a multi-stage validation process.</p>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', padding: '100px 40px 60px', overflowX: 'auto' },
  content: { maxWidth: 1600, margin: '0 auto' },
  header: { marginBottom: 40, textAlign: 'center' },
  titleWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 },
  subtitle: { color: '#7A7D8B', fontWeight: 600, fontSize: '1.1rem' },
  actions: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 24 },
  playBtn: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
    border: 'none', borderRadius: 14, color: 'white', fontWeight: 800,
    fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255,107,53,0.3)',
    transition: 'all 0.2s',
  },
  tip: { display: 'flex', alignItems: 'center', gap: 8, color: '#FF6B35', fontWeight: 700, fontSize: '0.9rem' },
  canvasWrapper: {
    background: 'rgba(255,255,255,0.4)', borderRadius: 32, padding: '40px 20px',
    border: '1px solid rgba(255,255,255,0.5)', overflowX: 'auto', marginBottom: 40,
    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)',
  },
  footer: { maxWidth: 800, margin: '0 auto', textAlign: 'center', color: '#7A7D8B' },
};
