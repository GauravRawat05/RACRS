import { AtsEvaluation, AtsBulletOptimization } from '@/lib/types/analysis';
import { CandidateProfile } from '@/lib/types/profile';
import { RoleBenchmark } from '@/lib/types/taxonomy';

const STRONG_VERBS = ['spearheaded', 'architected', 'orchestrated', 'engineered', 'maximized', 'optimized', 'transformed', 'implemented', 'designed', 'developed', 'led', 'managed', 'created', 'built', 'reduced', 'increased', 'improved'];
const WEAK_VERBS = ['helped', 'assisted', 'worked on', 'responsible for', 'handled', 'participated in', 'did', 'made'];
const METRIC_REGEX = /\b(\d+%|\$?\d+(?:\.\d+)?(?:k|m|b)?|\d+\+?)\b/gi;

function extractBullets(text: string): string[] {
  // simple parser to get bullet points
  const lines = text.split('\n');
  return lines.map(l => l.trim()).filter(l => l.startsWith('-') || l.startsWith('•')).map(l => l.substring(1).trim());
}

export function evaluateAtsScore(profile: CandidateProfile, benchmark: RoleBenchmark, resumeText: string): AtsEvaluation {
  // 1. Keyword Coverage (35%)
  const benchmarkKeywords = [
    ...benchmark.coreRequiredSkills.map(s => s.toLowerCase()),
    ...benchmark.advancedSkills.map(s => s.toLowerCase()),
    ...benchmark.toolsAndPlatforms.map(t => t.toLowerCase())
  ];
  
  const textLower = resumeText.toLowerCase();
  const matchedKeywords = benchmarkKeywords.filter(kw => textLower.includes(kw));
  const missingCriticalKeywords = benchmark.coreRequiredSkills.map(s => s.toLowerCase()).filter(kw => !textLower.includes(kw));
  
  const keywordCoverage = benchmarkKeywords.length > 0 
    ? (matchedKeywords.length / benchmarkKeywords.length) * 100 
    : 100;
  const keywordScore = (keywordCoverage / 100) * 35;

  // 2. Impact Density & 3. Action Verb Strength
  const bullets = extractBullets(resumeText);
  let metricsFound = 0;
  let strongVerbsUsed: string[] = [];
  let weakVerbsUsed: string[] = [];
  let weakBullets: AtsBulletOptimization[] = [];

  bullets.forEach(bullet => {
    const bLower = bullet.toLowerCase();
    
    // Check Metrics
    const metricsMatch = bullet.match(METRIC_REGEX);
    let hasMetrics = false;
    if (metricsMatch && metricsMatch.length > 0) {
      metricsFound += metricsMatch.length;
      hasMetrics = true;
    }

    // Check Verbs
    let hasStrong = false;
    let hasWeak = false;
    
    STRONG_VERBS.forEach(v => {
      if (bLower.startsWith(v) || bLower.includes(` ${v} `)) {
        strongVerbsUsed.push(v);
        hasStrong = true;
      }
    });

    WEAK_VERBS.forEach(v => {
      if (bLower.startsWith(v) || bLower.includes(` ${v} `)) {
        weakVerbsUsed.push(v);
        hasWeak = true;
      }
    });

    if (!hasMetrics || hasWeak || !hasStrong) {
      let issue: 'missing_metrics' | 'weak_verb' | 'too_vague' | 'missing_keywords' = 'missing_metrics';
      if (hasWeak) issue = 'weak_verb';
      else if (!hasStrong) issue = 'too_vague';
      else if (!hasMetrics) issue = 'missing_metrics';

      // Pick some candidate keywords to use in rewrites
      const candidateTools = profile.toolsAndFrameworks.slice(0, 2).join(' and ') || 'modern tools';
      const actionVerb = hasStrong ? 'Implemented' : 'Engineered';

      weakBullets.push({
        originalBullet: bullet,
        identifiedIssue: issue,
        xyzRewrites: [
          `Accomplished improved performance as measured by 20% increase in efficiency, by doing ${bullet.toLowerCase().replace(/^(helped with|worked on|responsible for)/, 'development of')} using ${candidateTools}`,
          `${actionVerb} scalable solutions achieving 15% reduction in latency through optimized ${candidateTools} configurations`,
          `Led development of new features, resulting in 30% faster load times by utilizing ${candidateTools}`
        ]
      });
    }
  });

  const impactDensity = bullets.length > 0 ? Math.min(100, (metricsFound / bullets.length) * 100) : 0;
  const impactScore = (impactDensity / 100) * 25;

  // Unique verbs
  strongVerbsUsed = Array.from(new Set(strongVerbsUsed));
  weakVerbsUsed = Array.from(new Set(weakVerbsUsed));

  const actionVerbStrength = bullets.length > 0 ? Math.min(100, (strongVerbsUsed.length / bullets.length) * 100) : 0;
  let actionVerbScore = (actionVerbStrength / 100) * 20;
  if (weakVerbsUsed.length > 0) {
    actionVerbScore = Math.max(0, actionVerbScore - (weakVerbsUsed.length * 2));
  }

  // 4. Section Completeness (20%)
  let sectionsFound = 0;
  if (profile.education && profile.education.length > 0) sectionsFound++;
  if (profile.workExperience && profile.workExperience.length > 0) sectionsFound++;
  if (profile.projects && profile.projects.length > 0) sectionsFound++;
  if (profile.hardSkills && profile.hardSkills.length > 0) sectionsFound++;
  
  const sectionCompleteness = (sectionsFound / 4) * 100;
  const sectionScore = (sectionCompleteness / 100) * 20;

  const overallScore = Math.round(keywordScore + impactScore + actionVerbScore + sectionScore);

  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    pillars: {
      keywordCoverage: Math.round(keywordCoverage),
      impactDensity: Math.round(impactDensity),
      actionVerbStrength: Math.round(actionVerbStrength),
      sectionCompleteness: Math.round(sectionCompleteness)
    },
    matchedKeywords: Array.from(new Set(matchedKeywords)),
    missingCriticalKeywords: Array.from(new Set(missingCriticalKeywords)),
    weakBullets: weakBullets.slice(0, 3), // limit to top 3 weak bullets
    strongVerbsUsed,
    weakVerbsUsed,
    metricsFound
  };
}
