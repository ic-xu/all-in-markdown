"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType, ThemeDefinition } from './types';
import { defaultTheme } from './defaultTheme';
import { darkTheme } from './darkTheme';
import { greenTheme } from './greenTheme';

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
  const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(defaultTheme);


  useEffect(() => {
    console.log(currentTheme)
  }, [currentTheme])

  const setTheme = (themeId: string) => {
    const newTheme = themes[themeId];
    if (newTheme) {
      setCurrentTheme(newTheme);
      // Remove all theme classes
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');

      // Apply new theme
      if (themeId === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (themeId !== 'default') {
        document.documentElement.setAttribute('data-theme', themeId);
      }
    }
  };

  const getThemeClass = (type: keyof ThemeDefinition['styles'], variant: string): string => {
    return currentTheme.styles[type][variant as keyof typeof currentTheme.styles[typeof type]];
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, getThemeClass }}>
      {children}
    </ThemeContext.Provider>
  );
}

