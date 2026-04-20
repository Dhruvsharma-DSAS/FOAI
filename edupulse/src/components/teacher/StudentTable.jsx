import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Edit2, Check, X, Filter } from 'lucide-react';
import { getRiskColor, formatScore } from '../../utils/helpers';

export default function StudentTable({ students, onUpdate }) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [sort, setSort] = useState({ key: 'Final Engagement Score', dir: 'desc' });
  const [editMode, setEditMode] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const columns = [
    { key: 'Student Name', label: 'Name' },
    { key: 'ID', label: 'ID' },
    { key: 'Quiz (%)', label: 'Quiz' },
    { key: 'Teacher Score', label: 'T.Score' },
    { key: 'Final Engagement Score', label: 'Engage' },
    { key: 'Risk', label: 'Risk' },
  ];

  const filteredData = useMemo(() => {
    let data = students.filter(s =>
      (s['Student Name']?.toLowerCase().includes(search.toLowerCase()) ||
       s['Email']?.toLowerCase().includes(search.toLowerCase())) &&
      (riskFilter === 'All' || s['Risk'] === riskFilter)
    );

    return data.sort((a, b) => {
      let va = a[sort.key], vb = b[sort.key];
      if (typeof va === 'number') return sort.dir === 'asc' ? va - vb : vb - va;
      return sort.dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }, [students, search, riskFilter, sort]);

  const toggleSort = (key) => {
    setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <div style={styles.container}>
      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchWrap}>
          <Search size={18} color="#A0A3AE" />
          <input
            placeholder="Search students..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterWrap}>
          <Filter size={18} color="#A0A3AE" />
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} style={styles.select}>
            <option value="All">All Risks</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{ ...styles.btn, background: editMode ? '#2EC4B6' : 'white', color: editMode ? 'white' : '#2D3142' }}
        >
          {editMode ? <Check size={16} /> : <Edit2 size={16} />}
          {editMode ? 'Done Editing' : 'Edit Mode'}
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} onClick={() => toggleSort(col.key)} style={styles.th}>
                  <div style={styles.thContent}>
                    {col.label}
                    {sort.key === col.key && (sort.dir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((s, idx) => (
                <React.Fragment key={s['Email'] || idx}>
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => !editMode && setExpandedRow(expandedRow === idx ? null : idx)}
                    style={{ ...styles.tr, cursor: editMode ? 'default' : 'pointer' }}
                  >
                    {columns.map(col => (
                      <td key={col.key} style={styles.td}>
                        {col.key === 'Risk' ? (
                          <span style={{ ...styles.badge, background: `${getRiskColor(s[col.key])}15`, color: getRiskColor(s[col.key]) }}>
                            {s[col.key]}
                          </span>
                        ) : col.key === 'Final Engagement Score' ? (
                          <strong className="mono" style={{ color: getRiskColor(s['Risk']) }}>{formatScore(s[col.key])}</strong>
                        ) : (
                          editMode && !['Student Name', 'ID', 'Risk'].includes(col.key) ? (
                            <input
                              className="mono"
                              value={s[col.key]}
                              onChange={(e) => onUpdate(s['Email'], col.key, e.target.value)}
                              onClick={e => e.stopPropagation()}
                              style={styles.tableInput}
                            />
                          ) : s[col.key]
                        )}
                      </td>
                    ))}
                  </motion.tr>
                  {/* Expanded Row */}
                  {expandedRow === idx && (
                    <tr>
                      <td colSpan={columns.length} style={styles.expandedTd}>
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={styles.expandedContent}>
                           <div style={styles.detailGrid}>
                             <div><strong>Email:</strong> {s['Email']}</div>
                             <div><strong>Interest:</strong> {s['Interest']}/10</div>
                             <div><strong>Doubt:</strong> {s['Doubt']}</div>
                             <div><strong>Pace:</strong> {s['Pace']}</div>
                             <div><strong>Understanding:</strong> {s['Understanding (Student)']}/10</div>
                           </div>
                           <div style={{ marginTop: 12 }}><strong>Student Feedback:</strong> <span style={{fontStyle:'italic'}}>"{s['Feedback']}"</span></div>
                           <div style={{ marginTop: 8 }}><strong>Teacher Remark:</strong> {s['Teacher Remark']}</div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%' },
  controls: { display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' },
  searchWrap: {
    flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 10,
    background: 'white', padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
  },
  searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#2D3142' },
  filterWrap: {
    display: 'flex', alignItems: 'center', gap: 10, background: 'white',
    padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)',
  },
  select: { border: 'none', outline: 'none', fontSize: '0.9rem', background: 'transparent', cursor: 'pointer', fontWeight: 600 },
  btn: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
    borderRadius: 12, border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer',
    fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  tableWrap: { background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '16px 20px', background: '#F8FAFC', color: '#7A7D8B', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer' },
  thContent: { display: 'flex', alignItems: 'center', gap: 6 },
  td: { padding: '14px 20px', borderBottom: '1px solid #F1F5F9', color: '#2D3142', fontSize: '0.9rem' },
  tr: { transition: 'background 0.2s' },
  badge: { padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800 },
  tableInput: { width: 60, padding: 4, borderRadius: 4, border: '1px solid #E2E8F0', textAlign: 'center' },
  expandedTd: { padding: 0, background: '#FDFCFB' },
  expandedContent: { padding: '20px', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem', color: '#64748B' },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
};
