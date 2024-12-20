import { MessageCircle } from 'lucide-react';
import type { Plugin, PluginContext } from '../../types/plugin';
import { ImChatPluginSettings } from './ImChatSetting';

export const imChatPlugin: Plugin = {
    id: 'im-chat',
    name: 'im chat ',
    version: '1.0.0',
    description: 'im chat',
    defaultSettings: {
        defaultDelimiter: 'dollars'
    },
    settingsComponent: ImChatPluginSettings,

    async onActivate(context: PluginContext) {
        const settings = context.getSettings();
        context.registerToolbarItem({
            id: 'insert-math',
            position: 'left',
            render: () => (
                <button
                    onClick={() => {
                        console.log("-------")
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    title="Insert Math Formula"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
            ),
        });


        context.registerRenderer({
            id: 'math',
            name: 'Math Renderer',
            test: (node) => node.type === 'math',
            render: (node, children) => (
                <div className={`my-4 text-center overflow-x-auto ${settings.autoNumbering ? 'relative pl-8' : ''}`}>
                    {children}
                </div>
            ),
        });

    },

    async onSettingsChange(context: PluginContext, settings: typeof ImChatPluginSettings) {

    },

    async onDeactivate(context: PluginContext) {

    },
}