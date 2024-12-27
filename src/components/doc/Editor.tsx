import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { usePluginManager } from '@/hooks/usePluginManager';
import { useTheme } from '@/themes/ThemeContext';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const { selectedId } = useEditorStore();
  const pluginManager = usePluginManager();
  const eventBus = pluginManager.getEventBus();
  const { currentTheme } = useTheme();

  React.useEffect(() => {
    const handleInsert = (text: string) => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.substring(0, start) + text + value.substring(end);
        onChange(newValue);
        
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + text.length;
          textarea.focus();
        });
      }
    };

    eventBus.on('editor:insert', handleInsert);
    return () => {
      eventBus.off('editor:insert', handleInsert);
    };
  }, [value, onChange, eventBus]);

  return (
    <div className={`h-full flex-1 flex flex-col ${currentTheme.styles.background.primary}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 w-full p-6 resize-none focus:outline-none font-mono bg-transparent ${currentTheme.styles.text.primary} placeholder-gray-500 dark:placeholder-gray-400`}
        placeholder="Start writing your markdown here..."
      />
    </div>
  );
}