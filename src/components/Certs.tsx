import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud, Code, Server, Database, ShieldCheck, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    id: 'cert-1',
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    date: 'May 2025',
    icon: Cloud,
    color: '#00E5FF',
    gradient: 'from-[#00E5FF] to-[#0077FF]',
    link: 'https://drive.google.com/file/d/1dpbHlqOEyVzzeANbBqUATZArwHiLYf2L/view'
  },
  {
    id: 'cert-2',
    title: 'Java Programming',
    issuer: 'iamneo',
    date: 'Apr 2025',
    icon: Code,
    color: '#7B61FF',
    gradient: 'from-[#7B61FF] to-[#FF00FF]',
    link: 'https://drive.google.com/file/d/1ENr6RRCsQzXK1aEb6-iHwig1tEBHOT-w/view'
  },
  {
    id: 'cert-3',
    title: 'OOPs',
    issuer: 'iamneo',
    date: 'Dec 2024',
    icon: Server,
    color: '#FF0055',
    gradient: 'from-[#FF0055] to-[#FFAA00]',
    link: 'https://drive.google.com/file/d/1ECTImpmwJnF3RgAtOzJrotJyzhLANq7V/view'
  },
  {
    id: 'cert-4',
    title: 'Google Networking',
    issuer: 'Google',
    date: 'Sep 2024',
    icon: Database,
    color: '#00FF88',
    gradient: 'from-[#00FF88] to-[#00A8FF]',
    link: 'https://drive.google.com/file/d/1aJZl9FxknZ8YfoAyQJkzHsVCxoU0bNxT/view'
  }
];

const TRAINING = [
  {
    id: 'train-1',
    title: 'Advanced SQL',
    issuer: 'CodeQuery',
    date: 'Jun 2025',
    icon: Database,
    color: '#FFAA00',
    gradient: 'from-[#FFAA00] to-[#FF0055]',
    link: 'https://drive.google.com/file/d/1xyvqdVi23wJevrjMDGTGeXEj-p_lOffx/view'
  },
  {
    id: 'train-2',
    title: 'Data Structures',
    issuer: 'NeoColab',
    date: 'Jan 2025',
    icon: Terminal,
    color: '#00E5FF',
    gradient: 'from-[#00E5FF] to-[#7B61FF]',
    link: 'https://drive.google.com/file/d/1qW0tMne5GEvWA4HjbwlmZV1O8uk5yL-I/view'
  }
];

export default function Certs() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-8 md:py-32 overflow-hidden">
      
      {/* Subtle Background Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-[0.03] text-white overflow-hidden">
        <div className="font-display text-[15vw] leading-[0.8] whitespace-nowrap -ml-[10vw]">CERTIFICATIONS</div>
        <div className="font-display text-[15vw] leading-[0.8] whitespace-nowrap ml-[20vw] text-transparent" style={{ WebkitTextStroke: '2px white' }}>ACHIEVEMENTS</div>
        <div className="font-display text-[15vw] leading-[0.8] whitespace-nowrap -ml-[5vw]">TRAINING</div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-12 relative z-10">

        {/* Evident Title */}
        <div className="mb-20">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#F0F0F0] uppercase tracking-tighter mb-6">
            Credentials
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-12 h-[2px] bg-[#7B61FF]"></span>
            <p className="font-mono text-sm md:text-base text-[#888] uppercase tracking-widest">
              Certifications & Professional Training
            </p>
          </div>
        </div>
        
        {/* Certifications Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-[#555]" />
            <h2 className="font-mono text-sm md:text-base text-[#888] uppercase tracking-[0.2em]">Certifications</h2>
            <div className="flex-grow h-[1px] bg-[#222]"></div>
          </div>
          
          <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 md:overflow-visible hide-scrollbar">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <a 
                  key={cert.id}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-[85vw] sm:w-[45vw] md:w-auto snap-center group relative p-8 bg-[#050505] border border-[#333] hover:border-[#555] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[280px] block"
                >
                  {/* Top Glow Line (Default Visible) */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${cert.gradient} opacity-100`} />
                  
                  {/* Background Glow (Default Visible) */}
                  <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${cert.gradient} opacity-[0.05] blur-3xl pointer-events-none`} />

                  {/* Large Subtle Background Icon */}
                  <Icon className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-[0.02] pointer-events-none transform -rotate-12" />

                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="font-mono text-[10px] md:text-xs text-[#888] uppercase tracking-widest">
                      {cert.date}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-[#F0F0F0] mb-3 uppercase tracking-tight leading-[1.1]">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }}></span>
                      <p className="font-mono text-xs md:text-sm text-[#888] uppercase tracking-widest">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Training Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Terminal className="w-6 h-6 text-[#555]" />
            <h2 className="font-mono text-sm md:text-base text-[#888] uppercase tracking-[0.2em]">Training</h2>
            <div className="flex-grow h-[1px] bg-[#222]"></div>
          </div>
          
          <div className="flex flex-row md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 md:overflow-visible hide-scrollbar">
            {TRAINING.map((train, index) => {
              const Icon = train.icon;
              return (
                <a 
                  key={train.id}
                  href={train.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-[85vw] sm:w-[45vw] md:w-auto snap-center group relative p-8 bg-[#050505] border border-[#333] hover:border-[#555] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[240px] block"
                >
                  {/* Top Glow Line (Default Visible) */}
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${train.gradient} opacity-100`} />
                  
                  {/* Background Glow (Default Visible) */}
                  <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${train.gradient} opacity-[0.05] blur-3xl pointer-events-none`} />

                  {/* Large Subtle Background Icon */}
                  <Icon className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-[0.02] pointer-events-none transform -rotate-12" />

                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="font-mono text-[10px] md:text-xs text-[#888] uppercase tracking-widest">
                      {train.date}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-[#F0F0F0] mb-3 uppercase tracking-tight leading-[1.1]">
                      {train.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: train.color }}></span>
                      <p className="font-mono text-xs md:text-sm text-[#888] uppercase tracking-widest">
                        {train.issuer}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
