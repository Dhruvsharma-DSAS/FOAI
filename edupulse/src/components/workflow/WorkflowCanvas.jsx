import React from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_NODES, WORKFLOW_CONNECTIONS, CATEGORY_COLORS, CATEGORY_LABELS } from './WorkflowData';

// Layout positions for the dedicated workflow page (larger canvas)
const NODE_POSITIONS = {
  'execute-workflow':      { x: 50,   y: 280 },
  'student-data':          { x: 280,  y: 120 },
  'sentiment-conversion1': { x: 520,  y: 120 },
  'convert-sentiment':     { x: 760,  y: 120 },
  'teacher-feedback':      { x: 280,  y: 380 },
  'combine-conversion':    { x: 760,  y: 320 },
  'code-js1':              { x: 1000, y: 320 },
  'append-row':            { x: 1240, y: 320 },
  'engagement-score':      { x: 1480, y: 320 },
  'engagement-data':       { x: 1480, y: 120 },
  'code-js2':              { x: 1720, y: 120 },
  'teacher-notes':         { x: 280,  y: 680 },
  'teacher-transcript':    { x: 280,  y: 880 },
  'chunk-notes':           { x: 520,  y: 680 },
  'chunk-transcript':      { x: 520,  y: 880 },
  'merge':                 { x: 760,  y: 760 },
  'basic-llm':             { x: 1000, y: 760 },
  'code-js-b':             { x: 1240, y: 760 },
  'code-js3':              { x: 1480, y: 760 },
  'basic-llm1':            { x: 1720, y: 760 },
  'message-model':         { x: 1960, y: 120 },
  'merge1':                { x: 1960, y: 460 },
  'message-model1':        { x: 2160, y: 460 },
  'update-doc':            { x: 2160, y: 260 },
};

const NODE_W = 180;
const NODE_H = 68;

function getColor(type) {
  return CATEGORY_COLORS[type] || '#7A7D8B';
}

export default function WorkflowCanvas({ onSelect, selectedId, isPlaying }) {
  return (
    <div style={styles.container}>
      <svg style={styles.svg} viewBox="0 0 2400 1020">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C3CFE2" />
          </marker>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pipeline labels */}
        <text x="60" y="70" fill="#7C3AED" fontSize="14" fontWeight="800" fontFamily="Nunito">Pipeline A — Student Engagement Scoring</text>
        <text x="60" y="640" fill="#F97316" fontSize="14" fontWeight="800" fontFamily="Nunito">Pipeline B — Teacher Transcript Analysis</text>
        <text x="1960" y="420" fill="#6366F1" fontSize="14" fontWeight="800" fontFamily="Nunito">Pipeline C — Report Generation</text>

        {/* Separator */}
        <line x1="30" y1="580" x2="2370" y2="580" stroke="rgba(148,163,184,0.2)" strokeWidth="1" strokeDasharray="8,6" />

        {WORKFLOW_CONNECTIONS.map(([fromId, toId], i) => {
          const from = NODE_POSITIONS[fromId];
          const to = NODE_POSITIONS[toId];
          if (!from || !to) return null;
          return <Connection key={i} from={from} to={to} isPlaying={isPlaying} />;
        })}

        {WORKFLOW_NODES.map((node, i) => {
          const pos = NODE_POSITIONS[node.id];
          if (!pos) return null;
          return (
            <Node
              key={node.id}
              node={node}
              pos={pos}
              isSelected={selectedId === node.id}
              onClick={() => onSelect(node)}
              delay={i * 0.03}
            />
          );
        })}
      </svg>
    </div>
  );
}

function Node({ node, pos, isSelected, onClick, delay }) {
  const color = getColor(node.type);
  return (
    <foreignObject x={pos.x} y={pos.y} width={NODE_W} height={NODE_H} style={{ overflow: 'visible' }}>
      <motion.div
        xmlns="http://www.w3.org/1999/xhtml"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        style={{
          width: NODE_W, height: NODE_H, borderRadius: 14,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          border: `2px solid ${isSelected ? color : 'rgba(200,210,220,0.5)'}`,
          boxShadow: isSelected ? `0 0 20px ${color}40` : '0 4px 16px rgba(0,0,0,0.06)',
          cursor: 'pointer', overflow: 'hidden', position: 'relative',
        }}
      >
        <div style={{ height: 20, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {CATEGORY_LABELS[node.type]}
          </span>
        </div>
        <div style={{ padding: '5px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</div>
          <div style={{ fontSize: '0.48rem', color: '#94A3B8', fontWeight: 600, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.subtitle}</div>
        </div>
        {/* Ports */}
        <div style={{ position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: 'white', border: `2px solid ${color}` }} />
        <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: 'white', border: `2px solid ${color}` }} />
      </motion.div>
    </foreignObject>
  );
}

function Connection({ from, to, isPlaying }) {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;

  const dx = Math.abs(x2 - x1);
  const cp1x = x1 + dx * 0.4;
  const cp2x = x2 - dx * 0.4;
  const path = `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;

  return (
    <g>
      <path d={path} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
      {isPlaying && (
        <motion.circle
          r="4" fill="#7C3AED" filter="url(#glow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: 'linear', delay: Math.random() * 2 }}
          style={{ offsetPath: `path("${path}")` }}
        />
      )}
    </g>
  );
}

const styles = {
  container: { position: 'relative', width: '100%', minHeight: 500, margin: '20px auto', overflowX: 'auto' },
  svg: { width: '100%', minWidth: 1200, height: 'auto', display: 'block' },
};
