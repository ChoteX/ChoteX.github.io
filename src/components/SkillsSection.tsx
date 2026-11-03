import type { ReactNode } from 'react';
import { HIGH_LEVEL_SKILLS, type SkillIconId } from '../data/portfolioData';

function SkillLogo({ id }: { id: SkillIconId }): ReactNode {
  switch (id) {
    case 'cpp':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden="true">
          <polygon
            points="18,2 32,10 32,26 18,34 4,26 4,10"
            fill="#00599C"
          />
          <path
            d="M16.5 23.8c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c2 0 3.8 1 4.8 2.6l-2.4 1.4c-.5-.8-1.4-1.3-2.4-1.3-1.7 0-3 1.3-3 3.1s1.3 3.1 3 3.1c1 0 1.9-.5 2.4-1.3l2.4 1.4c-1 1.6-2.8 2.6-4.8 2.6z"
            fill="#ffffff"
          />
          <path
            d="M23.5 16.5h1.5V15h1.4v1.5h1.5v1.4h-1.5v1.5H25v-1.5h-1.5v-1.4zm5 0H30V15h1.4v1.5h1.5v1.4h-1.5v1.5H30v-1.5h-1.5v-1.4z"
            fill="#ffffff"
          />
        </svg>
      );
    case 'embedded':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <rect
            x="9"
            y="9"
            width="18"
            height="18"
            rx="3"
            fill="#2b2b2b"
            stroke="#fb8472"
            strokeWidth="2"
          />
          <rect x="14" y="14" width="8" height="8" rx="1.5" fill="#ddd2d0" />
          <path
            d="M13 4v5M18 4v5M23 4v5M13 27v5M18 27v5M23 27v5M4 13h5M4 18h5M4 23h5M27 13h5M27 18h5M27 23h5"
            stroke="#ddd2d0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'robotics':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <path
            d="M8 29h20M13 29v-5l6-8 6 3"
            stroke="#ddd2d0"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="24" r="2.8" fill="#fb8472" />
          <circle cx="19" cy="16" r="2.8" fill="#fb8472" />
          <path
            d="M25 19l4-3m-4 3l3 4"
            stroke="#fb8472"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'pytorch':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden="true">
          <path
            d="M24.6 12.2l-2.1 2.1a7.8 7.8 0 1 1-11 0l6.6-6.6V3.5L9.4 12.2a12 12 0 1 0 17 0l-1.8 0z"
            fill="#EE4C2C"
          />
          <circle cx="22.8" cy="8.5" r="2.2" fill="#EE4C2C" />
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <ellipse cx="18" cy="9" rx="10" ry="4" fill="#336791" stroke="#ddd2d0" strokeWidth="1.8" />
          <path
            d="M8 9v9c0 2.2 4.5 4 10 4s10-1.8 10-4V9"
            stroke="#ddd2d0"
            strokeWidth="1.8"
          />
          <path
            d="M8 18v9c0 2.2 4.5 4 10 4s10-1.8 10-4v-9"
            stroke="#fb8472"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'cad':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <polygon
            points="18,5 30,12 30,24 18,31 6,24 6,12"
            stroke="#ddd2d0"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M6 12l12 7 12-7M18 19v12"
            stroke="#fb8472"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'kicad':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden="true">
          <rect x="4" y="6" width="28" height="24" rx="4" fill="#314CB0" />
          <text
            x="18"
            y="23"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="14"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
          >
            Ki
          </text>
          <circle cx="27.5" cy="11.5" r="2" fill="#FF6D00" />
        </svg>
      );
    case 'linux':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <rect
            x="4"
            y="7"
            width="28"
            height="22"
            rx="3.5"
            fill="#2b2b2b"
            stroke="#ddd2d0"
            strokeWidth="1.8"
          />
          <path
            d="M10 14l5 4-5 4M17 22h7"
            stroke="#fb8472"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'matlab':
      return (
        <svg viewBox="0 0 36 36" className="h-7 w-7" fill="none" aria-hidden="true">
          <path
            d="M5 25l8-6 6-11 6 10 6 7-9 2-7-5-10 3z"
            fill="#E16737"
            stroke="#f4eeec"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative pb-16 sm:pb-24">
      {/* Sticky Section Header */}
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            Skills
          </h2>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGH_LEVEL_SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-4 rounded-xl border border-[#ddd2d0]/15 bg-[#232323] p-4 transition hover:border-[#fb8472]/60"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#ddd2d0]/15 bg-[#1b1b1b]">
                <SkillLogo id={skill.id} />
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-[#f4eeec]">
                  {skill.name}
                </h3>
                <p className="mt-0.5 text-xs text-[#ddd2d0]/80">
                  {skill.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
