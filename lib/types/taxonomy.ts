import { ExperienceTier, TargetRole } from '@/types/onboarding';

export interface RoleBenchmark {
  id: string; // e.g. "fullstack-junior"
  domain: TargetRole;
  domainLabel: string;
  tier: ExperienceTier;
  tierLabel: string;
  title: string;
  experienceRange: string;
  summary: string;
  coreRequiredSkills: string[];
  advancedSkills: string[];
  toolsAndPlatforms: string[];
  conceptualCompetencies: string[];
  benchmarkAtsKeywords: string[];
}
