import { FaComments, FaFileAlt } from 'react-icons/fa';
import ThemeSelector from '@/themes/ThemeSelector';
import React from 'react';
import { useTheme } from '@/themes/ThemeContext';

export interface SideNavProps {
  onNavClick: (view: string) => void;
  activeView: string;
}

const SideNav: React.FC<SideNavProps> = ({ onNavClick, activeView }) => {
  const { currentTheme } = useTheme();
  return (
    <div className={`relative flex flex-col h-full w-20 ${currentTheme.styles.background.primary} backdrop-blur-md border-r ${currentTheme.styles.border.primary} shadow-lg z-50`}>
      <nav className="flex flex-col items-center py-6 space-y-4">
        <button
          className={`p-4 rounded-2xl transition-all duration-300 relative group
            ${activeView === 'chat-ui'
              ? 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 scale-100 ring ring-primary/20'
              : `${currentTheme.styles.text.primary} hover:${currentTheme.styles.background.secondary} hover:text-primary hover:scale-105`
          }`}
          onClick={() => onNavClick('chat-ui')}
        >
          <FaComments className="w-6 h-6" />
          <span className={`absolute left-16 ${currentTheme.styles.background.secondary} ${currentTheme.styles.text.primary}
            text-sm rounded-lg shadow-xl px-3 py-1.5
            opacity-0 group-hover:opacity-100 transition-all duration-300
            translate-x-2 group-hover:translate-x-0 pointer-events-none`}>
            Chat
          </span>
        </button>

        <button
          className={`p-4 rounded-2xl transition-all duration-300 relative group
            ${activeView === 'docs-ui'
              ? 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 scale-100 ring ring-primary/20'
              : `${currentTheme.styles.text.primary} hover:${currentTheme.styles.background.secondary} hover:text-primary hover:scale-105`
          }`}
          onClick={() => onNavClick('docs-ui')}
        >
          <FaFileAlt className="w-6 h-6" />
          <span className={`absolute left-16 ${currentTheme.styles.background.secondary} ${currentTheme.styles.text.primary}
            text-sm rounded-lg shadow-xl px-3 py-1.5
            opacity-0 group-hover:opacity-100 transition-all duration-300
            translate-x-2 group-hover:translate-x-0 pointer-events-none`}>
            Documents
          </span>
        </button>

        <ThemeSelector />
      </nav>
    </div>
  );
}

export default SideNav;