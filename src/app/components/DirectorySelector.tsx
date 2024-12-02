import React from 'react';
import { FolderOpen } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface DirectorySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectorySelector({ isOpen, onClose }: DirectorySelectorProps) {
  const { setCurrentPath } = useEditorStore();

  if (!isOpen) return null;

  const handleDirectorySelect = async () => {
    try {
      const response = await fetch('/api/files/select-directory', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to select directory');
      }
      
      const { path } = await response.json();
      setCurrentPath(path);
      onClose();
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <FolderOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Select Working Directory</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a directory from your system to work with. This will be your workspace for editing files.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleDirectorySelect}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FolderOpen className="w-5 h-5" />
            Browse Directory
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}