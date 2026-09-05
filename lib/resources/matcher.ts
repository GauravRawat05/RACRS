import { SkillGapAnalysis, LearningResource, SkillGapItem } from '../types/analysis';
import { resourceCatalog } from './catalog';
import { ExperienceTier, TargetRole } from '@/types/onboarding';

const tierWeight: Record<ExperienceTier, number> = {
  'intern': 1,
  'entry': 2,
  'junior': 3,
  'mid': 4,
  'senior': 5
};

export function getResourcesForGaps(
  gapAnalysis: SkillGapAnalysis,
  candidateTier: ExperienceTier,
  targetDomain: TargetRole
): LearningResource[] {
  // Determine tier numeric value
  const candidateTierLevel = tierWeight[candidateTier];

  // Extract all gaps
  const allGaps = [
    ...gapAnalysis.criticalGaps,
    ...gapAnalysis.recommendedGaps
  ];

  // Extract missing tools
  const toolGaps: Partial<SkillGapItem>[] = gapAnalysis.missingTools.map(tool => ({
    name: tool,
    category: 'tool'
  }));

  const searchKeywords = new Set<string>();
  allGaps.forEach(gap => searchKeywords.add(gap.name.toLowerCase()));
  toolGaps.forEach(gap => {
    if (gap.name) searchKeywords.add(gap.name.toLowerCase());
  });

  // Filter and score resources
  const scoredResources = resourceCatalog
    .filter(res => {
      if (!res.isFree) return false;
      
      const minLevel = tierWeight[res.minTier];
      const maxLevel = tierWeight[res.maxTier];
      
      if (candidateTierLevel < minLevel || candidateTierLevel > maxLevel) {
        return false;
      }
      
      if (!res.domains.includes(targetDomain) && !res.featured) {
        return false;
      }
      
      return true;
    })
    .map(res => {
      let score = 0;
      
      if (res.domains.includes(targetDomain)) score += 10;
      if (res.featured) score += 5;
      
      const matchedSkills = res.skills.filter(s => searchKeywords.has(s.toLowerCase()));
      score += matchedSkills.length * 3;
      
      if (tierWeight[res.minTier] === candidateTierLevel) score += 2;
      
      return { resource: res, score, matchedSkillsCount: matchedSkills.length };
    })
    .filter(res => res.score > 0 || res.resource.featured)
    .sort((a, b) => {
      if (b.matchedSkillsCount !== a.matchedSkillsCount) {
        return b.matchedSkillsCount - a.matchedSkillsCount;
      }
      return b.score - a.score;
    });

  return scoredResources.slice(0, 5).map(r => r.resource);
}
