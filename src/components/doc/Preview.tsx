import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { useTheme } from '@/themes/ThemeContext';

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const { currentTheme } = useTheme();

  return (
    <div className={`h-full flex-1 flex flex-col ${currentTheme.styles.background.primary}`}>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}