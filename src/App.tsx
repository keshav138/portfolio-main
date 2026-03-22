import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Scanlines from './components/Scanlines';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certs from './components/Certs';
import CodingStats from './components/CodingStats';
import Education from './components/Education';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll Progress Bar
    gsap.to(progressBarRef.current, {
      scaleY: 1,
      transformOrigin: 'top',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    // Section Counter
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(index + 1),
        onEnterBack: () => setCurrentSection(index + 1),
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-[#F0F0F0] font-mono selection:bg-[#7B61FF] selection:text-[#0A0A0A]">
      <Cursor />
      <Scanlines />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 right-0 w-[2px] h-full bg-[#161616] z-[60]">
        <div ref={progressBarRef} className="w-full h-full bg-[#7B61FF] scale-y-0" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: 200%;
        }
        @keyframes drawGraph {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-graph-line {
          stroke-dasharray: 300;
          animation: drawGraph 5s linear infinite;
        }
      `}</style>

      {/* Fixed Top Detail Strip */}
      <div className="fixed top-0 w-full border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md py-1.5 overflow-hidden z-50">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-[9px] md:text-[10px] text-[#F0F0F0]/60 tracking-[0.2em]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4">
              KESHAV MAIYA /// FROM THE HILLS /// YES THE TEA PLACE /// DARJEELING BORN. PUNJAB MADE /// FAR FROM THE HILLS. CLOSE TO THE CODE /// STILL UP AT 2AM /// CS UNDERGRAD /// CREATIVE DEVELOPER /// PORTFOLIO 2026 /// KESHAV MAIYA ///
            </span>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Detail Strip */}
      <div className="fixed bottom-0 w-full border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md py-1.5 overflow-hidden z-50">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-[9px] md:text-[10px] text-[#F0F0F0]/60 tracking-[0.2em]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4">
              GIT PUSH AND PRAY /// WORKS ON MY MACHINE /// THE SCHEMA WAS NORMALISED. THE DEADLINE WAS NOT /// O(N²) BUT IT SHIPPED /// 200ms OR BUST /// UNDEFINED IS NOT A FUNCTION /// IT WAS A CORS ERROR. IT'S ALWAYS A CORS ERROR /// DOCKER SAID NO /// REDIS GOES BRRR /// THE QUERY WAS OPTIMISED. THE SLEEP WAS NOT /// LOCALHOST:8000 /// ONE MORE ENDPOINT /// JWT EXPIRED. SO DID MY PATIENCE /// MERGE CONFLICT IN PRODUCTION /// STACK OVERFLOW WAS DOWN. I FIGURED IT OUT ANYWAY /// PIP INSTALL AND HOPE /// 99 BUGS IN THE CODE. FIX ONE. 127 BUGS IN THE CODE /// GIT PUSH AND PRAY ///
            </span>
          ))}
        </div>
      </div>

      <main className="py-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certs />
        <CodingStats />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
