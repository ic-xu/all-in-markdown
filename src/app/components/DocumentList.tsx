'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Folder, FolderOpen, ChevronRight, ChevronDown, RefreshCcw, AlertCircle, Plus } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import type { DocumentTreeItem } from '@/types';

interface TreeNodeProps {
  item: DocumentTreeItem;
  level: number;
}

function TreeNode({ item, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { loadFile, createDocument } = useEditorStore();

  const handleSelect = () => {
    if (item.type === 'file') {
      loadFile(item.id);
    }
  };

  const handleCreateItem = async (type: 'file' | 'folder') => {
    setIsCreating(true);
    setNewItemName('');
  };

  const handleSubmitCreate = async (type: 'file' | 'folder') => {
    if (newItemName) {
      await createDocument(item.id, type, newItemName);
      setIsCreating(false);
      setIsExpanded(true);
    }
  };

  return (
    <div>
      <div
        className="relative group"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div
          onClick={handleSelect}
          className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer
            ${item.id === item.id && item.type === 'file' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''}
            ${item.type === 'folder' ? 'font-medium' : ''}`}
          style={{ paddingLeft: `${(level + 1) * 12}px` }}
        >
          {item.type === 'folder' && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded cursor-pointer"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </span>
          )}
          {item.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-yellow-500" />
            ) : (
              <Folder className="w-4 h-4 text-yellow-500" />
            )
          ) : (
            <FileText className="w-4 h-4 text-gray-500" />
          )}
          <span className="truncate text-gray-800 dark:text-gray-200">{item.title}</span>
        </div>
        
        {showActions && item.type === 'folder' && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateItem('file');
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="New File"
            >
              <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateItem('folder');
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="New Folder"
            >
              <Folder className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        )}
      </div>

      {isCreating && (
        <div className="ml-8 mt-2 flex items-center gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter name..."
            className="px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitCreate(item.type);
              } else if (e.key === 'Escape') {
                setIsCreating(false);
              }
            }}
          />
          <button
            onClick={() => handleSubmitCreate(item.type)}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
      
      {item.type === 'folder' && isExpanded && item.children.length > 0 && (
        <div className="ml-2">
          {item.children.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface DocumentListProps {
  documents: DocumentTreeItem[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  const { loadDirectory, currentPath, isLoading, error } = useEditorStore();

  useEffect(() => {
    if (currentPath)
      loadDirectory(currentPath);
  }, [currentPath]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Documents</h2>
          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
            )}
            <button
              onClick={() => loadDirectory(currentPath)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              title="Refresh"
            >
              <RefreshCcw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {currentPath}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {documents.map((doc) => (
          <TreeNode
            key={doc.id}
            item={doc}
            level={0}
          />
        ))}
      </div>
    </div>
  );
}