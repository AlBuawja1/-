import { useState } from 'react';
import { ArrowUpLeft, MapPin } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/archiveData';

interface TimelineSectionProps {
  onSelectArtifact: (artifactId: string) => void;
}

export function TimelineSection({ onSelectArtifact }: TimelineSectionProps) {
  const [activeId, setActiveId] = useState<string>(TIMELINE_MILESTONES[0].id);

  const activeMilestone =
    TIMELINE_MILESTONES.find((m) => m.id === activeId) || TIMELINE_MILESTONES[0];

  return (
    <section
      id="timeline"
      className="py-16 sm:py-20 border-b border-stone-200/80 dark:border-stone-800 bg-[#F3EFE7]/60 dark:bg-[#191613] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-10 pb-6 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              02. التسلسل التاريخي (1886م – 1991م)
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              محطات مسيرة الجهاد والثبات
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md">
            اختر إحدى المحطات الزمنية لاستعراض تفاصيلها التاريخية وما يرتبط بها
            من مواقع وأحداث ووثائق.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Chronological Rail */}
          <div className="lg:col-span-5 space-y-2">
            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isActive = milestone.id === activeId;
              return (
                <button
                  key={milestone.id}
                  type="button"
                  onClick={() => setActiveId(milestone.id)}
                  className={`w-full text-right p-4 border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706] ${
                    isActive
                      ? 'bg-[#FFFFFF] dark:bg-[#231F1C] border-[#78350F] dark:border-[#D97706] text-[#1C1917] dark:text-[#F5F2EB]'
                      : 'bg-[#FBF9F5]/70 dark:bg-[#141210]/70 border-stone-300/70 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#FFFFFF] dark:hover:bg-[#1C1917] hover:border-stone-400 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-serif text-base sm:text-lg font-bold">
                      {String(idx + 1).padStart(2, '0')}. {milestone.title}
                    </span>
                    <span
                      className={`text-xs tabular-nums whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-[#78350F] dark:text-[#E5A93B] font-semibold'
                          : 'text-stone-500 dark:text-stone-400'
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 truncate">
                    {milestone.location}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Focused Milestone Detail Panel */}
          <div className="lg:col-span-7 bg-[#FFFFFF] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-6 sm:p-8 lg:sticky lg:top-24 transition-colors duration-200">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-500 dark:text-stone-400 mb-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-[#78350F] dark:text-[#E5A93B] tabular-nums">
                {activeMilestone.year}
              </span>
              {activeMilestone.hijriYear && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{activeMilestone.hijriYear}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                {activeMilestone.location}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] mb-4">
              {activeMilestone.title}
            </h3>

            <p className="text-base sm:text-lg font-medium text-[#292524] dark:text-stone-200 leading-relaxed mb-5">
              {activeMilestone.summary}
            </p>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-[1.85] mb-6">
              {activeMilestone.details}
            </p>

            <div className="pt-5 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = TIMELINE_MILESTONES.findIndex(
                      (m) => m.id === activeId
                    );
                    const prevIdx =
                      (currentIdx - 1 + TIMELINE_MILESTONES.length) %
                      TIMELINE_MILESTONES.length;
                    setActiveId(TIMELINE_MILESTONES[prevIdx].id);
                  }}
                  className="px-3.5 py-1.5 text-xs font-medium border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#231F1C] hover:bg-[#EBE6DF] dark:hover:bg-[#2A2521] text-stone-700 dark:text-stone-200 rounded-md cursor-pointer transition-colors"
                >
                  المحطة السابقة
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = TIMELINE_MILESTONES.findIndex(
                      (m) => m.id === activeId
                    );
                    const nextIdx = (currentIdx + 1) % TIMELINE_MILESTONES.length;
                    setActiveId(TIMELINE_MILESTONES[nextIdx].id);
                  }}
                  className="px-3.5 py-1.5 text-xs font-medium border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#231F1C] hover:bg-[#EBE6DF] dark:hover:bg-[#2A2521] text-stone-700 dark:text-stone-200 rounded-md cursor-pointer transition-colors"
                >
                  المحطة التالية
                </button>
              </div>

              {activeMilestone.linkedArtifactId && (
                <button
                  type="button"
                  onClick={() =>
                    onSelectArtifact(activeMilestone.linkedArtifactId!)
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#14532D] dark:text-[#6EE7B7] hover:underline cursor-pointer"
                >
                  <span>عرض الشاهد الأرشيفي المرتبط بهذه المرحلة</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
