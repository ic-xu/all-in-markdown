import type {Plugin} from '@/types/plugin';
import { Leaf } from 'lucide-react';
import {GreenThemeToggleButton} from './GreenThemeToggleButton';

export const greenThemePlugin: Plugin = {
    id: 'green-theme',
    name: 'Green Theme',
    version: '1.0.0',
    description: 'Provides a soothing dark green theme',

    async onActivate(context) {
        // Register green theme
        context.registerTheme({
            id: 'green',
            name: 'Green Theme',
             icon: Leaf,
            styles: {
                background: {
                    primary: 'bg-emerald-50',
                    secondary: 'bg-emerald-100',
                    hover: 'hover:bg-emerald-700',
                },
                text: {
                    primary: 'text-emerald-100',
                    secondary: 'text-emerald-200',
                    accent: 'text-emerald-400',
                },
                border: {
                    primary: 'border-emerald-700',
                    secondary: 'border-emerald-600',
                },
            },
        });

        // Register theme toggle toolbar item
        context.registerToolbarItem({
            id: 'green-theme-toggle',
            position: 'right',
            render: GreenThemeToggleButton,
        });
    },
};

