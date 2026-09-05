'use client';

import React, { useState, useRef } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { ExperienceTier, CareerPurpose, TargetRole } from '@/types/onboarding';
import { UploadCloud, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TIER_OPTIONS: { value: ExperienceTier; label: string }[] = [
  { value: 'intern', label: 'Intern' },
  { value: 'entry', label: 'Entry 0-1y' },
  { value: 'junior', label: 'Junior 1-3y' },
  { value: 'mid', label: 'Mid 3-5y' },
  { value: 'senior', label: 'Senior 5-7+y' },
];

const PURPOSE_OPTIONS: { value: CareerPurpose; label: string }[] = [
  { value: 'first_job', label: 'Landing First Job' },
  { value: 'career_switch', label: 'Career Transition' },
  { value: 'promotion_growth', label: 'Upskilling' },
  { value: 'readiness_check', label: 'Exploring' },
];

const ROLE_OPTIONS: { value: TargetRole; label: string }[] = [
  { value: 'fullstack', label: 'Full Stack Developer' },
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'aiml', label: 'AI/ML Engineer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'datascience', label: 'Data Scientist' },
  { value: 'cybersecurity', label: 'Cybersecurity Analyst' },
];

const SAMPLE_RESUMES: Record<ExperienceTier, string> = {
  intern: 'Intern Developer with foundational knowledge in HTML, CSS, JS, and basic data structures. Looking for an internship.',
  entry: 'Entry Level Developer with 6 months of experience in React and Node.js. Familiar with Git and team workflows.',
  junior: 'Junior Developer with 2 years of experience. Strong in React, Next.js, and REST APIs. Focus on clean code.',
  mid: 'Mid-Level Engineer with 4 years of experience. Designed microservices, optimized database queries, and mentored juniors.',
  senior: 'Senior Software Engineer with 7+ years of experience in distributed systems, scalability, and system architecture.',
};

export default function OnboardingWizard() {
  const { state, setExperienceTier, setCareerPurpose, setTargetRole, setResume, nextStep, prevStep, isHydrated, analyzeResume } = useOnboarding();
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isHydrated) return <div className="animate-pulse w-full max-w-xl h-64 bg-cream-200 rounded-lg"></div>;

  const handleFileUpload = async (file: File) => {
    setErrorMsg(null);
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse resume');
      }
      
      setResume({
        filename: data.filename,
        fileType: data.fileType,
        text: data.text,
        charCount: data.charCount,
        wordCount: data.wordCount,
        isSample: false
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSampleResume = () => {
    const tier = state.experienceTier || 'junior';
    const text = SAMPLE_RESUMES[tier];
    const role = state.targetRole || 'fullstack';
    const purpose = state.careerPurpose || 'readiness_check';
    const resumeData = {
      filename: `Sample_${tier}_Resume.txt`,
      fileType: 'sample' as const,
      text,
      charCount: text.length,
      wordCount: text.split(' ').length,
      isSample: true
    };
    setResume(resumeData);
    analyzeResume(resumeData, tier, role, purpose);
  };

  const renderStepIndicators = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
              state.currentStep === step ? "bg-pastel-sky-bg text-pastel-sky-text border border-pastel-sky-border" :
              state.currentStep > step ? "bg-pastel-mint-bg text-pastel-mint-text border border-pastel-mint-border" :
              "bg-editorial-surface text-editorial-muted border border-editorial-border"
            )}>
              {state.currentStep > step ? <CheckCircle2 size={16} /> : step}
            </div>
            {step < 4 && (
              <div className={cn(
                "w-12 h-1 mx-2 rounded",
                state.currentStep > step ? "bg-pastel-mint-bg" : "bg-editorial-border"
              )} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl bg-editorial-surface shadow-sm border border-editorial-border rounded-xl p-8">
      {renderStepIndicators()}

      <div className="min-h-[300px]">
        {state.currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-editorial-text font-semibold mb-2">Experience Calibration</h2>
              <p className="text-editorial-secondary">Tell us where you are in your career journey.</p>
            </div>
            <div className="grid gap-3">
              {TIER_OPTIONS.map((tier) => (
                <button
                  key={tier.value}
                  onClick={() => setExperienceTier(tier.value)}
                  className={cn(
                    "p-4 border rounded-lg text-left transition-colors duration-200 font-medium",
                    state.experienceTier === tier.value
                      ? "border-pastel-sky-text bg-pastel-sky-bg text-pastel-sky-text"
                      : "border-editorial-border hover:border-editorial-border-hover text-editorial-text"
                  )}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-editorial-text font-semibold mb-2">Career Purpose</h2>
              <p className="text-editorial-secondary">What is your primary goal right now?</p>
            </div>
            <div className="grid gap-3">
              {PURPOSE_OPTIONS.map((purpose) => (
                <button
                  key={purpose.value}
                  onClick={() => setCareerPurpose(purpose.value)}
                  className={cn(
                    "p-4 border rounded-lg text-left transition-colors duration-200 font-medium",
                    state.careerPurpose === purpose.value
                      ? "border-pastel-sky-text bg-pastel-sky-bg text-pastel-sky-text"
                      : "border-editorial-border hover:border-editorial-border-hover text-editorial-text"
                  )}
                >
                  {purpose.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-editorial-text font-semibold mb-2">Target Tech Role</h2>
              <p className="text-editorial-secondary">Which role are you aiming for?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setTargetRole(role.value)}
                  className={cn(
                    "p-4 border rounded-lg text-left transition-colors duration-200 font-medium",
                    state.targetRole === role.value
                      ? "border-pastel-sky-text bg-pastel-sky-bg text-pastel-sky-text"
                      : "border-editorial-border hover:border-editorial-border-hover text-editorial-text"
                  )}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-editorial-text font-semibold mb-2">Resume Ingestion</h2>
              <p className="text-editorial-secondary">Upload your resume to get started (.pdf, .docx, .txt)</p>
            </div>

            {state.resume ? (
              <div className="p-6 border border-pastel-mint-border bg-pastel-mint-bg rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-pastel-mint-text" size={24} />
                  <div>
                    <p className="font-semibold text-pastel-mint-text">{state.resume.filename}</p>
                    <p className="text-sm text-pastel-mint-text opacity-80">{state.resume.wordCount} words extracted</p>
                  </div>
                </div>
                <button 
                  onClick={() => setResume(null as any)}
                  className="text-sm font-medium text-editorial-secondary hover:text-editorial-text"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-editorial-border rounded-xl p-10 text-center hover:bg-cream-100 transition-colors cursor-pointer flex flex-col items-center justify-center gap-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  }}
                />
                
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin text-editorial-secondary" size={32} />
                    <p className="text-editorial-secondary font-medium">Parsing resume...</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="text-editorial-secondary" size={48} />
                    <div>
                      <p className="font-medium text-editorial-text">Click to upload or drag and drop</p>
                      <p className="text-sm text-editorial-secondary mt-1">PDF, DOCX, or TXT (Max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="p-3 border border-pastel-rose-border bg-pastel-rose-bg text-pastel-rose-text rounded-md text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {!state.resume && !uploading && (
              <div className="text-center pt-4 border-t border-editorial-border">
                <p className="text-sm text-editorial-secondary mb-3">Or try the app with a demo profile</p>
                <button 
                  onClick={handleSampleResume}
                  className="px-4 py-2 bg-cream-200 hover:bg-cream-300 text-editorial-text rounded-md font-medium text-sm transition-colors"
                >
                  Try Sample Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-editorial-border">
        <button
          onClick={prevStep}
          disabled={state.currentStep === 1}
          className="px-6 py-2 rounded-md font-medium text-editorial-secondary hover:text-editorial-text disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        
        {state.currentStep < 4 ? (
          <button
            onClick={nextStep}
            disabled={
              (state.currentStep === 1 && !state.experienceTier) ||
              (state.currentStep === 2 && !state.careerPurpose) ||
              (state.currentStep === 3 && !state.targetRole)
            }
            className="px-6 py-2 rounded-md font-medium bg-editorial-text text-editorial-surface disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={() => {
              if (state.resume && state.experienceTier && state.targetRole && state.careerPurpose) {
                analyzeResume(state.resume, state.experienceTier, state.targetRole, state.careerPurpose);
              }
            }}
            disabled={!state.resume}
            className="px-6 py-2 rounded-md font-medium bg-pastel-mint-text text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            Complete Setup
          </button>
        )}
      </div>
    </div>
  );
}
