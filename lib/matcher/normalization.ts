export const ALIAS_DICTIONARY: Record<string, string> = {
  'ts': 'typescript',
  'js': 'javascript',
  'py': 'python',
  'postgres': 'postgresql',
  'psql': 'postgresql',
  'mongo': 'mongodb',
  'k8s': 'kubernetes',
  'tf': 'terraform',
  'gh actions': 'github actions',
  'aws': 'aws',
  'amazon web services': 'aws',
  'gcp': 'gcp',
  'google cloud': 'gcp',
  'reactjs': 'react',
  'nextjs': 'next.js',
  'vuejs': 'vue',
  'restful apis': 'rest apis',
  'rest api': 'rest apis',
  'restful api': 'rest apis',
  'rest': 'rest apis',
  'ci/cd': 'ci/cd',
  'cicd': 'ci/cd',
  'continuous integration': 'ci/cd',
  'ml': 'machine learning',
  'dl': 'deep learning',
  'llm': 'llms',
  'llms': 'llms',
  'large language models': 'llms',
  'golang': 'go',
  'c++': 'cpp',
  'node': 'node.js',
  'express.js': 'express',
  'expressjs': 'express'
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
