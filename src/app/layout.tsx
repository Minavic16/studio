import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { type ReactNode } from 'react';
import PageLoader from '@/components/ui/page-loader';
import { LoaderProvider } from '@/components/ui/loader-context';

export const metadata: Metadata = {
  title: 'NestEdge School Management Engine: Streamlined Education',
  description: 'A comprehensive school operations platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LoaderProvider>
          <PageLoader />
          {children}
          <Toaster />
        </LoaderProvider>
      </body>
    </html>
  );
}
