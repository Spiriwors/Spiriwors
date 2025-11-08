"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accentColor: string;
  isUIHidden: boolean;
  toggleUI: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isUIHidden, setIsUIHidden] = useState(false);

  useEffect(() => {
    // Detectar preferencia del sistema inicialmente
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    // Cargar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleUI = () => {
    setIsUIHidden(prev => !prev);
  };

  // Azul para noche (dark), naranja para día (light)
  const accentColor = theme === 'light' ? '#ffaf26' : '#27a6c3';

  useEffect(() => {
    // Inyectar variable CSS para el color accent
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, isUIHidden, toggleUI }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

