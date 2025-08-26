
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

const studentsData = {
    'jss1a-math-midterm': [
        { id: 'ST-001', name: 'Tunde Adebayo', score: '' },
        { id: 'ST-004', name: 'Fatima Bello', score: '' },
    ],
    'jss2b-english-midterm': [
        { id: 'ST-002', name: 'Chiamaka Nwosu', score: '' },
    ]
};

export default function TeacherResultsPage() {
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [selectedClass, setSelectedClass] = useState('jss1a');
  const [selectedSubject, setSelectedSubject] = useState('math');

  const resultsKey = `${selectedClass}-${selectedSubject}-${selectedExam}`;
  const currentStudents = studentsData[resultsKey as keyof typeof studentsData] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Enter & Manage Results</CardTitle>
        <CardDescription>Input student scores for assessments and examinations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="midterm">Mid-Term Test</SelectItem>
                        <SelectItem value="first_term">First Term Exam</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="jss1a">JSS 1A</SelectItem>
                        <SelectItem value="jss2b">JSS 2B</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="english">English Language</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto"><Upload className="mr-2"/>Upload from CSV</Button>
                <Button className="w-full md:w-auto">Save Results</Button>
            </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead className="w-[150px]">Score (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.length > 0 ? currentStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                    <Input type="number" min="0" max="100" placeholder="Enter score" defaultValue={student.score}/>
                </TableCell>
              </TableRow>
            )) : (
                 <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        No students found for this selection.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
