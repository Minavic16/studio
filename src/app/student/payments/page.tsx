
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const paymentData = [
  { id: 'INV-001', description: 'First Term School Fees', amount: 50000, status: 'Paid', dueDate: '2024-01-15' },
  { id: 'INV-007', description: 'Second Term School Fees', amount: 50000, status: 'Due', dueDate: '2024-04-15' },
  { id: 'INV-012', description: 'PTA Levy', amount: 2500, status: 'Overdue', dueDate: '2024-03-30' },
];

export default function StudentPaymentsPage() {
  const { toast } = useToast();

  const handlePayment = (invoiceId: string) => {
    toast({
      title: "Redirecting to Payment Gateway...",
      description: `Please follow the instructions to complete payment for invoice ${invoiceId}.`,
    });
  }

  return (
    <Card>
      <CardHeader>
          <CardTitle className="text-2xl font-headline">Fee Payments</CardTitle>
          <CardDescription>View your invoices and manage payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.amount.toLocaleString()}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    payment.status === 'Paid' ? 'default' :
                    payment.status === 'Overdue' ? 'destructive' : 'secondary'
                  } className={cn(payment.status === 'Due' && 'bg-yellow-500 text-black')}>{payment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {payment.status !== 'Paid' ? (
                     <Button onClick={() => handlePayment(payment.id)}>Pay Now</Button>
                  ) : (
                    <Button variant="outline" disabled>Paid</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
