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
  theme: string;
  currentPath: string | null;
  isLoading: boolean;
  error: string | null;
  setDocuments: (documents: Document[]) => void;
  setSelectedId: (id: string | null) => void;
  setContent: (content: string) => void;
  toggleSidebar: () => void;
  togglePreview: () => void;
  setTheme: (theme: string) => void;
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
      theme: 'default',
      currentPath: null,
      isLoading: false,
      error: null,

      setDocuments: (documents) => set({ documents }),
      setSelectedId: (selectedId) => set({ selectedId }),
      setContent: (content) => set({ content }),
      toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
      togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),
      setCurrentPath: (currentPath) => set({ currentPath }),
      
      setTheme: (theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },

      loadDirectory: async (path) => {
          if (path === null) {
            path = '';
          }
        set({ isLoading: true, error: null });
        try {
          const documents = await readDirectory(path);
          set({ documents, currentPath: path });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to load directory' });
        } finally {
          set({ isLoading: false });
        }
      },

      loadFile: async (path) => {
        set({ isLoading: true, error: null });
        try {
          const content = await readFile(path);
          set({ content, selectedId: path });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to load file' });
        } finally {
          set({ isLoading: false });
        }
      },

      saveFile: async (path, content) => {
        set({ isLoading: true, error: null });
        try {
          await writeFile(path, content);
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to save file' });
        } finally {
          set({ isLoading: false });
        }
      },

      createDocument: async (parentPath, type, name) => {
        set({ isLoading: true, error: null });
        try {
          const newPath = `${parentPath}/${name}`;
          if (type === 'folder') {
            await createDirectory(newPath);
          } else {
            await writeFile(newPath, '# New Document\n\nStart writing here...');
          }
          await get().loadDirectory(parentPath);
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create document' });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({
        currentPath: state.currentPath,
        theme: state.theme,
      }),
    }
  )
);