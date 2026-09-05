import { NextRequest, NextResponse } from 'next/server';
import { extractResumeProfile } from '@/lib/ai/gateway';
import { ResumeAnalysisRequest } from '@/lib/types/profile';
import { calculateAllDomainMatches, getRoleBenchmark, analyzeSkillGaps } from '@/lib/matcher';
import { getResourcesForGaps } from '@/lib/resources/matcher';
import { generateActionPlan } from '@/lib/roadmap/generator';
import { TargetRole, ExperienceTier } from '@/types/onboarding';

export async function POST(req: NextRequest) {
  try {
    const openRouterKey = req.headers.get('x-openrouter-key') || process.env.OPENROUTER_API_KEY || '';
    const groqKey = req.headers.get('x-groq-key') || process.env.GROQ_API_KEY || '';
    
    let body: any;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid JSON request body' }, { status: 400 });
    }
    
    const textToAnalyze = body.resumeText || body.fileText;
    
    if (!textToAnalyze) {
      return NextResponse.json({ success: false, error: 'Missing resumeText in request body' }, { status: 400 });
    }
    
    const requestPayload: ResumeAnalysisRequest = {
      resumeText: textToAnalyze,
      targetRole: body.targetRole,
      experienceTier: body.experienceTier,
      candidatePurpose: body.candidatePurpose
    };
    
    const response = await extractResumeProfile(requestPayload, openRouterKey, groqKey);
    
    if (!response.success || !response.profile) {
      return NextResponse.json(response, { status: 500 });
    }
    
    const profile = response.profile;
    
    const targetDomain: TargetRole = body.targetRole || 'fullstack';
    const targetTier: ExperienceTier = body.experienceTier || profile.detectedSeniority || 'junior';
    
    const benchmark = getRoleBenchmark(targetDomain, targetTier);
    const allDomainMatches = calculateAllDomainMatches(profile, targetTier);
    const primaryMatch = allDomainMatches.find(m => m.domain === targetDomain) || allDomainMatches[0];
    
    const skillGapAnalysis = analyzeSkillGaps(profile, benchmark);
    const resources = getResourcesForGaps(skillGapAnalysis, targetTier, targetDomain);
    const actionPlan = generateActionPlan(profile, benchmark, skillGapAnalysis, resources);
    
    return NextResponse.json({
      success: true,
      profile,
      analysis: {
        primaryMatch,
        allDomainMatches,
        skillGapAnalysis,
        resources,
        actionPlan
      },
      // Keep unwrapped for backward compatibility or strict ComprehensiveAnalysisResult matching
      primaryMatch,
      allDomainMatches,
      skillGapAnalysis,
      resources,
      actionPlan
    });
  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
