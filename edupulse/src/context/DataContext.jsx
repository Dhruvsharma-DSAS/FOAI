import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchStudentData } from '../services/api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStudentData();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const findStudentByEmail = useCallback((email) => {
    return students.find(s =>
      s['Email'] && s['Email'].toLowerCase().trim() === email.toLowerCase().trim()
    ) || null;
  }, [students]);

  const getClassStats = useCallback(() => {
    const total = students.length;
    if (!total) return { total: 0, avgScore: 0, highRisk: 0, lowRisk: 0, mediumRisk: 0, positiveFeedback: 0, negativeFeedback: 0, neutralFeedback: 0 };
    const avgScore = Math.round(students.reduce((sum, s) => sum + (s['Final Engagement Score'] || 0), 0) / total);
    const highRisk = students.filter(s => s['Risk'] === 'High Risk').length;
    const mediumRisk = students.filter(s => s['Risk'] === 'Medium Risk').length;
    const lowRisk = students.filter(s => s['Risk'] === 'Low Risk').length;
    const positiveFeedback = students.filter(s => (s['Feedback Level'] || s['feedback_level']) === 'Positive').length;
    const negativeFeedback = students.filter(s => (s['Feedback Level'] || s['feedback_level']) === 'Negative').length;
    const neutralFeedback = total - positiveFeedback - negativeFeedback;
    return { total, avgScore, highRisk, lowRisk, mediumRisk, positiveFeedback, negativeFeedback, neutralFeedback };
  }, [students]);

  return (
    <DataContext.Provider value={{ students, setStudents, loading, error, refetch: loadData, findStudentByEmail, getClassStats }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside DataProvider');
  return ctx;
}
