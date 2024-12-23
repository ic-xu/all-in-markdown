import React, { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import { usePluginManager } from '../hooks/usePluginManager';
import TopToolbar from "./TopToolbar.tsx";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const { selectedId } = useEditorStore();
  
  const pluginManager = usePluginManager();
  const eventBus = pluginManager.getEventBus();

  useEffect(() => {
    const handleInsert = (text: string) => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.substring(0, start) + text + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + text.length;
          textarea.focus();
        }, 0);
      }
    };

    eventBus.on('editor:insert', handleInsert);
    return () => {
      eventBus.off('editor:insert', handleInsert);
    };
  }, [value, onChange, eventBus]);

  return (
    <div className="h-full flex-1 flex flex-col">
      <TopToolbar value={value}/>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-4 resize-none focus:outline-none font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Start writing your markdown here..."
      />
    </div>
  );
}