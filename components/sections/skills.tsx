'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Smartphone, Database, Terminal, Code2, GitBranch, Layers, Cpu, Zap } from 'lucide-react';

type TechItem = {
  name: string;
  color: string;
  icon?: React.ElementType;
  image?: string;
};

const techItems: TechItem[] = [
  { name: 'Flutter', color: '#02569B', image: '/assets/skills/flutter.png' },
  { name: 'Dart', color: '#0175C2', image: '/assets/skills/dart.png' },
  { name: 'Supabase', color: '#3ECF8E', image: '/assets/skills/supabase.png' },
  { name: 'Firebase', color: '#FFCA28', image: '/assets/skills/firebase.png' },
  { name: 'PostgreSQL', color: '#336791', image: '/assets/skills/elephant.png' },
  { name: 'C++', color: '#00599C', image: '/assets/skills/cpp_logo.png' },
  { name: 'Git', color: '#F05032', image: '/assets/skills/Git-Icon-White.png' },
  { name: 'GitHub', color: '#FFFFFF', image: '/assets/skills/github.png' },
  { name: 'Postman', color: '#FF6C37', image: '/assets/skills/postman.png' },
  { name: 'VS Code', color: '#007ACC', image: '/assets/skills/vs_code.png' },
  { name: 'Visual Studio', color: '#5C2D91', image: '/assets/skills/visual_studio.png' },
  { name: 'Android Studio', color: '#3DDC84', image: '/assets/skills/android_studio.png' },
  { name: 'Clean Architecture', color: '#FFFFFF', icon: Layers },
  { name: 'MVVM', color: '#8A2BE2', icon: Cpu },
];

function TechCard({ item }: { item: TechItem }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: `0 20px 40px ${item.color}20`,
        borderColor: `${item.color}60`
      }}
      className="group relative flex min-w-[160px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a]/80 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-[#0a0a0a]"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
        style={{
          background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`
        }}
      />

      {/* Icon Container */}
      <div className="relative">
        <div
          className="absolute inset-0 blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
          style={{ backgroundColor: item.color }}
        />
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            item.icon && (() => {
              const Icon = item.icon!;
              return <Icon className="h-8 w-8" style={{ color: item.color }} />;
            })()
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">{item.name === 'Clean Architecture' ? 'Architecture' : 'Stack'}</span>
        <span className="text-xl font-bold tracking-tight text-white">{item.name}</span>
      </div>

      {/* Decorative line */}
      <div
        className="h-1 w-12 rounded-full opacity-0 transition-all duration-500 group-hover:w-20 group-hover:opacity-100"
        style={{ backgroundColor: item.color }}
      />
    </motion.div>
  );
}

function HorizontalMarquee({ items, direction = 1, isHovered }: { items: TechItem[], direction?: number, isHovered: boolean }) {
  const [width, setWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const speedMultiplier = useSpring(1, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width + 16); // 16px for gap-4
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    speedMultiplier.set(isHovered ? 0.2 : 1);
  }, [isHovered, speedMultiplier]);

  useAnimationFrame((t, delta) => {
    if (!width) return;
    const baseSpeed = 40; // px/s
    const moveBy = baseSpeed * speedMultiplier.get() * (delta / 1000) * direction;
    let newX = x.get() - moveBy;

    if (direction === 1) {
      if (newX <= -width) newX += width;
    } else {
      if (newX >= 0) newX -= width;
    }

    x.set(newX);
  });

  return (
    <div className="w-full overflow-hidden py-10">
      <motion.div style={{ x }} className="flex gap-4 w-fit">
        <div ref={contentRef} className="flex gap-4">
          {items.map((item, i) => (
            <TechCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
        <div className="flex gap-4">
          {items.map((item, i) => (
            <TechCard key={`dup-${item.name}-${i}`} item={item} />
          ))}
        </div>
        <div className="flex gap-4">
          {items.map((item, i) => (
            <TechCard key={`dup2-${item.name}-${i}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Skills() {
  const [isAnimatedMode, setIsAnimatedMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Group items by category or just split for two rows
  const half = Math.ceil(techItems.length / 2);
  const row1 = techItems.slice(0, half);
  const row2 = techItems.slice(half);

  return (
    <section className="relative overflow-hidden px-6 py-32 bg-[#030303]" id="skills">
      {/* Background Orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[128px]" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-600/10 blur-[128px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 sm:flex-row sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-500">Expertise</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight sm:text-7xl text-white">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Stack</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              A curated selection of technologies I've mastered to build high-performance,
              scalable, and beautiful digital experiences.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            onClick={() => setIsAnimatedMode(!isAnimatedMode)}
            className="group relative overflow-hidden rounded-2xl bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            <div className="relative z-10 flex items-center gap-3">
              {isAnimatedMode ? (
                <>
                  <Layers className="h-4 w-4" />
                  <span>View Full Grid</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Interactive Flow</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        </div>

        {isAnimatedMode ? (
          <div
            className="relative flex flex-col gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <HorizontalMarquee items={row1} direction={1} isHovered={isHovered} />
            <HorizontalMarquee items={row2} direction={-1} isHovered={isHovered} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {techItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <TechCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
