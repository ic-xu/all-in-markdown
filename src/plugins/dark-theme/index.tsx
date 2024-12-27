import React from 'react';
import { Moon } from 'lucide-react';
import type {Plugin} from '@/types/plugin';
import {ThemeToggleButton} from './ThemeToggleButton';

export const darkThemePlugin: Plugin = {
    id: 'dark-theme',
    name: 'Dark Theme',
    version: '1.0.0',
    description: 'Provides dark theme support',

    async onActivate(context) {
        // Register dark theme
        context.registerTheme({
            id: 'dark',
            name: 'Dark Theme',
            icon: Moon,
            styles: {
                background: {
                    primary: 'bg-gray-900',
                    secondary: 'bg-gray-800',
                    hover: 'hover:bg-gray-700',
                },
                text: {
                    primary: 'text-gray-100',
                    secondary: 'text-gray-300',
                    accent: 'text-blue-400',
                },
                border: {
                    primary: 'border-gray-700',
                    secondary: 'border-gray-600',
                },
            },
        });

        // Register theme toggle toolbar item
        context.registerToolbarItem({
            id: 'theme-toggle',
            position: 'right',
            render: () => <ThemeToggleButton/>,
        });
    },
};