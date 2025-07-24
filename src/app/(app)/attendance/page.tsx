import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AttendancePage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Attendance Tracking</CardTitle>
            <CardDescription>This page is under construction. Here you will track student and staff attendance.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Coming Soon</p>
            </div>
        </CardContent>
    </Card>
  );
}
