import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import DocumentList from '@/app/components/DocumentList';
import Editor from '@/app/components/Editor';
import Preview from '@/app/components/Preview';
import VerticalToolbar from '@/app/components/VerticalToolbar';
import TopToolbar from '@/app/components/TopToolbar';
import DirectorySelector from '@/app/components/DirectorySelector';
import ChatInterface from '@/app/components/Chat/ChatInterface';
import { useEditorStore } from '@/app/store/editorStore';
import { buildDocumentTree } from '@/app/utils/treeUtils';

const MIN_PANEL_SIZE = 1;

export default function App() {
  const {
    documents,
    content,
    showSidebar,
    showPreview,
    showChat,
    currentPath,
    theme,
    setContent,
  } = useEditorStore();

  const [showDirectorySelector, setShowDirectorySelector] = useState(!currentPath);

  useEffect(() => {
    if (!currentPath) {
      setShowDirectorySelector(true);
    }
  }, [currentPath]);

  const documentTree = buildDocumentTree(documents);

  const themeClasses = {
    default: 'bg-white',
    dark: 'bg-gray-900',
    green: 'bg-emerald-900',
  };

  return (
    <div className={`h-full flex flex-col ${themeClasses[theme as keyof typeof themeClasses]}`}>
      <DirectorySelector
        isOpen={showDirectorySelector}
        onClose={() => setShowDirectorySelector(false)}
      />
      <TopToolbar value={content} />
      <div className="flex flex-1 overflow-hidden">
        <VerticalToolbar />
        <PanelGroup direction="horizontal">
          {showSidebar && (
            <>
              <Panel id='document-sider-bar' defaultSize={20} minSize={MIN_PANEL_SIZE} order={1}>
                <DocumentList documents={documentTree} />
              </Panel>
              <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
            </>
          )}
          <Panel id='editor' defaultSize={showPreview || showChat ? 40 : 80} minSize={30} order={2}>
            {showChat ? <ChatInterface /> : <Editor value={content} onChange={setContent} />}
          </Panel>
          {showPreview && !showChat && (
            <>
              <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
              <Panel id='preview' defaultSize={40} minSize={MIN_PANEL_SIZE} order={3}>
                <Preview content={content} />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  );
}