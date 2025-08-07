import React, { createContext, useContext, useMemo, ReactNode, useEffect } from 'react';
import './tokens.css';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue>({ mode: 'light' });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ mode = 'light', children }: { mode?: ThemeMode; children: ReactNode }) {
  const value = useMemo(() => ({ mode }), [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}