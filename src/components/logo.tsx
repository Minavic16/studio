import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean; }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline", className)}>
      <div className="bg-primary rounded-lg p-2">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold leading-tight text-primary">NestEdge</span>
          <span className="text-base font-medium text-muted-foreground -mt-1">School Management Engine</span>
        </div>
      )}
    </div>
  );
}
