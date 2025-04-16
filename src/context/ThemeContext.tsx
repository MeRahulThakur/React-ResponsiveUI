import React, { useEffect, useState } from 'react';
import { ThemeContext, Theme } from './ThemeContextStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const getInitialSystem = () => {
    return localStorage.getItem('isSystem') === 'true';
  };

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isSystem, setIsSystem] = useState<boolean>(() => getInitialSystem());

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    localStorage.setItem('isSystem', String(isSystem));
  }, [theme, isSystem]);

  // Listen to system changes if in system mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (isSystem) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystem]);

  const toggleTheme = () => {
    setIsSystem(false); // disable system override when manually toggled
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSystem = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsSystem(prev => {
      const newIsSystem = !prev;
      if (newIsSystem) {
        setTheme(prefersDark ? 'dark' : 'light');
      }
      return newIsSystem;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, isSystem, toggleTheme, toggleSystem }}>
      {children}
    </ThemeContext.Provider>
  );
};
