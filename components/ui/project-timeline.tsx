'use client';

import { motion } from 'motion/react';
import type { Contribution } from '@/lib/contributions/contribution.service';

// Badge color map — each contribution_type gets a distinct accent
const TYPE_STYLES: Record<string, { bg: string; text: string; glow: string }> = {
    UI: {
        bg: 'bg-pink-500/10',
        text: 'text-pink-400',
        glow: 'shadow-pink-500/20',
    },
    Backend: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        glow: 'shadow-emerald-500/20',
    },
    Architecture: {
        bg: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        glow: 'shadow-indigo-500/20',
    },
    Performance: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        glow: 'shadow-amber-500/20',
    },
    AI: {
        bg: 'bg-violet-500/10',
        text: 'text-violet-400',
        glow: 'shadow-violet-500/20',
    },
    Feature: {
        bg: 'bg-sky-500/10',
        text: 'text-sky-400',
        glow: 'shadow-sky-500/20',
    },
};

const DEFAULT_TYPE_STYLE = {
    bg: 'bg-white/5',
    text: 'text-zinc-400',
    glow: 'shadow-white/10',
};

function ContributionBadge({ type }: { type: string }) {
    const style = TYPE_STYLES[type] ?? DEFAULT_TYPE_STYLE;
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${style.bg} ${style.text} border border-current/20`}
        >
            {type}
        </span>
    );
}

function TimelineItem({
    item,
    index,
    isLast,
}: {
    item: Contribution;
    index: number;
    isLast: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.19, 1, 0.22, 1],
            }}
            className={`relative flex gap-8 group ${!isLast ? 'pb-4' : ''}`}
        >
            {/* Left — Timeline track */}
            <div className="flex flex-col items-center flex-shrink-0">
                {/* Node */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: index * 0.12 + 0.2, duration: 0.4, type: 'spring' }}
                    className="relative z-10 mt-1"
                >
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Node dot */}
                    <div className="relative w-3 h-3 rounded-full bg-indigo-500 border-2 border-indigo-400/50 shadow-lg shadow-indigo-500/40 group-hover:scale-125 transition-transform duration-300" />
                </motion.div>

                {/* Connector line */}
                {!isLast && (
                    <div className="relative flex-1 mt-2 w-px">
                        {/* Static base line */}
                        <div className="absolute inset-0 bg-white/5" />
                        {/* Glowing animated layer */}
                        <motion.div
                            initial={{ scaleY: 0, originY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ delay: index * 0.12 + 0.35, duration: 0.8, ease: 'easeOut' }}
                            className="absolute inset-0 bg-gradient-to-b from-indigo-500/40 to-transparent"
                        />
                    </div>
                )}
            </div>

            {/* Right — Content card */}
            <div className="flex-1">
                <motion.div
                    whileHover={{ y: -3, scale: 1.005 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden group/card"
                >
                    {/* Hover glow fill */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Top left corner accent */}
                    <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-indigo-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 h-12 w-px bg-gradient-to-b from-indigo-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col gap-3">
                        {/* Badge */}
                        {item.contribution_type && (
                            <ContributionBadge type={item.contribution_type} />
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white leading-snug group-hover/card:text-indigo-100 transition-colors duration-300">
                            {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                            <p className="text-sm leading-relaxed text-zinc-400 group-hover/card:text-zinc-300 transition-colors duration-300">
                                {item.description}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

interface ProjectTimelineProps {
    contributions: Contribution[];
}

export default function ProjectTimeline({ contributions }: ProjectTimelineProps) {
    if (!contributions || contributions.length === 0) return null;

    return (
        <section className="space-y-12">
            {/* Section header */}
            <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="text-3xl font-bold tracking-tight"
                    >
                        My Contributions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
                        className="text-sm text-zinc-500"
                    >
                        Engineering work I personally designed and built for this project.
                    </motion.p>
                </div>
                <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Timeline list */}
            <div className="pl-2 sm:pl-4">
                {contributions.map((item, index) => (
                    <TimelineItem
                        key={item.id}
                        item={item}
                        index={index}
                        isLast={index === contributions.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
