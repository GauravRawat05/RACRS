import { ResumeAnalysisRequest, ResumeAnalysisResponse } from '@/lib/types/profile';
import { RESUME_EXTRACTION_SYSTEM_PROMPT, buildResumeExtractionUserPrompt } from './prompts';
import { extractJsonFromText } from './jsonSanitizer';
import { validateCandidateProfile } from './profileValidator';
import { extractMockProfile } from './mock';

export async function extractResumeProfile(
  request: ResumeAnalysisRequest,
  openRouterKey?: string,
  groqKey?: string
): Promise<ResumeAnalysisResponse> {
  const { resumeText, targetRole, experienceTier } = request;
  const userPrompt = buildResumeExtractionUserPrompt(resumeText, { targetRole, experienceTier });

  const orKey = openRouterKey || process.env.OPENROUTER_API_KEY;
  const gKey = groqKey || process.env.GROQ_API_KEY;

  // Tier 1: OpenRouter
  if (orKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      
      const startTime = Date.now();
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${orKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          'X-Title': 'AI Resume Career Platform'
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            { role: 'system', content: RESUME_EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = extractJsonFromText(content);
          const profile = validateCandidateProfile(parsed, experienceTier, {
            provider: 'openrouter',
            model: data.model || 'openrouter/free',
            latencyMs: Date.now() - startTime,
            fallbackUsed: false
          });
          return { success: true, profile };
        }
      }
    } catch (err) {
      console.warn('Tier 1 OpenRouter failed:', err);
    }
  }

  // Tier 2: Groq
  if (gKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const startTime = Date.now();
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: RESUME_EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = extractJsonFromText(content);
          const profile = validateCandidateProfile(parsed, experienceTier, {
            provider: 'groq',
            model: data.model || 'llama-3.3-70b-versatile',
            latencyMs: Date.now() - startTime,
            fallbackUsed: true
          });
          return { success: true, profile };
        }
      }
    } catch (err) {
      console.warn('Tier 2 Groq failed:', err);
    }
  }

  // Tier 3: Mock
  try {
    const mockProfile = extractMockProfile(resumeText, { targetRole, experienceTier });
    return { success: true, profile: mockProfile };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
