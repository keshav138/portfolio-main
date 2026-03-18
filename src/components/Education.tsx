import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    asciiScore: ` █████╗      ███████╗ ███████╗
██╔══██╗     ██╔════╝ ██╔════╝
╚█████╔╝ ██╗ ███████╗ ███████╗
██╔══██╗ ╚═╝ ╚════██║ ╚════██║
╚█████╔╝ ██╗ ███████║ ███████║
 ╚════╝  ╚═╝ ╚══════╝ ╚══════╝`
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
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    rowsRef.current.forEach((row, index) => {
      if (!row) return;
      
      const asciiWrapper = row.querySelector('.floating-mark');
      const content = row.querySelector('.content-container');
      const blinker = row.querySelector('.blinking-label');

      gsap.set(asciiWrapper, { 
        opacity: 0, 
        scale: 0.8, 
        rotationX: 15, 
        rotationY: index % 2 === 0 ? 15 : -15 
      });
      gsap.set(content, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 75%',
        }
      });

      tl.to(asciiWrapper, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          // Continuous 3D floating animation
          gsap.to(asciiWrapper, {
            y: "-=15",
            x: index % 2 === 0 ? "+=10" : "-=10",
            rotationX: 5,
            rotationY: index % 2 === 0 ? -5 : 5,
            rotationZ: index % 2 === 0 ? 2 : -2,
            duration: 3 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
          
          // Consistent steady blinking animation
          if (blinker) {
            gsap.to(blinker, {
              opacity: 0,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "steps(1)"
            });
          }
        }
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, "-=0.6");
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col pt-24 pb-12 overflow-hidden">
      <div className="absolute top-8 left-8 font-header text-[#7B61FF] text-xl opacity-50 z-10">
        06 // EDUCATION_LOG
      </div>

      <div className="w-full flex flex-col border-t border-[#222] mt-12">
        {EDUCATION_DATA.map((edu, index) => {
          const isEven = index % 2 !== 0;

          return (
            <div 
              key={edu.id}
              ref={el => rowsRef.current[index] = el}
              className="flex flex-col lg:flex-row border-b border-[#222] relative group min-h-[500px]"
            >
              {/* ASCII Pane */}
              <div 
                className={`ascii-container w-full lg:w-1/2 p-12 md:p-24 flex items-center justify-center border-b lg:border-b-0 border-[#222] relative z-10 ${isEven ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}
                style={{ perspective: '1000px' }}
              >
                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden"></div>
                
                <div className="floating-mark relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <pre 
                    className={`relative z-10 font-mono text-[10px] sm:text-[14px] md:text-[20px] xl:text-[28px] leading-[1.1] font-bold bg-clip-text text-transparent bg-gradient-to-br ${edu.gradient}`}
                  >
                    {edu.asciiScore}
                  </pre>
                  {/* Glow behind ASCII to avoid filter issues on the text itself */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-20 blur-2xl -z-10`}
                  ></div>

                  <div 
                    className={`blinking-label absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 font-pixel text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-br ${edu.gradient}`}
                    style={{ 
                      transform: 'translateZ(30px)'
                    }}
                  >
                    {edu.shortLabel}
                  </div>
                </div>
              </div>

              {/* Content Pane */}
              <div className={`content-container w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden z-10 ${isEven ? 'lg:order-1' : ''}`}>
                {/* Background Watermark Number */}
                <div className="absolute -right-10 -bottom-10 text-[150px] md:text-[250px] font-header font-bold text-[#111] select-none z-0 transition-transform duration-700 group-hover:scale-110">
                  {edu.id}
                </div>

                <div className="z-10 relative">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <span className="font-mono text-xs text-[#888] tracking-widest uppercase border border-[#333] px-4 py-1.5 rounded-full">
                      {edu.timeline}
                    </span>
                    <span className="font-mono text-xs text-[#888] tracking-widest uppercase">
                      // {edu.type}
                    </span>
                  </div>

                  <h3 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#F0F0F0] mb-6 leading-[0.85] tracking-tight uppercase">
                    {edu.institution}
                  </h3>

                  <div className="mb-8 flex">
                    <span className="font-mono text-xs text-[#888] tracking-widest uppercase border border-[#333] px-4 py-1.5 rounded-full">
                      {edu.degree}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
