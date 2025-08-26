
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const paymentData = [
  { id: 'INV-001', studentId: 'ST-001', studentName: 'Tunde Adebayo', class: 'JSS 1A', amount: 50000, status: 'Paid', dueDate: '2024-01-15' },
  { id: 'INV-002', studentId: 'ST-002', studentName: 'Chiamaka Nwosu', class: 'JSS 2B', amount: 55000, status: 'Due', dueDate: '2024-01-20' },
  { id: 'INV-003', studentId: 'ST-003', studentName: 'Musa Ibrahim', class: 'SSS 1C', amount: 60000, status: 'Overdue', dueDate: '2024-01-10' },
  { id: 'INV-004', studentId: 'ST-005', studentName: 'David Okon', class: 'SSS 3A', amount: 65000, status: 'Paid', dueDate: '2024-01-12' },
  { id: 'INV-005', studentId: 'ST-004', studentName: 'Fatima Bello', class: 'JSS 1A', amount: 50000, status: 'Due', dueDate: '2024-01-22' },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(paymentData);
  const { toast } = useToast();

  const showToast = (title: string, description: string) => {
    toast({ title, description });
  };

  const markAsPaid = (invoiceId: string) => {
      setPayments(payments.map(p => p.id === invoiceId ? {...p, status: 'Paid'} : p));
      const studentName = payments.find(p => p.id === invoiceId)?.studentName;
      toast({title: "Payment Marked as Paid", description: `Invoice ${invoiceId} for ${studentName} has been updated.`})
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-headline">Fees & Payments</CardTitle>
          <CardDescription>Track and manage all student fee payments and invoices.</CardDescription>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => showToast("Feature In Development", "A dialog for creating a new invoice will be shown here.")}><PlusCircle className="mr-2"/>Create Invoice</Button>
            <Button onClick={() => showToast("Feature In Development", "A dialog for recording an offline payment will be shown here.")} variant="outline">Record Payment</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 gap-2">
            <div className="flex items-center gap-2">
                 <Select defaultValue="all-classes">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-classes">All Classes</SelectItem>
                        <SelectItem value="jss1a">JSS 1A</SelectItem>
                        <SelectItem value="jss2b">JSS 2B</SelectItem>
                        <SelectItem value="sss1c">SSS 1C</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all-status">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-status">All Status</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="due">Due</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.studentName}</TableCell>
                <TableCell>{payment.class}</TableCell>
                <TableCell>{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    payment.status === 'Paid' ? 'default' :
                    payment.status === 'Overdue' ? 'destructive' : 'secondary'
                  } className={cn(payment.status === 'Due' && 'bg-yellow-500 text-black')}>{payment.status}</Badge>
                </TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => showToast("Feature In Development", "A dialog with detailed invoice information will be shown here.")}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => showToast("Reminder Sent", `A payment reminder has been sent to ${payment.studentName}'s parents.`)}>Send Reminder</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => markAsPaid(payment.id)} disabled={payment.status === 'Paid'}>Mark as Paid</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
