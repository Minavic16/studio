
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, UserPlus, FileUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const studentsData = [
  {
    id: 'ST-001',
    name: 'Tunde Adebayo',
    class: 'JSS 1A',
    gender: 'Male',
    status: 'Active',
    parentName: 'Mr. & Mrs. Adebayo',
    parentPhone: '08012345678',
  },
  {
    id: 'ST-002',
    name: 'Chiamaka Nwosu',
    class: 'JSS 2B',
    gender: 'Female',
    status: 'Active',
    parentName: 'Mr. & Mrs. Nwosu',
    parentPhone: '08023456789',
  },
  {
    id: 'ST-003',
    name: 'Musa Ibrahim',
    class: 'SSS 1C',
    gender: 'Male',
    status: 'Suspended',
    parentName: 'Alhaji Ibrahim',
    parentPhone: '08034567890',
  },
  {
    id: 'ST-004',
    name: 'Fatima Bello',
    class: 'JSS 1A',
    gender: 'Female',
    status: 'Withdrawn',
    parentName: 'Mrs. Bello',
    parentPhone: '08045678901',
  },
  {
    id: 'ST-005',
    name: 'David Okon',
    class: 'SSS 3A',
    gender: 'Male',
    status: 'Active',
    parentName: 'Chief Okon',
    parentPhone: '08056789012',
  },
];

type Student = typeof studentsData[0];

export default function StudentsPage() {
  const [students, setStudents] = useState(studentsData);
  const [open, setOpen] = useState(false);

  const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStudent = {
      id: `ST-${String(students.length + 1).padStart(3, '0')}`,
      name: formData.get('studentName') as string,
      class: formData.get('class') as string,
      gender: formData.get('gender') as string,
      status: 'Active',
      parentName: formData.get('parentName') as string,
      parentPhone: formData.get('parentPhone') as string,
    };
    setStudents([...students, newStudent]);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-headline">Student Management</CardTitle>
          <CardDescription>
            View, add, and manage all student records in the school.
          </CardDescription>
        </div>
        <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to enroll a new student.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddStudent}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentName" className="text-right">
                      Student Name
                    </Label>
                    <Input id="studentName" name="studentName" className="col-span-3" required/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">
                      Class
                    </Label>
                    <Select name="class" required>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="JSS 1A">JSS 1A</SelectItem>
                            <SelectItem value="JSS 1B">JSS 1B</SelectItem>
                            <SelectItem value="JSS 2A">JSS 2A</SelectItem>
                            <SelectItem value="JSS 2B">JSS 2B</SelectItem>
                            <SelectItem value="SSS 1A">SSS 1A</SelectItem>
                            <SelectItem value="SSS 2B">SSS 2B</SelectItem>
                            <SelectItem value="SSS 3A">SSS 3A</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Gender
                    </Label>
                     <Select name="gender" required>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parentName" className="text-right">
                      Parent Name
                    </Label>
                    <Input id="parentName" name="parentName" className="col-span-3" required/>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parentPhone" className="text-right">
                      Parent Phone
                    </Label>
                    <Input id="parentPhone" name="parentPhone" type="tel" className="col-span-3" required/>
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Student</Button>
                </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
                <FileUp className="mr-2" />
                Bulk Import
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Parent&apos;s Contact</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.status === 'Active'
                        ? 'default'
                        : student.status === 'Suspended'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <div className='flex flex-col'>
                        <span>{student.parentName}</span>
                        <span className='text-muted-foreground text-sm'>{student.parentPhone}</span>
                    </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
