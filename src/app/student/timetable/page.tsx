
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

// Timetable for Liam Chen (Class 9A)
const studentTimetable = {
    'monday': [
        { time: 'Period 1', subject: 'Algebra I', teacher: 'Mr. Alan Grant' },
        { time: 'Period 2', subject: 'Break', teacher: '' },
        { time: 'Period 3', subject: 'English Literature', teacher: 'Ms. Eleanor Vance' },
        { time: 'Period 4', subject: 'Break', teacher: '' },
        { time: 'Period 5', subject: 'Biology', teacher: 'Mr. David Miller' },
        { time: 'Period 6', subject: 'Break', teacher: '' },
    ],
    'tuesday': [
        { time: 'Period 1', subject: 'Break', teacher: '' },
        { time: 'Period 2', subject: 'World History', teacher: 'Mrs. Katherine Reed' },
        { time: 'Period 3', subject: 'Break', teacher: '' },
        { time: 'Period 4', subject: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
        { time: 'Period 5', subject: 'Break', teacher: '' },
        { time: 'Period 6', subject: 'PE', teacher: 'Coach Brian Murphy' },
    ],
    'wednesday': [
        { time: 'Period 1', subject: 'Computer Science', teacher: 'Ms. Chloe Foster' },
        { time: 'Period 2', subject: 'Break', teacher: '' },
        { time: 'Period 3', subject: 'Spanish I', teacher: 'Señora Maria Torres' },
        { time: 'Period 4', subject: 'Break', teacher: '' },
        { time: 'Period 5', subject: 'Algebra I', teacher: 'Mr. Alan Grant' },
        { time: 'Period 6', subject: 'Break', teacher: '' },
    ],
    'thursday': [],
    'friday': [],
};

export default function StudentTimetablePage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">My Timetable</CardTitle>
            <CardDescription>Your weekly class schedule. Stay organized and on time!</CardDescription>
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
                {Object.keys(studentTimetable).map(day => (
                    <TabsContent value={day} key={day}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px] md:w-[200px]">Time</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Teacher</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentTimetable[day as keyof typeof studentTimetable].length > 0 ? (
                                    studentTimetable[day as keyof typeof studentTimetable].map((entry, index) => (
                                    <TableRow key={index} className={entry.subject === 'Break' ? 'bg-muted/50' : ''}>
                                        <TableCell className="font-medium">{entry.time}</TableCell>
                                        <TableCell>{entry.subject}</TableCell>
                                        <TableCell>{entry.teacher}</TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            No classes scheduled for this day.
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
