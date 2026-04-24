import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKFLOW_NODES, WORKFLOW_CONNECTIONS, CATEGORY_COLORS, CATEGORY_LABELS } from './WorkflowData';

// ─── Layout: grid positions as percentages of the container ───
// Using percentage-based positioning so the layout scales with the container
const NODE_POSITIONS = {
  // Pipeline A — Student Engagement Scoring
  'execute-workflow':      { col: 0,  row: 1.5 },
  'student-data':          { col: 1,  row: 0 },
  'sentiment-conversion1': { col: 2,  row: 0 },
  'convert-sentiment':     { col: 3,  row: 0 },
  'teacher-feedback':      { col: 1,  row: 2.2 },
  'combine-conversion':    { col: 3,  row: 1.5 },
  'code-js1':              { col: 4,  row: 1.5 },
  'append-row':            { col: 5,  row: 1.5 },
  'engagement-score':      { col: 6,  row: 1.5 },
  'engagement-data':       { col: 6,  row: 0 },
  'code-js2':              { col: 7,  row: 0 },

  // Pipeline B — Teacher Transcript Analysis
  'teacher-notes':         { col: 1,  row: 4.5 },
  'teacher-transcript':    { col: 1,  row: 6 },
  'chunk-notes':           { col: 2,  row: 4.5 },
  'chunk-transcript':      { col: 2,  row: 6 },
  'merge':                 { col: 3,  row: 5.2 },
  'basic-llm':             { col: 4,  row: 4.5 },
  'groq-chat-model-1':     { col: 4,  row: 6.2 },
  'code-js-b':             { col: 5,  row: 5.2 },
  'code-js3':              { col: 6,  row: 5.2 },
  'basic-llm1':            { col: 7,  row: 4.5 },
  'groq-chat-model-2':     { col: 7,  row: 6.2 },

  // Pipeline C — Report Generation
  'message-model':         { col: 8,  row: 0 },
  'merge1':                { col: 8,  row: 3 },
  'message-model1':        { col: 9,  row: 3 },
  'update-doc':            { col: 9,  row: 1.5 },
  'gemini-model':          { col: 10, row: 1.5 },
};

const GRID = {
  colWidth: 200,  // px per column
  rowHeight: 90,  // px per row
  padX: 30,
  padY: 80,
  nodeW: 175,
  nodeH: 68,
};

function getPixelPos(nodeId) {
  const p = NODE_POSITIONS[nodeId];
  if (!p) return null;
  return {
    x: GRID.padX + p.col * GRID.colWidth,
    y: GRID.padY + p.row * GRID.rowHeight,
  };
}

const CANVAS_W = GRID.padX * 2 + 11 * GRID.colWidth;
const CANVAS_H = GRID.padY * 2 + 7.2 * GRID.rowHeight;

/* ── Helper: get color for a node type ── */
function getColor(type) {
  return CATEGORY_COLORS[type] || '#7A7D8B';
}

/* ── SVG Connection Line with animated dot ── */
function ConnectionLine({ fromId, toId, isPlaying, idx }) {
  const from = getPixelPos(fromId);
  const to = getPixelPos(toId);
  if (!from || !to) return null;

  const x1 = from.x + GRID.nodeW;
  const y1 = from.y + GRID.nodeH / 2;
  const x2 = to.x;
  const y2 = to.y + GRID.nodeH / 2;

  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const cp1x = x1 + Math.min(dx * 0.4, 80);
  const cp2x = x2 - Math.min(dx * 0.4, 80);

  const pathD = `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;

  // Deterministic but varied animation params
  const duration = 1.8 + (idx % 5) * 0.4;
  const delay = (idx % 7) * 0.35;

  return (
    <g>
      <path d={pathD} fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" strokeDasharray="5,4" />
      {isPlaying && (
        <circle r="3.5" fill="#7C3AED" filter="url(#glow)">
          <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
            <mpath href={`#conn-${idx}`} />
          </animateMotion>
        </circle>
      )}
      <path id={`conn-${idx}`} d={pathD} fill="none" stroke="none" />
    </g>
  );
}

