export const ScaledAscii = ({ ascii, gradient, className = "", dropShadow = false, fixedHeight = false }: { ascii: string, gradient: string, className?: string, dropShadow?: boolean, fixedHeight?: boolean }) => {
  const lines = ascii.split('\n').filter(line => line.trim().length > 0);
  const maxChars = Math.max(...lines.map(l => l.length));
  
  const charWidth = 60;
  const charHeight = 100;
  const width = maxChars * charWidth;
  const height = lines.length * charHeight;

  // Extract colors from gradient class (e.g., "from-[#C81D77] to-[#6710C2]")
  const fromMatch = gradient.match(/from-\[([^\]]+)\]/);
  const toMatch = gradient.match(/to-\[([^\]]+)\]/);
  const fromColor = fromMatch ? fromMatch[1] : '#7B61FF';
  const toColor = toMatch ? toMatch[1] : '#00E5FF';
  
  // Generate a unique ID for the gradient
  const gradId = `grad-${fromColor.replace('#', '')}-${toColor.replace('#', '')}`;

  return (
    <div className={`w-full flex justify-center ${fixedHeight ? 'overflow-x-auto hide-scrollbar' : ''} ${className}`}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className={fixedHeight ? "h-16 sm:h-20 md:h-28 lg:h-36 w-auto max-w-none shrink-0" : "w-full h-auto max-w-full"}
        style={{ filter: dropShadow ? 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' : 'none' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <text 
          fontFamily="'JetBrains Mono', monospace" 
          fontSize="100" 
          fontWeight="bold" 
          fill={`url(#${gradId})`}
          xmlSpace="preserve"
        >
          {lines.map((line, i) => (
            <tspan x="0" y={(i + 0.8) * charHeight} key={i}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
};
