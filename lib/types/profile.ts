import { ExperienceTier, TargetRole } from '@/types/onboarding';

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  website: string | null;
}

export interface EducationItem {
  degree: string;
  field?: string | null;
  institution: string;
  graduationYear?: string | number | null;
  gpa?: string | null;
}

export interface CertificationItem {
  name: string;
  issuer?: string | null;
  issueDate?: string | null;
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  duration?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
  highlights?: string[];
}

export interface ProjectItem {
  name: string;
  description?: string | null;
  technologies?: string[];
  link?: string | null;
}

export interface CandidateProfile {
  name: string;
  contact: ContactInfo;
  summary: string;
  totalExperienceYears: number;
  detectedSeniority: ExperienceTier;
  hardSkills: string[];
  softSkills: string[];
  toolsAndFrameworks: string[];
  education: EducationItem[];
  certifications: CertificationItem[];
  workExperience: WorkExperienceItem[];
  projects: ProjectItem[];
  rawTextLength?: number;
  extractedAt?: string;
  metadata: {
    provider: 'openrouter' | 'groq' | 'mock_offline';
    model: string;
    latencyMs: number;
    fallbackUsed: boolean;
    errorReason?: string;
  };
}

export interface ResumeAnalysisRequest {
  resumeText: string;
  targetRole?: TargetRole;
  experienceTier?: ExperienceTier;
  candidatePurpose?: string;
}

export interface ResumeAnalysisResponse {
  success: boolean;
  profile?: CandidateProfile;
  error?: string;
}
