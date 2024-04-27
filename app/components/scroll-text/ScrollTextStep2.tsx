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
      className="flex min-h-screen items-center justify-center bg-black"
    >
      <div className="mx-auto max-w-md p-5 text-left xl:max-w-4xl">
        <motion.span
          style={{
            backgroundImage: animatedGradient,
          }}
          className="bg-clip-text text-xl font-bold leading-snug text-transparent md:text-3xl xl:text-5xl"
        >
          Scroll-linked animations are when the progress of an animation is
          directly tied to scroll progress. Scroll-triggered animations are when
          a normal animation is triggered when an element enters or leaves the
          viewport.
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ScrollTextStep2;
