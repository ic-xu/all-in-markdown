import React, { createContext, useEffect, useState, useRef } from 'react';
import { PluginManager } from '../core/PluginManager';
import { basePlugin } from '../plugins/base';
import { darkThemePlugin } from '../plugins/dark-theme';

export const PluginManagerContext = createContext<PluginManager | null>(null);

export function PluginManagerProvider({ children }: { children: React.ReactNode }) {
  const [pluginManager] = useState(() => new PluginManager());
  const initialized = useRef(false);

  useEffect(() => {
    const initializePlugins = async () => {
      if (!initialized.current) {
        try {
          await pluginManager.installPlugin(basePlugin);
          await pluginManager.installPlugin(darkThemePlugin);
          initialized.current = true;
        } catch (error) {
          console.error('Error initializing plugins:', error);
        }
      }
    };

    initializePlugins();
  }, [pluginManager]);

  return (
    <PluginManagerContext.Provider value={pluginManager}>
      {children}
    </PluginManagerContext.Provider>
  );
}