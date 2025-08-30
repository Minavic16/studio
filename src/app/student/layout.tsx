
'use client';

import { type ReactNode } from "react";

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  UserCircle,
  Book,
  GraduationCap,
  ClipboardList,
  CreditCard,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  { href: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/profile", icon: UserCircle, label: "My Profile" },
  { href: "/student/courses", icon: Book, label: "My Courses" },
  { href: "/student/results", icon: GraduationCap, label: "My Results" },
  { href: "/student/timetable", icon: ClipboardList, label: "Timetable" },
  { href: "/student/payments", icon: CreditCard, label: "Fee Payments" },
];

function StudentHeaderContent() {
    return (
        <>
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
                </Button>
                <Avatar className="h-9 w-9">
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
            </div>
        </>
    )
}

export default function StudentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar className="flex flex-col" collapsible="icon">
                <SidebarRail />
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
                 <StudentHeaderContent />
              </header>
              <main className="flex-1 overflow-auto p-4 sm:p-6 animate-in fade-in-50 duration-500">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
  );
}
