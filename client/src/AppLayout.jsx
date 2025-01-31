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
import {
  Calendar,
  Home,
  Search,
  Settings,
  HandCoins,
  LogOut,
  UserRound,
} from "lucide-react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Expenses", url: "/add-expense", icon: HandCoins },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="w-screen h-full">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar className="w-64 bg-white border-r border-gray-200">
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
                                className={`w-5 h-5 ${
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

          {/* Main Content */}
          <main className="flex-1">
            <header className="bg-white p-4 py-2 shadow flex justify-end w-full">
              {/* <SidebarTrigger /> */}
              <div className="h-fit w-fit flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src="../logo.avif"
                    className="h-10 w-10 rounded-full shadow hover:shadow-md cursor-pointer"
                  />
                  <span className="text-sm text-zinc-700 font-medium">
                    Romil Raj Rana
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="h-fit w-fit p-1 py-2 rounded-md bg-white hover:bg-zinc-200">
                    <UserRound color="#090909" size={24} />
                  </button>
                  <button className="h-fit w-fit p-1 py-2 rounded-md bg-white hover:bg-zinc-200">
                    <LogOut color="#090909" size={24} />
                  </button>
                </div>
              </div>
            </header>
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
