import { promises as fs } from 'fs';
import path from 'path';

export async function getFileStats(filePath: string, name: string) {
  const stats = await fs.stat(filePath);
  return {
    name,
    path: filePath,
    parentPath: path.dirname(filePath),
    type: stats.isDirectory() ? 'directory' : 'file',
    size: stats.size,
    modified: stats.mtime,
    created: stats.birthtime,
  };
}