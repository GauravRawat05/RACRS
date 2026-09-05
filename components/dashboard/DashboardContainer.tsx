'use client';

import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import DashboardHeader from './DashboardHeader';
import OverviewTab from './OverviewTab';

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
          {activeTab !== 'overview' && (
            <div className="py-12 text-center text-editorial-secondary">
              <p>Content for {tabs.find(t => t.id === activeTab)?.label} (Placeholder for Wave 3)</p>
            </div>
          )}
        </div>

        {/* Print Content (Hidden on screen) */}
        <div className="hidden print:block p-8 space-y-12">
          <OverviewTab />
          {/* We will render all tabs sequentially here in Wave 3 */}
        </div>

      </div>
    </div>
  );
}
