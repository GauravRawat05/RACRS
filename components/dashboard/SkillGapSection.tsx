import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { SkillGapItem } from '@/lib/types/analysis';
import { CheckCircle, AlertTriangle, Lightbulb, PenTool } from 'lucide-react';

export default function SkillGapSection() {
  const { state } = useOnboarding();
  const { analysisResult } = state;
  const gaps = analysisResult?.skillGapAnalysis;

  if (!gaps) return <div className="text-editorial-secondary py-12 text-center">No skill gap data available.</div>;

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'mastered': return 'badge-mint';
      case 'critical': return 'badge-rose';
      case 'recommended': return 'badge-sky';
      default: return 'badge-peach';
    }
  };

  const renderSkillList = (title: string, skills: SkillGapItem[], icon: React.ReactNode) => (
    <div className="mb-8 print:break-inside-avoid">
      <h3 className="text-lg font-serif font-medium mb-4 flex items-center gap-2 text-editorial-text">
        {icon}
        {title} ({skills.length})
      </h3>
      {skills.length === 0 ? (
        <p className="text-sm text-editorial-secondary">None found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="border border-editorial-border p-4 rounded-lg bg-editorial-surface/50 print:border print:border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-editorial-text">{skill.name}</h4>
                <span className={getBadgeClass(skill.status)}>{skill.status}</span>
              </div>
              <p className="text-xs text-editorial-secondary mb-2">{skill.explanation}</p>
              <div className="text-xs text-editorial-secondary">
                <span className="font-medium">Match:</span> {Math.round(skill.matchDegree * 100)}% 
                {skill.candidateEvidence && <span> | <span className="font-medium">Evidence:</span> {skill.candidateEvidence}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-cream-100 p-6 rounded-lg print:bg-white print:border print:border-gray-200">
        <h2 className="text-xl font-serif font-medium mb-2 text-editorial-text">Skill Gap Analysis</h2>
        <p className="text-sm text-editorial-secondary mb-4">Target: {gaps.targetDomain} ({gaps.targetTier}) - Match: {gaps.overallMatchPercentage}%</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="bg-editorial-surface px-4 py-2 rounded-md border border-editorial-border">Core: {gaps.coreMatchPercentage}%</div>
          <div className="bg-editorial-surface px-4 py-2 rounded-md border border-editorial-border">Stretch: {gaps.stretchMatchPercentage}%</div>
          <div className="bg-editorial-surface px-4 py-2 rounded-md border border-editorial-border">Tools: {gaps.toolsMatchPercentage}%</div>
        </div>
      </div>

      {renderSkillList('Mastered Skills', gaps.masteredSkills, <CheckCircle className="w-5 h-5 text-pastel-mint-text" />)}
      {renderSkillList('Critical Gaps', gaps.criticalGaps, <AlertTriangle className="w-5 h-5 text-pastel-rose-text" />)}
      {renderSkillList('Recommended Skills', gaps.recommendedGaps, <Lightbulb className="w-5 h-5 text-pastel-sky-text" />)}

      <div className="print:break-inside-avoid border-t border-editorial-border pt-8 mt-8">
        <h3 className="text-lg font-serif font-medium mb-4 flex items-center gap-2 text-editorial-text">
          <PenTool className="w-5 h-5 text-pastel-peach-text" />
          Missing Tools
        </h3>
        {gaps.missingTools.length === 0 ? (
          <p className="text-sm text-editorial-secondary">No missing tools identified.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {gaps.missingTools.map((tool, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium print:border print:border-gray-200">
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
