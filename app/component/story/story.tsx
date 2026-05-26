"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChibiStudent, FloatingIcon, CloudSVG, GearSVG } from "./chibi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/component/ui/carousel";
import { Card, CardContent } from "@/component/ui/card";
import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, BookOpen, Check, Flame, Scale, TrendingDown, Zap, Brain } from "lucide-react";

// ---------- Helpers ----------
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const RAIN_DROPS = Array.from({ length: 80 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `-${Math.random() * 50}%`,
  duration: 0.5 + Math.random() * 0.8,
  delay: Math.random() * 2,
}));

function StatBar({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const numberRef = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);

  useMotionValueEvent(count, "change", latest => {
    if (numberRef.current) {
      numberRef.current.textContent = `${Math.round(latest)}%`;
    }
  });

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.1 + delay * 0.3, ease: "easeOut" });
    return () => controls.stop();
  }, [count, inView, value, delay]);
  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between text-sm font-semibold mb-1 text-slate-700">
        <span>{label}</span>
        <span ref={numberRef} className="text-slate-500">0%</span>
      </div>
      <div className="h-3 rounded-full bg-black/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------- Section 1: HERO ----------
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden story-section" style={{ background: "linear-gradient(180deg, #87ceeb 0%, #b8e3ff 50%, #fff8d6 100%)" }}>
      {/* clouds */}
      <motion.div className="absolute top-10 left-0 w-40" animate={{ x: ["-10vw", "110vw"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        <CloudSVG className="w-full" />
      </motion.div>
      <motion.div className="absolute top-32 left-0 w-32" animate={{ x: ["-10vw", "110vw"] }} transition={{ duration: 55, repeat: Infinity, ease: "linear", delay: 5 }}>
        <CloudSVG className="w-full" />
      </motion.div>
      <motion.div className="absolute top-20 left-0 w-24" animate={{ x: ["-10vw", "110vw"] }} transition={{ duration: 65, repeat: Infinity, ease: "linear", delay: 15 }}>
        <CloudSVG className="w-full" />
      </motion.div>

      {/* sun */}
      <motion.div className="absolute top-12 right-16 w-28 h-28 rounded-full" style={{ background: "radial-gradient(circle, #fff176, #ffb300)" }} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_30px_rgba(255,213,79,0.6)]" />
      </motion.div>

      {/* university silhouette */}
      <svg viewBox="0 0 1200 200" className="absolute bottom-0 w-full" preserveAspectRatio="none">
        <path d="M0,200 L0,140 L100,140 L100,100 L160,60 L220,100 L220,140 L350,140 L350,90 L420,40 L490,90 L490,140 L650,140 L650,80 L750,30 L850,80 L850,140 L1000,140 L1000,110 L1080,70 L1160,110 L1160,140 L1200,140 L1200,200 Z" fill="#9ed7ff" opacity="0.6" />
        <path d="M0,200 L0,160 L1200,160 L1200,200 Z" fill="#7ec850" />
      </svg>

      {/* floating icons */}
      <FloatingIcon x="10%" y="25%" delay={0} src="/icons/trophy.svg" alt="Thành tích" />
      <FloatingIcon x="85%" y="30%" delay={0.5} src="/icons/book.svg" alt="Kiến thức" />
      <FloatingIcon x="15%" y="55%" delay={1} src="/icons/money.svg" alt="Tài chính" />
      <FloatingIcon x="82%" y="58%" delay={1.5} src="/icons/clock.svg" alt="Thời gian" />
      <FloatingIcon x="25%" y="70%" delay={0.8} src="/icons/spark.svg" alt="Cảm hứng" />
      <FloatingIcon x="75%" y="72%" delay={1.2} src="/icons/target.svg" alt="Mục tiêu" />
      <FloatingIcon x="50%" y="20%" delay={2} src="/icons/grade.svg" alt="Thành tích học tập" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 text-sm font-semibold text-pink-600 backdrop-blur">
            <img src="/icons/book.svg" alt="" className="story-icon story-icon-xs" loading="lazy" decoding="async" />
            TRIẾT HỌC MÁC – LÊNIN · CHƯƠNG II   
          </span>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-bold mt-6 text-transparent bg-clip-text"
          style={{ backgroundImage: "linear-gradient(90deg, #ff6b6b, #ffa600, #ff6bcb)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          HUSTLE = THÀNH CÔNG?
        </motion.h1>
        <motion.p className="mt-4 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Câu chuyện về sinh viên T và góc nhìn từ <b>phép biện chứng duy vật</b>
        </motion.p>

        <motion.div className="flex justify-center mt-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="float-y">
            <ChibiStudent mood="happy" size={240} />
          </div>
        </motion.div>

        <motion.button
          onClick={() => scrollToId("year1")}
          className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        >
          Bắt đầu đọc nhật ký
        </motion.button>

        <motion.div className="mt-12 text-slate-500" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          ↓ Cuộn xuống
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Section 2: Year 1 ----------
function Year1Section() {
  return (
    <section id="year1" className="relative min-h-screen py-12 px-6 flex items-center justify-center story-section" style={{ background: "linear-gradient(180deg, #fff8d6 0%, #ffe9b3 100%)" }}>
      <div className="max-w-6xl w-full mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-amber-700" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Nhật ký Năm Nhất
        </motion.h2>
        <p className="text-center mt-2 text-amber-600">Khi mọi thứ còn rất tươi sáng…</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
          {/* left illustration */}
          <motion.div className="relative" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 relative">
              <div className="flex justify-center"><ChibiStudent mood="happy" size={180} /></div>
              <div className="flex justify-around mt-4">
                <motion.img src="/icons/smile.svg" alt="Tự tin" className="story-icon story-icon-md"
                  animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} loading="lazy" decoding="async" />
                <motion.img src="/icons/book.svg" alt="Học tập" className="story-icon story-icon-md"
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} loading="lazy" decoding="async" />
                <motion.img src="/icons/money.svg" alt="Tài chính" className="story-icon story-icon-md"
                  animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity }} loading="lazy" decoding="async" />
                <motion.img src="/icons/coffee.svg" alt="Thức khuya" className="story-icon story-icon-md"
                  animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity }} loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>

          {/* right diary */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-xl border-l-8 border-amber-400 font-handwritten">
              <div className="text-sm text-amber-600 mb-1">Ngày đầu đại học</div>
              <p className="text-base leading-relaxed text-slate-800 italic">
                &ldquo;Muốn thành công phải <b className="text-pink-600">Hustle</b>.
                Mình đăng ký <b>2 văn bằng</b>.
                Ban ngày đi học.
                Ban đêm làm thêm đến <b>12h đêm</b>.&rdquo;
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 mt-4 shadow-lg space-y-3">
              <h4 className="font-bold text-slate-800">Dashboard</h4>
              <StatBar label="Thành công" value={20} color="#10b981" />
              <StatBar label="Sức khỏe" value={100} color="#ef4444" delay={0.1} />
              <StatBar label="Giấc ngủ" value={90} color="#3b82f6" delay={0.2} />
              <StatBar label="Áp lực" value={10} color="#f59e0b" delay={0.3} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 3: Year 2-3 ----------
function Year23Section() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const runX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} id="year23" className="relative min-h-screen py-12 px-6 flex items-center justify-center overflow-hidden story-section" style={{ background: "linear-gradient(180deg, #ffe9b3 0%, #f3a683 100%)" }}>
      {/* gear backgrounds */}
      <div className="absolute -top-20 -left-20 opacity-20 spin-slow"><GearSVG size={400} color="#7c4f1d" /></div>
      <div className="absolute -bottom-20 -right-20 opacity-20 spin-slow" style={{ animationDirection: "reverse" }}><GearSVG size={350} color="#7c4f1d" /></div>
      <div className="absolute top-1/2 right-10 opacity-10 spin-fast"><GearSVG size={200} color="#1a1a2e" /></div>

      <div className="relative max-w-6xl w-full mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-orange-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Năm 2 – Năm 3
        </motion.h2>
        <p className="text-center text-xl text-orange-800 mt-2 font-semibold">&ldquo;Guồng quay tăng tốc&rdquo;</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
          {/* treadmill */}
          <div className="relative h-60 flex items-end justify-center">
            <motion.div style={{ x: runX }}>
              <ChibiStudent mood="tired" size={160} />
            </motion.div>
            {/* treadmill */}
            <div className="absolute bottom-0 w-full h-6 bg-slate-700 rounded-full overflow-hidden">
              <motion.div className="h-full w-[200%] bg-[repeating-linear-gradient(90deg,#475569_0,#475569_20px,#334155_20px,#334155_40px)]" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            </div>
            {/* bubbles */}
            {["Học","Làm","Học","Làm","Làm","Học"].map((w,i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full px-2 py-0.5 text-xs font-bold text-orange-700 shadow-lg"
                style={{ left: `${10 + i * 14}%`, top: `${5 + (i%3)*15}%` }}
                animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {w}
              </motion.div>
            ))}
          </div>

          {/* diary + stats */}
          <div>
            <motion.div className="bg-orange-50 rounded-2xl p-6 shadow-xl border-l-8 border-orange-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-base italic text-slate-800">
                &ldquo;Mình hơi mệt…<br/>nhưng cố thêm chút nữa <b>chắc ổn</b>&rdquo;
              </p>
            </motion.div>
            <div className="bg-white/80 rounded-2xl p-4 mt-4 shadow-lg space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                Dashboard
                <motion.img src="/icons/clock.svg" alt="" className="story-icon story-icon-xs"
                  animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} loading="lazy" decoding="async" />
              </h4>
              <StatBar label="Thành công" value={70} color="#10b981" />
              <StatBar label="Sức khỏe" value={65} color="#f59e0b" delay={0.1} />
              <StatBar label="Giấc ngủ" value={40} color="#ef4444" delay={0.2} />
              <StatBar label="Áp lực" value={70} color="#dc2626" delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Final year - breaking point ----------
