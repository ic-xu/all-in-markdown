import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from '@/themes/ThemeContext';
import {defaultTheme} from '@/themes/defaultTheme';
import {darkTheme} from '@/themes/darkTheme';
import {greenTheme} from '@/themes/greenTheme';

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
        <div className={`${currentTheme.styles.background}`} ref={dropdownRef}>
                            <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`p-4 rounded-2xl transition-all duration-300 relative group text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-primary hover:scale-100
                    }`}                    title="Change Theme"
                >
                    <div className="w-6 h-6"><ThemeIcon/></div>
                </button>
                {isOpen && (
                    <div className={`absolute left-full w-48 ${getThemeClass('background', 'primary')} rounded-lg shadow-lg py-1`}>
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
                                    <Icon/>
                                    <span className={getThemeClass('text', 'primary')}>{themeOption.name}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
        </div>
    );
}