'use client';

import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import CareerMatchMatrix from './CareerMatchMatrix';

export default function OverviewTab() {
  const { state } = useOnboarding();
  const result = state.analysisResult;
  if (!result) return null;

  const { skillGapAnalysis } = result;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-editorial-surface border border-editorial-border rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-editorial-text mb-4">Executive Summary</h3>
          <p className="text-editorial-secondary leading-relaxed">
            {result.profile.summary}
          </p>
        </div>
        
        <div className="bg-editorial-surface border border-editorial-border rounded-xl p-6 grid grid-cols-2 gap-4">
          <div className="bg-cream-100 p-4 rounded-lg text-center flex flex-col justify-center">
            <span className="text-sm font-medium text-editorial-secondary mb-1">Core Skills Match</span>
            <span className="text-3xl font-bold text-pastel-mint-text">{skillGapAnalysis.coreMatchPercentage}%</span>
          </div>
          <div className="bg-cream-100 p-4 rounded-lg text-center flex flex-col justify-center">
            <span className="text-sm font-medium text-editorial-secondary mb-1">ATS Health Score</span>
            <span className="text-3xl font-bold text-pastel-sky-text">{result.atsEvaluation?.overallScore ?? 0}/100</span>
          </div>
          <div className="col-span-2 bg-cream-100 p-4 rounded-lg flex items-center justify-between">
             <span className="text-sm font-medium text-editorial-secondary">Action Plan Duration</span>
             <span className="font-bold text-editorial-text">{result.actionPlan.totalWeeks} Weeks ({result.actionPlan.estimatedHoursPerWeek} hrs/week)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-editorial-surface border border-editorial-border rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-editorial-text mb-4 flex items-center gap-2">
            <CheckCircle className="text-pastel-mint-text" size={20} />
            Top Strengths
          </h3>
          <ul className="space-y-3">
            {skillGapAnalysis.masteredSkills.slice(0, 5).map((skill, idx) => (
              <li key={idx} className="flex flex-col gap-1 pb-3 border-b border-editorial-border last:border-0 last:pb-0">
                <span className="font-medium text-editorial-text">{skill.name}</span>
                <span className="text-xs text-editorial-secondary">{skill.explanation}</span>
              </li>
            ))}
            {skillGapAnalysis.masteredSkills.length === 0 && (
              <li className="text-sm text-editorial-secondary">No core strengths identified.</li>
            )}
          </ul>
        </div>

        <div className="bg-editorial-surface border border-editorial-border rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-editorial-text mb-4 flex items-center gap-2">
            <AlertTriangle className="text-pastel-peach-text" size={20} />
            Urgent Skill Gaps
          </h3>
          <ul className="space-y-3">
            {skillGapAnalysis.criticalGaps.slice(0, 5).map((gap, idx) => (
              <li key={idx} className="flex flex-col gap-1 pb-3 border-b border-editorial-border last:border-0 last:pb-0">
                <span className="font-medium text-editorial-text">{gap.name}</span>
                <span className="text-xs text-editorial-secondary">{gap.explanation}</span>
              </li>
            ))}
            {skillGapAnalysis.criticalGaps.length === 0 && (
              <li className="text-sm text-editorial-secondary">No critical gaps identified!</li>
            )}
          </ul>
        </div>
      </div>

      <CareerMatchMatrix />
    </div>
  );
}
