const NUMERIC_FIELDS = [
  'ID', 'Understanding (Student)', 'Quiz (%)', 'Interest',
  'Assignment', 'Teacher Participation', 'Teacher Attention',
  'Teacher Understanding', 'Effort', 'Student Score',
  'Teacher Score', 'Final Engagement Score'
];

const STRING_DEFAULTS = {
  'Student Name': 'Unknown',
  'Email': '',
  'Doubt': 'N/A',
  'Pace': 'N/A',
  'Feedback': 'No feedback provided',
  'Teacher Remark': 'No remark available',
  'Topic Difficulty': 'N/A',
  'Suggested Improvement': 'N/A',
  'Feedback Level': 'Neutral',
  'Risk': 'Uncategorized',
  'feedback_level': 'Neutral',
};

export function normalizeData(rawData) {
  return rawData.map(record => {
    const clean = {};

    Object.keys(record).forEach(key => {
      const trimmedKey = key.trim();
      let value = record[key];

      if (NUMERIC_FIELDS.includes(trimmedKey)) {
        value = Number(value) || 0;
      }

      clean[trimmedKey] = value;
    });

    // Apply string defaults for missing/empty fields
    Object.entries(STRING_DEFAULTS).forEach(([field, fallback]) => {
      if (!clean[field] || String(clean[field]).trim() === '') {
        clean[field] = fallback;
      }
    });

    return clean;
  });
}
