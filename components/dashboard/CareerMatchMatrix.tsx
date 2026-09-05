'use client';

import React from 'react';
import { useOnboarding } from '@/context/OnboardingContext';

export default function CareerMatchMatrix() {
  const { state } = useOnboarding();
  const result = state.analysisResult;
  if (!result) return null;

  const matches = result.allDomainMatches;
  
  // Chart dimensions
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40;
  const numPoints = matches.length;

  // Generate radar chart points
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const polygonPoints = matches.map((match, i) => {
    const { x, y } = getCoordinates(match.matchPercentage, i);
    return `${x},${y}`;
  }).join(' ');

  const levels = [20, 40, 60, 80, 100];

  return (
    <div className="bg-editorial-surface border border-editorial-border rounded-xl p-6">
      <h3 className="text-xl font-serif text-editorial-text font-semibold mb-6">Career Domain Matrix</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Radar Chart */}
        <div className="w-[300px] h-[300px] relative flex-shrink-0">
          <svg width={size} height={size} className="overflow-visible">
            {/* Grid levels */}
            {levels.map((level, i) => (
              <polygon
                key={`level-${level}`}
                points={matches.map((_, index) => {
                  const { x, y } = getCoordinates(level, index);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#E8E4DB"
                strokeWidth="1"
                strokeDasharray={i === levels.length - 1 ? 'none' : '4,4'}
              />
            ))}
            
            {/* Axes */}
            {matches.map((_, index) => {
              const { x, y } = getCoordinates(100, index);
              return (
                <line
                  key={`axis-${index}`}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#E8E4DB"
                  strokeWidth="1"
                />
              );
            })}

            {/* Labels */}
            {matches.map((match, index) => {
              const { x, y } = getCoordinates(120, index);
              return (
                <text
                  key={`label-${index}`}
                  x={x}
                  y={y}
                  fill="#4A443E"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {match.domainLabel}
                </text>
              );
            })}

            {/* Data Polygon */}
            <polygon
              points={polygonPoints}
              fill="rgba(125, 203, 178, 0.2)"
              stroke="#7DCBB2"
              strokeWidth="2"
            />
            
            {/* Data Points */}
            {matches.map((match, index) => {
              const { x, y } = getCoordinates(match.matchPercentage, index);
              return (
                <circle
                  key={`point-${index}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#7DCBB2"
                />
              );
            })}
          </svg>
        </div>

        {/* Domain Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {matches.map((match) => (
            <div key={match.domain} className="border border-editorial-border rounded-lg p-4 bg-cream-100/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-editorial-text">{match.domainLabel}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  match.matchPercentage >= 80 ? 'bg-pastel-mint-bg text-pastel-mint-text' :
                  match.matchPercentage >= 60 ? 'bg-pastel-sky-bg text-pastel-sky-text' :
                  match.matchPercentage >= 40 ? 'bg-pastel-peach-bg text-pastel-peach-text' :
                  'bg-pastel-rose-bg text-pastel-rose-text'
                }`}>
                  {match.matchPercentage}%
                </span>
              </div>
              <p className="text-xs text-editorial-secondary mb-2">Fit: <span className="capitalize">{match.fitLevel.replace('_', ' ')}</span></p>
              <div className="w-full bg-editorial-border h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    match.matchPercentage >= 80 ? 'bg-pastel-mint-text' :
                    match.matchPercentage >= 60 ? 'bg-pastel-sky-text' :
                    match.matchPercentage >= 40 ? 'bg-pastel-peach-text' :
                    'bg-pastel-rose-text'
                  }`}
                  style={{ width: `${match.matchPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
