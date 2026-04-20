import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* A flat, cartoon-style animated classroom illustration (SVG)
   — teacher at desk, students, chalkboard, clock, books, plant */

export default function ClassroomScene({ width = 600 }) {
  const [tick, setTick] = useState(0);
  const [boardText, setBoardText] = useState(0);
  const texts = ['E = mc²', 'a² + b² = c²', 'F = ma', '∫ f(x) dx', 'Hello World!'];

  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setBoardText(t => (t + 1) % texts.length), 3000);
    return () => clearInterval(i);
  }, []);

  const h = width * 0.7;

  return (
    <svg viewBox="0 0 600 420" width={width} height={h} style={{ borderRadius: 24, overflow: 'visible' }}>
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8F4FD" />
          <stop offset="100%" stopColor="#D0E8F7" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E6D0" />
          <stop offset="100%" stopColor="#E8D5B7" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect x="0" y="0" width="600" height="280" fill="url(#wallGrad)" rx="16" />
      {/* Floor */}
      <rect x="0" y="280" width="600" height="140" fill="url(#floorGrad)" rx="0" />
      {/* Floor line */}
      <line x1="0" y1="280" x2="600" y2="280" stroke="#C9B896" strokeWidth="2" />

      {/* ---- Windows ---- */}
      {[60, 220, 440].map((x, i) => (
        <g key={i}>
          <rect x={x} y="30" width="80" height="100" rx="6" fill="#87CEEB" stroke="#B8860B" strokeWidth="3" />
          <line x1={x + 40} y1="30" x2={x + 40} y2="130" stroke="#B8860B" strokeWidth="2" />
          <line x1={x} y1="80" x2={x + 80} y2="80" stroke="#B8860B" strokeWidth="2" />
          {/* Curtain */}
          <motion.path
            d={`M${x - 2},28 Q${x + 15},${45 + Math.sin(tick * 0.05 + i) * 3} ${x + 3},80 L${x - 2},80Z`}
            fill="rgba(108,92,231,0.15)" stroke="none"
          />
          {/* Cloud outside */}
          <motion.ellipse cx={x + 30 + (tick * 0.3 + i * 20) % 70} cy={50} rx="12" ry="7" fill="white" opacity="0.6" />
        </g>
      ))}

      {/* ---- Chalkboard ---- */}
      <rect x="140" y="150" width="220" height="120" rx="6" fill="#2D5F3C" stroke="#8B6F47" strokeWidth="5" />
      <rect x="148" y="158" width="204" height="104" rx="3" fill="#2F6B42" />
      {/* Board text */}
      <motion.text
        key={boardText}
        x="250" y="218"
        textAnchor="middle" fontSize="28" fill="#F0E6C0"
        fontFamily="'Space Mono', monospace" fontWeight="700"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        {texts[boardText]}
      </motion.text>
      {/* Chalk tray */}
      <rect x="145" y="270" width="210" height="8" rx="2" fill="#8B6F47" />
      <rect x="180" y="268" width="30" height="4" rx="2" fill="white" />
      <rect x="220" y="268" width="20" height="4" rx="2" fill="#FDCB6E" />

      {/* ---- Clock ---- */}
      <circle cx="420" cy="170" r="22" fill="white" stroke="#636E72" strokeWidth="2" />
      <circle cx="420" cy="170" r="2" fill="#2D3436" />
      <motion.line x1="420" y1="170" x2="420" y2="155" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: '420px 170px' }}
        animate={{ rotate: tick * 0.5 }} />
      <motion.line x1="420" y1="170" x2="432" y2="170" stroke="#E17055" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: '420px 170px' }}
        animate={{ rotate: tick * 6 }} />

      {/* ---- Teacher ---- */}
      <g>
        {/* Desk */}
        <rect x="370" y="305" width="120" height="10" rx="3" fill="#8B6F47" />
        <rect x="380" y="315" width="8" height="50" fill="#7A5F3A" />
        <rect x="472" y="315" width="8" height="50" fill="#7A5F3A" />

        {/* Books on desk */}
        <rect x="385" y="293" width="25" height="12" rx="2" fill="#E17055" />
        <rect x="387" y="285" width="25" height="12" rx="2" fill="#0984E3" />
        <rect x="389" y="277" width="25" height="12" rx="2" fill="#00B894" />

        {/* Laptop */}
        <rect x="430" y="288" width="40" height="17" rx="3" fill="#DFE6E9" />
        <rect x="433" y="291" width="34" height="11" rx="1" fill="#74B9FF" />
        <rect x="425" y="305" width="50" height="3" rx="1" fill="#B2BEC3" />

        {/* Plant */}
        <rect x="488" y="290" width="12" height="15" rx="3" fill="#E17055" />
        <motion.ellipse cx="494" cy="285" rx="10" ry="8" fill="#00B894"
          animate={{ scaleY: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <line x1="494" y1="285" x2="494" y2="278" stroke="#00B894" strokeWidth="2" />
        <circle cx="494" cy="275" r="4" fill="#55EFC4" />

        {/* Teacher body */}
        <motion.g animate={{ x: [0, 3, 0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          {/* Body / dress */}
          <path d="M430,270 Q430,310 415,340 L455,340 Q440,310 440,270Z" fill="#FF6B35" />
          {/* Arms */}
          <motion.line x1="425" y1="285" x2="410" y2="310" stroke="#F5D0A9" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [410, 405, 410] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="445" y1="285" x2="460" y2="300" stroke="#F5D0A9" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [460, 465, 460] }} transition={{ duration: 2.5, repeat: Infinity }} />
          {/* Head */}
          <circle cx="435" cy="255" r="20" fill="#F5D0A9" />
          {/* Hair */}
          <path d="M415,250 Q420,230 435,228 Q450,230 455,250 Q458,240 455,235 Q445,220 425,220 Q412,225 415,250Z" fill="#8B4513" />
          <ellipse cx="420" cy="252" rx="7" ry="5" fill="#8B4513" />
          {/* Eyes */}
          <motion.ellipse cx="428" cy="254" rx="3" ry={tick % 25 === 0 ? 0.5 : 3} fill="#2D3436" />
          <motion.ellipse cx="442" cy="254" rx="3" ry={tick % 25 === 0 ? 0.5 : 3} fill="#2D3436" />
          <circle cx="429" cy="253" r="1" fill="white" />
          <circle cx="443" cy="253" r="1" fill="white" />
          {/* Glasses */}
          <rect x="423" y="249" width="12" height="10" rx="5" fill="none" stroke="#636E72" strokeWidth="1.5" />
          <rect x="437" y="249" width="12" height="10" rx="5" fill="none" stroke="#636E72" strokeWidth="1.5" />
          <line x1="435" y1="254" x2="437" y2="254" stroke="#636E72" strokeWidth="1" />
          {/* Smile */}
          <path d="M430,261 Q435,266 440,261" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </g>

      {/* ---- Students ---- */}
      {/* Student 1 — eager, hand up */}
      <g>
        <rect x="40" y="330" width="70" height="8" rx="3" fill="#8B6F47" />
        <rect x="48" y="338" width="6" height="35" fill="#7A5F3A" />
        <rect x="96" y="338" width="6" height="35" fill="#7A5F3A" />
        <rect x="50" y="320" width="20" height="10" rx="2" fill="#74B9FF" opacity="0.7" />
        <circle cx="75" cy="298" r="16" fill="#FFEAA7" />
        <path d="M60,310 Q60,340 55,360 L95,360 Q90,340 90,310Z" fill="#6C5CE7" />
        <ellipse cx="68" cy="296" rx="3" ry={tick % 30 === 0 ? 0.5 : 3} fill="#2D3436" />
        <ellipse cx="82" cy="296" rx="3" ry={tick % 30 === 0 ? 0.5 : 3} fill="#2D3436" />
        <circle cx="69" cy="295" r="1" fill="white" />
        <circle cx="83" cy="295" r="1" fill="white" />
        <path d="M72,304 Q75,308 78,304" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        {/* Raised hand */}
        <motion.line x1="90" y1="310" x2="100" y2="270" stroke="#FFEAA7" strokeWidth="6" strokeLinecap="round"
          animate={{ x2: [100, 105, 100], y2: [270, 265, 270] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.circle cx="100" cy="268" r="4" fill="#FFEAA7" animate={{ cy: [268, 263, 268] }} transition={{ duration: 1.5, repeat: Infinity }} />
        {/* Hair */}
        <path d="M59,290 Q65,275 75,272 Q85,275 91,290" fill="#2D3436" />
      </g>

      {/* Student 2 — attentive, writing */}
      <g>
        <rect x="140" y="340" width="70" height="8" rx="3" fill="#8B6F47" />
        <rect x="148" y="348" width="6" height="30" fill="#7A5F3A" />
        <rect x="196" y="348" width="6" height="30" fill="#7A5F3A" />
        <rect x="150" y="330" width="22" height="10" rx="2" fill="white" opacity="0.8" />
        <circle cx="175" cy="308" r="16" fill="#DFE0A9" />
        <path d="M160,320 Q160,350 155,370 L195,370 Q190,350 190,320Z" fill="#00CED1" />
        <ellipse cx="168" cy="306" rx="3" ry={tick % 22 === 0 ? 0.5 : 3} fill="#2D3436" />
        <ellipse cx="182" cy="306" rx="3" ry={tick % 22 === 0 ? 0.5 : 3} fill="#2D3436" />
        <circle cx="169" cy="305" r="1" fill="white" />
        <circle cx="183" cy="305" r="1" fill="white" />
        <path d="M172,313 Q175,316 178,313" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
        {/* Writing arm */}
        <motion.line x1="162" y1="325" x2="158" y2="338" stroke="#DFE0A9" strokeWidth="5" strokeLinecap="round"
          animate={{ x2: [158, 165, 158] }} transition={{ duration: 1, repeat: Infinity }} />
        {/* Hair — pigtails */}
        <path d="M159,300 Q165,285 175,282 Q185,285 191,300" fill="#5D4037" />
        <circle cx="160" cy="298" r="5" fill="#5D4037" />
        <circle cx="190" cy="298" r="5" fill="#5D4037" />
      </g>

      {/* Student 3 — sleepy 😴 */}
      <g>
        <rect x="240" y="345" width="70" height="8" rx="3" fill="#8B6F47" />
        <rect x="248" y="353" width="6" height="28" fill="#7A5F3A" />
        <rect x="296" y="353" width="6" height="28" fill="#7A5F3A" />
        {/* Head resting on desk */}
        <motion.g animate={{ rotate: [0, 2, 0, -1, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ transformOrigin: '275px 335px' }}>
          <circle cx="275" cy="330" r="16" fill="#C8A88A" />
          {/* Closed eyes */}
          <path d="M266,328 Q270,332 274,328" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M278,328 Q282,332 286,328" fill="none" stroke="#2D3436" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hair */}
          <path d="M259,322 Q265,310 275,307 Q285,310 291,322" fill="#1A1A2E" />
          <circle cx="262" cy="325" r="3" fill="#1A1A2E" />
          <circle cx="288" cy="323" r="4" fill="#1A1A2E" />
        </motion.g>
        <path d="M260,340 Q260,365 255,380 L295,380 Q290,365 290,340Z" fill="#E17055" />
        {/* Z Z Z */}
        <motion.text x="292" y="318" fontSize="12" fill="#636E72" fontWeight="800"
          animate={{ y: [318, 308], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }}>Z</motion.text>
        <motion.text x="300" y="308" fontSize="10" fill="#636E72" fontWeight="800"
          animate={{ y: [308, 298], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>z</motion.text>
        <motion.text x="306" y="300" fontSize="8" fill="#636E72" fontWeight="800"
          animate={{ y: [300, 290], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>z</motion.text>
      </g>

      {/* ---- Decorations ---- */}
      {/* Stars / stickers on wall */}
      <motion.text x="390" y="200" fontSize="18" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>⭐</motion.text>
      <motion.text x="560" y="160" fontSize="16" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}>🌟</motion.text>
      <motion.text x="30" y="180" fontSize="14" animate={{ y: [180, 175, 180] }} transition={{ duration: 2, repeat: Infinity }}>📐</motion.text>
      <motion.text x="550" y="250" fontSize="14" animate={{ y: [250, 244, 250] }} transition={{ duration: 2.5, repeat: Infinity }}>🎨</motion.text>

      {/* ABC poster */}
      <rect x="390" y="155" width="40" height="30" rx="3" fill="#FFEAA7" stroke="#FDCB6E" strokeWidth="1" />
      <text x="400" y="175" fontSize="12" fill="#E17055" fontWeight="800">ABC</text>

      {/* 123 poster */}
      <rect x="470" y="155" width="40" height="30" rx="3" fill="#DFE6E9" stroke="#B2BEC3" strokeWidth="1" />
      <text x="478" y="175" fontSize="12" fill="#6C5CE7" fontWeight="800">123</text>
    </svg>
  );
}
