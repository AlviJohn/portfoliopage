// All page content lives here — edit this file to update the site.

export const profile = {
  name: 'Alvi Skariah John',
  firstName: 'Alvi',
  role: 'Principal Data Scientist',
  company: 'Hewlett Packard Enterprise',
  location: 'Bengaluru, India',
  titles: ['AI/ML Architect', 'Consultant', 'Product Manager'],
  headline: 'I turn tangled business problems into AI systems people actually use.',
  intro:
    'For 14+ years I have worked across the whole arc of applied ML — decision scientist, management consultant, product developer and analytics practice head. Today I lead GenAI at HPE Operations, building platforms that read contracts, answer questions and quietly give teams their time back.',
  email: 'aalwiz09@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alvi-skariah-john' },
    { label: 'GitHub', href: 'https://github.com/AlviJohn' },
  ],
}

export const stats = [
  { value: '14+', label: 'years in applied ML & analytics' },
  { value: '106K+', label: 'contracts processed by the GenAI contract platform' },
  { value: '250K+', label: 'chats a year on the enterprise RAG system' },
  { value: '$1.5M', label: 'annual savings from spend analytics at MRF' },
]

export const work = [
  {
    title: 'Contract Intelligence Platform',
    org: 'HPE',
    tag: 'GenAI',
    metric: '106K+',
    metricLabel: 'contracts processed',
    summary:
      'An AI platform for bulk contract analysis — validation, translation, side-by-side comparison, compliance checks and contract Q&A — built and scaled for enterprise operations.',
    stack: ['LLMs', 'RAG', 'Agentic workflows', 'Translation'],
  },
  {
    title: 'Enterprise RAG System',
    org: 'HPE',
    tag: 'GenAI',
    metric: '20K',
    metricLabel: 'users · 250K+ chats a year',
    summary:
      'A conversational knowledge assistant with RAG search, multilingual retrieval, Excel intelligence and computer-vision capabilities — used by 20K people for 250K+ chats every year.',
    stack: ['Advanced RAG', 'Multilingual retrieval', 'Computer vision'],
  },
  {
    title: 'MLOps Framework',
    org: 'HPE',
    tag: 'Platform',
    metric: '4',
    metricLabel: 'integrated modules',
    summary:
      'Tech lead and PM for a shared MLOps framework covering data observability, model explainability, pipeline orchestration and experiment tracking.',
    stack: ['Evidently', 'SHAP', 'Airflow', 'MLflow'],
  },
  {
    title: 'Sales & Demand Forecasting',
    org: 'HPE',
    tag: 'Predictive ML',
    metric: '+10%',
    metricLabel: 'deal-prediction accuracy',
    summary:
      'Raised sales deal prediction accuracy by 10% with AutoML and demand forecasting by 7% with DeepAR — lowering risk for sales and sharpening planning.',
    stack: ['AutoML', 'DeepAR', 'Time series'],
  },
  {
    title: 'MRF Data Platform & Spend Analytics',
    org: 'MRF Tyres',
    tag: 'Data strategy',
    metric: '$1.5M',
    metricLabel: 'saved every year',
    summary:
      'As first analytics hire and practice head, led the enterprise data platform and the spend analytics dashboards that delivered seven-figure annual savings.',
    stack: ['Azure Data Factory', 'Synapse', 'BI'],
  },
  {
    title: 'Module Optimization',
    org: 'MRF Tyres',
    tag: 'Optimization',
    metric: 'Min',
    metricLabel: 'cost per tyre',
    summary:
      'An integer-programming model that allocates machinery across a production capacity range to minimise cost per tyre.',
    stack: ['Integer programming', 'Operations research'],
  },
  {
    title: 'Pricing Solutions Suite',
    org: 'PwC US Advisory',
    tag: 'Consulting',
    metric: '4',
    metricLabel: 'plug-and-play models',
    summary:
      'Founded a reusable suite of pricing AI — CLTV, entity recognition, price sensitivity and product bundling — and used it to simplify pricing for the largest US logistics company.',
    stack: ['CLTV', 'NER', 'Recommenders'],
  },
  {
    title: 'Marketing Mix Product',
    org: 'Visual IQ → Nielsen',
    tag: 'Product',
    metric: 'MMM',
    metricLabel: 'cross-channel attribution',
    summary:
      'Built attribution and predictive models inside a marketing-mix product that optimised media plans and lifted marketing ROI for enterprise advertisers.',
    stack: ['Attribution', 'Bayesian models', 'Optimization'],
  },
]

