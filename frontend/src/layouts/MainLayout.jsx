import { Header, Footer, AppSideBar } from "@/components/generalComponents";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
 


const MainLayout = () => {
  return (
    <>

      <SidebarProvider>
        <AppSideBar/>


        <SidebarInset>
          <header className="w-full">
            <div>
              <Header/>
            </div>
          </header>

          <main className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 overflow-x-auto">{<Outlet />}</div>
            {/* <Footer /> */}
          </main>

        </SidebarInset>

      </SidebarProvider>

    

        
      
    </>
  );
};

export default MainLayout;