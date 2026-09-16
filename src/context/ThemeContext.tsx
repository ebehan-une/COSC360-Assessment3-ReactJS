/*
  Theme Provider has been generated entirely by Google Gemini.
  Provides a dark-mode theme to the website.
*/

// ThemeContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// 1. Define the allowed theme strings
export type Theme = 'light' | 'dark';

// 2. Define the structure of your context value
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 3. Create the context with a type-safe fallback defaultValue
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Fallback for Server-Side Rendering (SSR) environments
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Custom hook that guarantees the context is being used inside a Provider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};