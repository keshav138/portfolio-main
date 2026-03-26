export const ScaledAscii = ({ ascii, gradient, className = "", dropShadow = false, fixedHeight = false }: { ascii: string, gradient: string, className?: string, dropShadow?: boolean, fixedHeight?: boolean }) => {
  // Preserve empty lines in the middle, but trim start/end to get accurate line count
  const rawLines = ascii.replace(/^\n+|\n+$/g, '').split('\n');
  
  // Find common leading whitespace to "tighten" the block
  const leadingSpaces = rawLines
    .filter(line => line.trim().length > 0)
    .map(line => line.match(/^\s*/)?.[0].length || 0);
  const minLeading = leadingSpaces.length > 0 ? Math.min(...leadingSpaces) : 0;
  
  const processedLines = rawLines.map(line => line.slice(minLeading).trimEnd());
  const maxChars = Math.max(...processedLines.map(l => l.length));
  
  // Padded lines for perfect centering with text-anchor="middle"
  // This ensures vertical alignment of characters across lines
  const lines = processedLines.map(line => line.padEnd(maxChars, ' '));

  // Use a more accurate charWidth for JetBrains Mono (approx 0.6 * fontSize)
  const charWidth = 65;
  const charHeight = 100;
  
  // Calculate width with more breathing room (100 units on each side)
  const width = maxChars * charWidth + 200;
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
    <div className={`overflow-visible ${className} ${fixedHeight ? 'w-full md:w-fit mx-auto' : 'w-full'}`}>
      <div className={`flex items-center ${isLeftAligned ? 'justify-start' : 'justify-center'} w-full`}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className={`${fixedHeight ? "w-full h-auto md:h-20 lg:h-24 md:w-auto" : "w-full max-w-full h-auto"} flex-shrink-0 overflow-visible`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
            {/* Native SVG drop shadow to prevent CSS filter bounding box artifacts */}
            {dropShadow && (
              <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.1" />
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
                x={isLeftAligned ? "100" : width / 2} 
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
