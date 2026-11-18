import { useMemo, useState } from 'react';
import { Maximize2, RefreshCw } from 'lucide-react';
import { ARTIFACTS, ArtifactCategory, ArtifactItem } from '../data/archiveData';
import { ArchivalImage } from './ArchivalImage';

type GalleryFilter = 'all' | ArtifactCategory;

const GALLERY_TABS: { value: GalleryFilter; label: string; count: number }[] = [
  { value: 'all', label: 'جميع المقتنيات', count: ARTIFACTS.length },
  {
    value: 'documents',
    label: 'الوثائق والشهادات',
    count: ARTIFACTS.filter((a) => a.category === 'documents').length,
  },
  {
    value: 'medals',
    label: 'الأوسمة والميداليات',
    count: ARTIFACTS.filter((a) => a.category === 'medals').length,
  },
  {
    value: 'heritage',
    label: 'الصور والمقتنيات',
    count: ARTIFACTS.filter((a) => a.category === 'heritage').length,
  },
];

interface ArchiveGallerySectionProps {
  onInspectArtifact: (artifact: ArtifactItem, initialSide?: 'primary' | 'secondary') => void;
}

export function ArchiveGallerySection({
  onInspectArtifact,
}: ArchiveGallerySectionProps) {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const visibleArtifacts = useMemo(() => {
    if (filter === 'all') return ARTIFACTS;
    return ARTIFACTS.filter((item) => item.category === filter);
  }, [filter]);

  const toggleSide = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const leadItem = filter === 'all' ? visibleArtifacts[0] : null;
  const gridItems = filter === 'all' ? visibleArtifacts.slice(1) : visibleArtifacts;

  return (
    <section
      id="archive"
      className="py-16 sm:py-20 border-b border-stone-200/80 dark:border-stone-800 bg-[#F3EFE7]/70 dark:bg-[#191613] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-8 pb-6 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              04. المعرض الرقمي وخزانة المقتنيات
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              الوثائق النادرة والأوسمة والصور الأصلية
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md">
            اضغط على أي وثيقة أو وسام لفتحه في عارض الفحص عالي الدقة مع قراءة
            النصوص والنقوش الموثقة.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="تصنيف الوثائق والمقتنيات"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E7E2D8] dark:bg-[#141210] border border-stone-300/70 dark:border-stone-800 rounded-lg mb-10 w-fit max-w-full"
        >
          {GALLERY_TABS.map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(tab.value)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#2A2521] text-[#1C1917] dark:text-[#F5F2EB] shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Lead Curatorial Showcase (when viewing All) */}
        {leadItem && (
          <div className="bg-[#FFFFFF] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-6 sm:p-8 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-colors duration-200">
            <div className="lg:col-span-5 bg-[#F5F1E8] dark:bg-[#231F1C] border border-stone-200 dark:border-stone-800 p-4 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onInspectArtifact(leadItem, 'primary')}
                className="group relative w-full h-80 sm:h-96 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
                aria-label={`فحص ${leadItem.title}`}
              >
                <ArchivalImage
                  src={leadItem.imageUrl}
                  alt={leadItem.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  fallbackTitle={leadItem.title}
                />
              </button>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between py-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
                  <span className="font-medium text-[#78350F] dark:text-[#E5A93B]">
                    {leadItem.accessionNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{leadItem.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{leadItem.dateIssued}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] mb-2">
                  {leadItem.title}
                </h3>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-4">
                  {leadItem.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#292524] dark:text-stone-300 leading-relaxed mb-6">
                  {leadItem.summary}
                </p>

                {leadItem.transcriptionLines && (
                  <div className="bg-[#FBF9F5] dark:bg-[#141210] border border-stone-200 dark:border-stone-800 p-4 mb-6">
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                      مقتطف من النص الأصلي للوثيقة
                    </p>
                    <p className="font-serif text-base text-[#1C1917] dark:text-[#F5F2EB] leading-relaxed">
                      «{leadItem.transcriptionLines[5]}»
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  الجهة المصدرة: {leadItem.issuer}
                </span>
                <button
                  type="button"
                  onClick={() => onInspectArtifact(leadItem, 'primary')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#78350F] dark:bg-[#92400E] text-[#FBF9F5] hover:bg-[#5E280A] dark:hover:bg-[#B45309] transition-colors rounded-md cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>فحص المخطوطة وقراءة النص الكامل</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Museum Accession Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridItems.map((item) => {
            const isFlipped = Boolean(flippedIds[item.id] && item.secondaryImageUrl);
            const activeSrc = isFlipped ? item.secondaryImageUrl! : item.imageUrl;
            const currentSideLabel = isFlipped
              ? item.secondaryLabel
              : item.primaryLabel;
            const isWideFeatured =
              filter === 'all' && item.id === 'loyalty-cert-2006';

            return (
              <article
                key={item.id}
                className={`bg-[#FFFFFF] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 flex flex-col justify-between transition-colors duration-200 ${
                  isWideFeatured ? 'md:col-span-2' : ''
                }`}
              >
                <div
                  className={
                    isWideFeatured
                      ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch'
                      : ''
                  }
                >
                  <div
                    className={`relative bg-[#F5F1E8] dark:bg-[#231F1C] p-4 flex items-center justify-center ${
                      isWideFeatured
                        ? 'lg:col-span-6 border-b lg:border-b-0 lg:border-l border-stone-200 dark:border-stone-800 h-72 sm:h-80'
                        : 'border-b border-stone-200 dark:border-stone-800 h-80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onInspectArtifact(item, isFlipped ? 'secondary' : 'primary')
                      }
                      className="group w-full h-full flex items-center justify-center overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
                      aria-label={`تكبير وفحص ${item.title}`}
                    >
                      <ArchivalImage
                        src={activeSrc}
                        alt={`${item.title}${currentSideLabel ? ` — ${currentSideLabel}` : ''}`}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        fallbackTitle={item.title}
                      />
                    </button>
                  </div>

                  <div
                    className={`p-5 sm:p-6 ${
                      isWideFeatured
                        ? 'lg:col-span-6 flex flex-col justify-center'
                        : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                      <span className="text-[#78350F] dark:text-[#E5A93B] font-medium">
                        {item.accessionNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.dateIssued}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] mb-1.5">
                      {item.title}
                    </h3>

                    {currentSideLabel && (
                      <p className="text-xs font-medium text-[#14532D] dark:text-[#6EE7B7] mb-2">
                        العرض الحالي: {currentSideLabel}
                      </p>
                    )}

                    <p
                      className={`text-sm text-stone-600 dark:text-stone-300 leading-relaxed ${
                        isWideFeatured ? '' : 'line-clamp-3'
                      }`}
                    >
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141210]/70 flex items-center justify-between gap-3">
                  {item.secondaryImageUrl ? (
                    <button
                      type="button"
                      onClick={() => toggleSide(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#14532D] dark:text-[#6EE7B7] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {isFlipped
                          ? `عرض ${item.primaryLabel || 'الوجه الأمامي'}`
                          : `عرض ${item.secondaryLabel || 'الوجه الخلفي'}`}
                      </span>
                    </button>
                  ) : (
                    <span className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      {item.categoryLabel}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      onInspectArtifact(item, isFlipped ? 'secondary' : 'primary')
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#78350F] dark:text-[#E5A93B] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>فحص مكبر</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
