import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden">
      
      <div className="w-full max-w-6xl mx-auto mt-12 relative z-10">
        
        {/* Evident Title (Kept exactly as requested) */}
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F0F0F0] tracking-tight mb-4">
            About Me
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#7B61FF]"></span>
            <p className="font-mono text-xs md:text-sm text-[#888] uppercase tracking-widest">
              Personal Profile
            </p>
          </div>
        </div>

        {/* Orthodox Layout: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left: Image Frame */}
          <div className="w-full max-w-md lg:w-2/5 shrink-0 mx-auto lg:mx-0">
            <div className="relative aspect-[4/5] w-full bg-white overflow-hidden rounded-xl border border-[#333] shadow-2xl">
              <img 
                src="https://drive.google.com/thumbnail?id=15cIWgislIWRA6lh_SvwOYwNIGodteEEy&sz=w1000" 
                alt="Keshav Raj Maiya" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if the drive link fails
                  e.currentTarget.src = "https://picsum.photos/seed/keshav/800/1000?grayscale";
                }}
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center pt-2">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#F0F0F0] mb-6">
              Hi, I'm Keshav.
            </h3>
            
            {/* Standard Paragraphs with standard readable fonts */}
            <div className="space-y-6 text-[#A0A0A0] text-base md:text-lg leading-relaxed">
              <p>
                I'm Keshav, from Darjeeling — yes, the tea place, yes, it's as beautiful as you're imagining. I moved to Punjab for university and stayed for the chaos.
              </p>
              <p>
                I'm someone who gets quietly obsessed with things — really obsessed — whether that's a problem I can't crack or a subject I've just discovered. I'm also the kind of person who finds something interesting in almost everything, which is either a great quality or the reason I'm up at 2am reading about something completely unrelated to what I should be doing.
              </p>
              <p>
                I take the work seriously. I don't always take myself seriously. That balance feels about right. Headed somewhere at the intersection of data, machine learning, and backend engineering — which is either a very specific plan or a very fancy way of saying I want to do it all. <span className="bg-[#7B61FF] text-white px-2 py-0.5 rounded-sm font-medium shadow-[0_0_10px_rgba(123,97,255,0.4)]">Probably both.</span>
              </p>
            </div>

            {/* Quick Facts Grid */}
            <div className="mt-10 grid grid-cols-2 gap-6 pt-8 border-t border-[#222]">
              <div>
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-1">Location</p>
                <p className="text-[#D1D1D1] font-medium">Punjab, IN</p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-1">Hometown</p>
                <p className="text-[#D1D1D1] font-medium">Darjeeling, IN</p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-1">Education</p>
                <p className="text-[#D1D1D1] font-medium">LPU (B.Tech CSE, Yr 3)</p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-1">Focus</p>
                <p className="text-[#D1D1D1] font-medium">Backend & ML</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
