import { Moon, Sun } from 'lucide-react';
import { MUJAHID_PROFILE } from '../data/archiveData';
import type { ThemeMode } from '../App';

interface FooterProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Footer({ theme, onToggleTheme }: FooterProps) {
  const isDark = theme === 'dark';

  return (
    <footer className="bg-[#EFECE5] dark:bg-[#191613] border-t border-stone-300/80 dark:border-stone-800 py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-stone-300/70 dark:border-stone-800">
          <div className="md:col-span-7 space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {MUJAHID_PROFILE.fullName}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
              أرشيف تاريخي وثائقي لحفظ سيرة المجاهد وبطولاته في الجهاد الليبي
              ضد الاستعمار الإيطالي، وتخليد تضحيات جيل المقاومة للأجيال
              القادمة.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col md:items-end gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-700 dark:text-stone-300 md:justify-end">
              <a
                href="#biography"
                className="hover:text-[#78350F] dark:hover:text-[#E5A93B] hover:underline"
              >
                السيرة الذاتية
              </a>
              <a
                href="#timeline"
                className="hover:text-[#78350F] dark:hover:text-[#E5A93B] hover:underline"
              >
                محطات المسيرة
              </a>
              <a
                href="#battles"
                className="hover:text-[#78350F] dark:hover:text-[#E5A93B] hover:underline"
              >
                سجل المعارك
              </a>
              <a
                href="#archive"
                className="hover:text-[#78350F] dark:hover:text-[#E5A93B] hover:underline"
              >
                الوثائق والأوسمة
              </a>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={isDark}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-[#FBF9F5] dark:bg-[#231F1C] border border-stone-300 dark:border-stone-700 hover:bg-[#E7E2D8] dark:hover:bg-[#2A2521] rounded-md transition-colors cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#FBBF24]" strokeWidth={1.75} />
                  <span>التبديل إلى الوضع الفاتح</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#78350F]" strokeWidth={1.75} />
                  <span>التبديل إلى الوضع الداكن</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
          <p>
            سيرة مجاهد من مجاهدي ليبيا — عين ماره · الجبل الأخضر · مدينة القبة
          </p>
          <p className="tabular-nums">1886م – 1991م</p>
        </div>
      </div>
    </footer>
  );
}
