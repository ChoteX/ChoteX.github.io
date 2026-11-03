import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Cpu,
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
} from 'lucide-react';
import {
  PROFILE,
  PROJECTS,
  type ProjectIconId,
  type ProjectItem,
} from '../data/portfolioData';
import { SystemSchematic } from './SystemSchematic';
import type { LightboxItem } from './ImageLightbox';

const CadViewport = lazy(() =>
  import('./CadViewport').then((mod) => ({ default: mod.CadViewport }))
);

type MediaMode = 'cad' | 'photo' | 'schematic';

interface ProjectsSectionProps {
  onOpenLightbox: (item: LightboxItem) => void;
}

function ProjectIcon({
  icon,
  active,
}: {
  icon: ProjectIconId;
  active: boolean;
}): ReactNode {
  const cls = `h-4 w-4 shrink-0 transition-colors ${
    active ? 'text-[#fb8472]' : 'text-[#ddd2d0]/70 group-hover:text-[#fb8472]'
  }`;
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

function getAvailableModes(
  project: ProjectItem
): { id: MediaMode; label: string }[] {
  const hasPhotos = Boolean(project.images && project.images.length > 0);
  const hasCad = Boolean(project.cadModel);
  const hasSchematic = Boolean(project.schematicId);

  if (project.defaultMode === 'cad') {
    const list: { id: MediaMode; label: string }[] = [];
    if (hasCad) list.push({ id: 'cad', label: '3D Model' });
    if (hasSchematic) list.push({ id: 'schematic', label: 'System Diagram' });
    if (hasPhotos) list.push({ id: 'photo', label: 'Photo' });
    return list;
  }

  const list: { id: MediaMode; label: string }[] = [];
  if (hasPhotos) list.push({ id: 'photo', label: 'Photo' });
  if (hasCad) list.push({ id: 'cad', label: '3D Model' });
  if (hasSchematic) list.push({ id: 'schematic', label: 'System Diagram' });
  return list;
}

function ProjectDetailCard({
  project,
  onOpenLightbox,
}: {
  project: ProjectItem;
  onOpenLightbox: (item: LightboxItem) => void;
}) {
  const availableModes = getAvailableModes(project);

  const [mode, setMode] = useState<MediaMode>(
    availableModes[0]?.id ?? 'photo'
  );

  useEffect(() => {
    const modes = getAvailableModes(project);
    setMode(modes[0]?.id ?? 'photo');
  }, [project]);

  const images = project.images ?? [];

  return (
    <div className="rounded-xl border border-[#ddd2d0]/18 bg-[#232323] p-6 sm:p-8">
      {/* Meta & Links Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-xs text-[#ddd2d0]/75">
          {project.year} · {project.context}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-b border-[#fb8472] pb-0.5 text-[#f4eeec] transition hover:text-[#fb8472]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
            </a>
          )}

          {project.secondaryGithub && (
            <a
              href={project.secondaryGithub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-b border-[#ddd2d0]/30 pb-0.5 text-[#ddd2d0] transition hover:border-[#fb8472] hover:text-[#fb8472]"
            >
              <span>{project.secondaryGithub.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
            </a>
          )}

          {project.sherekilebiLab && (
            <a
              href={PROFILE.sherekilebiWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-b border-[#ddd2d0]/30 pb-0.5 text-[#ddd2d0] transition hover:border-[#fb8472] hover:text-[#fb8472]"
            >
              <span>Sherekilebi Labs</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#fb8472]" />
            </a>
          )}
        </div>
      </div>

      {/* Title & Summary */}
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#f4eeec] sm:text-3xl">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#ddd2d0] sm:text-base">
        {project.summary}
      </p>

      {/* Visual / 3D / System Diagram Stage */}
      {availableModes.length > 0 && (
        <div className="mt-6">
          {availableModes.length > 1 && (
            <div className="mb-3.5 flex items-center gap-6 border-b border-[#ddd2d0]/15">
              {availableModes.map((tab) => {
                const active = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMode(tab.id)}
                    className={`-mb-px border-b-2 pb-2 text-xs font-medium transition sm:text-sm ${
                      active
                        ? 'border-[#fb8472] text-[#f4eeec]'
                        : 'border-transparent text-[#ddd2d0]/70 hover:text-[#ddd2d0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {mode === 'photo' && images.length > 0 && (
            <div
              className={
                images.length > 1
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2'
                  : 'block'
              }
            >
              {images.map((img) => (
                <div key={img.src} className="flex flex-col">
                  <div className="overflow-hidden rounded-lg border border-[#ddd2d0]/15 bg-[#1b1b1b]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      onClick={() =>
                        onOpenLightbox({
                          src: img.src,
                          alt: img.alt,
                          caption: img.caption,
                          title: project.title,
                        })
                      }
                      className={`w-full cursor-zoom-in object-contain ${
                        images.length > 1 ? 'h-[320px] p-2' : 'max-h-[420px]'
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#ddd2d0]/75">{img.caption}</p>
                </div>
              ))}
            </div>
          )}

          {mode === 'schematic' && project.schematicId && (
            <SystemSchematic
              key={project.id}
              schematicId={project.schematicId}
            />
          )}

          {mode === 'cad' && project.cadModel && (
            <Suspense
              fallback={
                <div className="flex h-[380px] items-center justify-center rounded-lg border border-[#ddd2d0]/15 bg-[#1e1e1e] text-xs text-[#ddd2d0]/75 sm:h-[430px]">
                  Loading 3D model…
                </div>
              }
            >
              <CadViewport
                key={project.id}
                src={project.cadModel.src}
                label={project.cadModel.label}
              />
            </Suspense>
          )}
        </div>
      )}

      {/* Technical Details */}
      {project.details.length > 0 && (
        <ul className="mt-6 space-y-2.5 border-t border-[#ddd2d0]/15 pt-5 text-sm leading-relaxed text-[#ddd2d0]/95">
          {project.details.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fb8472]"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack */}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-[#ddd2d0]/15 pt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[#ddd2d0]/18 bg-[#1f1f1f] px-2.5 py-0.5 font-mono text-xs text-[#ddd2d0]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection({ onOpenLightbox }: ProjectsSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(
    PROJECTS[0].id
  );

  const activeProject =
    PROJECTS.find((p) => p.id === selectedId) ?? PROJECTS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="relative border-b border-[#ddd2d0]/15 pb-16 sm:pb-24">
      {/* Sticky Section Header */}
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            Projects
          </h2>
        </div>
      </div>

      {/* Main Content Grid: Compact List (4 cols) + Spacious Detail Window (8 cols) */}
      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* LEFT: Compact Chronological Project List */}
          <div className="divide-y divide-[#ddd2d0]/12 border-t border-b border-[#ddd2d0]/15 lg:col-span-4">
            {PROJECTS.map((project) => {
              const isDesktopSelected = project.id === activeProject.id;
              const isMobileExpanded = project.id === mobileOpenId;

              return (
                <div key={project.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(project.id)}
                    className={`group relative flex w-full items-center justify-between gap-2.5 py-2.5 pr-2 pl-3.5 text-left transition ${
                      isDesktopSelected
                        ? 'lg:bg-[#232323]'
                        : 'hover:bg-[#262626]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-[2px] transition-opacity ${
                        isDesktopSelected
                          ? 'bg-[#fb8472] opacity-100'
                          : 'bg-[#fb8472] opacity-0 group-hover:opacity-45'
                      }`}
                    />

                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                      <ProjectIcon
                        icon={project.icon}
                        active={isDesktopSelected}
                      />
                      <span
                        className={`truncate font-display text-sm font-medium transition ${
                          isDesktopSelected
                            ? 'text-[#f4eeec]'
                            : 'text-[#ddd2d0] group-hover:text-[#f4eeec]'
                        }`}
                      >
                        {project.title}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="font-mono text-[11px] text-[#ddd2d0]/60">
                        {project.year}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#ddd2d0]/65 transition-transform lg:hidden ${
                          isMobileExpanded ? 'rotate-180 text-[#fb8472]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isMobileExpanded && (
                    <div className="py-3 lg:hidden">
                      <ProjectDetailCard
                        project={project}
                        onOpenLightbox={onOpenLightbox}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Spacious Detailed Project Window (8 columns) */}
          <div className="hidden lg:sticky lg:top-36 lg:col-span-8 lg:block">
            <ProjectDetailCard
              project={activeProject}
              onOpenLightbox={onOpenLightbox}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
