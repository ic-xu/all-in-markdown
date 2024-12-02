import React from 'react';
import { usePluginManager } from '../hooks/usePluginManager';
import Settings from './Settings';
import {PanelRightClose, Save, Sidebar} from "lucide-react";
import {useEditorStore} from "../store/editorStore";
interface EditorProps {
  value: string;
  className?:string;
}

export default function Toolbar({ value,className }: EditorProps) {
  const pluginManager = usePluginManager();
  const toolbarItems = pluginManager.getToolbarItems();
  
  const leftItems = toolbarItems.filter(item => item.position === 'left');
  const rightItems = toolbarItems.filter(item => item.position === 'right');

    const {
    showSidebar,
    showPreview,
    toggleSidebar,
    togglePreview,
    selectedId,
    saveFile,
    isLoading
  } = useEditorStore();

    const handleSave = async () => {
    if (selectedId) {
      await saveFile(selectedId, value);
    }
  };

  return (
      <div
          className={`border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between bg-white dark:bg-gray-800 pl-4 pr-4 ${className}`}>
          <div className="flex items-center gap-2">
              <button
                  onClick={handleSave}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Save"
                  disabled={!selectedId || isLoading}
              >
                  <Save className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              </button>
              <button
                  onClick={toggleSidebar}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
              >
                  <Sidebar className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              </button>
              <button
                  onClick={togglePreview}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title={showPreview ? "Hide Preview" : "Show Preview"}
              >
                  <PanelRightClose className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              </button>
              {leftItems.map(item => (
                  <div key={item.id}>{item.render()}</div>
              ))}
          </div>
          <div className="flex items-center gap-2">
              {rightItems.map(item => (
                  <div key={item.id}>{item.render()}</div>
              ))}
              <Settings/>
          </div>
      </div>
  );
}