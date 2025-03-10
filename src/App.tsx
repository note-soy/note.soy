import React, { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
import {Router} from "./Router";
import {Grommet, Main, ThemeType} from "grommet";
import { lightTheme, darkTheme } from './theme';


type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Sync with system preference initially
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setMode('light');
    }
    
    // Try to load from localStorage if available
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'light' || savedMode === 'dark') {
      setMode(savedMode);
    }
  }, []);
  
  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', mode);
    
    // Save preference
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <Grommet theme={mode === 'light' ? lightTheme : darkTheme} themeMode={mode}>
        <Main width={{max: '99vw'}}>
          <Router />
        </Main>
      </Grommet>
    </ThemeContext.Provider>
  );
};
