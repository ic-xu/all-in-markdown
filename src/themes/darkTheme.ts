import { Moon } from 'lucide-react';
import { ThemeDefinition } from './types';

export const darkTheme: ThemeDefinition = {
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
};