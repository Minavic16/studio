
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { School, User, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <Card className="w-full max-w-md shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Select Your Role</CardTitle>
          <CardDescription>
            Choose a role to access the corresponding dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
            size="lg"
          >
            <UserCog className="mr-2" />
            Login as Administrator
          </Button>
          <Button
            onClick={() => router.push('/teacher/dashboard')}
            className="w-full"
            size="lg"
            variant="secondary"
          >
            <User className="mr-2" />
            Login as Teacher
          </Button>
          <Button
            onClick={() => router.push('/student/dashboard')}
            className="w-full"
            size="lg"
            variant="outline"
          >
            <School className="mr-2" />
            Login as Student
          </Button>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-center text-sm">
          <p>
            New student?{' '}
            <Link href="/student/register" className="font-semibold text-primary underline-offset-4 hover:underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
