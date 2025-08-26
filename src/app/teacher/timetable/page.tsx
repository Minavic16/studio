
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Timetable for Mr. Alan Grant (Algebra I)
const teacherTimetable = {
    'monday': [
        { time: 'Period 1', subject: 'Algebra I', class: '9A' },
    ],
    'tuesday': [
         { time: 'Period 1', subject: 'Algebra I', class: '9D' },
    ],
    'wednesday': [
        { time: 'Period 5', subject: 'Algebra I', class: '9A' },
    ],
    'thursday': [],
    'friday': [],
};


export default function TeacherTimetablePage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">My Timetable (Mr. Alan Grant)</CardTitle>
            <CardDescription>Your weekly teaching schedule.</CardDescription>
        </CardHeader>
        <CardContent>
             <Tabs defaultValue="monday">
                <div className="overflow-x-auto pb-2">
                    <TabsList>
                        <TabsTrigger value="monday">Monday</TabsTrigger>
                        <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                        <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                        <TabsTrigger value="thursday">Thursday</TabsTrigger>
                        <TabsTrigger value="friday">Friday</TabsTrigger>
                    </TabsList>
                </div>
                {Object.keys(teacherTimetable).map(day => (
                    <TabsContent value={day} key={day}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px] md:w-[200px]">Time</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Class</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teacherTimetable[day as keyof typeof teacherTimetable].length > 0 ? (
                                    teacherTimetable[day as keyof typeof teacherTimetable].map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{entry.time}</TableCell>
                                        <TableCell>{entry.subject}</TableCell>
                                        <TableCell>{entry.class}</TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            You have no classes on this day.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                ))}
            </Tabs>
        </CardContent>
    </Card>
  );
}
