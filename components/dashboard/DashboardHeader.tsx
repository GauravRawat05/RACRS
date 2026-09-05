'use client';

import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { Download } from 'lucide-react';

export default function DashboardHeader() {
  const { state } = useOnboarding();
  const result = state.analysisResult;
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-editorial-surface border-b border-editorial-border py-6 px-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-serif font-bold text-editorial-text">{result.profile.name}</h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-editorial-secondary">
          <span className="bg-cream-200 px-2 py-1 rounded capitalize font-medium">{result.primaryMatch.tier}</span>
          <span>•</span>
          <span className="capitalize font-medium">{result.primaryMatch.domainLabel} Focus</span>
          <span>•</span>
          <span>ATS Match: {result.atsEvaluation?.overallScore ?? 0}/100</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold uppercase tracking-wider text-editorial-secondary">Overall Fit</p>
            <p className="text-3xl font-serif text-pastel-mint-text font-bold">{result.primaryMatch.matchPercentage}%</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-editorial-text text-editorial-surface px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity print:hidden"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>
    </header>
  );
}
