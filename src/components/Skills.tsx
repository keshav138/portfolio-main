import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Globe, Database, BrainCircuit, HardDrive, Server, Wrench } from 'lucide-react';
import { SiPython, SiCplusplus, SiDjango, SiPandas, SiNumpy, SiScikitlearn, SiPostgresql, SiMysql, SiRedis, SiDocker, SiNginx, SiGit, SiPostman, SiGooglecolab } from 'react-icons/si';
import { FaJava, FaBrain, FaChartLine, FaProjectDiagram, FaDatabase, FaCar, FaCloud, FaCode, FaChartPie, FaFileExcel, FaAws } from 'react-icons/fa';
import { TbSql } from 'react-icons/tb';
import { BsBarChartFill } from 'react-icons/bs';

gsap.registerPlugin(ScrollTrigger);

const SKILL_MODULES = [
  { id: '01', title: 'LANGUAGES', span: 'col-span-1 md:col-span-2 lg:col-span-2', innerGrid: 'grid-cols-2', icon: Code2, items: [
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'C/C++', icon: SiCplusplus, color: '#659AD2' },
    { name: 'Java', icon: FaJava, color: '#ED8B00' },
    { name: 'SQL', icon: TbSql, color: '#00BCF2' }
  ]},
  { id: '02', title: 'WEB', span: 'col-span-1', innerGrid: 'grid-cols-2', icon: Globe, items: [
    { name: 'Django', icon: SiDjango, color: '#44B78B' },
    { name: 'DRF', icon: SiDjango, color: '#E32828' },
    { name: 'Django Channels', icon: SiDjango, color: '#44B78B', itemSpan: 'col-span-2' }
  ]},
  { id: '04', title: 'ML / AI', span: 'col-span-1 md:col-span-2 lg:col-span-2', innerGrid: 'grid-cols-2', primary: true, icon: BrainCircuit, items: [
    { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
    { name: 'Regression', icon: FaChartLine, color: '#00E5FF' },
    { name: 'Clustering', icon: FaProjectDiagram, color: '#FF00FF' },
    { name: 'Gradient Boosting', icon: FaBrain, color: '#00FFCC' }
  ]},
  { id: '03', title: 'DATA', span: 'col-span-1', innerGrid: 'grid-cols-2', primary: true, icon: Database, items: [
    { name: 'Pandas', icon: SiPandas, color: '#E70488' },
    { name: 'NumPy', icon: SiNumpy, color: '#4DABCF' },
    { name: 'Matplotlib', icon: BsBarChartFill, color: '#5C92B5' },
    { name: 'FastF1', icon: FaCar, color: '#FF1801' }
  ]},
  { id: '07', title: 'TOOLS', span: 'col-span-1 md:col-span-2 lg:col-span-2', innerGrid: 'grid-cols-2 md:grid-cols-3', icon: Wrench, items: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'VS Code', icon: FaCode, color: '#3EA6EB' },
    { name: 'PowerBI', icon: FaChartPie, color: '#F2C811' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'Excel', icon: FaFileExcel, color: '#33A862' },
    { name: 'Google Colab', icon: SiGooglecolab, color: '#F9AB00' }
  ]},
  { id: '06', title: 'INFRA', span: 'col-span-1', innerGrid: 'grid-cols-2', icon: Server, items: [
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Nginx', icon: SiNginx, color: '#26A65B' },
    { name: 'Azure Cloud', icon: FaCloud, color: '#0089D6' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' }
  ]},
  { id: '05', title: 'DATABASES', span: 'col-span-1 md:col-span-3 lg:col-span-3', innerGrid: 'grid-cols-2 md:grid-cols-4', icon: HardDrive, items: [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#699EDC' },
    { name: 'MySQL', icon: SiMysql, color: '#00758F' },
    { name: 'Redis', icon: SiRedis, color: '#FF4438' },
    { name: 'DAX', icon: FaDatabase, color: '#F2C811' }
  ]},
];

const ASCII_SKILLS = `███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`;

const ASCII_SIDE_LEFT = `░▒▓█████████████████████
▒░▒▓████████████████████
░░▒▒▓███████████████████
▒░▒▓████████████████████
░▒▓█████████████████████
░░▒▒▓███████████████████`;

const ASCII_SIDE_RIGHT = `█████████████████████▓▒░
████████████████████▓▒░▒
███████████████████▓▒▒░░
████████████████████▓▒░▒
█████████████████████▓▒░
███████████████████▓▒▒░░`;

