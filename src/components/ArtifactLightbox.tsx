import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ARTIFACTS, ArtifactItem } from '../data/archiveData';
import { ArchivalImage } from './ArchivalImage';

interface ArtifactLightboxProps {
  artifact: ArtifactItem | null;
  initialSide?: 'primary' | 'secondary';
  onClose: () => void;
  onSelectArtifact: (artifact: ArtifactItem) => void;
}

export function ArtifactLightbox({
  artifact,
  initialSide = 'primary',
  onClose,
  onSelectArtifact,
}: ArtifactLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [side, setSide] = useState<'primary' | 'secondary'>(initialSide);

  useEffect(() => {
    setZoom(1);
    setSide(initialSide);
  }, [artifact?.id, initialSide]);

  useEffect(() => {
    if (!artifact) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const idx = ARTIFACTS.findIndex((a) => a.id === artifact.id);
        const next = ARTIFACTS[(idx + 1) % ARTIFACTS.length];
        onSelectArtifact(next);
      } else if (e.key === 'ArrowRight') {
        const idx = ARTIFACTS.findIndex((a) => a.id === artifact.id);
        const prev = ARTIFACTS[(idx - 1 + ARTIFACTS.length) % ARTIFACTS.length];
        onSelectArtifact(prev);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artifact, onClose, onSelectArtifact]);

  if (!artifact) return null;

  const hasSecondary = Boolean(artifact.secondaryImageUrl);
  const activeImageUrl =
    side === 'secondary' && artifact.secondaryImageUrl
      ? artifact.secondaryImageUrl
      : artifact.imageUrl;

  const currentIdx = ARTIFACTS.findIndex((a) => a.id === artifact.id);
  const prevArtifact =
    ARTIFACTS[(currentIdx - 1 + ARTIFACTS.length) % ARTIFACTS.length];
  const nextArtifact = ARTIFACTS[(currentIdx + 1) % ARTIFACTS.length];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/80 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FBF9F5] dark:bg-[#141210] border border-stone-300 dark:border-stone-800 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Lightbox Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-300 dark:border-stone-800 bg-[#F3EFE7] dark:bg-[#1C1917] flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-[#78350F] dark:text-[#E5A93B] font-medium truncate">
              {artifact.accessionNumber} · {artifact.categoryLabel}
            </p>
            <h2
              id="lightbox-title"
              className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] truncate"
            >
              {artifact.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))))}
              disabled={zoom <= 1}
              aria-label="تصغير الصورة"
              className="p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#231F1C] text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2A2521] disabled:opacity-40 rounded-md cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs tabular-nums text-stone-700 dark:text-stone-300 w-11 text-center hidden sm:inline">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.5).toFixed(1))))}
              disabled={zoom >= 3}
              aria-label="تكبير الصورة"
              className="p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#231F1C] text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2A2521] disabled:opacity-40 rounded-md cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={() => setZoom(1)}
                aria-label="إعادة ضبط التكبير"
                className="p-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#231F1C] text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2A2521] rounded-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق نافذة المعاينة"
              className="p-2 border border-stone-300 dark:border-stone-700 bg-[#1C1917] dark:bg-[#F5F2EB] text-[#FBF9F5] dark:text-[#141210] hover:bg-stone-800 dark:hover:bg-stone-200 rounded-md cursor-pointer mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lightbox Body: Image Viewport + Curatorial Details */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          <div className="lg:col-span-7 bg-[#EBE6DF] dark:bg-[#191613] border-b lg:border-b-0 lg:border-l border-stone-300 dark:border-stone-800 relative overflow-auto flex items-center justify-center p-4 sm:p-6 min-h-[300px] sm:min-h-[420px]">
            <div
              className="transition-transform duration-200 ease-out origin-center"
              style={{ transform: `scale(${zoom})` }}
            >
              <ArchivalImage
                src={activeImageUrl}
                alt={artifact.title}
                className="max-h-[60vh] lg:max-h-[70vh] w-auto object-contain shadow-sm"
                fallbackTitle={artifact.title}
              />
            </div>

            {hasSecondary && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={() =>
                    setSide((prev) => (prev === 'primary' ? 'secondary' : 'primary'))
                  }
                  className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#1C1917]/90 dark:bg-[#2A2521]/95 text-[#FBF9F5] border border-transparent dark:border-stone-700 hover:bg-[#1C1917] dark:hover:bg-[#36302B] rounded-md shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>
                    {side === 'primary'
                      ? `عرض ${artifact.secondaryLabel || 'الوجه الخلفي'}`
                      : `عرض ${artifact.primaryLabel || 'الوجه الأمامي'}`}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#FBF9F5] dark:bg-[#141210]">
            <div>
              <p className="text-sm text-[#292524] dark:text-stone-300 leading-relaxed">
                {artifact.summary}
              </p>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm border-t border-stone-200 dark:border-stone-800 pt-4">
              <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/70 dark:border-stone-800">
                <dt className="text-stone-500 dark:text-stone-400">تاريخ الإصدار / الحقبة</dt>
                <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] tabular-nums text-left">
                  {artifact.dateIssued}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/70 dark:border-stone-800">
                <dt className="text-stone-500 dark:text-stone-400">الجهة المصدرة</dt>
                <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left">
                  {artifact.issuer}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/70 dark:border-stone-800">
                <dt className="text-stone-500 dark:text-stone-400">الوصف المادي</dt>
                <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left max-w-[60%]">
                  {artifact.medium}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500 dark:text-stone-400">مصدر الحفظ</dt>
                <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left max-w-[60%]">
                  {artifact.provenance}
                </dd>
              </div>
            </dl>

            {artifact.transcriptionLines && (
              <div className="bg-[#F3EFE7] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-4 space-y-2.5">
                <h3 className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F5F2EB] pb-2 border-b border-stone-300/70 dark:border-stone-800">
                  {artifact.transcriptionTitle || 'النص الموثق'}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-[#292524] dark:text-stone-300 leading-relaxed">
                  {artifact.transcriptionLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Footer Navigation */}
        <div className="px-4 sm:px-6 py-3 border-t border-stone-300 dark:border-stone-800 bg-[#F3EFE7] dark:bg-[#1C1917] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectArtifact(prevArtifact)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1C1917] dark:text-[#F5F2EB] hover:text-[#78350F] dark:hover:text-[#E5A93B] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق: {prevArtifact.title}</span>
          </button>

          <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums hidden sm:inline">
            {currentIdx + 1} / {ARTIFACTS.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectArtifact(nextArtifact)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1C1917] dark:text-[#F5F2EB] hover:text-[#78350F] dark:hover:text-[#E5A93B] cursor-pointer"
          >
            <span>التالي: {nextArtifact.title}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
