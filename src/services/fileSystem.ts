import { Document } from '../types/document';

export async function readDirectory(path?: string): Promise<Document[]> {
  if (!path) {
    path = '/';
  }
  try {
    const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      throw new Error('Failed to read directory');
    }
    const files = await response.json();
    return files.map((file: any) => ({
      id: file.path,
      title: file.name,
      content: '',
      parentId: file.parentPath || null,
      type: file.type === 'directory' ? 'folder' : 'file'
    }));
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
}

export async function readFile(path: string): Promise<string> {
  try {
    const response = await fetch(`/api/files/content?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      throw new Error('Failed to read file');
    }
    return await response.text();
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

export async function writeFile(path: string, content: string): Promise<void> {
  try {
    const response = await fetch(`/api/files/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path, content }),
    });
    if (!response.ok) {
      throw new Error('Failed to write file');
    }
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}

export async function createDirectory(path: string, type: 'file' | 'folder', name: string): Promise<void> {
  try {
    const response = await fetch(`/api/files/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path, name }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create ${type}`);
    }
  } catch (error) {
    console.error(`Error creating ${type}:`, error);
    throw error;
  }
}