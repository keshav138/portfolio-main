import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import SectionDivider from './SectionDivider';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const CERT_FILES = [
  "drwxr-xr-x  2 keshav admin  4096 Mar 17 10:00 .",
  "drwxr-xr-x  6 keshav admin  4096 Mar 17 09:50 ..",
  "-rw-r--r--  1 keshav admin 12045 Jan 15 2024 NPTEL_Cloud_Computing.pdf",
  "-rw-r--r--  1 keshav admin  8432 Nov 10 2023 iamneo_Full_Stack.pdf",
  "-rw-r--r--  1 keshav admin  9120 Oct 05 2023 iamneo_Backend.pdf",
  "-rw-r--r--  1 keshav admin 15670 Aug 20 2023 Google_Data_Analytics.pdf",
  "drwxr-xr-x  2 keshav admin  4096 Mar 17 10:05 training",
];

const TRAINING_FILES = [
  "drwxr-xr-x  2 keshav admin  4096 Mar 17 10:05 .",
  "drwxr-xr-x  2 keshav admin  4096 Mar 17 10:00 ..",
  "-rw-r--r--  1 keshav admin  5400 Jul 12 2023 CodeQuery_Advanced_SQL.txt",
  "-rw-r--r--  1 keshav admin  6200 Jun 01 2023 NeoColab_Python_DSA.txt",
];

export default function Certs() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const cmd1Ref = useRef<HTMLSpanElement>(null);
  const cursor1Ref = useRef<HTMLSpanElement>(null);
  const total1Ref = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  
  const cmd2ContainerRef = useRef<HTMLDivElement>(null);
  const cmd2Ref = useRef<HTMLSpanElement>(null);
  const cursor2Ref = useRef<HTMLSpanElement>(null);
  const total2Ref = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      }
    });

    const certLines = certsRef.current?.querySelectorAll('.cert-line');
    const trainingLines = trainingRef.current?.querySelectorAll('.cert-line');

    // Initial state
    gsap.set([total1Ref.current, total2Ref.current, promptRef.current, cmd2ContainerRef.current], { opacity: 0 });
    gsap.set(cursor2Ref.current, { opacity: 0 });
    if (certLines) gsap.set(certLines, { opacity: 0, y: 5 });
    if (trainingLines) gsap.set(trainingLines, { opacity: 0, y: 5 });
    
    const typeSpeed = 0.04; // seconds per character

    const cmd1Text = "keshav@portfolio:~$ ls -la ./certifications/";
    const cmd2Text = "keshav@portfolio:~/certifications$ ls -la ./training/";

    // 1. Type first command
    tl.to(cmd1Ref.current, {
      duration: cmd1Text.length * typeSpeed,
      text: cmd1Text,
      ease: "none"
    })
    // Hide first cursor
    .to(cursor1Ref.current, { opacity: 0, duration: 0.1 })
    // 2. Show total 1
    .to(total1Ref.current, { opacity: 1, duration: 0.2 })
    // 3. Reveal cert files
    .to(certLines, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    }, "+=0.2")
    // 4. Prepare and type second command
    .to(cmd2ContainerRef.current, { opacity: 1, duration: 0.1 }, "+=0.5")
    .to(cursor2Ref.current, { opacity: 1, duration: 0.1 })
    .to(cmd2Ref.current, {
      duration: cmd2Text.length * typeSpeed,
      text: cmd2Text,
      ease: "none"
    })
    // Hide second cursor
    .to(cursor2Ref.current, { opacity: 0, duration: 0.1 })
    // 5. Show total 2
    .to(total2Ref.current, { opacity: 1, duration: 0.2 })
    // 6. Reveal training files
    .to(trainingLines, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    }, "+=0.2")
    // 7. Show final prompt
    .to(promptRef.current, { opacity: 1, duration: 0.2 }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  const formatLine = (line: string) => {
    return {
      __html: line
        .replace(/NPTEL|iamneo|Google|CodeQuery|NeoColab/g, match => `<span class="text-[#F0F0F0] font-bold">${match}</span>`)
        .replace(/\.pdf|\.txt/g, match => `<span class="text-[#7B61FF]">${match}</span>`)
        .replace(/drwxr-xr-x|-rw-r--r--/g, match => `<span class="opacity-50">${match}</span>`)
    };
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col justify-center px-8 md:px-24 py-20">
      <SectionDivider title="05 // CERTS_&_TRAINING" className="absolute top-8 left-0 px-8" />

      <div className="font-mono text-xs md:text-sm text-[#F0F0F0] leading-relaxed max-w-4xl">
        
        {/* Command 1 */}
        <div className="text-[#7B61FF] mb-4 min-h-[1.5em] flex items-center">
          <span ref={cmd1Ref}></span>
          <span ref={cursor1Ref} className="inline-block w-2 h-4 bg-[#7B61FF] ml-1 animate-pulse" />
        </div>
        
        {/* Total 1 */}
        <div className="text-[#888888] mb-2" ref={total1Ref}>total 64</div>
        
        {/* Cert Lines */}
        <div ref={certsRef} className="mb-8">
          {CERT_FILES.map((line, i) => (
            <div key={i} className="cert-line min-h-[1.5em] whitespace-pre-wrap" dangerouslySetInnerHTML={formatLine(line)} />
          ))}
        </div>

        {/* Command 2 */}
        <div ref={cmd2ContainerRef} className="text-[#7B61FF] mb-4 min-h-[1.5em] flex items-center">
          <span ref={cmd2Ref}></span>
          <span ref={cursor2Ref} className="inline-block w-2 h-4 bg-[#7B61FF] ml-1 animate-pulse" />
        </div>
        
        {/* Total 2 */}
        <div className="text-[#888888] mb-2" ref={total2Ref}>total 16</div>
        
        {/* Training Lines */}
        <div ref={trainingRef} className="mb-8">
          {TRAINING_FILES.map((line, i) => (
            <div key={i} className="cert-line min-h-[1.5em] whitespace-pre-wrap" dangerouslySetInnerHTML={formatLine(line)} />
          ))}
        </div>

        {/* Final Prompt */}
        <div ref={promptRef} className="text-[#7B61FF] min-h-[1.5em] flex items-center">
          keshav@portfolio:~/certifications$ <span className="inline-block w-2 h-4 bg-[#7B61FF] ml-1 animate-pulse" />
        </div>

      </div>
    </section>
  );
}
