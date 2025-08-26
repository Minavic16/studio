
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
import { CalendarIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const attendanceData = {
    'jss1a-math': [
        { id: 'ST-001', name: 'Tunde Adebayo', status: 'present' },
        { id: 'ST-004', name: 'Fatima Bello', status: 'present' },
    ],
     'jss2b-english': [
        { id: 'ST-002', name: 'Chiamaka Nwosu', status: 'absent' },
    ],
};

type StudentAttendance = {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'late' | 'permission';
};

export default function TeacherAttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('jss1a');
  const [selectedSubject, setSelectedSubject] = useState('math');

  const students = attendanceData[`${selectedClass}-${selectedSubject}` as keyof typeof attendanceData] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Mark Attendance</CardTitle>
        <CardDescription>Select a class and date to mark student attendance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="jss1a">JSS 1A</SelectItem>
                        <SelectItem value="jss2b">JSS 2B</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="english">English Language</SelectItem>
                    </SelectContent>
                </Select>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full md:w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <Button className="w-full md:w-auto">Save Attendance</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead className='text-center'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length > 0 ? students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                    <RadioGroup defaultValue={student.status} className="flex flex-wrap justify-center gap-2 md:gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="present" id={`present-${student.id}`} />
                            <Label htmlFor={`present-${student.id}`} className="flex items-center gap-1 text-green-600"><CheckCircle2 size={16}/> Present</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                            <Label htmlFor={`absent-${student.id}`} className="flex items-center gap-1 text-red-600"><XCircle size={16}/> Absent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="late" id={`late-${student.id}`} />
                            <Label htmlFor={`late-${student.id}`} className="flex items-center gap-1 text-yellow-600"><Clock size={16}/> Late</Label>
                        </div>
                    </RadioGroup>
                </TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                        Select a class and subject to view students.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
