export const ScaledAscii = ({ ascii, gradient, className = "", dropShadow = false, fixedHeight = false }: { ascii: string, gradient: string, className?: string, dropShadow?: boolean, fixedHeight?: boolean }) => {
  // Preserve empty lines in the middle, but trim start/end to get accurate line count
  const rawLines = ascii.replace(/^\n+|\n+$/g, '').split('\n');
  
  // Find common leading whitespace to "tighten" the block
  const leadingSpaces = rawLines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^\s*/)?.[0].length || 0);
  const minLeading = leadingSpaces.length > 0 ? Math.min(...leadingSpaces) : 0;
  
  const processedLines = rawLines.map(line => line.slice(minLeading));
  const maxChars = Math.max(...processedLines.map(l => l.length));
  
  // Padded lines for perfect centering with text-anchor="middle"
  // This ensures vertical alignment of characters across lines
  const lines = processedLines.map(line => line.padEnd(maxChars, ' '));

  // Use a more accurate charWidth for JetBrains Mono (approx 0.6 * fontSize)
  const charWidth = 60;
  const charHeight = 100;
  
  // Calculate width with minimal padding (60 units on each side)
  const width = maxChars * charWidth + 120;
  const height = lines.length * charHeight + 40;

  // Extract colors from gradient class (e.g., "from-[#C81D77] to-[#6710C2]")
  const fromMatch = gradient.match(/from-\[([^\]]+)\]/);
  const toMatch = gradient.match(/to-\[([^\]]+)\]/);
  const fromColor = fromMatch ? fromMatch[1] : '#7B61FF';
  const toColor = toMatch ? toMatch[1] : '#00E5FF';
  
  // Generate a unique ID for the gradient and filter
  const gradId = `grad-${fromColor.replace('#', '')}-${toColor.replace('#', '')}`;
  const filterId = `glow-${gradId}`;

  const isLeftAligned = className.includes('md:justify-start');

  return (
    <div className={`overflow-x-auto hide-scrollbar ${className} ${fixedHeight ? 'w-fit mx-auto' : 'w-full'}`}>
      <div className={`flex items-center ${isLeftAligned ? 'justify-start' : 'justify-center'} min-w-full`}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className={`${fixedHeight ? "h-12 sm:h-16 md:h-20 lg:h-24 w-auto" : "w-full max-w-full h-auto"} flex-shrink-0`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
            {/* Native SVG drop shadow to prevent CSS filter bounding box artifacts */}
            {dropShadow && (
              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#ffffff" floodOpacity="0.15" />
              </filter>
            )}
          </defs>
          <text 
            fontFamily="'JetBrains Mono', monospace" 
            fontSize="100" 
            fontWeight="bold" 
            fill={`url(#${gradId})`}
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            filter={dropShadow ? `url(#${filterId})` : 'none'}
            textAnchor={isLeftAligned ? 'start' : 'middle'}
          >
            {lines.map((line, i) => (
              <tspan 
                x={isLeftAligned ? "60" : width / 2} 
                y={(i + 0.8) * charHeight + 20} 
                key={i}
              >
                {line}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
};
