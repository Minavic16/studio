
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const timetableData = {
    '9a': {
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
    },
    '9b': {
         'monday': [
            { time: 'Period 1', subject: 'World History', teacher: 'Mrs. Katherine Reed' },
            { time: 'Period 2', subject: 'Break', teacher: '' },
            { time: 'Period 3', subject: 'Spanish I', teacher: 'Señora Maria Torres' },
            { time: 'Period 4', subject: 'Break', teacher: '' },
            { time: 'Period 5', subject: 'PE', teacher: 'Coach Brian Murphy' },
            { time: 'Period 6', subject: 'Break', teacher: '' },
        ],
        'tuesday': [
            { time: 'Period 1', subject: 'Break', teacher: '' },
            { time: 'Period 2', subject: 'English Literature', teacher: 'Ms. Eleanor Vance' },
            { time: 'Period 3', subject: 'Break', teacher: '' },
            { time: 'Period 4', subject: 'Biology', teacher: 'Mr. David Miller' },
            { time: 'Period 5', subject: 'Break', teacher: '' },
            { time: 'Period 6', subject: 'Art & Design', teacher: 'Ms. Julia Rossi' },
        ],
        'wednesday': [
            { time: 'Period 1', subject: 'Music Theory', teacher: 'Mr. Leo Johnson' },
            { time: 'Period 2', subject: 'Break', teacher: '' },
            { time: 'Period 3', subject: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
            { time: 'Period 4', subject: 'Break', teacher: '' },
            { time: 'Period 5', subject: 'World History', teacher: 'Mrs. Katherine Reed' },
            { time: 'Period 6', subject: 'Break', teacher: '' },
        ],
        'thursday': [],
        'friday': [],
    },
    '9c': {
        'monday': [
            { time: 'Period 1', subject: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
            { time: 'Period 2', subject: 'Break', teacher: '' },
            { time: 'Period 3', subject: 'Music Theory', teacher: 'Mr. Leo Johnson' },
            { time: 'Period 4', subject: 'Break', teacher: '' },
            { time: 'Period 5', subject: 'Biology', teacher: 'Mr. David Miller' },
            { time: 'Period 6', subject: 'Break', teacher: '' },
        ],
        'tuesday': [
            { time: 'Period 1', subject: 'Break', teacher: '' },
            { time: 'Period 2', subject: 'Spanish I', teacher: 'Señora Maria Torres' },
            { time: 'Period 3', subject: 'Break', teacher: '' },
            { time: 'Period 4', subject: 'Computer Science', teacher: 'Ms. Chloe Foster' },
            { time: 'Period 5', subject: 'Break', teacher: '' },
            { time: 'Period 6', subject: 'English Literature', teacher: 'Ms. Eleanor Vance' },
        ],
        'wednesday': [
            { time: 'Period 1', subject: 'Art & Design', teacher: 'Ms. Julia Rossi' },
            { time: 'Period 2', subject: 'Break', teacher: '' },
            { time: 'Period 3', subject: 'PE', teacher: 'Coach Brian Murphy' },
            { time: 'Period 4', subject: 'Break', teacher: '' },
            { time: 'Period 5', subject: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
            { time: 'Period 6', subject: 'Break', teacher: '' },
        ],
        'thursday': [],
        'friday': [],
    },
    '9d': {
        'monday': [
            { time: 'Period 1', subject: 'Break', teacher: '' },
            { time: 'Period 2', subject: 'Computer Science', teacher: 'Ms. Chloe Foster' },
            { time: 'Period 3', subject: 'Break', teacher: '' },
            { time: 'Period 4', subject: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
            { time: 'Period 5', subject: 'Break', teacher: '' },
            { time: 'Period 6', subject: 'English Literature', teacher: 'Ms. Eleanor Vance' },
        ],
        'tuesday': [
            { time: 'Period 1', subject: 'Algebra I', teacher: 'Mr. Alan Grant' },
            { time: 'Period 2', subject: 'Break', teacher: '' },
            { time: 'Period 3', subject: 'Music Theory', teacher: 'Mr. Leo Johnson' },
            { time: 'Period 4', subject: 'Break', teacher: '' },
            { time: 'Period 5', subject: 'Biology', teacher: 'Mr. David Miller' },
            { time: 'Period 6', subject: 'Break', teacher: '' },
        ],
        'wednesday': [
            { time: 'Period 1', subject: 'Break', teacher: '' },
            { time: 'Period 2', subject: 'Art & Design', teacher: 'Ms. Julia Rossi' },
            { time: 'Period 3', subject: 'Break', teacher: '' },
            { time: 'Period 4', subject: 'World History', teacher: 'Mrs. Katherine Reed' },
            { time: 'Period 5', subject: 'Break', teacher: '' },
            { time: 'Period 6', subject: 'Spanish I', teacher: 'Señora Maria Torres' },
        ],
        'thursday': [],
        'friday': [],
    }
};

type TimetableEntry = {
    time: string;
    subject: string;
    teacher: string;
};

type Timetable = {
    [key: string]: {
        [key: string]: TimetableEntry[];
    };
};

export default function TimetablePage() {
    const [selectedClass, setSelectedClass] = useState('9a');
    const [currentTimetable, setCurrentTimetable] = useState<Timetable>(timetableData);

    const activeTimetable = currentTimetable[selectedClass as keyof typeof currentTimetable] || {};

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-2xl font-headline">Timetable Management</CardTitle>
                <CardDescription>View and manage class timetables for the week.</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2"/>Manage Timetable</Button>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4 mb-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="9a">Class 9A</SelectItem>
                        <SelectItem value="9b">Class 9B</SelectItem>
                        <SelectItem value="9c">Class 9C</SelectItem>
                        <SelectItem value="9d">Class 9D</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Tabs defaultValue="monday">
                <TabsList>
                    <TabsTrigger value="monday">Monday</TabsTrigger>
                    <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                    <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    <TabsTrigger value="thursday">Thursday</TabsTrigger>
                    <TabsTrigger value="friday">Friday</TabsTrigger>
                </TabsList>
                {Object.keys(activeTimetable).map(day => (
                    <TabsContent value={day} key={day}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Time</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Teacher</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeTimetable[day].length > 0 ? (
                                    activeTimetable[day].map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{entry.time}</TableCell>
                                        <TableCell>{entry.subject}</TableCell>
                                        <TableCell>{entry.teacher}</TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            No timetable set for this day.
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
