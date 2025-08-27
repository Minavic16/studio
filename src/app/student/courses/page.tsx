
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const coursesData = [
  { name: 'Algebra I', teacher: 'Mr. Alan Grant' },
  { name: 'English Literature', teacher: 'Ms. Eleanor Vance' },
  { name: 'World History', teacher: 'Mrs. Katherine Reed' },
  { name: 'Biology', teacher: 'Mr. David Miller' },
  { name: 'Chemistry', teacher: 'Dr. Evelyn Shaw' },
  { name: 'Computer Science', teacher: 'Ms. Chloe Foster' },
  { name: 'Physical Education', teacher: 'Coach Brian Murphy' },
  { name: 'Art & Design', teacher: 'Ms. Julia Rossi' },
  { name: 'Spanish I', teacher: 'Señora Maria Torres' },
  { name: 'Music Theory', teacher: 'Mr. Leo Johnson' },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">My Courses</CardTitle>
                <CardDescription>An overview of all the subjects you are enrolled in this term.</CardDescription>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course) => (
                <Card key={course.name}>
                    <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>Taught by {course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full">View Course Materials</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
