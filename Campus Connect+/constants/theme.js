// constants/theme.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const light = {
  mode: 'light',
  primary: '#2E5AAC',
  accent: '#03DAC5',
  background: '#F7F9FB',
  card: '#FFFFFF',
  text: '#1C1C1E',
  border: '#E0E0E0',
  tag: '#F0F0F0',
};

const dark = {
  mode: 'dark',
  primary: '#BB86FC',
  accent: '#03DAC5',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#373737',
  tag: '#2A2A2A',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('theme');
      if (saved !== null) setIsDarkMode(JSON.parse(saved));
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    await AsyncStorage.setItem('theme', JSON.stringify(next));
  };

  const value = {
    colors: isDarkMode ? dark : light,
    toggleTheme,
    isDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
