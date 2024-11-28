import React from 'react';
import { Sidebar, PanelRightClose } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const { showSidebar, showPreview, toggleSidebar, togglePreview } = useEditorStore();

  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title={showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          >
            <Sidebar className="w-5 h-5" />
          </button>
          <button
            onClick={togglePreview}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title={showPreview ? "Hide Preview" : "Show Preview"}
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-4 resize-none focus:outline-none font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Start writing your markdown here..."
      />
    </div>
  );
}