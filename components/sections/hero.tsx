'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ArrowRight, Download, Mail, Linkedin } from 'lucide-react';

const NameAnimation = ({ name }: { name: string }) => {
  const letters = Array.from(name);

  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const child: any = {
    hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-6xl font-[900] tracking-tighter sm:text-9xl flex justify-center py-4"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="relative inline-block transition-all duration-500 hover:scale-110"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
          {/* Subtle reflection */}
          <span className="absolute left-0 top-0 -z-10 text-transparent bg-clip-text bg-gradient-to-b from-indigo-500/20 to-transparent blur-xl">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </motion.span>
      ))}
    </motion.h1>
  );
};

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for background effects
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Main spotlight follows cursor for responsiveness
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.08), transparent 80%)`;

  // Secondary glow follows with a delay (spring) for an organic feel
  const secondaryGlow = useMotionTemplate`radial-gradient(450px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(167, 139, 250, 0.05), transparent 80%)`;

  // Parallax movement for background elements
  const orb1X = useTransform(smoothMouseX, [0, 1920], [50, -50]);
  const orb1Y = useTransform(smoothMouseY, [0, 1080], [50, -50]);
  const orb2X = useTransform(smoothMouseX, [0, 1920], [-80, 80]);
  const orb2Y = useTransform(smoothMouseY, [0, 1080], [40, -40]);

  const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1] as const,
      },
    }),
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Aboud_Khalaf_Flutter Developer _resume.pdf';
    link.download = 'Aboud_Khalaf_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="group relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center bg-transparent">
      {/* Premium Ambient Glow (Liquid Light) - Strong Intensity */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#020202]">
        {/* Intense Indigo Liquid Base */}
        <motion.div
          className="absolute h-[1200px] w-[1200px] rounded-full opacity-20 mix-blend-plus-lighter blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(67, 56, 202, 0.05) 50%, transparent 100%)',
            left: useTransform(smoothMouseX, (val) => val - 600),
            top: useTransform(smoothMouseY, (val) => val - 600),
          }}
        />

        {/* High-Key Violet Flare */}
        <motion.div
          className="absolute h-[800px] w-[800px] rounded-full opacity-10 mix-blend-screen blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.02) 60%, transparent 100%)',
            left: useTransform(mouseX, (val) => val - 400),
            top: useTransform(mouseY, (val) => val - 400),
          }}
        />

        {/* Floating Accent */}
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full opacity-8 mix-blend-overlay blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)',
            left: useTransform(smoothMouseX, (val) => val - 300 + Math.sin(val / 100) * 50),
            top: useTransform(smoothMouseY, (val) => val - 300 + Math.cos(val / 100) * 50),
          }}
        />

        {/* Static Central Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-full max-w-7xl rounded-full bg-indigo-500/05 blur-[150px] pointer-events-none" />

        {/* Interactive Animated Dot Grid (Grating Effect) */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            maskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`
          }}
          animate={{
            backgroundPosition: ['0px 0px', '32px 32px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Sophisticated Line Grid for structure */}
        <div
          className="absolute inset-0 h-full w-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Dynamic Light Rays / Beams focus */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-20"
          style={{
            x: useTransform(smoothMouseX, (val) => (val - 500) * 0.05)
          }}
        />

        {/* Digital Scanline Grating Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
            animate={{
              y: ['-100%', '1100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Grain overlay for cinematic texture */}
        <div className="absolute inset-0 h-full w-full opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-soft-light" />
      </div>

      {/* Parallax Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]"
        style={{ x: orb2X, y: orb2Y }}
      />

      {/* Content */}
      <div className="z-10 flex max-w-5xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400/80">Available for Innovation</span>
          </motion.div>

          {/* New Role Label */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="group/role relative overflow-hidden"
          >
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-500 transition-colors duration-500 group-hover/role:text-indigo-400">
              Mobile Software Engineer
            </span>
          </motion.div>
        </div>

        <div className="relative">
          <NameAnimation name="Aboud Khalaf" />
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.p
            custom={1.6}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-xl text-xl leading-relaxed text-zinc-400 font-medium"
          >
            Building high-performance <span className="text-white">mobile applications</span> with a focus on clean architecture, seamless UX, and robust engineering.
          </motion.p>

          {/* Tech Stack Line */}
          <motion.div
            custom={1.8}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600"
          >
            <span>Flutter</span>
            <span className="h-1 w-1 rounded-full bg-indigo-500/40" />
            <span>Dart</span>
            <span className="h-1 w-1 rounded-full bg-indigo-500/40" />
            <span>Supabase</span>
            <span className="h-1 w-1 rounded-full bg-indigo-500/40" />
            <span>PostgreSQL</span>
          </motion.div>
        </div>

        <motion.div
          custom={2.0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mt-4 flex flex-wrap items-center justify-center gap-6"
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="group/btn relative overflow-hidden bg-white px-10 py-5 text-black transition-all duration-700 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            <div className="relative z-10 flex items-center gap-3 font-bold transition-colors duration-500 group-hover/btn:text-white">
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
            </div>

            {/* Liquid Background Fill */}
            <div className="absolute inset-0 z-0 translate-y-[101%] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 transition-transform duration-700 ease-[0.19,1,0.22,1] group-hover/btn:translate-y-0" />

            {/* Animated Shine Effect */}
            <div className="absolute -left-[100%] top-0 z-0 h-full w-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover/btn:left-[100%]" />
          </MagneticButton>

          <MagneticButton
            onClick={handleDownloadResume}
            className="group/btn relative rounded-[1.5rem] border border-white/10 bg-white/5 px-10 py-5 backdrop-blur-xl transition-all hover:bg-white/10"
          >
            <div className="relative z-10 flex items-center gap-3 font-bold text-white">
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </div>
          </MagneticButton>
        </motion.div>

        <motion.div
          custom={2.2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mt-12 relative group/dock"
        >
          {/* Floating Dock Glow */}
          <div className="absolute -inset-4 rounded-[3rem] bg-indigo-500/5 blur-3xl opacity-0 group-hover/dock:opacity-100 transition-opacity duration-1000" />

          <div className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-3xl shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
            <SocialLink
              href="mailto:aboud.khalaf.eng@gmail.com"
              icon={<Mail className="h-6 w-6" />}
              label="Email"
              brandColor="#818cf8"
            />
            <SocialLink
              href="https://www.linkedin.com/in/aboud-khalaf-526675388"
              icon={<Linkedin className="h-6 w-6" />}
              label="LinkedIn"
              brandColor="#0077b5"
            />
            <SocialLink
              href="https://medium.com/@aboud-khalaf"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              }
              label="Medium"
              brandColor="#ffffff"
            />

            <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

            <SocialLink
              href="https://leetcode.com/u/_ABOUD/"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M13.483 0a1.374 1.374 0 00-.961.414l-4.377 4.51a.3.3 0 01-.424.006l-2.001-1.928a.3.3 0 00-.417.006l-4.887 5.04a1.374 1.374 0 00-.006 1.954l10.203 9.808a1.374 1.374 0 001.953-.006l10.203-9.808a1.374 1.374 0 00-.006-1.954L13.483 0zm-4.377 7.51l4.377-4.51L21.43 12l-7.947 7.64-7.947-7.64 3.57-3.69z" />
                </svg>
              }
              label="LeetCode"
              brandColor="#ffa116"
            />
            <SocialLink
              href="https://codeforces.com/profile/_ABOUD"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M4.5 7.5a1.5 1.5 0 011.5 1.5v8.25a1.5 1.5 0 01-1.5 1.5H1.5A1.5 1.5 0 010 17.25V9A1.5 1.5 0 011.5 7.5h3zm6.75-3.75a1.5 1.5 0 011.5 1.5V18a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 016.75 18V5.25a1.5 1.5 0 011.5-1.5h3zm6.75 3.75a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h3z" />
                </svg>
              }
              label="Codeforces"
              brandColor="#3182ce"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-indigo-500 via-zinc-800 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  label,
  brandColor,
  target = "_blank"
}: {
  href: string,
  icon: React.ReactNode,
  label: string,
  brandColor: string,
  target?: string
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="group/social relative flex items-center justify-center p-3"
      whileHover={{ scale: 1.25, y: -10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      aria-label={label}
    >
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-all duration-300 translate-y-2 group-hover/social:translate-y-0 pointer-events-none z-50">
        <div className="relative rounded-md bg-white px-3 py-1.5 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black whitespace-nowrap">
            {label}
          </span>
          <div className="absolute top-[95%] left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
        </div>
      </div>

      {/* Brand Specific Glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/social:opacity-15 blur-xl transition-opacity duration-300"
        style={{ backgroundColor: brandColor }}
      />

      <div className="relative text-zinc-400 transition-all duration-300 group-hover/social:text-white filter group-hover/social:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        {icon}
      </div>
    </motion.a>
  );
}
