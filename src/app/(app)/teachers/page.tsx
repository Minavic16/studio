
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
import { useToast } from '@/hooks/use-toast';

const teachersData = [
  { id: 'TCH-001', name: 'Mr. Alan Grant', subject: 'Algebra I', status: 'Active', phone: '08012345678' },
  { id: 'TCH-002', name: 'Ms. Eleanor Vance', subject: 'English Literature', status: 'Active', phone: '08023456789' },
  { id: 'TCH-003', name: 'Mrs. Katherine Reed', subject: 'World History', status: 'On-Leave', phone: '08034567890' },
  { id: 'TCH-004', name: 'Mr. David Miller', subject: 'Biology', status: 'Active', phone: '08045678901' },
  { id: 'TCH-005', name: 'Dr. Evelyn Shaw', subject: 'Chemistry', status: 'Active', phone: '08056789012' },
  { id: 'TCH-006', name: 'Ms. Chloe Foster', subject: 'Computer Science', status: 'Active', phone: '08067890123' },
  { id: 'TCH-007', name: 'Coach Brian Murphy', subject: 'Physical Education', status: 'Active', phone: '08078901234' },
  { id: 'TCH-008', name: 'Ms. Julia Rossi', subject: 'Art & Design', status: 'Active', phone: '08089012345' },
  { id: 'TCH-009', name: 'Señora Maria Torres', subject: 'Spanish I', status: 'Active', phone: '08090123456' },
  { id: 'TCH-010', name: 'Mr. Leo Johnson', subject: 'Music Theory', status: 'Active', phone: '08101234567' },
];

type Teacher = typeof teachersData[0];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTeacher = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTeacher = {
      id: `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      name: formData.get('teacherName') as string,
      subject: formData.get('subject') as string,
      status: 'Active',
      phone: formData.get('phone') as string,
    };
    setTeachers([...teachers, newTeacher]);
    setOpen(false);
     toast({
        title: "Teacher Added",
        description: `${newTeacher.name} has been successfully added.`,
    });
  };

  const handleDeleteTeacher = (teacherId: string) => {
    const teacherName = teachers.find(t => t.id === teacherId)?.name || 'Teacher';
    setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
    toast({
        title: "Teacher Deleted",
        description: `${teacherName} has been removed from the system.`,
        variant: 'destructive'
    });
  };

  const showToast = (title: string, description: string) => {
    toast({ title, description });
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
            <Button variant="outline" onClick={() => showToast("Coming Soon!", "Bulk teacher import will be available in a future update.")}>
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
                      <DropdownMenuItem onClick={() => showToast("Feature In Development", "Detailed teacher view is coming soon.")}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => showToast("Feature In Development", "Teacher editing will be available soon.")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher.id)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
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
