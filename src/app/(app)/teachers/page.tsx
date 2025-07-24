
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
import { MoreHorizontal, UserPlus, FileUp } from 'lucide-react';
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

const teachersData = [
  {
    id: 'TCH-001',
    name: 'Mr. John Adeolu',
    subject: 'Mathematics',
    classAssigned: 'JSS 1A',
    status: 'Active',
    phone: '08012345678',
  },
  {
    id: 'TCH-002',
    name: 'Mrs. Funke Adewale',
    subject: 'English Language',
    classAssigned: 'JSS 2B',
    status: 'Active',
    phone: '08023456789',
  },
  {
    id: 'TCH-003',
    name: 'Mr. Chidi Okoro',
    subject: 'Basic Science',
    classAssigned: 'SSS 1C',
    status: 'On-Leave',
    phone: '08034567890',
  },
  {
    id: 'TCH-004',
    name: 'Mrs. Aisha Bello',
    subject: 'Social Studies',
    classAssigned: 'JSS 1A',
    status: 'Active',
    phone: '08045678901',
  },
  {
    id: 'TCH-005',
    name: 'Mr. Emeka Obi',
    subject: 'Chemistry',
    classAssigned: 'SSS 3A',
    status: 'Active',
    phone: '08056789012',
  },
];

type Teacher = typeof teachersData[0];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);
  const [open, setOpen] = useState(false);

  const handleAddTeacher = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTeacher = {
      id: `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      name: formData.get('teacherName') as string,
      subject: formData.get('subject') as string,
      classAssigned: 'N/A',
      status: 'Active',
      phone: formData.get('phone') as string,
    };
    setTeachers([...teachers, newTeacher]);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-headline">Teacher Management</CardTitle>
          <CardDescription>
            View, add, and manage all teacher records in the school.
          </CardDescription>
        </div>
        <div className="flex gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to add a new teacher.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTeacher}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teacherName" className="text-right">
                      Teacher Name
                    </Label>
                    <Input id="teacherName" name="teacherName" className="col-span-3" required/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Main Subject
                    </Label>
                    <Input id="subject" name="subject" className="col-span-3" required/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone Number
                    </Label>
                    <Input id="phone" name="phone" type="tel" className="col-span-3" required/>
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Teacher</Button>
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
              <TableHead>Teacher ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Main Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      teacher.status === 'Active'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell>{teacher.phone}</TableCell>
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
