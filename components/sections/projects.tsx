'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { portfolioData } from '@/lib/portfolio-data';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { SmartphoneMockup } from '@/components/ui/smartphone-mockup';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  techStack: string[];
}


function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full w-full outline-none">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-500 group-hover:border-indigo-500/50 group-hover:bg-[#0c0c0c] group-hover:scale-[1.01]">
          <BentoGridItem
            title={project.title}
            description={project.shortDescription}
            header={<Skeleton project={project} />}
            className="h-full w-full bg-transparent p-8"
            icon={
              <div className="flex flex-wrap gap-2 mt-6">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-xl bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-white/5 transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional');
  const { professionalProjects, personalProjects } = portfolioData;
  const currentProjects = activeTab === 'professional' ? professionalProjects : personalProjects;

  return (
    <section className="relative overflow-hidden px-6 py-32 bg-[#020202]" id="projects">
      {/* Ambient background glows */}
      <div className="absolute right-0 top-1/2 -z-10 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[180px] opacity-50" />
      <div className="absolute left-0 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[150px] opacity-30" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-indigo-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Portfolio</span>
              <div className="h-px w-8 bg-indigo-500" />
            </div>
            <h2 className="text-4xl font-black tracking-tight sm:text-7xl text-white mb-8">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Work</span>
            </h2>
          </motion.div>

          {/* Segmented Tab Switcher */}
          <div className="relative flex p-1 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 w-full max-w-md">
            <button
              onClick={() => setActiveTab('professional')}
              className={`relative z-10 flex-1 px-6 py-3 text-sm font-bold transition-colors duration-300 ${activeTab === 'professional' ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
            >
              Professional
              {activeTab === 'professional' && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`relative z-10 flex-1 px-6 py-3 text-sm font-bold transition-colors duration-300 ${activeTab === 'personal' ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
            >
              Personal
              {activeTab === 'personal' && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Projects Grid with AnimatePresence */}
        <div className="relative min-h-[40rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'professional' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'professional' ? 20 : -20 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              <BentoGrid className="mx-auto max-w-7xl md:auto-rows-[35rem] gap-6">
                {currentProjects.map((project, i) => (
                  <ProjectCard key={`${activeTab}-${project.id}`} project={project} index={i} />
                ))}
              </BentoGrid>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const Skeleton = ({ project }: { project: Project }) => (
  <div className="flex flex-1 w-full h-full min-h-[15rem] rounded-3xl overflow-hidden relative group/skeleton">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)] z-0" />
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0" />

    {/* Animated background lines */}
    <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-shimmer-vertical" />
    </div>

    <div className="relative w-full h-full flex items-center justify-center p-8 z-10 transition-transform duration-700 group-hover/skeleton:scale-105">
      <div className="w-full max-w-[240px] aspect-[9/16] relative rounded-[2.5rem] overflow-hidden bg-[#050505] shadow-2xl transition-all duration-500">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover opacity-90 transition-all duration-700 group-hover/skeleton:opacity-100 group-hover/skeleton:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);
