import { ArrowDownLeft, BookOpen, Moon, Sun } from 'lucide-react';
import { ArchivalImage } from './ArchivalImage';
import { MUJAHID_PROFILE } from '../data/archiveData';
import type { ThemeMode } from '../App';

interface HeroExhibitionProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenPortrait: () => void;
  onJumpToArchive: () => void;
}

export function HeroExhibition({
  theme,
  onToggleTheme,
  onOpenPortrait,
  onJumpToArchive,
}: HeroExhibitionProps) {
  const isDark = theme === 'dark';

  return (
    <section
      id="top"
      className="border-b border-stone-200/80 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141210] pt-6 pb-12 sm:pt-8 sm:pb-16 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Top exhibition utility strip with Light/Dark theme switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200/70 dark:border-stone-800/80">
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            <span>الأرشيف الوطني لتوثيق حركة الجهاد الليبي</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">1886م – 1991م</span>
            <span aria-hidden="true">·</span>
            <span>عين ماره — القبة</span>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1C1917] dark:text-[#F5F2EB] bg-[#F3EFE7] dark:bg-[#1C1917] border border-stone-300 dark:border-stone-700 hover:bg-[#EBE6DF] dark:hover:bg-[#231F1C] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FBBF24]" strokeWidth={1.75} />
                <span>الوضع الفاتح</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#78350F]" strokeWidth={1.75} />
                <span>الوضع الداكن</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-[1.24] mb-5">
                {MUJAHID_PROFILE.fullName}
              </h1>

              <p className="text-base sm:text-lg text-[#44403C] dark:text-stone-300 leading-[1.8] max-w-2xl mb-8">
                سيرة مجاهد من مجاهدي ليبيا، وأحد أبطال قبائل العبيدات الذين
                التحقوا بقيادة سيدي أحمد الشريف السنوسي منذ عام 1903م في سن
                الثامنة عشرة. يوثق هذا الأرشيف بطولاته في أربع عشرة معركة
                تاريخية، ودوره في خطوط الإمداد، وما ناله من أوسمة وشهادات وفاء
                وعرفان.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onJumpToArchive}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#14532D] dark:bg-[#166534] text-[#FBF9F5] hover:bg-[#0F3F22] dark:hover:bg-[#15803D] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] dark:focus-visible:ring-[#6EE7B7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F5] dark:focus-visible:ring-offset-[#141210]"
                >
                  <BookOpen className="w-4 h-4" strokeWidth={1.75} />
                  <span>تصفح الوثائق والأوسمة الأصلية</span>
                </button>

                <a
                  href="#battles"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#1C1917] dark:text-[#F5F2EB] border border-stone-300 dark:border-stone-700 bg-[#F5F1E8] dark:bg-[#1C1917] hover:bg-[#EBE6DF] dark:hover:bg-[#231F1C] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
                >
                  <span>سجل المعارك الموثقة (14)</span>
                  <ArrowDownLeft className="w-4 h-4" strokeWidth={1.75} />
                </a>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>المقيد برقم 10 في قائمة المقاتلين</span>
                <span aria-hidden="true">·</span>
                <span>مشارك في معارك القرضابية، جليانة، درنة، والسلوم</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-[#F3EFE7] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-4 sm:p-5 flex flex-col justify-between transition-colors duration-200">
              <button
                type="button"
                onClick={onOpenPortrait}
                className="group relative block w-full overflow-hidden bg-[#EBE6DF] dark:bg-[#231F1C] aspect-[3/4] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
                aria-label="معاينة الصورة الشخصية التاريخية للمجاهد عبد المالك عطية بوعوجة بحجم مكبر"
              >
                <ArchivalImage
                  src="/src/assets/images/mujahid_portrait_restored_1794877236870.jpg"
                  alt="الصورة الشخصية التاريخية للمجاهد عبد المالك عطية بوعوجة العبيدي"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  fallbackTitle="الصورة التاريخية للمجاهد"
                />
              </button>

              <div className="pt-4 mt-4 border-t border-stone-300/70 dark:border-stone-800 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-serif text-sm font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    لوحة رقم 01 — الصورة الشخصية الأصلية
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    المجاهد عبد المالك عطية عبدالله بوعوجة العبيدي
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenPortrait}
                  className="text-xs font-medium text-[#78350F] dark:text-[#E5A93B] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  تكبير اللوحة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column historical summary strip placed cleanly below the hero split */}
        <dl className="mt-10 pt-8 border-t border-stone-300/80 dark:border-stone-800 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">
              الميلاد والنشأة
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
              1886م · 1308هـ
            </dd>
            <dd className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              منطقة عين ماره — الجبل الأخضر
            </dd>
          </div>

          <div>
            <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">
              الالتحاق بحركة الجهاد
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
              1903م · رقم 10
            </dd>
            <dd className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              مع سيدي أحمد الشريف السنوسي بعمر 18 عاماً
            </dd>
          </div>

          <div>
            <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">
              المعارك الموثقة
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
              14 معركة ووقعة
            </dd>
            <dd className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              من بنغازي ودرنة والجبل إلى السلوم وسرت
            </dd>
          </div>

          <div>
            <dt className="text-xs text-stone-500 dark:text-stone-400 mb-1">
              الوفاة وخلود الأثر
            </dt>
            <dd className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
              فبراير 1991م
            </dd>
            <dd className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              القبة — في منزل الحاج جبريل بوعوجة
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
