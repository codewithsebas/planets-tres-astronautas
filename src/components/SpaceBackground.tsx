import { SpaceBackgroundProps, Star } from '@/interfaces/spaceBackground';
import React, { useEffect, useState } from 'react';

const generateStars = (numStars: number): Star[] => {
  return Array.from({ length: numStars }, () => ({
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
  }));
};

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children }) => {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(generateStars(200));
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-black to-zinc-950 text-white sm:min-h-screen">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute animate-pulse rounded-full bg-white duration-200"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        ></div>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpaceBackground;
