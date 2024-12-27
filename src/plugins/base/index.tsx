import React from 'react';
import { Sun } from 'lucide-react';
import type {Plugin} from '@/types/plugin';
import type {ReactElement} from 'react';
import {HeadingComponent} from './HeadingComponet';
import "./index.css";


export const basePlugin: Plugin = {
    id: 'base',
    name: 'Base Plugin',
    version: '1.0.0',
    description: 'Provides basic markdown rendering capabilities',

    async onActivate(context) {
        // Register basic markdown renderers
        context.registerRenderer({
            id: 'heading',
            name: 'Heading Renderer',
            test: (node) => node.type === 'heading',
            render: (node, children): ReactElement => {
                const level = node.depth as 1 | 2 | 3 | 4 | 5 | 6;
                const className = level === 1 ? 'text-center' : 'text-left';
                return <HeadingComponent level={level} className={className}>{children}</HeadingComponent>;
            },
        });

        // Register basic theme
        context.registerTheme({
            id: 'default',
            name: 'Default Theme',
            icon: Sun,
            styles: {
                background: {
                    primary: 'bg-white',
                    secondary: 'bg-gray-50',
                    hover: 'hover:bg-gray-100',
                },
                text: {
                    primary: 'text-gray-900',
                    secondary: 'text-gray-600',
                    accent: 'text-blue-600',
                },
                border: {
                    primary: 'border-gray-200',
                    secondary: 'border-gray-300',
                },
            },
        });

        // Register basic toolbar items
        context.registerToolbarItem({
            id: 'bold',
            position: 'main',
            render: () => (
                <button
                    onClick={() => context.eventBus.emit('editor:format', 'bold')}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    B
                </button>
            ),
        });
    },
};