export type ExperienceTier = 'intern' | 'entry' | 'junior' | 'mid' | 'senior';

export type CareerPurpose = 
  | 'first_job' 
  | 'career_switch' 
  | 'promotion_growth' 
  | 'readiness_check';

export type TargetRole = 
  | 'fullstack' 
  | 'frontend' 
  | 'backend' 
  | 'aiml' 
  | 'devops' 
  | 'datascience' 
  | 'cybersecurity';

export interface ParsedResumeData {
  filename: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'sample';
  text: string;
  charCount: number;
  wordCount: number;
  isSample?: boolean;
}

export interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  experienceTier: ExperienceTier | null;
  careerPurpose: CareerPurpose | null;
  targetRole: TargetRole | null;
  resume: ParsedResumeData | null;
  isSubmitting: boolean;
  error: string | null;
}
