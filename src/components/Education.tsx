import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScaledAscii } from './ScaledAscii';

gsap.registerPlugin(ScrollTrigger);

const EDU_ASCII = `███████╗██████╗ ██╗   ██╗
██╔════╝██╔══██╗██║   ██║
█████╗  ██║  ██║██║   ██║
██╔══╝  ██║  ██║██║   ██║
███████╗██████╔╝╚██████╔╝
╚══════╝╚═════╝  ╚═════╝ ■`;

const EDUCATION_DATA = [
  {
    id: '01',
    type: 'UNIVERSITY',
    institution: 'Lovely Professional University',
    degree: 'B.Tech Computer Science',
    timeline: '2023 — 2027',
    shortLabel: 'CGPA',
    gradient: 'from-[#00E5FF] to-[#0077FF]',
    color: '#00E5FF',
    asciiScore: ` █████╗        ███████╗███████╗
██╔══██╗       ██╔════╝██╔════╝
╚█████╔╝       ███████╗███████╗
██╔══██╗   ██╗ ╚════██║╚════██║
╚█████╔╝   ╚═╝ ███████║███████║
 ╚════╝        ╚══════╝╚══════╝`
  },
  {
    id: '02',
    type: 'HIGH SCHOOL',
    institution: "St. Joseph's School",
    degree: 'Class XII (ISC Board)',
    timeline: '2021 — 2023',
    shortLabel: 'PERC',
    gradient: 'from-[#7B61FF] to-[#FF00FF]',
    color: '#7B61FF',
    asciiScore: ` █████╗  ██╗  ██╗ ██╗ ██╗
██╔══██╗ ██║  ██║ ╚═╝██╔╝
╚██████║ ███████║   ██╔╝ 
 ╚═══██║ ╚════██║  ██╔╝██╗
 █████╔╝      ██║ ██╔╝ ╚═╝
 ╚════╝       ╚═╝ ╚═╝     `
  },
  {
    id: '03',
    type: 'SECONDARY',
    institution: "St. Joseph's School",
    degree: 'Class X (ICSE Board)',
    timeline: '2019 — 2021',
    shortLabel: 'PERC',
    gradient: 'from-[#FF0055] to-[#FFAA00]',
    color: '#FF0055',
    asciiScore: ` █████╗  ██████╗  ██╗ ██╗
██╔══██╗ ╚════██╗ ╚═╝██╔╝
╚██████║  █████╔╝   ██╔╝ 
 ╚═══██║  ╚═══██╗  ██╔╝██╗
 █████╔╝ ██████╔╝ ██╔╝ ╚═╝
 ╚════╝  ╚═════╝  ╚═╝     `
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    colsRef.current.forEach((col, index) => {
      if (!col) return;
      
      // Slide in the column itself
      const direction = index === 0 ? -100 : 100;
      
      gsap.fromTo(col,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.15,
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
            delay: (index * 0.15) + 0.3, // Start after column starts sliding
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
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A] border-y border-[#222] my-12 md:my-24 flex flex-row overflow-x-auto snap-x snap-mandatory md:overflow-hidden min-h-[400px] md:min-h-[550px] hide-scrollbar">
      {/* Title Strip */}
      <div 
        ref={el => colsRef.current[0] = el}
        className="shrink-0 w-[85vw] sm:w-[45vw] md:w-1/4 snap-center p-6 lg:p-8 border-r border-[#222] flex flex-col justify-between relative group bg-[#050505] min-h-[400px] md:min-h-[550px]"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Top: ASCII Art */}
        <div className="flex justify-center items-center flex-1 relative z-10 pt-4">
          <div className="animate-in ascii-art relative flex flex-col items-center w-full">
            <ScaledAscii ascii={EDU_ASCII} gradient="from-[#C11E38] to-[#8A2387]" dropShadow={true} fixedHeight={true} />
          </div>
        </div>

        {/* Bottom: Details */}
        <div className="flex flex-col justify-end pb-0 relative z-10 mt-8 md:mt-0">
          <div className="animate-in font-mono text-[9px] lg:text-[10px] text-[#555] tracking-widest uppercase mb-3">
            // LOG_07
          </div>
          <span className="animate-in font-mono text-xs lg:text-sm text-[#888] tracking-widest lowercase">
            education
          </span>
        </div>
      </div>

      {/* Education Strips */}
      {EDUCATION_DATA.map((edu, index) => (
        <div 
          key={edu.id}
          ref={el => colsRef.current[index + 1] = el}
          className="shrink-0 w-[85vw] sm:w-[45vw] md:w-1/4 snap-center p-6 lg:p-8 border-r last:border-r-0 border-[#222] flex flex-col justify-between relative group hover:bg-[#111] transition-colors duration-500 min-h-[400px] md:min-h-[550px] overflow-hidden"
        >
          {/* Background Watermark Number */}
          <div className="absolute -right-4 -bottom-4 text-[100px] lg:text-[150px] font-header font-bold text-[#1a1a1a] select-none z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
            {edu.id}
          </div>

          {/* Top: ASCII Score */}
          <div className="flex justify-center items-center flex-1 relative z-10 pt-4">
            <div className="ascii-art relative w-full" style={{ transformStyle: 'preserve-3d' }}>
              <ScaledAscii ascii={edu.asciiScore} gradient={edu.gradient} dropShadow={true} fixedHeight={true} />
              <div className={`absolute -bottom-6 right-0 font-pixel text-xl bg-clip-text text-transparent bg-gradient-to-br ${edu.gradient} animate-pulse`}>
                {edu.shortLabel}
              </div>
            </div>
          </div>

          {/* Bottom: Details */}
          <div className="flex flex-col justify-end pb-0 relative z-10 mt-8 md:mt-0">
            <div className="animate-in flex flex-wrap gap-2 mb-4">
              <span className="font-mono text-[9px] lg:text-[10px] text-[#888] tracking-widest uppercase border border-[#333] px-2 py-1 rounded-full bg-[#0A0A0A]">
                {edu.timeline}
              </span>
              <span className="font-mono text-[9px] lg:text-[10px] text-[#666] tracking-widest uppercase py-1">
                // {edu.type}
              </span>
            </div>
            <h3 className="animate-in font-display text-2xl lg:text-3xl xl:text-4xl text-[#F0F0F0] mb-3 leading-[0.9] uppercase tracking-tight">
              {edu.institution}
            </h3>
            <span className="animate-in font-mono text-xs lg:text-sm text-[#AAA]">
              {edu.degree}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
