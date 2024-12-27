import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Document } from '@/types/document';
import { readDirectory, readFile, writeFile, createDirectory } from '@/services/fileSystem';

interface EditorState {
  documents: Document[];
  selectedId: string | null;
  content: string;
  showSidebar: boolean;
  showPreview: boolean;
  showChat: boolean;
  theme: string;
  currentPath: string | null;
  isLoading: boolean;
  error: string | null;
  setDocuments: (documents: Document[]) => void;
  setSelectedId: (id: string | null) => void;
  setContent: (content: string) => void;
  toggleSidebar: () => void;
  togglePreview: () => void;
  toggleChat: () => void;
  setTheme: (theme: 'default' | 'dark' | 'green') => void;
  setCurrentPath: (path: string) => void;
  loadDirectory: (path: string | null) => Promise<void>;
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
      showChat: false,
      theme: 'default',
      currentPath: null,
      isLoading: false,
      error: null,
      setDocuments: (documents: Document[]) => set({ documents }),
      setSelectedId: (id: string | null) => set({ selectedId: id }),
      setContent: (content: string) => set({ content }),
      toggleSidebar: () => set((state: EditorState) => ({ showSidebar: !state.showSidebar })),
      togglePreview: () => set((state: EditorState) => ({ showPreview: !state.showPreview })),
      toggleChat: () => set((state) => ({ showChat: !state.showChat })),
      setTheme: (theme: 'default' | 'dark' | 'green') => set({ theme }),
      setCurrentPath: (path: string) => set({ currentPath: path }),
      loadDirectory: async (path: string | null) => {
        if (path) {
          set({ isLoading: true });
          try {
            const documents = await readDirectory(path);
            set({ documents, currentPath: path, isLoading: false });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: errorMessage, isLoading: false });
          }
        }
      },
      loadFile: async (path: string) => {
        set({ isLoading: true });
        try {
          const content = await readFile(path);
          set({ content, currentPath: path, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },
      saveFile: async (path: string, content: string) => {
        set({ isLoading: true });
        try {
          await writeFile(path, content);
          set({ isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },
      createDocument: async (parentPath: string, type: 'file' | 'folder', name: string) => {
        set({ isLoading: true });
        try {
          await createDirectory(parentPath, type, name);
          const documents = await readDirectory(parentPath);
          set({ documents, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },
    }),
    {
      name: 'editor-store',
    }
  )
);