import React from 'react';

interface SectionDividerProps {
  title: string;
  className?: string;
}

export default function SectionDivider({ title, className = "" }: SectionDividerProps) {
  return (
    <div className={`w-full flex items-center gap-4 z-20 ${className}`}>
      <h2 className="font-header text-[#7B61FF] text-sm md:text-base opacity-60 whitespace-nowrap">
        {title}
      </h2>
      <span 
        className="text-[#7B61FF] opacity-30 font-mono text-[10px] md:text-xs tracking-[0.2em] flex-1 overflow-hidden whitespace-nowrap"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, black 10%, transparent 90%)',
          maskImage: 'linear-gradient(to right, black 10%, transparent 90%)' 
        }}
      >
        {'▒'.repeat(300)}
      </span>
    </div>
  );
}
