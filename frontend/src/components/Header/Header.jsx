import { Link, useLocation } from "react-router-dom";
import { headerLinks} from "@/data/siteMetaData";
import { useState, useEffect } from "react";


const Header = () => {

  const location = useLocation(); // useLocation to get the current path
  // const { theme, setTheme } = useTheme();

  return (
    <>

      <header className=" sticky py-2 top-0 flex justify-center z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-14 w-full items-center mx-6  justify-between sm:mx-28">
        
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-[16px] font-bold">
          {headerLinks.map((pageLink, index) => (
            <Link 
              key={index} 
              to={pageLink['url']} 
              className=" transition-colors hover:text-foreground/80 hover:bg-accent px-4 py-2 hover:rounded-md hover:border-b-2 hover:border-red-500 "
            >
              {pageLink['label']}
            </Link>
          ))}
        </nav>

        </div>
      </header>
    </>
  );
};

export default Header;