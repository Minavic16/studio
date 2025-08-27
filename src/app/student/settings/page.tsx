
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentSettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Settings</CardTitle>
          <CardDescription>
            Manage your account and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSaveChanges} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="displayName">Name</Label>
                    <Input id="displayName" defaultValue="Liam Chen" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="liam.chen@example.com" placeholder="Your email address"/>
                </div>
                <Button type="submit">Save Changes</Button>
            </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Log out of your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">
            <LogOut className="mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
