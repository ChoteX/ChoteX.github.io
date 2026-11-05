import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const HERO_LINKS = [
  { label: 'GitHub', href: PROFILE.github, external: true },
  { label: 'LinkedIn', href: PROFILE.linkedin, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, external: false },
  { label: 'CV (PDF)', href: PROFILE.cvUrl, external: true },
];

interface HeroSectionProps {
  onOpenProject: (projectId: string, trigger: HTMLElement) => void;
}

export function HeroSection({ onOpenProject }: HeroSectionProps) {
  const [isRobotHovered, setIsRobotHovered] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-x-clip border-b border-ink/15 bg-gradient-to-b from-deep via-surface to-canvas py-12 sm:py-16 lg:pt-[124px] lg:pb-0"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,221,215,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,221,215,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:-mt-[245px] lg:flex-row lg:items-stretch">
          <div className="relative shrink-0">
            <div className="pointer-events-none invisible hidden select-none lg:block lg:pr-3" aria-hidden="true">
              <div className="h-[3px] w-[60px]" />
              <div className="mt-7 whitespace-nowrap font-display text-[3.375rem] font-semibold tracking-tight xl:text-[4.125rem]">
                Hi, I'm {PROFILE.heroName}.
              </div>
            </div>
            <div className="lg:absolute lg:left-0 lg:top-[56.6%] lg:-translate-y-[calc(100%+0.975rem)]">
              <div className="h-[3px] w-[60px] bg-accent" aria-hidden="true" />
              <h1 className="mt-7 font-display text-[clamp(2.25rem,5vw,4.125rem)] font-semibold leading-[1.1] tracking-tight text-ink-strong lg:whitespace-nowrap lg:text-[3.375rem] lg:leading-normal xl:text-[4.125rem]">
                Hi, I'm {PROFILE.heroName}.
              </h1>
            </div>
          </div>

          <div className="relative mt-8 flex w-full max-w-5xl items-stretch sm:mt-10 lg:mt-0 lg:min-w-0 lg:max-w-none lg:flex-1 lg:-translate-x-[440px] lg:translate-y-[3.375rem]">
            <div className="absolute left-0 top-[56.6%] z-10 -translate-y-1/2 lg:relative lg:left-auto lg:top-auto lg:shrink-0 lg:translate-x-[50px] lg:translate-y-[-2px]">
              <span className="pointer-events-none invisible hidden select-none whitespace-nowrap font-display text-[2.8125rem] font-semibold italic tracking-tight lg:block xl:text-[2.5rem]" aria-hidden="true">
                - I do
              </span>
              <span className="whitespace-nowrap font-display text-[clamp(1.25rem,4vw,2.5rem)] font-semibold italic tracking-tight text-ink-strong lg:absolute lg:left-0 lg:top-[56.6%] lg:-translate-y-1/2 lg:text-[2.8125rem] xl:text-[2.5rem]">
                - I do
              </span>
            </div>

            <div
              className="relative ml-[10%] aspect-[1280/760] w-[90%] shrink-0 lg:-ml-[5.2%] lg:w-[1260px] lg:max-w-[1260px]"
              onMouseLeave={() => setIsRobotHovered(false)}
            >
              <video autoPlay loop muted playsInline preload="metadata" width={2560} height={1520}
                aria-label="L.A.R.A. robot arm flipping a cube"
                className="pointer-events-none h-full w-full select-none object-contain mix-blend-screen">
                <source src="./media/lara-cube-flip-safari.mov" type='video/mp4; codecs="hvc1"' />
                <source src="./media/lara-cube-flip.webm" type="video/webm" />
              </video>

              <div className="absolute inset-y-0 right-0 left-1/3 z-20 hidden cursor-default lg:block"
                onMouseEnter={() => setIsRobotHovered(true)} aria-hidden="true" />
              <div
                className="absolute z-30 hidden items-center transition-[transform,opacity] duration-500 ease-out lg:flex"
                style={{
                  top: 'calc(89.5% - 30px)',
                  right: 'calc(100% - 54.4% + 10px)',
                  transform: isRobotHovered ? 'translate(0, -50%)' : 'translate(80px, -50%)',
                  opacity: isRobotHovered ? 1 : 0,
                  pointerEvents: isRobotHovered ? 'auto' : 'none',
                }}
                onMouseEnter={() => setIsRobotHovered(true)}
                onFocus={() => setIsRobotHovered(true)}
                onBlur={() => setIsRobotHovered(false)}
              >
                <button type="button" onClick={(event) => onOpenProject('lara', event.currentTarget)} aria-haspopup="dialog"
                  className="group inline-flex min-h-11 items-center gap-2 whitespace-nowrap border border-accent/60 bg-surface/95 px-5 py-2.5 font-display text-base font-semibold text-ink-strong shadow-lg shadow-black/50 backdrop-blur-md transition-colors hover:border-accent hover:bg-canvas hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  Explore project L.A.R.A.
                  <ArrowUpRight className="h-4.5 w-4.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
                <div className="ml-[10px] h-[2px] w-[60px] rounded-full bg-accent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center sm:justify-end lg:hidden">
          <button type="button" onClick={(event) => onOpenProject('lara', event.currentTarget)} aria-haspopup="dialog"
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-accent bg-accent px-5 py-2.5 font-display text-sm font-semibold text-deep transition-colors hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base">
            Explore project L.A.R.A.
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-10 sm:gap-x-9 lg:absolute lg:bottom-[30px] lg:left-8 lg:z-20 lg:mt-0">
          {HERO_LINKS.map((link) => (
            <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}
              className="group inline-flex min-h-11 items-center gap-1.5 border-b border-ink/30 py-2 text-base font-medium text-ink-strong transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-lg">
              <span>{link.label}</span>
              {link.external && <ArrowUpRight className="h-5 w-5 text-accent" aria-hidden="true" />}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
