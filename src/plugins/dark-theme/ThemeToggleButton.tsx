import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEditorStore } from '../../store/editorStore';


export function ThemeToggleButton() {
    const { theme, setTheme } = useEditorStore();
    return (
        <button
            onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title={theme === 'default' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        >
            {theme === 'default' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
        </button>
    );
}