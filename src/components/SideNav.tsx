import {FaComments, FaFileAlt} from 'react-icons/fa';
import ThemeSelector from "@/themes/ThemeSelector";
import Settings from "@/components/doc/Settings";
import React, {useState, useRef, useEffect} from 'react';
import {useTheme} from '@/themes/ThemeContext';
import {defaultTheme} from '@/themes/defaultTheme';
import {darkTheme} from '@/themes/darkTheme';
import {greenTheme} from '@/themes/greenTheme';

export interface SideNavProps {
    onNavClick: (view: string) => void;
    activeView: string;
}

const themes = [defaultTheme, darkTheme, greenTheme];

const SideNav: React.FC<SideNavProps> = ({onNavClick, activeView}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {currentTheme} = useTheme();
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

    return (
        <div className="relative flex flex-col h-full w-20 bg-white dark:bg-dark/40 dark:text-white
             backdrop-blur-md border-r border-gray-200 dark:border-gray-700/50 shadow-lg">
            <nav className="flex flex-col items-center py-6 space-y-4">
                <button
                    className={`p-4 rounded-2xl transition-all duration-300 relative group
                                                ${
                        activeView === 'chat-ui'
                            ? 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 scale-100 ring ring-primary/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60  hover:text-primary hover:scale-105'
                    }`}
                    onClick={() => onNavClick('chat-ui')}
                >
                    <FaComments className="w-6 h-6"/>
                    <span
                        className="absolute left-16 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        text-sm rounded-lg shadow-xl dark:shadow-gray-900/50 px-3 py-1.5
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        translate-x-2 group-hover:translate-x-0 pointer-events-none"
                    > Chat </span>
                </button>

                <button
                    className={`p-4 rounded-2xl transition-all duration-300 relative group
                              ${  activeView === 'docs-ui'
                            ? 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white shadow-lg shadow-primary/30 dark:shadow-primary/20 scale-100 ring ring-primary/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60  hover:text-primary hover:scale-105'
                    }`}
                    onClick={() => onNavClick('docs-ui')}
                >
                    <FaFileAlt className="w-6 h-6"/>
                    <span
                        className="absolute left-16 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                   text-sm px-3 py-1.5 rounded-lg shadow-xl dark:shadow-gray-900/50
                                   opacity-0 group-hover:opacity-100 transition-all duration-300
                                   translate-x-2 group-hover:translate-x-0 pointer-events-none">
                                    Documents</span>
                </button>
                <ThemeSelector/>
            </nav>

            {/*/!* 放置在底部以防止弹窗被遮挡 *!/*/}
            {/*<div ref={dropdownRef} className="absolute bottom-4 left-full transform -translate-x-1/2">*/}

            {/*    <Settings/>*/}
            {/*</div>*/}
        </div>
    );
};

export default SideNav;
