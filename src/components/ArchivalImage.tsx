import { useState } from 'react';
import { FileText } from 'lucide-react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ArchivalImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EBE6DF] dark:bg-[#231F1C] text-stone-600 dark:text-stone-300 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <FileText className="w-8 h-8 mb-2 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
        <span className="font-serif text-sm text-stone-700 dark:text-stone-200">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
