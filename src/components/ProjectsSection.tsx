import { useRef, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Bot,
  Cpu,
  FileText,
  Github,
  Gauge,
  Magnet,
  Network,
  Radar,
  Scale,
  Server,
  ShieldAlert,
  Sprout,
  Swords,
  Trophy,
  Waves,
  X,
} from 'lucide-react';
import {
  PROFILE,
  PROJECTS,
  type ProjectIconId,
  type ProjectItem,
} from '../data/portfolioData';
import { useModal } from '../useModal';
import type { LightboxItem } from './ImageLightbox';

interface ProjectsSectionProps {
  onOpenProject: (projectId: string, trigger: HTMLElement) => void;
}

function ProjectIcon({ icon }: { icon: ProjectIconId }): ReactNode {
  const cls = 'h-4 w-4 shrink-0 text-[#fb8472]';

  switch (icon) {
    case 'bot':
      return <Bot className={cls} />;
    case 'cpu':
      return <Cpu className={cls} />;
    case 'radar':
      return <Radar className={cls} />;
    case 'scale':
      return <Scale className={cls} />;
    case 'shield':
      return <ShieldAlert className={cls} />;
    case 'swords':
      return <Swords className={cls} />;
    case 'gauge':
      return <Gauge className={cls} />;
    case 'server':
      return <Server className={cls} />;
    case 'network':
      return <Network className={cls} />;
    case 'trophy':
      return <Trophy className={cls} />;
    case 'magnet':
      return <Magnet className={cls} />;
    case 'waves':
      return <Waves className={cls} />;
    case 'sprout':
      return <Sprout className={cls} />;
  }
}

