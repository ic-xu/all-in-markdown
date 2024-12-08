import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import type { DocumentTreeItem } from '@/app/types/document';

interface TreeNodeProps {
  item: DocumentTreeItem;
  level: number;
}

function TreeNode({ item, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { loadFile } = useEditorStore();

  const handleSelect = () => {
    if (item.type === 'file') {
      loadFile(item.id);
    }
  };

  return (
    <div>
      <div
        onClick={handleSelect}
        className="flex items-center px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group"
        style={{ paddingLeft: `${(level + 1) * 16}px` }}
      >
        {item.type === 'folder' && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </span>
        )}
        {item.type === 'folder' ? (
          isExpanded ? (
            <FolderOpen className="w-4 h-4 text-blue-500 mr-2" />
          ) : (
            <Folder className="w-4 h-4 text-blue-500 mr-2" />
          )
        ) : (
          <FileText className="w-4 h-4 text-gray-500 mr-2" />
        )}
        <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
          {item.title}
        </span>
      </div>

      {item.type === 'folder' && isExpanded && item.children.length > 0 && (
        <div>
          {item.children.map((child) => (
            <TreeNode key={child.id} item={child} level={level + 1} />
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
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800 ml-12">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Documents</h2>
      </div>
      <div className="py-2">
        {documents.map((doc) => (
          <TreeNode key={doc.id} item={doc} level={0} />
        ))}
      </div>
    </div>
  );
}