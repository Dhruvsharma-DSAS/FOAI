import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TEACHER_ID, TEACHER_PASSWORD, STUDENT_PASSWORD } from '../utils/constants';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('edupulse_role');
    if (role) {
      setUser({
        role,
        email: sessionStorage.getItem('edupulse_email') || '',
        name: sessionStorage.getItem('edupulse_name') || '',
      });
    }
  }, []);

  const loginStudent = useCallback((email, password, students) => {
    if (!email || !password) return { success: false, error: 'Please fill in all fields' };
    const student = students.find(s =>
      s['Email'] && s['Email'].toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (!student) return { success: false, error: 'No student found with this email' };
    if (password !== STUDENT_PASSWORD) return { success: false, error: 'Incorrect password' };

    const userData = { role: 'student', email: email.toLowerCase().trim(), name: student['Student Name'] };
    setUser(userData);
    sessionStorage.setItem('edupulse_role', 'student');
    sessionStorage.setItem('edupulse_email', userData.email);
    sessionStorage.setItem('edupulse_name', userData.name);
    return { success: true, student };
  }, []);

  const loginTeacher = useCallback((teacherId, password) => {
    if (!teacherId || !password) return { success: false, error: 'Please fill in all fields' };
    if (teacherId !== TEACHER_ID) return { success: false, error: 'Invalid Teacher ID' };
    if (password !== TEACHER_PASSWORD) return { success: false, error: 'Incorrect password' };

    const userData = { role: 'teacher', email: '', name: 'Dhruv' };
    setUser(userData);
    sessionStorage.setItem('edupulse_role', 'teacher');
    sessionStorage.setItem('edupulse_name', 'Dhruv');
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('edupulse_role');
    sessionStorage.removeItem('edupulse_email');
    sessionStorage.removeItem('edupulse_name');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginStudent, loginTeacher, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
