import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export type RevealEffect = 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-fade' | 'rotate-fade';

interface ScrollRevealProps {
  children: ReactNode;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  className?: string;
}

const getVariants = (effect: RevealEffect, delay: number, duration: number): Variants => {
  switch (effect) {
    case 'slide-left':
      return {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { delay, duration, type: 'spring', bounce: 0.3 } },
      };
    case 'slide-right':
      return {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { delay, duration, type: 'spring', bounce: 0.3 } },
      };
    case 'slide-up':
      return {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { delay, duration, type: 'spring', bounce: 0.3 } },
      };
    case 'slide-down':
      return {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0, transition: { delay, duration, type: 'spring', bounce: 0.3 } },
      };
    case 'scale-fade':
      return {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { delay, duration, type: 'spring', bounce: 0.25 } },
      };
    case 'rotate-fade':
      return {
        hidden: { opacity: 0, rotate: -12, scale: 0.92 },
        visible: { opacity: 1, rotate: 0, scale: 1, transition: { delay, duration, type: 'spring', bounce: 0.25 } },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { delay, duration, type: 'spring', bounce: 0.2 } },
      };
  }
};

export default function ScrollReveal({
  children,
  effect = 'slide-up',
  delay = 0,
  duration = 0.7,
  className = '',
}: ScrollRevealProps) {
  const variants = getVariants(effect, delay, duration);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
} 