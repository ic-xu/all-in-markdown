import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import DocumentList from './DocumentList';
import Editor from './Editor';
import Preview from './Preview';
import Toolbar from './Toolbar';
import DirectorySelector from './DirectorySelector';
import { useEditorStore } from '@/store/editorStore';
import { buildDocumentTree } from '@/utils/treeUtils';

const MIN_PANEL_SIZE = 15;

export default function App() {
  const {
    documents,
    content,
    showSidebar,
    showPreview,
    currentPath,
    setContent,
  } = useEditorStore();

  const [showDirectorySelector, setShowDirectorySelector] = useState(!currentPath);

  useEffect(() => {
    if (!currentPath) {
      setShowDirectorySelector(true);
    }
  }, [currentPath]);

  const documentTree = buildDocumentTree(documents);

  return (
    <>
      <DirectorySelector
        isOpen={showDirectorySelector}
        onClose={() => setShowDirectorySelector(false)}
      />

      <div className="h-screen flex flex-col">
        <Toolbar value={content} className={``} />
        <div className="flex-1">
          <PanelGroup direction="horizontal">
            {showSidebar && (
              <>
                <Panel defaultSize={20} minSize={MIN_PANEL_SIZE}>
                  <DocumentList documents={documentTree} />
                </Panel>
                <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
              </>
            )}
            <Panel defaultSize={showPreview ? 40 : 80} minSize={30}>
              <Editor value={content} onChange={setContent} />
            </Panel>
            {showPreview && (
              <>
                <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
                <Panel defaultSize={40} minSize={MIN_PANEL_SIZE}>
                  <Preview content={content} />
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
    </>
  );
}