'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { SmartphoneMockup } from '@/components/ui/smartphone-mockup';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectTimeline from '@/components/ui/project-timeline';
import type { Contribution } from '@/lib/contributions/contribution.service';

interface ProjectDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  problem_statement: string;
  solution_details: string;
  architecture_notes?: string;
  challenges?: string;
  tech_stack: string[];
  screenshots: string[];
  repo_link?: string;
  demo_link?: string;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (scrollRef.current && project) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const offsetWidth = scrollRef.current.offsetWidth;
      setConstraints({ left: -(scrollWidth - offsetWidth), right: 0 });
    }
  }, [project, loading]);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError(null);

        // Check if Supabase is configured
        const isSupabaseConfigured =
          supabase &&
          process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_URL !== 'YOUR_SUPABASE_URL';

        if (!isSupabaseConfigured) {
          // Faster mock data loading for better UX
          const timer = setTimeout(() => {
            setProject({
              id: 'mock-id',
              slug: slug,
              title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
              description: 'A comprehensive mobile application built with Flutter and modern architecture.',
              problem_statement: 'Users needed a reliable, fast, and intuitive way to access services on the go, but existing solutions were clunky and slow.',
              solution_details: 'Implemented a clean architecture pattern with Bloc/Cubit for state management, ensuring a highly responsive UI and maintainable codebase. Integrated real-time features using Supabase.',
              architecture_notes: 'The app uses Flutter for the frontend, Supabase for the backend, and Bloc for state management.',
              challenges: 'Handling complex real-time synchronizations while maintaining a fluid user experience.',
              tech_stack: ['Flutter', 'Dart', 'Supabase', 'Bloc'],
              screenshots: [
                `https://picsum.photos/seed/${slug}1/800/1600`,
                `https://picsum.photos/seed/${slug}2/800/1600`,
                `https://picsum.photos/seed/${slug}3/800/1600`,
                `https://picsum.photos/seed/${slug}4/800/1600`,
              ],
              repo_link: 'https://github.com/aboudkhalaf',
              demo_link: 'https://example.com',
            });
            // Mock contributions for local dev / demo
            setContributions([
              {
                id: 'c1',
                project_id: 'mock-id',
                title: 'Architected Clean Layer Separation',
                description: 'Designed the entire app using Clean Architecture with strict separation between Data, Domain, and Presentation layers, enabling easy testability and scalability.',
                contribution_type: 'Architecture',
                order_index: 1,
                created_at: '',
              },
              {
                id: 'c2',
                project_id: 'mock-id',
                title: 'Built Real-Time State Management',
                description: 'Implemented Bloc/Cubit state management across all features — including session, feed, and notification streams — ensuring a smooth, predictable UI.',
                contribution_type: 'Feature',
                order_index: 2,
                created_at: '',
              },
              {
                id: 'c3',
                project_id: 'mock-id',
                title: 'Optimized Supabase Query Performance',
                description: 'Reduced average API response time by 60% through targeted Postgres indexing, RLS policy restructuring, and client-side caching strategies.',
                contribution_type: 'Performance',
                order_index: 3,
                created_at: '',
              },
            ]);
            setLoading(false);
          }, 800); // Reduced delay for snappier feel
          return () => clearTimeout(timer);
        }

        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("Project not found");

        setProject(data);

        // Fetch contributions for this project via the API route
        try {
          const res = await fetch(`/api/projects/${data.id}/contributions`);
          if (res.ok) {
            const json = await res.json();
            setContributions(json.contributions ?? []);
          }
        } catch (contribErr) {
          // Non-fatal — timeline simply won't render
          console.warn('[ProjectDetail] Could not fetch contributions:', contribErr);
        }
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        setError(err.message || "Project not found");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[#020202]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-3xl">
            <div className="w-24 opacity-50 grayscale aspect-[9/16] bg-zinc-900 rounded-2xl border border-white/5 mx-auto" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">Project Not Found</h1>
          <p className="max-w-md text-lg text-zinc-400 leading-relaxed mb-12">
            We couldn't retrieve the details for <span className="text-white font-bold">"{slug}"</span>.
            It may have been moved, deleted, or the database connection failed.
          </p>
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!project) return <ProjectSkeleton />; // Fallback during transition



  return (
    <main className="min-h-screen bg-[#020202] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/#projects"
          className="group mb-16 inline-flex items-center text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-24"
        >
          {/* Header & Description */}
          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col gap-10">
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl"
                >
                  {project.title}
                </motion.h1>
                <p className="text-xl leading-relaxed text-zinc-400 lg:text-2xl font-medium">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.tech_stack?.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/5 bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-indigo-400 backdrop-blur-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 pt-6">
                {project.repo_link && (
                  <a
                    href={project.repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105"
                  >
                    <Github className="mr-3 h-5 w-5" />
                    Source Code
                  </a>
                )}
                {project.demo_link && (
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                  >
                    <ExternalLink className="mr-3 h-5 w-5" />
                    Live Preview
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="flex flex-col gap-12 border-l border-white/5 pl-0 lg:pl-16">
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-500 mb-4">The Challenge</h2>
                <p className="text-lg leading-relaxed text-zinc-300">{project.problem_statement}</p>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-500 mb-4">The Solution</h2>
                <p className="text-lg leading-relaxed text-zinc-300">{project.solution_details}</p>
              </section>

              {project.architecture_notes && (
                <section>
                  <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-500 mb-4">Architecture</h2>
                  <p className="text-lg leading-relaxed text-zinc-300">{project.architecture_notes}</p>
                </section>
              )}
            </div>
          </div>

          {/* Horizontal Screenshots Gallery */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 px-4">
              <h2 className="text-3xl font-bold tracking-tight">Visual Interface</h2>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="relative group -mx-6 sm:-mx-12">
              <motion.div
                ref={scrollRef}
                drag="x"
                dragConstraints={constraints}
                dragElastic={0.1}
                style={{ touchAction: 'pan-y' }}
                className="flex gap-8 px-6 sm:px-12 pb-12 cursor-grab active:cursor-grabbing"
              >
                {project.screenshots?.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    onTap={() => setSelectedImage(screenshot)}
                    className="relative min-w-[260px] sm:min-w-[400px] aspect-[9/16] flex-shrink-0 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#050505] shadow-[0_0_40px_-10px_rgba(79,70,229,0.1)] border border-white/[0.08] cursor-zoom-in select-none group/img"
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105 pointer-events-none"
                      sizes="(max-width: 768px) 300px, 450px"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity group-hover/img:opacity-0 pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Fog effects for edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020202] to-transparent z-10 opacity-40" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020202] to-transparent z-10 opacity-40" />
            </div>
          </section>

          {/* ── My Contributions Timeline ── */}
          {contributions.length > 0 && (
            <ProjectTimeline contributions={contributions} />
          )}

          {/* CTA */}
          <div className="pb-32 pt-8 text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-3 rounded-full bg-white/5 px-10 py-5 text-sm font-bold text-white transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 border border-white/10 backdrop-blur-xl"
            >
              Explore More Projects
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          {/* Lightbox Dialog */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-12 backdrop-blur-sm cursor-zoom-out"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative max-w-full max-h-full aspect-[9/16] w-[450px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedImage}
                    alt="Project screenshot"
                    fill
                    className="rounded-3xl object-contain"
                    sizes="100vw"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
                  >
                    Close [×]
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

function ProjectSkeleton() {
  return (
    <main className="min-h-screen bg-[#020202] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Back Link Shimmer */}
        <div className="mb-16 flex items-center gap-2">
          <div className="h-4 w-4 bg-white/5 rounded-full animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        </div>

        <div className="flex flex-col gap-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col gap-10">
              <div className="space-y-8">
                {/* Title Shimmer */}
                <div className="relative h-20 w-full lg:h-32 bg-white/5 rounded-3xl overflow-hidden animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>
                {/* Description Shimmer */}
                <div className="space-y-4">
                  <div className="h-6 w-full bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-6 w-5/6 bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-6 w-4/6 bg-white/5 rounded-lg animate-pulse" />
                </div>
              </div>

              {/* Tags Shimmer */}
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-28 bg-white/5 rounded-full animate-pulse" />
                ))}
              </div>

              {/* Buttons Shimmer */}
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="h-14 w-44 bg-white/10 rounded-2xl animate-pulse" />
                <div className="h-14 w-44 bg-indigo-500/10 rounded-2xl animate-pulse" />
              </div>
            </div>

            {/* Sidebar Details Shimmer */}
            <div className="flex flex-col gap-12 border-l border-white/5 pl-0 lg:pl-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-20 w-full bg-white/5 rounded-2xl animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Shimmer */}
          <div className="flex gap-10 overflow-hidden px-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[600px] min-w-[340px] bg-white/5 rounded-[3rem] border-[6px] border-white/5 animate-pulse relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-zinc-800 rounded-b-3xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
