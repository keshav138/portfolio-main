import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AsciiStrip from './AsciiStrip';

const ASCII_BUST = `
         _,.-------.,_
     ,;~'             '~;,
   ,;                     ;,
  ;                         ;
 ,'                         ',
,;                           ;,
; ;      .           .      ; ;
| ;   ______       ______   ; |
|  \\/~"     ~" . "~     "~\\/  |
|  ~  ,-~~~^~, | ,~^~~~-,  ~  |
 |   |        }:{        |   |
 |   l       / | \\       !   |
 .~  (__,.--" .^. "--.,__)  ~.
 |     ---;' / | \\ \`;---     |
  \\__.       \\/^\\/       .__/
   V| \\                 / |V
    | |T~\\___!___!___/~T| |
    | |\`IIII_I_I_I_IIII'| |
    |  \\,III I I I III,/  |
     \\   \`~~~~~~~~~~'   /
       \\   .       .   /
         \\.    ^    ./
           ^~~~^~~~^
`;

const ASCII_PS2 = `
      _=====_                               _=====_
     / _____ \\                             / _____ \\
   +.-'_____'-----------------------------.-'_____'.-+
  /   |     |  '.        S O N Y        .'  |  _  |   \\
 / ___| /|\\ |___ \\                     / ___| /_\\ |___ \\
/ |      |      | ;  __           _   ; | _         _ | ;
| | <---   ---> | | |__|         |_:> | ||_|       (_)| |
| |___   |   ___| ;SELECT       START ; |___       ___| ;
|\\    | \\|/ |    /  _     ___      _   \\    | (X) |    /|
| \\   |_____|  .','" "', |___|  ,'" "', '.  |_____|  .' |
|  '-.______.-' /       \\ANALOG/       \\  '-._____.-'   |
|               |       |------|       |                |
|              /\\       /      \\       /\\               |
|             /  '.___.'        '.___.'  \\              |
|            /                            \\             |
 \\          /                              \\           /
  \\________/                                \\_________/
                    PS2 CONTROLLER
`.replace(/\\/g, '\\\\');

const ASCII_GAMEBOY_NEW = `
    __________________________
   |OFFo oON                  |
   | .----------------------. |
   | |  .----------------.  | |
   | |  |                |  | |
   | |))|                |  | |
   | |  |                |  | |
   | |  |                |  | |
   | |  |                |  | |
   | |  |                |  | |
   | |  |                |  | |
   | |  '----------------'  | |
   | |__GAME BOY____________/ |
   |          ________        |
   |    .    (Nintendo)       |
   |  _| |_   """"""""   .-.  |
   |-[_   _]-       .-. (   ) |
   |   |_|         (   ) '-'  |
   |    '           '-'   A   |
   |                 B        |
   |          ___   ___       |
   |         (___) (___)  ,., |
   |        select start ;:;: |
   |                    ,;:;' /
   |                   ,:;:'.'
   '-----------------------'
`.replace(/\\/g, '\\\\');

const ASCII_AMIGA = `
  .---------.
  |.-------.|
  ||>run#  ||
  ||       ||
  |"-------'|
.-^---------^-.
| ---~   AMiGA|
"-------------'
`.replace(/\\/g, '\\\\');

const ASCII_CUBE = `
      +-------+
     /       /|
    /       / |
   +-------+  |
   |       |  +
   |       | /
   |       |/
   +-------+
`;

const ASCII_CASSETTE = `
 ___________________
| .---------------. |
| | O           O | |
| | .-----------. | |
| | |           | | |
| | '-----------' | |
| '---------------' |
|___________________|
`;

const ASCII_DIAMOND = `
    /\\
   /  \\
  /____\\
  \\    /
   \\  /
    \\/
`;

const ASCII_HEART = `
  _  _
 / \\/ \\
 \\    /
  \\  /
   \\/
`;

const ASCII_SWORD = `
      /| ________________
O|===|* >________________>
      \\|
`;

const ASCII_GHOST = `
  .-.
 (o o)
 | O |
 \\   /
  ^~^
`;

const ASCII_ALIEN = `
   ___
 / o o \\
|   >   |
 \\ ___ /
`;

