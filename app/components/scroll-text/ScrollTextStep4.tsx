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

const content = `In Chronicle everything is made with Blocks that come with pixel perfect design, interactivity and motion out of the box. Instead of designing from scratch, simply choose the right one from our library of blocks and see the magic unfold.`;

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
        <p className="w-full text-xl font-bold leading-snug md:text-3xl xl:text-5xl">
          {wordsArray.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index !== 0 && <span className="inline-block">&nbsp;</span>}
                <Word
                  content={item}
                  threshold={activeThresholds[index]}
                  scrollProgress={scrollYProgress}
                />
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
      className="inline-block transition duration-300"
    >
      {content}
    </motion.span>
  );
};

export default ScrollTextStep4;
