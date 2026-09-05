import { ExperienceTier, TargetRole } from '@/types/onboarding';
import { CandidateProfile } from '../types/profile';
import { RoleBenchmark } from '../types/taxonomy';
import { ActionPlan, ActionPlanPhase, ActionPlanWeek, ActionPlanMilestone, SkillGapAnalysis, LearningResource, SkillGapItem } from '../types/analysis';

function generateMilestoneId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generateActionPlan(
  profile: CandidateProfile,
  benchmark: RoleBenchmark,
  gapAnalysis: SkillGapAnalysis,
  resources: LearningResource[]
): ActionPlan {
  
  const highCriticalGaps = gapAnalysis.criticalGaps.length >= 3;
  const targetDomain = benchmark.domain;
  const targetTier = benchmark.tier;
  
  // Phase 1: Days 1-30
  const phase1Weeks: ActionPlanWeek[] = [];
  for (let w = 1; w <= 4; w++) {
    let focusArea = '';
    let tasks: string[] = [];
    let milestones: ActionPlanMilestone[] = [];
    
    if (highCriticalGaps) {
      // Focus on top critical gaps
      const targetGap = gapAnalysis.criticalGaps[(w - 1) % gapAnalysis.criticalGaps.length];
      if (targetGap) {
        focusArea = `Core Foundation: ${targetGap.name}`;
        tasks = [`Deep dive into ${targetGap.name} syntax and primitives`, `Complete basic exercises in ${targetGap.name}`];
        milestones = [{
          id: generateMilestoneId(),
          title: `Understand ${targetGap.name} basics`,
          description: `Learn the fundamentals of ${targetGap.name}`,
          targetWeek: w,
          completed: false,
          category: 'learning',
          verificationCriteria: `Pass basic quiz or write a small script using ${targetGap.name}`
        }];
      } else {
        focusArea = 'Core Foundations Consolidation';
        tasks = ['Review all critical core skills'];
      }
    } else {
      // Focus on advanced/architectural foundations
      const targetGap = gapAnalysis.recommendedGaps[(w - 1) % Math.max(1, gapAnalysis.recommendedGaps.length)] || { name: 'Advanced Concepts' };
      focusArea = `Advanced Architectural Foundation: ${targetGap.name}`;
      tasks = [`Explore ${targetGap.name} in-depth`, `Understand architectural trade-offs for ${targetGap.name}`];
      milestones = [{
        id: generateMilestoneId(),
        title: `Master ${targetGap.name} architecture`,
        description: `Deep dive into advanced usage of ${targetGap.name}`,
        targetWeek: w,
        completed: false,
        category: 'learning',
        verificationCriteria: `Design a small system utilizing ${targetGap.name}`
      }];
    }
    
    phase1Weeks.push({
      weekNumber: w,
      title: `Week ${w}: ${focusArea}`,
      focusArea,
      tasks,
      skillsTargeted: [],
      milestones,
      resourceIds: resources.slice(0, 2).map(r => r.id)
    });
  }

  // Phase 2: Days 31-60
  const phase2Weeks: ActionPlanWeek[] = [];
  for (let w = 5; w <= 8; w++) {
    phase2Weeks.push({
      weekNumber: w,
      title: `Week ${w}: Practical Application`,
      focusArea: 'Capstone Project Integration',
      tasks: [
        'Synthesize skills into a production-grade portfolio project',
        'Address recommended/stretch skills',
        'Testing and Containerization'
      ],
      skillsTargeted: [],
      milestones: [{
        id: generateMilestoneId(),
        title: 'Project Milestone',
        description: 'Implement core features for the portfolio project',
        targetWeek: w,
        completed: false,
        category: 'project',
        verificationCriteria: 'Code runs locally without errors'
      }],
      resourceIds: []
    });
  }
  
  // Phase 3: Days 61-90
  const phase3Weeks: ActionPlanWeek[] = [];
  for (let w = 9; w <= 12; w++) {
    phase3Weeks.push({
      weekNumber: w,
      title: `Week ${w}: Portfolio Polish & ATS`,
      focusArea: 'Resume Optimization and Interview Prep',
      tasks: [
        'ATS bullet rewrite with quantifiable metrics',
        'Architecture diagrams & GitHub README',
        'Technical interview prep'
      ],
      skillsTargeted: [],
      milestones: [{
        id: generateMilestoneId(),
        title: 'Interview & Resume Check',
        description: 'Update resume and practice mock interview',
        targetWeek: w,
        completed: false,
        category: 'interview',
        verificationCriteria: 'Resume score >85% and mock interview completed'
      }],
      resourceIds: []
    });
  }

  const phases: ActionPlanPhase[] = [
    {
      phaseId: 'days_1_30',
      daysLabel: 'Days 1–30',
      title: 'Foundation & Critical Gaps',
      theme: 'Eliminate blockers and build core competence',
      objective: 'Master foundational skills required for the role',
      weeks: phase1Weeks
    },
    {
      phaseId: 'days_31_60',
      daysLabel: 'Days 31–60',
      title: 'Practical Application & Capstone Projects',
      theme: 'Synthesize new skills',
      objective: 'Build a production-grade portfolio project',
      weeks: phase2Weeks
    },
    {
      phaseId: 'days_61_90',
      daysLabel: 'Days 61–90',
      title: 'Portfolio Polish, ATS Optimization & Interviews',
      theme: 'Prepare for hiring pipelines',
      objective: 'Optimize ATS score and pass technical interviews',
      weeks: phase3Weeks
    }
  ];

  return {
    id: generateMilestoneId(),
    targetDomain,
    targetTier,
    summary: gapAnalysis.criticalGaps.length > 0 ? 'Focus heavily on missing core prerequisites.' : 'Focus on advanced projects and interview prep.',
    totalWeeks: 12,
    estimatedHoursPerWeek: 10,
    phases,
    generatedAt: new Date().toISOString()
  };
}
