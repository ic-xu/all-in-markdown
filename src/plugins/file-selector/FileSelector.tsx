import React, { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useEditorStore } from '@/store/editorStore';

export default function FileSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loadFile } = useEditorStore();

  const handleFileSelect = async () => {
    try {
      const response = await fetch('/api/files/select-file', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to select file');
      }
      
      const { path } = await response.json();
      if (path) {
        loadFile(path);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleFileSelect}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-gray-600 dark:text-gray-300"
        title="Open File"
      >
        <FaPlus className="w-5 h-5" />
      </button>
    </>
  );
}