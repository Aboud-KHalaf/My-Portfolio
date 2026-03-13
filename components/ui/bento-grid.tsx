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
      whileHover={{ scale: 1.005, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`row-span-1 rounded-[2.5rem] group/bento hover:shadow-2xl hover:shadow-indigo-500/10 transition duration-300 dark:bg-[#0a0a0a] dark:border-white/[0.05] border border-transparent flex flex-col overflow-hidden ${className}`}
    >
      {header}
      <div className="flex flex-col flex-1 p-0 transition duration-200">
        <div className="flex flex-col flex-1">
          {icon}
          {title}
          {description}
        </div>
      </div>
    </motion.div>
  );
};
