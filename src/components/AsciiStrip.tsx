import React, { useEffect, useRef } from 'react';

const SHADES = ['░', '▒', '▓', '█'];
const GLITCH_CHARS = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '=', '<', '>', 'X', 'Y', 'Z', '0', '1'];
const PROJECT_COLORS = [
  '#7B61FF', '#00E5FF', // Taskmaster (Purple/Cyan)
  '#FF0055', '#FFAA00', // F1 Analytics (Pink/Orange)
  '#0066FF', '#00FFCC', // Superstore (Blue/Teal)
  '#FF00FF'             // IPL Dashboard (Magenta)
];

interface ColorStop {
  r: number;
  g: number;
  b: number;
}

interface AsciiStripProps {
  colorStops?: ColorStop[];
}

const TARGET_LENGTH = 6;

function normalizeColorStops(stops: ColorStop[]): ColorStop[] {
  const normalized: ColorStop[] = [];
  for (let i = 0; i < TARGET_LENGTH; i++) {
    const t = i / (TARGET_LENGTH - 1);
    const exactIdx = t * (stops.length - 1);
    const idx = Math.floor(exactIdx);
    const nextIdx = Math.min(idx + 1, stops.length - 1);
    const fraction = exactIdx - idx;
    
    normalized.push({
      r: stops[idx].r + (stops[nextIdx].r - stops[idx].r) * fraction,
      g: stops[idx].g + (stops[nextIdx].g - stops[idx].g) * fraction,
      b: stops[idx].b + (stops[nextIdx].b - stops[idx].b) * fraction,
    });
  }
  return normalized;
}

