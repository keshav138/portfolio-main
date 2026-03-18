import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    date: 'MAR 2026',
    title: 'TASKMASTER',
    gradient: 'from-[#7B61FF] to-[#00E5FF]',
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
    gradient: 'from-[#FF0055] to-[#FFAA00]',
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
    gradient: 'from-[#0066FF] to-[#00FFCC]',
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
    gradient: 'from-[#FF00FF] to-[#7B61FF]',
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
  const arts = [
    // Taskmaster - Server/Network
    `
      :::    ::: ::::::::::: ::::::::  :::    ::: 
      :+:    :+:     :+:    :+:    :+: :+:    :+: 
      +:+    +:+     +:+    +:+        +:+    +:+ 
      +#++:++#++     +#+    :#:        +#++:++#++ 
      +#+    +#+     +#+    +#+   +#+# +#+    +#+ 
      #+#    #+#     #+#    #+#    #+# #+#    #+# 
      ###    ### ########### ########  ###    ### 

    [ SYSTEM ARCHITECTURE ]
    ==================================================
    [CLIENT] <--> [NGINX] <--> [DJANGO CHANNELS]
                                      |
                                  [REDIS]
                                      |
                                [POSTGRESQL]
    ==================================================
    >> ALL SYSTEMS NOMINAL
    >> LATENCY: 12ms
    `,
    // F1 Analytics - Data Waves
    `
       .::.      .::.      .::.      .::.
     .:::::.   .:::::.   .:::::.   .:::::.
    .:::::::. .:::::::. .:::::::. .:::::::.
    ::::::::: ::::::::: ::::::::: :::::::::
    ::::::::: ::::::::: ::::::::: :::::::::
    ':::::::' ':::::::' ':::::::' ':::::::'
      ':::'     ':::'     ':::'     ':::'
       ':'       ':'       ':'       ':'
    
    [ TELEMETRY STREAM ]
    ==================================================
    SPEED    : ████████████████████ 320 km/h
    THROTTLE : ███████████████████░ 95%
    BRAKE    : ██░░░░░░░░░░░░░░░░░░ 10%
    GEAR     : 8
    ==================================================
    >> PREDICTIVE MODEL: ACTIVE
    `,
    // Superstore - Bar Chart / Analytics
    `
    100% │                                ▄▄▄
     90% │                          ▄▄▄   ███
     80% │                    ▄▄▄   ███   ███
     70% │              ▄▄▄   ███   ███   ███
     60% │        ▄▄▄   ███   ███   ███   ███
     50% │  ▄▄▄   ███   ███   ███   ███   ███
     40% │  ███   ███   ███   ███   ███   ███
     30% │  ███   ███   ███   ███   ███   ███
     20% │  ███   ███   ███   ███   ███   ███
     10% │  ███   ███   ███   ███   ███   ███
      0% └────────────────────────────────────
           Q1    Q2    Q3    Q4    Q1    Q2

    [ SALES ANALYTICS ]
    ==================================================
    >> YOY GROWTH: +24.5%
    >> PROFIT MARGIN: 18.2%
    ==================================================
    `,
    // IPL - Hexagon / Network
    `
           / \\         / \\         / \\
         /     \\     /     \\     /     \\
       /         \\ /         \\ /         \\
      |           |           |           |
      |   NODE    |   NODE    |   NODE    |
      |    A      |    B      |    C      |
       \\         / \\         / \\         /
         \\     /     \\     /     \\     /
           \\ /         \\ /         \\ /
            |           |           |
            |   NODE    |   NODE    |
            |    D      |    E      |
             \\         / \\         /
               \\     /     \\     /
                 \\ /         \\ /

    [ MATCH PREDICTION ]
    ==================================================
    TEAM A WIN PROBABILITY: 65%
    TEAM B WIN PROBABILITY: 35%
    ==================================================
    >> MODEL ACCURACY: 89.4%
    `
  ];
  return arts[index % arts.length];
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current || !progressRef.current) return;

    const sections = gsap.utils.toArray('.project-card');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollWrapperRef.current!.offsetWidth
      }
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none"
    });

    // Animate elements on each card
    sections.forEach((section) => {
      const elements = (section as HTMLElement).querySelectorAll('.animate-in');
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* Concentric Circles Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] rounded-full border border-[#111] pointer-events-none z-0"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] rounded-full border border-[#111] pointer-events-none z-0"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] rounded-full border border-[#111] pointer-events-none z-0"></div>

      {/* Section Header */}
      <div className="absolute top-8 left-8 font-header text-[#7B61FF] text-xl opacity-50 z-20">
        04 // PROJECTS
      </div>

      <div ref={scrollWrapperRef} className="flex h-full w-[400vw] relative z-10">
        {PROJECTS.map((project, index) => (
          <div key={index} className="project-card w-screen h-full flex items-center px-8 md:px-24 pt-12 md:pt-20">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              
              {/* Left Side - Content */}
              <div className="w-full md:w-3/5 flex flex-col relative z-10">
                
                {/* Terminal Box */}
                <div className="animate-in border border-dashed border-[#7B61FF]/60 p-4 font-mono text-[10px] md:text-xs text-[#888] w-max mb-10 bg-[#050505]">
                  <div className="text-[#7B61FF] mb-1">{project.terminal[0]}</div>
                  <div className="mb-1">{project.terminal[1]}</div>
                  {project.terminal.slice(2).map((line, i) => (
                    <div key={i}>
                      <span className="text-[#7B61FF]">✓</span> {line.replace('✓ ', '')}
                    </div>
                  ))}
                </div>

                {/* Date */}
                <div className="animate-in font-mono text-[10px] text-[#555] mb-4 tracking-[0.2em] uppercase">
                  {project.date}
                </div>

                {/* Title & Floating Square */}
                <div className="animate-in relative w-full max-w-full overflow-visible">
                  <div className="hidden md:block">
                    <pre className={`font-mono text-[7px] lg:text-[10px] leading-[1.1] mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                      {project.asciiTitle}
                    </pre>
                  </div>
                  <div className="md:hidden">
                    <h2 className={`font-header text-5xl font-bold mb-4 tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`} style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))' }}>
                      {project.title}
                    </h2>
                  </div>
                  {/* Floating Square */}
                  <div className={`absolute top-0 -right-4 md:-right-12 w-3 h-3 bg-gradient-to-br ${project.gradient} animate-pulse`}></div>
                </div>

                {/* Subtitle */}
                <div className="animate-in font-mono text-xs md:text-sm text-[#888] mb-10">
                  {project.subtitle}
                </div>

                {/* Bullets */}
                <ul className="animate-in space-y-3 mb-10">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 font-mono text-[10px] md:text-xs text-[#AAA]">
                      <span className="text-[#7B61FF] mt-0.5">.</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="animate-in flex flex-wrap gap-3 mb-12">
                  {project.tech.map((t, i) => (
                    <span key={i} className="border border-[#222] px-3 py-1 font-mono text-[10px] text-[#666] bg-[#0A0A0A]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a href="#" className="animate-in font-mono text-xs md:text-sm text-[#7B61FF] hover:text-white transition-colors w-max">
                  [ GitHub ↗ ]
                </a>
              </div>

              {/* Right Side - ASCII Art */}
              <div className="hidden md:flex w-2/5 justify-end items-center opacity-20 pointer-events-none select-none">
                <pre className="font-mono text-xs md:text-sm leading-tight text-[#7B61FF]">
                  {getAsciiArt(index)}
                </pre>
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
