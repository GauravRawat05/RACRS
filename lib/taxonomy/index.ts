import { RoleBenchmark } from '../types/taxonomy';
import { ExperienceTier, TargetRole } from '@/types/onboarding';
import { ALL_ROLE_BENCHMARKS } from './benchmarks';

export function getRoleBenchmark(domain: TargetRole, tier: ExperienceTier): RoleBenchmark {
  const benchmark = ALL_ROLE_BENCHMARKS.find(
    (b) => b.domain === domain && b.tier === tier
  );
  if (!benchmark) {
    // Fallback to junior tier or first match
    return (
      ALL_ROLE_BENCHMARKS.find((b) => b.domain === domain) ||
      ALL_ROLE_BENCHMARKS[0]
    );
  }
  return benchmark;
}

export function listDomains(): { value: TargetRole; label: string }[] {
  return [
    { value: 'fullstack', label: 'Full-Stack Developer' },
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'aiml', label: 'AI & Machine Learning Engineer' },
    { value: 'devops', label: 'DevOps & Cloud Engineer' },
    { value: 'datascience', label: 'Data Scientist' },
    { value: 'cybersecurity', label: 'Cybersecurity Analyst & Engineer' },
  ];
}

export function listTiers(): { value: ExperienceTier; label: string; range: string }[] {
  return [
    { value: 'intern', label: 'Intern / Student', range: '0 yrs / Academic' },
    { value: 'entry', label: 'Entry-Level', range: '0–1 yr' },
    { value: 'junior', label: 'Junior', range: '1–3 yrs' },
    { value: 'mid', label: 'Mid-Level', range: '3–5 yrs' },
    { value: 'senior', label: 'Senior', range: '5–7+ yrs' },
  ];
}
