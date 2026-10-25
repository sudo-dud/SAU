import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Editorial imagery',
  className = '',
  containerClassName = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F1F3FF] ${containerClassName}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      ) : null}

      {(hasError || !src || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#F1F3FF] border border-[#E2E8F0] ${
            isLoaded && !hasError ? 'hidden' : 'flex'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#1A365D] mb-2">
            <BookOpen className="w-5 h-5 opacity-70" />
          </div>
          <p className="text-xs font-serif italic text-[#43474E] max-w-[200px] line-clamp-2">
            {fallbackText || alt || 'University Department Archives'}
          </p>
        </div>
      )}
    </div>
  );
};
