import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  type TimelineItem,
  type TimelineLogo,
} from '../data/portfolioData';
import { useLanguage, usePortfolio } from '../LanguageContext';

function LogoBadge({ logo }: { logo: TimelineLogo }) {
  const bgClass =
    logo.bg === 'white'
      ? 'bg-white p-2'
      : logo.bg === 'dark'
        ? 'bg-inset p-2'
        : logo.bg === 'cream'
          ? 'bg-tile p-1.5'
          : 'bg-transparent';

  return (
    <div
      className={`flex h-16 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border ${
        logo.borderless ? 'border-transparent' : 'border-ink/20'
      } ${bgClass} sm:h-20 sm:w-44`}
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

function getTimelineYear(period: string) {
  return period.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? period;
}

function TimelineRow({
  item,
  year,
  showYear,
}: {
  item: TimelineItem;
  year: string;
  showYear: boolean;
}) {
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
      className={`grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 ${
        visible ? 'opacity-100' : 'opacity-0 motion-reduce:opacity-100'
      }`}
    >
      <div className="relative text-right">
        {showYear && (
          <span className="absolute right-0 top-[55px] -translate-y-1/2 font-mono text-base font-semibold tracking-tight text-accent sm:top-[61px] sm:text-2xl lg:top-[63px]">
            {year}
          </span>
        )}
      </div>

      <div className="relative min-w-0 pl-5 sm:pl-8">
        <span
          aria-hidden="true"
          className={`absolute left-0 top-[55px] z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500 sm:top-[61px] lg:top-[63px] ${
            visible
              ? 'border-accent bg-accent'
              : 'border-ink/40 bg-canvas'
          }`}
        />

        <div className="flex flex-col justify-between gap-5 rounded-xl border border-ink/15 bg-surface p-5 lg:flex-row lg:items-start sm:p-6">
          <div className="min-w-0 flex-1">
            <span className="block font-mono text-xs leading-4 text-accent">
              {item.period}
            </span>

            <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink-strong sm:text-xl lg:text-2xl">
              {item.title}
            </h3>

            {item.organizationUrl ? (
              <a
                href={item.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-ink/90 transition hover:text-accent"
              >
                <span>{item.organization}</span>
                <ArrowUpRight className="h-3 w-3 text-accent" />
              </a>
            ) : (
              <p className="mt-0.5 text-xs font-medium text-ink/85">
                {item.organization}
              </p>
            )}

            <p className="mt-2.5 text-sm leading-relaxed text-ink">
              {item.summary}
            </p>
          </div>

          <LogoBadge logo={item.logo} />
        </div>
      </div>
    </li>
  );
}

export function TimelineSection() {
  const { t } = useLanguage();
  const { timeline: TIMELINE_ITEMS } = usePortfolio();
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const el = listRef.current;
        const progress = progressRef.current;
        if (!el || !progress) return;
        const rect = el.getBoundingClientRect();
        const triggerY = window.innerHeight * 0.65;
        const raw = (triggerY - rect.top) / Math.max(rect.height, 1);
        const clamped = Math.max(0, Math.min(1, raw));
        progress.style.transform = `translateX(-0.5px) scaleY(${clamped})`;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section
      id="timeline"
      className="relative border-b border-ink/15 pb-16 sm:pb-24"
    >
      {/* Sticky Section Header */}
      <div className="sticky top-14 z-30 border-b border-ink/15 bg-canvas/95 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 sm:flex-row sm:items-end sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl lg:text-5xl">
            {t('Timeline')}
          </h2>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="relative max-w-6xl">
          {/* Base Spine */}
          <div
            aria-hidden="true"
            className="absolute top-7 bottom-2 left-[calc(3.5rem+0.75rem)] w-px bg-ink/20 sm:left-[calc(7rem+2rem)]"
          />
          {/* Animated Scroll Progress Spine */}
          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute top-7 bottom-2 left-[calc(3.5rem+0.75rem)] w-[2px] origin-top bg-accent sm:left-[calc(7rem+2rem)]"
          />

          <ol ref={listRef} className="space-y-8 sm:space-y-10">
            {TIMELINE_ITEMS.map((item, index) => {
              const year = getTimelineYear(item.period);
              const previousYear = index > 0
                ? getTimelineYear(TIMELINE_ITEMS[index - 1].period)
                : null;

              return (
                <TimelineRow
                  key={item.id}
                  item={item}
                  year={year}
                  showYear={year !== previousYear}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
