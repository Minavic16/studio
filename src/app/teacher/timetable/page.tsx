
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

const teacherTimetable = {
    'monday': [
        { time: '08:00 - 08:40', subject: 'Mathematics', class: 'JSS 1A' },
        { time: '11:00 - 11:40', subject: 'Physics', class: 'SSS 2A' },
    ],
    'tuesday': [
        { time: '08:40 - 09:20', subject: 'Mathematics', class: 'JSS 1A' },
        { time: '10:20 - 11:00', subject: 'Physics', class: 'SSS 3A' },
    ],
    'wednesday': [
        { time: '09:20 - 10:00', subject: 'Mathematics', class: 'JSS 2B' },
    ],
    'thursday': [],
    'friday': [
        { time: '08:00 - 08:40', subject: 'Chemistry', class: 'SSS 3A' },
    ],
};


export default function TeacherTimetablePage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">My Timetable</CardTitle>
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
