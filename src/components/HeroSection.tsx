import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function HeroSection() {
  const [isRobotHovered, setIsRobotHovered] = useState(false);

  const links = [
    {
      label: 'GitHub',
      href: PROFILE.github,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: PROFILE.linkedin,
      external: true,
    },
    {
      label: 'Email',
      href: `mailto:${PROFILE.email}`,
      external: false,
    },
    {
      label: 'CV (PDF)',
      href: PROFILE.cvUrl,
      external: true,
    },
  ];

  return (
    <section
      id="top"
      className="relative overflow-x-clip border-b border-[#ddd2d0]/15 pt-[116px] pb-12 sm:pt-[124px] sm:pb-16 lg:pt-[124px] lg:pb-0"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:-mt-[245px]">
          {/* Title column: bottom-right corner sits directly above the start of "I do" */}
          <div className="relative shrink-0">
            {/* Invisible width sizer for lg+ flex layout */}
            <div
              className="invisible hidden select-none pointer-events-none lg:block lg:pr-3"
              aria-hidden="true"
            >
              <div className="h-[3px] w-[60px]" />
              <div className="mt-7 font-display text-[2.8125rem] font-semibold tracking-tight sm:text-[3.375rem] xl:text-[4.125rem] whitespace-nowrap">
                Hi, am {PROFILE.heroName}.
              </div>
            </div>

            <div className="lg:absolute lg:left-0 lg:top-[56.6%] lg:-translate-y-[calc(100%+0.975rem)]">
              <div className="h-[3px] w-[60px] bg-[#fb8472]" aria-hidden="true" />
              <h1 className="mt-7 font-display text-[2.8125rem] font-semibold tracking-tight text-[#f4eeec] sm:text-[3.375rem] xl:text-[4.125rem] whitespace-normal sm:whitespace-nowrap">
                Hi, am {PROFILE.heroName}.
              </h1>
            </div>
          </div>

          {/* "I do" + L.A.R.A. cube-flipping video aligned on the cube text horizontal axis */}
          <div className="mt-1 flex items-stretch translate-y-[3.375rem] lg:mt-0 lg:min-w-0 lg:flex-1 lg:-translate-x-[440px]">
            <div className="relative z-10 shrink-0 translate-x-[50px] translate-y-[-2px]">
              <span
                className="invisible block select-none pointer-events-none font-display text-4xl font-semibold tracking-tight sm:text-[2.8125rem] xl:text-[2.5rem] whitespace-nowrap italic"
                aria-hidden="true"
              >
                - I do
              </span>
              <span className="absolute left-0 top-[56.6%] -translate-y-1/2 font-display text-4xl font-semibold tracking-tight text-[#f4eeec] sm:text-[2.8125rem] xl:text-[2.5rem] whitespace-nowrap italic">
                - I do
              </span>
            </div>

            <div className="relative -ml-[5.2%] w-full max-w-[960px] shrink-0 aspect-[1280/760] sm:min-w-[522px] lg:w-[1260px] lg:max-w-[1260px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                width={2560}
                height={1520}
                className="h-full w-full object-contain select-none pointer-events-none"
              >
                <source
                  src="./media/lara-cube-flip-safari.mov"
                  type='video/mp4; codecs="hvc1"'
                />
                <source
                  src="./media/lara-cube-flip.webm"
                  type="video/webm"
                />
              </video>

              {/* Invisible interaction area covering the right 2/3 of the video window (around the robot) */}
              <div
                className="absolute left-[33.333%] right-0 top-0 bottom-0 z-20 cursor-default"
                onMouseEnter={() => setIsRobotHovered(true)}
                onMouseLeave={() => setIsRobotHovered(false)}
                aria-label="L.A.R.A. robot interaction area"
              />

              {/* Hover annotation: button + connecting orange line to robot base */}
              <div
                className="absolute z-30 flex items-center transition-all duration-500 ease-out"
                style={{
                  top: 'calc(89.5% - 30px)',
                  right: 'calc(100% - 54.4% + 10px)',
                  transform: isRobotHovered
                    ? 'translate(0, -50%)'
                    : 'translate(80px, -50%)',
                  opacity: isRobotHovered ? 1 : 0,
                  pointerEvents: isRobotHovered ? 'auto' : 'none',
                }}
                onMouseEnter={() => setIsRobotHovered(true)}
                onMouseLeave={() => setIsRobotHovered(false)}
              >
                <a
                  href="#lara"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('lara')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#fb8472]/60 bg-[#242424]/95 px-5 py-2.5 font-display text-sm sm:text-base font-semibold text-[#f4eeec] shadow-lg shadow-black/50 backdrop-blur-md transition hover:border-[#fb8472] hover:bg-[#2d2d2d] hover:text-[#fb8472] whitespace-nowrap"
                >
                  <span>explore project L.A.R.A.</span>
                  <ArrowUpRight className="h-4.5 w-4.5 text-[#fb8472] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* UI-matching orange line with 10px spacing from button and 10px spacing from robot base */}
                <div
                  className="h-[2px] w-[60px] ml-[10px] bg-[#fb8472] rounded-full transition-opacity duration-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links row: aligned 30px up from the hero page bottom border, starting at the same indentation as the title */}
        <div className="absolute bottom-[30px] left-5 sm:left-8 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-9 z-20">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center gap-1.5 border-b border-[#ddd2d0]/30 pb-1 text-base sm:text-lg font-medium text-[#f4eeec] transition hover:border-[#fb8472] hover:text-[#fb8472]"
            >
              <span>{link.label}</span>
              {link.external && (
                <ArrowUpRight className="h-5 w-5 text-[#fb8472] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
