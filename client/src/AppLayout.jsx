import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, HandCoins, LogOut, UserRound, Menu } from "lucide-react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import useUser from "./hooks/useUser";
import backendUrl from "./services/backendUrl";

const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Expenses", url: "/add-expense", icon: HandCoins },
];

export default function AppLayout() {
  const location = useLocation();
  const { user, loading, error } = useUser();
  console.log(user);

  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      console.log("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <SidebarProvider>
      <div className="w-screen h-full">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar
            className="w-64 bg-white border-r border-gray-200 sm:bg-white md:bg-white lg:bg-white"
            style={{ bgColor: "white !important" }}
          >
            <SidebarContent>
              <SidebarGroup className="flex flex-col gap-8">
                <SidebarGroupLabel className="text-zinc-950 h-fit flex items-center text-2xl px-4">
                  <img src="../logo.avif" className="h-14 w-14" />
                  <span>FinTrack</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={`flex items-center space-x-3 p-3 rounded-md ${
                                isActive
                                  ? "bg-gray-100 text-gray-900 font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <item.icon
                                className={` ${
                                  isActive ? "text-gray-900" : "text-gray-400"
                                }`}
                              />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1">
            <header className="bg-white z-[2] p-4 py-2 shadow flex justify-end w-full fixed top-0 right-0">
              <SidebarTrigger className="absolute top-4 left-4 z-10 p-2">
                <Menu size={24} />
              </SidebarTrigger>
              <div className="h-fit w-fit flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    className="h-10 w-10 rounded-full shadow hover:shadow-md cursor-pointer"
                  />
                  <span className="text-sm text-zinc-700 font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="h-fit w-fit p-1 py-2 rounded-md bg-white hover:bg-zinc-200">
                    <UserRound color="#090909" size={24} />
                  </button>
                  <button
                    className="h-fit w-fit p-1 py-2 rounded-md bg-white hover:bg-zinc-200"
                    onClick={handleLogout}
                  >
                    <LogOut color="#090909" size={24} />
                  </button>
                </div>
              </div>
            </header>
            <div className="mt-16 p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
