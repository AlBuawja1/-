import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { BATTLES, BattlePhase } from '../data/archiveData';

type FilterValue = 'all' | BattlePhase;

const PHASE_FILTERS: { value: FilterValue; label: string; count: number }[] = [
  { value: 'all', label: 'جميع المعارك', count: BATTLES.length },
  {
    value: 'early-resistance',
    label: 'بنغازي ودرنة (1911–1912)',
    count: BATTLES.filter((b) => b.phase === 'early-resistance').length,
  },
  {
    value: 'jabal-campaigns',
    label: 'الجبل الأخضر والقرضابية (1913–1915)',
    count: BATTLES.filter((b) => b.phase === 'jabal-campaigns').length,
  },
  {
    value: 'eastern-front',
    label: 'الجبهة الشرقية والسلوم (1915–1916)',
    count: BATTLES.filter((b) => b.phase === 'eastern-front').length,
  },
];

export function BattlesSection() {
  const [phaseFilter, setPhaseFilter] = useState<FilterValue>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('qardabiya');

  const filteredBattles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return BATTLES.filter((battle) => {
      const matchesPhase =
        phaseFilter === 'all' || battle.phase === phaseFilter;
      if (!matchesPhase) return false;
      if (!query) return true;
      return (
        battle.name.toLowerCase().includes(query) ||
        (battle.alternateName &&
          battle.alternateName.toLowerCase().includes(query)) ||
        battle.location.toLowerCase().includes(query) ||
        battle.dateLabel.toLowerCase().includes(query) ||
        battle.significance.toLowerCase().includes(query)
      );
    });
  }, [phaseFilter, searchQuery]);

  return (
    <section
      id="battles"
      className="py-16 sm:py-20 border-b border-stone-200/80 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141210] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-8 pb-6 border-b border-stone-300/80 dark:border-stone-800 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              03. السجل القتالي والميداني
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              المعارك والوقائع التي شارك فيها المجاهد
            </h2>
          </div>

          <div className="relative w-full lg:w-80">
            <label htmlFor="battle-search" className="sr-only">
              ابحث في سجل المعارك
            </label>
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="battle-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المعركة أو الموقع أو السنة..."
              className="w-full pr-10 pl-4 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#1C1917] border border-stone-300 dark:border-stone-700 rounded-md text-[#1C1917] dark:text-[#F5F2EB] placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-[#78350F] dark:focus:border-[#D97706]"
            />
          </div>
        </div>

        {/* Segmented Filter Controls */}
        <div
          role="tablist"
          aria-label="تصفية المعارك حسب المرحلة التاريخية"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFECE5] dark:bg-[#1C1917] border border-stone-300/70 dark:border-stone-800 rounded-lg mb-8 w-fit max-w-full"
        >
          {PHASE_FILTERS.map((tab) => {
            const isActive = phaseFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPhaseFilter(tab.value)}
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

        {/* Battle Chronicle List */}
        {filteredBattles.length === 0 ? (
          <div className="bg-[#F5F1E8] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-10 text-center">
            <p className="font-serif text-xl text-[#1C1917] dark:text-[#F5F2EB] mb-2">
              لم يتم العثور على معارك مطابقة للبحث
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              جرّب تغيير كلمات البحث أو إعادة عرض جميع المعارك الموثقة.
            </p>
            <button
              type="button"
              onClick={() => {
                setPhaseFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#78350F] dark:bg-[#92400E] text-[#FBF9F5] rounded-md cursor-pointer"
            >
              إعادة تعيين التصفية
            </button>
          </div>
        ) : (
          <div className="border-t border-stone-300/80 dark:border-stone-800">
            {filteredBattles.map((battle) => {
              const isExpanded = expandedId === battle.id;
              return (
                <div
                  key={battle.id}
                  className="border-b border-stone-300/80 dark:border-stone-800 transition-colors duration-150 bg-[#FBF9F5] dark:bg-[#141210] hover:bg-[#F5F1E8]/70 dark:hover:bg-[#1C1917]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : battle.id)
                    }
                    aria-expanded={isExpanded}
                    className="w-full text-right py-5 px-3 sm:px-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] dark:focus-visible:ring-[#D97706]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 min-w-0">
                      <span className="font-serif text-sm text-stone-400 dark:text-stone-500 tabular-nums shrink-0">
                        {String(battle.index).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {battle.name}
                          {battle.alternateName && (
                            <span className="font-normal text-base text-stone-600 dark:text-stone-400 mr-2">
                              ({battle.alternateName})
                            </span>
                          )}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                          <span className="tabular-nums text-[#78350F] dark:text-[#E5A93B] font-medium">
                            {battle.dateLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{battle.location}</span>
                          <span aria-hidden="true">·</span>
                          <span>{battle.phaseLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline text-xs text-stone-600 dark:text-stone-400">
                        {battle.outcome}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-3 sm:px-5 pb-6 pt-2 mr-0 sm:mr-9 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F5F1E8]/60 dark:bg-[#1C1917] border-t border-stone-200/80 dark:border-stone-800">
                      <div className="md:col-span-7 space-y-2.5 py-2">
                        <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                          الأهمية التاريخية ودور المجاهدين
                        </p>
                        <p className="text-sm sm:text-base text-[#292524] dark:text-stone-200 leading-relaxed">
                          {battle.significance}
                        </p>
                        {battle.commanders && (
                          <p className="text-xs sm:text-sm text-[#78350F] dark:text-[#E5A93B] font-medium pt-1">
                            {battle.commanders}
                          </p>
                        )}
                      </div>

                      <dl className="md:col-span-5 space-y-2.5 py-2 text-xs sm:text-sm border-t md:border-t-0 md:border-r border-stone-300/70 dark:border-stone-800 md:pr-6">
                        <div>
                          <dt className="text-stone-500 dark:text-stone-400">الأطراف المشاركة</dt>
                          <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
                            {battle.forces}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-stone-500 dark:text-stone-400">النتيجة والمآل</dt>
                          <dd className="font-medium text-[#14532D] dark:text-[#6EE7B7] mt-0.5">
                            {battle.outcome}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
