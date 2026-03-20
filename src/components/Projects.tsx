import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { F1Art, TaskMasterArt, SuperstoreArt, IPLArt } from './AsciiArt';

gsap.registerPlugin(ScrollTrigger);

const GithubButton = ({ color, link }: { color: string, link: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-2 items-center rounded-full font-extrabold px-5 py-3 text-sm transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
      style={{
        backgroundColor: isHovered ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.4)',
        color: isHovered ? color : '#fff',
        boxShadow: isHovered
          ? `inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 0 0 1px ${color}40`
          : `inset 0 1px 0 0 rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)`,
        transform: isHovered ? 'translateY(-0.25rem)' : 'none'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z" fill="currentColor"></path>
      </svg>
      <span>View on Github</span>
    </a>
  );
};

const PROJECTS_ASCII = `
██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝
`;

const PROJECTS = [
  {
    id: '01',
    date: 'MAR 2026',
    title: 'TASKMASTER',
    gradient: 'from-[#00AAFF] to-[#00E5FF]',
    color: '#00AAFF',
    asciiTitle: `████████╗ █████╗ ███████╗██╗  ██╗███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ 
╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
   ██║   ███████║███████╗█████╔╝ ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝
   ██║   ██╔══██║╚════██║██╔═██╗ ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗
   ██║   ██║  ██║███████║██║  ██╗██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`,
    subtitle: 'Real-Time Task Management Platform',
    terminal: [
      'keshav@dev:~/taskmaster $',
      '> ./run_server.sh',
      '✓ Django loaded',
      '✓ Channels ready',
      '✓ Redis connected',
      '✓ Server running on :8000'
    ],
    bullets: [
      'REST API with 35+ endpoints - JWT auth + custom permissions',
      'WebSocket infrastructure via Django Channels + Redis',
      'PostgreSQL schema (7 tables) with indexing + query optimisation',
      'Containerised on Azure Cloud - <200ms response times'
    ],
    tech: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker', 'Azure', 'Nginx'],
    link: '[ GitHub ↗ ]',
  },
  {
    id: '02',
    date: 'JAN 2026',
    title: 'F1 ANALYTICS',
    gradient: 'from-[#FF2060] to-[#FFAA00]',
    color: '#FF6010',
    asciiTitle: `███████╗██╗    █████╗ ███╗   ██╗ █████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███████╗
██╔════╝███╗  ██╔══██╗████╗  ██║██╔══██╗██║     ╚██╗ ██╔╝╚══██╔══╝██║██╔════╝ ██╔════╝
█████╗  ╚██║  ███████║██╔██╗ ██║███████║██║      ╚████╔╝    ██║   ██║██║      ███████╗
██╔══╝   ██║  ██╔══██║██║╚██╗██║██╔══██║██║       ╚██╔╝     ██║   ██║██║      ╚════██║
██║      ██║  ██║  ██║██║ ╚████║██║  ██║███████╗   ██║      ██║   ██║╚██████╗ ███████║
╚═╝      ╚═╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝   ╚═╝      ╚═╝   ╚═╝ ╚═════╝ ╚══════╝`,
    subtitle: 'Telemetry & Race Strategy Predictor',
    terminal: [
      'keshav@dev:~/f1-analytics $',
      '> python pipeline.py',
      '✓ Telemetry data fetched',
      '✓ Models loaded',
      '✓ Predictions generated',
      '✓ Dashboard updated'
    ],
    bullets: [
      'Telemetry data analysis pipeline using FastF1',
      'Race strategy prediction models via Scikit-Learn',
      'Tire degradation forecasting with Pandas',
      'Interactive visualisations for race engineers'
    ],
    tech: ['Python', 'FastF1', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    link: '[ GitHub ↗ ]',
  },
  {
    id: '03',
    date: 'NOV 2025',
    title: 'SUPERSTORE',
    gradient: 'from-[#C06010] to-[#F0A030]',
    color: '#F0A030',
    asciiTitle: `███████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗████████╗██████╗ ██████╗ ███████╗
██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
███████╗██║   ██║██████╔╝█████╗  ██████╔╝███████╗   ██║   ██║  ██║██████╔╝█████╗  
╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║   ██║   ██║  ██║██╔══██╗██╔══╝  
███████║╚██████╔╝██║     ███████╗██║  ██║███████║   ██║   ██████╔╝██║  ██║███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚══════╝`,
    subtitle: 'Enterprise Sales Analytics Dashboard',
    terminal: [
      'keshav@dev:~/superstore $',
      '> refresh_data.bat',
      '✓ SQL Server connected',
      '✓ DAX measures calculated',
      '✓ Profitability heatmaps updated',
      '✓ Report published'
    ],
    bullets: [
      'Enterprise sales analytics using PowerBI',
      'Profitability heatmaps and regional breakdowns',
      'Year-over-year growth tracking with DAX',
      'Automated data refresh pipelines via SQL'
    ],
    tech: ['PowerBI', 'DAX', 'SQL', 'Excel'],
    link: '[ GitHub ↗ ]',
  },
  {
    id: '04',
    date: 'SEP 2025',
    title: 'IPL DASHBOARD',
    gradient: 'from-[#0288D1] to-[#FFD600]',
    color: '#4FC3F7',
    asciiTitle: `██╗██████╗ ██╗     ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
██║██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
██║██████╔╝██║     ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
██║██╔═══╝ ██║     ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
██║██║     ███████╗██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
╚═╝╚═╝     ╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ `,
    subtitle: 'Cricket Match Analysis Platform',
    terminal: [
      'keshav@dev:~/ipl-dashboard $',
      '> scrapy crawl matches',
      '✓ BeautifulSoup initialized',
      '✓ Historical data scraped',
      '✓ Win probability calculated',
      '✓ Tableau extract generated'
    ],
    bullets: [
      'Ball-by-ball match analysis and visualizations',
      'Player performance metrics and comparisons',
      'Team win probability models',
      'Web scraped historical data using BeautifulSoup'
    ],
    tech: ['Python', 'Tableau', 'BeautifulSoup', 'Pandas'],
    link: '[ GitHub ↗ ]',
  }
];

const getAsciiArt = (index: number) => {
  switch(index) {
    case 0: return <TaskMasterArt />;
    case 1: return <F1Art />;
    case 2: return <SuperstoreArt />;
    case 3: return <IPLArt />;
    default: return null;
  }
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const isAnimatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current || !progressRef.current) return;

    const sections = gsap.utils.toArray('.project-card');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (sections.length - 1));
          setActiveIndex(index);
        },
        end: () => "+=" + scrollWrapperRef.current!.offsetWidth
      }
    });

    stRef.current = tl.scrollTrigger || null;

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none"
    });

    // Animate elements on each card
    sections.forEach((section) => {
      const elements = (section as HTMLElement).querySelectorAll('.animate-in');
      if (elements.length === 0) return;
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section as HTMLElement,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Progress bar animation
    gsap.to(progressRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        start: 'top top',
        end: () => "+=" + scrollWrapperRef.current!.offsetWidth
      }
    });

    let titleAnim: gsap.core.Tween | null = null;
    if (titleRef.current) {
      titleAnim = gsap.to(titleRef.current, {
        y: "+=15",
        rotationZ: 1,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    const titleAnim3D = gsap.to('.project-title-3d', {
      y: -15,
      rotationX: 10,
      rotationY: -10,
      z: 50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    return () => {
      tl.kill();
      if (titleAnim) titleAnim.kill();
      titleAnim3D.kill();
    };
  }, []);

  const handlePageNav = (index: number) => {
    if (isAnimatingRef.current) return;
    const st = stRef.current;
    if (!st) return;

    const totalSections = PROJECTS.length + 1;
    const start = st.start;
    const end = st.end;
    const distance = end - start;
    const sectionHeight = distance / (totalSections - 1);

    const targetScroll = start + (index * sectionHeight);
    
    isAnimatingRef.current = true;
    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: targetScroll,
      duration: 0.8,
      ease: "power3.inOut",
      onUpdate: () => window.scrollTo(0, scrollObj.y),
      onComplete: () => { isAnimatingRef.current = false; }
    });
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Dynamic Blinking Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Designer Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
               backgroundSize: '32px 32px'
             }}
        />
        {/* Glowing Orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[120px] animate-[pulse_8s_infinite]" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[120px] animate-[pulse_10s_infinite_2s]" />
        </div>
      </div>

      {/* Navigation Pages */}
      <div className="absolute bottom-12 right-12 flex gap-4 md:gap-6 z-50 items-center">
        {[0, 1, 2, 3, 4].map((i) => {
          const isActive = activeIndex === i;
          const pageColor = i > 0 ? PROJECTS[i - 1].color : '#7B61FF';
          return (
            <button 
              key={i}
              onClick={() => handlePageNav(i)}
              className={`font-header text-lg md:text-xl transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-[#666] hover:text-[#AAA]'}`}
              style={{ color: isActive ? pageColor : undefined }}
              aria-label={`Go to page ${i + 1}`}
            >
              {isActive ? `[ ${i === 0 ? '0' : i} ]` : (i === 0 ? '0' : i)}
            </button>
          );
        })}
      </div>

      <div ref={scrollWrapperRef} className="flex h-full relative z-10" style={{ width: `${(PROJECTS.length + 1) * 100}vw` }}>
        
        {/* First Slide - ASCII Title */}
        <div className="project-card relative w-screen h-full flex items-center justify-center px-8 overflow-hidden">
          {/* Subtle boundary line */}
          <div className="absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none z-20" />
          
          {/* Concentric ASCII Rings behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
            <svg viewBox="0 0 1000 1000" className="w-[150vmin] h-[150vmin]">
              <defs>
                <path id="proj-ring1" d="M 500, 500 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                <path id="proj-ring2" d="M 500, 500 m -250, 0 a 250,250 0 1,1 500,0 a 250,250 0 1,1 -500,0" />
                <path id="proj-ring3" d="M 500, 500 m -350, 0 a 350,350 0 1,1 700,0 a 350,350 0 1,1 -700,0" />
                <path id="proj-ring4" d="M 500, 500 m -450, 0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0" />
              </defs>
              <g className="origin-center animate-[spin_40s_linear_infinite]">
                <text className="font-mono text-xs fill-[#F0F0F0] tracking-widest"><textPath href="#proj-ring1" startOffset="0%">01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101</textPath></text>
              </g>
              <g className="origin-center animate-[spin_50s_linear_infinite_reverse]">
                <text className="font-mono text-sm fill-[#F0F0F0] tracking-widest"><textPath href="#proj-ring2" startOffset="0%">SYSTEM.EXECUTE() // INITIATE_SEQUENCE // SYSTEM.EXECUTE() // INITIATE_SEQUENCE // SYSTEM.EXECUTE() // INITIATE_SEQUENCE //</textPath></text>
              </g>
              <g className="origin-center animate-[spin_60s_linear_infinite]">
                <text className="font-mono text-[10px] fill-[#F0F0F0] tracking-[0.2em]"><textPath href="#proj-ring3" startOffset="0%">*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!</textPath></text>
              </g>
              <g className="origin-center animate-[spin_70s_linear_infinite_reverse]">
                <text className="font-mono text-sm fill-[#F0F0F0] tracking-widest"><textPath href="#proj-ring4" startOffset="0%">DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_</textPath></text>
              </g>
            </svg>
          </div>

          <div ref={titleRef} className="relative z-10 flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            <pre className="relative z-10 font-mono text-[8px] sm:text-[10px] md:text-sm leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C81D77] to-[#6710C2] text-center drop-shadow-[0_0_20px_rgba(200,29,119,0.4)]">
              {PROJECTS_ASCII}
            </pre>
            
            {/* Cheeky Text Badges */}
            <div 
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 font-pixel text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] animate-pulse" 
              style={{ transform: 'translateZ(30px)' }}
            >
              BUGS
            </div>
            <div 
              className="absolute -top-4 -left-4 md:-top-8 md:-left-8 font-pixel text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-br from-[#FF0055] to-[#FFAA00] animate-pulse" 
              style={{ transform: 'translateZ(30px)', animationDelay: '0.5s' }}
            >
              COFFEE
            </div>
          </div>
        </div>

        {PROJECTS.map((project, index) => (
          <div key={index} className="project-card relative w-screen h-full flex flex-col items-center justify-center px-8 md:px-24 pt-20">
            {/* Subtle boundary line (except for the last project) */}
            {index < PROJECTS.length - 1 && (
              <div className="absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none z-20" />
            )}
            <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-center">
              
              {/* TOP: Centered Title + Date */}
              <div className="flex flex-col items-center relative mb-8 w-full" style={{ perspective: '1000px' }}>
                <div className="relative animate-in flex items-center justify-center project-title-3d" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Date (Top Right, above topic) */}
                  <div className="absolute -top-6 right-0 md:-top-8 md:-right-4 font-mono text-[10px] md:text-sm text-[#AAA] tracking-widest" style={{ transform: 'translateZ(20px)' }}>
                    {project.date}
                  </div>

                  <div className="flex items-center justify-center gap-3 md:gap-6" style={{ transformStyle: 'preserve-3d' }}>
                    {/* ASCII Theme Dot */}
                    <div style={{ transformStyle: 'preserve-3d' }}>
                      <div className="hidden md:block">
                        <pre className={`font-mono text-[8px] lg:text-[12px] leading-[1.1] font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                          {` \n \n \n \n██╗\n╚═╝`}
                        </pre>
                      </div>
                      <div className="md:hidden text-center">
                        <span className={`font-header text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                          ■
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div style={{ transformStyle: 'preserve-3d' }}>
                      <div className="hidden md:block">
                        <pre className={`font-mono text-[8px] lg:text-[12px] leading-[1.1] font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                          {project.asciiTitle}
                        </pre>
                      </div>
                      <div className="md:hidden text-center">
                        <h2 className={`font-header text-4xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                          {project.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtitle */}
                <div className="animate-in mt-6 font-mono text-sm md:text-lg text-[#E0E0E0] text-center">
                  {project.subtitle}
                </div>
              </div>

              {/* MIDDLE: Tech Stack */}
              <div className="animate-in flex flex-wrap justify-center gap-3 mb-12">
                {project.tech.map((t, i) => (
                  <span key={i} className="border border-[#333] px-4 py-1.5 font-mono text-xs md:text-sm text-[#AAA] bg-[#111]">
                    {t}
                  </span>
                ))}
              </div>

              {/* BOTTOM: Split Left (Desc) / Right (ASCII) */}
              <div className="flex flex-col md:flex-row w-full justify-between items-center gap-12">
                
                {/* Left: Description */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                  <ul className="animate-in space-y-4 mb-8">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 font-mono text-xs md:text-base text-white">
                        <span className="text-[#7B61FF] mt-0.5">.</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="animate-in">
                    <GithubButton color={project.color} link={project.link} />
                  </div>
                </div>

                {/* Right: ASCII Art */}
                <div className="hidden md:flex w-full md:w-1/2 justify-center items-center select-none">
                  {getAsciiArt(index)}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-[#161616]">
        <div ref={progressRef} className="h-full bg-[#7B61FF] w-0" />
      </div>
    </section>
  );
}
