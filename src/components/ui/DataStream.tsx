'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const DATA_CHARS = '01001101 11010010 ████▓▒░ { "accuracy": 0.97 } λ ∑ ∫ ∂ ▸ ← → π μ σ² SELECT * FROM predictions WHERE confidence > 0.95 model.fit() ████████ np.array([]) torch.tensor() sklearn.pipeline df.groupby() spark.read import tensorflow as tf loss: 0.0023 epoch: 100/100 ✓ deployed';

export default function DataStream({ className = '' }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  // Create two copies for seamless scrolling
  const streamContent = useMemo(() => {
    const items = DATA_CHARS.split(' ').filter(Boolean);
    return [...items, ...items];
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden py-4 ${className}`}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

      {isInView && (
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {streamContent.map((char, i) => (
            <span
              key={i}
              className="text-[10px] font-mono"
              style={{
                color: i % 7 === 0 ? '#06b6d4' : i % 5 === 0 ? '#8b5cf6' : i % 3 === 0 ? '#3b82f6' : '#1e293b',
                opacity: i % 4 === 0 ? 0.6 : 0.25,
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
