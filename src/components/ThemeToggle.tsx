import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
// import { useTheme } from '@/themes/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-400" />}
    </button>
  );
}

export default ThemeToggle;