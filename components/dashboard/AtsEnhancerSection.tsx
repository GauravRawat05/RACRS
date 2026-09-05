import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { Copy, Check, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AtsEnhancerSection() {
  const { state } = useOnboarding();
  const ats = state.analysisResult?.atsEvaluation;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!ats) return <div className="text-editorial-secondary py-12 text-center">ATS Evaluation data not available.</div>;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scoreColor = ats.overallScore >= 80 ? 'text-pastel-mint-text' : ats.overallScore >= 60 ? 'text-pastel-sky-text' : 'text-pastel-rose-text';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:break-inside-avoid">
        <div className="md:col-span-1 bg-editorial-surface border border-editorial-border rounded-xl p-6 flex flex-col items-center justify-center text-center print:border-gray-200">
          <span className="text-sm text-editorial-secondary font-medium uppercase tracking-wider mb-2">ATS Match Score</span>
          <div className={`text-5xl font-serif mb-2 ${scoreColor}`}>{ats.overallScore}%</div>
          <p className="text-xs text-editorial-secondary">Based on keyword density, impact, and formatting.</p>
        </div>
        
        <div className="md:col-span-2 bg-cream-50 border border-editorial-border rounded-xl p-6 print:border-gray-200 print:bg-white">
          <h3 className="font-serif font-medium text-editorial-text mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Keyword Coverage', value: ats.pillars.keywordCoverage },
              { label: 'Impact Density', value: ats.pillars.impactDensity },
              { label: 'Action Verb Strength', value: ats.pillars.actionVerbStrength },
              { label: 'Section Completeness', value: ats.pillars.sectionCompleteness },
            ].map((pillar, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-sm font-medium text-editorial-text w-1/3">{pillar.label}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden print:border print:border-gray-300">
                  <div 
                    className="h-full bg-pastel-sky" 
                    style={{ width: `${pillar.value}%` }}
                  />
                </div>
                <span className="text-sm text-editorial-secondary w-12 text-right">{pillar.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:break-inside-avoid">
        <div className="border border-editorial-border rounded-xl p-6 bg-white print:border-gray-200">
          <h3 className="font-medium text-editorial-text mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-pastel-mint-text" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {ats.matchedKeywords.length > 0 ? ats.matchedKeywords.map((kw, i) => (
              <span key={i} className="bg-pastel-mint/30 text-[#2E7D32] px-2.5 py-1 rounded-md text-xs font-medium border border-pastel-mint print:bg-white">
                {kw}
              </span>
            )) : <span className="text-sm text-editorial-secondary">No key matches found.</span>}
          </div>
        </div>

        <div className="border border-editorial-border rounded-xl p-6 bg-white print:border-gray-200">
          <h3 className="font-medium text-editorial-text mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-pastel-rose-text" />
            Missing Critical Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {ats.missingCriticalKeywords.length > 0 ? ats.missingCriticalKeywords.map((kw, i) => (
              <span key={i} className="bg-pastel-rose/30 text-[#C2185B] px-2.5 py-1 rounded-md text-xs font-medium border border-pastel-rose print:bg-white">
                {kw}
              </span>
            )) : <span className="text-sm text-editorial-secondary">All critical keywords present!</span>}
          </div>
        </div>
      </div>

      {/* X-Y-Z Rewrites */}
      <div className="print:break-inside-avoid">
        <h3 className="text-xl font-serif font-medium text-editorial-text mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pastel-sky-text" />
          Google X-Y-Z Bullet Enhancements
        </h3>
        <p className="text-sm text-editorial-secondary mb-6">Accomplished [X] as measured by [Y], by doing [Z].</p>
        
        <div className="space-y-6">
          {ats.weakBullets.map((bullet, idx) => (
            <div key={idx} className="border border-editorial-border rounded-xl overflow-hidden print:border-gray-200">
              <div className="bg-cream-50 p-4 border-b border-editorial-border print:bg-white">
                <p className="text-xs font-medium text-pastel-rose-text uppercase tracking-wider mb-1">Original (Issue: {bullet.identifiedIssue.replace('_', ' ')})</p>
                <p className="text-sm text-editorial-text italic">"{bullet.originalBullet}"</p>
              </div>
              <div className="p-4 bg-white space-y-4">
                {bullet.xyzRewrites.map((rewrite, rIdx) => {
                  const id = `rewrite-${idx}-${rIdx}`;
                  const isCopied = copiedId === id;
                  return (
                    <div key={rIdx} className="flex gap-4 items-start group">
                      <div className="flex-1 bg-editorial-surface border border-editorial-border rounded-lg p-3 text-sm text-editorial-text print:border-gray-200">
                        {rewrite}
                      </div>
                      <button
                        onClick={() => handleCopy(rewrite, id)}
                        className={`mt-2 p-2 rounded-md transition-colors print:hidden ${
                          isCopied 
                            ? 'bg-pastel-mint/30 text-[#2E7D32]' 
                            : 'text-editorial-secondary hover:bg-cream-100 hover:text-editorial-text'
                        }`}
                        title="Copy to clipboard"
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {ats.weakBullets.length === 0 && (
            <div className="text-sm text-editorial-secondary p-6 border border-editorial-border rounded-xl text-center">
              No weak bullets identified! Great job!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
