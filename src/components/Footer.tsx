import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-[#ddd2d0]/15 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 text-xs text-[#ddd2d0]/80 sm:flex-row sm:items-center sm:px-8">
        <span>{PROFILE.name}</span>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={`mailto:${PROFILE.email}`}
            className="transition hover:text-[#fb8472]"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.sherekilebiWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-[#fb8472]"
          >
            <span>Sherekilebi Labs</span>
            <ArrowUpRight className="h-3 w-3 text-[#fb8472]" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#fb8472]"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#fb8472]"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#fb8472]"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
