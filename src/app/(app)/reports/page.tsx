
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export default function ReportsPage() {
    const [studentReportDate, setStudentReportDate] = useState<Date | undefined>(new Date());
    const [attendanceReportDate, setAttendanceReportDate] = useState<{from: Date | undefined, to: Date | undefined}>({ from: new Date(), to: new Date()});
    const [financeReportDate, setFinanceReportDate] = useState<{from: Date | undefined, to: Date | undefined}>({ from: new Date(), to: new Date()});


  return (
    <div className='space-y-6'>
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Reports & Analytics</CardTitle>
                <CardDescription>Generate and download detailed reports for various school operations.</CardDescription>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Student Performance</CardTitle>
                    <CardDescription>Generate academic performance reports for students.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className='space-y-2'>
                        <Label>Exam/Term</Label>
                         <Select defaultValue="second-term">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Exam/Term" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="first-term">First Term Examination</SelectItem>
                                <SelectItem value="second-term">Second Term Examination</SelectItem>
                                <SelectItem value="mid-term">Mid-Term Test</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className='space-y-2'>
                        <Label>Class</Label>
                         <Select defaultValue="all">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Classes</SelectItem>
                                <SelectItem value="jss1a">JSS 1A</SelectItem>
                                <SelectItem value="jss1b">JSS 1B</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full"><Download className="mr-2"/>Generate Report</Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Financial Report</CardTitle>
                    <CardDescription>Generate reports on fees, payments, and expenses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className='space-y-2'>
                        <Label>Report Type</Label>
                         <Select defaultValue="fee-collection">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Report Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fee-collection">Fee Collection</SelectItem>
                                <SelectItem value="outstanding-fees">Outstanding Fees</SelectItem>
                                <SelectItem value="expense-summary">Expense Summary</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <Label>Date Range</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !financeReportDate.from && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {financeReportDate.from ? 
                                    (financeReportDate.to ? `${format(financeReportDate.from, "LLL dd, y")} - ${format(financeReportDate.to, "LLL dd, y")}`: format(financeReportDate.from, "LLL dd, y"))
                                    : <span>Pick a date</span>
                                }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="range"
                                selected={financeReportDate}
                                onSelect={(range) => setFinanceReportDate(range || { from: undefined, to: undefined })}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button className="w-full"><Download className="mr-2"/>Generate Report</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Attendance Analytics</CardTitle>
                    <CardDescription>Generate attendance reports for students and staff.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className='space-y-2'>
                        <Label>Report For</Label>
                         <Select defaultValue="students">
                            <SelectTrigger>
                                <SelectValue placeholder="Select one" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="students">Students</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2'>
                        <Label>Date Range</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !attendanceReportDate.from && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                 {attendanceReportDate.from ? 
                                    (attendanceReportDate.to ? `${format(attendanceReportDate.from, "LLL dd, y")} - ${format(attendanceReportDate.to, "LLL dd, y")}`: format(attendanceReportDate.from, "LLL dd, y"))
                                    : <span>Pick a date</span>
                                }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="range"
                                selected={attendanceReportDate}
                                onSelect={(range) => setAttendanceReportDate(range || { from: undefined, to: undefined })}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button className="w-full"><Download className="mr-2"/>Generate Report</Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Enrollment Summary</CardTitle>
                    <CardDescription>Get a summary of student enrollment numbers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className='space-y-2'>
                        <Label>Group By</Label>
                         <Select defaultValue="class">
                            <SelectTrigger>
                                <SelectValue placeholder="Select one" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="class">Class</SelectItem>
                                <SelectItem value="gender">Gender</SelectItem>
                                <SelectItem value="session">Session</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="h-[72px]"></div>
                    <Button className="w-full"><Download className="mr-2"/>Generate Report</Button>
                </CardContent>
            </Card>

        </div>
    </div>
  );
}
