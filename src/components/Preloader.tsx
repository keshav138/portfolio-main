import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center font-mono"
    >
      <div className="relative flex flex-col items-center">
        {/* Progress Number */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[15vw] md:text-[10vw] font-bold text-[#F0F0F0] leading-none tracking-tighter"
        >
          {Math.round(progress)}%
        </motion.div>

        {/* Status Text */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#7B61FF]">
            <span className="w-2 h-2 bg-[#7B61FF] rounded-full animate-pulse" />
            Initializing System Core
          </div>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-[#7B61FF]"
              style={{ scaleX: progress / 100, transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* Decorative ASCII elements */}
        <div className="absolute -top-20 -left-20 opacity-10 pointer-events-none select-none">
          <pre className="text-[8px] leading-none">
            {`0101010101010101
1010101010101010
0101010101010101
1010101010101010`}
          </pre>
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none select-none">
          <pre className="text-[8px] leading-none">
            {`[ SYSTEM_BOOT ]
[ KESHAV_OS_V2 ]
[ STATUS: OK ]`}
          </pre>
        </div>
      </div>

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(#F0F0F0 1px, transparent 1px), linear-gradient(90deg, #F0F0F0 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />
    </motion.div>
  );
};

export default Preloader;
