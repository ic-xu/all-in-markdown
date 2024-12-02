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

export async function createDirectory(path: string): Promise<void> {
  try {
    const response = await fetch(`/api/files/directory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    });
    if (!response.ok) {
      throw new Error('Failed to create directory');
    }
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
}