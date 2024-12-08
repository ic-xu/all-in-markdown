import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from '../themes/ThemeContext';
import {defaultTheme} from '../themes/defaultTheme';
import {darkTheme} from '../themes/darkTheme';
import {greenTheme} from '../themes/greenTheme';

const themes = [defaultTheme, darkTheme, greenTheme];

export default function ThemeSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const {currentTheme, setTheme, getThemeClass} = useTheme();
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
        <div className={`flex flex-row ${currentTheme.styles.background}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={` flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${getThemeClass('text', 'secondary')}`}
                title="Change Theme"
            >
                <ThemeIcon/>
            </button>

            {isOpen && (
                <div
                    className={`absolute left-full ml-0 mt-0 w-48 ${getThemeClass('background', 'primary')} rounded-lg shadow-lg py-1 z-50`}>
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
                                <Icon className="w-4 h-4"/>
                                <span className={getThemeClass('text', 'primary')}>{themeOption.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}