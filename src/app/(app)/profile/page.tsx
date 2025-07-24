
'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/components/auth-provider';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must not be longer than 50 characters." }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const getInitials = (name?: string | null) => {
    if (!name) return "";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        // TODO: Add firebase storage upload logic here
        toast({
            title: "Photo Ready",
            description: "Click 'Save Changes' to update your profile photo.",
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await updateProfile(user, { 
          displayName: data.displayName,
          // In a real app, you'd upload the photo to Firebase Storage and get a URL
          photoURL: photoPreview || user.photoURL 
      });
      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">My Profile</CardTitle>
            <CardDescription>View and edit your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
            {authLoading ? (
                 <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className='space-y-2'>
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-10 w-48" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-1/4" />
                </div>
            ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={photoPreview ?? user?.photoURL ?? ''} alt={user?.displayName ?? ''} />
                        <AvatarFallback className="text-3xl">
                           {user?.photoURL ? getInitials(user.displayName) : <UserIcon className="h-10 w-10"/>}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/gif"
                            />
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
                            <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input id="displayName" {...form.register("displayName")} />
                    {form.formState.errors.displayName && (
                    <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...form.register("email")} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" type="text" value="Administrator" disabled />
                </div>
                
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </form>
          )}
        </CardContent>
    </Card>
  );
}
