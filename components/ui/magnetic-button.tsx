'use client';

import { useRef, useState } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'motion/react';

export function MagneticButton({
  children,
  className = '',
  onClick,
  whileHover,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  whileHover?: VariantLabels | TargetAndTransition;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
      whileHover={whileHover}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
