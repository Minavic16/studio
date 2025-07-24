
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
    'jss1a': {
        'monday': [
            { time: '08:00 - 08:40', subject: 'Mathematics', teacher: 'Mr. John Adeolu' },
            { time: '08:40 - 09:20', subject: 'English Language', teacher: 'Mrs. Funke Adewale' },
            { time: '09:20 - 10:00', subject: 'Basic Science', teacher: 'Mr. Chidi Okoro' },
            { time: '10:00 - 10:20', subject: 'Short Break', teacher: '' },
            { time: '10:20 - 11:00', subject: 'Social Studies', teacher: 'Mrs. Aisha Bello' },
            { time: '11:00 - 11:40', subject: 'Agricultural Science', teacher: 'Mr. Emeka Obi' },
        ],
        'tuesday': [
            { time: '08:00 - 08:40', subject: 'English Language', teacher: 'Mrs. Funke Adewale' },
            { time: '08:40 - 09:20', subject: 'Mathematics', teacher: 'Mr. John Adeolu' },
            { time: '09:20 - 10:00', subject: 'Basic Technology', teacher: 'Mr. John Adeolu' },
            { time: '10:00 - 10:20', subject: 'Short Break', teacher: '' },
            { time: '10:20 - 11:00', subject: 'P.H.E', teacher: 'Mr. Chidi Okoro' },
            { time: '11:00 - 11:40', subject: 'Business Studies', teacher: 'Mrs. Aisha Bello' },
        ],
        // Add other days similarly
        'wednesday': [],
        'thursday': [],
        'friday': [],
    },
    'jss1b': {
        // Add data for JSS 1B
         'monday': [
            { time: '08:00 - 08:40', subject: 'English Language', teacher: 'Mrs. Funke Adewale' },
            { time: '08:40 - 09:20', subject: 'Mathematics', teacher: 'Mr. John Adeolu' },
        ],
        'tuesday': [],
        'wednesday': [],
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
    const [selectedClass, setSelectedClass] = useState('jss1a');
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
                        <SelectItem value="jss1a">JSS 1A</SelectItem>
                        <SelectItem value="jss1b">JSS 1B</SelectItem>
                        <SelectItem value="jss2a">JSS 2A</SelectItem>
                        <SelectItem value="sss1c">SSS 1C</SelectItem>
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
