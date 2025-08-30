'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import AiIcon from './AiIcon';
import './AiIcon.css';

const AiModeButton = () => {
  return (
    <Link href="/ai-coming-soon" passHref>
      <Button asChild variant="ghost" size="icon">
        <AiIcon />
      </Button>
    </Link>
  );
};

export default AiModeButton;
