let activeLocks = 0;
let previousOverflow = '';
let previousPaddingRight = '';
let previousRootOverflow = '';

export function lockBodyScroll() {
  if (activeLocks === 0) {
    const body = document.body;
    const root = document.documentElement;
    previousOverflow = body.style.overflow;
    previousPaddingRight = body.style.paddingRight;
    previousRootOverflow = root.style.overflow;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
  }

  activeLocks += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    activeLocks = Math.max(0, activeLocks - 1);

    if (activeLocks === 0) {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.documentElement.style.overflow = previousRootOverflow;
    }
  };
}
