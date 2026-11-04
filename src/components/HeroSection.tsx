import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const HERO_LINKS = [
  { label: 'GitHub', href: PROFILE.github, external: true },
  { label: 'LinkedIn', href: PROFILE.linkedin, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, external: false },
  { label: 'CV (PDF)', href: PROFILE.cvUrl, external: true },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip border-b border-[#ddd2d0]/15 bg-gradient-to-b from-[#181818] via-[#222222] to-[#2d2d2d] py-12 sm:py-16 lg:pt-20 lg:pb-10"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(221,210,208,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(221,210,208,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-[3px] w-[60px] bg-[#fb8472]" aria-hidden="true" />
        <h1 className="mt-7 max-w-full font-display text-[clamp(2.25rem,5vw,4.125rem)] font-semibold leading-[1.1] tracking-tight text-[#f4eeec]">
          Hi, am {PROFILE.heroName}.
        </h1>

        <div className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10">
          <div className="relative pl-[10%]">
          <span className="absolute left-0 top-[56.6%] z-10 -translate-y-1/2 font-display text-[clamp(1.25rem,4vw,2.5rem)] font-semibold italic tracking-tight text-[#f4eeec]">
            - I do
          </span>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            width={2560}
            height={1520}
            aria-label="L.A.R.A. robot arm flipping a cube"
            className="aspect-[1280/760] w-full select-none object-contain mix-blend-screen"
          >
            <source src="./media/lara-cube-flip-safari.mov" type='video/mp4; codecs="hvc1"' />
            <source src="./media/lara-cube-flip.webm" type="video/webm" />
          </video>
          </div>
          <div className="mt-4 flex justify-center sm:mt-0 sm:justify-end">
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center gap-2 border-b border-[#fb8472]/60 py-2 font-display text-sm font-semibold text-[#f4eeec] transition-colors hover:text-[#fb8472] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fb8472] sm:text-base"
            >
              Explore project L.A.R.A.
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#fb8472]" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-10 sm:gap-x-9">
          {HERO_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group inline-flex min-h-11 items-center gap-1.5 border-b border-[#ddd2d0]/30 py-2 text-base font-medium text-[#f4eeec] transition-colors hover:border-[#fb8472] hover:text-[#fb8472] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fb8472] sm:text-lg"
            >
              <span>{link.label}</span>
              {link.external && <ArrowUpRight className="h-5 w-5 text-[#fb8472]" aria-hidden="true" />}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
