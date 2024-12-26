
import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { useEditorStore } from '@/store/editorStore';

export const GreenThemeToggleButton = () => {
    const { theme, setTheme } = useEditorStore();
    return (
        <button
            onClick={() => setTheme(theme === 'green' ? 'default' : 'green')}
            className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-700 rounded text-emerald-600 dark:text-emerald-300"
            title={theme === 'green' ? 'Switch to Light Theme' : 'Switch to Green Theme'}
        >
            <FaLeaf className="w-5 h-5" />
        </button>
    );
};