import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const FOOTER_NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Skills', href: '#skills' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-ink/15 bg-surface"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.75fr_1fr] lg:gap-16">
          <section aria-labelledby="footer-intro-title" className="max-w-xl">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
              Get in touch
            </p>
            <h2
              id="footer-intro-title"
              className="mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl"
            >
              Robotics, AI, and engineering in practice.
            </h2>

            <a
              href={`mailto:${PROFILE.email}`}
              className="group mt-8 inline-flex max-w-full items-center gap-3 text-sm font-medium text-ink-strong transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
            >
              <Mail
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span className="break-all">{PROFILE.email}</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </section>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center text-sm text-ink/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-strong transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  <Download className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-links-title">
            <h3
              id="footer-links-title"
              className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink/45"
            >
              Elsewhere
            </h3>
            <div className="mt-5 space-y-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Dachi Tchotashvili on GitHub"
                className="group flex items-center justify-between gap-4 border-b border-ink/10 pb-3 text-sm text-ink/80 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <span className="inline-flex items-center gap-3">
                  <Github className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Dachi Tchotashvili on LinkedIn"
                className="group flex items-center justify-between gap-4 border-b border-ink/10 pb-3 text-sm text-ink/80 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <span className="inline-flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={PROFILE.sherekilebiWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 text-sm text-ink/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <span>Sherekilebi Labs</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-ink/15 pt-6">
          <div className="flex flex-col gap-5 text-[11px] leading-5 text-ink/50 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <p className="shrink-0">© {year} {PROFILE.name}</p>
            <div className="max-w-3xl space-y-1 sm:text-right">
              <p>Built with React, Vite, and Tailwind CSS.</p>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
