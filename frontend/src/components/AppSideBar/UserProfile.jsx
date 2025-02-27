/** @format */

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
const UserProfile = () => {
  return (
    <>
      <SidebarMenuItem>
        <Link to={"/"}>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            JP
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Parul University</span>
            <span className="truncate text-xs">University</span>
          </div>
        </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </>
  );
};

export default UserProfile;
