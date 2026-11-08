import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage, usePortfolio } from '../LanguageContext';
import { LanguageToggle } from './LanguageToggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Skills', href: '#skills' },
];

export function Navbar() {
  const { t } = useLanguage();
  const { profile: PROFILE } = usePortfolio();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-5 sm:px-8">
        <a
          href="#top"
          className="min-w-0 font-display text-xs font-semibold tracking-tight text-ink-strong transition hover:text-accent sm:text-sm"
        >
          {PROFILE.name}
        </a>

        <nav
          aria-label={t('Primary navigation')}
          className="hidden items-center gap-5 xl:gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/85 transition hover:text-accent"
            >
              {t(link.label)}
            </a>
          ))}

          <span className="h-3.5 w-px bg-ink/20" aria-hidden="true" />

          <a
            href={PROFILE.sherekilebiWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-ink transition hover:text-accent"
          >
            <span>Sherekilebi Labs</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </a>

          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-accent pb-0.5 text-sm font-medium text-ink-strong transition hover:text-accent"
          >
            {t('CV')}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center text-ink transition hover:text-accent lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={t('Toggle navigation menu')}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-ink/15 bg-surface px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label={t('Mobile navigation')}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center text-sm text-ink transition hover:text-accent"
              >
                {t(link.label)}
              </a>
            ))}
            <a
              href={PROFILE.sherekilebiWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 pt-2 border-t border-ink/15 text-sm text-ink hover:text-accent"
            >
              <span>Sherekilebi Labs</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            </a>
            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent"
            >
              {t('CV (PDF)')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
