import clsx from 'clsx';
import React from 'react';

const ScrollIndicator: React.FC<{
  direction?: 'up' | 'down';
  text?: string;
}> = ({ direction = 'down', text = 'SCROLL' }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-2xl font-bold">
      <span>{text}</span>
      <span className={clsx('flex', direction === 'up' && 'rotate-180')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={clsx('size-6 animate-bounce')}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </span>
    </div>
  );
};

export default ScrollIndicator;
