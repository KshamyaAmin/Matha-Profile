import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 40, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className="animate-spin text-accent"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

interface FullPageLoaderProps {
  label?: string;
}

export function FullPageLoader({ label = 'Loading Mata Refrigeration...' }: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#06112C]/90 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-6">
        {/* Decorative background glow */}
        <div className="absolute -inset-10 bg-secondary/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
        
        {/* Brand Logo in background of spinner or pulsing */}
        <img
          src="/images/mata_logo_gold.svg"
          alt="Logo"
          className="h-16 w-16 object-contain animate-pulse-slow mb-2"
          style={{ animationDuration: '2.5s' }}
        />

        <LoadingSpinner size={48} />
        
        <p className="text-sm font-semibold tracking-wider text-white/80 uppercase animate-pulse">
          {label}
        </p>
      </div>
    </div>
  );
}
