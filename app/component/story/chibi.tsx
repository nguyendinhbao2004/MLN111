"use client";

// Reusable chibi/cartoon SVG illustrations — flat style, consistent palette.
import { motion } from "framer-motion";

type Mood = "happy" | "tired" | "broken" | "balanced";

export function ChibiStudent({ mood = "happy", size = 220 }: { mood?: Mood; size?: number }) {
  const skin = "#ffd9b3";
  const hair = "#3b2a20";
  const shirt = mood === "broken" ? "#5b4b6e" : mood === "tired" ? "#7c8aa8" : mood === "balanced" ? "#6ee7b7" : "#ff7eb6";
  const pants = "#2b6cb0";
  const cheek = "#ff8fa3";
  const eyeBag = mood === "tired" || mood === "broken" ? "#6b4f6b" : "transparent";
  const mouth =
    mood === "happy" ? "M 92 122 Q 110 138 128 122" :
    mood === "balanced" ? "M 94 124 Q 110 132 126 124" :
    mood === "tired" ? "M 95 128 Q 110 124 125 128" :
    "M 95 130 Q 110 122 125 130";

  return (
    <svg viewBox="0 0 220 280" width={size} height={size * 280/220}>
      {/* shadow */}
      <ellipse cx="110" cy="268" rx="60" ry="6" fill="rgba(0,0,0,0.15)" />
      {/* legs */}
      <rect x="86" y="210" width="20" height="50" rx="6" fill={pants} />
      <rect x="114" y="210" width="20" height="50" rx="6" fill={pants} />
      <ellipse cx="96" cy="262" rx="14" ry="6" fill="#1a1a2e" />
      <ellipse cx="124" cy="262" rx="14" ry="6" fill="#1a1a2e" />
      {/* body / shirt */}
      <path d="M 60 160 Q 60 130 110 130 Q 160 130 160 160 L 155 220 Q 110 235 65 220 Z" fill={shirt} />
      {/* arms */}
      <rect x="48" y="150" width="20" height="60" rx="10" fill={shirt} />
      <rect x="152" y="150" width="20" height="60" rx="10" fill={shirt} />
      <circle cx="58" cy="212" r="11" fill={skin} />
      <circle cx="162" cy="212" r="11" fill={skin} />
      {/* head */}
      <circle cx="110" cy="90" r="50" fill={skin} />
      {/* hair */}
      <path d="M 60 90 Q 55 40 110 38 Q 165 40 160 90 Q 150 65 110 60 Q 70 65 60 90 Z" fill={hair} />
      {/* cheeks */}
      <circle cx="78" cy="108" r="7" fill={cheek} opacity="0.7" />
      <circle cx="142" cy="108" r="7" fill={cheek} opacity="0.7" />
      {/* eyes */}
      {mood === "broken" ? (
        <>
          <text x="80" y="105" fontSize="20" textAnchor="middle" fill="#1a1a2e">×</text>
          <text x="140" y="105" fontSize="20" textAnchor="middle" fill="#1a1a2e">×</text>
        </>
      ) : (
        <>
          <ellipse cx="86" cy="100" rx="6" ry={mood === "tired" ? 3 : 7} fill="#1a1a2e" />
          <ellipse cx="134" cy="100" rx="6" ry={mood === "tired" ? 3 : 7} fill="#1a1a2e" />
          <circle cx="88" cy="98" r="2" fill="#fff" />
          <circle cx="136" cy="98" r="2" fill="#fff" />
        </>
      )}
      {/* eyebags */}
      <path d="M 78 110 Q 86 116 94 110" stroke={eyeBag} strokeWidth="2" fill="none" />
      <path d="M 126 110 Q 134 116 142 110" stroke={eyeBag} strokeWidth="2" fill="none" />
      {/* mouth */}
      <path d={mouth} stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function FloatingIcon({ src, alt, x, y, delay = 0, className = "" }: { src: string; alt: string; x: string; y: string; delay?: number; className?: string }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute select-none story-icon ${className}`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      loading="lazy"
      decoding="async"
    />
  );
}

export function CloudSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className}>
      <path d="M40 60 Q20 60 20 45 Q20 30 40 32 Q45 15 70 20 Q90 5 110 22 Q140 15 145 38 Q170 35 170 55 Q170 70 150 70 L50 70 Q40 70 40 60 Z" fill="white" opacity="0.95" />
    </svg>
  );
}

export function GearSVG({ size = 200, color = "#94a3b8" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <g fill={color}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="46" y="2" width="8" height="14" rx="2" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="14" fill="#fff8e7" />
      </g>
    </svg>
  );
}
