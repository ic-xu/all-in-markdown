import React, { useEffect } from 'react';
import { FolderOpen } from 'lucide-react';

interface DirectorySelectorProps {
  onClose: () => void;
  onDirectorySelect: (path: string) => void;
  isOpen: boolean;
}

const DirectorySelector: React.FC<DirectorySelectorProps> = ({ onClose, onDirectorySelect, isOpen }) => {

  if(!isOpen) {
    return null;
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDirectorySelect = async () => {
    try {
      // 调用后端API来打开系统的目录选择器
      const response = await fetch('/api/files/directory/select', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to select directory');
      }

      const { path } = await response.json();
      
      if (path) {
        console.log('Selected directory:', path);
        onDirectorySelect(path);
        onClose();
      }
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
            Click the button below to open system file picker and choose your workspace directory.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleDirectorySelect}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FolderOpen className="w-5 h-5" />
            Choose Directory
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
};

export default DirectorySelector;