import { useState, useRef, useCallback, useEffect } from 'react';
import { Download, Trash2, Wand2, ImagePlus } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import Header from './Header';
import ImageUploader from './ImageUploader';
import AdCanvas from './AdCanvas';
import ControlPanel from './ControlPanel';
import type { AdData } from './AdCanvas';

const DEFAULT_AD: AdData = {
  productImage: null,
  logoImage: null,
  title: 'عرض لا يُفوَّت',
  subtitle: 'جودة استثنائية بسعر لا يُصدَّق',
  price: '٢٩٩ ر.س',
  oldPrice: '٥٩٩ ر.س',
  badge: 'خصم ٥٠٪',
  bgColor: '#1a1a2e',
  textColor: '#ffffff',
  accentColor: '#f5a623',
  layout: 'centered',
  showBgRemoved: false,
};

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  const [adData, setAdData] = useState<AdData>(DEFAULT_AD);
  const [dominantColor, setDominantColor] = useState<[number, number, number] | null>(null);
  const [removingBg, setRemovingBg] = useState(false);
  const [bgError, setBgError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const handleAdChange = useCallback((updates: Partial<AdData>) => {
    setAdData(prev => ({...prev,...updates }));
  }, []);

  const extractDominantColor = async (imageUrl: string) => {
    try {
      const { default: ColorThief } = await import('colorthief');
      const ct = new ColorThief();
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });
      const color = ct.getColor(img) as [number, number, number];
      setDominantColor(color);
      handleAdChange({ textColor: '#ffffff' });
    } catch {
      // ignore color extraction errors
    }
  };

  const handleProductImage = async (dataUrl: string) => {
    handleAdChange({ productImage: dataUrl, showBgRemoved: false });
    setBgError('');
    await extractDominantColor(dataUrl);
  };

  const handleLogoImage = (dataUrl: string) => {
    handleAdChange({ logoImage: dataUrl });
  };

  const handleRemoveBackground = async () => {
    if (!adData.productImage) return;
    setRemovingBg(true);
    setBgError('');
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await (await fetch(adData.productImage)).blob();
      const resultBlob = await removeBackground(blob);
      const url = URL.createObjectURL(resultBlob);
      handleAdChange({ productImage: url, showBgRemoved: true });
    } catch {
      setBgError('فشل إزالة الخلفية، جرب صورة أوضح');
    } finally {
      setRemovingBg(false);
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: canvasRef.current.offsetWidth,
        height: canvasRef.current.offsetHeight,
      });
      const link = document.createElement('a');
      link.download = `اعلان-القحطاني-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // silent fail
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setAdData(DEFAULT_AD);
    setDominantColor(null);
    setBgError('');
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0_0)] dark:bg-[oklch(0.1_0_0)] font-[Tajawal,sans-serif] transition-colors duration-300">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d =>!d)} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          <aside className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 order-2 lg:order-1">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ImagePlus className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-[oklch(0.2_0_0)] dark:text-[oklch(0.9_0_0)]">الصور</h3>
              </div>
              <div className="flex flex-col gap-3">
                <ImageUploader
                  label="صورة المنتج"
                  onImageSelect={handleProductImage}
                  preview={adData.productImage}
                />

                {adData.productImage && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRemoveBackground}
                      disabled={removingBg}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-l from-sky-500 to-blue-600 text-white text-xs font-bold disabled:opacity-60 hover:from-sky-600 hover:to-blue-700 transition-all shadow"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      {removingBg? 'جاري الإزالة...' : 'إزالة الخلفية'}
                    </button>
                    <button
                      onClick={() => handleAdChange({ productImage: null })}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {bgError && (
                  <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800/50">
                    {bgError}
                  </div>
                )}

                <ImageUploader
                  label="الشعار (اختياري)"
                  onImageSelect={handleLogoImage}
                  preview={adData.logoImage}
                />
                {adData.logoImage && (
                  <button
                    onClick={() => handleAdChange({ logoImage: null })}
                    className="text-xs text-red-500 hover:underline text-right"
                  >
                    حذف الشعار
                  </button>
                )}
              </div>
            </div>

            <ControlPanel data={adData} onChange={handleAdChange} />
          </aside>

          <section className="flex-1 flex flex-col gap-4 order-1 lg:order-2">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-[oklch(0.3_0_0)] dark:text-[oklch(0.8_0_0)]">معاينة الإعلان</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] text-[oklch(0.4_0_0)] dark:text-[oklch(0.65_0_0)] hover:bg-gray-50 dark:hover:bg-[oklch(0.2_0_0)] transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    إعادة ضبط
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-l from-amber-500 to-orange-500 text-white shadow hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 transition-all"
                  >
                    <Download className="w-3 h-3" />
                    {downloading? 'جارٍ التحميل...' : 'تحميل الإعلان'}
                  </button>
                </div>
              </div>

              <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl">
                <AdCanvas
                  ref={canvasRef}
                  data={adData}
                  dominantColor={dominantColor}
                />
              </div>

              <p className="text-center text-xs text-[oklch(0.55_0_0)] dark:text-[oklch(0.5_0_0)] mt-3">
                مربع 1:1 — مناسب لإنستغرام وسناب شات
              </p>
            </div>

            <div className="glass-card rounded-xl p-4">
              <h3 className="text-xs font-bold text-[oklch(0.3_0_0)] dark:text-[oklch(0.75_0_0)] mb-2">نصائح احترافية</h3>
              <ul className="flex flex-col gap-1.5">
                {[
                  'استخدم صورة بخلفية بيضاء نظيفة للحصول على أفضل نتيجة عند إزالة الخلفية',
                  'اختر ألوانًا متباينة بين الخلفية والنص لضمان القراءة الواضحة',
                  'الشعار يظهر في أعلى الإعلان تلقائيًا في جميع التخطيطات',
                  'يمكنك توليد النصوص بالذكاء الاصطناعي باستخدام مفتاح Gemini API',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[oklch(0.5_0_0)] dark:text-[oklch(0.55_0_0)]">
                    <span className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-[oklch(0.922_0_0/0.3)] dark:border-[oklch(0.3_0_0/0.3)] py-4 px-4 text-center">
        <p className="text-xs text-[oklch(0.55_0_0)] dark:text-[oklch(0.45_0_0)]">
          القحطاني ستوديو V10.1.0 — Bolt Pro Edition — جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}