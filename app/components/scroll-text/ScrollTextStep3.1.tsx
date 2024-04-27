import React, { useRef } from 'react';
import {
  useScroll,
  motion,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion';

const ScrollTextStep31: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  });

  const animatedGradient = useTransform(() => {
    const progress = scrollYProgress.get() * 100;
    return `linear-gradient(to right, white ${progress}%, #202020 ${progress}%)`;
  });

  const velocity = useVelocity(scrollYProgress);

  const top = useMotionValue<number | 'auto'>(0);
  const bottom = useMotionValue<number | 'auto'>('auto');

  useMotionValueEvent(velocity, 'change', (value) => {
    if (value < 0) {
      // go up
      top.set(0);
      bottom.set('auto');
    }
    if (value > 0) {
      // go down
      top.set('auto');
      bottom.set(0);
    }
  });

  const justifyContent = useTransform(() => {
    return top.get() === 'auto' ? 'flex-end' : 'flex-start';
  });

  return (
    <motion.div
      className=" flex min-h-[200vh] flex-col bg-black"
      ref={ref}
      style={{
        justifyContent,
      }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top,
          bottom,
        }}
        className="mx-auto flex min-h-screen max-w-md items-center justify-center p-5 xl:max-w-4xl"
      >
        <div>
          <motion.span
            style={{
              backgroundImage: animatedGradient,
            }}
            className="bg-clip-text text-xl font-bold leading-snug text-transparent md:text-3xl xl:text-5xl"
          >
            Scroll-linked animations are when the progress of an animation is
            directly tied to scroll progress. Scroll-triggered animations are
            when a normal animation is triggered when an element enters or
            leaves the viewport.
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollTextStep31;
