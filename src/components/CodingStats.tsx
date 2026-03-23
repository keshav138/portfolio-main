import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScaledAscii } from './ScaledAscii';

gsap.registerPlugin(ScrollTrigger);

const STATS_ASCII = `███████╗████████╗ █████╗ ████████╗███████╗
██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
███████╗   ██║   ███████║   ██║   ███████╗
╚════██║   ██║   ██╔══██║   ██║   ╚════██║
███████║   ██║   ██║  ██║   ██║   ███████║
╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ■`;

const CODING_DATA = [
  {
    id: '01',
    type: 'ALL PLATFORMS',
    platform: 'TOTAL SOLVED',
    count: '400+',
    gradient: 'from-[#00E5FF] to-[#0077FF]',
    color: '#00E5FF',
    asciiScore: `██╗  ██╗ ██████╗  ██████╗     ██╗    
██║  ██║██╔═══██╗██╔═══██╗  ██████╗  
███████║██║   ██║██║   ██║  ╚═██╔═╝  
╚════██║██║   ██║██║   ██║  ██████╗  
     ██║╚██████╔╝╚██████╔╝  ╚═██╔═╝  
     ╚═╝ ╚═════╝  ╚═════╝     ╚═╝    `
  },
  {
    id: '02',
    type: 'ALGORITHMS',
    platform: 'LEETCODE',
    count: '200+',
    gradient: 'from-[#FFAA00] to-[#FF0055]',
    color: '#FFAA00',
    asciiScore: `██████╗  ██████╗  ██████╗     ██╗    
╚════██╗██╔═══██╗██╔═══██╗  ██████╗  
 █████╔╝██║   ██║██║   ██║  ╚═██╔═╝  
██╔═══╝ ██║   ██║██║   ██║  ██████╗  
███████╗╚██████╔╝╚██████╔╝  ╚═██╔═╝  
╚══════╝ ╚═════╝  ╚═════╝     ╚═╝    `
  },
  {
    id: '03',
    type: 'PROBLEM SOLVING',
    platform: 'GEEKSFORGEEKS',
    count: '100+',
    gradient: 'from-[#00FF88] to-[#0088FF]',
    color: '#00FF88',
    asciiScore: ` ██╗ ██████╗  ██████╗     ██╗    
███║██╔═══██╗██╔═══██╗  ██████╗  
╚██║██║   ██║██║   ██║  ╚═██╔═╝  
 ██║██║   ██║██║   ██║  ██████╗  
 ██║╚██████╔╝╚██████╔╝  ╚═██╔═╝  
 ╚═╝ ╚═════╝  ╚═════╝     ╚═╝    `
  }
];

