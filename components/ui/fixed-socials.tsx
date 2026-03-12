'use client';

import { motion } from 'motion/react';
import { Mail, Linkedin } from 'lucide-react';

const socials = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/aboud-khalaf-526675388',
        icon: <Linkedin className="h-5 w-5" />,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/Aboud_Khalaf', // Assuming this is the pattern based on others
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'LeetCode',
        href: 'https://leetcode.com/u/_ABOUD/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M13.483 0a1.374 1.374 0 00-.961.414l-4.377 4.51a.3.3 0 01-.424.006l-2.001-1.928a.3.3 0 00-.417.006l-4.887 5.04a1.374 1.374 0 00-.006 1.954l10.203 9.808a1.374 1.374 0 001.953-.006l10.203-9.808a1.374 1.374 0 00-.006-1.954L13.483 0zm-4.377 7.51l4.377-4.51L21.43 12l-7.947 7.64-7.947-7.64 3.57-3.69z" />
            </svg>
        ),
    },
    {
        name: 'Codeforces',
        href: 'https://codeforces.com/profile/_ABOUD',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M4.5 7.5a1.5 1.5 0 011.5 1.5v8.25a1.5 1.5 0 01-1.5 1.5H1.5A1.5 1.5 0 010 17.25V9A1.5 1.5 0 011.5 7.5h3zm6.75-3.75a1.5 1.5 0 011.5 1.5V18a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 016.75 18V5.25a1.5 1.5 0 011.5-1.5h3zm6.75 3.75a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5h3z" />
            </svg>
        ),
    },
];

export function FixedSocials() {
    return (
        <div className="fixed left-8 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6">
            <div className="flex flex-col gap-6">
                {socials.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="text-zinc-500 hover:text-indigo-400 transition-colors hover:-translate-y-1 block duration-300"
                        aria-label={social.name}
                    >
                        {social.icon}
                    </motion.a>
                ))}
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100px' }}
                transition={{ delay: 1.5, duration: 1 }}
                className="w-px bg-zinc-800"
            />
        </div>
    );
}
