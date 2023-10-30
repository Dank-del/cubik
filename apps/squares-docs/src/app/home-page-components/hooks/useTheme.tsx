"use client";
import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

// Create a ThemeContext
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

// Custom hook to manage the theme
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// ThemeProvider component
interface ThemeProviderProps {
    children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme');
        return (storedTheme ?? 'light') as Theme;
    });

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    // Effect to update the HTML class when the theme changes
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        if (htmlElement) {
            htmlElement.className = theme;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { useTheme, ThemeProvider };