export default function CodingStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      colsRef.current.forEach((col, index) => {
        if (!col) return;
        
        // Slide in the column itself
        const direction = (index === 0 || index === 2) ? -100 : 100;
        const delay = (index === 3) ? 0.15 : 0;
        
        gsap.fromTo(col,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: col,
              start: 'top 85%',
            }
          }
        );
        
        const elements = col.querySelectorAll('.animate-in');
        
        if (elements.length > 0) {
          gsap.fromTo(elements, 
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              delay: delay + 0.3, // Start after column starts sliding
              ease: 'power3.out',
              scrollTrigger: {
                trigger: col,
                start: 'top 85%',
              }
            }
          );
        }
        
        const asciiArt = col.querySelector('.ascii-art');
        if (asciiArt) {
          gsap.to(asciiArt, {
            y: "-=10",
            rotationZ: index % 2 === 0 ? 1 : -1,
            duration: 3 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A] border-y border-[#222] my-8 md:my-24 flex flex-col overflow-hidden">
      {/* Title Strip */}
      <div 
        ref={el => colsRef.current[0] = el}
        className="w-full p-6 lg:p-8 border-b border-[#222] flex flex-col md:flex-row justify-between relative group bg-[#050505] min-h-[200px] md:min-h-[300px]"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Title Strip Graph */}
        <div className="absolute inset-0 md:right-1/2 z-0 opacity-10 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-end">
          <svg className="w-full h-[60%]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad-title" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,100 L0,80 L20,85 L40,60 L60,70 L80,30 L100,40 L100,100 Z" 
              fill="url(#grad-title)" 
            />
            <path 
              d="M0,80 L20,85 L40,60 L60,70 L80,30 L100,40" 
              fill="none" 
              stroke="#00E5FF" 
              strokeWidth="1"
              className="animate-graph-line"
            />
          </svg>
        </div>

        {/* Top: ASCII Art */}
        <div className="flex justify-center md:justify-start items-center md:w-1/2 relative z-10 pt-4 md:pt-0">
          <div className="animate-in relative flex flex-col items-center md:items-start w-full">
            <div className="ascii-art w-full">
              <ScaledAscii ascii={STATS_ASCII} gradient="from-[#00E5FF] to-[#0077FF]" dropShadow={true} className="md:justify-start" fixedHeight={true} />
            </div>
          </div>
        </div>

        {/* Bottom: Details */}
        <div className="flex flex-col justify-end md:justify-center md:items-end pb-4 md:pb-0 relative z-10 mt-8 md:mt-0 md:w-1/2">
          <div className="animate-in font-mono text-[10px] lg:text-[12px] text-[#555] tracking-widest uppercase mb-3">
            // LOG_06
          </div>
          <span className="animate-in font-mono text-sm lg:text-base text-[#888] tracking-widest lowercase">
            coding stats
          </span>
        </div>
      </div>

      {/* Total Solved Strip */}
      <div 
        ref={el => colsRef.current[1] = el}
        className="w-full p-6 lg:p-8 border-b border-[#222] flex flex-col md:flex-row-reverse justify-between relative group bg-[#020202] hover:bg-[#080808] transition-colors duration-500 min-h-[300px] md:min-h-[400px] overflow-hidden"
      >
        {/* Subtle Rising Graph Animation */}
        <div className="absolute inset-0 md:left-1/2 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-end">
          <svg className="w-full h-[60%]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`grad-${CODING_DATA[0].id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CODING_DATA[0].color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={CODING_DATA[0].color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,100 L0,80 L20,85 L40,60 L60,70 L80,30 L100,40 L100,100 Z" 
              fill={`url(#grad-${CODING_DATA[0].id})`} 
            />
            <path 
              d="M0,80 L20,85 L40,60 L60,70 L80,30 L100,40" 
              fill="none" 
              stroke={CODING_DATA[0].color} 
              strokeWidth="1"
              className="animate-graph-line"
            />
          </svg>
        </div>

        {/* Background Watermark Number */}
        <div className="absolute -right-4 -bottom-4 text-[100px] lg:text-[150px] font-header font-bold text-[#1a1a1a] select-none z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
          {CODING_DATA[0].id}
        </div>

        {/* Top: ASCII Score */}
        <div className="flex justify-center items-center md:w-1/2 relative z-10 pt-4 md:pt-0">
          <div className="ascii-art relative flex flex-col items-center w-full" style={{ transformStyle: 'preserve-3d' }}>
            <ScaledAscii ascii={CODING_DATA[0].asciiScore} gradient={CODING_DATA[0].gradient} dropShadow={true} fixedHeight={true} />
            <div className={`mt-4 font-pixel text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-br ${CODING_DATA[0].gradient} animate-pulse`}>
              SOLVED
            </div>
          </div>
        </div>

        {/* Bottom: Details */}
        <div className="flex flex-col justify-end md:justify-center md:items-start pb-4 md:pb-0 relative z-10 mt-8 md:mt-0 md:w-1/2">
          <div className="animate-in flex flex-wrap gap-2 mb-4 md:justify-start">
            <span className="font-mono text-[10px] lg:text-[12px] text-[#888] tracking-widest uppercase border border-[#333] px-3 py-1.5 rounded-full bg-[#0A0A0A]">
              {CODING_DATA[0].type}
            </span>
          </div>
          <h3 className="animate-in font-display text-3xl lg:text-4xl xl:text-5xl text-[#F0F0F0] mb-3 leading-[0.9] uppercase tracking-tight md:text-left">
            {CODING_DATA[0].platform}
          </h3>
          <span className="animate-in font-mono text-sm lg:text-base text-[#AAA] md:text-left">
            {CODING_DATA[0].count} PROBLEMS SOLVED
          </span>
        </div>
      </div>

      {/* Leetcode & GFG Strip */}
      <div className="w-full flex flex-col md:flex-row border-b last:border-b-0 border-[#222]">
        {[CODING_DATA[1], CODING_DATA[2]].map((stat, i) => (
          <div 
            key={stat.id}
            ref={el => colsRef.current[i + 2] = el}
            className={`w-full md:w-1/2 p-6 lg:p-8 ${i === 0 ? 'border-b md:border-b-0 md:border-r' : ''} border-[#222] flex flex-col justify-between relative group bg-[#020202] hover:bg-[#080808] transition-colors duration-500 min-h-[300px] md:min-h-[400px] overflow-hidden`}
          >
            {/* Subtle Rising Graph Animation */}
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none overflow-hidden flex items-end">
              <svg className="w-full h-[60%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stat.color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={stat.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,100 L0,80 L20,85 L40,60 L60,70 L80,30 L100,40 L100,100 Z" 
                  fill={`url(#grad-${stat.id})`} 
                />
                <path 
                  d="M0,80 L20,85 L40,60 L60,70 L80,30 L100,40" 
                  fill="none" 
                  stroke={stat.color} 
                  strokeWidth="1"
                  className="animate-graph-line"
                />
              </svg>
            </div>

            {/* Background Watermark Number */}
            <div className="absolute -right-4 -bottom-4 text-[100px] lg:text-[150px] font-header font-bold text-[#1a1a1a] select-none z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
              {stat.id}
            </div>

            {/* Top: ASCII Score */}
            <div className="flex justify-center items-center h-1/2 relative z-10 pt-4">
              <div className="ascii-art relative flex flex-col items-center w-full" style={{ transformStyle: 'preserve-3d' }}>
                <ScaledAscii ascii={stat.asciiScore} gradient={stat.gradient} dropShadow={true} fixedHeight={true} />
                <div className={`mt-4 font-pixel text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br ${stat.gradient} animate-pulse`}>
                  SOLVED
                </div>
              </div>
            </div>

            {/* Bottom: Details */}
            <div className="flex flex-col justify-end pb-4 relative z-10 mt-8 md:mt-0 h-1/2">
              <div className="animate-in flex flex-wrap gap-2 mb-4">
                <span className="font-mono text-[10px] lg:text-[12px] text-[#888] tracking-widest uppercase border border-[#333] px-3 py-1.5 rounded-full bg-[#0A0A0A]">
                  {stat.type}
                </span>
              </div>
              <h3 className="animate-in font-display text-3xl lg:text-4xl xl:text-5xl text-[#F0F0F0] mb-3 leading-[0.9] uppercase tracking-tight">
                {stat.platform}
              </h3>
              <span className="animate-in font-mono text-sm lg:text-base text-[#AAA]">
                {stat.count} PROBLEMS SOLVED
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
