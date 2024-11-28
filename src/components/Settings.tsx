import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { usePluginManager } from '../hooks/usePluginManager';

export default function Settings() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pluginManager = usePluginManager();
  const plugins = Array.from(pluginManager.getPlugins());

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        title="Settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium mb-2">Plugins</h3>
              <div className="space-y-2">
                {plugins.map(([id, plugin]) => (
                  <div key={id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{plugin.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {plugin.description}
                      </div>
                    </div>
                    <button
                      onClick={() => pluginManager.togglePlugin(id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {pluginManager.isPluginActive(id) ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}