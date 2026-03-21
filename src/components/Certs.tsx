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
    date: 'Jan 2024',
    icon: Cloud,
    color: '#00E5FF',
    gradient: 'from-[#00E5FF] to-[#0077FF]'
  },
  {
    id: 'cert-2',
    title: 'Full Stack',
    issuer: 'iamneo',
    date: 'Nov 2023',
    icon: Code,
    color: '#7B61FF',
    gradient: 'from-[#7B61FF] to-[#FF00FF]'
  },
  {
    id: 'cert-3',
    title: 'Backend',
    issuer: 'iamneo',
    date: 'Oct 2023',
    icon: Server,
    color: '#FF0055',
    gradient: 'from-[#FF0055] to-[#FFAA00]'
  },
  {
    id: 'cert-4',
    title: 'Data Analytics',
    issuer: 'Google',
    date: 'Aug 2023',
    icon: Database,
    color: '#00FF88',
    gradient: 'from-[#00FF88] to-[#00A8FF]'
  }
];

const TRAINING = [
  {
    id: 'train-1',
    title: 'Advanced SQL',
    issuer: 'CodeQuery',
    date: 'Jul 2023',
    icon: Database,
    color: '#FFAA00',
    gradient: 'from-[#FFAA00] to-[#FF0055]'
  },
  {
    id: 'train-2',
    title: 'Python DSA',
    issuer: 'NeoColab',
    date: 'Jun 2023',
    icon: Terminal,
    color: '#00E5FF',
    gradient: 'from-[#00E5FF] to-[#7B61FF]'
  }
];

export default function Certs() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden">
      
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div 
                  key={cert.id}
                  className="group relative p-8 bg-[#050505] border border-[#333] hover:border-[#555] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[280px]"
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
                </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAINING.map((train, index) => {
              const Icon = train.icon;
              return (
                <div 
                  key={train.id}
                  className="group relative p-8 bg-[#050505] border border-[#333] hover:border-[#555] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[240px]"
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
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
