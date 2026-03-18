import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DOSSIER_DATA = [
  { id: '01', label: 'SUBJECT_NAME', value: 'KESHAV RAJ MAIYA' },
  { id: '02', label: 'DESIGNATION', value: 'BACKEND ENGINEER // ML PRACTITIONER' },
  { id: '03', label: 'CURRENT_LOC', value: 'PUNJAB, IN' },
  { id: '04', label: 'ORIGIN_POINT', value: 'DARJEELING, IN' },
  { id: '05', label: 'AFFILIATION', value: 'LPU (B.TECH CSE, YR 2)' },
  { id: '06', label: 'METRIC_CGPA', value: '8.55', highlight: true },
  { id: '07', label: 'CURRENT_OBJ', value: 'MAKING THINGS, BREAKING THINGS, LEARNING EVERYTHING IN BETWEEN.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !panelRef.current) return;

    gsap.fromTo(panelRef.current, 
      { 
        y: 50, 
        opacity: 0,
        rotationX: 10,
        transformPerspective: 1000
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          onEnter: () => {
            setVisibleLines(prev => prev === 0 ? 1 : prev);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (visibleLines === 0 || visibleLines > DOSSIER_DATA.length) return;

    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, 150); // Snappy data stream

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] z-0"
           style={{ backgroundImage: 'linear-gradient(#7B61FF 1px, transparent 1px), linear-gradient(90deg, #7B61FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-5xl z-10">
        <div className="font-header text-[#7B61FF] text-xl mb-6 opacity-50 pl-4 md:pl-0 flex items-center gap-4">
          <span>02 // ABOUT</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#7B61FF]/50 to-transparent"></div>
        </div>

        {/* Dossier Panel */}
        <div 
          ref={panelRef}
          className="relative w-full bg-[#050505] border border-[#222] p-1 shadow-[0_0_50px_rgba(123,97,255,0.03)]"
        >
          <div className="relative border border-[#1A1A1A] bg-[#0A0A0A] p-6 md:p-10 overflow-hidden">
            
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#7B61FF]/70"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7B61FF]/70"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#7B61FF]/70"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7B61FF]/70"></div>

            {/* Top Bar */}
            <div className="flex justify-between items-center mb-10 border-b border-[#222] pb-4">
              <div className="flex items-center gap-3 md:gap-6">
                <div className="px-3 py-1 bg-[#7B61FF] text-[#050505] text-xs font-bold tracking-widest">DOSSIER</div>
                <div className="text-[#888] text-xs tracking-widest font-mono hidden md:block">ID: KRM-001</div>
                <div className="text-[#444] text-xs tracking-widest font-mono">CLASS: CLASSIFIED</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#FF5F56] text-xs tracking-widest animate-pulse">● REC</div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 md:gap-16">
              
              {/* Left Column: Visual / Biometric */}
              <div className="relative w-full aspect-square max-w-[300px] mx-auto lg:mx-0 border border-[#222] bg-[#050505] flex items-center justify-center overflow-hidden group">
                {/* Concentric circles */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-[#7B61FF]/10"></div>
                <div className="absolute w-[60%] h-[60%] rounded-full border border-[#7B61FF]/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute w-[40%] h-[40%] rounded-full border border-[#7B61FF]/50"></div>
                
                {/* Crosshairs */}
                <div className="absolute w-full h-[1px] bg-[#7B61FF]/20"></div>
                <div className="absolute h-full w-[1px] bg-[#7B61FF]/20"></div>
                
                {/* Center dot */}
                <div className="absolute w-2 h-2 bg-[#FF5F56] rounded-full animate-pulse shadow-[0_0_10px_#FF5F56]"></div>
                
                {/* Scanning line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#7B61FF]/50 shadow-[0_0_15px_#7B61FF] animate-scanline"></div>

                {/* Data Overlay */}
                <div className="absolute bottom-2 left-2 text-[#444] text-[8px] font-mono leading-tight">
                  SYS.VER.4.9.2<br/>
                  BIO_SYNC: OK<br/>
                  UPLINK: ESTABLISHED
                </div>
                <div className="absolute top-2 right-2 text-[#7B61FF]/50 text-[8px] font-mono text-right">
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}<br/>
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
              </div>

              {/* Right Column: Data Stream */}
              <div className="flex flex-col gap-6 justify-center font-mono">
                {DOSSIER_DATA.map((row, i) => (
                  <div 
                    key={row.id} 
                    className={`grid grid-cols-[30px_100px_1fr] md:grid-cols-[40px_140px_1fr] gap-2 md:gap-4 items-start transition-all duration-200 ${
                      visibleLines > i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <div className="text-[#444] text-[10px] md:text-xs mt-1">{row.id}</div>
                    <div className="text-[#888] text-[10px] md:text-xs tracking-wider mt-1">{row.label}</div>
                    <div className={`text-sm md:text-base leading-relaxed ${row.highlight ? 'text-[#7B61FF] font-bold drop-shadow-[0_0_8px_rgba(123,97,255,0.4)]' : 'text-[#F0F0F0]'}`}>
                      {row.value}
                    </div>
                  </div>
                ))}

                {/* Blinking Cursor at the end */}
                <div className={`grid grid-cols-[30px_100px_1fr] md:grid-cols-[40px_140px_1fr] gap-2 md:gap-4 items-start transition-opacity duration-200 ${
                  visibleLines > DOSSIER_DATA.length ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div></div>
                  <div></div>
                  <div className="w-3 h-5 bg-[#7B61FF] animate-pulse mt-1"></div>
                </div>
              </div>

            </div>

            {/* Bottom Bar / Barcode */}
            <div className="mt-12 pt-4 border-t border-[#222] flex justify-between items-end">
              <div className="text-[#444] text-[8px] md:text-[10px] font-mono max-w-xs">
                WARNING: UNAUTHORIZED ACCESS TO THIS DOSSIER IS STRICTLY PROHIBITED AND WILL BE LOGGED.
              </div>
              <div className="flex gap-[2px] h-6 opacity-50">
                {/* CSS Barcode */}
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="bg-[#888] h-full" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
