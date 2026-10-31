import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SlideImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface RotatingImageProps {
  images: SlideImage[];
  interval?: number;
  className?: string;
  imageClassName?: string;
  showIndicators?: boolean;
  indicatorPosition?: 'bottom-center' | 'bottom-right' | 'bottom-left';
  overlay?: React.ReactNode;
}

export const RotatingImage: React.FC<RotatingImageProps> = ({
  images,
  interval = 6000,
  className = '',
  imageClassName = '',
  showIndicators = true,
  indicatorPosition = 'bottom-center',
  overlay,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all images to avoid any flicker during rotation
  useEffect(() => {
    images.forEach((img) => {
      const imageLoader = new Image();
      imageLoader.src = img.src;
    });
  }, [images]);

  // Rotate image every 6 seconds
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  const getIndicatorPositionClass = () => {
    switch (indicatorPosition) {
      case 'bottom-left':
        return 'bottom-4 left-6 justify-start';
      case 'bottom-right':
        return 'bottom-4 right-6 justify-end';
      case 'bottom-center':
      default:
        return 'bottom-3 left-1/2 -translate-x-1/2 justify-center';
    }
  };

  return (
    <div className={twMerge('relative overflow-hidden', className)}>
      {images.map((img, idx) => {
        const isActive = idx === currentIndex;
        return (
          <img
            key={`${img.src}-${idx}`}
            src={img.src}
            alt={img.alt}
            style={{ objectPosition: img.objectPosition || 'center' }}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              isActive
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0 pointer-events-none'
            } ${imageClassName}`}
          />
        );
      })}

      {overlay}

      {showIndicators && images.length > 1 && (
        <div
          className={`absolute z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 transition-opacity duration-300 ${getIndicatorPositionClass()}`}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-white shadow-sm'
                  : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
