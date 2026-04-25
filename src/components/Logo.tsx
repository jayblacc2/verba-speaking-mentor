import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export default function Logo({ className, iconOnly = false, layout = 'vertical' }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center text-primary", layout === 'vertical' ? "flex-col" : "flex-row gap-2", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconOnly ? "w-full h-full" : "w-16 h-16"}
      >
        <path
          d="M 33 65 C 20 60 16 40 26 26 C 36 12 55 12 65 26"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 65 26 C 65 26 73 38 60 52 C 50 62 40 62 33 65 L 26 71 C 28 69 30 67 33 65 Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 30 55 C 38 52 45 42 50 28"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 52 57 L 58 57 L 62 40 L 68 70 L 73 53 L 78 55 L 85 55"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {!iconOnly && (
        <span className="font-bold text-2xl tracking-tight mt-1 font-headline">Verba</span>
      )}
    </div>
  );
}
