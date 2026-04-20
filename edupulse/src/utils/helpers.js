import { RISK_COLORS, FEEDBACK_COLORS, AVATAR_GRADIENTS } from './constants';

export function getRiskColor(risk) {
  return RISK_COLORS[risk] || '#7A7D8B';
}

export function getFeedbackColor(level) {
  return FEEDBACK_COLORS[level] || '#7A7D8B';
}

export function getAvatarGradient(name) {
  const index = name ? name.charCodeAt(0) % AVATAR_GRADIENTS.length : 0;
  return AVATAR_GRADIENTS[index];
}

export function getRiskIcon(risk) {
  switch (risk) {
    case 'Low Risk': return '✅';
    case 'Medium Risk': return '⚠️';
    case 'High Risk': return '🚨';
    default: return '❔';
  }
}

export function getFeedbackIcon(level) {
  switch (level) {
    case 'Positive': return '😊';
    case 'Neutral': return '😐';
    case 'Negative': return '😟';
    default: return '❔';
  }
}

export function getMotivationalMessage(risk) {
  switch (risk) {
    case 'Low Risk': return "Great work! Keep it up! 🌟";
    case 'Medium Risk': return "You're doing well, but there's room to grow! 💪";
    case 'High Risk': return "Don't worry! Let's work together to improve! 🤝";
    default: return "Keep going! 🎯";
  }
}

export function formatScore(value) {
  return typeof value === 'number' ? Math.round(value) : value;
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
