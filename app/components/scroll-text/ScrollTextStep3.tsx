import React, { useRef } from 'react';
import {
  useScroll,
  motion,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useMotionValue,
} from 'framer-motion';

const ScrollTextStep3: React.FC = () => {
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
      top.set('auto');
      bottom.set(0);
    }
    if (value > 0) {
      top.set(0);
      bottom.set('auto');
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
            In Chronicle everything is made with Blocks that come with pixel
            perfect design, interactivity and motion out of the box. Instead of
            designing from scratch, simply choose the right one from our library
            of blocks and see the magic unfold.
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollTextStep3;
