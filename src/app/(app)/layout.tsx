
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  School,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { Chatbot } from "@/components/chatbot";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/students", icon: Users, label: "Students" },
  { href: "/teachers", icon: UserCheck, label: "Teachers" },
  { href: "/classes", icon: School, label: "Classes & Subjects" },
  { href: "/attendance", icon: CalendarCheck, label: "Attendance" },
  { href: "/timetable", icon: ClipboardList, label: "Timetable" },
  { href: "/exams", icon: GraduationCap, label: "Exams & Results" },
  { href: "/payments", icon: CreditCard, label: "Fees & Payments" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
];

function AppHeaderContent() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/login');
    };

    const getInitials = (name?: string | null) => {
        if (!name) return "";
        const names = name.split(' ');
        if (names.length > 1 && names[0] && names[names.length - 1]) {
        return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2).toUpperCase();
    }


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
                { !loading && user &&
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} data-ai-hint="user avatar" />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                }
            </div>
        </>
    )
}

export default function AppLayout({
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
                        <Link href="/settings" legacyBehavior passHref>
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
                 <AppHeaderContent />
              </header>
              <main className="flex-1 overflow-auto p-4 sm:p-6">
                {children}
              </main>
            </SidebarInset>
          </div>
          <Chatbot />
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
