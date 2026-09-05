import pdfParseCore from 'pdf-parse/lib/pdf-parse.js';

export async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParseCore(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to parse PDF file');
  }
}
