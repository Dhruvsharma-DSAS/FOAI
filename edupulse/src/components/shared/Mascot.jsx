import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const MESSAGES = [
  "You're doing amazing! Keep it up! 🌟",
  "Every expert was once a beginner! 📚",
  "Learning is a superpower! 💪",
  "Stay curious, stay awesome! 🚀",
  "You've got this! I believe in you! ❤️",
  "Practice makes progress! ✨",
  "Small steps lead to big achievements! 🏆",
  "Your brain is growing right now! 🧠",
  "Mistakes are proof you're trying! 💯",
  "Be proud of how far you've come! 🎉",
  "Knowledge is your greatest treasure! 💎",
  "Dream big, work hard, stay focused! 🔥",
  "Today's effort is tomorrow's success! 🌈",
  "Champions never stop learning! 🥇",
  "Your potential is limitless! ♾️",
  "Education opens every door! 🚪",
  "You are braver than you believe! 🦁",
  "Great things take time — be patient! ⏳",
  "Believe in yourself and all that you are! 💜",
  "The best investment is in yourself! 📈",
  "Be the energy you want to attract! ⚡",
  "Difficult roads lead to beautiful destinations! 🏔️",
  "Success is not final, failure is not fatal! 🎯",
  "One day or day one — you decide! 🗓️",
  "Stars can't shine without darkness! ⭐",
];

