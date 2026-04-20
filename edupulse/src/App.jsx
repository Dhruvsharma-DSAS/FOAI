import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CharacterCrew from './components/shared/CharacterCrew';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import WorkflowPage from './pages/WorkflowPage';
import ProtectedRoute from './components/shared/ProtectedRoute';

/* Page transition wrapper — inspired by Book project */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/student" element={
          <ProtectedRoute role="student"><PageTransition><StudentDashboard /></PageTransition></ProtectedRoute>
        } />
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher"><PageTransition><TeacherDashboard /></PageTransition></ProtectedRoute>
        } />
        <Route path="/workflow" element={
          <ProtectedRoute><PageTransition><WorkflowPage /></PageTransition></ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <AnimatedRoutes />
          <CharacterCrew />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
