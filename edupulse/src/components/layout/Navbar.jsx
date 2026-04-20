import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getAvatarGradient } from '../../utils/helpers';
import { LayoutDashboard, Workflow, FileText, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!user) return null;

  const dashPath = user.role === 'teacher' ? '/teacher' : '/student';
  const links = [
    { to: dashPath, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { to: '/workflow', label: 'How It Works', icon: <Workflow size={16} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to={dashPath} style={styles.logo} onClick={() => setMobileOpen(false)}>
        <div style={styles.logoIcon}>E</div>
        <span style={styles.logoText}>EduPulse</span>
      </Link>

      {/* Desktop Links */}
      <div style={styles.links}>
        {links.map(link => (
          <Link key={link.to} to={link.to} style={{
            ...styles.link,
            color: location.pathname === link.to ? '#FF6B35' : '#7A7D8B',
          }}>
            {link.icon} {link.label}
            {location.pathname === link.to && (
              <motion.div layoutId="nav-underline" style={styles.underline} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
            )}
          </Link>
        ))}
      </div>

      <div style={styles.right}>
        <div style={{ ...styles.avatar, background: getAvatarGradient(user.name) }}>
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <span style={styles.username}>{user.name}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={14} /> Logout
        </button>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={styles.hamburger}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={styles.mobileMenu}>
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              style={{ ...styles.mobileLink, color: location.pathname === link.to ? '#FF6B35' : '#2D3142' }}>
              {link.icon} {link.label}
            </Link>
          ))}
          <button onClick={handleLogout} style={{ ...styles.logoutBtn, width: '100%', marginTop: 8 }}>
            <LogOut size={14} /> Logout
          </button>
        </motion.div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, height: 70, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px',
    background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.25)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' },
  logoIcon: {
    width: 38, height: 38, borderRadius: 8,
    background: 'linear-gradient(135deg, #FF6B35, #E71D73)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: 800, fontFamily: "'Baloo 2', cursive", fontSize: '1.1rem',
  },
  logoText: { fontFamily: "'Baloo 2', cursive", fontSize: '1.4rem', fontWeight: 800, color: '#2D3142' },
  links: { display: 'flex', gap: 24 },
  link: {
    display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
    fontWeight: 600, padding: '8px 4px', position: 'relative', fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  underline: {
    position: 'absolute', bottom: -2, left: 0, right: 0, height: 3,
    background: '#FF6B35', borderRadius: 3,
  },
  right: { display: 'flex', alignItems: 'center', gap: 12 },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontFamily: "'Baloo 2', cursive", color: 'white', fontSize: '1rem',
  },
  username: { fontWeight: 600, color: '#2D3142', fontSize: '0.9rem' },
  logoutBtn: {
    padding: '8px 16px', fontSize: '0.82rem',
    background: 'rgba(231,29,115,0.1)', color: '#E71D73',
    border: '1px solid rgba(231,29,115,0.2)', borderRadius: 8,
    cursor: 'pointer', fontWeight: 700, fontFamily: "'Nunito', sans-serif",
    display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.2s',
  },
  hamburger: {
    display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#2D3142',
  },
  mobileMenu: {
    position: 'absolute', top: 70, left: 0, right: 0,
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
    padding: 16, borderBottom: '1px solid rgba(255,255,255,0.25)',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  mobileLink: {
    display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
    fontWeight: 600, padding: '12px 8px', fontSize: '0.95rem',
  },
};

// Apply responsive styles via CSS (hamburger visible on mobile)
const styleTag = document.createElement('style');
styleTag.textContent = `
@media (max-width: 767px) {
  nav > div:nth-child(2) { display: none !important; }
  button[style*="hamburger"] { display: flex !important; }
}
`;
if (typeof document !== 'undefined') document.head.appendChild(styleTag);
