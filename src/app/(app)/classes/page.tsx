
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
import { useToast } from '@/hooks/use-toast';

const initialClassesData = [
    { id: 'CLS-001', name: '9A', studentCount: 3, formTeacher: 'Mr. Alan Grant' },
    { id: 'CLS-002', name: '9B', studentCount: 3, formTeacher: 'Ms. Eleanor Vance' },
    { id: 'CLS-003', name: '9C', studentCount: 3, formTeacher: 'Mrs. Katherine Reed' },
    { id: 'CLS-004', name: '9D', studentCount: 1, formTeacher: 'Ms. Chloe Foster' },
];

const initialSubjectsData = [
    { id: 'SUB-001', name: 'Algebra I', teacher: 'Mr. Alan Grant' },
    { id: 'SUB-002', name: 'English Literature', teacher: 'Ms. Eleanor Vance' },
    { id: 'SUB-003', name: 'World History', teacher: 'Mrs. Katherine Reed' },
    { id: 'SUB-004', name: 'Biology', teacher: 'Mr. David Miller' },
    { id: 'SUB-005', name: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
    { id: 'SUB-006', name: 'Computer Science', teacher: 'Ms. Chloe Foster' },
    { id: 'SUB-007', name: 'Physical Education', teacher: 'Coach Brian Murphy' },
    { id: 'SUB-008', name: 'Art & Design', teacher: 'Ms. Julia Rossi' },
    { id: 'SUB-009', name: 'Spanish I', teacher: 'Señora Maria Torres' },
    { id: 'SUB-010', name: 'Music Theory', teacher: 'Mr. Leo Johnson' },
];

const teachers = [
    'Mr. Alan Grant', 'Ms. Eleanor Vance', 'Mrs. Katherine Reed', 'Mr. David Miller',
    'Dr. Evelyn Shaw', 'Ms. Chloe Foster', 'Coach Brian Murphy', 'Ms. Julia Rossi',
    'Señora Maria Torres', 'Mr. Leo Johnson'
];

export default function ClassesPage() {
    const [classes, setClasses] = useState(initialClassesData);
    const [subjects, setSubjects] = useState(initialSubjectsData);
    const [isClassDialogOpen, setClassDialogOpen] = useState(false);
    const [isSubjectDialogOpen, setSubjectDialogOpen] = useState(false);
    const { toast } = useToast();

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
        toast({ title: "Class Added", description: `Class ${newClass.name} has been created.`});
    };

    const handleAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newSubject = {
            id: `SUB-${String(subjects.length + 1).padStart(3, '0')}`,
            name: formData.get('subjectName') as string,
            teacher: 'Unassigned',
        };
        setSubjects([...subjects, newSubject]);
        setSubjectDialogOpen(false);
        toast({ title: "Subject Added", description: `Subject ${newSubject.name} has been created.`});
    };

    const handleDeleteClass = (classId: string) => {
        const className = classes.find(c => c.id === classId)?.name || 'Class';
        setClasses(classes.filter(c => c.id !== classId));
        toast({ title: "Class Deleted", description: `Class ${className} has been removed.`, variant: 'destructive'});
    }

    const handleDeleteSubject = (subjectId: string) => {
        const subjectName = subjects.find(s => s.id === subjectId)?.name || 'Subject';
        setSubjects(subjects.filter(s => s.id !== subjectId));
        toast({ title: "Subject Deleted", description: `Subject ${subjectName} has been removed.`, variant: 'destructive'});
    }

    const showToast = (title: string, description: string) => {
        toast({ title, description });
    }


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
                                        <Input id="className" name="className" className="col-span-3" placeholder="e.g. 9A" required/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="formTeacher" className="text-right">Form Teacher</Label>
                                        <Select name="formTeacher" required>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Assign a teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {teachers.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
                                            <DropdownMenuItem onClick={() => showToast("Feature In Development", "Class editing will be available soon.")}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => showToast("Feature In Development", "This will navigate to the students page with the class pre-selected.")}>View Students</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteClass(c.id)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
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
                            <TableHead>Teacher</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.map((s) => (
                            <TableRow key={s.id}>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell>{s.teacher}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => showToast("Feature In Development", "Subject editing will be available soon.")}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => showToast("Feature In Development", "A dialog to assign a teacher will be shown here.")}>Assign Teacher</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteSubject(s.id)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
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
