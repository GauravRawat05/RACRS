'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { OnboardingState, ExperienceTier, CareerPurpose, TargetRole, ParsedResumeData } from '@/types/onboarding';

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
}

const defaultState: OnboardingState = {
  currentStep: 1,
  experienceTier: null,
  careerPurpose: null,
  targetRole: null,
  resume: null,
  isSubmitting: false,
  error: null,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gsd_onboarding_profile');
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load onboarding state from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('gsd_onboarding_profile', JSON.stringify(state));
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
    setState(defaultState);
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
