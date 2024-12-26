import { Leaf } from 'lucide-react';
import { ThemeDefinition } from './types';

export const greenTheme: ThemeDefinition = {
  id: 'green',
  name: 'Green Theme',
  icon: Leaf,
  styles: {
    background: {
      primary: 'bg-emerald-900',
      secondary: 'bg-emerald-800',
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
};