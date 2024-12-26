import { useContext } from 'react';
import { PluginManagerContext } from '@/context/PluginManagerContext';

export function usePluginManager() {
  const context = useContext(PluginManagerContext);
  if (!context) {
    throw new Error('usePluginManager must be used within a PluginManagerProvider');
  }
  return context;
}