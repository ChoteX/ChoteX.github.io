import { useRef } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../useModal';

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

interface ImageLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}

export function ImageLightbox({ item, onClose, returnFocus }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModal({ isOpen: item !== null, onClose, dialogRef, closeRef, returnFocus });

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2c2c2c]/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title ?? item.alt}
        className="relative flex max-h-[90dvh] w-full min-w-0 max-w-4xl flex-col overflow-hidden rounded-xl border border-[#ddd2d0]/20 bg-[#232323] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#ddd2d0]/15 px-5 py-3">
          <span className="min-w-0 truncate font-display text-sm font-medium text-[#f4eeec]">
            {item.title ?? item.alt}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[#ddd2d0]/80 transition-colors hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
            aria-label="Close image preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#1b1b1b] p-4 sm:p-6">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[60dvh] w-auto max-w-full rounded object-contain sm:max-h-[72dvh]"
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
