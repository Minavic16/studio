
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

const studentsData = {
    'jss1a': [
        { id: 'ST-001', name: 'Tunde Adebayo', performance: 'Excellent', lastContacted: '2024-05-10' },
        { id: 'ST-004', name: 'Fatima Bello', performance: 'Good', lastContacted: '2024-05-12' },
    ],
    'jss2b': [
        { id: 'ST-002', name: 'Chiamaka Nwosu', performance: 'Average', lastContacted: '2024-05-11' },
    ],
    'sss2a': [],
    'sss3a': [
        { id: 'ST-005', name: 'David Okon', performance: 'Good', lastContacted: '2024-05-09' },
    ]
};

type Student = {
  id: string;
  name: string;
  performance: string;
  lastContacted: string;
};

export default function TeacherStudentsPage() {
  const [selectedClass, setSelectedClass] = useState('jss1a');
  const students: Student[] = studentsData[selectedClass as keyof typeof studentsData] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">My Students</CardTitle>
        <CardDescription>View and manage students in your assigned classes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-2">
            <div className="flex items-center gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="jss1a">JSS 1A</SelectItem>
                        <SelectItem value="jss2b">JSS 2B</SelectItem>
                        <SelectItem value="sss2a">SSS 2A</SelectItem>
                        <SelectItem value="sss3a">SSS 3A</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Search students..." className="w-[240px]"/>
            </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Overall Performance</TableHead>
              <TableHead>Last Parent Contact</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length > 0 ? students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.performance}</TableCell>
                <TableCell>{student.lastContacted}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Academic Record</DropdownMenuItem>
                      <DropdownMenuItem>Log a Comment</DropdownMenuItem>
                      <DropdownMenuItem>Contact Parent</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
                 <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No students found in this class.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
