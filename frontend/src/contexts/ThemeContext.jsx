import { createContext, useContext, useEffect, useState } from "react";

// 0 - initial state
const initialState = {theme: "system", setTheme: () => null}

// 1 - Context creation 
const ThemeProviderContext = createContext(initialState);


// 2 - Theme context provider creation 
const ThemeProvider = ({children, defaultTheme='system', storageKey="vite-ui-theme"}) => {


    // Function that get theme from localstorage or return fallback
    const getLocalStorageTheme = () => {
        console.log("get from local");
        
        return localStorage.getItem(storageKey) || defaultTheme;
    }  


    const [theme, setTheme] = useState(getLocalStorageTheme);


    useEffect(() => {

        const root = document.documentElement;

        root.classList.remove("light", "dark");


        if (theme === "system"){

            // detect system theme
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            // Add user selected theme
            root.classList.add(theme);
        }

    }, [theme])

    const value = {
        theme, 
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        }
    }

    return (
        <ThemeProviderContext.Provider value={value}>

            {children}
        </ThemeProviderContext.Provider>
    )
}



const useTheme = () => {

    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider [developer created error]");
    } 

    return context

}


export {ThemeProvider, useTheme};




