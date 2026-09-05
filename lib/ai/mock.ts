import { CandidateProfile } from '@/lib/types/profile';
import { ExperienceTier } from '@/types/onboarding';
import { validateCandidateProfile } from './profileValidator';

export function extractMockProfile(resumeText: string, context?: { targetRole?: string; experienceTier?: string }): CandidateProfile {
  const metadata: CandidateProfile['metadata'] = {
    provider: 'mock_offline',
    model: 'deterministic-heuristic-v1',
    latencyMs: 12,
    fallbackUsed: true
  };

  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = resumeText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = resumeText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = resumeText.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  const words = resumeText.split(/\s+/);
  const name = words.slice(0, 2).filter(w => !['Resume', 'CV', 'Curriculum', 'Vitae', 'Page'].includes(w)).join(' ') || 'Anonymous Candidate';

  let totalExperienceYears = 0;
  const expMatch = resumeText.match(/(\d+)\+?\s*years?(?:\s+of)?\s+experience/i);
  if (expMatch) {
    totalExperienceYears = parseInt(expMatch[1], 10);
  } else {
    const regex = /(20\d{2})\s*[-–—to]+\s*(20\d{2}|present|current)/gi;
    let match;
    const yearMatches = [];
    while ((match = regex.exec(resumeText)) !== null) {
      yearMatches.push(match);
    }
    if (yearMatches.length > 0) {
      let earliest = 2100;
      let latest = 1900;
      yearMatches.forEach(match => {
        const start = parseInt(match[1]);
        const end = (match[2].toLowerCase() === 'present' || match[2].toLowerCase() === 'current') ? new Date().getFullYear() : parseInt(match[2]);
        if (start < earliest) earliest = start;
        if (end > latest) latest = end;
      });
      totalExperienceYears = latest - earliest;
    }
  }

  let detectedSeniority: ExperienceTier = 'junior';
  if (totalExperienceYears === 0) detectedSeniority = 'intern';
  else if (totalExperienceYears < 1) detectedSeniority = 'entry';
  else if (totalExperienceYears <= 3) detectedSeniority = 'junior';
  else if (totalExperienceYears <= 5) detectedSeniority = 'mid';
  else detectedSeniority = 'senior';

  if (context?.experienceTier && ['intern', 'entry', 'junior', 'mid', 'senior'].includes(context.experienceTier)) {
      detectedSeniority = context.experienceTier as ExperienceTier;
  }

  const raw = {
    name,
    contact: {
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? phoneMatch[0] : null,
      location: null,
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : null,
      github: githubMatch ? `https://${githubMatch[0]}` : null,
      website: null,
    },
    summary: 'Extracted via offline heuristic mock engine due to API unavailability.',
    totalExperienceYears,
    detectedSeniority,
    hardSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
    softSkills: ['Problem Solving', 'Communication'],
    toolsAndFrameworks: ['Git', 'Docker', 'VS Code'],
    education: [],
    certifications: [],
    workExperience: [],
    projects: []
  };

  return validateCandidateProfile(raw, detectedSeniority, metadata);
}
