import { createContext, useState, useEffect } from 'react';

export const themes = {
    light: {
        color: '#2C2F33',
        background: '#e4e4ec',
    },
    dark: {
        color: '#e4e4ec',
        background: '#23272A',
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = ( props ) => {

    const [ theme, setTheme ] = useState(themes.light);

    const handleThemeChange = (theme) => {
        setTheme(theme);
        localStorage.setItem("theme", JSON.stringify(theme));
    };

    useEffect(() => {
        const currentTheme = JSON.parse(localStorage.getItem("theme"));
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{theme, handleThemeChange}}>
            {props.children}
        </ThemeContext.Provider>
    )
}