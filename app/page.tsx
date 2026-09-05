'use client';

import { OnboardingProvider, useOnboarding } from '@/context/OnboardingContext';
import OnboardingWizard from '@/components/OnboardingWizard';
import Navbar from '@/components/Navbar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { state } = useOnboarding();

  if (state.isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] gap-4 animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-pastel-peach-text" size={48} />
        <h2 className="text-2xl font-serif text-editorial-text font-semibold">Analyzing your profile...</h2>
        <p className="text-editorial-secondary">We are extracting skills, assessing ATS fit, and generating a roadmap.</p>
      </div>
    );
  }

  if (state.analysisResult) {
    return <DashboardContainer />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] p-4">
      <OnboardingWizard />
    </div>
  );
}

export default function Home() {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-cream-100 flex flex-col">
        <Navbar />
        <AppContent />
      </div>
    </OnboardingProvider>
  );
}
