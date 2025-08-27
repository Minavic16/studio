
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
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const resultsData = {
    'midterm': [
        { subject: 'Mathematics', score: 85, grade: 'A' },
        { subject: 'English Language', score: 78, grade: 'A' },
        { subject: 'Biology', score: 90, grade: 'A' },
        { subject: 'Chemistry', score: 88, grade: 'A' },
        { subject: 'World History', score: 75, grade: 'A' },
    ],
    'first_term': [],
};

export default function StudentResultsPage() {
  const [selectedExam, setSelectedExam] = useState('midterm');
  const { toast } = useToast();

  const currentResults = resultsData[selectedExam as keyof typeof resultsData] || [];

  const handleDownload = () => {
    toast({
        title: "Generating Report Card...",
        description: "Your report card will be downloaded shortly.",
    });
  }

  return (
    <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <CardTitle className="text-2xl font-headline">My Results</CardTitle>
                <CardDescription>View your academic performance and download report cards.</CardDescription>
            </div>
             <div className="flex items-center gap-2 mt-4 md:mt-0">
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="midterm">Mid-Term Test</SelectItem>
                        <SelectItem value="first_term">First Term Exam</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4"/>Download Report</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Score (%)</TableHead>
                        <TableHead>Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentResults.length > 0 ? currentResults.map((result) => (
                        <TableRow key={result.subject}>
                            <TableCell className="font-medium">{result.subject}</TableCell>
                            <TableCell>{result.score}</TableCell>
                            <TableCell>
                                <Badge variant={result.grade === 'A' || result.grade === 'B' ? 'default' : 'secondary'}>{result.grade}</Badge>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                                Results for this exam are not available yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
