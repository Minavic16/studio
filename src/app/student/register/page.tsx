
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Personal Information' },
  { id: 2, name: 'Contact & Guardian' },
  { id: 3, name: 'Review & Submit' },
];

export default function StudentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: undefined as Date | undefined,
    gender: '',
    address: '',
    phone: '',
    parentName: '',
    parentPhone: '',
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // For now, we'll just simulate a successful submission and redirect
    router.push('/student/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
           <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Student Registration</CardTitle>
          <CardDescription>Complete the steps below to enroll.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-white',
                    currentStep > step.id ? 'bg-primary' :
                    currentStep === step.id ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? <Check size={20}/> : step.id}
                </div>
                <span className={cn('font-medium', currentStep === step.id ? 'text-primary' : 'text-muted-foreground')}>{step.name}</span>
                {index < steps.length - 1 && <div className="h-px w-16 bg-border" />}
              </div>
            ))}
          </div>

          <form className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="e.g. Tunde Adebayo" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.dob && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={formData.dob} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                    </Popover>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select name="gender" value={formData.gender} onValueChange={(v) => handleSelectChange('gender', v)} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. 123 Main Street, Lagos" required />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent/Guardian Full Name</Label>
                      <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="e.g. Mr. Adekunle Adebayo" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent/Guardian Phone Number</Label>
                      <Input id="parentPhone" name="parentPhone" type="tel" value={formData.parentPhone} onChange={handleInputChange} placeholder="e.g. 08012345678" required />
                    </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in">
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Your Information</CardTitle>
                            <CardDescription>Please confirm the details below are correct before submitting.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <p><strong>Full Name:</strong> {formData.fullName}</p>
                           <p><strong>Date of Birth:</strong> {formData.dob ? format(formData.dob, "PPP") : 'Not set'}</p>
                           <p><strong>Gender:</strong> {formData.gender}</p>
                           <p><strong>Address:</strong> {formData.address}</p>
                           <p><strong>Parent/Guardian:</strong> {formData.parentName}</p>
                           <p><strong>Parent/Guardian Phone:</strong> {formData.parentPhone}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2" /> Previous
                </Button>
            )}
            {currentStep === 1 && <div />} 
            
            {currentStep < steps.length && (
                <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2" />
                </Button>
            )}

            {currentStep === steps.length && (
                <Button onClick={handleSubmit}>
                   <Check className="mr-2"/> Submit Registration
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
