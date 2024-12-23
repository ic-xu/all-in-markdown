import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Document } from '../types/document';
import { readDirectory, readFile, writeFile, createDirectory } from '../services/fileSystem';

interface EditorState {
  documents: Document[];
  selectedId: string | null;
  content: string;
  showSidebar: boolean;
  showPreview: boolean;
  showChat: boolean; // Add this line
  theme: 'default' | 'dark' | 'green';
  currentPath: string | null;
  isLoading: boolean;
  error: string | null;
  setDocuments: (documents: Document[]) => void;
  setSelectedId: (id: string | null) => void;
  setContent: (content: string) => void;
  toggleSidebar: () => void;
  togglePreview: () => void;
  toggleChat: () => void; // Add this line
  setTheme: (theme: 'default' | 'dark' | 'green') => void;
  setCurrentPath: (path: string) => void;
  loadDirectory: (path: string| null) => Promise<void>;
  loadFile: (path: string) => Promise<void>;
  saveFile: (path: string, content: string) => Promise<void>;
  createDocument: (parentPath: string, type: 'file' | 'folder', name: string) => Promise<void>;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      documents: [],
      selectedId: null,
      content: '',
      showSidebar: true,
      showPreview: true,
      showChat: false, // Add this line
      theme: 'default',
      currentPath: null,
      isLoading: false,
      error: null,

      setDocuments: (documents) => set({ documents }),
      setSelectedId: (selectedId) => set({ selectedId }),
      setContent: (content) => set({ content }),
      toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
      togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),
      toggleChat: () => set((state) => ({ showChat: !state.showChat })), // Add this line
      setTheme: (theme) => {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');

        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'green') {
          document.documentElement.setAttribute('data-theme', 'green');
        }

        set({ theme });
      },

      // ... rest of the store implementation remains the same
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({
        theme: state.theme,
        currentPath: state.currentPath,
      }),
    }
  )
);