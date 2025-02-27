/** @format */

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const toggle_theme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("work -> toggle_theme fun");
    
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg group border-2  "
        onClick={() => toggle_theme()}
        aria-label="Toggle theme"
      >


        <Sun className="h-[1.2rem] w-[1.2rem] group-hover:rotate-180 transform duration-700 ease-in-out  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] group-hover:rotate-180 transform  duration-700 ease-in-out  w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </>
  );
};

export default ThemeButton;
