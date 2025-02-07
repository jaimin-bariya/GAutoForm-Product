import { Header, Footer, SideBar } from "@/components/generalComponents";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
 


const MainLayout = () => {
  return (
    <>

    
    <Header/>

      <main>
        <Outlet/>
      </main>
      <Toaster/>

    <Footer/>


        
      
    </>
  );
};

export default MainLayout;