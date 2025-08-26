import { useState, useEffect } from 'react';
import bannerImage from '@/assets/banner-image.jpg';

export const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[200px] overflow-hidden rounded-lg mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-animated opacity-60" />
      
      {/* Glow Effect on Hover */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? 'shadow-[inset_0_0_0_2px_rgba(147,51,234,0.5)]' : ''
        }`} 
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-in-up">
          
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            
          </p>
        </div>
      </div>
      
      {/* Floating Dots Animation */}
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary/30 animate-float-dots" />
      <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-accent/30 animate-float-dots" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-16 left-1/3 w-2 h-2 rounded-full bg-primary/40 animate-float-dots" style={{ animationDelay: '4s' }} />
    </div>
  );
};
