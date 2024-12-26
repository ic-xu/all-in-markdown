import { Sun } from 'lucide-react';
import { ThemeDefinition } from './types';

export const defaultTheme: ThemeDefinition = {
  id: 'default',
  name: 'Light Theme',
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
};