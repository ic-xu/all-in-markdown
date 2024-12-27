import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeDefinition } from './types';
import { defaultTheme } from '@/themes/defaultTheme';
import { darkTheme } from '@/themes/darkTheme';
import { greenTheme } from '@/themes/greenTheme';
import { useEditorStore } from '@/store/editorStore';

const themes: Record<string, ThemeDefinition> = {
  default: defaultTheme,
  dark: darkTheme,
  green: greenTheme,
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  setTheme: () => { },
  getThemeClass: () => '',
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: storeTheme, setTheme: setStoreTheme } = useEditorStore();
  const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(themes[storeTheme] || defaultTheme);

  useEffect(() => {
    setCurrentTheme(themes[storeTheme] || defaultTheme);
  }, [storeTheme]);

  const setTheme = (themeId: string) => {
    setStoreTheme(themeId as 'default' | 'dark' | 'green');
  };

  const getThemeClass = (type: keyof ThemeDefinition['styles'], variant: string): string => {
    return currentTheme.styles[type][variant as keyof typeof currentTheme.styles[typeof type]] || '';
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, getThemeClass }}>
      {children}
    </ThemeContext.Provider>
  );
}