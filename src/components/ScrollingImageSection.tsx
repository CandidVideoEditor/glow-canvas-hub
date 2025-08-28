"use client";

import { useEffect, useRef } from "react";

interface ScrollingImageSectionProps {
  title: string;
  images: string[];
  speed?: number;
  direction?: "left" | "right";
}

export function ScrollingImageSection({ 
  title, 
  images, 
  speed = 50, 
  direction = "left" 
}: ScrollingImageSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;
    let scrollPosition = 0;
    const maxScroll = scrollElement.scrollWidth / 2;

    const animate = () => {
      scrollPosition += direction === "left" ? speed / 60 : -speed / 60;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      } else if (scrollPosition <= 0) {
        scrollPosition = maxScroll;
      }
      
      scrollElement.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, direction]);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{title}</h2>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* First set of images */}
        <div className="flex gap-6 animate-none">
          {images.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-80 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/320x192/6366f1/white?text=${title.replace(/\s+/g, '+')}+${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-6 animate-none">
          {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-80 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/320x192/6366f1/white?text=${title.replace(/\s+/g, '+')}+${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}