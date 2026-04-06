export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  type: 'current' | 'past';
  impact: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    id: 'elevance',
    company: 'Elevance Health',
    role: 'Data Scientist',
    location: 'Columbus, OH',
    period: 'Jun 2025 - Present',
    duration: '10+ months',
    type: 'current',
    impact: [
      'Improved disease progression forecasting accuracy by 25% using ARIMA, Prophet, and LSTM',
      'Reduced clinical note review time by 40% through NLP automation',
      'Built automated pipelines processing 10TB+ EHR and claims data'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'NLP', 'AWS', 'Kafka']
  },
  {
    id: 'cbre',
    company: 'CBRE',
    role: 'Data Scientist',
    location: 'Columbus, OH',
    period: 'May 2024 - May 2025',
    duration: '1 year',
    type: 'past',
    impact: [
      'Boosted profit by 20% through pricing and layout optimization models',
      'Improved sales forecasting accuracy by 30% using ensemble methods',
      'Reduced stockouts by 18% and excess inventory by 22%'
    ],
    technologies: ['SQL', 'Hadoop', 'Spark', 'Reinforcement Learning', 'GIS', 'Kafka']
  },
  {
    id: 'accenture',
    company: 'Accenture',
    role: 'Application Development Analyst',
    location: 'Hyderabad, India',
    period: 'Jun 2021 - Nov 2023',
    duration: '2.5 years',
    type: 'past',
    impact: [
      'Drove 15% revenue growth through data-driven insights from CRM and ERP systems',
      'Increased marketing ROI by 25% using customer segmentation models',
      'Improved demand forecasting accuracy by 28%'
    ],
    technologies: ['Python', 'SQL', 'AWS', 'Airflow', 'Databricks', 'Tableau', 'Power BI']
  },
  {
    id: 'lseg',
    company: 'London Stock Exchange Group',
    role: 'Data Analyst',
    location: 'Hyderabad, India',
    period: 'Jan 2020 - May 2021',
    duration: '1.5 years',
    type: 'past',
    impact: [
      'Reduced trading risk exposure by 30% with AI-driven predictive models',
      'Enhanced compliance insights by 35% using NLP on financial documents',
      'Led data governance aligned with GDPR and MiFID II standards'
    ],
    technologies: ['Python', 'TensorFlow', 'NLP', 'Tableau', 'Power BI']
  }
];