export default function AsciiStrip({ colorStops: propColorStops }: AsciiStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColorsRef = useRef<ColorStop[]>([]);
  const currentColorsRef = useRef<ColorStop[]>([]);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize colors
  useEffect(() => {
    const defaultColorStops = [
      { r: 0, g: 229, b: 255 },   // #00E5FF (Cyan)
      { r: 123, g: 97, b: 255 },  // #7B61FF (Purple)
      { r: 255, g: 0, b: 85 },    // #FF0055 (Pink)
      { r: 255, g: 170, b: 0 },   // #FFAA00 (Orange)
      { r: 0, g: 255, b: 204 },   // #00FFCC (Teal)
    ];
    const initial = normalizeColorStops(propColorStops || defaultColorStops);
    targetColorsRef.current = initial;
    currentColorsRef.current = JSON.parse(JSON.stringify(initial));
  }, []);

  // Update target colors when prop changes
  useEffect(() => {
    if (propColorStops) {
      targetColorsRef.current = normalizeColorStops(propColorStops);
    }
  }, [propColorStops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const cols = 28;
    const rows = 60;
    const charWidth = 16;
    const charHeight = 18;

    canvas.width = cols * charWidth;
    canvas.height = rows * charHeight;

    ctx.font = `bold ${charHeight}px monospace`;
    ctx.textBaseline = 'top';

    // Create offscreen canvas for background
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;
    const bgCtx = bgCanvas.getContext('2d', { alpha: true });
    if (!bgCtx) return;
    bgCanvasRef.current = bgCanvas;

    const renderBackground = (colors: ColorStop[]) => {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.font = ctx.font;
      bgCtx.textBaseline = ctx.textBaseline;

      const cx = cols / 2;
      const cy = rows / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const noise = Math.sin(y * 0.15) * Math.cos(x * 0.2);
          const shadeIdx = Math.floor(((noise + 1) / 2) * SHADES.length);
          const char = SHADES[Math.min(shadeIdx, SHADES.length - 1)];
          
          const dx = x - cx;
          const dy = (y - cy) * 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const ringWidth = 8;
          const scaledDist = dist / ringWidth;
          const index = Math.floor(scaledDist) % colors.length;
          const nextIndex = (index + 1) % colors.length;
          const fraction = scaledDist - Math.floor(scaledDist);
          
          const r = Math.floor(colors[index].r + (colors[nextIndex].r - colors[index].r) * fraction);
          const g = Math.floor(colors[index].g + (colors[nextIndex].g - colors[index].g) * fraction);
          const b = Math.floor(colors[index].b + (colors[nextIndex].b - colors[index].b) * fraction);
          
          bgCtx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
          bgCtx.fillText(char, x * charWidth, y * charHeight);
        }
      }
    };

    // Initial render
    renderBackground(currentColorsRef.current);

    const blinkers: {x: number, y: number, char: string, color: string, active: boolean}[] = [];
    for(let i = 0; i < 40; i++) {
      blinkers.push({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        char: '',
        color: '',
        active: false
      });
    }

    let isFlickering = false;
    let flickerX = -1;
    let flickerY = -1;
    let flickerEndTime = 0;
    
    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      // 1. Smooth Color Interpolation (60 FPS)
      let colorsChanged = false;
      const lerpSpeed = 0.04; 
      
      for (let i = 0; i < TARGET_LENGTH; i++) {
        const curr = currentColorsRef.current[i];
        const target = targetColorsRef.current[i];
        if (!curr || !target) continue;

        const dr = (target.r - curr.r) * lerpSpeed;
        const dg = (target.g - curr.g) * lerpSpeed;
        const db = (target.b - curr.b) * lerpSpeed;

        if (Math.abs(dr) > 0.01 || Math.abs(dg) > 0.01 || Math.abs(db) > 0.01) {
          curr.r += dr;
          curr.g += dg;
          curr.b += db;
          colorsChanged = true;
        } else {
          curr.r = target.r;
          curr.g = target.g;
          curr.b = target.b;
        }
      }

      if (colorsChanged) {
        renderBackground(currentColorsRef.current);
      }

      // 2. Throttled State Updates (12 FPS)
      const shouldUpdateRetroState = (timestamp - lastDrawTime >= interval);
      if (shouldUpdateRetroState) {
        lastDrawTime = timestamp;

        // Update blinkers
        blinkers.forEach(blinker => {
          if (Math.random() < 0.15) {
            blinker.active = true;
            blinker.color = PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)];
            blinker.char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          } else {
            blinker.active = false;
          }
        });

        const now = Date.now();
        if (isFlickering && now > flickerEndTime) {
          isFlickering = false;
        }
      }

      // 3. Constant Rendering (60 FPS)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgCanvas, 0, 0);

      // Draw active blinkers
      blinkers.forEach(blinker => {
        if (blinker.active) {
          ctx.clearRect(blinker.x * charWidth, blinker.y * charHeight, charWidth, charHeight);
          ctx.fillStyle = blinker.color;
          ctx.fillText(blinker.char, blinker.x * charWidth, blinker.y * charHeight);
        }
      });

      // Draw click flicker diamond
      if (isFlickering) {
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            if (Math.abs(dx) + Math.abs(dy) <= 4) {
              const x = flickerX + dx;
              const y = flickerY + dy;
              if (x >= 0 && x < cols && y >= 0 && y < rows) {
                ctx.clearRect(x * charWidth, y * charHeight, charWidth, charHeight);
                ctx.fillStyle = Math.random() > 0.5 ? '#96FFFF' : '#7B61FF'; 
                const char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                ctx.fillText(char, x * charWidth, y * charHeight);
              }
            }
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleWindowClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const gridX = Math.floor(x / charWidth);
      const gridY = Math.floor(y / charHeight);

      if (gridX >= -10 && gridX <= cols + 10 && gridY >= -10 && gridY <= rows + 10) {
        flickerX = Math.max(0, Math.min(cols - 1, gridX));
        flickerY = Math.max(0, Math.min(rows - 1, gridY));
        flickerEndTime = Date.now() + 400;
        isFlickering = true;
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array to keep the loop running

  return (
    <canvas
      ref={canvasRef}
      className="mix-blend-screen opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
}
