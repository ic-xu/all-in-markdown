import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { validatePath } from '@/app/api/lib/security';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const validatedPath = validatePath(filePath);
    if (!validatedPath) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const content = await fs.readFile(validatedPath, 'utf-8');
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path: filePath, content } = await request.json();

    if (!filePath || content === undefined) {
      return NextResponse.json(
        { error: 'Path and content are required' },
        { status: 400 }
      );
    }

    const validatedPath = validatePath(filePath);
    if (!validatedPath) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    await fs.writeFile(validatedPath, content, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 }
    );
  }
}