
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
import { PlusCircle, Upload, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const examScheduleData = [
  { id: 'EXM-001', name: 'First Term Examination', class: 'All Classes', date: '2024-03-15', status: 'Completed' },
  { id: 'EXM-002', name: 'Mid-Term Test', class: 'All Classes', date: '2024-02-20', status: 'Completed' },
  { id: 'EXM-003', name: 'Second Term Examination', class: 'All Classes', date: '2024-06-10', status: 'Upcoming' },
];

const examResultsData = {
    'jss1a-math-midterm': [
        { studentId: 'ST-001', studentName: 'Tunde Adebayo', score: 85, grade: 'A' },
        { studentId: 'ST-002', studentName: 'Chiamaka Nwosu', score: 65, grade: 'B' },
        { studentId: 'ST-003', studentName: 'Musa Ibrahim', score: 48, grade: 'D' },
        { studentId: 'ST-004', studentName: 'Fatima Bello', score: 92, grade: 'A' },
    ],
    'jss1a-english-midterm': [
        { studentId: 'ST-001', studentName: 'Tunde Adebayo', score: 78, grade: 'A' },
        { studentId: 'ST-002', studentName: 'Chiamaka Nwosu', score: 55, grade: 'C' },
        { studentId: 'ST-003', studentName: 'Musa Ibrahim', score: 61, grade: 'B' },
        { studentId: 'ST-004', studentName: 'Fatima Bello', score: 72, grade: 'A' },
    ],
};


export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [selectedClass, setSelectedClass] = useState('jss1a');
  const [selectedSubject, setSelectedSubject] = useState('math');
  const { toast } = useToast();
  
  const resultsKey = `${selectedClass}-${selectedSubject}-${selectedExam}`;
  const currentResults = examResultsData[resultsKey as keyof typeof examResultsData] || [];

  const showToast = (title: string, description: string) => {
    toast({ title, description });
  };


  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Exam & Result Management</CardTitle>
            <CardDescription>Schedule exams, manage results, and publish report cards.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="results">
                <TabsList className="mb-4">
                    <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
                    <TabsTrigger value="results">Result Management</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                    <div className="flex justify-end mb-4">
                        <Button onClick={() => showToast("Feature In Development", "A dialog for scheduling a new exam will appear here.")}><PlusCircle className="mr-2"/>Schedule New Exam</Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Exam Name</TableHead>
                                <TableHead>Applicable To</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {examScheduleData.map((exam) => (
                                <TableRow key={exam.id}>
                                    <TableCell className="font-medium">{exam.name}</TableCell>
                                    <TableCell>{exam.class}</TableCell>
                                    <TableCell>{exam.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={exam.status === 'Completed' ? 'secondary' : 'default'}>{exam.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="results">
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <div className="flex items-center gap-2">
                            <Select value={selectedExam} onValueChange={setSelectedExam}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Exam" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="midterm">Mid-Term Test</SelectItem>
                                    <SelectItem value="first_term">First Term Exam</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jss1a">JSS 1A</SelectItem>
                                    <SelectItem value="jss1b">JSS 1B</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="math">Mathematics</SelectItem>
                                    <SelectItem value="english">English Language</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => showToast("Feature In Development", "This will open a file dialog to upload a CSV of student results.")}><Upload className="mr-2"/>Upload Results</Button>
                            <Button onClick={() => showToast("Results Published!", "Students can now view their results in their portal.")}><CheckCircle className="mr-2"/>Publish Results</Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Score (%)</TableHead>
                                <TableHead>Grade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentResults.length > 0 ? currentResults.map((result) => (
                                <TableRow key={result.studentId}>
                                    <TableCell>{result.studentId}</TableCell>
                                    <TableCell className="font-medium">{result.studentName}</TableCell>
                                    <TableCell>{result.score}</TableCell>
                                    <TableCell>
                                        <Badge variant={result.grade === 'A' || result.grade === 'B' ? 'default' : 'secondary'}>{result.grade}</Badge>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No results found for this selection.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
