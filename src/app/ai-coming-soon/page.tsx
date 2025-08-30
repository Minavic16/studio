'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './animation.css'; // Import the animation styles

const AiComingSoonPage = () => {
  return (
    <div className="animated-gradient flex h-screen w-screen items-center justify-center">
      <div className="relative mx-4 flex w-full max-w-md flex-col items-center rounded-lg bg-white/80 p-8 text-center shadow-2xl backdrop-blur-lg sm:p-12">
        <h1 className="text-4xl font-bold text-gray-800">AI Mode</h1>
        <p className="mt-2 text-xl text-gray-600">Coming Soon</p>
        <Link href="/" passHref>
          <Button asChild className="mt-8">
            <span>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AiComingSoonPage;
