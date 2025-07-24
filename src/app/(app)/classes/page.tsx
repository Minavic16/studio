
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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialClassesData = [
    { id: 'CLS-001', name: 'JSS 1A', studentCount: 35, formTeacher: 'Mr. John Adeolu' },
    { id: 'CLS-002', name: 'JSS 2B', studentCount: 40, formTeacher: 'Mrs. Funke Adewale' },
    { id: 'CLS-003', name: 'SSS 1C', studentCount: 38, formTeacher: 'Mr. Chidi Okoro' },
    { id: 'CLS-004', name: 'SSS 3A', studentCount: 32, formTeacher: 'Mr. Emeka Obi' },
];

const initialSubjectsData = [
    { id: 'SUB-001', name: 'Mathematics', teacherCount: 5 },
    { id: 'SUB-002', name: 'English Language', teacherCount: 4 },
    { id: 'SUB-003', name: 'Basic Science', teacherCount: 3 },
    { id: 'SUB-004', name: 'Social Studies', teacherCount: 3 },
    { id: 'SUB-005', name: 'Chemistry', teacherCount: 2 },
];

export default function ClassesPage() {
    const [classes, setClasses] = useState(initialClassesData);
    const [subjects, setSubjects] = useState(initialSubjectsData);
    const [isClassDialogOpen, setClassDialogOpen] = useState(false);
    const [isSubjectDialogOpen, setSubjectDialogOpen] = useState(false);

    const handleAddClass = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newClass = {
            id: `CLS-${String(classes.length + 1).padStart(3, '0')}`,
            name: formData.get('className') as string,
            studentCount: 0,
            formTeacher: formData.get('formTeacher') as string,
        };
        setClasses([...classes, newClass]);
        setClassDialogOpen(false);
    };

    const handleAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newSubject = {
            id: `SUB-${String(subjects.length + 1).padStart(3, '0')}`,
            name: formData.get('subjectName') as string,
            teacherCount: 0,
        };
        setSubjects([...subjects, newSubject]);
        setSubjectDialogOpen(false);
    };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Class & Subject Management</CardTitle>
        <CardDescription>Organize classes, arms, and subjects offered in the school.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classes">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="classes">Classes</TabsTrigger>
                    <TabsTrigger value="subjects">Subjects</TabsTrigger>
                </TabsList>
                <TabsContent value="classes" className="mt-0">
                    <Dialog open={isClassDialogOpen} onOpenChange={setClassDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2" />Add Class</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Class</DialogTitle>
                                <DialogDescription>Fill in the form to create a new class.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddClass}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="className" className="text-right">Class Name</Label>
                                        <Input id="className" name="className" className="col-span-3" placeholder="e.g. JSS 1A" required/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="formTeacher" className="text-right">Form Teacher</Label>
                                        <Select name="formTeacher" required>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Assign a teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Mr. John Adeolu">Mr. John Adeolu</SelectItem>
                                                <SelectItem value="Mrs. Funke Adewale">Mrs. Funke Adewale</SelectItem>
                                                <SelectItem value="Mr. Chidi Okoro">Mr. Chidi Okoro</SelectItem>
                                                <SelectItem value="Mrs. Aisha Bello">Mrs. Aisha Bello</SelectItem>
                                                <SelectItem value="Mr. Emeka Obi">Mr. Emeka Obi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <Button type="submit">Add Class</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </TabsContent>
                 <TabsContent value="subjects" className="mt-0">
                    <Dialog open={isSubjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2" />Add Subject</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Subject</DialogTitle>
                                <DialogDescription>Fill in the form to add a new subject.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddSubject}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="subjectName" className="text-right">Subject Name</Label>
                                        <Input id="subjectName" name="subjectName" className="col-span-3" placeholder="e.g. Further Mathematics" required/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <Button type="submit">Add Subject</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </TabsContent>
            </div>
            <TabsContent value="classes">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Class Name</TableHead>
                            <TableHead>No. of Students</TableHead>
                            <TableHead>Form Teacher</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>{c.studentCount}</TableCell>
                                <TableCell>{c.formTeacher}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Students</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="subjects">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Name</TableHead>
                            <TableHead>No. of Teachers</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell>{s.teacherCount}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Assign to Classes</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
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
