/** @format */

import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar"
// import { ModeToggle } from "@components/Theme/mode-toggle";
import ThemeButton from "./ThemeButton";

const Header = () => {
  const location = useLocation(); // useLocation to get the current path
  // const { theme, setTheme } = useTheme();

  return (
    <>
      <div className=" w-full  bg-gray-50 dark:bg-black dark:border-gray-800 border-gray-200 h-12 flex justify-between px-4 items-center gap-2 border-b-2 ">
        <SidebarTrigger/>
        <p className="dark:text-white text-black text-lg font-semibold dark:hover:text-orange-600 hover:text-orange-600 ">Saarthi Tech <span className="font-normal text-gray-100 text-sm  bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 from-red-400 to-sky-700 bg-clip-text text-transparent" >(Open-source)</span></p>
        <ThemeButton/>
      </div>

    </>
  );
};

export default Header;
