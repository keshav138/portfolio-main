import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_MODULES = [
  { id: '01', title: 'LANGUAGES', span: 'col-span-1', items: ['Python', 'C/C++', 'Java', 'SQL'] },
  { id: '02', title: 'WEB', span: 'col-span-1', items: ['Django', 'DRF', 'Django Channels'] },
  { id: '03', title: 'DATA', span: 'col-span-1', items: ['Pandas', 'NumPy', 'Matplotlib', 'FastF1'], primary: true },
  { id: '04', title: 'ML / AI', span: 'col-span-1 md:col-span-2', items: ['Scikit-learn', 'Regression', 'Clustering', 'Gradient Boosting'], primary: true },
  { id: '05', title: 'DATABASES', span: 'col-span-1', items: ['PostgreSQL', 'MySQL', 'Redis', 'DAX'] },
  { id: '06', title: 'INFRA', span: 'col-span-1', items: ['Docker', 'Nginx', 'Azure Cloud'] },
  { id: '07', title: 'TOOLS', span: 'col-span-1 md:col-span-2', items: ['Git', 'VS Code', 'PowerBI', 'Postman', 'Excel'] },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current;
    gsap.set(cards, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        });
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-0"
           style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col items-center mt-16 md:mt-0">
        
        {/* Section Header */}
        <div className="font-header text-[#7B61FF] text-xl mb-8 md:mb-12 opacity-50 w-full flex items-center gap-4 pl-4 md:pl-0">
          <span>03 // CAPABILITY_MATRIX</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#7B61FF]/50 to-transparent"></div>
        </div>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SKILL_MODULES.map((module, i) => (
            <div
              key={module.id}
              ref={el => cardsRef.current[i] = el}
              className={`group relative flex flex-col bg-[#0A0A0A] border transition-all duration-300 hover:-translate-y-1 ${module.span} ${
                module.primary 
                  ? 'border-[#7B61FF]/40 hover:border-[#7B61FF] hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]' 
                  : 'border-[#1A1A1A] hover:border-[#444] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
              }`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Card Header */}
              <div className={`flex justify-between items-center p-4 border-b transition-colors duration-300 ${
                module.primary ? 'border-[#7B61FF]/20 group-hover:border-[#7B61FF]/50 bg-[#7B61FF]/[0.02]' : 'border-[#1A1A1A] group-hover:border-[#333] bg-[#0D0D0D]'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#555]">MOD_{module.id}</span>
                  <h3 className={`font-header text-sm md:text-base tracking-[0.15em] ${module.primary ? 'text-[#7B61FF]' : 'text-[#F0F0F0]'}`}>
                    {module.title}
                  </h3>
                </div>
                {module.primary ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#7B61FF] opacity-70 hidden sm:block">ACTIVE</span>
                    <div className="w-1.5 h-1.5 bg-[#7B61FF] rounded-full animate-pulse shadow-[0_0_5px_#7B61FF]"></div>
                  </div>
                ) : (
                  <div className="w-1.5 h-1.5 bg-[#333] rounded-full group-hover:bg-[#555] transition-colors"></div>
                )}
              </div>

              {/* Card Body (Skills) */}
              <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {module.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`px-3 py-1.5 font-mono text-xs border transition-all duration-300 ${
                        module.primary
                          ? 'border-[#7B61FF]/20 text-[#D0C4FF] bg-[#7B61FF]/5 group-hover:border-[#7B61FF]/50 group-hover:bg-[#7B61FF]/10'
                          : 'border-[#1A1A1A] text-[#888] bg-[#050505] group-hover:border-[#333] group-hover:text-[#E0E0E0]'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Footer */}
              <div className="px-4 py-2 border-t border-[#1A1A1A] bg-[#050505] flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${module.primary ? 'bg-[#7B61FF]' : 'bg-[#444]'}`}></div>
                  ))}
                </div>
                <span className="font-mono text-[8px] text-[#555]">SYS.OK</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
