
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const initialStudentAttendance = [
    { id: 'ST-001', name: 'Tunde Adebayo', class: 'JSS 1A', status: 'Present', checkIn: '08:02 AM', checkOut: '04:05 PM' },
    { id: 'ST-002', name: 'Chiamaka Nwosu', class: 'JSS 1A', status: 'Absent', checkIn: '-', checkOut: '-' },
    { id: 'ST-003', name: 'Musa Ibrahim', class: 'JSS 1A', status: 'Late', checkIn: '08:15 AM', checkOut: '04:01 PM' },
    { id: 'ST-004', name: 'Fatima Bello', class: 'JSS 1A', status: 'Present', checkIn: '07:55 AM', checkOut: '04:00 PM' },
];

const initialStaffAttendance = [
    { id: 'TCH-001', name: 'Mr. John Adeolu', status: 'Present', clockIn: '07:45 AM', clockOut: '04:20 PM' },
    { id: 'TCH-002', name: 'Mrs. Funke Adewale', status: 'Present', clockIn: '07:50 AM', clockOut: '04:30 PM' },
    { id: 'TCH-003', name: 'Mr. Chidi Okoro', status: 'On-Leave', clockIn: '-', clockOut: '-' },
];


export default function AttendancePage() {
    const [studentDate, setStudentDate] = useState<Date | undefined>(new Date());
    const [staffDate, setStaffDate] = useState<Date | undefined>(new Date());
    const { toast } = useToast();

    const showToast = (title: string, description: string) => {
        toast({ title, description });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Attendance Tracking</CardTitle>
            <CardDescription>Monitor and manage daily attendance for students and staff members.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="students">
                <TabsList className="mb-4">
                    <TabsTrigger value="students">Student Attendance</TabsTrigger>
                    <TabsTrigger value="staff">Staff Attendance</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                    <div className="flex justify-between items-center mb-4 gap-2">
                       <div className="flex items-center gap-2">
                         <Select defaultValue="jss1a">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="jss1a">JSS 1A</SelectItem>
                                <SelectItem value="jss1b">JSS 1B</SelectItem>
                                <SelectItem value="jss2a">JSS 2A</SelectItem>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !studentDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {studentDate ? format(studentDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={studentDate}
                                onSelect={setStudentDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                       </div>
                        <Button onClick={() => showToast("Feature In Development", "A dialog for marking attendance will be shown here.")}><PlusCircle className="mr-2"/>Mark Attendance</Button>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Check-in Time</TableHead>
                                <TableHead>Check-out Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialStudentAttendance.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{record.name}</TableCell>
                                    <TableCell>{record.id}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            record.status === 'Present' ? 'default' :
                                            record.status === 'Absent' ? 'destructive' : 'secondary'
                                        } className={cn(record.status === 'Late' && 'bg-yellow-500 text-black')}>{record.status}</Badge>
                                    </TableCell>
                                    <TableCell>{record.checkIn}</TableCell>
                                    <TableCell>{record.checkOut}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="staff">
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !staffDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {staffDate ? format(staffDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={staffDate}
                                onSelect={setStaffDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Staff Name</TableHead>
                                <TableHead>Staff ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Clock-in Time</TableHead>
                                <TableHead>Clock-out Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {initialStaffAttendance.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{record.name}</TableCell>
                                    <TableCell>{record.id}</TableCell>
                                    <TableCell>
                                         <Badge variant={
                                            record.status === 'Present' ? 'default' : 'secondary'
                                        }>{record.status}</Badge>
                                    </TableCell>
                                    <TableCell>{record.clockIn}</TableCell>
                                    <TableCell>{record.clockOut}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
