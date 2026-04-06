export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
  technologies: string[];
  highlights: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'healthcare-prediction',
    title: 'Healthcare Outcome Prediction System',
    category: 'Healthcare AI',
    description: 'End-to-end ML pipeline predicting patient readmissions and disease progression',
    challenge: 'Healthcare providers needed accurate models to forecast patient outcomes and optimize resource allocation across millions of patient records.',
    solution: 'Built time-series models (ARIMA, Prophet, LSTM) on 10TB+ of EHR data with automated feature engineering and real-time prediction APIs.',
    impact: [
      '25% improvement in disease progression forecasting accuracy',
      '40% reduction in manual clinical note review time',
      'Deployed on AWS with 99.9% uptime handling 10M+ predictions/month'
    ],
    technologies: ['Python', 'TensorFlow', 'LSTM', 'Spark', 'NLP', 'AWS', 'Docker'],
    highlights: [
      'Processed and cleaned 10TB+ of healthcare data',
      'Implemented automated NLP pipeline for clinical notes',
      'Built production-grade APIs with real-time monitoring'
    ],
    featured: true
  },
  {
    id: 'real-estate-optimization',
    title: 'Commercial Real Estate Analytics Platform',
    category: 'Business Intelligence',
    description: 'Predictive models optimizing pricing, inventory, and location strategies',
    challenge: 'Commercial real estate firm needed data-driven insights for pricing strategies and store placement across diverse markets.',
    solution: 'Developed ensemble models combining regression, gradient boosting, and RL with geospatial analytics for location optimization.',
    impact: [
      '20% profit increase through optimized pricing and layouts',
      '30% improvement in sales forecast accuracy',
      '18% reduction in stockouts, 22% reduction in excess inventory'
    ],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'GIS', 'GeoPandas', 'Kafka', 'Databricks'],
    highlights: [
      'Built real-time fraud detection with Autoencoders',
      'Geospatial analytics for store placement optimization',
      'Customer lifetime value and churn prediction models'
    ],
    featured: true
  },
  {
    id: 'financial-risk-modeling',
    title: 'Trading Risk & Compliance System',
    category: 'Financial Analytics',
    description: 'AI-driven models for market surveillance and regulatory compliance',
    challenge: 'Financial institution required automated risk assessment and compliance monitoring across high-volume trading operations.',
    solution: 'Implemented predictive analytics and NLP models for document analysis, integrated with real-time trading data pipelines.',
    impact: [
      '30% reduction in risk exposure through predictive models',
      '35% improvement in compliance monitoring accuracy',
      'Automated GDPR and MiFID II compliance workflows'
    ],
    technologies: ['Python', 'PyTorch', 'NLP', 'spaCy', 'Transformers', 'Tableau'],
    highlights: [
      'NLP pipeline for financial document analysis',
      'Automated anomaly detection and audit systems',
      'Real-time dashboards for trading and risk KPIs'
    ],
    featured: true
  },
  {
    id: 'customer-segmentation',
    title: 'Enterprise Customer Intelligence Platform',
    category: 'Marketing Analytics',
    description: 'ML-powered customer segmentation and personalization engine',
    challenge: 'Consumer goods company needed to understand customer behavior across multiple channels to reduce churn and improve targeting.',
    solution: 'Applied unsupervised learning (K-Means, DBSCAN, PCA) on CRM and marketing data with automated ETL pipelines.',
    impact: [
      '25% increase in marketing ROI through precision targeting',
      '12% reduction in customer churn',
      '15% revenue growth from data-driven insights'
    ],
    technologies: ['Python', 'Scikit-learn', 'AWS Redshift', 'Airflow', 'SQL', 'Power BI'],
    highlights: [
      'Automated ETL pipelines with 99% data integrity',
      'A/B testing framework for campaign optimization',
      'Real-time dashboards for sales and operations'
    ],
    featured: false
  }
];

export const projectCategories = [
  'All',
  'Healthcare AI',
  'Business Intelligence',
  'Financial Analytics',
  'Marketing Analytics'
];
