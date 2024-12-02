import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../themes/ThemeContext';
import { defaultTheme } from '../themes/defaultTheme';
import { darkTheme } from '../themes/darkTheme';
import { greenTheme } from '../themes/greenTheme';

const themes = [defaultTheme, darkTheme, greenTheme];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, getThemeClass } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ThemeIcon = currentTheme.icon;

  return (
    <div className={`relative ${currentTheme.styles.background}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 ${getThemeClass('background', 'hover')} rounded flex items-center gap-2 ${getThemeClass('text', 'secondary')}`}
        title="Change Theme"
      >

        <div className="w-5 h-5"> <ThemeIcon /></div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 ${getThemeClass('background', 'primary')} rounded-lg shadow-lg py-1 z-50`}>
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = currentTheme.id === themeOption.id;
            return (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 ${getThemeClass('background', 'hover')}
                  ${isSelected ? getThemeClass('background', 'secondary') : ''}`}
              >
                <Icon className="w-4 h-4" />
                <span className={getThemeClass('text', 'primary')}>{themeOption.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}