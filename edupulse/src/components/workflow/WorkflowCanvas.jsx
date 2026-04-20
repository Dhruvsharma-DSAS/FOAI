import React from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_NODES, WORKFLOW_CONNECTIONS } from './WorkflowData';

export default function WorkflowCanvas({ onSelect, selectedId, isPlaying }) {
  return (
    <div style={styles.container}>
      <svg style={styles.svg}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C3CFE2" />
          </marker>
        </defs>
        {WORKFLOW_CONNECTIONS.map(([fromId, toId], i) => {
          const from = WORKFLOW_NODES.find(n => n.id === fromId);
          const to = WORKFLOW_NODES.find(n => n.id === toId);
          return <Connection key={i} from={from} to={to} isPlaying={isPlaying} />;
        })}
      </svg>

      {WORKFLOW_NODES.map((node, i) => (
        <Node
          key={node.id}
          node={node}
          isSelected={selectedId === node.id}
          onClick={() => onSelect(node)}
          delay={i * 0.05}
        />
      ))}
    </div>
  );
}

function Node({ node, isSelected, onClick, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        ...styles.node,
        left: node.x, top: node.y,
        borderColor: isSelected ? getBg(node.type) : 'rgba(255,255,255,0.5)',
        boxShadow: isSelected ? `0 0 25px ${getBg(node.type)}40` : '0 8px 25px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ ...styles.nodeIcon, background: getBg(node.type) }}>{node.icon}</div>
      <div style={styles.nodeName}>{node.name}</div>
      {isSelected && (
        <motion.div
          layoutId="pulse"
          style={{ ...styles.pulse, background: getBg(node.type) }}
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

function Connection({ from, to, isPlaying }) {
  const x1 = from.x + 80; const y1 = from.y + 40;
  const x2 = to.x; const y2 = to.y + 40;
  
  const path = `M ${x1} ${y1} C ${x1 + 60} ${y1}, ${x2 - 60} ${y2}, ${x2} ${y2}`;

  return (
    <g>
      <path d={path} fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrow)" />
      {isPlaying && (
        <motion.circle
          r="4" fill="#FF6B35"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path("${path}")` }}
        />
      )}
    </g>
  );
}

function getBg(type) {
  switch(type) {
    case 'trigger': return '#FF6B35';
    case 'data': return '#3B82F6';
    case 'ai': return '#9333EA';
    case 'code': return '#2EC4B6';
    case 'output': return '#E71D73';
    default: return '#7A7D8B';
  }
}

const styles = {
  container: { position: 'relative', width: 1600, height: 600, margin: '40px auto' },
  svg: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
  node: {
    position: 'absolute', width: 180, padding: '12px', background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(10px)', borderRadius: 16, border: '2px solid transparent',
    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', zIndex: 2,
  },
  nodeIcon: {
    width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '1.2rem', color: 'white', flexShrink: 0,
  },
  nodeName: { fontSize: '0.85rem', fontWeight: 700, color: '#2D3142', lineHeight: 1.2 },
  pulse: { position: 'absolute', inset: -4, borderRadius: 20, zIndex: -1 },
};
