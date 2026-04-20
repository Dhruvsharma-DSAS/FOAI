import { API_URL } from '../utils/constants';
import { normalizeData } from '../utils/normalizeData';

export async function fetchStudentData() {
  // Check cache first
  const cached = sessionStorage.getItem('edupulse_data');
  const cacheTime = sessionStorage.getItem('edupulse_data_time');
  if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 300000) {
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const rawData = await response.json();
    const normalized = normalizeData(rawData);
    sessionStorage.setItem('edupulse_data', JSON.stringify(normalized));
    sessionStorage.setItem('edupulse_data_time', Date.now().toString());
    return normalized;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    if (cached) return JSON.parse(cached);
    return normalizeData(getSampleData());
  }
}

function getSampleData() {
  return [
    {"Student Name":"Dhruv","ID":"101","Email":"dhruv@email.com","Understanding (Student)":"8","Quiz (%)":"75","Interest":"7","Doubt":"Some","Pace":"Perfect","Assignment":"85","Feedback":"I understood most of the class but last part was confusing","Teacher Participation":"8","Teacher Attention":"7","Teacher Understanding":"7","Effort":"8","Teacher Remark":"Good but needs practice in numericals","Topic Difficulty":"Medium","Suggested Improvement":"Explain numericals more clearly","Feedback Level":"Neutral","Student Score":"78","Teacher Score":"75","Final Engagement Score":"75","Risk":"Low Risk","feedback_level":"Neutral"},
    {"Student Name":"Rahul","ID":"102","Email":"rahul@email.com","Understanding (Student)":"4","Quiz (%)":"50","Interest":"6","Doubt":"Many","Pace":"Fast","Assignment":"45","Feedback":"I did not understand the topic properly and pace was too fast","Teacher Participation":"5","Teacher Attention":"4","Teacher Understanding":"4","Effort":"5","Teacher Remark":"Struggling, needs slow explanation","Topic Difficulty":"Hard","Suggested Improvement":"Slow down teaching","Feedback Level":"Negative","Student Score":"46","Teacher Score":"45","Final Engagement Score":"44","Risk":"High Risk","feedback_level":"Negative"},
    {"Student Name":"Aisha","ID":"103","Email":"aisha@email.com","Understanding (Student)":"7","Quiz (%)":"65","Interest":"8","Doubt":"None","Pace":"Perfect","Assignment":"75","Feedback":"Very clear and interesting class, I understood everything well","Teacher Participation":"9","Teacher Attention":"8","Teacher Understanding":"8","Effort":"8","Teacher Remark":"Strong and consistent","Topic Difficulty":"Medium","Suggested Improvement":"Add more practice questions","Feedback Level":"Positive","Student Score":"77","Teacher Score":"83","Final Engagement Score":"81","Risk":"Low Risk","feedback_level":"Positive"},
    {"Student Name":"Karan","ID":"107","Email":"karan@email.com","Understanding (Student)":"3","Quiz (%)":"40","Interest":"5","Doubt":"Many","Pace":"Fast","Assignment":"35","Feedback":"Very difficult topic, could not understand properly","Teacher Participation":"4","Teacher Attention":"3","Teacher Understanding":"3","Effort":"4","Teacher Remark":"Weak, needs basics","Topic Difficulty":"Hard","Suggested Improvement":"Teach slowly with basics","Feedback Level":"Negative","Student Score":"38","Teacher Score":"35","Final Engagement Score":"36","Risk":"High Risk","feedback_level":"Negative"},
    {"Student Name":"Riya","ID":"110","Email":"riya@email.com","Understanding (Student)":"2","Quiz (%)":"35","Interest":"4","Doubt":"Many","Pace":"Fast","Assignment":"30","Feedback":"Very confusing and fast, I am not confident","Teacher Participation":"3","Teacher Attention":"3","Teacher Understanding":"2","Effort":"3","Teacher Remark":"Needs strong support","Topic Difficulty":"Hard","Suggested Improvement":"Reduce speed and explain clearly","Feedback Level":"Negative","Student Score":"32","Teacher Score":"28","Final Engagement Score":"31","Risk":"High Risk","feedback_level":"Negative"}
  ];
}
