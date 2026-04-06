export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  highlights?: string[];
}

export const education: Education[] = [
  {
    id: 'masters',
    degree: 'Master of Science',
    field: 'Data Science and Analytics',
    institution: 'Ferris State University',
    location: 'Michigan, USA',
    period: 'Jan 2024 - Aug 2025',
    highlights: [
      'Advanced Machine Learning',
      'Big Data Analytics',
      'Statistical Modeling',
      'Cloud Computing'
    ]
  },
  {
    id: 'bachelors',
    degree: 'Bachelor of Technology',
    field: 'Electronics and Communications Engineering',
    institution: 'GITAM University',
    location: 'Vizag, India',
    period: 'Jun 2017 - May 2021',
    highlights: [
      'Data Structures & Algorithms',
      'Machine Learning Fundamentals',
      'Signal Processing',
      'Programming Languages'
    ]
  }
];
