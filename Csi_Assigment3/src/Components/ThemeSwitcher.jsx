// src/components/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded">
      Toggle Theme ({theme})
    </button>
  );
};

export default ThemeSwitcher;
