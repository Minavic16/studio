

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  User,
  BookCopy,
  GraduationCap,
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const menuItems = [
  { href: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/profile", icon: User, label: "My Profile" },
  { href: "/student/courses", icon: BookCopy, label: "My Courses" },
  { href: "/student/results", icon: GraduationCap, label: "My Results" },
  { href: "/student/timetable", icon: Calendar, label: "Timetable" },
  { href: "/student/payments", icon: CreditCard, label: "Fee Payments" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar className="flex flex-col" collapsible="icon">
              <SidebarHeader>
                <Logo />
              </SidebarHeader>
              <SidebarContent className="p-2">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton tooltip={item.label}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                 <SidebarMenu>
                     <SidebarMenuItem>
                        <Link href="/student/settings" legacyBehavior passHref>
                            <SidebarMenuButton tooltip="Settings">
                                <Settings />
                                <span>Settings</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                 </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="flex flex-col flex-1">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                 <div className="flex-1">
                    <h1 className="text-lg font-semibold">Student Portal</h1>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
                  </Button>
                  <UserNav />
                </div>
              </header>
              <main className="flex-1 overflow-auto p-4 sm:p-6">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
