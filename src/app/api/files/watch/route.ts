import { NextRequest, NextResponse } from 'next/server';
import { watchDirectory } from '@/app/lib/fileWatcher';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dirPath = searchParams.get('path');

    if (!dirPath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const stream = new ReadableStream({
      start(controller) {
        const watcher = watchDirectory(dirPath, (event) => {
          controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
        });

        return () => watcher.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error setting up file watcher:', error);
    return NextResponse.json(
      { error: 'Failed to setup file watcher' },
      { status: 500 }
    );
  }
}