/** Scroll progress 1 ≈ section snapped with title at top (see useScroll offset). */
const NODAL_ENGAGE_PROGRESS = 0.9;
const NODAL_LEAVE_PROGRESS = 0.15;

function isNodalEngaged(progress: number) {
  return progress >= NODAL_ENGAGE_PROGRESS && progress <= 1.05;
}

function FinalYearSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const [sectionEngaged, setSectionEngaged] = useState(false);
  const [stressVal, setStressVal] = useState(0);
  const [overload, setOverload] = useState(false);
  const [unlockScroll, setUnlockScroll] = useState(false);
  const nodalActive = stressVal >= 100 && !unlockScroll;
  const touchStartY = useRef<number | null>(null);
  const hijackScroll = sectionEngaged && !unlockScroll && !overload;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const engaged = isNodalEngaged(latest);
    setSectionEngaged(engaged);

    if (latest >= NODAL_LEAVE_PROGRESS) return;
    setUnlockScroll(false);
    setOverload(false);
    setStressVal(0);
  });

  useEffect(() => {
    setSectionEngaged(isNodalEngaged(scrollYProgress.get()));
  }, [scrollYProgress]);

  useEffect(() => {
    if (!unlockScroll && stressVal >= 100 && sectionEngaged && !overload) setOverload(true);
  }, [stressVal, overload, unlockScroll, sectionEngaged]);

  useEffect(() => {
    const active = nodalActive && sectionEngaged;
    document.body.classList.toggle("nodal-shake", active);
    return () => document.body.classList.remove("nodal-shake");
  }, [nodalActive, sectionEngaged]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (overload) {
        event.preventDefault();
        return;
      }
      if (!hijackScroll) return;
      if (event.deltaY <= 0) return;
      event.preventDefault();
      const step = Math.min(event.deltaY / 12, 6);
      setStressVal(prev => Math.min(100, prev + step));
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null) return;
      if (overload) {
        event.preventDefault();
        return;
      }
      if (!hijackScroll) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      if (delta <= 0) return;
      event.preventDefault();
      const step = Math.min(delta / 20, 6);
      setStressVal(prev => Math.min(100, prev + step));
      touchStartY.current = currentY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [hijackScroll, overload]);

  useEffect(() => {
    document.body.classList.toggle("scroll-locked", overload);
    return () => document.body.classList.remove("scroll-locked");
  }, [overload]);

  return (
    <section ref={ref} id="final" className={`relative min-h-screen py-12 px-6 flex items-center justify-center overflow-hidden text-slate-100 nodal-zone story-section ${nodalActive && sectionEngaged ? "nodal-active" : ""}`} style={{ background: "linear-gradient(180deg, #4a3a5e 0%, #1a1a2e 100%)" }}>
      {/* rain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {RAIN_DROPS.map((drop, i) => (
          <div
            key={i}
            className="absolute w-px h-8 bg-blue-300/40"
            style={{ left: drop.left, top: drop.top, animation: `rain ${drop.duration}s linear infinite`, animationDelay: `${drop.delay}s` }}
          />
        ))}
      </div>

      <div className={`relative z-10 max-w-6xl w-full mx-auto ${overload ? "shake" : ""}`}>
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-red-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Năm Cuối — Điểm Nút
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
          <div className="relative h-80 flex items-center justify-center">
            {/* flying books */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.img
                key={i}
                src="/icons/book.svg"
                alt="Sách"
                className="absolute story-icon story-icon-md icon-light"
                animate={{
                  x: [Math.cos(i)*100, Math.cos(i+2)*150, Math.cos(i)*100],
                  y: [Math.sin(i)*80, Math.sin(i+2)*120, Math.sin(i)*80],
                  rotate: [0, 360],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                loading="lazy"
                decoding="async"
              />
            ))}
            <div className="relative z-10">
              <ChibiStudent mood="broken" size={180} />
            </div>
          </div>

          <div>
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 border-l-8 border-red-500 shadow-2xl">
              <p className="text-base italic">
                &ldquo;Mình không ngủ được.<br/>
                Nhìn thấy sách là <b className="text-red-400">buồn nôn</b>.<br/>
                Mình thấy <b className="text-red-400">trống rỗng</b>…&rdquo;
              </p>
            </div>
            <div className="bg-slate-900/80 rounded-2xl p-4 mt-4 space-y-3 border border-red-900">
              <h4 className="font-bold text-red-300">Dashboard</h4>
              <StatBar label="Thành công" value={95} color="#10b981" />
              <StatBar label="Sức khỏe" value={15} color="#dc2626" delay={0.1} />
              <StatBar label="Giấc ngủ" value={5} color="#7f1d1d" delay={0.2} />
              <StatBar label="Áp lực" value={99} color="#fb7185" delay={0.3} />
            </div>

            {/* stress meter */}
            <div className="mt-6 bg-black/40 rounded-2xl p-4 border border-red-700">
              <div className="flex justify-between font-bold text-red-300 mb-2 text-sm">
                <span>STRESS METER</span>
                <span>{stressVal} / 100</span>
              </div>
              <div className="h-6 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${stressVal}%` }}
                  transition={{ duration: 0.2, ease: "linear" }}
                  style={{ background: "linear-gradient(90deg, #fbbf24, #ef4444, #b91c1c)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {overload && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 glitch"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => {
                setOverload(false);
                setUnlockScroll(true);
              }}
            >
              <div className="text-center">
                <div className="text-6xl md:text-8xl font-bold text-red-500 tracking-widest">SYSTEM</div>
                <div className="text-6xl md:text-8xl font-bold text-red-500 tracking-widest mt-2">OVERLOAD</div>
                <div className="text-sm text-slate-400 mt-6">(Bấm để tiếp tục)</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ---------- Section 5: Doctor analysis ----------
function DoctorSection() {
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setLoading(false), 2500);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section ref={ref} id="doctor" className="relative min-h-screen py-12 px-6 flex items-center justify-center text-slate-100 story-section" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" }}>
      <div className="max-w-5xl w-full mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-cyan-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Phòng tư vấn tâm lý
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12 items-center">
          <div className="bg-cyan-950/40 rounded-3xl p-6 border border-cyan-700 relative">
            {/* doctor */}
            <div className="flex justify-center"><ChibiStudent mood="balanced" size={160} /></div>
            <div className="text-center mt-3 text-cyan-300 font-semibold">Bác sĩ tâm lý</div>
            <div className={`absolute -top-3 -right-3 text-white rounded-full px-3 py-1 text-xs font-bold ${loading ? 'bg-cyan-500 animate-pulse' : 'bg-green-500'}`}>
              {loading ? "Đang phân tích…" : "Đã phân tích xong"}
            </div>
          </div>

          <div className="bg-black/40 rounded-2xl p-6 border border-cyan-800 font-mono text-sm">
            <div className="text-cyan-400 mb-3">▶ AI ANALYZER v2.0</div>
            {loading ? (
              <div className="space-y-2 text-cyan-200">
                <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1, repeat: Infinity }}>Đang quét dữ liệu cảm xúc…</motion.div>
                <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}>Phân tích hành vi…</motion.div>
                <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>Tìm kiếm quy luật…</motion.div>
                <div className="h-1 bg-cyan-900 rounded-full mt-4 overflow-hidden">
                  <motion.div className="h-full bg-cyan-400" animate={{ width: ["0%","100%"] }} transition={{ duration: 2.5 }} />
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-green-400 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" aria-hidden />
                  Phân tích hoàn tất.
                </div>
                <div className="text-white mt-3 font-sans text-sm">
                  Nguyên nhân được xác định qua <b className="text-cyan-300">PHÉP BIỆN CHỨNG DUY VẬT</b>:
                  <ol className="list-decimal ml-5 mt-2 space-y-1 text-cyan-100">
                    <li>Quy luật Lượng → Chất</li>
                    <li>Thống nhất & đấu tranh giữa các mặt đối lập</li>
                    <li>Phủ định của phủ định</li>
                  </ol>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 6: Quantity -> Quality ----------
function QuantityQualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fill = useTransform(scrollYProgress, [0.2, 0.6], [0, 110]);
  const [val, setVal] = useState(0);
  const [exploded, setExploded] = useState(false);
  useEffect(() => fill.on("change", v => { setVal(v); if (v > 100 && !exploded) setExploded(true); }), [fill, exploded]);

  return (
    <section ref={ref} id="law1" className="relative min-h-screen py-12 px-6 flex items-center justify-center text-slate-100 story-section" style={{ background: "linear-gradient(180deg, #16213e 0%, #0f3460 100%)" }}>
      <div className="max-w-6xl w-full mx-auto">
        <motion.h2 className="text-3xl md:text-5xl font-bold text-center text-yellow-300" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          QUY LUẬT LƯỢNG → CHẤT
        </motion.h2>
        <p className="text-center text-cyan-200 mt-2 text-lg">Khi lượng tích lũy đủ, chất sẽ thay đổi</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8 items-center">
          {/* cup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* drops */}
              {Array.from({length:6}).map((_,i) => (
                <motion.div key={i} className="absolute left-1/2 -translate-x-1/2 w-3 h-4 rounded-full bg-cyan-300"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: [-40, 60], opacity: [0,1,0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i*0.4 }}
                  style={{ top: 0 }}
                />
              ))}
              {/* cup */}
              <svg viewBox="0 0 200 240" width="180">
                <path d="M40 50 L160 50 L150 220 Q100 235 50 220 Z" fill="none" stroke="#fff" strokeWidth="5" />
                <clipPath id="cupclip">
                  <path d="M44 54 L156 54 L147 218 Q100 232 53 218 Z" />
                </clipPath>
                <g clipPath="url(#cupclip)">
                  <rect x="40" y={240 - Math.min(val,100)*1.8} width="120" height="240" fill="url(#water)" />
                </g>
                <defs>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#67e8f9" />
                    <stop offset="1" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
              </svg>
              {exploded && (
                <motion.div className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }} animate={{ scale: [0, 2.5, 2], opacity: [1, 0.6] }} transition={{ duration: 1 }}>
                  <img src="/icons/burst.svg" alt="Bước nhảy" className="story-icon story-icon-xl icon-light" loading="lazy" decoding="async" />
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-cyan-700">
              <h4 className="font-bold text-yellow-300 text-lg mb-2">Lượng công việc tăng dần:</h4>
              <ul className="space-y-1 text-cyan-100 text-base">
                <li>• Học thêm & Làm thêm</li>
                <li>• Thiếu ngủ & Áp lực dồn nén</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-xl p-4 border border-red-500">
              <div className="text-sm text-amber-300 mb-1">→ Đến điểm giới hạn (điểm nút)</div>
              <div className="text-xl font-bold">Sự thay đổi về <span className="text-red-400">CHẤT</span> xuất hiện</div>
              <p className="text-sm text-amber-100 mt-2 leading-relaxed">
                Khi lượng (stress, thiếu ngủ) tích lũy tới &ldquo;Điểm nút&rdquo;, một &ldquo;Bước nhảy&rdquo; đột ngột xảy ra, biến đổi từ Sinh viên năng động → Sinh viên kiệt quệ.
              </p>
              <div className="mt-3 flex items-center justify-around text-center">
                <div className="flex flex-col items-center">
                  <img src="/icons/smile.svg" alt="Sinh viên năng động" className="story-icon story-icon-md" loading="lazy" decoding="async" />
                  <div className="text-sm mt-1 text-green-300">Sinh viên<br/>năng động</div>
                </div>
                <div className="text-3xl text-red-400 font-bold mx-2">→</div>
                <div className="flex flex-col items-center">
                  <img src="/icons/burst.svg" alt="Sinh viên kiệt quệ" className="story-icon story-icon-md icon-light" loading="lazy" decoding="async" />
                  <div className="text-sm mt-1 text-red-300">Sinh viên<br/>kiệt quệ</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1"><span>Thanh stress (lượng)</span><span className="text-slate-300">{Math.min(Math.round(val),100)}%</span></div>
              <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full" style={{ width: `${Math.min(val,100)}%`, background: "linear-gradient(90deg,#fbbf24,#ef4444)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 7: Opposites ----------
function OppositesSection() {
  return (
    <section id="law2" className="relative min-h-screen py-12 px-6 flex items-center justify-center text-white overflow-hidden story-section" style={{ background: "#0f0f1e" }}>
      <div className="max-w-5xl w-full mx-auto">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          THỐNG NHẤT & ĐẤU TRANH<br/><span className="text-pink-400">CỦA CÁC MẶT ĐỐI LẬP</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 mt-8 relative min-h-[300px]">
          {/* left - success */}
          <motion.div className="rounded-2xl p-6 text-center flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
            animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <motion.img src="/icons/trophy.svg" alt="Thành công" className="story-icon story-icon-md"
              animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} loading="lazy" decoding="async" />
            <div className="text-xl font-bold mt-2">THÀNH CÔNG</div>
            <div className="mt-1 text-amber-900 text-sm">Khát vọng • Mục tiêu</div>
          </motion.div>

          {/* right - health */}
          <motion.div className="rounded-2xl p-6 text-center flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            animate={{ x: [0, -5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <motion.img src="/icons/heart.svg" alt="Sức khỏe" className="story-icon story-icon-md"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }} loading="lazy" decoding="async" />
            <div className="text-xl font-bold mt-2">SỨC KHỎE</div>
            <div className="mt-1 text-red-100 text-sm">Thể chất • Tinh thần</div>
          </motion.div>

          {/* center swords */}
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{ rotate: [-15, 15, -15], scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
            <img src="/icons/burst.svg" alt="Xung đột" className="story-icon story-icon-lg icon-light" loading="lazy" decoding="async" />
          </motion.div>

          {/* clash effects */}
          {[...Array(8)].map((_,i)=>(
            <motion.div key={i} className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-yellow-300"
              animate={{ x: Math.cos(i*Math.PI/4)*80, y: Math.sin(i*Math.PI/4)*80, opacity: [1,0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i*0.05 }}
            />
          ))}
        </div>

        <motion.div className="mt-8 bg-white/5 rounded-2xl p-6 border border-pink-500/40 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-pink-300 font-bold text-lg">Mâu thuẫn:</div>
          <div className="text-xl mt-1">Khát vọng thành công <span className="text-yellow-300">VS</span> Giới hạn thể chất & tinh thần</div>
          <p className="mt-2 text-slate-300 text-sm">
            Ban đầu 2 mặt này &ldquo;thống nhất&rdquo;, nhưng sau đó &ldquo;đấu tranh&rdquo; gay gắt, dẫn đến sự sụp đổ. Mâu thuẫn phát triển đến đỉnh điểm → <b className="text-red-400">khủng hoảng</b>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Section 8: Negation of negation ----------
/** viewBox coords — cards use the same % mapping as the SVG (preserveAspectRatio="none"). */
const SPIRAL_VB = { w: 1000, h: 540 };

type VbPoint = { x: number; y: number };

function vbToPercent({ x, y }: VbPoint) {
  return {
    left: `${(x / SPIRAL_VB.w) * 100}%`,
    top: `${(y / SPIRAL_VB.h) * 100}%`,
  };
}

/** Cubic segment junctions = inflection points on the upward spiral. */
const SPIRAL_NODES = {
  start: { x: 90, y: 485 },
  hustle: { x: 800, y: 355 },
  collapse: { x: 118, y: 272 },
  insight: { x: 498, y: 162 },
  end: { x: 872, y: 46 },
} as const;

const SPIRAL_SEGMENTS = [
  { c1: { x: 420, y: 520 }, c2: { x: 900, y: 430 }, to: SPIRAL_NODES.hustle },
  { c1: { x: 700, y: 230 }, c2: { x: 50, y: 380 }, to: SPIRAL_NODES.collapse },
  // Gentle upward arc: Sụp đổ → Nhận thức mới → Cân bằng (C¹ at insight)
  { c1: { x: 228, y: 238 }, c2: { x: 392, y: 182 }, to: SPIRAL_NODES.insight },
  { c1: { x: 604, y: 142 }, c2: { x: 798, y: 78 }, to: SPIRAL_NODES.end },
] as const;

const SPIRAL_PATH_D = [
  `M ${SPIRAL_NODES.start.x} ${SPIRAL_NODES.start.y}`,
  ...SPIRAL_SEGMENTS.map(
    (s) => `C ${s.c1.x} ${s.c1.y}, ${s.c2.x} ${s.c2.y}, ${s.to.x} ${s.to.y}`,
  ),
].join(" ");

/** Card display position (may differ slightly from path junction). */
const INSIGHT_CARD_POS = { x: 530, y: 150 };

function cubicMidpoint(p0: VbPoint, p1: VbPoint, p2: VbPoint, p3: VbPoint): VbPoint {
  return {
    x: 0.125 * p0.x + 0.375 * p1.x + 0.375 * p2.x + 0.125 * p3.x,
    y: 0.125 * p0.y + 0.375 * p1.y + 0.375 * p2.y + 0.125 * p3.y,
  };
}

const NegationOfNegation = () => {
  const steps: {
    icon: LucideIcon;
    title: string;
    description: string;
    position: { left: string; top: string };
    place: string;
    width: string;
    cardColor: string;
    z: number;
    glitch?: boolean;
  }[] = [
    {
      icon: BookOpen,
      title: "Sinh viên bình thường",
      description: "Một khởi đầu đơn giản, tập trung vào việc học.",
      position: vbToPercent(SPIRAL_NODES.start),
      place: "translate(-58%, -48%)",
      width: "w-[min(100%,12.5rem)] sm:w-80",
      cardColor: "bg-indigo-950/90 border-indigo-700 text-slate-200",
      z: 10,
    },
    {
      icon: Zap,
      title: "Hustle cực đoan",
      description: "Chuyển sang trạng thái học tập và làm việc không ngừng nghỉ.",
      position: vbToPercent(SPIRAL_NODES.hustle),
      place: "translate(-42%, -52%)",
      width: "w-[min(100%,12.5rem)] sm:w-110",
      cardColor: "bg-emerald-950/90 border-emerald-700 text-emerald-100",
      z: 10,
    },
    {
      icon: TrendingDown,
      title: "Sụp đổ",
      description: "Hệ quả của việc vượt quá giới hạn dẫn đến kiệt quệ.",
      position: vbToPercent(SPIRAL_NODES.collapse),
      place: "translate(-58%, -46%)",
      width: "w-[min(100%,12.5rem)] sm:w-90",
      cardColor: "bg-rose-950/90 border-rose-800 text-rose-100",
      glitch: true,
      z: 10,
    },
    {
      icon: Brain,
      title: "Nhận thức mới",
      description: "Sự sụp đổ trở thành điều kiện cho một nhận thức cao hơn.",
      position: vbToPercent(INSIGHT_CARD_POS),
      place: "translate(-50%, -42%)",
      width: "w-[min(100%,12.5rem)] sm:w-70",
      cardColor: "bg-fuchsia-950/90 border-fuchsia-700 text-fuchsia-100",
      z: 15,
    },
    {
      icon: Scale,
      title: "Cân bằng ở trình độ mới",
      description: "Đạt sự hài hòa giữa học tập, công việc và sức khỏe trên nền nhận thức mới.",
      position: vbToPercent(SPIRAL_NODES.end),
      place: "translate(-44%, -52%)",
      width: "w-[min(100%,12.5rem)] sm:w-70",
      cardColor: "bg-cyan-900/95 border-cyan-400 border-2 shadow-[0_0_40px_rgba(34,211,238,0.45)] text-cyan-50",
      z: 20,
    },
  ];

  const transitions = [
    {
      label: "Phủ định lần 1",
      position: vbToPercent(
        cubicMidpoint(SPIRAL_NODES.start, SPIRAL_SEGMENTS[0].c1, SPIRAL_SEGMENTS[0].c2, SPIRAL_SEGMENTS[0].to),
      ),
      place: "translate(-50%, -50%)",
    },
    {
      label: "Mâu thuẫn phát triển",
      position: vbToPercent(
        cubicMidpoint(SPIRAL_NODES.hustle, SPIRAL_SEGMENTS[1].c1, SPIRAL_SEGMENTS[1].c2, SPIRAL_SEGMENTS[1].to),
      ),
      place: "translate(-50%, -50%)",
    },
    {
      label: "Chuyển hóa",
      position: vbToPercent(
        cubicMidpoint(SPIRAL_NODES.collapse, SPIRAL_SEGMENTS[2].c1, SPIRAL_SEGMENTS[2].c2, SPIRAL_SEGMENTS[2].to),
      ),
      place: "translate(-50%, -118%)",
    },
    {
      label: "Phủ định của phủ định",
      position: vbToPercent(
        cubicMidpoint(SPIRAL_NODES.insight, SPIRAL_SEGMENTS[3].c1, SPIRAL_SEGMENTS[3].c2, SPIRAL_SEGMENTS[3].to),
      ),
      place: "translate(-50%, -125%)",
    },
  ];

  return (
    <section id="law3" className="w-full min-h-screen flex items-center justify-center text-white py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden story-section" style={{ background: "linear-gradient(180deg, #121826 0%, #0B1020 100%)" }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-3 sm:gap-4">
        <div className="text-center relative z-20 px-2">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
            Phủ Định Của Phủ Định
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Sự phát triển không đi theo đường thẳng mà theo đường xoáy ốc đi lên.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[1000/540] min-h-[380px] sm:min-h-[420px] md:min-h-[480px] px-1 sm:px-2">
          {/* SVG Path for the upward spiral clearly visible */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" viewBox={`0 0 ${SPIRAL_VB.w} ${SPIRAL_VB.h}`} preserveAspectRatio="none">
            
            {/* Glowing background shadow of the curve */}
             <motion.path
              d={SPIRAL_PATH_D}
              stroke="url(#spiral-gradient)"
              strokeWidth="14"
              fill="none"
              opacity="0.3"
              style={{ filter: "blur(8px)" }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />

            {/* Core solid spiral: bottom-left → loops → top-right */}
            <motion.path
              d={SPIRAL_PATH_D}
              stroke="url(#spiral-gradient)"
              strokeWidth="6"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />

            <defs>
              <linearGradient id="spiral-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />  {/* Indigo */}
                <stop offset="25%" stopColor="#10B981" /> {/* Emerald */}
                <stop offset="50%" stopColor="#F43F5E" /> {/* Rose */}
                <stop offset="75%" stopColor="#D946EF" /> {/* Fuchsia */}
                <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan */}
              </linearGradient>
            </defs>
          </svg>

          {/* Render Steps using Absolute Positioning */}
          {steps.map((step, index) => (
             <div 
               key={index} 
               className="absolute max-w-[46%] sm:max-w-none" 
               style={{ left: step.position.left, top: step.position.top, transform: step.place, zIndex: step.z }}
             >
              <motion.div
                className={`relative p-3 sm:p-3.5 rounded-xl border backdrop-blur-md shadow-lg ${step.width} ${step.cardColor} ${step.glitch ? "glitch-card" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-sm sm:text-base leading-snug flex items-start gap-2">
                  <step.icon className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] shrink-0 mt-0.5 opacity-90" aria-hidden />
                  <span>{step.title}</span>
                </h3>
                <p className="text-xs sm:text-sm mt-1.5 sm:mt-2 opacity-95 leading-relaxed">{step.description}</p>
              </motion.div>
            </div>
          ))}

          {/* Transition Labels */}
          {transitions.map((t, i) => (
             <motion.div
              key={i}
              className="absolute z-[5] text-[10px] sm:text-xs text-slate-100 font-semibold whitespace-nowrap py-0.5 sm:py-1 px-2 sm:px-2.5 bg-slate-900/90 rounded-full border border-slate-600/80 shadow-md pointer-events-none"
              style={{ left: t.position.left, top: t.position.top, transform: t.place }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.4 }}
              viewport={{ once: true }}
            >
              {t.label}
            </motion.div>
          ))}

        </div>

        <motion.p
          className="-mt-4 sm:-mt-6 text-center text-xs sm:text-sm md:text-base font-semibold tracking-wide text-slate-200 bg-slate-900/85 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-600/80 shadow-xl max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          viewport={{ once: true }}
        >
          Không quay về điểm xuất phát <span className="text-indigo-400 mx-1 sm:mx-2">—</span> mà quay về ở trình độ cao hơn.
        </motion.p>
      </div>
    </section>
  );
};

// ---------- Section 9: Conclusion ----------
function ConclusionSection() {
  const fire = () => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.4 }, colors: ["#ff6bcb","#fbbf24","#34d399","#60a5fa"] });
  };

  return (
    <section id="end" className="relative min-h-screen py-12 px-6 flex items-center justify-center story-section" style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #fef3c7 40%, #ffe9b3 100%)" }}>
      <div className="max-w-5xl w-full mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-4 float-y">
          <ChibiStudent mood="balanced" size={200} />
        </motion.div>

        <motion.h2 className="text-3xl md:text-4xl font-bold text-amber-800 mt-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Cân bằng mới là thành công bền vững
        </motion.h2>
        <p className="mt-3 text-base text-slate-700 max-w-2xl mx-auto italic">
          &ldquo;Làm việc chăm chỉ rất quan trọng.<br/>Nhưng <b className="text-pink-600">phát triển bền vững</b> mới là thành công.&rdquo;
        </p>

        <h3 className="mt-10 text-xl font-bold text-amber-700">Bài học từ phép biện chứng duy vật</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          { (
            [
              { icon: Scale, label: "Cân bằng", text: "Cần cân bằng giữa mục tiêu và sức khỏe" },
              { icon: Flame, label: "Tránh cực đoan", text: "Không nên cực đoan Hustle" },
              { icon: ArrowLeftRight, label: "Mâu thuẫn", text: "Nhận diện mâu thuẫn để điều chỉnh" },
            ] as const
          ).map((c, i) => (
            <motion.div key={i}
              className="bg-white rounded-2xl p-4 shadow-xl border-2 border-amber-200"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i*0.15 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <div className="flex justify-center mb-2">
                <c.icon className="story-icon-md text-amber-800" strokeWidth={1.75} aria-hidden />
                <span className="sr-only">{c.label}</span>
              </div>
              <div className="text-slate-700 font-semibold text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden />
                <span>{c.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={fire}
          className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white font-bold text-lg shadow-2xl"
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        >
          Cảm ơn cô và các bạn
        </motion.button>

        <div className="mt-12 text-sm text-slate-500">— Hết —</div>
      </div>
    </section>
  );
}

// ---------- Progress + Nav ----------
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400 z-50 origin-left" style={{ scaleX }} />
  );
}

const NAV = [
  { id: "hero", label: "Mở đầu" },
  { id: "year1", label: "Năm 1" },
  { id: "year23", label: "Năm 2-3" },
  { id: "final", label: "Năm cuối" },
  { id: "doctor", label: "Phân tích" },
  { id: "law1", label: "Lượng-Chất" },
  { id: "law2", label: "Mâu thuẫn" },
  { id: "law3", label: "Phủ định" },
  { id: "end", label: "Kết luận" },
];
function SideNav() {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
      {NAV.map(n => (
        <button key={n.id} onClick={() => scrollToId(n.id)}
          className="group flex items-center gap-2 justify-end">
          <span className="opacity-0 group-hover:opacity-100 transition text-xs bg-black/70 text-white px-2 py-1 rounded">{n.label}</span>
          <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-400 hover:bg-pink-400 transition" />
        </button>
      ))}
    </nav>
  );
}

// ---------- Main ----------
export function Story() {
  return (
    <main className="relative story-scroll">
      <ProgressBar />
      <SideNav />
      <HeroSection />
      <Year1Section />
      <Year23Section />
      <FinalYearSection />
      <DoctorSection />
      <QuantityQualitySection />
      <OppositesSection />
      <NegationOfNegation />
      <ConclusionSection />
    </main>
  );
}
