import { RoleBenchmark } from '../types/taxonomy';

export const ALL_ROLE_BENCHMARKS: RoleBenchmark[] = [
  // Full-Stack
  {
    id: "fullstack-intern", domain: "fullstack", domainLabel: "Full-Stack Developer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student Full-Stack Developer", experienceRange: "0 yrs / Academic", summary: "Focuses on fundamentals of front-end and back-end.",
    coreRequiredSkills: ["HTML", "CSS", "JavaScript", "Git", "Basic SQL"],
    advancedSkills: ["React", "Node.js", "Express"],
    toolsAndPlatforms: ["VS Code", "GitHub"],
    conceptualCompetencies: ["DOM Manipulation", "REST Basics", "Responsive Design"],
    benchmarkAtsKeywords: ["fullstack", "intern", "student", "html", "css", "javascript"]
  },
  {
    id: "fullstack-entry", domain: "fullstack", domainLabel: "Full-Stack Developer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level Full-Stack Developer", experienceRange: "0–1 yr", summary: "Building simple end-to-end applications.",
    coreRequiredSkills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Git"],
    advancedSkills: ["Next.js", "Docker", "Tailwind CSS"],
    toolsAndPlatforms: ["GitHub", "Postman", "Vercel"],
    conceptualCompetencies: ["RESTful APIs", "Component Architecture", "State Management"],
    benchmarkAtsKeywords: ["fullstack", "entry", "react", "node.js", "typescript", "sql"]
  },
  {
    id: "fullstack-junior", domain: "fullstack", domainLabel: "Full-Stack Developer", tier: "junior", tierLabel: "Junior",
    title: "Junior Full-Stack Developer", experienceRange: "1–3 yrs", summary: "Competent in delivering full-stack features.",
    coreRequiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
    advancedSkills: ["GraphQL", "Next.js", "Redis", "AWS Basics"],
    toolsAndPlatforms: ["GitHub Actions", "Docker", "AWS"],
    conceptualCompetencies: ["Relational Database Design", "CI/CD Basics", "Testing (Jest/Cypress)"],
    benchmarkAtsKeywords: ["fullstack", "junior", "typescript", "react", "node", "docker", "postgres"]
  },
  {
    id: "fullstack-mid", domain: "fullstack", domainLabel: "Full-Stack Developer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level Full-Stack Developer", experienceRange: "3–5 yrs", summary: "Taking ownership of systems and architecture.",
    coreRequiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Docker", "GraphQL", "AWS"],
    advancedSkills: ["Microservices", "Kubernetes", "Kafka", "System Design"],
    toolsAndPlatforms: ["AWS", "Terraform", "Kubernetes", "Datadog"],
    conceptualCompetencies: ["Performance Optimization", "Scalability", "Advanced Database Indexing"],
    benchmarkAtsKeywords: ["fullstack", "mid-level", "aws", "microservices", "graphql", "redis"]
  },
  {
    id: "fullstack-senior", domain: "fullstack", domainLabel: "Full-Stack Developer", tier: "senior", tierLabel: "Senior",
    title: "Senior Full-Stack Developer", experienceRange: "5–7+ yrs", summary: "Leading large-scale architecture and distributed systems.",
    coreRequiredSkills: ["TypeScript", "Node.js", "React", "PostgreSQL", "Docker", "Kubernetes", "Microservices", "AWS"],
    advancedSkills: ["Distributed Systems", "Event-Driven Architecture", "gRPC", "Observability"],
    toolsAndPlatforms: ["Kubernetes", "Terraform", "Prometheus", "Grafana"],
    conceptualCompetencies: ["System Architecture", "High Availability", "Resilience", "Leadership"],
    benchmarkAtsKeywords: ["fullstack", "senior", "architecture", "distributed systems", "kubernetes", "microservices"]
  },
  
  // Frontend
  {
    id: "frontend-intern", domain: "frontend", domainLabel: "Frontend Developer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student Frontend Developer", experienceRange: "0 yrs / Academic", summary: "Focuses on UI fundamentals.",
    coreRequiredSkills: ["HTML", "CSS", "JavaScript"],
    advancedSkills: ["React", "Tailwind CSS"],
    toolsAndPlatforms: ["Git", "VS Code", "Figma"],
    conceptualCompetencies: ["Responsive Design", "Accessibility Basics", "DOM"],
    benchmarkAtsKeywords: ["frontend", "intern", "html", "css", "javascript"]
  },
  {
    id: "frontend-entry", domain: "frontend", domainLabel: "Frontend Developer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level Frontend Developer", experienceRange: "0–1 yr", summary: "Building basic UIs.",
    coreRequiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    advancedSkills: ["TypeScript", "Next.js", "Redux"],
    toolsAndPlatforms: ["GitHub", "Vercel", "Figma"],
    conceptualCompetencies: ["State Management", "Component Lifecycle", "CSS Architecture"],
    benchmarkAtsKeywords: ["frontend", "entry", "react", "javascript", "css"]
  },
  {
    id: "frontend-junior", domain: "frontend", domainLabel: "Frontend Developer", tier: "junior", tierLabel: "Junior",
    title: "Junior Frontend Developer", experienceRange: "1–3 yrs", summary: "Competent UI development.",
    coreRequiredSkills: ["TypeScript", "React", "HTML5", "CSS3", "Tailwind CSS", "Git"],
    advancedSkills: ["Next.js", "GraphQL", "Testing (Jest)"],
    toolsAndPlatforms: ["GitHub Actions", "Vite", "Webpack"],
    conceptualCompetencies: ["React Hooks", "Web Performance Basics", "API Integration"],
    benchmarkAtsKeywords: ["frontend", "junior", "typescript", "react", "tailwind"]
  },
  {
    id: "frontend-mid", domain: "frontend", domainLabel: "Frontend Developer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level Frontend Developer", experienceRange: "3–5 yrs", summary: "Handling complex UIs and state.",
    coreRequiredSkills: ["TypeScript", "React", "Next.js", "State Management (Redux/Zustand)", "GraphQL", "CSS-in-JS/Tailwind"],
    advancedSkills: ["Micro-frontends", "WebSockets", "Advanced Animations"],
    toolsAndPlatforms: ["AWS/Vercel", "Cypress", "Storybook"],
    conceptualCompetencies: ["Web Vitals Optimization", "Design Systems", "Client-side Architecture"],
    benchmarkAtsKeywords: ["frontend", "mid-level", "next.js", "typescript", "performance", "redux"]
  },
  {
    id: "frontend-senior", domain: "frontend", domainLabel: "Frontend Developer", tier: "senior", tierLabel: "Senior",
    title: "Senior Frontend Developer", experienceRange: "5–7+ yrs", summary: "Leading UI architecture at scale.",
    coreRequiredSkills: ["TypeScript", "React", "Next.js", "Web Performance", "Design Systems", "Testing"],
    advancedSkills: ["Micro-frontends", "WASM", "WebGL", "Module Federation"],
    toolsAndPlatforms: ["Webpack/Turbopack", "CI/CD Pipeline", "Lighthouse"],
    conceptualCompetencies: ["Frontend Architecture", "State Synchronization", "A11y Mastery", "Scaling Teams"],
    benchmarkAtsKeywords: ["frontend", "senior", "architecture", "micro-frontends", "web performance"]
  },

  // Backend
  {
    id: "backend-intern", domain: "backend", domainLabel: "Backend Developer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student Backend Developer", experienceRange: "0 yrs / Academic", summary: "Learning server basics.",
    coreRequiredSkills: ["Python", "Basic SQL", "Git"],
    advancedSkills: ["Node.js", "Express", "REST"],
    toolsAndPlatforms: ["VS Code", "Postman", "Linux Basics"],
    conceptualCompetencies: ["HTTP Methods", "Databases Basics"],
    benchmarkAtsKeywords: ["backend", "intern", "python", "sql", "api"]
  },
  {
    id: "backend-entry", domain: "backend", domainLabel: "Backend Developer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level Backend Developer", experienceRange: "0–1 yr", summary: "Building simple APIs.",
    coreRequiredSkills: ["Node.js or Python", "PostgreSQL", "REST APIs", "Git"],
    advancedSkills: ["Docker", "Redis", "TypeScript"],
    toolsAndPlatforms: ["Docker", "Postman", "GitHub"],
    conceptualCompetencies: ["Relational Data Modeling", "Authentication Basics", "Error Handling"],
    benchmarkAtsKeywords: ["backend", "entry", "node.js", "python", "postgres", "api"]
  },
  {
    id: "backend-junior", domain: "backend", domainLabel: "Backend Developer", tier: "junior", tierLabel: "Junior",
    title: "Junior Backend Developer", experienceRange: "1–3 yrs", summary: "Competent API and database design.",
    coreRequiredSkills: ["Node.js/Python/Go", "PostgreSQL", "REST APIs", "Docker", "Redis", "Git"],
    advancedSkills: ["GraphQL", "AWS Basics", "Microservices Concepts"],
    toolsAndPlatforms: ["Docker", "AWS", "GitHub Actions"],
    conceptualCompetencies: ["Database Indexing", "Caching Strategies", "CI/CD"],
    benchmarkAtsKeywords: ["backend", "junior", "sql", "docker", "redis", "aws"]
  },
  {
    id: "backend-mid", domain: "backend", domainLabel: "Backend Developer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level Backend Developer", experienceRange: "3–5 yrs", summary: "Designing scalable backend services.",
    coreRequiredSkills: ["Node.js/Go/Java/Python", "PostgreSQL", "Redis", "Docker", "Microservices", "AWS"],
    advancedSkills: ["Kubernetes", "Kafka", "gRPC", "Elasticsearch"],
    toolsAndPlatforms: ["Kubernetes", "Terraform", "Datadog"],
    conceptualCompetencies: ["System Design", "Distributed Tracing", "Query Optimization"],
    benchmarkAtsKeywords: ["backend", "mid-level", "microservices", "kafka", "kubernetes", "go"]
  },
  {
    id: "backend-senior", domain: "backend", domainLabel: "Backend Developer", tier: "senior", tierLabel: "Senior",
    title: "Senior Backend Developer", experienceRange: "5–7+ yrs", summary: "Architecting resilient distributed systems.",
    coreRequiredSkills: ["Go/Java/Node.js", "PostgreSQL", "Kubernetes", "Kafka", "Microservices", "AWS/GCP"],
    advancedSkills: ["Event Sourcing", "Service Mesh", "Database Sharding", "High Availability"],
    toolsAndPlatforms: ["Kubernetes", "Terraform", "Prometheus", "Grafana"],
    conceptualCompetencies: ["Distributed Systems", "Consistency Models", "Fault Tolerance", "Architecture"],
    benchmarkAtsKeywords: ["backend", "senior", "distributed systems", "architecture", "kubernetes", "kafka"]
  },

  // AI / ML
  {
    id: "aiml-intern", domain: "aiml", domainLabel: "AI & Machine Learning Engineer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student AI/ML Engineer", experienceRange: "0 yrs / Academic", summary: "Basic data science and ML concepts.",
    coreRequiredSkills: ["Python", "Pandas", "NumPy", "Basic Math/Stats"],
    advancedSkills: ["Scikit-Learn", "Jupyter"],
    toolsAndPlatforms: ["Jupyter Notebook", "Git"],
    conceptualCompetencies: ["Data Cleaning", "Linear Regression", "Basic Classification"],
    benchmarkAtsKeywords: ["machine learning", "intern", "python", "pandas"]
  },
  {
    id: "aiml-entry", domain: "aiml", domainLabel: "AI & Machine Learning Engineer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level AI/ML Engineer", experienceRange: "0–1 yr", summary: "Training basic models.",
    coreRequiredSkills: ["Python", "Pandas", "Scikit-Learn", "SQL", "Git"],
    advancedSkills: ["PyTorch or TensorFlow", "Docker", "API Development"],
    toolsAndPlatforms: ["Docker", "Jupyter", "GitHub"],
    conceptualCompetencies: ["Feature Engineering", "Model Evaluation", "Supervised Learning"],
    benchmarkAtsKeywords: ["machine learning", "entry", "python", "scikit-learn", "sql"]
  },
  {
    id: "aiml-junior", domain: "aiml", domainLabel: "AI & Machine Learning Engineer", tier: "junior", tierLabel: "Junior",
    title: "Junior AI/ML Engineer", experienceRange: "1–3 yrs", summary: "Deploying and managing models.",
    coreRequiredSkills: ["Python", "PyTorch/TensorFlow", "Scikit-Learn", "Pandas", "SQL", "Docker"],
    advancedSkills: ["NLP/Transformers", "MLflow", "AWS/GCP Basics"],
    toolsAndPlatforms: ["Docker", "MLflow", "AWS"],
    conceptualCompetencies: ["Deep Learning Basics", "Model Deployment", "Data Pipelines"],
    benchmarkAtsKeywords: ["machine learning", "junior", "pytorch", "tensorflow", "docker"]
  },
  {
    id: "aiml-mid", domain: "aiml", domainLabel: "AI & Machine Learning Engineer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level AI/ML Engineer", experienceRange: "3–5 yrs", summary: "Building ML pipelines and advanced models.",
    coreRequiredSkills: ["Python", "PyTorch", "Transformers (HuggingFace)", "MLOps (MLflow/Kubeflow)", "Docker", "AWS/GCP"],
    advancedSkills: ["LLMs", "RAG", "Distributed Training", "Kubernetes"],
    toolsAndPlatforms: ["Kubeflow", "AWS SageMaker", "Docker"],
    conceptualCompetencies: ["ML System Design", "Model Optimization", "Vector Search"],
    benchmarkAtsKeywords: ["machine learning", "mid-level", "pytorch", "transformers", "mlops", "llm", "rag"]
  },
  {
    id: "aiml-senior", domain: "aiml", domainLabel: "AI & Machine Learning Engineer", tier: "senior", tierLabel: "Senior",
    title: "Senior AI/ML Engineer", experienceRange: "5–7+ yrs", summary: "Leading AI architecture and large model strategies.",
    coreRequiredSkills: ["Python", "PyTorch", "LLMs", "RAG", "MLOps", "Kubernetes", "Distributed Systems"],
    advancedSkills: ["Custom Model Pretraining", "vLLM", "Triton Inference", "Agentic Workflows"],
    toolsAndPlatforms: ["Kubernetes", "Ray", "Triton", "AWS/GCP"],
    conceptualCompetencies: ["AI Architecture", "Scaling Inference", "Cost Optimization", "AI Safety"],
    benchmarkAtsKeywords: ["machine learning", "senior", "llm", "rag", "mlops", "architecture"]
  },

  // DevOps
  {
    id: "devops-intern", domain: "devops", domainLabel: "DevOps & Cloud Engineer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student DevOps Engineer", experienceRange: "0 yrs / Academic", summary: "Learning Linux and scripting.",
    coreRequiredSkills: ["Linux", "Bash", "Git"],
    advancedSkills: ["Docker", "Python"],
    toolsAndPlatforms: ["Linux CLI", "GitHub"],
    conceptualCompetencies: ["OS Fundamentals", "Networking Basics"],
    benchmarkAtsKeywords: ["devops", "intern", "linux", "bash", "git"]
  },
  {
    id: "devops-entry", domain: "devops", domainLabel: "DevOps & Cloud Engineer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level DevOps Engineer", experienceRange: "0–1 yr", summary: "CI/CD and container basics.",
    coreRequiredSkills: ["Linux", "Bash/Python", "Docker", "Git", "GitHub Actions or Jenkins"],
    advancedSkills: ["AWS Basics", "Terraform"],
    toolsAndPlatforms: ["Docker", "GitHub Actions", "AWS"],
    conceptualCompetencies: ["CI/CD Concepts", "Containerization", "Basic Cloud Services"],
    benchmarkAtsKeywords: ["devops", "entry", "docker", "ci/cd", "linux"]
  },
  {
    id: "devops-junior", domain: "devops", domainLabel: "DevOps & Cloud Engineer", tier: "junior", tierLabel: "Junior",
    title: "Junior DevOps Engineer", experienceRange: "1–3 yrs", summary: "Managing infrastructure and pipelines.",
    coreRequiredSkills: ["Linux", "Docker", "Terraform", "AWS/GCP", "CI/CD (GitHub Actions/GitLab)", "Python/Bash"],
    advancedSkills: ["Kubernetes", "Prometheus", "Ansible"],
    toolsAndPlatforms: ["Terraform", "AWS", "Docker", "GitLab CI"],
    conceptualCompetencies: ["Infrastructure as Code", "Networking (VPC, Subnets)", "Monitoring Basics"],
    benchmarkAtsKeywords: ["devops", "junior", "terraform", "aws", "docker", "ci/cd"]
  },
  {
    id: "devops-mid", domain: "devops", domainLabel: "DevOps & Cloud Engineer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level DevOps Engineer", experienceRange: "3–5 yrs", summary: "Kubernetes and infrastructure automation.",
    coreRequiredSkills: ["Kubernetes", "Terraform", "AWS/GCP", "Docker", "CI/CD", "Prometheus/Grafana"],
    advancedSkills: ["Service Mesh (Istio)", "ArgoCD", "Helm", "Security/DevSecOps"],
    toolsAndPlatforms: ["Kubernetes", "Terraform", "ArgoCD", "Datadog/Prometheus"],
    conceptualCompetencies: ["GitOps", "High Availability", "Cluster Management", "Observability"],
    benchmarkAtsKeywords: ["devops", "mid-level", "kubernetes", "terraform", "aws", "gitops"]
  },
  {
    id: "devops-senior", domain: "devops", domainLabel: "DevOps & Cloud Engineer", tier: "senior", tierLabel: "Senior",
    title: "Senior DevOps Engineer", experienceRange: "5–7+ yrs", summary: "Platform engineering and resilient architecture.",
    coreRequiredSkills: ["Kubernetes", "Terraform", "Cloud Architecture (AWS/GCP)", "Observability", "GitOps", "Go/Python"],
    advancedSkills: ["Platform Engineering", "FinOps", "Advanced Networking", "SRE Practices"],
    toolsAndPlatforms: ["Kubernetes", "Terraform", "AWS/GCP", "Datadog", "ArgoCD"],
    conceptualCompetencies: ["Platform Engineering", "SRE Concepts (SLOs/SLIs)", "Disaster Recovery", "Zero Trust Security"],
    benchmarkAtsKeywords: ["devops", "senior", "kubernetes", "sre", "architecture", "platform engineering"]
  },

  // Data Science
  {
    id: "datascience-intern", domain: "datascience", domainLabel: "Data Scientist", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student Data Scientist", experienceRange: "0 yrs / Academic", summary: "Data manipulation basics.",
    coreRequiredSkills: ["Python", "Pandas", "Basic SQL", "Excel"],
    advancedSkills: ["Matplotlib", "Seaborn"],
    toolsAndPlatforms: ["Jupyter Notebook"],
    conceptualCompetencies: ["Data Cleaning", "Descriptive Statistics"],
    benchmarkAtsKeywords: ["data science", "intern", "python", "pandas", "sql"]
  },
  {
    id: "datascience-entry", domain: "datascience", domainLabel: "Data Scientist", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level Data Scientist", experienceRange: "0–1 yr", summary: "Data analysis and basic modeling.",
    coreRequiredSkills: ["Python", "SQL", "Pandas", "Data Visualization (Tableau/Matplotlib)", "Statistics"],
    advancedSkills: ["Scikit-Learn", "A/B Testing"],
    toolsAndPlatforms: ["Jupyter Notebook", "Tableau/PowerBI", "Git"],
    conceptualCompetencies: ["Exploratory Data Analysis", "Hypothesis Testing", "Data Storytelling"],
    benchmarkAtsKeywords: ["data science", "entry", "python", "sql", "tableau"]
  },
  {
    id: "datascience-junior", domain: "datascience", domainLabel: "Data Scientist", tier: "junior", tierLabel: "Junior",
    title: "Junior Data Scientist", experienceRange: "1–3 yrs", summary: "Statistical analysis and predictive modeling.",
    coreRequiredSkills: ["Python", "SQL", "Pandas", "Scikit-Learn", "A/B Testing", "Data Visualization"],
    advancedSkills: ["Machine Learning", "Spark Basics", "AWS/GCP Basics"],
    toolsAndPlatforms: ["Jupyter", "Airflow", "AWS/GCP"],
    conceptualCompetencies: ["Predictive Modeling", "Experiment Design", "Feature Engineering"],
    benchmarkAtsKeywords: ["data science", "junior", "python", "sql", "machine learning", "a/b testing"]
  },
  {
    id: "datascience-mid", domain: "datascience", domainLabel: "Data Scientist", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level Data Scientist", experienceRange: "3–5 yrs", summary: "Advanced analytics and ML applications.",
    coreRequiredSkills: ["Python", "SQL", "Machine Learning (Scikit-Learn/XGBoost)", "Spark", "Airflow", "A/B Testing"],
    advancedSkills: ["Deep Learning", "NLP", "Causal Inference", "Snowflake/BigQuery"],
    toolsAndPlatforms: ["Spark", "Airflow", "Snowflake/BigQuery", "Docker"],
    conceptualCompetencies: ["Advanced ML Models", "Data Pipelines", "Causal Inference"],
    benchmarkAtsKeywords: ["data science", "mid-level", "machine learning", "spark", "sql", "xgboost"]
  },
  {
    id: "datascience-senior", domain: "datascience", domainLabel: "Data Scientist", tier: "senior", tierLabel: "Senior",
    title: "Senior Data Scientist", experienceRange: "5–7+ yrs", summary: "Leading data strategy and advanced AI applications.",
    coreRequiredSkills: ["Python", "SQL", "Advanced ML/DL", "Spark/Distributed Data", "Cloud Architecture", "Experimentation"],
    advancedSkills: ["LLMs", "Recommendation Systems", "Data Strategy", "MLOps"],
    toolsAndPlatforms: ["Spark", "Databricks", "Cloud (AWS/GCP)", "Kubernetes"],
    conceptualCompetencies: ["Data Strategy", "Algorithm Design", "Production ML", "Leadership"],
    benchmarkAtsKeywords: ["data science", "senior", "advanced analytics", "machine learning", "strategy"]
  },

  // Cybersecurity
  {
    id: "cybersecurity-intern", domain: "cybersecurity", domainLabel: "Cybersecurity Analyst & Engineer", tier: "intern", tierLabel: "Intern / Student",
    title: "Intern / Student Cybersecurity Analyst", experienceRange: "0 yrs / Academic", summary: "Learning networking and security concepts.",
    coreRequiredSkills: ["Networking (TCP/IP)", "Linux Basics", "Security Fundamentals"],
    advancedSkills: ["Python", "Bash"],
    toolsAndPlatforms: ["Wireshark", "Linux CLI"],
    conceptualCompetencies: ["CIA Triad", "OSI Model"],
    benchmarkAtsKeywords: ["cybersecurity", "intern", "networking", "linux"]
  },
  {
    id: "cybersecurity-entry", domain: "cybersecurity", domainLabel: "Cybersecurity Analyst & Engineer", tier: "entry", tierLabel: "Entry-Level",
    title: "Entry-Level Cybersecurity Analyst", experienceRange: "0–1 yr", summary: "Monitoring and vulnerability scanning.",
    coreRequiredSkills: ["Networking", "Linux", "Windows Security", "Vulnerability Scanning", "Python/Bash"],
    advancedSkills: ["SIEM Basics", "Cloud Security Basics"],
    toolsAndPlatforms: ["Wireshark", "Nmap", "Nessus"],
    conceptualCompetencies: ["Vulnerability Management", "Incident Response Basics", "OWASP Top 10"],
    benchmarkAtsKeywords: ["cybersecurity", "entry", "nmap", "vulnerability scanning", "linux"]
  },
  {
    id: "cybersecurity-junior", domain: "cybersecurity", domainLabel: "Cybersecurity Analyst & Engineer", tier: "junior", tierLabel: "Junior",
    title: "Junior Cybersecurity Engineer", experienceRange: "1–3 yrs", summary: "Incident response and infrastructure security.",
    coreRequiredSkills: ["Networking", "Linux/Windows Admin", "SIEM (Splunk/Elastic)", "Vulnerability Management", "Python", "Cloud Basics"],
    advancedSkills: ["Penetration Testing", "Threat Hunting", "IAM"],
    toolsAndPlatforms: ["Splunk/ELK", "Nmap", "Burp Suite", "AWS/GCP"],
    conceptualCompetencies: ["Incident Response", "Web Security", "Cryptography Basics"],
    benchmarkAtsKeywords: ["cybersecurity", "junior", "siem", "incident response", "python", "owasp"]
  },
  {
    id: "cybersecurity-mid", domain: "cybersecurity", domainLabel: "Cybersecurity Analyst & Engineer", tier: "mid", tierLabel: "Mid-Level",
    title: "Mid-Level Cybersecurity Engineer", experienceRange: "3–5 yrs", summary: "Advanced threat defense and cloud security.",
    coreRequiredSkills: ["Cloud Security (AWS/GCP)", "SIEM", "Penetration Testing", "IAM", "DevSecOps", "Python/Go"],
    advancedSkills: ["Kubernetes Security", "Zero Trust", "Malware Analysis"],
    toolsAndPlatforms: ["Splunk", "Burp Suite Pro", "Terraform", "Docker/K8s Security Tools"],
    conceptualCompetencies: ["Zero Trust Architecture", "Threat Modeling", "DevSecOps Integration"],
    benchmarkAtsKeywords: ["cybersecurity", "mid-level", "cloud security", "devsecops", "penetration testing"]
  },
  {
    id: "cybersecurity-senior", domain: "cybersecurity", domainLabel: "Cybersecurity Analyst & Engineer", tier: "senior", tierLabel: "Senior",
    title: "Senior Cybersecurity Engineer", experienceRange: "5–7+ yrs", summary: "Security architecture and enterprise risk management.",
    coreRequiredSkills: ["Security Architecture", "Cloud Security", "Zero Trust", "DevSecOps", "Threat Intelligence", "Compliance (SOC2/ISO)"],
    advancedSkills: ["Red Teaming", "Enterprise Risk Management", "Cryptography"],
    toolsAndPlatforms: ["Enterprise SIEM", "Cloud Native Security", "Kubernetes"],
    conceptualCompetencies: ["Security Strategy", "Compliance Frameworks", "Advanced Threat Mitigation", "Leadership"],
    benchmarkAtsKeywords: ["cybersecurity", "senior", "security architecture", "zero trust", "compliance"]
  }
];
