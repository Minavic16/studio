
'use client';

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "next-themes";

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
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, Trash } from "lucide-react";

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must not be longer than 50 characters." }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const gradingScaleSchema = z.object({
  grades: z.array(z.object({
    grade: z.string().min(1, { message: "Grade cannot be empty." }),
    minScore: z.coerce.number().min(0).max(100),
    maxScore: z.coerce.number().min(0).max(100),
  })),
});

type GradingScaleFormValues = z.infer<typeof gradingScaleSchema>;

const promotionCriteriaSchema = z.object({
    criteria: z.string().min(10, { message: "Criteria must be at least 10 characters." }),
});

type PromotionCriteriaFormValues = z.infer<typeof promotionCriteriaSchema>;


export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingGrades, setIsSubmittingGrades] = useState(false);
  const [isSubmittingCriteria, setIsSubmittingCriteria] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();


  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const gradingForm = useForm<GradingScaleFormValues>({
    resolver: zodResolver(gradingScaleSchema),
    defaultValues: {
        grades: [
            { grade: 'A', minScore: 70, maxScore: 100 },
            { grade: 'B', minScore: 60, maxScore: 69 },
            { grade: 'C', minScore: 50, maxScore: 59 },
            { grade: 'D', minScore: 45, maxScore: 49 },
            { grade: 'F', minScore: 0, maxScore: 44 },
        ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: gradingForm.control,
    name: "grades",
  });

  const promotionForm = useForm<PromotionCriteriaFormValues>({
    resolver: zodResolver(promotionCriteriaSchema),
    defaultValues: {
        criteria: 'A student must have an average score of 50% or more to be promoted to the next class. Also, a student must pass Mathematics and English language.'
    }
  });


  const onProfileSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user) return;
    setIsSubmittingProfile(true);
    try {
      await updateProfile(user, { displayName: data.displayName });
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
      setIsSubmittingProfile(false);
    }
  };

  const onGradesSubmit: SubmitHandler<GradingScaleFormValues> = async (data) => {
    setIsSubmittingGrades(true);
    console.log(data);
    // TODO: Save to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
        title: "Success",
        description: "Grading scale saved successfully.",
    });
    setIsSubmittingGrades(false);
  }

  const onCriteriaSubmit: SubmitHandler<PromotionCriteriaFormValues> = async (data) => {
    setIsSubmittingCriteria(true);
    console.log(data);
    // TODO: Save to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
        title: "Success",
        description: "Promotion criteria saved successfully.",
    });
    setIsSubmittingCriteria(false);
  }


  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };
  
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {authLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          ) : (
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Name</Label>
                <Input id="displayName" {...profileForm.register("displayName")} />
                {profileForm.formState.errors.displayName && (
                  <p className="text-sm text-destructive">{profileForm.formState.errors.displayName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...profileForm.register("email")} disabled />
              </div>
              <Button type="submit" disabled={isSubmittingProfile}>
                {isSubmittingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label>Theme</Label>
            <div className="flex items-center space-x-4">
                <Button variant={currentTheme === 'light' ? 'default' : 'outline'} onClick={() => handleThemeChange('light')} size="lg" className="flex-1 justify-start gap-2">
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                </Button>
                <Button variant={currentTheme === 'dark' ? 'default' : 'outline'} onClick={() => handleThemeChange('dark')} size="lg" className="flex-1 justify-start gap-2">
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme-select">Interface Theme</Label>
            <Select onValueChange={handleThemeChange} defaultValue={theme}>
              <SelectTrigger id="theme-select" className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select the theme for the application. &quot;System&quot; will match your operating system&apos;s preference.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Academic Settings</CardTitle>
            <CardDescription>
                Define grading scales and promotion criteria for the school.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label>Grading Scale</Label>
                <p className="text-sm text-muted-foreground">Set the score ranges for each grade.</p>
                <form onSubmit={gradingForm.handleSubmit(onGradesSubmit)} className="mt-4 space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <Input {...gradingForm.register(`grades.${index}.grade`)} placeholder="Grade (e.g. A)" className="w-20"/>
                            <Input type="number" {...gradingForm.register(`grades.${index}.minScore`)} placeholder="Min Score" className="w-24"/>
                            <span>-</span>
                            <Input type="number" {...gradingForm.register(`grades.${index}.maxScore`)} placeholder="Max Score" className="w-24"/>
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ grade: '', minScore: 0, maxScore: 0})}>Add Grade</Button>
                    <div className="flex justify-start">
                        <Button type="submit" disabled={isSubmittingGrades}>
                             {isSubmittingGrades ? "Saving..." : "Save Grading Scale"}
                        </Button>
                    </div>
                </form>
            </div>
            <div>
                <Label>Promotion Criteria</Label>
                <p className="text-sm text-muted-foreground">Define the rules for promoting students to the next class.</p>
                <form onSubmit={promotionForm.handleSubmit(onCriteriaSubmit)} className="mt-4 space-y-4">
                     <Textarea {...promotionForm.register('criteria')} rows={4} />
                      {promotionForm.formState.errors.criteria && (
                        <p className="text-sm text-destructive">{promotionForm.formState.errors.criteria.message}</p>
                    )}
                     <Button type="submit" disabled={isSubmittingCriteria}>
                        {isSubmittingCriteria ? "Saving..." : "Save Criteria"}
                     </Button>
                </form>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
