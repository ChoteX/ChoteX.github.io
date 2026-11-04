import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Skills', href: '#skills' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-[#f4eeec] transition hover:text-[#fb8472]"
        >
          {PROFILE.name}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#ddd2d0]/85 transition hover:text-[#fb8472]"
            >
              {link.label}
            </a>
          ))}

          <span className="h-3.5 w-px bg-[#ddd2d0]/20" aria-hidden="true" />

          <a
            href={PROFILE.sherekilebiWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#ddd2d0] transition hover:text-[#fb8472]"
          >
            <span>Sherekilebi Labs</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
          </a>

          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[#fb8472] pb-0.5 text-sm font-medium text-[#f4eeec] transition hover:text-[#fb8472]"
          >
            CV
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center text-[#ddd2d0] transition hover:text-[#fb8472] lg:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-[#ddd2d0]/15 bg-[#232323] px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center text-sm text-[#ddd2d0] transition hover:text-[#fb8472]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PROFILE.sherekilebiWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 pt-2 border-t border-[#ddd2d0]/15 text-sm text-[#ddd2d0] hover:text-[#fb8472]"
            >
              <span>Sherekilebi Labs</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
            </a>
            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#fb8472]"
            >
              CV (PDF)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
