import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import type { DocumentTreeItem } from '@/types/document';
import { useTheme } from '@/themes/ThemeContext';

interface TreeNodeProps {
  item: DocumentTreeItem;
  level: number;
}

function TreeNode({ item, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { loadFile } = useEditorStore();
  const { currentTheme } = useTheme();

  const handleSelect = () => {
    if (item.type === 'file') {
      loadFile(item.id);
    }
  };

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center px-4 py-2 hover:${currentTheme.styles.background.secondary} cursor-pointer group transition-colors`}
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
            <FolderOpen className="w-4 h-4 text-primary mr-2" />
          ) : (
            <Folder className="w-4 h-4 text-primary mr-2" />
          )
        ) : (
          <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
        )}
        <span className={`text-sm ${currentTheme.styles.text.primary} group-hover:${currentTheme.styles.text.secondary}`}>
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
  const { currentTheme } = useTheme();

  return (
    <div className={`h-full overflow-y-auto ${currentTheme.styles.background.primary}`}>
      <div className={`sticky top-0 ${currentTheme.styles.background.secondary} backdrop-blur-md border-b ${currentTheme.styles.border.primary} p-4`}>
        <h2 className={`text-lg font-semibold ${currentTheme.styles.text.primary}`}>Documents</h2>
      </div>
      <div className="py-2">
        {documents.map((doc) => (
          <TreeNode key={doc.id} item={doc} level={0} />
        ))}
      </div>
    </div>
  );
}