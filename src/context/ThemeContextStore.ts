import { createContext } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isSystem: boolean;
  toggleTheme: () => void;
  toggleSystem: () => void;
}

// 👇 This file is OK to export non-components from
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
