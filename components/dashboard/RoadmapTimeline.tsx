import React, { useState, useEffect } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { CheckSquare, Square, Target, Calendar } from 'lucide-react';

export default function RoadmapTimeline() {
  const { state } = useOnboarding();
  const actionPlan = state.analysisResult?.actionPlan;
  
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gsd_completed_milestones');
      if (saved) {
        setCompletedMilestones(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load completed milestones', e);
    }
  }, []);

  const toggleMilestone = (id: string) => {
    const next = { ...completedMilestones, [id]: !completedMilestones[id] };
    setCompletedMilestones(next);
    localStorage.setItem('gsd_completed_milestones', JSON.stringify(next));
  };

  if (!actionPlan) return <div className="text-editorial-secondary py-12 text-center">No action plan available.</div>;

  const totalMilestones = actionPlan.phases.flatMap(p => p.weeks.flatMap(w => w.milestones)).length;
  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      <div className="bg-editorial-surface border border-editorial-border p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center justify-between print:break-inside-avoid">
        <div>
          <h2 className="text-xl font-serif font-medium text-editorial-text mb-2">Action Plan: {actionPlan.targetDomain}</h2>
          <p className="text-sm text-editorial-secondary max-w-2xl">{actionPlan.summary}</p>
        </div>
        <div className="flex flex-col items-center min-w-[120px] bg-cream-50 p-4 rounded-lg border border-editorial-border print:border-gray-200">
          <span className="text-3xl font-serif text-editorial-text">{progressPercent}%</span>
          <span className="text-xs text-editorial-secondary uppercase tracking-wider font-medium mt-1">Completed</span>
        </div>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-editorial-border before:to-transparent">
        
        {actionPlan.phases.map((phase) => (
          <div key={phase.phaseId} className="relative z-10 print:break-inside-avoid">
            <div className="flex items-center justify-start md:justify-center mb-8">
              <div className="bg-cream-100 border-2 border-editorial-border px-6 py-2 rounded-full font-serif font-medium text-editorial-text shadow-sm flex items-center gap-2 print:border-gray-300">
                <Target className="w-4 h-4 text-pastel-rose-text" />
                {phase.daysLabel}: {phase.title}
              </div>
            </div>

            <div className="space-y-6 md:w-4/5 mx-auto">
              {phase.weeks.map((week) => (
                <div key={week.weekNumber} className="bg-white border border-editorial-border rounded-lg p-5 shadow-sm print:border-gray-300 print:shadow-none">
                  <div className="flex items-start gap-4 mb-4 border-b border-editorial-border pb-4 print:border-gray-200">
                    <div className="bg-cream-50 rounded-md p-2 flex flex-col items-center justify-center min-w-[60px] border border-editorial-border shrink-0">
                      <span className="text-xs text-editorial-secondary font-medium uppercase">Week</span>
                      <span className="text-xl font-serif text-editorial-text">{week.weekNumber}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-editorial-text mb-1">{week.title}</h4>
                      <p className="text-sm text-editorial-secondary">Focus: {week.focusArea}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {week.milestones.map(milestone => {
                      const isCompleted = completedMilestones[milestone.id];
                      return (
                        <div key={milestone.id} className="flex items-start gap-3 group">
                          <button 
                            onClick={() => toggleMilestone(milestone.id)}
                            className="mt-0.5 shrink-0 text-editorial-secondary hover:text-pastel-mint-text transition-colors print:hidden"
                          >
                            {isCompleted ? <CheckSquare className="w-5 h-5 text-pastel-mint-text" /> : <Square className="w-5 h-5" />}
                          </button>
                          <div className="hidden print:block mt-0.5 shrink-0">
                            {isCompleted ? <span className="font-bold">[X]</span> : <span>[ ]</span>}
                          </div>
                          <div>
                            <p className={`text-sm font-medium transition-colors ${isCompleted ? 'text-editorial-secondary line-through' : 'text-editorial-text'}`}>
                              {milestone.title}
                            </p>
                            <p className="text-xs text-editorial-secondary mt-0.5">{milestone.description}</p>
                          </div>
                        </div>
                      );
                    })}
                    {week.milestones.length === 0 && (
                      <p className="text-sm text-editorial-secondary italic">No major milestones this week.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
