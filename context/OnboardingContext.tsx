'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { OnboardingState as BaseOnboardingState, ExperienceTier, CareerPurpose, TargetRole, ParsedResumeData } from '@/types/onboarding';
import { ComprehensiveAnalysisResult } from '@/lib/types/analysis';

export interface OnboardingState extends BaseOnboardingState {
  analysisResult: ComprehensiveAnalysisResult | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  activeTab: string;
}

interface OnboardingContextType {
  state: OnboardingState;
  setExperienceTier: (tier: ExperienceTier) => void;
  setCareerPurpose: (purpose: CareerPurpose) => void;
  setTargetRole: (role: TargetRole) => void;
  setResume: (resume: ParsedResumeData) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2 | 3 | 4) => void;
  resetOnboarding: () => void;
  isHydrated: boolean;
  setActiveTab: (tab: string) => void;
  analyzeResume: (resumeData: ParsedResumeData, tier: ExperienceTier, role: TargetRole, purpose: CareerPurpose) => Promise<void>;
  resetToOnboarding: () => void;
}

const defaultState: OnboardingState = {
  currentStep: 1,
  experienceTier: null,
  careerPurpose: null,
  targetRole: null,
  resume: null,
  isSubmitting: false,
  error: null,
  analysisResult: null,
  isAnalyzing: false,
  analysisError: null,
  activeTab: 'overview',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('gsd_onboarding_profile');
      const savedAnalysis = localStorage.getItem('gsd_resume_analysis');
      
      let initialState = { ...defaultState };
      
      if (savedProfile) {
        initialState = { ...initialState, ...JSON.parse(savedProfile) };
      }
      
      if (savedAnalysis) {
        const parsedAnalysis = JSON.parse(savedAnalysis);
        initialState.analysisResult = parsedAnalysis;
      }
      
      setState(initialState);
    } catch (e) {
      console.warn('Failed to load onboarding state from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const { analysisResult, isAnalyzing, analysisError, activeTab, ...profileState } = state;
      localStorage.setItem('gsd_onboarding_profile', JSON.stringify(profileState));
      if (analysisResult) {
        localStorage.setItem('gsd_resume_analysis', JSON.stringify(analysisResult));
      } else {
        localStorage.removeItem('gsd_resume_analysis');
      }
    }
  }, [state, isHydrated]);

  const setExperienceTier = (tier: ExperienceTier) => {
    setState((prev) => ({ ...prev, experienceTier: tier, error: null }));
  };

  const setCareerPurpose = (purpose: CareerPurpose) => {
    setState((prev) => ({ ...prev, careerPurpose: purpose, error: null }));
  };

  const setTargetRole = (role: TargetRole) => {
    setState((prev) => ({ ...prev, targetRole: role, error: null }));
  };

  const setResume = (resume: ParsedResumeData) => {
    setState((prev) => ({ ...prev, resume, error: null }));
  };

  const nextStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4) as 1 | 2 | 3 | 4,
    }));
  };

  const prevStep = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1) as 1 | 2 | 3 | 4,
    }));
  };

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const resetOnboarding = () => {
    localStorage.removeItem('gsd_onboarding_profile');
    localStorage.removeItem('gsd_resume_analysis');
    setState(defaultState);
  };
  
  const resetToOnboarding = () => {
    setState(prev => ({
      ...prev,
      analysisResult: null,
      isAnalyzing: false,
      analysisError: null,
      activeTab: 'overview'
    }));
    localStorage.removeItem('gsd_resume_analysis');
  };

  const setActiveTab = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const analyzeResume = async (resumeData: ParsedResumeData, tier: ExperienceTier, role: TargetRole, purpose: CareerPurpose) => {
    setState(prev => ({ ...prev, isAnalyzing: true, analysisError: null, resume: resumeData, experienceTier: tier, targetRole: role, careerPurpose: purpose }));
    try {
      const payload = {
        resumeText: resumeData.text,
        experienceTier: tier,
        targetRole: role,
      };
      
      const openrouterKey = localStorage.getItem('gsd_openrouter_key');
      const groqKey = localStorage.getItem('gsd_groq_key');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (openrouterKey) headers['x-openrouter-key'] = openrouterKey;
      if (groqKey) headers['x-groq-key'] = groqKey;
      
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze resume');
      }
      
      setState(prev => ({ 
        ...prev, 
        analysisResult: data.result,
        isAnalyzing: false 
      }));
    } catch (e: any) {
      setState(prev => ({ ...prev, isAnalyzing: false, analysisError: e.message || 'Analysis failed' }));
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setExperienceTier,
        setCareerPurpose,
        setTargetRole,
        setResume,
        nextStep,
        prevStep,
        goToStep,
        resetOnboarding,
        isHydrated,
        setActiveTab,
        analyzeResume,
        resetToOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
