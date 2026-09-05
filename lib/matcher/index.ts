import { ExperienceTier, TargetRole } from '@/types/onboarding';
import { CandidateProfile } from '../types/profile';
import { RoleBenchmark } from '../types/taxonomy';
import { ALL_ROLE_BENCHMARKS } from '../taxonomy/benchmarks';
import { normalizeSkill, normalizeSkills, sanitizeText } from './normalization';
import { SkillCategory, SkillGapItem, SkillStatus, SkillGapAnalysis, CareerMatch } from '../types/analysis';

const ECOSYSTEM_EQUIVALENTS: Record<string, string[]> = {
  'react': ['vue', 'angular', 'svelte'],
  'postgresql': ['mysql', 'mongodb', 'sql server', 'oracle', 'sqlite', 'mariadb'],
  'express': ['fastapi', 'flask', 'django', 'spring boot', 'gin', 'nestjs'],
  'aws': ['gcp', 'azure', 'digitalocean'],
  'node.js': ['python', 'go', 'ruby', 'java', 'c#'],
};

// Simple Levenshtein distance
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function matchDegree(benchmarkSkill: string, candidateSkills: string[]): number {
  const normBench = normalizeSkill(benchmarkSkill);
  
  // Full Match
  if (candidateSkills.includes(normBench)) {
    return 1.0;
  }

  // Check Partial Match
  let maxDegree = 0.0;

  for (const candSkill of candidateSkills) {
    if (candSkill.includes(normBench) || normBench.includes(candSkill)) {
      maxDegree = Math.max(maxDegree, 0.7);
    }

    if (normBench.length >= 5 && candSkill.length >= 5) {
      if (levenshteinDistance(normBench, candSkill) <= 1) {
        maxDegree = Math.max(maxDegree, 0.9);
      }
    }
  }

  // Check Ecosystem Equivalence
  const siblings = ECOSYSTEM_EQUIVALENTS[normBench];
  if (siblings) {
    for (const sib of siblings) {
      if (candidateSkills.includes(sib)) {
        maxDegree = Math.max(maxDegree, 0.6);
      }
    }
  }

  return maxDegree;
}

const TIER_WEIGHTS: Record<ExperienceTier, { core: number; stretch: number }> = {
  intern: { core: 0.80, stretch: 0.20 },
  entry: { core: 0.75, stretch: 0.25 },
  junior: { core: 0.70, stretch: 0.30 },
  mid: { core: 0.65, stretch: 0.35 },
  senior: { core: 0.60, stretch: 0.40 },
};

function getCandidateSkillPool(profile: CandidateProfile): string[] {
  let allSkills = [
    ...profile.hardSkills,
    ...profile.toolsAndFrameworks,
    ...(profile.projects || []).flatMap(p => p.technologies || [])
  ];
  return normalizeSkills(allSkills);
}

function evaluateSkills(
  benchSkills: string[], 
  candSkills: string[], 
  category: SkillCategory,
  isCore: boolean
): { score: number, items: SkillGapItem[] } {
  if (benchSkills.length === 0) return { score: 100, items: [] };

  let totalDegree = 0;
  const items: SkillGapItem[] = [];

  for (const bSkill of benchSkills) {
    const degree = matchDegree(bSkill, candSkills);
    totalDegree += degree;

    let status: SkillStatus;
    if (degree >= 0.8) {
      status = 'mastered';
    } else if (isCore && degree < 0.5) {
      status = 'critical';
    } else {
      status = 'recommended';
    }

    let importance: SkillGapItem['importance'] = 'low';
    if (status === 'critical') importance = 'urgent';
    else if (status === 'recommended') importance = isCore ? 'high' : 'medium';

    items.push({
      name: bSkill,
      category,
      status,
      importance,
      matchDegree: degree,
      explanation: status === 'critical' ? 'Core missing skill' : (status === 'mastered' ? 'Demonstrated proficiency' : 'Partial match or missing stretch skill')
    });
  }

  const score = (totalDegree / benchSkills.length) * 100;
  return { score, items };
}

export function analyzeSkillGaps(profile: CandidateProfile, benchmark: RoleBenchmark): SkillGapAnalysis {
  const pool = getCandidateSkillPool(profile);

  const coreEval = evaluateSkills(benchmark.coreRequiredSkills, pool, 'core', true);
  const stretchEval = evaluateSkills(benchmark.advancedSkills, pool, 'stretch', false);
  const toolsEval = evaluateSkills(benchmark.toolsAndPlatforms, pool, 'tool', false);

  const weights = TIER_WEIGHTS[benchmark.tier];
  
  const overallMatchPercentage = Math.round((weights.core * coreEval.score) + (weights.stretch * stretchEval.score));

  const allItems = [...coreEval.items, ...stretchEval.items, ...toolsEval.items];
  
  const masteredSkills = allItems.filter(i => i.status === 'mastered');
  const criticalGaps = allItems.filter(i => i.status === 'critical');
  const recommendedGaps = allItems.filter(i => i.status === 'recommended');

  const missingTools = toolsEval.items.filter(i => i.status !== 'mastered').map(i => i.name);

  return {
    targetBenchmarkId: benchmark.id,
    targetDomain: benchmark.domain,
    targetTier: benchmark.tier,
    overallMatchPercentage: Math.max(0, Math.min(100, overallMatchPercentage)),
    coreMatchPercentage: Math.round(coreEval.score),
    stretchMatchPercentage: Math.round(stretchEval.score),
    toolsMatchPercentage: Math.round(toolsEval.score),
    masteredSkills,
    criticalGaps,
    recommendedGaps,
    missingTools,
    totalSkillsEvaluated: allItems.length
  };
}

export function getRoleBenchmark(domain: TargetRole, tier: ExperienceTier): RoleBenchmark {
  const found = ALL_ROLE_BENCHMARKS.find(b => b.domain === domain && b.tier === tier);
  if (!found) {
    return ALL_ROLE_BENCHMARKS[0];
  }
  return found;
}

export function calculateAllDomainMatches(profile: CandidateProfile, tier: ExperienceTier): CareerMatch[] {
  const pool = getCandidateSkillPool(profile);
  const matches: CareerMatch[] = [];

  const tierBenchmarks = ALL_ROLE_BENCHMARKS.filter(b => b.tier === tier);

  for (const b of tierBenchmarks) {
    const analysis = analyzeSkillGaps(profile, b);
    
    let fitLevel: CareerMatch['fitLevel'] = 'foundational';
    if (analysis.overallMatchPercentage >= 80) fitLevel = 'direct_fit';
    else if (analysis.overallMatchPercentage >= 60) fitLevel = 'high_potential';
    else if (analysis.overallMatchPercentage >= 40) fitLevel = 'stretch_target';

    matches.push({
      domain: b.domain,
      domainLabel: b.domainLabel,
      tier: b.tier,
      tierLabel: b.tierLabel,
      matchPercentage: analysis.overallMatchPercentage,
      corePercentage: analysis.coreMatchPercentage,
      stretchPercentage: analysis.stretchMatchPercentage,
      fitLevel,
      criticalGapCount: analysis.criticalGaps.length,
      masteredCount: analysis.masteredSkills.length,
      topStrengths: analysis.masteredSkills.slice(0, 3).map(i => i.name),
      topGaps: [...analysis.criticalGaps, ...analysis.recommendedGaps].slice(0, 3).map(i => i.name)
    });
  }

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
