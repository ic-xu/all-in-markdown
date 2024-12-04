import React from 'react';
import CodeEditor from './CodeEditor';
import { usePluginManager } from '@/app/hooks/usePluginManager';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const pluginManager = usePluginManager();
  const eventBus = pluginManager.getEventBus();

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
    <div className="h-full flex-1 flex flex-col">
      <CodeEditor value={value} onChange={onChange} />
    </div>
  );
}