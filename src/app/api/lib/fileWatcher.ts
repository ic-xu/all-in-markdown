import chokidar from 'chokidar';
import { validatePath } from './security.ts';

export function watchDirectory(dirPath: string, callback: (event: any) => void) {
  const validPath = validatePath(dirPath);
  if (!validPath) {
    throw new Error('Invalid path');
  }

  const watcher = chokidar.watch(validPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on('add', path => callback({ type: 'add', path }))
    .on('change', path => callback({ type: 'change', path }))
    .on('unlink', path => callback({ type: 'delete', path }))
    .on('addDir', path => callback({ type: 'addDir', path }))
    .on('unlinkDir', path => callback({ type: 'deleteDir', path }))
    .on('error', error => callback({ type: 'error', error: error.message }));

  return watcher;
}