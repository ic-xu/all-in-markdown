import React from 'react';
import { FileText, FolderTree, BookOpen, GitBranch, Search, MessageCircle } from 'lucide-react';
import { useEditorStore } from '@/app/store/editorStore';
import ThemeSelector from '@/app/components/ThemeSelector';
import Settings from '@/app/components/Settings';
import { usePluginManager } from '../hooks/usePluginManager';
export interface VerticalToolbarProps {
    className: string;
}

export default function VerticalToolbar({className}: VerticalToolbarProps) {
  const {
    showSidebar,
    showChat,
    toggleSidebar,
    toggleChat,
  } = useEditorStore();
  
  const pluginManager = usePluginManager();
  const toolbarItems = pluginManager.getToolbarItems();
  const leftItems = toolbarItems.filter(item => item.position === 'left');
  const rightItems = toolbarItems.filter(item =>
    item.position === 'right' &&
    !item.id.includes('theme-toggle')
  );

  return (
    <div className={`left-0 top-0 h-full ${className} bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-2 space-y-4`}>
      <button
        className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${
          !showChat ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        onClick={() => showChat && toggleChat()}
        title="Editor"
      >
        <FileText className="w-8 h-8 text-gray-600 dark:text-gray-300" />
      </button>
      <button
        className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${
          showChat ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        onClick={() => !showChat && toggleChat()}
        title="Chat"
      >
        <MessageCircle className="w-8 h-8  text-gray-600 dark:text-gray-300" />
      </button>
      {/*<button*/}
      {/*  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"*/}
      {/*  onClick={toggleSidebar}*/}
      {/*  title={showSidebar ? "Hide Sidebar" : "Show Sidebar"}*/}
      {/*>*/}
      {/*  <FolderTree className="w-5 h-5 text-gray-600 dark:text-gray-300" />*/}
      {/*</button>*/}
      {/*<button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">*/}
      {/*  <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />*/}
      {/*</button>*/}
      {/*<button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">*/}
      {/*  <GitBranch className="w-5 h-5 text-gray-600 dark:text-gray-300" />*/}
      {/*</button>*/}
      {/*<button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">*/}
      {/*  <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />*/}
      {/*</button>*/}
      <div className={"relative w-8 h-8  "}>
          <ThemeSelector />
      </div>
      {leftItems.map(item => (
        <div key={item.id}>{item.render()}</div>
      ))}
      <div className="flex-1" />
      {rightItems.map(item => (
        <div key={item.id}>{item.render()}</div>
      ))}
      <Settings />
    </div>
  );
}