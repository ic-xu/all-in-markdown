import React, {useEffect, useState} from 'react';
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import DocumentList from '@/components/doc/DocumentList';
import Editor from '@/components/doc/Editor';
import Preview from '@/components/doc//Preview';
import VerticalToolbar from '@/components/doc/VerticalToolbar';
import {useEditorStore} from '@/store/editorStore';
import {buildDocumentTree} from '@/utils/treeUtils';

const MIN_PANEL_SIZE = 1;

export default function DocsFrame() {
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

    console.log('App render', currentPath);

    const [showDirectorySelector, setShowDirectorySelector] = useState(true);

    useEffect(() => {
        if (!currentPath) {
            setShowDirectorySelector(false);
        }
    }, [currentPath]);

    const documentTree = buildDocumentTree(documents);

    const themeClasses = {
        default: 'bg-white',
        dark: 'bg-gray-900',
        green: 'bg-emerald-900',
    };

    return (
        <div className={`h-full flex flex-row w-full  ${themeClasses[theme as keyof typeof themeClasses]}`}>
            <VerticalToolbar className={"w-20"}/>
            <div className="flex flex-1 items-start w-full h-full overflow-hidden">
                <>
                    <PanelGroup direction="horizontal">
                        {showSidebar && (
                            <>
                                <Panel id='document-sider-bar' defaultSize={20} minSize={MIN_PANEL_SIZE} order={1}>
                                    <DocumentList documents={documentTree}/>
                                </Panel>
                                <PanelResizeHandle
                                    className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize"/>
                            </>
                        )}
                        <Panel id='editor' defaultSize={showPreview ? 40 : 80} minSize={30} order={2}>
                            <Editor value={content} onChange={setContent}/>
                        </Panel>
                        {showPreview && !showChat && (
                            <>
                                <PanelResizeHandle
                                    className="w-1 hover:w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-all duration-150 cursor-col-resize"/>
                                <Panel id='preview' defaultSize={40} minSize={MIN_PANEL_SIZE} order={3}>
                                    <Preview content={content}/>
                                </Panel>
                            </>
                        )}
                    </PanelGroup>
                </>)
            </div>
        </div>
    );
}