import { useEffect, useRef } from 'react';

const BubbleText = ({ text }: { text: string }) => {
  useEffect(() => {
    const spans = document.querySelectorAll(
      ".hover-text span"
    ) as NodeListOf<HTMLSpanElement>;

    spans.forEach((span) => {
      const handleMouseEnter = function (this: HTMLSpanElement) {
        this.style.fontWeight = "900";
        this.style.color = "#F0F0F0";

        const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
        const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "500";
          leftNeighbor.style.color = "#C8C8C8";
        }
        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "500";
          rightNeighbor.style.color = "#C8C8C8";
        }
      };

      const handleMouseLeave = function (this: HTMLSpanElement) {
        this.style.fontWeight = "300";
        this.style.color = "#969696";

        const leftNeighbor = this.previousElementSibling as HTMLSpanElement;
        const rightNeighbor = this.nextElementSibling as HTMLSpanElement;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "300";
          leftNeighbor.style.color = "#969696";
        }

        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "300";
          rightNeighbor.style.color = "#969696";
        }
      };

      span.addEventListener("mouseenter", handleMouseEnter);
      span.addEventListener("mouseleave", handleMouseLeave);

      // Store handlers for cleanup
      (span as any)._handleMouseEnter = handleMouseEnter;
      (span as any)._handleMouseLeave = handleMouseLeave;
    });

    return () => {
      spans.forEach((span) => {
        if ((span as any)._handleMouseEnter) {
          span.removeEventListener("mouseenter", (span as any)._handleMouseEnter);
          span.removeEventListener("mouseleave", (span as any)._handleMouseLeave);
        }
      });
    };
  }, []);

  return (
    <span className="hover-text">
      {text.split("").map((child, idx) => (
        <span
          style={{
            transition: "0.35s font-weight, 0.35s color",
            fontWeight: "300",
            color: "#969696",
          }}
          key={idx}
        >
          {child}
        </span>
      ))}
    </span>
  );
};

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let lastRenderTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = timestamp - lastRenderTime;
      if (elapsed < fpsInterval) return;

      lastRenderTime = timestamp - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#333333';

      const spacing = 45; // Wider spacing
      const rows = Math.ceil(canvas.height / spacing) + 1;
      const cols = Math.ceil(canvas.width / spacing) + 1;

      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          // Wave math - wide diagonal flow
          const sizeOffset = (Math.sin(x * 0.005 + y * 0.005 - time) + 1) * 0.5;
          const radius = 0.5 + sizeOffset * 1.5; // Smaller dots, fluctuating between 0.5 and 2

          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      time += 0.03; // Slightly slower wave
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Re-run effect when theme changes to update canvas color

  return (
    <section className="relative w-full min-h-[60vh] bg-[#0A0A0A] text-[#F0F0F0] flex flex-col justify-between overflow-hidden">
      {/* Animated Dotted Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Center Content: Massive Email and Links */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 w-full relative z-10 pt-12 pb-12 gap-6 md:gap-10">
        <a 
          href="mailto:keshavrajmaiya@gmail.com"
          className="group relative inline-block text-[clamp(1.2rem,4vw,6.5rem)] leading-none tracking-tight whitespace-nowrap lowercase transition-all duration-300"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <BubbleText text="keshavrajmaiya@gmail.com" />
        </a>

        <div className="flex flex-row items-center justify-center gap-8 md:gap-24 w-full">
          <a 
            href="https://www.linkedin.com/in/keshavrajmaiya/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block text-[clamp(1.2rem,4vw,6.5rem)] leading-none tracking-tight whitespace-nowrap lowercase transition-all duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <BubbleText text="@linkedin" />
          </a>

          <a 
            href="https://github.com/keshav138"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block text-[clamp(1.2rem,4vw,6.5rem)] leading-none tracking-tight whitespace-nowrap lowercase transition-all duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <BubbleText text="@github" />
          </a>
        </div>

        <a 
          href="https://drive.google.com/file/d/1oosL-3ereylixqDmvxK13TYVHQnEC0Nn/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block text-[clamp(1.2rem,4vw,6.5rem)] leading-none tracking-tight whitespace-nowrap lowercase transition-all duration-300"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <BubbleText text="@resume" />
        </a>
      </div>

      {/* Back to Top Button */}
      <div className="w-full flex justify-center pb-20 relative z-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col items-center cursor-pointer transition-all duration-500 hover:translate-y-[-8px] animate-slow-blink"
        >
          <span 
            className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-[#666] group-hover:text-[#7B61FF] transition-colors duration-300"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            [ GO_UP ]
          </span>
        </button>
      </div>
    </section>
  );
}
