import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean; }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline text-xl font-bold", className)}>
      <div className="bg-primary rounded-lg p-2">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      {showText && <span className='text-primary'>NestEdge</span>}
    </div>
  );
}