function ProjectPresentationViewer({
  presentation,
}: {
  presentation: NonNullable<ProjectItem['presentationPdf']>;
}) {
  return (
    <section
      aria-labelledby="project-presentation-title"
      className="overflow-hidden rounded-xl border border-[#ddd2d0]/15 bg-[#1a1a1a]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ddd2d0]/15 px-4 py-3 sm:px-5">
        <div>
          <h3
            id="project-presentation-title"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#f4eeec]"
          >
            <FileText className="h-4 w-4 text-[#fb8472]" aria-hidden="true" />
            Slide deck
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#ddd2d0]/55">
            {presentation.slideCount} slides
          </p>
        </div>
        <a
          href={presentation.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ddd2d0]/80 transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
        >
          Open full PDF
          <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" aria-hidden="true" />
        </a>
      </div>
      <iframe
        src={`${presentation.src}#view=FitH&toolbar=1&navpanes=0`}
        title={presentation.label}
        loading="lazy"
        className="block h-[62vh] min-h-[420px] max-h-[640px] w-full bg-white"
      />
    </section>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#ddd2d0]/90 sm:text-[0.95rem]">
      {items.map((detail) => (
        <li key={detail} className="flex items-start gap-3">
          <span
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#fb8472]"
            aria-hidden="true"
          />
          <span>{detail}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: ProjectItem;
  onOpen: (projectId: string, trigger: HTMLElement) => void;
}) {
  const cover = project.images?.[0];
  const isWideModel = project.id === 'sherekilebi-makerspace';
  const isPortrait = project.id === 'lara';
  const isSpoilerSimulation = project.id === 'active-spoiler';

  return (
    <article className="project-card flex h-full flex-col overflow-hidden rounded-2xl border border-[#ddd2d0]/15 bg-[#242424] shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-colors duration-200 hover:border-[#fb8472]/45 hover:bg-[#282828]">
      <button
        type="button"
        onClick={(event) => onOpen(project.id, event.currentTarget)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#fb8472]"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[#ddd2d0]/12 bg-[#1a1a1a]">
          {cover ? (
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              decoding="async"
              className={`h-full w-full ${
                isPortrait || isWideModel
                  ? 'object-contain p-3'
                  : isSpoilerSimulation
                    ? 'origin-center object-cover object-[42%_31%] scale-[1.2] transform-gpu'
                    : 'object-cover'
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs text-[#ddd2d0]/60">
              Image coming soon
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#f4eeec]/80">
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full border border-[#fb8472]/35 bg-[#fb8472]/10 p-2">
              <ProjectIcon icon={project.icon} />
            </div>
            <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-[#f4eeec] sm:text-[1.35rem]">
              {project.title}
            </h3>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#ddd2d0]/85">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#ddd2d0]/18 bg-[#1d1d1d] px-2.5 py-1 font-mono text-[10px] text-[#ddd2d0]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="mt-auto flex min-h-14 flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#ddd2d0]/12 px-5 py-3 sm:px-6">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#ddd2d0] transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472] focus-visible:ring-offset-2 focus-visible:ring-offset-[#242424]"
          >
            <Github className="h-4 w-4" />
            GitHub repo
            <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
          </a>
        ) : null}
        {project.presentationPdf ? (
          <a
            href={project.presentationPdf.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.presentationPdf.label} in a new tab`}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#ddd2d0] transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472] focus-visible:ring-offset-2 focus-visible:ring-offset-[#242424]"
          >
            <FileText className="h-4 w-4 text-[#fb8472]" aria-hidden="true" />
            Slide deck
            <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectModal({
  project,
  onClose,
  onOpenLightbox,
  returnFocus,
  isLightboxOpen,
}: {
  project: ProjectItem;
  onClose: () => void;
  onOpenLightbox: (item: LightboxItem, trigger: HTMLElement) => void;
  returnFocus: HTMLElement | null;
  isLightboxOpen: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const images = project.images ?? [];

  useModal({ isOpen: true, onClose, dialogRef, closeRef, returnFocus });

  const openImage = (image: (typeof images)[number], trigger: HTMLElement) => {
    onOpenLightbox({
      src: image.src,
      alt: image.alt,
      caption: image.caption,
      title: project.title,
    }, trigger);
  };

  return (
    <div inert={isLightboxOpen} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close project details"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#090909]/82 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full min-w-0 max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#ddd2d0]/18 bg-[#242424] shadow-[0_32px_100px_rgba(0,0,0,0.58)] motion-safe:animate-project-modal-in sm:max-h-[calc(100dvh-3rem)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#ddd2d0]/15 px-4 py-4 sm:gap-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#fb8472]">
              <span>{project.year}</span>
              <span className="text-[#ddd2d0]/35">/</span>
              <span className="text-[#ddd2d0]/70">{project.context}</span>
            </div>
            <h2
              id="project-modal-title"
              className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#f4eeec] sm:text-4xl"
            >
              {project.title}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ddd2d0]/20 text-[#ddd2d0]/75 transition hover:border-[#fb8472]/60 hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            <div className="min-w-0">
              {project.presentationPdf ? (
                <ProjectPresentationViewer presentation={project.presentationPdf} />
              ) : (
                <>
                  {images[0] && (
                    <button
                      type="button"
                      onClick={(event) => openImage(images[0], event.currentTarget)}
                      className="group block w-full overflow-hidden rounded-xl border border-[#ddd2d0]/15 bg-[#1a1a1a] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
                    >
                      <img
                        src={images[0].src}
                        alt={images[0].alt}
                        className={`max-h-[430px] w-full ${
                          project.id === 'lara' || project.id === 'sherekilebi-makerspace'
                            ? 'object-contain p-3'
                            : 'object-cover'
                        }`}
                      />
                    </button>
                  )}
                  {images[0] && (
                    <p className="mt-2 text-xs leading-relaxed text-[#ddd2d0]/60">
                      {images[0].caption}
                    </p>
                  )}
                </>
              )}

              {!project.presentationPdf && images.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {images.slice(1).map((image) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={(event) => openImage(image, event.currentTarget)}
                      className="group overflow-hidden rounded-lg border border-[#ddd2d0]/15 bg-[#1a1a1a] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="max-w-2xl text-base leading-relaxed text-[#ddd2d0] sm:text-lg">
                {project.summary}
              </p>

              {project.detailSections ? (
                <div className="mt-7 border-t border-[#ddd2d0]/15 pt-6">
                  {project.detailSections.map((section, index) => (
                    <div
                      key={section.title}
                      className={index > 0 ? 'mt-7 border-t border-[#ddd2d0]/15 pt-6' : ''}
                    >
                      <h3 className="font-display text-lg font-semibold text-[#f4eeec]">
                        {section.title}
                      </h3>
                      <DetailList items={section.items} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-7 border-t border-[#ddd2d0]/15 pt-6">
                  <h3 className="font-display text-lg font-semibold text-[#f4eeec]">
                    Inside the build
                  </h3>
                  <DetailList items={project.details} />
                </div>
              )}

              <div className="mt-7 border-t border-[#ddd2d0]/15 pt-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#ddd2d0]/18 bg-[#1d1d1d] px-2.5 py-1 font-mono text-[10px] text-[#ddd2d0]/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#f4eeec] transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
                    >
                      <Github className="h-4 w-4" />
                      GitHub repo
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
                    </a>
                  )}

                  {project.secondaryGithub && (
                    <a
                      href={project.secondaryGithub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#ddd2d0]/75 transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
                    >
                      {project.secondaryGithub.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
                    </a>
                  )}

                  {project.sherekilebiLab && (
                    <a
                      href={PROFILE.sherekilebiWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#ddd2d0]/75 transition hover:text-[#fb8472] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb8472]"
                    >
                      Sherekilebi Labs
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  return (
    <section id="projects" className="border-b border-[#ddd2d0]/15 pb-16 sm:pb-24">
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            Selected Projects
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mt-8 max-w-3xl">
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#ddd2d0]/80 sm:text-lg">
            A focused set of robots, embedded systems, physical experiments, and the lab infrastructure that connects them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
