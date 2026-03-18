import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;

    const updatePosition = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Direct DOM manipulation for zero latency
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, .cursor-crosshair');
        
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide the default cursor so only our Vim block shows
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
      style={{ willChange: 'transform' }}
    >
      {/* 
        Inner div handles the shape and hover transitions. 
        Vim block cursor by default, flattens into an underscore on hover.
      */}
      <div 
        className={`transition-all duration-200 ease-out origin-top-left ${
          isHovering 
            ? 'w-3 h-1 mt-4 bg-[#96FFFF]' 
            : 'w-2.5 h-5 bg-white animate-pulse'
        }`}
      />
    </div>
  );
}
