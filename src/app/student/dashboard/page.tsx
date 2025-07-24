

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, CalendarDays, Bell, CheckCircle } from 'lucide-react';

const student = {
    name: 'Chiamaka Nwosu',
    class: 'JSS 2B',
    avatarUrl: 'https://placehold.co/100x100.png',
    initials: 'CN'
}

const academicSummary = {
    attendance: 98,
    overallGrade: 'B+',
    cgpa: 3.8
}

const todaysTimetable = [
  { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Adeolu" },
  { time: "10:00 AM", subject: "English Language", teacher: "Mrs. Funke" },
  { time: "11:00 AM", subject: "Basic Science", teacher: "Mr. Okoro" },
  { time: "12:00 PM", subject: "Break", teacher: "" },
];

const recentAnnouncements = [
    { id: 1, title: "Mid-term break announcement", date: "2024-03-05" },
    { id: 2, title: "Inter-house sports competition", date: "2024-03-02" },
];

const upcomingAssignments = [
    { id: 1, subject: "Mathematics", title: "Algebra II Homework", due: "2024-03-10" },
    { id: 2, subject: "English", title: "Essay on 'A Midsummer Night's Dream'", due: "2024-03-12" },
]


export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in-50 duration-500">
        <div className="flex items-center gap-4">
             <Avatar className="h-20 w-20">
                <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="student avatar" />
                <AvatarFallback className="text-2xl">{student.initials}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, {student.name}!</h1>
                <p className="text-muted-foreground">Class: {student.class}</p>
            </div>
        </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{academicSummary.attendance}%</div>
            <Progress value={academicSummary.attendance} aria-label="Attendance percentage" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicSummary.overallGrade}</div>
            <p className="text-xs text-muted-foreground">Cumulative GPA: {academicSummary.cgpa}/5.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentAnnouncements.length} New</div>
             <p className="text-xs text-muted-foreground">Check the announcements page</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Today&apos;s Timetable</CardTitle>
            <CardDescription>Your schedule for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysTimetable.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.time}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Stay on top of your deadlines.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
                <ul className="space-y-4">
                    {upcomingAssignments.map(item => (
                        <li key={item.id} className="flex items-start gap-4">
                             <div className="bg-primary/10 text-primary p-2 rounded-full">
                                <BookOpen className="h-5 w-5"/>
                            </div>
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.subject} &bull; Due: {item.due}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                 <div className="flex justify-center items-center h-full">
                    <p className="text-muted-foreground">No upcoming assignments.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
