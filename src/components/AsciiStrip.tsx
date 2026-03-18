import React, { useEffect, useRef } from 'react';

const SHADES = ['░', '▒', '▓', '█'];
const GLITCH_CHARS = ['@', '#', '$', '%', '&', '*', '!', '?', '+', '=', '<', '>', 'X', 'Y', 'Z', '0', '1'];
const PROJECT_COLORS = [
  '#7B61FF', '#00E5FF', // Taskmaster (Purple/Cyan)
  '#FF0055', '#FFAA00', // F1 Analytics (Pink/Orange)
  '#0066FF', '#00FFCC', // Superstore (Blue/Teal)
  '#FF00FF'             // IPL Dashboard (Magenta)
];

export default function AsciiStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // 1. Pre-render the static background to an offscreen canvas for maximum performance
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;
    const bgCtx = bgCanvas.getContext('2d', { alpha: true });
    if (!bgCtx) return;
    
    bgCtx.font = ctx.font;
    bgCtx.textBaseline = ctx.textBaseline;

    const colorStops = [
      { r: 0, g: 229, b: 255 },   // #00E5FF (Cyan)
      { r: 123, g: 97, b: 255 },  // #7B61FF (Purple)
      { r: 255, g: 0, b: 85 },    // #FF0055 (Pink)
      { r: 255, g: 170, b: 0 },   // #FFAA00 (Orange)
      { r: 0, g: 255, b: 204 },   // #00FFCC (Teal)
    ];

    const cx = cols / 2;
    const cy = rows / 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const noise = Math.sin(y * 0.15) * Math.cos(x * 0.2);
        const shadeIdx = Math.floor(((noise + 1) / 2) * SHADES.length);
        const char = SHADES[Math.min(shadeIdx, SHADES.length - 1)];
        
        // Calculate concentric elliptical gradient
        const dx = x - cx;
        const dy = (y - cy) * 0.5; // Multiply by 0.5 to stretch the circles vertically into ellipses
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const ringWidth = 8; // Width of each color band
        const scaledDist = dist / ringWidth;
        const index = Math.floor(scaledDist) % colorStops.length;
        const nextIndex = (index + 1) % colorStops.length;
        const fraction = scaledDist - Math.floor(scaledDist);
        
        // Smoothly interpolate between the colors
        const r = Math.floor(colorStops[index].r + (colorStops[nextIndex].r - colorStops[index].r) * fraction);
        const g = Math.floor(colorStops[index].g + (colorStops[nextIndex].g - colorStops[index].g) * fraction);
        const b = Math.floor(colorStops[index].b + (colorStops[nextIndex].b - colorStops[index].b) * fraction);
        
        bgCtx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
        bgCtx.fillText(char, x * charWidth, y * charHeight);
      }
    }

    // 2. Pick random cells to be "blinkers"
    const blinkers: {x: number, y: number}[] = [];
    for(let i = 0; i < 40; i++) {
      blinkers.push({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      });
    }

    let isFlickering = false;
    let flickerX = -1;
    let flickerY = -1;
    let flickerEndTime = 0;
    
    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 12; // Low framerate for retro terminal feel
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (timestamp - lastDrawTime < interval) return;
      lastDrawTime = timestamp;

      // Fast copy of the static background (overwrites everything)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgCanvas, 0, 0);

      const now = Date.now();
      if (isFlickering && now > flickerEndTime) {
        isFlickering = false;
      }

      // Draw colored blinkers
      blinkers.forEach(blinker => {
        // 15% chance to blink on this specific frame
        if (Math.random() < 0.15) {
          // Clear the background character so it doesn't bleed through
          ctx.clearRect(blinker.x * charWidth, blinker.y * charHeight, charWidth, charHeight);
          
          ctx.fillStyle = PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)];
          const char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          ctx.fillText(char, blinker.x * charWidth, blinker.y * charHeight);
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

    // Start animation loop
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mix-blend-screen opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
}
