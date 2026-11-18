import { useEffect, useState } from 'react';

interface TopNavProps {
  onInspectArchive: () => void;
}

export function TopNav({ onInspectArchive }: TopNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#141210]/95 backdrop-blur-sm border-b border-stone-200/90 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706] rounded-sm"
        >
          أرشيف المجاهد عبد المالك بوعوجة
        </a>

        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300"
        >
          <a
            href="#biography"
            className="hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-8 hover:underline decoration-stone-400 dark:decoration-stone-500"
          >
            السيرة الذاتية
          </a>
          <a
            href="#timeline"
            className="hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-8 hover:underline decoration-stone-400 dark:decoration-stone-500"
          >
            محطات المسيرة
          </a>
          <a
            href="#battles"
            className="hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-8 hover:underline decoration-stone-400 dark:decoration-stone-500"
          >
            سجل المعارك
          </a>
          <a
            href="#archive"
            className="hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-8 hover:underline decoration-stone-400 dark:decoration-stone-500"
          >
            الوثائق والأوسمة
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onInspectArchive}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-[#FBF9F5] bg-[#78350F] hover:bg-[#5E280A] dark:bg-[#92400E] dark:hover:bg-[#B45309] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5] dark:focus-visible:ring-offset-[#141210]"
          >
            استعراض الوثائق
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[2px] bg-stone-200/50 dark:bg-stone-800 w-full overflow-hidden"
      >
        <div
          className="h-full bg-[#78350F] dark:bg-[#D97706] transition-transform duration-150 ease-out origin-right"
          style={{
            width: '100%',
            transform: `scaleX(${scrollProgress / 100})`,
          }}
        />
      </div>
    </header>
  );
}
