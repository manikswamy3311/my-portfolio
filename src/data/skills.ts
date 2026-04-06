export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: 'expert' | 'advanced' | 'intermediate';
    years?: number;
  }[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Machine Learning & AI',
    icon: '🤖',
    skills: [
      { name: 'Python (Scikit-learn, TensorFlow, PyTorch)', level: 'expert', years: 5 },
      { name: 'Deep Learning (CNNs, RNNs, LSTMs, Transformers)', level: 'expert', years: 4 },
      { name: 'NLP (spaCy, NLTK, BERT, Hugging Face)', level: 'advanced', years: 3 },
      { name: 'Time-Series Forecasting (ARIMA, Prophet, LSTM)', level: 'expert', years: 4 },
      { name: 'Reinforcement Learning', level: 'advanced', years: 2 },
      { name: 'Model Deployment & MLOps', level: 'advanced', years: 3 }
    ]
  },
  {
    category: 'Data Engineering & Processing',
    icon: '⚙️',
    skills: [
      { name: 'Spark (PySpark, Spark SQL)', level: 'expert', years: 4 },
      { name: 'Hadoop Ecosystem (MapReduce, Hive, HDFS)', level: 'advanced', years: 4 },
      { name: 'ETL Pipelines (Airflow, Databricks, AWS Glue)', level: 'expert', years: 4 },
      { name: 'Stream Processing (Kafka, AWS Kinesis)', level: 'advanced', years: 3 },
      { name: 'SQL (MySQL, PostgreSQL, MS SQL Server)', level: 'expert', years: 5 },
      { name: 'Data Warehousing (Redshift, Snowflake, BigQuery)', level: 'advanced', years: 3 }
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS (SageMaker, Lambda, S3, EC2, Redshift)', level: 'advanced', years: 4 },
      { name: 'Azure (Data Lake, ML Studio, Databricks)', level: 'advanced', years: 3 },
      { name: 'GCP (BigQuery, Vertex AI)', level: 'intermediate', years: 2 },
      { name: 'Docker & Kubernetes', level: 'advanced', years: 3 },
      { name: 'CI/CD (Jenkins, GitHub Actions)', level: 'advanced', years: 3 }
    ]
  },
  {
    category: 'Analytics & Visualization',
    icon: '📊',
    skills: [
      { name: 'Tableau', level: 'expert', years: 4 },
      { name: 'Power BI', level: 'advanced', years: 4 },
      { name: 'Statistical Analysis (R, MATLAB)', level: 'advanced', years: 4 },
      { name: 'A/B Testing & Experimental Design', level: 'advanced', years: 3 },
      { name: 'Geospatial Analytics (GeoPandas, Folium)', level: 'intermediate', years: 2 }
    ]
  },
  {
    category: 'Domain Expertise',
    icon: '🎯',
    skills: [
      { name: 'Healthcare Analytics & EHR Systems', level: 'advanced', years: 2 },
      { name: 'Financial Modeling & Risk Analytics', level: 'advanced', years: 2 },
      { name: 'Customer Analytics & Segmentation', level: 'expert', years: 4 },
      { name: 'Data Governance & Compliance (GDPR, HIPAA)', level: 'advanced', years: 3 }
    ]
  }
];

export const toolsAndTechnologies = {
  languages: ['Python', 'R', 'SQL', 'Java', 'Scala', 'Julia'],
  mlFrameworks: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost'],
  bigData: ['Spark', 'Hadoop', 'Kafka', 'Hive', 'Sqoop', 'Flume'],
  cloud: ['AWS', 'Azure', 'GCP'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redshift', 'Snowflake', 'BigQuery'],
  visualization: ['Tableau', 'Power BI', 'Looker', 'Plotly', 'Matplotlib'],
  devops: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub Actions']
};
