import { useEffect, useRef, type RefObject } from 'react';
import { lockBodyScroll } from './bodyScrollLock';

const modalStack: symbol[] = [];
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalOptions {
  isOpen: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
  returnFocus: HTMLElement | null;
}

/** Keep nested dialogs focused and let only the top dialog handle Escape. */
export function useModal({ isOpen, onClose, dialogRef, closeRef, returnFocus }: ModalOptions) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const token = Symbol('modal');
    modalStack.push(token);
    const releaseBodyScroll = lockBodyScroll();
    const isTopModal = () => modalStack[modalStack.length - 1] === token;
    const focusClose = () => closeRef.current?.focus({ preventScroll: true });
    focusClose();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTopModal()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        onCloseRef.current();
      } else if (event.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const elements = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
          .filter((element) => element.tabIndex >= 0 && !element.closest('[inert]') && element.getClientRects().length > 0);
        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!first || !last) {
          event.preventDefault();
          focusClose();
        } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (isTopModal() && event.target instanceof Node && !dialogRef.current?.contains(event.target)) {
        focusClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusin', handleFocusIn);
      const index = modalStack.indexOf(token);
      if (index !== -1) modalStack.splice(index, 1);
      releaseBodyScroll();
      if (returnFocus?.isConnected && !returnFocus.closest('[inert]')) {
        returnFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, dialogRef, closeRef, returnFocus]);
}
