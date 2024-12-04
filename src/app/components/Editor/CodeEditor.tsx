import React, { useCallback } from 'react';
import { useEditorStore } from '@/app/store/editorStore';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className="flex-1 w-full p-4 resize-none focus:outline-none font-mono 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        [data-theme='green']:bg-emerald-800 [data-theme='green']:text-emerald-100"
      placeholder="Start writing your markdown here..."
    />
  );
}