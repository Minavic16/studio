
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
import { CheckCircle, BookOpen, AlertTriangle, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const timetable = [
  { time: "09:00 AM", subject: "Mathematics" },
  { time: "10:00 AM", subject: "English Language" },
  { time: "11:00 AM", subject: "Basic Science" },
  { time: "12:00 PM", subject: "Break" },
  { time: "12:30 PM", subject: "Social Studies" },
];

const assignments = [
    { subject: "Mathematics", topic: "Algebraic Equations", dueDate: "Tomorrow" },
    { subject: "English Language", topic: "Essay on 'My Last Holiday'", dueDate: "2 days" },
];

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Welcome, Tunde!</CardTitle>
                <CardDescription>Here's what your day looks like. Keep up the great work!</CardDescription>
            </CardHeader>
        </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85% (A)</div>
            <p className="text-xs text-muted-foreground">Second Term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Fees</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₦5,000</div>
            <p className="text-xs text-muted-foreground">PTA Levy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Timetable</CardTitle>
            <CardDescription>Your class schedule for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.time}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Don't forget to submit these on time!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {assignments.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">{item.subject}: <span className="font-normal text-muted-foreground">{item.topic}</span></p>
                        <Badge variant="secondary">Due in {item.dueDate}</Badge>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const GraduationCap = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3.33 1.67 6.67 1.67 10 0v-5"/>
    </svg>
);
