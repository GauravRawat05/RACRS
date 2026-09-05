import React, { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { ExternalLink, PlayCircle, FileText, BookOpen, Layers } from 'lucide-react';
import { ResourceType } from '@/lib/types/analysis';

export default function LearningHubSection() {
  const { state } = useOnboarding();
  const resources = state.analysisResult?.resources || [];
  const [filter, setFilter] = useState<'All' | 'Videos' | 'Docs' | 'Books'>('All');

  if (resources.length === 0) return <div className="text-editorial-secondary py-12 text-center">No learning resources available.</div>;

  const filteredResources = resources.filter(res => {
    if (filter === 'All') return true;
    if (filter === 'Videos') return res.type === 'youtube_course' || res.type === 'youtube_playlist';
    if (filter === 'Docs') return res.type === 'official_docs' || res.type === 'interactive_guide';
    if (filter === 'Books') return res.type === 'free_book';
    return true;
  });

  const getIconForType = (type: ResourceType) => {
    switch (type) {
      case 'youtube_course':
      case 'youtube_playlist':
        return <PlayCircle className="w-5 h-5 text-pastel-rose-text" />;
      case 'official_docs':
      case 'interactive_guide':
        return <FileText className="w-5 h-5 text-pastel-sky-text" />;
      case 'free_book':
        return <BookOpen className="w-5 h-5 text-pastel-peach-text" />;
      default:
        return <Layers className="w-5 h-5 text-pastel-lavender-text" />;
    }
  };

  const getFormatLabel = (type: ResourceType) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
        <h2 className="text-xl font-serif font-medium text-editorial-text">Learning Hub</h2>
        <div className="flex bg-editorial-surface border border-editorial-border rounded-lg p-1">
          {['All', 'Videos', 'Docs', 'Books'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                filter === f 
                  ? 'bg-cream-100 font-medium text-editorial-text shadow-sm' 
                  : 'text-editorial-secondary hover:text-editorial-text'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="hidden print:block mb-6">
        <h2 className="text-xl font-serif font-medium text-editorial-text">Learning Resources</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.map(res => (
          <div key={res.id} className="border border-editorial-border p-5 rounded-lg bg-editorial-surface hover:shadow-md transition-shadow group print:break-inside-avoid print:border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {getIconForType(res.type)}
                <span className="text-xs font-medium text-editorial-secondary bg-cream-50 px-2 py-0.5 rounded border border-editorial-border">
                  {getFormatLabel(res.type)}
                </span>
              </div>
              <a 
                href={res.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-editorial-secondary hover:text-pastel-sky-text transition-colors print:hidden"
                aria-label="Open resource"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <h3 className="font-medium text-editorial-text mb-1 group-hover:text-pastel-sky-text transition-colors">
              {res.title}
            </h3>
            <p className="text-sm text-editorial-secondary mb-4 line-clamp-2 print:line-clamp-none">
              {res.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-editorial-secondary">
              <span className="font-medium">Provider: {res.provider}</span>
              <span>Duration: {res.duration}</span>
              <div className="flex gap-1">
                {res.domains.slice(0, 2).map((domain, i) => (
                  <span key={i} className="badge-sky">{domain}</span>
                ))}
              </div>
            </div>
            
            {/* Print-only URL display */}
            <div className="hidden print:block mt-3 text-xs text-gray-500 break-all">
              Link: {res.url}
            </div>
          </div>
        ))}
        {filteredResources.length === 0 && (
          <p className="col-span-full text-center text-sm text-editorial-secondary py-8">
            No resources match the selected filter.
          </p>
        )}
      </div>
    </div>
  );
}
