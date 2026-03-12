'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={`grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`row-span-1 rounded-3xl group/bento hover:shadow-2xl hover:shadow-indigo-500/10 transition duration-300 shadow-input dark:shadow-none p-4 dark:bg-zinc-900/50 dark:border-white/[0.05] bg-white border border-transparent justify-between flex flex-col space-y-4 backdrop-blur-md ${className}`}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 tracking-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-400">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
