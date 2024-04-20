import type { MetaFunction } from '@remix-run/node';
import styles from '~/css/scroll-text.module.css';
import { useScroll, motion, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Scroll Text' }];
};

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const animatedGradient = useTransform(() => {
    const deg = scrollYProgress.get() * 100;
    return `linear-gradient(to right, white ${deg}%, #565656 ${deg}%)`;
  });

  return (
    <div className={styles.container}>
      <div className={styles.additionalSection}></div>
      <div className={styles.animatedSection} ref={ref}>
        <motion.span
          style={{
            backgroundImage: animatedGradient,
          }}
        >
          When a gesture is started, the browser intersects the touch-action
          values of the touched element and its ancestors, up to the one that
          implements the gesture (in other words, the first containing scrolling
          element).
        </motion.span>
      </div>
      <div className={styles.additionalSection}></div>
    </div>
  );
}
