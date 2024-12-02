import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { validatePath } from '@/app/api/lib/security';
import { getFileStats } from '@/app/api/lib/files';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dirPath = searchParams.get('path');

    if (!dirPath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const validatedPath = validatePath(dirPath);
    if (!validatedPath) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const files = await fs.readdir(validatedPath);
    const fileStats = await Promise.all(
      files.map(async (name) => {
        const filePath = path.join(validatedPath, name);
        return getFileStats(filePath, name);
      })
    );

    return NextResponse.json(fileStats);
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    );
  }
}