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
    const itemWidth = 192 + 12; // 48 * 4 (w-48 = 192px) + 12px gap
    const totalWidth = images.length * itemWidth;

    const animate = () => {
      if (direction === "left") {
        scrollPosition += speed / 60;
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= speed / 60;
        if (scrollPosition <= -totalWidth) {
          scrollPosition = 0;
        }
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
  }, [speed, direction, images.length]);

  return (
    <div className="w-full py-4">
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* First set of images */}
        <div className="flex gap-3 flex-shrink-0">
          {images.map((image, index) => (
            <div
              key={`first-${index}`}
              className="w-48 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/192x128/6366f1/white?text=Image+${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-3 flex-shrink-0">
          {images.map((image, index) => (
            <div
              key={`second-${index}`}
              className="w-48 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/192x128/6366f1/white?text=Image+${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}