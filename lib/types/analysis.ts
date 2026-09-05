import { ExperienceTier, TargetRole } from '@/types/onboarding';
import { CandidateProfile } from './profile';

export type SkillCategory = 'core' | 'stretch' | 'tool' | 'concept';
export type SkillStatus = 'mastered' | 'critical' | 'recommended';

export interface SkillGapItem {
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  importance: 'urgent' | 'high' | 'medium' | 'low';
  matchDegree: number; // 0.0 to 1.0
  candidateEvidence?: string; // e.g. "Found in projects: Next.js"
  explanation: string;
}

export interface SkillGapAnalysis {
  targetBenchmarkId: string;
  targetDomain: TargetRole;
  targetTier: ExperienceTier;
  overallMatchPercentage: number;
  coreMatchPercentage: number;
  stretchMatchPercentage: number;
  toolsMatchPercentage: number;
  masteredSkills: SkillGapItem[];
  criticalGaps: SkillGapItem[];
  recommendedGaps: SkillGapItem[];
  missingTools: string[];
  totalSkillsEvaluated: number;
}

export interface CareerMatch {
  domain: TargetRole;
  domainLabel: string;
  tier: ExperienceTier;
  tierLabel: string;
  matchPercentage: number;
  corePercentage: number;
  stretchPercentage: number;
  fitLevel: 'direct_fit' | 'high_potential' | 'stretch_target' | 'foundational';
  criticalGapCount: number;
  masteredCount: number;
  topStrengths: string[];
  topGaps: string[];
}

export type ResourceType = 
  | 'youtube_course' 
  | 'youtube_playlist' 
  | 'official_docs' 
  | 'free_book' 
  | 'interactive_guide';

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  type: ResourceType;
  duration: string;
  skills: string[];
  domains: TargetRole[];
  minTier: ExperienceTier;
  maxTier: ExperienceTier;
  description: string;
  isFree: true;
  featured?: boolean;
}

export interface ActionPlanMilestone {
  id: string;
  title: string;
  description: string;
  targetWeek: number; // 1 to 12
  completed: boolean;
  category: 'learning' | 'project' | 'ats' | 'interview';
  verificationCriteria: string;
}

export interface ActionPlanWeek {
  weekNumber: number; // 1 to 12
  title: string;
  focusArea: string;
  tasks: string[];
  skillsTargeted: string[];
  milestones: ActionPlanMilestone[];
  resourceIds: string[];
}

export interface ActionPlanPhase {
  phaseId: 'days_1_30' | 'days_31_60' | 'days_61_90';
  daysLabel: 'Days 1–30' | 'Days 31–60' | 'Days 61–90';
  title: string;
  theme: string;
  objective: string;
  weeks: ActionPlanWeek[];
}

export interface ActionPlan {
  id: string;
  targetDomain: TargetRole;
  targetTier: ExperienceTier;
  summary: string;
  totalWeeks: number;
  estimatedHoursPerWeek: number;
  phases: ActionPlanPhase[];
  generatedAt: string;
}

export interface AtsBulletOptimization {
  originalBullet: string;
  identifiedIssue: 'missing_metrics' | 'weak_verb' | 'too_vague' | 'missing_keywords';
  xyzRewrites: string[];
}

export interface AtsEvaluation {
  overallScore: number;
  pillars: {
    keywordCoverage: number;
    impactDensity: number;
    actionVerbStrength: number;
    sectionCompleteness: number;
  };
  matchedKeywords: string[];
  missingCriticalKeywords: string[];
  weakBullets: AtsBulletOptimization[];
  strongVerbsUsed: string[];
  weakVerbsUsed: string[];
  metricsFound: number;
}

export interface ComprehensiveAnalysisResult {
  profile: CandidateProfile;
  primaryMatch: CareerMatch;
  allDomainMatches: CareerMatch[];
  skillGapAnalysis: SkillGapAnalysis;
  resources: LearningResource[];
  actionPlan: ActionPlan;
  atsEvaluation?: AtsEvaluation;
}
