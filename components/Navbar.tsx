'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { sampleResumes } from '@/lib/samples';
import { Zap, ChevronDown, RefreshCw } from 'lucide-react';
import { ExperienceTier, TargetRole, CareerPurpose } from '@/types/onboarding';

export default function Navbar() {
  const { analyzeResume, state, resetToOnboarding } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDemoProfile = (sample: typeof sampleResumes[0]) => {
    setIsOpen(false);
    analyzeResume(
      {
        filename: `${sample.name.replace(' ', '_')}_Resume.txt`,
        fileType: 'sample',
        text: sample.rawText,
        charCount: sample.rawText.length,
        wordCount: sample.rawText.split(/\s+/).length,
        isSample: true,
      },
      sample.metadata.experienceTier as ExperienceTier,
      sample.metadata.targetRole as TargetRole,
      'readiness_check' as CareerPurpose // Defaulting to readiness_check for sample
    );
  };

  return (
    <nav className="w-full bg-editorial-surface border-b border-editorial-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-serif font-bold text-editorial-text cursor-pointer" onClick={resetToOnboarding}>
          GSD Resume ATS
        </h1>
        {state.analysisResult && (
          <button 
            onClick={resetToOnboarding}
            className="ml-4 flex items-center gap-1 text-sm font-medium text-editorial-secondary hover:text-editorial-text transition-colors"
          >
            <RefreshCw size={14} /> Start Over
          </button>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-cream-200 hover:bg-cream-300 text-editorial-text rounded-md font-medium text-sm transition-colors border border-cream-300"
        >
          <Zap size={16} className="text-pastel-peach-text" fill="currentColor" />
          <span>Demo Profiles</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-editorial-surface border border-editorial-border rounded-md shadow-lg z-50 py-1">
            <div className="px-3 py-2 text-xs font-semibold text-editorial-secondary uppercase tracking-wider border-b border-editorial-border">
              Select a Demo Profile
            </div>
            {sampleResumes.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleDemoProfile(sample)}
                className="w-full text-left px-4 py-3 hover:bg-cream-100 transition-colors flex flex-col gap-1 border-b border-editorial-border last:border-b-0"
              >
                <span className="font-medium text-editorial-text">{sample.name}</span>
                <span className="text-xs text-editorial-secondary capitalize">
                  {sample.metadata.experienceTier} • {sample.metadata.targetRole}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
