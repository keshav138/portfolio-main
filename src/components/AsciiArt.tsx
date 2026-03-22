import React, { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:ital,wght@1,400&display=swap');

  .ascii-root {
    font-family: 'Share Tech Mono', monospace;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .ascii-root pre {
    margin: 0;
    white-space: pre;
    font-family: inherit;
    font-size: 12px;
    line-height: 1.38;
    tab-size: 2;
  }

  .ascii-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.25em;
    color: #333;
    margin-bottom: 0.6rem;
    text-transform: uppercase;
  }

  /* shared tones */
  .c-d  { color: #999; }
  .c-dd { color: #bbb; }
  .c-m  { color: #ddd; }
  .c-mm { color: #eee; }
  .c-w  { color: #fff; text-shadow: 0 0 5px rgba(255,255,255,0.5); }
  .c-ww { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.8); font-weight: bold; }

  /* F1: pink → orange → yellow */
  .f1 { color: #ff2060; }
  .f2 { color: #ff6010; }
  .f3 { color: #ffaa00; }
  .f4 { color: #ffdd44; }

  /* TaskMaster: electric blue */
  .t1 { color: #0af;    }
  .t2 { color: #06d;    }
  .t3 { color: #48f;    }

  /* Superstore: amber */
  .s1 { color: #f0a030; }
  .s2 { color: #c06010; }
  .s3 { color: #804000; }

  /* IPL: blue + gold */
  .i1 { color: #4fc3f7; }
  .i2 { color: #0288d1; }
  .i3 { color: #01579b; }
  .g1 { color: #ffd600; }
  .g2 { color: #ffab00; }
  .g3 { color: #ff6f00; }

  /* blink animation for liner */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .liner-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 1rem;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .liner-cursor {
    display: inline-block;
    width: 8px;
    height: 14px;
    background: currentColor;
    animation: blink 1.1s step-start infinite;
    vertical-align: middle;
    flex-shrink: 0;
    z-index: 10;
  }

  .liner-text-container {
    position: relative;
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .liner-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-style: italic;
    letter-spacing: 0.05em;
    text-transform: lowercase;
    opacity: 0.6;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* piece container */
  .ascii-piece {
    display: flex;
    flex-direction: column;
  }

  /* typewriter */
  @keyframes typewriter {
    from { width: 0; }
    to   { width: 100%; }
  }
`;

/* ─── tiny helper ─── */
const S = ({ c, children }: { c: string, children: React.ReactNode }) => <span className={c}>{children}</span>;

/* ─── easter egg liner ─── */
function EasterEggLiner({ texts, color }: { texts: string[], color: string }) {
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleGlobalClick = () => {
      if (isVisible) {
        setIsVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    if (isVisible) {
      // Add slightly delayed so the current click doesn't trigger it immediately
      setTimeout(() => {
        window.addEventListener('click', handleGlobalClick);
      }, 10);
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(randomText);
    setIsVisible(true);
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div className="relative flex justify-end w-full mt-2" style={{ color }}>
      <span 
        onClick={handleClick}
        className="font-mono text-[12px] cursor-pointer opacity-50 hover:opacity-100 transition-opacity select-none pointer-events-auto"
        title="?"
      >
        [ ? ]
      </span>
      
      {/* Floating Surprise Text */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 max-w-[90vw] md:max-w-md w-full p-3 md:p-4 border bg-[#0a0a0a]/95 backdrop-blur-md transition-all duration-700 z-[100] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
        style={{ borderColor: color, color: '#fff', boxShadow: `0 0 20px ${color}20` }}
      >
        <div className="font-mono text-[8px] md:text-[10px] mb-1.5 md:mb-2 uppercase tracking-widest" style={{ color }}>&gt; Decrypted_Log_Fragment</div>
        <div className="font-mono text-xs md:text-sm leading-relaxed italic">
          "{currentText}"
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ART 01 — F1
══════════════════════════════════════ */
export function F1Art({ liners = [
  "there goes hamilton. again.",
  "fastest man on track. second fastest to leave mercedes.",
  "pit wall says stay out. pit wall is wrong.",
  "strategy call incoming. wrong tyres. classic.",
  "sector 3 purple. still finished p6.",
  "DRS open. gap 0.8. close enough to dream.",
  "fastest lap on the last lap. for the extra point. bold.",
  "team orders. he didn't listen. we know."
] }) {
  return (
    <div className="ascii-root ascii-piece w-full md:w-auto">
      <style>{styles}</style>
      <p className="ascii-label hidden md:block">01 · f1 performance prediction</p>
      <pre className="hidden md:block">
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  ┌───────────────────────────────────────────────────┐"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╔═════════════════════════════════════════════╗  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║"}</S><S c="f1">{"  LAP"}</S><S c="c-ww">{" 47   "}</S><S c="f2">{"S1"}</S><S c="c-mm">{":"}</S><S c="f3">{"28.1  "}</S><S c="f2">{"S2"}</S><S c="c-mm">{":"}</S><S c="f3">{"31.4  "}</S><S c="f2">{"S3"}</S><S c="c-mm">{":"}</S><S c="f3">{"19.7  "}</S><S c="f1">{"▐"}</S><S c="c-mm">{"   ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  "}</S><S c="c-w">{"─────────────────────────────────────────"}</S><S c="c-mm">{"  ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║"}</S><S c="c-mm">{"                                             ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  SPEED  "}</S><S c="f1">{"████████████████████"}</S><S c="c-mm">{"░░░░░  "}</S><S c="c-ww">{"312 km/h"}</S><S c="c-mm">{" ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  THROTTL "}</S><S c="f2">{"████████████████"}</S><S c="c-mm">{"░░░░░░░░░  "}</S><S c="c-ww">{"64 %"}</S><S c="c-mm">{"    ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  BRAKE   "}</S><S c="f3">{"████"}</S><S c="c-mm">{"░░░░░░░░░░░░░░░░░░░░  "}</S><S c="c-ww">{"18 %"}</S><S c="c-mm">{"    ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  TYRE    "}</S><S c="f1">{"▓▓▓"}</S><S c="f2">{"▓▓▓▓"}</S><S c="f3">{"▓▓▓▓▓▓▓▓▓▓▓▓▓▓  "}</S><S c="c-ww">{"+0.09s"}</S><S c="c-mm">{"  ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║                                             ║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╚═══════════════════════╗   ╔═════════════════╝  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                          │   │                    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="f1">{"━"}</S><S c="f2">{"━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"╪"}</S><S c="c-m">{"═══"}</S><S c="c-mm">{"╪"}</S><S c="f3">{"━━━━━━━━━━━━━━━"}</S><S c="f4">{"━"}</S><S c="c-mm">{"    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="f1">{"━━━━"}</S><S c="f1">{"▐▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌"}</S><S c="f2">{"━"}</S><S c="c-mm">{"╪"}</S><S c="c-m">{"═══"}</S><S c="c-mm">{"╪"}</S><S c="f3">{"━━━━━━━━━━━━━━━"}</S><S c="f4">{"━"}</S><S c="c-mm">{"    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="f1">{"━"}</S><S c="f2">{"━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"╪"}</S><S c="c-m">{"═══"}</S><S c="c-mm">{"╪"}</S><S c="f3">{"━━━━━━━━━━━━━━━"}</S><S c="f4">{"━"}</S><S c="c-mm">{"    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                          └───┘                    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  └───────────────────────────────────────────────────┘"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·"}</S>
      </pre>
      <EasterEggLiner texts={liners} color="#ff6010" />
    </div>
  );
}

/* ══════════════════════════════════════
   ART 02 — TASKMASTER
══════════════════════════════════════ */
export function TaskMasterArt({ liners = [
  "another tab. another todo list. another spiral.",
  "the tasks were due yesterday. they were always due yesterday.",
  "your manager added 6 more. in real-time.",
  "assigned to you. due in 10 minutes. enjoy.",
  "websocket open. your excuses are live.",
  "task moved to in progress. three weeks ago.",
  "notification sent. ignored. notification sent again.",
  "deadline was friday. it is tuesday. godspeed."
] }) {
  return (
    <div className="ascii-root ascii-piece w-full md:w-auto">
      <style>{styles}</style>
      <p className="ascii-label hidden md:block">02 · taskmaster — real-time task platform</p>
      <pre className="hidden md:block">
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  ┌───────────────────────────────────────────────────┐"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╔═════════════════════════════════════════════╗  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t1">{"■■■■■■■■■■■■■■■■■■"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t2">{"▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╠═════════════════════════════════════════════╣  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t1">{"■■■■■■■■"}</S><S c="t2">{"■■■■■■■■■■"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t3">{"▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╠═════════════════════════════════════════════╣  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t2">{"■■■■■■■■■■■■"}</S><S c="t1">{"■■■■■■"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║ "}</S><S c="c-w">{"▐█▌ ▐█▌ ▐█▌  "}</S><S c="t1">{"▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"}</S><S c="c-w">{"  ▐▌         "}</S><S c="c-mm">{"║  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╚══════════════════╗  ╔═══════════════════╝  "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                     ║  ║                      "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="t1">{"    ~"}</S><S c="t2">{"~"}</S><S c="t3">{"~"}</S><S c="t1">{"~"}</S><S c="t2">{"~"}</S><S c="t3">{"~"}</S><S c="t1">{"~"}</S><S c="t2">{"~"}</S><S c="c-mm">{"          ╚══╝     "}</S><S c="t3">{"~"}</S><S c="t1">{"~"}</S><S c="t2">{"~"}</S><S c="t3">{"~"}</S><S c="t1">{"~"}</S><S c="t2">{"~"}</S><S c="t3">{"~"}</S><S c="t1">{"~"}</S><S c="c-dd">{"           │"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-w">{"  ┌──────┐"}</S><S c="c-mm">{"            ▲▼            "}</S><S c="c-w">{"┌──────┐"}</S><S c="c-dd">{"     │"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-w">{"  │"}</S><S c="t1">{" USER "}</S><S c="c-w">{"│"}</S><S c="t2">{"  ◄ ─ ─  ws  ─ ─ ─ ►  "}</S><S c="c-w">{"│"}</S><S c="t1">{" USER "}</S><S c="c-w">{"│"}</S><S c="c-dd">{"     │"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-w">{"  └──────┘"}</S><S c="c-mm">{"                          "}</S><S c="c-w">{"└──────┘"}</S><S c="c-dd">{"     │"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  └───────────────────────────────────────────────────┘"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·"}</S>
      </pre>
      <EasterEggLiner texts={liners} color="#0af" />
    </div>
  );
}

/* ══════════════════════════════════════
   ART 03 — SUPERSTORE
══════════════════════════════════════ */
export function SuperstoreArt({ liners = [
  "someone in the west region bought 47 binders in january.",
  "profit is up. karen in returns doesn't care.",
  "Q4 always saves it. Q4 is lying.",
  "Q3 was fine. Q3 was not fine.",
  "the binders are back. they never left.",
  "13 regions. 1 guy dragging the average down.",
  "profit margin healthy. until you check the returns.",
  "furniture department said hold my beer."
] }) {
  return (
    <div className="ascii-root ascii-piece w-full md:w-auto">
      <style>{styles}</style>
      <p className="ascii-label hidden md:block">03 · superstore sales analytics</p>
      <pre className="hidden md:block">
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  ┌───────────────────────────────────────────────────┐"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ┌───────────────────────────────────────────┐    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │  "}</S><S c="c-w">{"JAN  FEB  MAR  APR  MAY  JUN  JUL  AUG"}</S><S c="c-mm">{"  │    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │  │    │    │    │    │    │    │    │     │    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │  "}</S><S c="s3">{"▁"}</S><S c="c-mm">{"    "}</S><S c="s3">{"▂"}</S><S c="c-mm">{"    "}</S><S c="s2">{"▃"}</S><S c="c-mm">{"    "}</S><S c="s2">{"▄"}</S><S c="c-mm">{"    "}</S><S c="s1">{"▅"}</S><S c="c-mm">{"    "}</S><S c="s1">{"▆"}</S><S c="c-mm">{"    "}</S><S c="s1">{"▇"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"     │    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │  "}</S><S c="s3">{"█"}</S><S c="c-mm">{"    "}</S><S c="s3">{"█"}</S><S c="c-mm">{"    "}</S><S c="s2">{"█"}</S><S c="c-mm">{"    "}</S><S c="s2">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"     │    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │  "}</S><S c="s3">{"█"}</S><S c="c-mm">{"    "}</S><S c="s3">{"█"}</S><S c="c-mm">{"    "}</S><S c="s2">{"█"}</S><S c="c-mm">{"    "}</S><S c="s2">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"    "}</S><S c="s1">{"█"}</S><S c="c-mm">{"     │    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  └───────────────────────────────────────────┘    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                                                   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ┌─────────────┐  ┌─────────────┐                 "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │ "}</S><S c="c-w">{"WEST  "}</S><S c="s1">{"██████"}</S><S c="c-mm">{" │  │ "}</S><S c="c-w">{"EAST  "}</S><S c="s2">{"████"}</S><S c="c-mm">{"   │                 "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │ "}</S><S c="c-w">{"CENT  "}</S><S c="s2">{"████"}</S><S c="c-mm">{"   │  │ "}</S><S c="c-w">{"SOUT  "}</S><S c="s3">{"███"}</S><S c="c-mm">{"    │                 "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  └─────────────┘  └─────────────┘                 "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                                                   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="s1">{"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="s2">{"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"            "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="s3">{"━━━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"                       "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  └───────────────────────────────────────────────────┘"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·"}</S>
      </pre>
      <EasterEggLiner texts={liners} color="#f0a030" />
    </div>
  );
}

/* ══════════════════════════════════════
   ART 04 — IPL
══════════════════════════════════════ */
export function IPLArt({ liners = [
  "top order gone for 12. crowd still believes.",
  "bumrah's yorker has no business being that good.",
  "last 2 overs. 31 needed. ms dhoni hasn't batted yet.",
  "toss jeet ke field karega. lost by 8 wickets."
] }) {
  return (
    <div className="ascii-root ascii-piece w-full md:w-auto">
      <style>{styles}</style>
      <p className="ascii-label hidden md:block">04 · ipl analytics dashboard</p>
      <pre className="hidden md:block">
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  ┌───────────────────────────────────────────────────┐"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╔═══════════════════════════════════════════╗    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  "}</S><S c="g1">{"MI"}</S><S c="c-ww">{"  182/4  "}</S><S c="c-mm">{"(18.2)   vs   "}</S><S c="i1">{"RCB"}</S><S c="c-ww">{"  179/6  "}</S><S c="c-mm">{"(20)  ║    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  "}</S><S c="g2">{"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"  ║    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  "}</S><S c="g1">{"▐█▌"}</S><S c="c-w">{" Rohit   "}</S><S c="g1">{"68"}</S><S c="c-mm">{"(42)   "}</S><S c="c-w">{"4s:"}</S><S c="g2">{"6"}</S><S c="c-w">{"  6s:"}</S><S c="g1">{"4"}</S><S c="c-w">{"  SR:"}</S><S c="g2">{"161"}</S><S c="c-mm">{"  ║    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ║  "}</S><S c="i1">{"▐█▌"}</S><S c="c-w">{" Kohli   "}</S><S c="i1">{"54"}</S><S c="c-mm">{"(38)   "}</S><S c="c-w">{"4s:"}</S><S c="i2">{"5"}</S><S c="c-w">{"  6s:"}</S><S c="i1">{"2"}</S><S c="c-w">{"  SR:"}</S><S c="i2">{"142"}</S><S c="c-mm">{"  ║    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ╚═══════════════════════════════════════════╝    "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                                                   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  ┌────────────────────┐  ┌──────────────────┐     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │"}</S><S c="c-w">{" #  TEAM   P  W  L"}</S><S c="c-mm">{"  │  │"}</S><S c="c-w">{" BOWLING  ECON"}</S><S c="c-mm">{"    │     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │"}</S><S c="g1">{" 1  MI   14 10  4"}</S><S c="c-mm">{"  │  │"}</S><S c="i1">{" Bumrah"}</S><S c="c-mm">{"  "}</S><S c="g1">{"6.2"}</S><S c="c-mm">{"     │     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │"}</S><S c="i1">{" 2  RCB  14  9  5"}</S><S c="c-mm">{"  │  │"}</S><S c="g1">{" Siraj"}</S><S c="c-mm">{"   "}</S><S c="g2">{"7.1"}</S><S c="c-mm">{"     │     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │"}</S><S c="c-w">{" 3  CSK  14  8  6"}</S><S c="c-mm">{"  │  │"}</S><S c="c-w">{" Shami"}</S><S c="c-mm">{"   "}</S><S c="c-w">{"7.8"}</S><S c="c-mm">{"     │     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  │"}</S><S c="c-w">{" 4  KKR  14  7  7"}</S><S c="c-mm">{"  │  │"}</S><S c="c-w">{" Chahal"}</S><S c="c-mm">{"  "}</S><S c="c-w">{"8.3"}</S><S c="c-mm">{"     │     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  └────────────────────┘  └──────────────────┘     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"                                                   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="g3">{"━━━━━━━━━"}</S><S c="g2">{"━━━━━━━━━━━━━"}</S><S c="g1">{"━━━━━━━━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"   "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │  "}</S><S c="i3">{"━━━━━━━━━━━━"}</S><S c="i2">{"━━━━━━━━━━━━━━━"}</S><S c="i1">{"━━━━━━━━━━━━━━━"}</S><S c="c-mm">{"     "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  │"}</S><S c="c-mm">{"  pp ─────────────── mid ────────────── death      "}</S><S c="c-dd">{"│"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"·"}</S><S c="c-dd">{"  └───────────────────────────────────────────────────┘"}</S><S c="c-m">{"  ·\n"}</S>
        <S c="c-m">{"  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·"}</S>
      </pre>
      <EasterEggLiner texts={liners} color="#ffd600" />
    </div>
  );
}

/* ══════════════════════════════════════
   DEFAULT EXPORT — all four together
══════════════════════════════════════ */
export default function AsciiArtPieces() {
  return (
    <div style={{ background: "transparent", padding: "2rem", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      <F1Art />
      <TaskMasterArt />
      <SuperstoreArt />
      <IPLArt />
    </div>
  );
}
