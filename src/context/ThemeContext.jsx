import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Initialize from localStorage or default to 'dark'
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('egel_theme');
        return saved || 'dark';
    });

    // Initialize font size from localStorage or default to 'medium'
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('egel_font_size');
        return saved || 'medium'; // small, medium, large
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('egel_theme', theme);
    }, [theme]);

    // Apply font size
    useEffect(() => {
        const sizes = {
            small: '90%',
            medium: '100%',
            large: '115%'
        };
        document.documentElement.style.fontSize = sizes[fontSize];
        localStorage.setItem('egel_font_size', fontSize);
    }, [fontSize]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const cycleFontSize = () => {
        const order = ['small', 'medium', 'large'];
        const nextIndex = (order.indexOf(fontSize) + 1) % order.length;
        setFontSize(order[nextIndex]);
    };

    const setDarkMode = () => setTheme('dark');
    const setLightMode = () => setTheme('light');

    return (
        <ThemeContext.Provider value={{
            theme,
            fontSize,
            isDark: theme === 'dark',
            isLight: theme === 'light',
            toggleTheme,
            cycleFontSize,
            setFontSize,
            setDarkMode,
            setLightMode,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
