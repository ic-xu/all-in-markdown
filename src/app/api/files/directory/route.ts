import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { validatePath } from '@/app/lib/security';

export async function POST(request: NextRequest) {
  try {
    const { path: dirPath } = await request.json();

    if (!dirPath) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    const validatedPath = validatePath(dirPath);
    if (!validatedPath) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    await fs.mkdir(validatedPath, { recursive: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating directory:', error);
    return NextResponse.json(
      { error: 'Failed to create directory' },
      { status: 500 }
    );
  }
}