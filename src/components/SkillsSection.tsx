import { HIGH_LEVEL_SKILLS, type SkillIconId } from '../data/portfolioData';

type SkillLogoAsset = {
  src: string;
  imageClass: string;
  tileClass?: string;
};

const SKILL_LOGOS: Record<SkillIconId, SkillLogoAsset> = {
  embedded: {
    src: './media/skill-logos/espressif-mark.svg',
    imageClass: 'h-9 w-9',
    tileClass: 'bg-[#f1ece3]',
  },
  'isaac-sim': {
    src: './media/skill-logos/isaac-sim.svg',
    imageClass: 'h-11 w-11',
  },
  pytorch: {
    src: './media/skill-logos/pytorch.svg',
    imageClass: 'h-10 w-10',
  },
  fusion: {
    src: './media/skill-logos/fusion.svg',
    imageClass: 'h-10 w-10',
  },
  blender: {
    src: './media/skill-logos/blender.svg',
    imageClass: 'h-10 w-10',
  },
  ansys: {
    src: './media/skill-logos/ansys.svg',
    imageClass: 'h-9 w-10',
    tileClass: 'bg-[#f1ece3]',
  },
  kicad: {
    src: './media/skill-logos/kicad.png',
    imageClass: 'h-10 w-10 rounded',
  },
  matlab: {
    src: './media/Matlab_icon.png',
    imageClass: 'h-10 w-10',
  },
  'raspberry-pi': {
    src: './media/skill-logos/raspberry-pi.png',
    imageClass: 'h-11 w-11',
    tileClass: 'bg-[#f1ece3]',
  },
  mqtt: {
    src: './media/skill-logos/mqtt.svg',
    imageClass: 'h-10 w-10',
    tileClass: 'bg-[#f1ece3]',
  },
};

function SkillLogo({ id }: { id: SkillIconId }) {
  const logo = SKILL_LOGOS[id];

  return (
    <span
      aria-hidden="true"
      className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[#37404c] bg-[#202328] transition-transform duration-300 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-1 ${logo.tileClass ?? ''}`}
    >
      <img
        src={logo.src}
        alt=""
        width="40"
        height="40"
        loading="lazy"
        decoding="async"
        className={`object-contain ${logo.imageClass}`}
      />
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative pb-16 sm:pb-24">
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            Skills
          </h2>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {HIGH_LEVEL_SKILLS.map((skill) => (
            <li key={skill.id} className="group">
              <div className="flex min-h-44 flex-col items-center justify-center gap-6 rounded-2xl border border-[#ddd2d0]/18 bg-[#151515] px-4 py-6 text-center transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.02] group-hover:border-[#fb8472]/55 group-hover:bg-[#1b1b1b] motion-safe:group-hover:shadow-[0_18px_42px_rgba(0,0,0,0.22)]">
                <SkillLogo id={skill.id} />
                <span className="font-display text-base font-semibold leading-tight text-[#f4eeec] sm:text-lg">
                  {skill.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