export const experience = [
  {
    company: 'Hewlett Packard Enterprise',
    place: 'Bengaluru',
    period: '2023 — Now',
    roles: [
      { title: 'Principal Data Scientist', dates: 'May 2026 — Present' },
      { title: 'Expert Data Scientist', dates: 'Jan 2023 — Apr 2026' },
    ],
    points: [
      'Lead and SME for every GenAI initiative in HPE Operations; manage and mentor a team of 10+.',
      'Built the contract intelligence platform (106K+ contracts) and an enterprise RAG system used by 20K people (250K+ chats a year).',
      'Shipped GenAI integrations including an Entity Resolution Bot and a Customer Operations Bot.',
      'Built Warehouse Space Projection, an ML tool for proactive warehouse planning and inventory visibility.',
    ],
  },
  {
    company: 'MRF Tyres',
    place: 'Chennai',
    period: '2020 — 2023',
    roles: [{ title: 'Practice Head, Analytics & Data Engineering', dates: 'Dec 2020 — Jan 2023' }],
    points: [
      'First analytics employee: owned the roadmap, hiring plan, vendors and delivery across business units.',
      'Led the MRF Data Platform; spend analytics saved $1.5M a year.',
      'Hands-on work on tyre rejection analysis, R&D analytics and the Module Optimization model.',
      'Program-managed the Transport Management System and vendor portal.',
    ],
  },
  {
    company: 'AlmaBetter',
    place: 'Remote',
    period: '2021 — 2022',
    roles: [{ title: 'Freelance Machine Learning Trainer', dates: 'Sep 2021 — Mar 2022' }],
    points: ['Taught machine learning, statistics and deep learning to working professionals.'],
  },
  {
    company: 'PwC US Advisory',
    place: 'Mumbai · Bengaluru',
    period: '2018 — 2020',
    roles: [{ title: 'Senior Management Consultant, Analytics', dates: 'Apr 2018 — Nov 2020' }],
    points: [
      'Analytics-embedded consulting for Fortune 500 clients in Technology, Media & Telecom.',
      'Customer segmentation that underpinned a US B2B tech firm’s sales transformation.',
      'Demand model for the largest theme park in China, blending survey and statistical models.',
      'Founded the Pricing Solutions Suite of reusable AI models.',
    ],
  },
  {
    company: 'Visual IQ (acquired by Nielsen)',
    place: 'Kochi',
    period: '2016 — 2017',
    roles: [{ title: 'Data Scientist, Product Development', dates: 'Apr 2016 — Nov 2017' }],
    points: [
      'Built the marketing-mix and attribution engine of a cross-channel marketing product.',
      'Built an NLP recommendation engine for a careers site from scratch (TF-IDF, LSA, Word2Vec).',
    ],
  },
  {
    company: 'Antuit.ai',
    place: 'Bengaluru',
    period: '2014 — 2016',
    roles: [{ title: 'Senior Analyst', dates: 'Dec 2014 — Mar 2016' }],
    points: [
      'ML for marketing and digital advertising at a Goldman Sachs–funded startup.',
      'Online targeting framework for an insurer and budget optimisation from a dynamic marketing-mix model.',
    ],
  },
  {
    company: 'Mu Sigma',
    place: 'Bengaluru',
    period: '2012 — 2014',
    roles: [{ title: 'Senior Business Analyst', dates: 'Jun 2012 — Nov 2014' }],
    points: [
      'Forecasting, feature planning and workforce optimisation tools for the world’s largest retailer across Brazil, China and Argentina.',
    ],
  },
]

export const skills = [
  { group: 'Generative AI', items: ['Advanced RAG', 'Agentic workflows', 'Prompt engineering', 'LangChain', 'Multilingual retrieval'] },
  { group: 'Machine learning', items: ['Predictive modelling', 'Time series', 'NLP', 'Deep learning', 'Optimization', 'Simulation', 'Survey design'] },
  { group: 'MLOps', items: ['MLflow', 'Airflow', 'Evidently', 'SHAP', 'AutoML', 'FastAPI', 'Docker', 'Streamlit'] },
  { group: 'Data & cloud', items: ['Azure Data Factory', 'Synapse', 'PySpark', 'SQL', 'AWS', 'GCP'] },
  { group: 'Languages & tools', items: ['Python', 'PyTorch', 'R', 'SAS', 'Tableau', 'VBA'] },
]

export const education = [
  {
    school: 'Liverpool John Moores University',
    detail: 'MS, Artificial Intelligence & Machine Learning',
    note: 'Dissertation: Multimodal Recommendation Systems Using Deep Learning',
    year: '2023',
  },
  {
    school: 'IIIT Bangalore',
    detail: 'Post Graduate Diploma, Machine Learning & AI',
    year: '',
  },
  {
    school: 'College of Engineering, Trivandrum',
    detail: 'B.Tech, Computer Science',
    year: '2012',
  },
]

export const certifications = [
  'Transformers in Computer Vision',
  'Machine Learning on AWS for ML Practitioners',
  'MLOps: Continuous Delivery & Automation Pipelines',
  'Auto Time Series',
  'Deep Learning Specialization — DeepLearning.AI',
  'The Analytics Edge — MIT (edX)',
  'Digital Acumen',
]

export const awards = ['Star Performer of the Quarter', 'Spot Award', 'Hackathon Winner']
