'use client';

import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  { text: 'model.fit(X_train, y_train)', x: '8%', y: '20%', delay: 0 },
  { text: 'accuracy: 97.3%', x: '75%', y: '15%', delay: 1.2 },
  { text: 'SELECT * FROM predictions', x: '5%', y: '70%', delay: 0.6 },
  { text: 'loss: 0.0023', x: '80%', y: '65%', delay: 1.8 },
  { text: 'df.groupby("segment")', x: '12%', y: '45%', delay: 0.3 },
  { text: 'torch.nn.LSTM()', x: '70%', y: '40%', delay: 2.1 },
  { text: 'np.mean(preds)', x: '85%', y: '85%', delay: 0.9 },
  { text: 'spark.read.parquet()', x: '3%', y: '88%', delay: 1.5 },
];

export default function FloatingCode() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {CODE_SNIPPETS.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] sm:text-[11px] whitespace-nowrap"
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [0, -15, -15, -30],
          }}
          transition={{
            duration: 8,
            delay: snippet.delay + 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        >
          <span
            className="px-2 py-1 rounded bg-white/[0.02] border border-white/[0.04]"
            style={{
              color: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
            }}
          >
            {snippet.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
