import { useState, useEffect, createContext, useContext } from 'react';

// Context so any component can read and toggle dark mode
export const ThemeContext = createContext({ isDark: false, toggleDark: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeState() {
  const [isDark, setIsDark] = useState(() => {
    // Persist dark mode across page refreshes
    const stored = localStorage.getItem('nagrikAI-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nagrikAI-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nagrikAI-theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return { isDark, toggleDark };
}
