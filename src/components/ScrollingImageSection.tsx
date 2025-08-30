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
    const itemWidth = 64 + 4; // w-16 = 64px + 4px gap
    const totalWidth = images.length * itemWidth;

    const animate = () => {
      if (direction === "left") {
        scrollPosition += speed / 20;
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= speed / 20;
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
    <div className="w-full py-0">
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Single set of unique images - no duplicates within loop */}
        <div className="flex gap-1 flex-shrink-0">
          {images.map((image, index) => (
            <div
              key={`unique-${index}`}
              className="w-16 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-sm overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/64x40/6366f1/white?text=${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop - appears after first set ends */}
        <div className="flex gap-1 flex-shrink-0">
          {images.map((image, index) => (
            <div
              key={`loop-${index}`}
              className="w-16 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-sm overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/64x40/6366f1/white?text=${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}