export const ALIAS_DICTIONARY: Record<string, string> = {
  // Frontend
  'js': 'javascript',
  'reactjs': 'react',
  'nextjs': 'next.js',
  'vuejs': 'vue',
  'angularjs': 'angular',
  'html5': 'html',
  'css3': 'css',
  'rn': 'react native',
  'nuxtjs': 'nuxt',
  'sveltekit': 'svelte',
  'tailwind': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'mui': 'material-ui',
  'material ui': 'material-ui',
  'styled components': 'styled-components',
  'bootstrap5': 'bootstrap',
  'redux toolkit': 'redux',
  'rtk': 'redux',
  'vuex': 'pinia',
  'mobx': 'mobx',

  // Backend
  'ts': 'typescript',
  'py': 'python',
  'golang': 'go',
  'node': 'node.js',
  'express.js': 'express',
  'expressjs': 'express',
  'nest': 'nestjs',
  'nest.js': 'nestjs',
  'django framework': 'django',
  'drf': 'django rest framework',
  'flask framework': 'flask',
  'fast api': 'fastapi',
  'spring boot': 'spring',
  'springboot': 'spring',
  'ruby on rails': 'rails',
  'ror': 'rails',
  'asp.net': 'dotnet',
  '.net core': 'dotnet',
  '.net': 'dotnet',
  'c#': 'csharp',
  'c++': 'cpp',
  'java ee': 'java',
  'j2ee': 'java',
  'php8': 'php',
  'laravel framework': 'laravel',

  // Cloud/DevOps
  'aws': 'aws',
  'amazon web services': 'aws',
  'gcp': 'gcp',
  'google cloud': 'gcp',
  'google cloud platform': 'gcp',
  'azure': 'microsoft azure',
  'k8s': 'kubernetes',
  'tf': 'terraform',
  'gh actions': 'github actions',
  'github-actions': 'github actions',
  'gitlab ci': 'gitlab',
  'git lab': 'gitlab',
  'bitbucket pipelines': 'bitbucket',
  'ci/cd': 'ci/cd',
  'cicd': 'ci/cd',
  'continuous integration': 'ci/cd',
  'docker compose': 'docker',
  'docker-compose': 'docker',
  'ansible': 'ansible',
  'chef': 'chef',
  'puppet': 'puppet',
  'jenkins ci': 'jenkins',

  // Databases
  'postgres': 'postgresql',
  'psql': 'postgresql',
  'mongo': 'mongodb',
  'mysql db': 'mysql',
  'maria db': 'mariadb',
  'sql server': 'mssql',
  'ms sql': 'mssql',
  'ms sql server': 'mssql',
  'oracle db': 'oracle',
  'dynamo': 'dynamodb',
  'cassandra db': 'cassandra',
  'redis db': 'redis',
  'elastic search': 'elasticsearch',
  'es': 'elasticsearch',
  'couch': 'couchdb',
  'neo4j db': 'neo4j',
  'snowflake db': 'snowflake',
  'redshift': 'aws redshift',
  'bq': 'bigquery',
  'google bigquery': 'bigquery',

  // AI/ML/Data Science
  'ml': 'machine learning',
  'dl': 'deep learning',
  'llm': 'llms',
  'llms': 'llms',
  'large language models': 'llms',
  'nlp': 'natural language processing',
  'cv': 'computer vision',
  'genai': 'generative ai',
  'pandas': 'pandas',
  'numpy': 'numpy',
  'scikit-learn': 'scikit-learn',
  'sklearn': 'scikit-learn',
  'tensorflow': 'tensorflow',
  'tf2': 'tensorflow',
  'pytorch': 'pytorch',
  'torch': 'pytorch',
  'keras': 'keras',
  'spacy': 'spacy',
  'nltk': 'nltk',
  'hf': 'hugging face',
  'huggingface': 'hugging face',
  'openai api': 'openai',
  'midjourney': 'midjourney',
  'stable diffusion': 'stable diffusion',
  'sd': 'stable diffusion',
  'data eng': 'data engineering',
  'data sci': 'data science',

  // Cybersecurity
  'infosec': 'information security',
  'appsec': 'application security',
  'pentesting': 'penetration testing',
  'pen testing': 'penetration testing',
  'ethical hacking': 'penetration testing',
  'soc': 'security operations',
  'siem': 'siem',
  'iam': 'identity and access management',
  'owasp': 'owasp',
  'kali': 'kali linux',
  'wireshark': 'wireshark',
  'nmap': 'nmap',
  'burp suite': 'burpsuite',
  'burp': 'burpsuite',

  // Testing/APIs
  'restful apis': 'rest apis',
  'rest api': 'rest apis',
  'restful api': 'rest apis',
  'rest': 'rest apis',
  'graphql api': 'graphql',
  'gql': 'graphql',
  'grpc api': 'grpc',
  'soap api': 'soap',
  'tdd': 'test driven development',
  'bdd': 'behavior driven development',
  'jestjs': 'jest',
  'mocha js': 'mocha',
  'cypress io': 'cypress',
  'cypress.io': 'cypress',
  'playwright testing': 'playwright',
  'selenium webdriver': 'selenium',
  'appium': 'appium',
  'postman': 'postman',
  'swagger': 'openapi',
  'open api': 'openapi'
};

const NOISE_WORDS = ['.js', 'js', 'framework', 'library', 'technologies', 'db', 'database'];

export function sanitizeText(text: string): string {
  if (!text) return '';
  let sanitized = text.trim().toLowerCase();
  
  // Remove version numbers like "Python 3.11" -> "Python"
  sanitized = sanitized.replace(/\s\d+(\.\d+)*$/, '');

  for (const noise of NOISE_WORDS) {
    if (sanitized.endsWith(noise) && sanitized !== noise) {
      if (sanitized.replace(noise, '').trim().length > 0) {
        // e.g. "react.js" -> "react", "node.js" -> "node"
        sanitized = sanitized.slice(0, -noise.length).trim();
      }
    }
  }

  return sanitized;
}

export function normalizeSkill(skill: string): string {
  const sanitized = sanitizeText(skill);
  return ALIAS_DICTIONARY[sanitized] || sanitized;
}

export function normalizeSkills(skills: string[]): string[] {
  if (!skills) return [];
  return Array.from(new Set(skills.map(normalizeSkill)));
}
