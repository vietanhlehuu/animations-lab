import React, { useMemo, useRef } from 'react';
import {
  useScroll,
  motion,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
} from 'framer-motion';

const content = `Scroll-linked animations are when the progress of an animation is directly tied to scroll progress. Scroll-triggered animations are when a normal animation is triggered when an element enters or leaves the viewport.`;

const wordsArray = content.split(' ');

const ScrollTextStep4: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  });

  const activeThresholds = useMemo(() => {
    const contentLength = wordsArray.join('').length;
    const snap: number[] = [];

    wordsArray.forEach((word, index) => {
      if (index === 0) {
        snap[index] = 0.001;
      }
      snap[index + 1] = snap[index] + word.length / contentLength;
    });

    return snap;
  }, []);

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
        <p className="w-full text-xl font-bold leading-snug md:text-3xl xl:text-5xl">
          {wordsArray.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Word
                  content={item}
                  threshold={activeThresholds[index]}
                  scrollProgress={scrollYProgress}
                />{' '}
              </React.Fragment>
            );
          })}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Word: React.FC<{
  content: string;
  threshold: number;
  scrollProgress: MotionValue;
}> = ({ content, threshold, scrollProgress }) => {
  const color = useTransform(() => {
    return scrollProgress.get() >= threshold ? '#fff' : '#202020';
  });

  return (
    <motion.span
      style={{
        color,
      }}
      className="transition duration-300"
    >
      {content}
    </motion.span>
  );
};

export default ScrollTextStep4;
