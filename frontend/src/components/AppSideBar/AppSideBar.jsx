

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { headerLinks } from "@/data/navLinks";
import UserProfile from "./UserProfile";
import NavMenu from "./NavMenu";
import { UserFooterProfile } from "./UserFooterProfile";
import { userDetails } from "@/data/navLinks";

const AppSideBar = () => {
  return (
    <>
      
      <Sidebar collapsible="icon">

        <SidebarHeader>

          <SidebarMenu>
            <UserProfile/>
          </SidebarMenu>

        </SidebarHeader>
        <SidebarContent>
          <NavMenu items={headerLinks} />
        </SidebarContent>
        <SidebarFooter>
          <UserFooterProfile user={userDetails} />

        </SidebarFooter>


      </Sidebar>

      

    </>
  );
};

export default AppSideBar;