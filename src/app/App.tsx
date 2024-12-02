'use client'

import React, { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import DocumentList from './components/DocumentList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import DirectorySelector from './components/DirectorySelector';
import { useEditorStore } from './store/editorStore';
import { buildDocumentTree } from './utils/treeUtils';

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

      <div className={`h-full relative`}>
        <div className=" flex flex-col">
          <Toolbar value={content} className={`h-32`} />
          <div className="h-full flex-1">
            <PanelGroup direction="horizontal">
              {showSidebar && (
                <>
                  <Panel defaultSize={20} minSize={MIN_PANEL_SIZE}>
                    <DocumentList documents={documentTree} />
                  </Panel>
                  <PanelResizeHandle
                    className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
                </>
              )}
              <Panel defaultSize={showPreview ? 40 : 80} minSize={30}>
                <Editor value={content} onChange={setContent} />
              </Panel>
              {showPreview && (
                <>
                  <PanelResizeHandle
                    className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize" />
                  <Panel defaultSize={40} minSize={MIN_PANEL_SIZE}>
                    <Preview content={content} />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </div>
        </div>
      </div>
    </>
  );
}