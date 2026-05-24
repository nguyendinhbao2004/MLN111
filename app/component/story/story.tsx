import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChibiStudent, FloatingIcon, CloudSVG, GearSVG } from "./chibi";

// ---------- Helpers ----------
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function StatBar({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between text-sm font-semibold mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/40 overflow-hidden">
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
    <section id="hero" className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #87ceeb 0%, #b8e3ff 50%, #fff8d6 100%)" }}>
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
      <FloatingIcon x="10%" y="25%" delay={0}>🏆</FloatingIcon>
      <FloatingIcon x="85%" y="30%" delay={0.5}>📚</FloatingIcon>
      <FloatingIcon x="15%" y="55%" delay={1}>💵</FloatingIcon>
      <FloatingIcon x="82%" y="58%" delay={1.5}>⏰</FloatingIcon>
      <FloatingIcon x="25%" y="70%" delay={0.8}>✨</FloatingIcon>
      <FloatingIcon x="75%" y="72%" delay={1.2}>🎯</FloatingIcon>
      <FloatingIcon x="50%" y="20%" delay={2}>A+</FloatingIcon>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1 rounded-full bg-white/70 text-sm font-semibold text-pink-600 backdrop-blur">📖 Câu chuyện triết học</span>
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
          📖 Bắt đầu đọc nhật ký
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
    <section id="year1" className="relative min-h-screen py-24 px-6" style={{ background: "linear-gradient(180deg, #fff8d6 0%, #ffe9b3 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-amber-700" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          📓 Nhật ký Năm Nhất
        </motion.h2>
        <p className="text-center mt-2 text-amber-600">Khi mọi thứ còn rất tươi sáng…</p>

        <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
          {/* left illustration */}
          <motion.div className="relative" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-300 relative">
              <div className="flex justify-center"><ChibiStudent mood="happy" size={200} /></div>
              <div className="flex justify-around mt-6 text-4xl">
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>😎</motion.span>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>📚</motion.span>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>💵</motion.span>
                <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>☕</motion.span>
              </div>
            </div>
          </motion.div>

          {/* right diary */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-yellow-50 rounded-2xl p-8 shadow-xl border-l-8 border-amber-400 font-handwritten">
              <div className="text-sm text-amber-600 mb-2">📅 Ngày đầu đại học</div>
              <p className="text-lg leading-relaxed text-slate-800 italic">
                "Muốn thành công phải <b className="text-pink-600">Hustle</b>.<br/>
                Mình đăng ký <b>2 văn bằng</b>.<br/>
                Ban ngày đi học.<br/>
                Ban đêm làm thêm đến <b>12h đêm</b>." ✨
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 mt-6 shadow-lg space-y-4">
              <h4 className="font-bold text-slate-700">📊 Dashboard chỉ số</h4>
              <StatBar label="🏆 Thành công" value={20} color="#10b981" />
              <StatBar label="❤️ Sức khỏe" value={100} color="#ef4444" delay={0.1} />
              <StatBar label="😴 Giấc ngủ" value={90} color="#3b82f6" delay={0.2} />
              <StatBar label="⚡ Áp lực" value={10} color="#f59e0b" delay={0.3} />
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
    <section ref={ref} id="year23" className="relative min-h-screen py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #ffe9b3 0%, #f3a683 100%)" }}>
      {/* gear backgrounds */}
      <div className="absolute -top-20 -left-20 opacity-20 spin-slow"><GearSVG size={400} color="#7c4f1d" /></div>
      <div className="absolute -bottom-20 -right-20 opacity-20 spin-slow" style={{ animationDirection: "reverse" }}><GearSVG size={350} color="#7c4f1d" /></div>
      <div className="absolute top-1/2 right-10 opacity-10 spin-fast"><GearSVG size={200} color="#1a1a2e" /></div>

      <div className="relative max-w-6xl mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-orange-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          ⚙️ Năm 2 – Năm 3
        </motion.h2>
        <p className="text-center text-xl text-orange-800 mt-2 font-semibold">"Guồng quay tăng tốc"</p>

        <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
          {/* treadmill */}
          <div className="relative h-80 flex items-end justify-center">
            <motion.div style={{ x: runX }}>
              <ChibiStudent mood="tired" size={180} />
            </motion.div>
            {/* treadmill */}
            <div className="absolute bottom-0 w-full h-6 bg-slate-700 rounded-full overflow-hidden">
              <motion.div className="h-full w-[200%] bg-[repeating-linear-gradient(90deg,#475569_0,#475569_20px,#334155_20px,#334155_40px)]" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            </div>
            {/* bubbles */}
            {["Học","Làm","Học","Làm","Làm","Học"].map((w,i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full px-3 py-1 text-sm font-bold text-orange-700 shadow-lg"
                style={{ left: `${10 + i * 14}%`, top: `${10 + (i%3)*15}%` }}
                animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {w}
              </motion.div>
            ))}
          </div>

          {/* diary + stats */}
          <div>
            <motion.div className="bg-orange-50 rounded-2xl p-8 shadow-xl border-l-8 border-orange-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-lg italic text-slate-800">
                "Mình hơi mệt…<br/>nhưng cố thêm chút nữa <b>chắc ổn</b> 😅"
              </p>
            </motion.div>
            <div className="bg-white/80 rounded-2xl p-6 mt-6 shadow-lg space-y-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">📊 Dashboard <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>⏰</motion.span></h4>
              <StatBar label="🏆 Thành công" value={70} color="#10b981" />
              <StatBar label="❤️ Sức khỏe" value={65} color="#f59e0b" delay={0.1} />
              <StatBar label="😴 Giấc ngủ" value={40} color="#ef4444" delay={0.2} />
              <StatBar label="⚡ Áp lực" value={70} color="#dc2626" delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Final year - breaking point ----------
function FinalYearSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stress = useTransform(scrollYProgress, [0.2, 0.7], [0, 100]);
  const [stressVal, setStressVal] = useState(0);
  const [overload, setOverload] = useState(false);

  useEffect(() => stress.on("change", v => {
    setStressVal(Math.round(v));
    if (v >= 99 && !overload) setOverload(true);
  }), [stress, overload]);

  return (
    <section ref={ref} id="final" className="relative min-h-[150vh] py-24 px-6 overflow-hidden text-slate-100" style={{ background: "linear-gradient(180deg, #4a3a5e 0%, #1a1a2e 100%)" }}>
      {/* rain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="absolute w-px h-8 bg-blue-300/40" style={{ left: `${Math.random()*100}%`, top: `-${Math.random()*50}%`, animation: `rain ${0.5 + Math.random()*0.8}s linear infinite`, animationDelay: `${Math.random()*2}s` }} />
        ))}
      </div>

      <div className={`relative max-w-6xl mx-auto ${overload ? "shake" : ""}`}>
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-red-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          💔 Năm Cuối — Điểm Nút
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
          <div className="relative h-96 flex items-center justify-center">
            {/* flying books */}
            {["📕","📗","📘","📙","📔","📓"].map((b, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                animate={{
                  x: [Math.cos(i)*100, Math.cos(i+2)*150, Math.cos(i)*100],
                  y: [Math.sin(i)*80, Math.sin(i+2)*120, Math.sin(i)*80],
                  rotate: [0, 360],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              >{b}</motion.div>
            ))}
            <div className="relative z-10">
              <ChibiStudent mood="broken" size={200} />
            </div>
          </div>

          <div>
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 border-l-8 border-red-500 shadow-2xl">
              <p className="text-lg italic">
                "Mình không ngủ được. 😵‍💫<br/>
                Nhìn thấy sách là <b className="text-red-400">buồn nôn</b>.<br/>
                Mình thấy <b className="text-red-400">trống rỗng</b>… 🕳️"
              </p>
            </div>
            <div className="bg-slate-900/80 rounded-2xl p-6 mt-6 space-y-4 border border-red-900">
              <h4 className="font-bold text-red-300">📊 Dashboard</h4>
              <StatBar label="🏆 Thành công" value={95} color="#10b981" />
              <StatBar label="❤️ Sức khỏe" value={15} color="#dc2626" delay={0.1} />
              <StatBar label="😴 Giấc ngủ" value={5} color="#7f1d1d" delay={0.2} />
              <StatBar label="⚡ Áp lực" value={99} color="#fb7185" delay={0.3} />
            </div>

            {/* stress meter */}
            <div className="mt-8 bg-black/40 rounded-2xl p-6 border border-red-700">
              <div className="flex justify-between font-bold text-red-300 mb-2">
                <span>⚠️ STRESS METER</span>
                <span>{stressVal} / 100</span>
              </div>
              <div className="h-6 rounded-full bg-slate-800 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ width: useTransform(stress, v => `${v}%`), background: "linear-gradient(90deg, #fbbf24, #ef4444, #b91c1c)" }} />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {overload && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 glitch"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOverload(false)}
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
    <section ref={ref} id="doctor" className="relative min-h-screen py-24 px-6 text-slate-100" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-center text-cyan-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          🧠 Phòng tư vấn tâm lý
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
          <div className="bg-cyan-950/40 rounded-3xl p-8 border border-cyan-700 relative">
            {/* doctor */}
            <div className="flex justify-center"><ChibiStudent mood="balanced" size={180} /></div>
            <div className="text-center mt-4 text-cyan-300 font-semibold">Bác sĩ tâm lý</div>
            <div className="absolute -top-4 -right-4 bg-cyan-500 text-white rounded-full px-4 py-1 text-sm font-bold animate-pulse">🩺 Đang phân tích…</div>
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
                <div className="text-green-400">✓ Phân tích hoàn tất.</div>
                <div className="text-white mt-4 font-sans text-base">
                  Nguyên nhân được xác định qua <b className="text-cyan-300">PHÉP BIỆN CHỨNG DUY VẬT</b>:
                  <ol className="list-decimal ml-6 mt-2 space-y-1 text-cyan-100">
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
    <section ref={ref} id="law1" className="relative min-h-[150vh] py-24 px-6 text-slate-100" style={{ background: "linear-gradient(180deg, #16213e 0%, #0f3460 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-4xl md:text-6xl font-bold text-center text-yellow-300" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          ⚖️ QUY LUẬT LƯỢNG → CHẤT
        </motion.h2>
        <p className="text-center text-cyan-200 mt-3">Khi lượng tích lũy đủ, chất sẽ thay đổi</p>

        <div className="grid md:grid-cols-2 gap-10 mt-20 items-center">
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
              <svg viewBox="0 0 200 240" width="220">
                <path d="M40 50 L160 50 L150 220 Q100 235 50 220 Z" fill="none" stroke="#fff" strokeWidth="4" />
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
                <motion.div className="absolute inset-0 flex items-center justify-center text-6xl"
                  initial={{ scale: 0 }} animate={{ scale: [0, 2, 1.5], opacity: [1, 0.6] }} transition={{ duration: 1 }}>
                  💥
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-cyan-700">
              <h4 className="font-bold text-yellow-300 mb-3">Lượng công việc tăng dần:</h4>
              <ul className="space-y-2 text-cyan-100">
                <li>📚 học thêm</li>
                <li>💼 làm thêm</li>
                <li>😴 thiếu ngủ</li>
                <li>⚡ áp lực dồn nén</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-2xl p-6 border border-red-500">
              <div className="text-sm text-amber-300 mb-1">→ Đến điểm giới hạn (điểm nút)</div>
              <div className="text-xl font-bold">Sự thay đổi về <span className="text-red-400">CHẤT</span> xuất hiện</div>
              <div className="mt-4 flex items-center justify-around text-center">
                <div>
                  <div className="text-3xl">😎</div>
                  <div className="text-sm mt-1 text-green-300">Sinh viên<br/>năng động</div>
                </div>
                <div className="text-3xl text-red-400">→</div>
                <div>
                  <div className="text-3xl">😵‍💫</div>
                  <div className="text-sm mt-1 text-red-300">Sinh viên<br/>kiệt quệ</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2"><span>Thanh stress (lượng)</span><span>{Math.min(Math.round(val),100)}%</span></div>
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
    <section id="law2" className="relative min-h-screen py-24 px-6 text-white overflow-hidden" style={{ background: "#0f0f1e" }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 className="text-3xl md:text-5xl font-bold text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          ⚔️ THỐNG NHẤT & ĐẤU TRANH<br/><span className="text-pink-400">CỦA CÁC MẶT ĐỐI LẬP</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 mt-16 relative min-h-[400px]">
          {/* left - success */}
          <motion.div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
            animate={{ x: [0, 10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
            <motion.div className="text-7xl" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>🏆</motion.div>
            <div className="text-3xl font-bold mt-4">THÀNH CÔNG</div>
            <div className="mt-2 text-amber-900">Khát vọng • Mục tiêu • Ước mơ</div>
          </motion.div>

          {/* right - health */}
          <motion.div className="rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            animate={{ x: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
            <motion.div className="text-7xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>❤️</motion.div>
            <div className="text-3xl font-bold mt-4">SỨC KHỎE</div>
            <div className="mt-2 text-red-100">Thể chất • Tinh thần • Giấc ngủ</div>
          </motion.div>

          {/* center swords */}
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl z-10"
            animate={{ rotate: [-15, 15, -15], scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
            ⚔️
          </motion.div>

          {/* clash effects */}
          {[...Array(8)].map((_,i)=>(
            <motion.div key={i} className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-yellow-300"
              animate={{ x: Math.cos(i*Math.PI/4)*80, y: Math.sin(i*Math.PI/4)*80, opacity: [1,0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i*0.05 }}
            />
          ))}
        </div>

        <motion.div className="mt-16 bg-white/5 rounded-2xl p-8 border border-pink-500/40 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-pink-300 font-bold text-xl">Mâu thuẫn:</div>
          <div className="text-2xl mt-2">Khát vọng thành công <span className="text-yellow-300">VS</span> Giới hạn thể chất & tinh thần</div>
          <div className="mt-6 text-slate-300 italic">Mâu thuẫn phát triển đến đỉnh điểm → <b className="text-red-400">khủng hoảng</b></div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Section 8: Negation of negation ----------
function SpiralSection() {
  const steps = [
    { label: "Sinh viên bình thường", icon: "🙂", color: "#60a5fa" },
    { label: "Hustle cực đoan", icon: "🔥", color: "#fb923c" },
    { label: "Sụp đổ", icon: "💥", color: "#ef4444" },
    { label: "Nhận thức mới", icon: "💡", color: "#fbbf24" },
    { label: "Cân bằng", icon: "🌱", color: "#34d399" },
  ];
  return (
    <section id="law3" className="relative min-h-screen py-24 px-6 text-white" style={{ background: "linear-gradient(180deg, #0f0f1e 0%, #1e1b4b 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2 className="text-3xl md:text-5xl font-bold text-center text-purple-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          🌀 PHỦ ĐỊNH CỦA PHỦ ĐỊNH
        </motion.h2>
        <p className="text-center text-purple-200 mt-2">Phát triển không đi theo đường thẳng, mà theo vòng xoắn đi lên</p>

        <div className="relative mt-20 flex flex-col items-center gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-6 w-full max-w-md"
              style={{ marginLeft: `${(i % 2 === 0 ? -1 : 1) * (i * 30)}px` }}
              initial={{ opacity: 0, x: i%2===0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i*0.15 }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
                style={{ background: s.color, boxShadow: `0 0 40px ${s.color}` }}>
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm text-purple-300">Bước {i+1}</div>
                <div className="text-2xl font-bold">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 9: Conclusion ----------
function ConclusionSection() {
  const fire = () => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.4 }, colors: ["#ff6bcb","#fbbf24","#34d399","#60a5fa"] });
  };

  return (
    <section id="end" className="relative min-h-screen py-24 px-6" style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #fef3c7 40%, #ffe9b3 100%)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-6 float-y">
          <ChibiStudent mood="balanced" size={220} />
        </motion.div>

        <div className="flex justify-center gap-6 text-4xl mb-6">
          <motion.span animate={{ y: [0,-10,0] }} transition={{ duration: 2, repeat: Infinity }}>😴</motion.span>
          <motion.span animate={{ y: [0,-10,0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>📖</motion.span>
          <motion.span animate={{ y: [0,-10,0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🏃</motion.span>
        </div>

        <motion.h2 className="text-3xl md:text-5xl font-bold text-amber-800" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          ✨ Cân bằng mới là thành công bền vững
        </motion.h2>
        <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto italic">
          "Làm việc chăm chỉ rất quan trọng.<br/>Nhưng <b className="text-pink-600">phát triển bền vững</b> mới là thành công."
        </p>

        <h3 className="mt-16 text-2xl font-bold text-amber-700">📚 Bài học từ phép biện chứng duy vật</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: "⚖️", text: "Cần cân bằng giữa mục tiêu và sức khỏe" },
            { icon: "🚫", text: "Không nên cực đoan Hustle" },
            { icon: "🔍", text: "Nhận diện mâu thuẫn để điều chỉnh" },
          ].map((c, i) => (
            <motion.div key={i}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-amber-200"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i*0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="text-5xl mb-3">{c.icon}</div>
              <div className="text-slate-700 font-semibold">✓ {c.text}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={fire}
          className="mt-16 px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white font-bold text-xl shadow-2xl"
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        >
          🎉 Cảm ơn thầy cô
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
    <main className="relative">
      <ProgressBar />
      <SideNav />
      <HeroSection />
      <Year1Section />
      <Year23Section />
      <FinalYearSection />
      <DoctorSection />
      <QuantityQualitySection />
      <OppositesSection />
      <SpiralSection />
      <ConclusionSection />
    </main>
  );
}
