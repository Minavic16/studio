
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function StudentProfilePage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Updated",
            description: "Your information has been saved successfully.",
        });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">My Profile</CardTitle>
        <CardDescription>View and manage your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" defaultValue="ST-001" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Liam Chen" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Input id="class" defaultValue="9A" disabled />
            </div>
             <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" defaultValue="Male" disabled />
            </div>
          </div>
          
          <div className="border-t pt-6">
             <h3 className="text-lg font-medium mb-4">Guardian Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input id="parentName" defaultValue="Mr. & Mrs. Chen" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                    <Input id="parentPhone" type="tel" defaultValue="08011223344" />
                </div>
             </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
