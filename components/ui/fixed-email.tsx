'use client';

import { motion } from 'motion/react';

export function FixedEmail() {
    return (
        <div className="fixed right-8 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="[writing-mode:vertical-rl] mb-4"
            >
                <a
                    href="mailto:aboud.khalaf.eng@gmail.com"
                    className="text-xs font-bold tracking-[0.2em] text-zinc-500 hover:text-indigo-400 transition-all hover:-translate-y-1 block duration-300"
                >
                    aboud.khalaf.eng@gmail.com
                </a>
            </motion.div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100px' }}
                transition={{ delay: 1.5, duration: 1 }}
                className="w-px bg-zinc-800"
            />
        </div>
    );
}
