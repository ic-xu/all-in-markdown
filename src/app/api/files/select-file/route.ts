import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a real electron app, we would use dialog.showOpenDialog
    // For this demo, we'll use a fixed path
    const path = process.env.BASE_PATH || process.cwd();
    
    return NextResponse.json({ path });
  } catch (error) {
    console.error('Error selecting file:', error);
    return NextResponse.json(
      { error: 'Failed to select file' },
      { status: 500 }
    );
  }
}