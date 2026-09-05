import { NextRequest, NextResponse } from 'next/server';
import { extractPdfText } from '@/lib/parser/pdf';
import * as mammoth from 'mammoth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function checkMagicBytes(buffer: Buffer, fileType: string): boolean {
  if (fileType === 'pdf') {
    // %PDF (25 50 44 46)
    return buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
  }
  if (fileType === 'docx') {
    // PK\x03\x04 (50 4B 03 04)
    return buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4B && buffer[2] === 0x03 && buffer[3] === 0x04;
  }
  return true; // txt has no strict magic bytes
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'File exceeds 5MB limit' }, { status: 400 });
    }

    const filename = file.name.toLowerCase();
    let fileType = '';
    if (filename.endsWith('.pdf')) fileType = 'pdf';
    else if (filename.endsWith('.docx')) fileType = 'docx';
    else if (filename.endsWith('.txt')) fileType = 'txt';
    else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!checkMagicBytes(buffer, fileType)) {
      return NextResponse.json({ success: false, error: 'Invalid file signature' }, { status: 400 });
    }

    let text = '';
    if (fileType === 'pdf') {
      text = await extractPdfText(buffer);
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType === 'txt') {
      text = buffer.toString('utf-8');
    }

    // Normalize and sanitize
    text = text.replace(/\s+/g, ' ').trim();
    if (text.length < 50) {
      return NextResponse.json({ success: false, error: 'Parsed text too short (min 50 chars)' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      text,
      charCount: text.length,
      wordCount: text.split(/\s+/).length,
      filename: file.name,
      fileType
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
