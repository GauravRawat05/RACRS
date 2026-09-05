export function extractJsonFromText(rawText: string): any {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or non-string response from LLM');
  }

  // 1. Strip markdown fences if present
  let sanitized = rawText.replace(/```(?:json)?([\s\S]*?)```/gi, '$1').trim();

  // 2. Find boundaries of root JSON object
  const firstBrace = sanitized.indexOf('{');
  const lastBrace = sanitized.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error('No valid JSON object boundaries found in response');
  }

  sanitized = sanitized.slice(firstBrace, lastBrace + 1);

  // 3. Parse JSON safely
  try {
    return JSON.parse(sanitized);
  } catch (err: any) {
    throw new Error(`JSON parsing failed: ${err.message}`);
  }
}
