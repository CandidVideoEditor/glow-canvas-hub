import React from 'react';
import bannerBg from '../assets/banner-bg.png';

const Banner: React.FC = () => {
  return (
    <div 
      className="relative w-full h-48 overflow-hidden group"
      style={{
        backgroundImage: `url(${bannerimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Glowing border animation on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
             style={{borderImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) 1'}} />
      </div>
      
      {/* Floating particles effect */}
      <div className="floating-dots">
        {Array.from({length: 5}).map((_, i) => (
          <div 
            key={i}
            className="floating-dot"
            style={{
              left: `${20 + i * 15}%`,
              width: '6px',
              height: '6px',
              animationDelay: `${i * 1.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