/* ── Node Detail Modal ── */
function NodeDetailModal({ node, onClose }) {
  if (!node) return null;
  const color = getColor(node.type);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          borderRadius: 24, padding: '32px 36px', maxWidth: 520, width: '100%',
          boxShadow: '0 25px 80px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.6)',
          maxHeight: '82vh', overflowY: 'auto', position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, width: 32, height: 32,
            borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.05)',
            cursor: 'pointer', fontSize: '1rem', color: '#94A3B8', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        <span style={{
          display: 'inline-block', padding: '5px 14px', borderRadius: 20,
          background: `${color}18`, color, fontSize: '0.68rem', fontWeight: 800,
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
          fontFamily: "'Nunito',sans-serif",
        }}>
          {CATEGORY_LABELS[node.type]}
        </span>

        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1E293B', marginBottom: 4, fontFamily: "'Baloo 2',cursive" }}>
          {node.name}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: 22, fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>
          {node.subtitle}
        </p>

        <div style={{ marginBottom: 18 }}>
          <h4 style={mst}>🔍 What It Does</h4>
          <p style={msb}>{node.what}</p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <h4 style={mst}>💡 Why It Matters</h4>
          <p style={msb}>{node.why}</p>
        </div>

        {node.formula && (
          <div style={{ marginBottom: 18, padding: '10px 14px', background: `${color}08`, borderRadius: 12, border: `1px solid ${color}20` }}>
            <h4 style={{ ...mst, color }}>📐 Formula</h4>
            <p style={{ ...msb, fontFamily: "'Courier New', monospace", fontWeight: 700, color: '#1E293B' }}>{node.formula}</p>
          </div>
        )}

        {node.aiModel && (
          <div style={{ marginBottom: 18, padding: '10px 14px', background: 'rgba(249,115,22,0.06)', borderRadius: 12, border: '1px solid rgba(249,115,22,0.15)' }}>
            <h4 style={{ ...mst, color: '#F97316' }}>🤖 AI Model</h4>
            <p style={{ ...msb, fontWeight: 700, color: '#1E293B' }}>{node.aiModel}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(16,185,129,0.06)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.15)' }}>
            <h4 style={{ fontSize: '0.6rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5, fontFamily: "'Nunito',sans-serif" }}>Data In</h4>
            <p style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.45, fontWeight: 600, fontFamily: "'Nunito',sans-serif" }}>{node.dataIn}</p>
          </div>
          <div style={{ flex: 1, padding: '10px 12px', background: 'rgba(99,102,241,0.06)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.15)' }}>
            <h4 style={{ fontSize: '0.6rem', fontWeight: 800, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5, fontFamily: "'Nunito',sans-serif" }}>Data Out</h4>
            <p style={{ fontSize: '0.76rem', color: '#334155', lineHeight: 1.45, fontWeight: 600, fontFamily: "'Nunito',sans-serif" }}>{node.dataOut}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const mst = { fontSize: '0.72rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 7, fontFamily: "'Nunito',sans-serif" };
const msb = { fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, fontWeight: 500, fontFamily: "'Nunito',sans-serif" };

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function N8nPipelineSection() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="workflow" style={{
      padding: '100px 24px 80px',
      background: 'linear-gradient(180deg, rgba(248,250,254,0.8) 0%, rgba(237,231,254,0.3) 50%, rgba(248,250,254,0.8) 100%)',
      backdropFilter: 'blur(6px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blurs */}
      <div style={{ position: 'absolute', top: 60, left: '5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(124,58,237,0.04)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: 80, right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,0.04)', filter: 'blur(60px)' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span style={{
            display: 'inline-block', padding: '8px 22px', borderRadius: 30,
            background: 'rgba(124,58,237,0.1)', color: '#7C3AED',
            fontSize: '0.95rem', fontWeight: 800, marginBottom: 20, fontFamily: "'Nunito',sans-serif",
          }}>🔄 n8n Automation</span>
          <h2 style={{
            fontFamily: "'Baloo 2',cursive", fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 800, color: '#1E293B', lineHeight: 1.15, marginBottom: 16,
          }}>
            How Our <span style={{ color: '#7C3AED' }}>n8n Pipeline</span> Works
          </h2>
          <p style={{
            fontSize: '1.1rem', color: '#64748B', maxWidth: 700, margin: '0 auto',
            lineHeight: 1.7, fontFamily: "'Nunito',sans-serif",
          }}>
            27 nodes across 3 parallel pipelines — orchestrating student data, teacher analysis, and AI-powered report generation in a fully automated workflow.
          </p>
        </motion.div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px',
              border: 'none', borderRadius: 14, fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: "'Nunito',sans-serif",
              background: isPlaying ? 'linear-gradient(135deg,#EC4899,#F43F5E)' : 'linear-gradient(135deg,#7C3AED,#6366F1)',
              color: 'white', boxShadow: '0 6px 20px rgba(124,58,237,0.25)',
            }}
          >
            {isPlaying ? '⏹ Stop Flow' : '▶ Watch Data Flow'}
          </motion.button>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
            background: 'rgba(255,255,255,0.7)', borderRadius: 14, fontSize: '0.85rem',
            color: '#64748B', fontWeight: 600, fontFamily: "'Nunito',sans-serif",
            border: '1px solid rgba(200,210,220,0.5)',
          }}>
            💡 Click any node for details
          </div>
        </div>

        {/* Canvas Container — scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)',
            borderRadius: 28, border: '1px solid rgba(200,210,220,0.4)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.06), inset 0 0 30px rgba(255,255,255,0.5)',
            overflowX: 'auto', overflowY: 'hidden', padding: 16,
          }}
        >
          {/* Relative container for nodes + SVG */}
          <div style={{ position: 'relative', width: CANVAS_W, height: CANVAS_H, minWidth: CANVAS_W }}>

            {/* SVG layer for connections (behind nodes) */}
            <svg width={CANVAS_W} height={CANVAS_H} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pipeline separator */}
              <line x1="20" y1={GRID.padY + 3.4 * GRID.rowHeight} x2={CANVAS_W - 20} y2={GRID.padY + 3.4 * GRID.rowHeight}
                stroke="rgba(148,163,184,0.15)" strokeWidth="1" strokeDasharray="8,6" />

              {WORKFLOW_CONNECTIONS.map(([fromId, toId], i) => (
                <ConnectionLine key={i} fromId={fromId} toId={toId} isPlaying={isPlaying} idx={i} />
              ))}
            </svg>

            {/* Pipeline Labels (HTML) */}
            <PipelineLabel col={0} row={-0.6} label="Pipeline A — Student Engagement Scoring" color="#7C3AED" />
            <PipelineLabel col={0} row={3.7} label="Pipeline B — Teacher Transcript Analysis" color="#F97316" />
            <PipelineLabel col={7.8} row={2.4} label="Pipeline C — Report Generation" color="#6366F1" />

            {/* Node cards (HTML, fully clickable) */}
            {WORKFLOW_NODES.map((node) => {
              const pos = getPixelPos(node.id);
              if (!pos) return null;
              const color = getColor(node.type);
              const isActive = selectedNode?.id === node.id || hoveredNode?.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    width: GRID.nodeW,
                    height: GRID.nodeH,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.94)',
                    backdropFilter: 'blur(8px)',
                    border: `2px solid ${isActive ? color : 'rgba(200,210,220,0.5)'}`,
                    boxShadow: isActive
                      ? `0 0 18px ${color}35, 0 6px 20px rgba(0,0,0,0.08)`
                      : '0 3px 14px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    zIndex: isActive ? 10 : 2,
                  }}
                >
                  {/* Color header */}
                  <div style={{ height: 21, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.08em', fontFamily: "'Nunito',sans-serif", textTransform: 'uppercase' }}>
                      {CATEGORY_LABELS[node.type] || node.type}
                    </span>
                  </div>
                  {/* Body */}
                  <div style={{ padding: '5px 8px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.15, fontFamily: "'Nunito',sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {node.name}
                    </div>
                    <div style={{ fontSize: '0.5rem', color: '#94A3B8', fontWeight: 600, marginTop: 1, lineHeight: 1.15, fontFamily: "'Nunito',sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {node.subtitle}
                    </div>
                  </div>
                  {/* Ports */}
                  <div style={{ position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'white', border: `2px solid ${color}`, zIndex: 3 }} />
                  <div style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'white', border: `2px solid ${color}`, zIndex: 3 }} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredNode && !selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(30,41,59,0.92)', backdropFilter: 'blur(12px)',
                color: 'white', padding: '10px 22px', borderRadius: 14,
                fontSize: '0.85rem', fontWeight: 700, fontFamily: "'Nunito',sans-serif",
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)', zIndex: 999,
                display: 'flex', alignItems: 'center', gap: 10, maxWidth: '90vw',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: getColor(hoveredNode.type), flexShrink: 0 }} />
              <span style={{ fontWeight: 800 }}>{hoveredNode.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>—</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{hoveredNode.subtitle}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 48, flexWrap: 'wrap' }}
        >
          {[
            { val: '27 Nodes', label: 'In the pipeline', icon: '🔗', color: '#7C3AED' },
            { val: '3 AI Models', label: 'Groq + Gemini', icon: '🤖', color: '#F97316' },
            { val: '3 Pipelines', label: 'Running in parallel', icon: '⚡', color: '#3B82F6' },
            { val: 'Zero', label: 'Manual intervention', icon: '🎯', color: '#059669' },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} style={{ textAlign: 'center', cursor: 'default' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Baloo 2',cursive", fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600, fontFamily: "'Nunito',sans-serif" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <NodeDetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Pipeline Label (HTML-based) ── */
function PipelineLabel({ col, row, label, color }) {
  const x = GRID.padX + col * GRID.colWidth;
  const y = GRID.padY + row * GRID.rowHeight;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px',
      background: `${color}10`, borderRadius: 20, border: `1px solid ${color}25`,
      zIndex: 5,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
      <span style={{ fontSize: '0.72rem', fontWeight: 800, color, fontFamily: "'Nunito',sans-serif", letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}
