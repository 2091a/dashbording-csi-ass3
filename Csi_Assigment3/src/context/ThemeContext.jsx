// ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const themes = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#007BFF',
  },
  dark: {
    background: '#333333',
    text: '#FFFFFF',
    primary: '#61dafb',
  },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light'); // Default theme

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
