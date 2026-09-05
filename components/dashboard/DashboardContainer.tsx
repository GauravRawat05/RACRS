'use client';

import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import DashboardHeader from './DashboardHeader';
import OverviewTab from './OverviewTab';
import SkillGapSection from './SkillGapSection';
import LearningHubSection from './LearningHubSection';
import RoadmapTimeline from './RoadmapTimeline';
import AtsEnhancerSection from './AtsEnhancerSection';
import CareerMatchMatrix from './CareerMatchMatrix';

export default function DashboardContainer() {
  const { state, setActiveTab } = useOnboarding();
  const activeTab = state.activeTab || 'overview';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'matches', label: 'Career Matches' },
    { id: 'gaps', label: 'Skill Gaps' },
    { id: 'resources', label: 'Learning Path' },
    { id: 'roadmap', label: 'Action Plan' },
    { id: 'ats', label: 'ATS Optimize' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-8 print:my-0 print:max-w-none">
      <div className="bg-editorial-surface border border-editorial-border shadow-sm rounded-xl overflow-hidden print:border-none print:shadow-none print:rounded-none">
        
        <DashboardHeader />

        {/* Interactive Tabs (Hidden when printing) */}
        <div className="border-b border-editorial-border bg-cream-100/50 print:hidden overflow-x-auto">
          <nav className="flex items-center px-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-pastel-mint-text text-editorial-text' 
                    : 'border-transparent text-editorial-secondary hover:text-editorial-text hover:border-editorial-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Screen Content */}
        <div className="p-8 print:hidden">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'matches' && <CareerMatchMatrix />}
          {activeTab === 'gaps' && <SkillGapSection />}
          {activeTab === 'resources' && <LearningHubSection />}
          {activeTab === 'roadmap' && <RoadmapTimeline />}
          {activeTab === 'ats' && <AtsEnhancerSection />}
        </div>

        {/* Print Content (Hidden on screen) */}
        <div className="hidden print:flex print:flex-col p-8 space-y-12">
          <OverviewTab />
          
          <div className="print:mt-12">
            <h1 className="text-3xl font-serif font-bold text-editorial-text border-b-2 border-editorial-border pb-2 mb-8">Career Domain Benchmarks</h1>
            <CareerMatchMatrix />
          </div>

          <div className="print:mt-12">
            <h1 className="text-3xl font-serif font-bold text-editorial-text border-b-2 border-editorial-border pb-2 mb-8">Skill Gap Analysis</h1>
            <SkillGapSection />
          </div>
          
          <div className="print:mt-12 print:break-before-page">
            <h1 className="text-3xl font-serif font-bold text-editorial-text border-b-2 border-editorial-border pb-2 mb-8">Learning Path</h1>
            <LearningHubSection />
          </div>
          
          <div className="print:mt-12 print:break-before-page">
            <h1 className="text-3xl font-serif font-bold text-editorial-text border-b-2 border-editorial-border pb-2 mb-8">Action Plan</h1>
            <RoadmapTimeline />
          </div>
          
          <div className="print:mt-12 print:break-before-page">
            <h1 className="text-3xl font-serif font-bold text-editorial-text border-b-2 border-editorial-border pb-2 mb-8">ATS Optimization</h1>
            <AtsEnhancerSection />
          </div>
        </div>

      </div>
    </div>
  );
}
