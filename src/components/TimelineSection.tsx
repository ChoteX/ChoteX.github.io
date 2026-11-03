import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  TIMELINE_ITEMS,
  type TimelineItem,
  type TimelineLogo,
} from '../data/portfolioData';

type TimelineFilter = 'all' | 'experience' | 'honour';

function LogoBadge({ logo }: { logo: TimelineLogo }) {
  const bgClass =
    logo.bg === 'white'
      ? 'bg-white p-2'
      : logo.bg === 'dark'
        ? 'bg-[#1b1b1b] p-2'
        : logo.bg === 'cream'
          ? 'bg-[#f1ece3] p-1.5'
          : 'bg-transparent';

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#ddd2d0]/20 ${bgClass} ${
        logo.wide
          ? 'h-16 w-36 sm:h-20 sm:w-44'
          : 'h-16 w-16 sm:h-20 sm:w-20'
      }`}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const rowRef = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={rowRef}
      className={`relative pl-8 transition-all duration-500 ease-out sm:pl-10 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full border transition-colors duration-500 ${
          visible
            ? 'border-[#fb8472] bg-[#fb8472]'
            : 'border-[#ddd2d0]/40 bg-[#2d2d2d]'
        }`}
      />

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-[#ddd2d0]/15 bg-[#232323] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-[#fb8472]">
              {item.period}
            </span>
            <span className="text-xs text-[#ddd2d0]/55">
              {item.kind === 'experience' ? 'Experience' : 'Honour'}
            </span>
          </div>

          <h3 className="mt-1 font-display text-base font-semibold text-[#f4eeec] sm:text-lg">
            {item.title}
          </h3>

          {item.organizationUrl ? (
            <a
              href={item.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#ddd2d0]/90 transition hover:text-[#fb8472]"
            >
              <span>{item.organization}</span>
              <ArrowUpRight className="h-3 w-3 text-[#fb8472]" />
            </a>
          ) : (
            <p className="mt-0.5 text-xs font-medium text-[#ddd2d0]/85">
              {item.organization}
            </p>
          )}

          <p className="mt-2.5 text-sm leading-relaxed text-[#ddd2d0]">
            {item.summary}
          </p>
        </div>

        <LogoBadge logo={item.logo} />
      </div>
    </li>
  );
}

export function TimelineSection() {
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const listRef = useRef<HTMLOListElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleItems = TIMELINE_ITEMS.filter((item) =>
    filter === 'all' ? true : item.kind === filter
  );

  useEffect(() => {
    const updateProgress = () => {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.65;
      const raw = (triggerY - rect.top) / Math.max(rect.height, 1);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [filter]);

  return (
    <section
      id="timeline"
      className="relative border-b border-[#ddd2d0]/15 pb-16 sm:pb-24"
    >
      {/* Sticky Section Header */}
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 sm:flex-row sm:items-end sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            Experience &amp; Honours
          </h2>

          <div
            role="tablist"
            aria-label="Filter timeline"
            className="flex flex-wrap gap-5"
          >
            {[
              { id: 'all' as const, label: 'All' },
              { id: 'experience' as const, label: 'Experience' },
              { id: 'honour' as const, label: 'Honours' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`border-b-2 pb-1 text-sm transition ${
                    active
                      ? 'border-[#fb8472] font-medium text-[#f4eeec]'
                      : 'border-transparent text-[#ddd2d0]/75 hover:text-[#ddd2d0]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="relative max-w-5xl">
          {/* Base Spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-0 w-px bg-[#ddd2d0]/20"
          />
          {/* Animated Scroll Progress Spine */}
          <div
            aria-hidden="true"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            className="absolute top-2 left-0 w-[2px] -translate-x-[0.5px] bg-[#fb8472] transition-[height] duration-150 ease-out"
          />

          <ol ref={listRef} className="space-y-6">
            {visibleItems.map((item) => (
              <TimelineRow key={item.id} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
