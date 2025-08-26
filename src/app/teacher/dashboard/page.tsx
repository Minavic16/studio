
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
import { User, BookOpen, Clock, Annoyed } from "lucide-react";

const timetable = [
  { time: "09:00 AM", subject: "Mathematics", class: "JSS 1A" },
  { time: "10:00 AM", subject: "English Language", class: "JSS 2B" },
  { time: "11:00 AM", subject: "Chemistry", class: "SSS 3A" },
  { time: "12:00 PM", subject: "Break", class: "" },
  { time: "12:30 PM", subject: "Physics", class: "SSS 2A" },
];

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Welcome, Teacher!</CardTitle>
                <CardDescription>Here's a summary of your day.</CardDescription>
            </CardHeader>
        </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">JSS 1A, JSS 2B, SSS 2A, SSS 3A</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Taught</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Mathematics, Physics, Chemistry</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10:00 AM</div>
            <p className="text-xs text-muted-foreground">English Language in JSS 2B</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments to Grade</CardTitle>
            <Annoyed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">From 2 classes</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your teaching timetable for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.time}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.class}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
