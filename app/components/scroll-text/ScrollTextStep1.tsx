import React, { useState } from 'react';

const ScrollTextStep1: React.FC = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-5">
      <div className="mx-auto max-w-md xl:max-w-4xl">
        <span
          style={{
            backgroundImage: `linear-gradient(to right, white ${progress}%, #202020 ${progress}%)`,
          }}
          className="bg-clip-text text-xl font-bold leading-snug text-transparent md:text-3xl xl:text-5xl"
        >
          In Chronicle everything is made with Blocks that come with pixel
          perfect design, interactivity and motion out of the box. Instead of
          designing from scratch, simply choose the right one from our library
          of blocks and see the magic unfold.
        </span>
        <br />
        <input
          type="range"
          value={progress}
          onChange={(e) => setProgress(e.target.valueAsNumber)}
          min={0}
          max={100}
          step={1}
          className="mt-10 w-full"
        />
      </div>
    </div>
  );
};

export default ScrollTextStep1;
