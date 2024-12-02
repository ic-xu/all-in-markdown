import path from 'path';
import { promises as fs } from 'fs';

const BASE_PATH = process.env.BASE_PATH || process.cwd();

export function validatePath(inputPath: string): string | null {
  try {
    // Resolve the absolute path
    const absolutePath = path.resolve(BASE_PATH, inputPath);
    
    // Check if the path is within the base directory
    if (!absolutePath.startsWith(BASE_PATH)) {
      console.error('Path traversal attempt detected:', inputPath);
      return null;
    }

    return absolutePath;
  } catch (error) {
    console.error('Path validation error:', error);
    return null;
  }
}

export async function checkPermissions(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}