const ASCII_GAMEBOY = `
 .-----.
| .---. |
| |___| |
|       |
| +   o |
|       |
'-------'
`;

const ASCII_COFFEE = `
  (  )
   )(
 .----.
|      |-
|______|
`;

const ASCII_STAR = `
    .
   / \\
---   ---
   \\ /
   / \\
  '   '
`;

const ASCII_UMBRELLA = `
   .-^-.
  /     \\
 /_______\\
    |
    |
    J
`;

const ELEMENTS = [
  { art: ASCII_AMIGA, color: '#F0F0F0', bottom: '12%', right: '8%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_PS2, color: '#7B61FF', top: '15%', right: '12%', size: 'text-[4px] md:text-[6px]' },
  { art: ASCII_CUBE, color: '#F0F0F0', bottom: '25%', left: '10%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_CASSETTE, color: '#FF0055', top: '40%', left: '8%', size: 'text-[6px] md:text-[8px]' },
  { art: ASCII_DIAMOND, color: '#F0F0F0', top: '55%', right: '10%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_GAMEBOY_NEW, color: '#F0F0F0', top: '10%', left: '18%', size: 'text-[4px] md:text-[6px]' },
  { art: ASCII_HEART, color: '#FF0055', top: '30%', right: '22%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_SWORD, color: '#7B61FF', bottom: '35%', left: '22%', size: 'text-[6px] md:text-[8px]' },
  { art: ASCII_GHOST, color: '#F0F0F0', bottom: '40%', right: '18%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_ALIEN, color: '#FF0055', top: '18%', left: '32%', size: 'text-[6px] md:text-[8px]' },
  { art: ASCII_COFFEE, color: '#F0F0F0', bottom: '18%', left: '30%', size: 'text-[8px] md:text-[10px]' },
  { art: ASCII_STAR, color: '#FF0055', bottom: '22%', right: '32%', size: 'text-[6px] md:text-[8px]' },
  { art: ASCII_UMBRELLA, color: '#7B61FF', top: '70%', left: '15%', size: 'text-[8px] md:text-[10px]' },
];

const ROLES = [
  "ml engineer",
  "data scientist",
  "backend engineer",
  "systems architect"
];

export default function Hero() {
  const headsRef = useRef<(HTMLPreElement | null)[]>([]);
  const ringsRef = useRef<(SVGGElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [showMotionButton, setShowMotionButton] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Check if permission is needed for iOS
    const hasRequestPermission = (typeof DeviceOrientationEvent !== 'undefined' && 
                                 typeof (DeviceOrientationEvent as any).requestPermission === 'function') ||
                                 (typeof DeviceMotionEvent !== 'undefined' &&
                                 typeof (DeviceMotionEvent as any).requestPermission === 'function');
    
    if (hasRequestPermission) {
      setShowMotionButton(true);
    } else {
      // Not iOS or doesn't need explicit permission (e.g., Android, Desktop)
      setMotionEnabled(true);
    }
  }, []);

  const requestMotionPermission = async () => {
    const requestPermission = (DeviceOrientationEvent as any)?.requestPermission || (DeviceMotionEvent as any)?.requestPermission;
    
    if (typeof requestPermission === 'function') {
      try {
        const response = await requestPermission();
        if (response === 'granted') {
          setShowMotionButton(false);
          setMotionEnabled(true);
        }
      } catch (error) {
        console.error('Motion permission error:', error);
      }
    } else {
      // Fallback if the check passed but function is missing (unlikely)
      setShowMotionButton(false);
      setMotionEnabled(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const animateFloat = (el: HTMLElement, i: number, delay: number = 0) => {
    gsap.to(el, {
      y: `-${15 + (i % 5) * 5}`,
      x: i % 2 === 0 ? 10 : -10,
      rotationZ: i % 2 === 0 ? 4 : -4,
      rotationY: i % 3 === 0 ? 25 : -25,
      rotationX: i % 2 === 0 ? 15 : -15,
      duration: 3 + (i % 3) * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay
    });
  };

  useEffect(() => {
    // 3D Bobbing ASCII art
    headsRef.current.forEach((head, i) => {
      if (!head) return;
      animateFloat(head, i, i * 0.15);
    });

    // 3D Parallax for Strip and Name (Mouse for Desktop, Gyro for Mobile)
    const updateParallax = (x: number, y: number) => {
      if (stripRef.current) {
        gsap.to(stripRef.current, {
          x: x * -30,
          y: y * -30,
          rotationX: y * 10,
          rotationY: x * 10,
          duration: 1,
          ease: 'power2.out'
        });
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: x * 40,
          y: y * 40,
          rotationX: y * -15,
          rotationY: x * -15,
          duration: 1,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      updateParallax(x, y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!motionEnabled) return;
      if (e.beta === null || e.gamma === null) return;
      
      // beta: -180 to 180 (front/back tilt)
      // gamma: -90 to 90 (left/right tilt)
      // We want to normalize these to -1 to 1 range for our parallax
      // Typical comfortable tilt is around 30 degrees
      const x = Math.max(-1, Math.min(1, e.gamma / 30));
      const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); // Assuming 45 deg is "neutral" holding position
      
      updateParallax(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Rotating rings
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      gsap.to(ring, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 80 + i * 20, // Very slow rotation
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [motionEnabled]);

  const handleBreak = (e: React.MouseEvent<HTMLPreElement>, originalArt: string, i: number) => {
    const el = e.currentTarget;
    if (el.dataset.broken === "true") return;
    el.dataset.broken = "true";

    // Kill floating animation
    gsap.killTweensOf(el);

    // Scramble effect - only replace non-whitespace to keep exact shape and prevent jank
    let iterations = 0;
    const chars = '!<>-_\\\\/[]{}—=+*^?#01';
    const scrambleInterval = setInterval(() => {
      el.innerText = originalArt.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]);
      iterations++;
      if (iterations > 10) {
        clearInterval(scrambleInterval);
      }
    }, 40);

    // Shatter / Fall effect
    gsap.to(el, {
      y: "+=800",
      x: "+=" + (Math.random() * 400 - 200),
      rotationZ: Math.random() * 720 - 360,
      rotationX: Math.random() * 720 - 360,
      rotationY: Math.random() * 720 - 360,
      opacity: 0,
      scale: 0.5,
      duration: 1.2,
      ease: "power3.in",
      onComplete: () => {
        clearInterval(scrambleInterval);
        
        // Reset element state for respawn
        el.innerText = originalArt;
        gsap.set(el, {
          y: -window.innerHeight - 200, // Start from way above the screen
          x: (Math.random() - 0.5) * 300, // Random horizontal offset
          rotationZ: Math.random() * 90 - 45, // Random rotation
          rotationX: Math.random() * 90 - 45,
          rotationY: Math.random() * 90 - 45,
          scale: 0.2,
          opacity: 0
        });

        // Sweep into place
        gsap.to(el, {
          y: 0,
          x: 0,
          rotationZ: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 0.5, // Original opacity
          duration: 3,
          ease: "power4.out", // Smooth, sweeping deceleration
          delay: Math.random() * 0.5, // Random delay before respawning
          onComplete: () => {
            el.dataset.broken = "false";
            animateFloat(el, i); // Resume floating
          }
        });
      }
    });
  };

  return (
    <section className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center perspective-[1000px]">
      
      {/* Concentric ASCII Rings - Lightened WAY more */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] z-0">
        <svg viewBox="0 0 1000 1000" className="w-[150vmin] h-[150vmin]">
          <defs>
            <path id="ring1" d="M 500, 500 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
            <path id="ring2" d="M 500, 500 m -250, 0 a 250,250 0 1,1 500,0 a 250,250 0 1,1 -500,0" />
            <path id="ring3" d="M 500, 500 m -350, 0 a 350,350 0 1,1 700,0 a 350,350 0 1,1 -700,0" />
            <path id="ring4" d="M 500, 500 m -450, 0 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0" />
          </defs>
          <g ref={el => ringsRef.current[0] = el} style={{ willChange: 'transform' }}>
            <text className="font-mono text-xs fill-[#F0F0F0] tracking-widest"><textPath href="#ring1" startOffset="0%">01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101</textPath></text>
          </g>
          <g ref={el => ringsRef.current[1] = el} style={{ willChange: 'transform' }}>
            <text className="font-mono text-sm fill-[#F0F0F0] tracking-widest"><textPath href="#ring2" startOffset="0%">SYSTEM.INIT() // KERNEL PANIC // MEMORY DUMP // SYSTEM.INIT() // KERNEL PANIC // MEMORY DUMP // SYSTEM.INIT() // KERNEL PANIC // MEMORY DUMP // SYSTEM.INIT() // KERNEL PANIC // MEMORY DUMP //</textPath></text>
          </g>
          <g ref={el => ringsRef.current[2] = el} style={{ willChange: 'transform' }}>
            <text className="font-mono text-[10px] fill-[#F0F0F0] tracking-[0.2em]"><textPath href="#ring3" startOffset="0%">*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!*#@!</textPath></text>
          </g>
          <g ref={el => ringsRef.current[3] = el} style={{ willChange: 'transform' }}>
            <text className="font-mono text-sm fill-[#F0F0F0] tracking-widest"><textPath href="#ring4" startOffset="0%">DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_0X9A8B7C6D5E4F3A2B1C0D_DATA_STREAM_ACTIVE_</textPath></text>
          </g>
        </svg>
      </div>

      {/* Ascii Strip Background */}
      <div ref={stripRef} className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none" style={{ willChange: 'transform' }}>
        <AsciiStrip />
      </div>

      {/* Bobbing ASCII Art (Pushed to Edges, Interactive) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
        {ELEMENTS.map((el, i) => (
          <pre
            key={i}
            ref={ref => headsRef.current[i] = ref}
            onMouseEnter={(e) => handleBreak(e, el.art, i)}
            className={`absolute font-mono ${el.size} opacity-50 cursor-crosshair pointer-events-auto hover:opacity-100 transition-opacity duration-200`}
            style={{
              top: el.top,
              bottom: el.bottom,
              left: el.left,
              right: el.right,
              color: el.color,
              willChange: 'transform'
            }}
          >
            {el.art}
          </pre>
        ))}
      </div>

      {/* Main Content - Centered Name & Roles (The Focus) */}
      <div ref={nameRef} className="relative z-20 flex flex-col items-center justify-center pointer-events-none" style={{ willChange: 'transform' }}>
        <h1 className="font-pixel text-[22vw] md:text-[18vw] leading-[0.85] text-[#F0F0F0] tracking-tighter m-0 p-0 text-center" style={{ textShadow: '0 0 20px rgba(240,240,240,0.2)' }}>
          KESHAV
        </h1>
        <h1 className="font-pixel text-[22vw] md:text-[18vw] leading-[0.85] text-[#F0F0F0] tracking-tighter m-0 p-0 text-center" style={{ textShadow: '0 0 20px rgba(240,240,240,0.2)' }}>
          MAIYA
        </h1>
        
        {/* iOS Motion Permission Button */}
        {showMotionButton && (
          <button 
            onClick={requestMotionPermission}
            className="mt-12 px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-md text-white font-mono text-[12px] md:text-[14px] tracking-[0.3em] uppercase hover:bg-white/20 transition-all duration-300 pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            [ Enable Motion Parallax ]
          </button>
        )}
      </div>

      {/* Changing Role Tag - Anchored to bottom */}
      <div className="absolute bottom-12 md:bottom-16 w-full flex justify-center items-center z-30 pointer-events-none">
        <div className="px-5 md:px-8 py-2 md:py-3 border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(123,97,255,0.15)] relative overflow-hidden">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
          <div className="h-4 md:h-5 overflow-hidden relative w-[160px] md:w-[200px] flex justify-center items-center">
            {ROLES.map((role, i) => (
              <div
                key={role}
                className={`absolute w-full text-center text-[10px] md:text-sm tracking-wider text-[#F0F0F0] transition-all duration-500 ${
                  i === roleIndex 
                    ? 'opacity-100 transform translate-y-0 blur-none' 
                    : i < roleIndex 
                      ? 'opacity-0 transform -translate-y-4 blur-sm'
                      : 'opacity-0 transform translate-y-4 blur-sm'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