export default function Mascot({ size = 120, forceSpeech = false }) {
  const [showSpeech, setShowSpeech] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isDozing, setIsDozing] = useState(false);
  const lastIndex = useRef(0);

  // Spring-based eye tracking (from Book project pattern)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  // Dozing cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showSpeech && !forceSpeech) setIsDozing(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, [showSpeech, forceSpeech]);

  // Force speech mode (for CharacterCrew panel)
  useEffect(() => {
    if (forceSpeech) {
      setShowSpeech(true);
      setIsDozing(false);
      const interval = setInterval(() => {
        let next;
        do { next = Math.floor(Math.random() * MESSAGES.length); } while (next === lastIndex.current);
        lastIndex.current = next;
        setMsgIndex(next);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [forceSpeech]);

  const handleHover = () => {
    if (!forceSpeech) {
      setIsDozing(false);
      let next;
      do { next = Math.floor(Math.random() * MESSAGES.length); } while (next === lastIndex.current);
      lastIndex.current = next;
      setMsgIndex(next);
      setShowSpeech(true);
    }
  };

  const s = size;
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={() => !forceSpeech && setShowSpeech(false)}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
    >
      {/* Speech Bubble — directly above head */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              marginBottom: 10, background: 'white', borderRadius: 20, padding: '14px 22px',
              boxShadow: '0 8px 32px rgba(108,92,231,0.15), 0 0 0 2px rgba(108,92,231,0.08)',
              minWidth: 220, maxWidth: 300, zIndex: 50, textAlign: 'center',
              borderBottom: '3px solid rgba(108,92,231,0.15)', position: 'relative',
            }}
          >
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6C5CE7', lineHeight: 1.5, fontStyle: 'italic', fontFamily: "'Nunito', sans-serif" }}
            >
              "{MESSAGES[msgIndex]}"
            </motion.p>
            {/* Arrow pointing down */}
            <div style={{
              position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%) rotate(45deg)',
              width: 14, height: 14, background: 'white',
              borderRight: '2px solid rgba(108,92,231,0.1)',
              borderBottom: '2px solid rgba(108,92,231,0.1)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Character */}
      <motion.svg
        width={s} height={s * 1.1} viewBox="0 0 200 220"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: [0, -5, 0],
          rotate: isDozing ? [0, 3, 0] : 0,
          opacity: 1,
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ filter: 'drop-shadow(0 8px 20px rgba(108,92,231,0.2))' }}
      >
        <motion.g animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 3.5, repeat: Infinity }}>
          {/* Shadow */}
          <ellipse cx="100" cy="210" rx="45" ry="6" fill="rgba(0,0,0,0.06)" />

          {/* Body */}
          <ellipse cx="100" cy="155" rx="55" ry="58" fill="url(#mascotBody)" />
          {/* Belly */}
          <ellipse cx="100" cy="165" rx="38" ry="38" fill="#A29BFE" opacity="0.25" />

          {/* Head */}
          <ellipse cx="100" cy="85" rx="60" ry="55" fill="url(#mascotHead)" />

          {/* Eyes — spring mouse tracking */}
          <motion.g style={{ x: springX, y: springY }}>
            {/* Eye whites */}
            <motion.ellipse cx="75" cy="82" rx="18" ry={isDozing ? 2 : 20} fill="white" animate={{ ry: isDozing ? 2 : 20 }} transition={{ duration: 0.2 }} />
            <motion.ellipse cx="125" cy="82" rx="18" ry={isDozing ? 2 : 20} fill="white" animate={{ ry: isDozing ? 2 : 20 }} transition={{ duration: 0.2 }} />
            {/* Pupils */}
            {!isDozing && <>
              <circle cx="75" cy="82" r="9" fill="#2D3436" />
              <circle cx="125" cy="82" r="9" fill="#2D3436" />
              {/* Eye shine */}
              <circle cx="78" cy="78" r="3.5" fill="white" />
              <circle cx="128" cy="78" r="3.5" fill="white" />
            </>}
          </motion.g>

          {/* Eyebrows */}
          <motion.rect x="55" y={isDozing ? 62 : 56} width="35" height="5" rx="3" fill="#4A3F9F" opacity="0.6"
            animate={{ y: isDozing ? 62 : showSpeech ? 50 : 56 }} transition={{ duration: 0.3 }} />
          <motion.rect x="110" y={isDozing ? 62 : 56} width="35" height="5" rx="3" fill="#4A3F9F" opacity="0.6"
            animate={{ y: isDozing ? 62 : showSpeech ? 50 : 56 }} transition={{ duration: 0.3 }} />

          {/* Mouth */}
          <motion.path
            d={showSpeech ? "M 78 108 Q 100 130 122 108" : isDozing ? "M 88 106 Q 100 112 112 106" : "M 85 106 Q 100 118 115 106"}
            fill={showSpeech ? "#FF6B81" : "none"} stroke="#3D2F8A" strokeWidth="3" strokeLinecap="round"
            transition={{ duration: 0.3 }}
          />
          {/* Tongue when speaking */}
          {showSpeech && <ellipse cx="100" cy="118" rx="8" ry="5" fill="#FF4757" />}

          {/* Cheeks */}
          <circle cx="50" cy="95" r="9" fill="#FD79A8" opacity={showSpeech ? 0.5 : 0.2} />
          <circle cx="150" cy="95" r="9" fill="#FD79A8" opacity={showSpeech ? 0.5 : 0.2} />

          {/* Arms — animated */}
          <motion.ellipse cx={showSpeech ? 30 : 38} cy={showSpeech ? 135 : 150} rx="14" ry="18" fill="#5B4CC7"
            animate={{ cx: showSpeech ? 30 : 38, cy: showSpeech ? 135 : 150 }} transition={{ duration: 0.3 }} />
          <motion.ellipse cx={showSpeech ? 170 : 162} cy={showSpeech ? 135 : 150} rx="14" ry="18" fill="#5B4CC7"
            animate={{ cx: showSpeech ? 170 : 162, cy: showSpeech ? 135 : 150 }} transition={{ duration: 0.3 }} />

          {/* Feet */}
          <ellipse cx="75" cy="208" rx="18" ry="10" fill="#5B4CC7" />
          <ellipse cx="125" cy="208" rx="18" ry="10" fill="#5B4CC7" />

          {/* Graduation Cap */}
          <polygon points="100,18 40,42 100,66 160,42" fill="#2D3436" />
          <rect x="78" y="42" width="44" height="6" fill="#2D3436" rx="2" />
          <line x1="155" y1="42" x2="162" y2="62" stroke="#2D3436" strokeWidth="3" />
          <circle cx="162" cy="65" r="5" fill="#FDCB6E" />

          {/* Star badge */}
          <text x="90" y="162" fontSize="22">⭐</text>

          {/* ZZZ when dozing */}
          <AnimatePresence>
            {isDozing && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.text x="155" y="55" fontSize="14" fontWeight="800" fill="rgba(108,92,231,0.4)"
                  animate={{ y: [0, -15], x: [0, 8], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}>z</motion.text>
                <motion.text x="165" y="42" fontSize="18" fontWeight="800" fill="rgba(108,92,231,0.5)"
                  animate={{ y: [0, -15], x: [0, 8], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>Z</motion.text>
                <motion.text x="175" y="28" fontSize="22" fontWeight="800" fill="rgba(108,92,231,0.6)"
                  animate={{ y: [0, -15], x: [0, 8], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}>Z</motion.text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Sparkle when hovered */}
          <AnimatePresence>
            {showSpeech && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.text x="20" y="30" fontSize="16" animate={{ opacity: [0,1,0], y: [30, 18] }} transition={{ duration: 1.2, repeat: Infinity }}>✨</motion.text>
                <motion.text x="170" y="25" fontSize="14" animate={{ opacity: [0,1,0], y: [25, 12] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}>⭐</motion.text>
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>

        <defs>
          <linearGradient id="mascotBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B7CF5" />
            <stop offset="100%" stopColor="#5B4CC7" />
          </linearGradient>
          <linearGradient id="mascotHead" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9B8FF8" />
            <stop offset="100%" stopColor="#6C5CE7" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
