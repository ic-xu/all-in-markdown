import React from 'react';
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import DocumentList from '@/components/doc/DocumentList';
import Editor from '@/components/doc/Editor';
import Preview from '@/components/doc/Preview';
import {useEditorStore} from '@/store/editorStore';
import {buildDocumentTree} from '@/utils/treeUtils';
import { ThemeProvider } from '@/themes/ThemeContext';

const MIN_PANEL_SIZE = 15;

export default function DocsFrame() {
    const {
        documents,
        content,
        showSidebar,
        showPreview,
        currentPath,
        setContent,
    } = useEditorStore();

    const documentTree = buildDocumentTree(documents);

    return (
        <ThemeProvider>
            <div className="flex w-full">
                <PanelGroup direction="horizontal">
                    {showSidebar && (
                        <>
                            <Panel defaultSize={20} minSize={MIN_PANEL_SIZE}>
                                <DocumentList documents={documentTree}/>
                            </Panel>
                            <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize"/>
                        </>
                    )}
                    <Panel defaultSize={showPreview ? 40 : 80} minSize={30}>
                        <Editor value={content} onChange={setContent}/>
                    </Panel>
                    {showPreview && (
                        <>
                            <PanelResizeHandle className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize"/>
                            <Panel defaultSize={40} minSize={MIN_PANEL_SIZE}>
                                <Preview content={content}/>
                            </Panel>
                        </>
                    )}
                </PanelGroup>
            </div>
        </ThemeProvider>
    );
}