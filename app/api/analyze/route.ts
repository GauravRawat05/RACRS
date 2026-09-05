import { NextRequest, NextResponse } from 'next/server';
import { extractResumeProfile } from '@/lib/ai/gateway';
import { ResumeAnalysisRequest } from '@/lib/types/profile';

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
    
    if (!body.resumeText) {
      return NextResponse.json({ success: false, error: 'Missing resumeText in request body' }, { status: 400 });
    }
    
    const requestPayload: ResumeAnalysisRequest = {
      resumeText: body.resumeText,
      targetRole: body.targetRole,
      experienceTier: body.experienceTier,
      candidatePurpose: body.candidatePurpose
    };
    
    const response = await extractResumeProfile(requestPayload, openRouterKey, groqKey);
    
    if (!response.success) {
      return NextResponse.json(response, { status: 500 });
    }
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