export default function Skills() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 py-24 md:px-8 overflow-hidden">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-0"
           style={{ backgroundImage: 'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-7xl z-10 flex flex-col items-center">
        
        {/* Heading Area with Creative Filler */}
        <div className="w-full flex justify-center lg:justify-between items-center mb-16 md:mb-24 overflow-hidden">
          
          {/* Left Filler */}
          <div className="hidden lg:flex flex-col items-start w-1/4 opacity-40">
            <pre className="font-mono text-[10px] md:text-sm leading-[1.1] text-transparent bg-clip-text bg-[linear-gradient(to_right,transparent,rgba(123,97,255,0.2)_40%,#7B61FF_80%)]">
              {ASCII_SIDE_LEFT}
            </pre>
          </div>

          {/* Center ASCII Heading */}
          <div className="flex flex-col items-center w-full lg:w-1/2 shrink-0">
            <pre className="font-mono text-[10px] sm:text-xs md:text-sm lg:text-base leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] font-bold text-center">
              {ASCII_SKILLS}
            </pre>
          </div>

          {/* Right Filler */}
          <div className="hidden lg:flex flex-col items-end w-1/4 opacity-40">
            <pre className="font-mono text-[10px] md:text-sm leading-[1.1] text-transparent bg-clip-text bg-[linear-gradient(to_left,transparent,rgba(0,229,255,0.2)_40%,#00E5FF_80%)]">
              {ASCII_SIDE_RIGHT}
            </pre>
          </div>

        </div>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {SKILL_MODULES.map((module) => (
            <div
              key={module.id}
              className={`group relative flex flex-col bg-[#050505] border transition-all duration-300 hover:-translate-y-1 ${module.span} ${
                module.primary 
                  ? 'border-[#7B61FF]/40 hover:border-[#7B61FF]/80 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]' 
                  : 'border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'
              }`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Card Header */}
              <div className={`flex justify-between items-center p-4 md:p-5 border-b transition-colors duration-300 ${
                module.primary ? 'border-[#7B61FF]/30 group-hover:border-[#7B61FF]/60 bg-[#7B61FF]/[0.03]' : 'border-white/5 group-hover:border-white/10 bg-white/[0.02]'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${module.primary ? 'bg-[#7B61FF]/20 text-[#B8A5FF]' : 'bg-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-white/10'} transition-colors`}>
                    <module.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 block mb-0.5">MOD_{module.id}</span>
                    <h3 className={`font-header text-base md:text-lg tracking-[0.1em] ${module.primary ? 'text-[#B8A5FF]' : 'text-zinc-100'}`}>
                      {module.title}
                    </h3>
                  </div>
                </div>
                {module.primary ? (
                  <div className="flex items-center gap-2 self-start mt-2">
                    <span className="font-mono text-[10px] text-[#7B61FF] opacity-80 hidden sm:block">ACTIVE</span>
                    <div className="w-2 h-2 bg-[#7B61FF] rounded-full animate-pulse shadow-[0_0_8px_#7B61FF]"></div>
                  </div>
                ) : (
                  <div className="w-2 h-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors self-start mt-2"></div>
                )}
              </div>

              {/* Card Body (Skills) */}
              <div className="p-4 md:p-6 flex-1 flex flex-col justify-start bg-[#0A0A0A]/50">
                <div className={`grid ${module.innerGrid || 'grid-cols-2'} gap-3 md:gap-4 h-full`}>
                  {module.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`group/skill relative overflow-hidden flex items-center justify-start px-4 py-3 md:px-5 md:py-4 font-mono font-medium text-base md:text-lg border transition-all duration-300 ${item.itemSpan || ''} ${
                        module.primary
                          ? 'border-[#7B61FF]/20 text-white bg-[#7B61FF]/5 hover:border-[#7B61FF]/60 hover:bg-[#7B61FF]/15 hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]'
                          : 'border-white/5 text-zinc-300 bg-white/[0.02] hover:border-white/20 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {/* Background Icon */}
                      {(() => {
                        const Icon = item.icon as any;
                        return (
                          <Icon 
                            className="absolute -right-4 -bottom-4 text-7xl md:text-8xl opacity-[0.07] transition-all duration-500 group-hover/skill:scale-110 group-hover/skill:-translate-y-1 group-hover/skill:-translate-x-1 group-hover/skill:opacity-20"
                            style={{ color: item.color }}
                          />
                        );
                      })()}
                      
                      <span className="relative z-10 tracking-wide group-hover/skill:text-white transition-colors" style={{ textShadow: `0 0 10px ${item.color}40` }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Footer */}
              <div className="px-4 py-2 border-t border-white/5 bg-[#030303] flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${module.primary ? 'bg-[#7B61FF]/70' : 'bg-white/20'}`}></div>
                  ))}
                </div>
                <span className="font-mono text-[8px] text-zinc-600">SYS.OK</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
