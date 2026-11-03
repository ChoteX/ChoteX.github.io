import { useEffect } from 'react';
import { X } from 'lucide-react';

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

interface ImageLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c2c2c]/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? item.alt}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#ddd2d0]/20 bg-[#232323] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#ddd2d0]/15 px-5 py-3">
          <span className="truncate font-display text-sm font-medium text-[#f4eeec]">
            {item.title ?? item.alt}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#ddd2d0]/80 transition hover:text-[#fb8472]"
            aria-label="Close image preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#1b1b1b] p-4 sm:p-6">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[72vh] w-auto max-w-full rounded object-contain"
          />
        </div>

        {item.caption && (
          <div className="border-t border-[#ddd2d0]/15 px-5 py-3 text-xs leading-relaxed text-[#ddd2d0]">
            {item.caption}
          </div>
        )}
      </div>
    </div>
  );
}
