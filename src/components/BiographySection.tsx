import { ArrowUpLeft } from 'lucide-react';
import { ArchivalImage } from './ArchivalImage';

interface BiographySectionProps {
  onSelectArtifact: (artifactId: string) => void;
}

export function BiographySection({ onSelectArtifact }: BiographySectionProps) {
  return (
    <section
      id="biography"
      className="py-16 sm:py-20 border-b border-stone-200/80 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#141210] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-10 pb-6 border-b border-stone-300/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              01. السيرة والتوثيق التاريخي
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              فصول من حياة المجاهد ومسيرة النضال
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md">
            قراءة تاريخية موثقة تستعرض نشأة المجاهد في عين ماره، والتحاقه
            المبكر بالحركة السنوسية، ودوره في الإمداد والمعارك الكبرى.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main 70% Editorial Narrative Column */}
          <div className="lg:col-span-8 space-y-10 text-[#292524] dark:text-stone-300 leading-[1.85] text-base sm:text-[1.0625rem]">
            <article className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                النشأة البدوية والبيئة العائلية في عين ماره
              </h3>
              <p className="max-w-[70ch]">
                وُلِد المجاهد عبد المالك عطية عبدالله بوعوجة العبيدي سنة{' '}
                <span className="font-semibold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">1886م</span>{' '}
                (الموافق{' '}
                <span className="font-semibold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">1308هـ</span>) في
                منطقة عين ماره بالجبل الأخضر. نشأ في أحد النجوع البدوية
                الأصيلة، وتربى منذ نعومة أظفاره على الأخلاق البدوية الرفيعة من
                كرم وشهامة وفروسية وحبٍّ عميق للوطن.
              </p>
              <p className="max-w-[70ch]">
                ترعرع في كنف عائلة كريمة تتكون من أب وأم وعشرة إخوة، كانوا
                يمتهنون الزراعة والتجارة، مما أكسبه معرفة واسعة بمسالك الجبل
                الأخضر وموارده وأهله، وهي الخبرة التي أصبحت لاحقاً ركيزة أساسية
                في تنظيم خطوط الإمداد للمجاهدين.
              </p>
            </article>

            <div className="py-6 border-y border-stone-300/70 dark:border-stone-800">
              <blockquote className="font-serif text-xl sm:text-2xl italic text-[#1C1917] dark:text-[#F5F2EB] leading-relaxed text-center max-w-2xl mx-auto">
                «وجود اسم المجاهد عبد المالك عطية بوعوجة ضمن قائمة المقاتلين
                برقم عشرة يبرز مكانته المتقدمة ودوره القيادي في المعارك الكبرى
                وضمن صفوف مجاهدي قبائل العبيدات.»
              </blockquote>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                الالتحاق بسيدي أحمد الشريف وقيادة خطوط الإمداد
              </h3>
              <p className="max-w-[70ch]">
                عندما بلغ الثامنة عشرة من عمره، لبّى نداء الواجب والتحق بسيدي{' '}
                <strong className="text-[#1C1917] dark:text-[#F5F2EB]">أحمد الشريف السنوسي</strong>، قائد حركة الجهاد في
                ليبيا، عام{' '}
                <span className="font-semibold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">1903م</span>{' '}
                (الموافق{' '}
                <span className="font-semibold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">1325هـ</span>). ومع
                اندلاع الغزو الإيطالي عام 1911م، خاض غمار المعارك الأولى في
                الكويفية وجليانة ببنغازي، ثم معركة درنة وسيدي أكرم القرباع
                والقرضابية، إلى جانب جبهة السلوم وبئر تونس.
              </p>
              <p className="max-w-[70ch]">
                وإلى جانب حضوره الميداني في صفوف المقاتلين، كان للمجاهد عبد
                المالك دورٌ بارز في تأمين <strong className="text-[#1C1917] dark:text-[#F5F2EB]">خطوط الإمداد والتموين</strong>{' '}
                للمجاهدين، حيث ضحّى مع أبناء قبائل العبيدات بأرواحهم وأموالهم
                طيلة سنوات المقاومة الطويلة لضمان صمود الجبهات في وجه التفوق
                العسكري الاستعماري.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                رحلة الحج الشاقة، الإصابة والأسر في مرتوبة، والرحيل في القبة
              </h3>
              <p className="max-w-[70ch]">
                بعد رحلة شاقة رافق فيها سيدي أحمد الشريف إلى المملكة العربية
                السعودية لأداء فريضة الحج، عاد المجاهد عبد المالك مع رفاقه عبر
                طريق الصحراء القاسي مروراً بـ <strong className="text-[#1C1917] dark:text-[#F5F2EB]">واحة سيوة</strong>. وقد
                توفي كثير من الرفاق في تلك المسيرة جراء الجوع والعطش، حتى وصل
                الناجون إلى منطقة <strong className="text-[#1C1917] dark:text-[#F5F2EB]">عكرمة</strong> قرب طبرق حيث كان الملك
                إدريس السنوسي، فعاد عبد المالك إلى عين ماره والتحق مجدداً
                بالمجاهدين في الجبل الأخضر.
              </p>
              <p className="max-w-[70ch]">
                أثناء إحدى المعارك، أُصيب بجروح خطيرة فقبض عليه الإيطاليون
                ووضعوه تحت <strong className="text-[#1C1917] dark:text-[#F5F2EB]">الإقامة الجبرية في منطقة مرتوبة</strong>{' '}
                جنوب درنة. وبعد القبض على شيخ الشهداء عمر المختار في عام{' '}
                <span className="font-semibold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">1931م</span>{' '}
                وانتهاء حركة الجهاد المسلح، عاد عبد المالك إلى دياره في عين
                ماره. وبعد عمر مديد حافل بالتضحيات نال خلاله وسام الجهاد، تُوفي
                رحمه الله في{' '}
                <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">فبراير 1991م</span> بمدينة
                القبة في منزل ابنه <strong className="text-[#1C1917] dark:text-[#F5F2EB]">الحاج جبريل عبد المالك بوعوجة</strong>
                .
              </p>
            </article>
          </div>

          {/* 30% Archival Margin Notes Column */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#F3EFE7] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-5 transition-colors duration-200">
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
                لوحة 02 · وثيقة تاريخية مرتبطة
              </p>
              <button
                type="button"
                onClick={() => onSelectArtifact('jihad-decree-1974')}
                className="group block w-full overflow-hidden border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-[#231F1C] mb-4 cursor-pointer"
                aria-label="فتح وثيقة وسام الجهاد لعام 1974م"
              >
                <ArchivalImage
                  src="/assets/aistudio/certificate_enhanced_6a5636e7.png"
                  alt="وثيقة منح وسام الجهاد للمجاهد عبد المالك عطية عبدالله"
                  className="w-full h-56 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  fallbackTitle="وثيقة وسام الجهاد 1974م"
                />
              </button>
              <h4 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] mb-1.5">
                وثيقة منح وسام الجهاد (1974م)
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                قرار مجلس قيادة الثورة الصادر في جمادى الأول 1394هـ بمنح المجاهد
                عبد المالك عطية عبد الله وسام الجهاد تقديراً لمشاركته في معارك
                الجهاد المقدس.
              </p>
              <button
                type="button"
                onClick={() => onSelectArtifact('jihad-decree-1974')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#78350F] dark:text-[#E5A93B] hover:underline cursor-pointer"
              >
                <span>قراءة النص الكامل وتكبير الوثيقة</span>
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#F5F1E8] dark:bg-[#1C1917] border border-stone-300/80 dark:border-stone-800 p-5 space-y-4 transition-colors duration-200">
              <h4 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] pb-2 border-b border-stone-300/70 dark:border-stone-800">
                بطاقة تعريف تاريخية
              </h4>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
                  <dt className="text-stone-500 dark:text-stone-400">القبيلة والنسب</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left">
                    قبائل العبيدات
                  </dd>
                </div>
                <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
                  <dt className="text-stone-500 dark:text-stone-400">رقم القيد القتالي</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] tabular-nums text-left">
                    المقاتل رقم 10
                  </dd>
                </div>
                <div className="flex justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
                  <dt className="text-stone-500 dark:text-stone-400">موقع الإقامة الجبرية</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left">
                    مرتوبة جنوب درنة
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500 dark:text-stone-400">آخر محطة للحياة</dt>
                  <dd className="font-medium text-[#1C1917] dark:text-[#F5F2EB] text-left">
                    مدينة القبة (1991م)
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
