import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';

const ScrollTextStep2: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  });

  const animatedGradient = useTransform(() => {
    const progress = scrollYProgress.get() * 100;
    return `linear-gradient(to right, white ${progress}%, #202020 ${progress}%)`;
  });

  return (
    <motion.div
      ref={ref}
      className="flex min-h-screen items-center justify-center bg-black py-5"
    >
      <div className="mx-auto max-w-4xl text-left">
        <motion.span
          style={{
            backgroundImage: animatedGradient,
          }}
          className="bg-clip-text text-5xl font-bold leading-snug text-transparent"
        >
          In Chronicle everything is made with Blocks that come with pixel
          perfect design, interactivity and motion out of the box. Instead of
          designing from scratch, simply choose the right one from our library
          of blocks and see the magic unfold.
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ScrollTextStep2;
