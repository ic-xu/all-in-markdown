import React from 'react';
import { FileText, FolderTree, BookOpen, GitBranch, Search } from 'lucide-react';
import { useEditorStore } from '@/app/store/editorStore';
import ThemeSelector from '@/app/components/ThemeSelector';
import Settings from '@/app/components/Settings';
import { usePluginManager } from '../hooks/usePluginManager';

export default function VerticalToolbar() {
  const {
    documents,
    content,
    showSidebar,
    showPreview,
    currentPath,
    theme,
    setContent,
    toggleSidebar,
    togglePreview,
    selectedId,
    saveFile,
    isLoading
  } = useEditorStore();
  const pluginManager = usePluginManager();
  const toolbarItems = pluginManager.getToolbarItems();
  const leftItems = toolbarItems.filter(item => item.position === 'left');
  const rightItems = toolbarItems.filter(item =>
    item.position === 'right' &&
    !item.id.includes('theme-toggle')
  );


  return (
    <div className="fixed left-0 top-0 h-full w-10 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-2 space-y-4">
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" onClick={toggleSidebar}>
        <FolderTree className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <GitBranch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      <ThemeSelector />
      {leftItems.map(item => (
        <div key={item.id}>{item.render()}</div>
      ))}
      <div className="flex-1" />

      <Settings />
    </div>
  );
}