import { ExperienceTier } from '@/types/onboarding';
import { CandidateProfile } from '@/lib/types/profile';

export function validateCandidateProfile(
  raw: any,
  fallbackTier: ExperienceTier = 'junior',
  metadata: CandidateProfile['metadata']
): CandidateProfile {
  const validTiers: ExperienceTier[] = ['intern', 'entry', 'junior', 'mid', 'senior'];
  const detectedSeniority = validTiers.includes(raw?.detectedSeniority)
    ? raw.detectedSeniority
    : fallbackTier;

  return {
    name: typeof raw?.name === 'string' && raw.name.trim() ? raw.name.trim() : 'Anonymous Candidate',
    contact: {
      email: typeof raw?.contact?.email === 'string' ? raw.contact.email : null,
      phone: typeof raw?.contact?.phone === 'string' ? raw.contact.phone : null,
      location: typeof raw?.contact?.location === 'string' ? raw.contact.location : null,
      linkedin: typeof raw?.contact?.linkedin === 'string' ? raw.contact.linkedin : null,
      github: typeof raw?.contact?.github === 'string' ? raw.contact.github : null,
      website: typeof raw?.contact?.website === 'string' ? raw.contact.website : null,
    },
    summary: typeof raw?.summary === 'string' && raw.summary.trim()
      ? raw.summary.trim()
      : 'Technical candidate with practical engineering experience.',
    totalExperienceYears: typeof raw?.totalExperienceYears === 'number' && !isNaN(raw.totalExperienceYears)
      ? Math.max(0, Math.min(40, raw.totalExperienceYears))
      : 1,
    detectedSeniority,
    hardSkills: Array.isArray(raw?.hardSkills)
      ? raw.hardSkills.filter((s: any) => typeof s === 'string' && s.trim())
      : [],
    softSkills: Array.isArray(raw?.softSkills)
      ? raw.softSkills.filter((s: any) => typeof s === 'string' && s.trim())
      : [],
    toolsAndFrameworks: Array.isArray(raw?.toolsAndFrameworks)
      ? raw.toolsAndFrameworks.filter((s: any) => typeof s === 'string' && s.trim())
      : [],
    education: Array.isArray(raw?.education)
      ? raw.education.map((e: any) => ({
          degree: e?.degree || 'Degree Not Specified',
          field: e?.field || null,
          institution: e?.institution || 'Institution Not Specified',
          graduationYear: e?.graduationYear || null,
          gpa: e?.gpa || null,
        }))
      : [],
    certifications: Array.isArray(raw?.certifications)
      ? raw.certifications.map((c: any) => ({
          name: c?.name || 'Certification',
          issuer: c?.issuer || null,
          issueDate: c?.issueDate || null,
        }))
      : [],
    workExperience: Array.isArray(raw?.workExperience)
      ? raw.workExperience.map((w: any) => ({
          company: w?.company || 'Organization',
          role: w?.role || 'Engineer',
          duration: w?.duration || null,
          startDate: w?.startDate || null,
          endDate: w?.endDate || null,
          description: w?.description || null,
          highlights: Array.isArray(w?.highlights) ? w.highlights : [],
        }))
      : [],
    projects: Array.isArray(raw?.projects)
      ? raw.projects.map((p: any) => ({
          name: p?.name || 'Project',
          description: p?.description || null,
          technologies: Array.isArray(p?.technologies) ? p.technologies : [],
          link: p?.link || null,
        }))
      : [],
    extractedAt: new Date().toISOString(),
    metadata,
  };
}
