import React, { useMemo } from 'react';

const CelestialBackground = () => {
  // 🌌 GENERATE THE STARS ONCE
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.6 ? 2 : 1, 
      opacity: Math.random() * 0.8 + 0.2, 
      animationDuration: `${Math.random() * 4 + 2}s`, 
      animationDelay: `${Math.random() * 2}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Layer 1: The Void Base */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Layer 2: RESPONSIVE NEBULA CLOUDS */}
      {/* Top Left: Hot Pink/Magenta */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-fuchsia-600/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
      
      {/* Bottom Right: Golden Amber */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />
      
      {/* Top Right: Electric Violet */}
      <div className="absolute top-[10%] right-[-20%] w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-violet-600/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen" />
      
      {/* Bottom Left: Deep Cyan */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen" />

      {/* Layer 3: The Stars */}
      {stars.map((star) => (
          <div
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDuration: star.animationDuration,
                  animationDelay: star.animationDelay,
                  boxShadow: star.size > 1 ? '0 0 6px rgba(255, 255, 255, 0.9)' : 'none'
              }}
          />
      ))}
    </div>
  );
};

export default CelestialBackground;