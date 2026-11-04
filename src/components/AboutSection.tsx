import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-b border-[#ddd2d0]/15 pb-16 sm:pb-24"
    >
      {/* Sticky Section Header */}
      <div className="sticky top-14 z-30 border-b border-[#ddd2d0]/15 bg-[#2d2d2d]/95 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#f4eeec] sm:text-4xl lg:text-5xl">
            About
          </h2>
        </div>
      </div>

      {/* Main Content: Intro text & IPhO honor on left, Cropped portrait on right */}
      <div className="mx-auto mt-8 sm:mt-12 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Intro text & IPhO honor snippet */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="space-y-4 sm:space-y-5">
              <p className="font-sans text-base leading-relaxed text-[#ddd2d0] sm:text-lg sm:leading-relaxed">
                I am an undergraduate researcher at Mohamed Bin Zayed
                University of Artificial Intelligence (MBZUAI), working at the
                intersection of robotics, embedded systems, and machine
                learning. I aspire to build physical systems that can solve real-world problems.
                Most of my projects are prototyped at the robotics makerspace,{' '}
                <a
                  href={PROFILE.sherekilebiWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#f4eeec] underline decoration-[#fb8472] decoration-2 underline-offset-4 transition hover:text-[#fb8472]"
                >
                  Sherekilebi Labs
                </a>
                , that I founded and built from scratch in Georgia.
              </p>

              <p className="font-sans text-base leading-relaxed text-[#ddd2d0] sm:text-lg sm:leading-relaxed">
                My background in competitive physics helps me approach complex and unfamiliar problems and
                research new topics in AI and robotics with confidence.

                My favorite part of any project is discussing ideas with field experts to learn from their experiences.
                I love uniting those diverse insights to build complex systems that bridge data science,
                computer vision, control systems, and mechanical engineering.
              </p>
            </div>


            {/* Reference-styled IPhO Honor Snippet */}
            <div className="mt-8 border-t border-b border-[#ddd2d0]/18 py-3.5 sm:py-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* IPhO Logo Badge */}
                <div className="flex h-9 w-16 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white p-1 shadow-sm sm:h-10 sm:w-20">
                  <img
                    src="./media/ipho.png"
                    alt="International Physics Olympiad"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Honor Text */}
                <div className="min-w-0 flex-1 text-xs sm:text-sm leading-snug text-[#dcb36d]">
                  <span className="font-bold text-[#f5c77e]">
                    2× Silver &amp; 1× Bronze Medalist
                  </span>
                  , International Physics Olympiad (IPhO 2023, 2022, 2021).{' '}
                  <a
                    href="https://www.ipho-unofficial.org/countries/GEO/individual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-medium underline decoration-[#dcb36d]/60 underline-offset-2 transition hover:text-[#f4eeec] hover:decoration-[#f4eeec]"
                  >
                    <span>Official record</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cropped portrait of Dachiko.jpeg */}
          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
              <img
                src="./media/dachiko-portrait.webp"
                alt="Dachi Tchotashvili"
                loading="lazy"
                width={900}
                height={1125}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

