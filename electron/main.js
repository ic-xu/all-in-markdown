import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let watchDirectory = '';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // In development, load from local server
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    // Open DevTools in development
    win.webContents.openDevTools();
  } else {
    // In production, load from built files
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Handle open directory dialog
  ipcMain.handle('open-directory-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });
    return result.filePaths;
  });

  // Handle set watch directory
  ipcMain.handle('set-watch-directory', (event, directory) => {
    watchDirectory = directory;
    if (fs.existsSync(watchDirectory)) {
      fs.watch(watchDirectory, (eventType, filename) => {
        if (filename) {
          console.log(`File ${filename} changed: ${eventType}`);
          win.webContents.send('file-changed', { filename, eventType });
        }
      });
    } else {
      console.error(`Directory ${watchDirectory} does not exist.`);
    }
  });

  // Monitor network changes
  setInterval(() => {
    const networkInterfaces = os.networkInterfaces();
    win.webContents.send('network-changed', networkInterfaces);
  }, 5000);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});