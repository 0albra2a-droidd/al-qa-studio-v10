import { Palette, Type, Tag, Layout } from 'lucide-react';
import type { AdData } from './AdCanvas';

interface ControlPanelProps {
  data: AdData;
  onChange: (updates: Partial<AdData>) => void;
}

const layouts: { value: AdData['layout']; label: string }[] = [
  { value: 'centered', label: 'مركزي' },
  { value: 'split', label: 'منقسم' },
  { value: 'minimal', label: 'بسيط' },
];

const presetColors = [
  '#000000', '#1a1a2e', '#0f3460', '#533483',
  '#e94560', '#f5a623', '#2ecc71', '#e74c3c',
  '#ffffff', '#f8f9fa', '#343a40', '#6c757d',
];

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500">{icon}</span>
        <h3 className="text-sm font-bold text-[oklch(0.2_0_0)] dark:text-[oklch(0.9_0_0)]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function LabelInput({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[oklch(0.45_0_0)] dark:text-[oklch(0.6_0_0)]">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] bg-white dark:bg-[oklch(0.2_0_0)] text-[oklch(0.2_0_0)] dark:text-[oklch(0.9_0_0)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
      />
    </div>
  );
}

export default function ControlPanel({ data, onChange }: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Layout */}
      <Section icon={<Layout className="w-4 h-4" />} title="التخطيط">
        <div className="grid grid-cols-3 gap-2">
          {layouts.map(l => (
            <button
              key={l.value}
              onClick={() => onChange({ layout: l.value })}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 border
                ${data.layout === l.value
                  ? 'bg-amber-500 border-amber-500 text-white shadow'
                  : 'bg-transparent border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] text-[oklch(0.3_0_0)] dark:text-[oklch(0.7_0_0)] hover:border-amber-400'
                }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Text */}
      <Section icon={<Type className="w-4 h-4" />} title="النصوص">
        <div className="flex flex-col gap-3">
          <LabelInput
            label="العنوان الرئيسي"
            type="text"
            value={data.title}
            placeholder="عرض خاص..."
            onChange={e => onChange({ title: e.target.value })}
          />
          <LabelInput
            label="النص الفرعي"
            type="text"
            value={data.subtitle}
            placeholder="احصل على أفضل العروض..."
            onChange={e => onChange({ subtitle: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <LabelInput
              label="السعر الحالي"
              type="text"
              value={data.price}
              placeholder="٢٩٩ ر.س"
              onChange={e => onChange({ price: e.target.value })}
            />
            <LabelInput
              label="السعر القديم"
              type="text"
              value={data.oldPrice}
              placeholder="٥٩٩ ر.س"
              onChange={e => onChange({ oldPrice: e.target.value })}
            />
          </div>
          <LabelInput
            label="الشارة (Badge)"
            type="text"
            value={data.badge}
            placeholder="خصم ٥٠٪"
            onChange={e => onChange({ badge: e.target.value })}
          />
        </div>
      </Section>

      {/* Colors */}
      <Section icon={<Palette className="w-4 h-4" />} title="الألوان">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs font-medium text-[oklch(0.45_0_0)] dark:text-[oklch(0.6_0_0)] mb-2">لون الخلفية</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {presetColors.map(c => (
                <button
                  key={c}
                  onClick={() => onChange({ bgColor: c })}
                  className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${data.bgColor === c ? 'border-amber-400 scale-110' : 'border-transparent'}`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <input
              type="color"
              value={data.bgColor}
              onChange={e => onChange({ bgColor: e.target.value })}
              className="w-full h-9 rounded-lg border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-[oklch(0.45_0_0)] dark:text-[oklch(0.6_0_0)] mb-1">لون النص</p>
              <input
                type="color"
                value={data.textColor}
                onChange={e => onChange({ textColor: e.target.value })}
                className="w-full h-9 rounded-lg border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] cursor-pointer"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[oklch(0.45_0_0)] dark:text-[oklch(0.6_0_0)] mb-1">لون التمييز</p>
              <input
                type="color"
                value={data.accentColor}
                onChange={e => onChange({ accentColor: e.target.value })}
                className="w-full h-9 rounded-lg border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* AI Prompt */}
      <Section icon={<Tag className="w-4 h-4" />} title="تحسين النص بالذكاء الاصطناعي">
        <AiPromptBox onChange={onChange} />
      </Section>
    </div>
  );
}

function AiPromptBox({ onChange }: { onChange: (updates: Partial<AdData>) => void }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!apiKey) {
      setError('مفتاح Gemini API غير مضبوط في متغيرات البيئة');
      return;
    }
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `اكتب نصًا إعلانيًا احترافيًا باللغة العربية لـ: "${prompt}".
                أعطني النتيجة بالتنسيق JSON فقط هكذا:
                {"title": "عنوان قصير جذاب", "subtitle": "وصف تسويقي", "badge": "عرض مميز"}
                لا تضف أي شرح، فقط JSON.`
              }]
            }]
          })
        }
      );
      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        onChange({ title: parsed.title, subtitle: parsed.subtitle, badge: parsed.badge });
      } else {
        setError('تعذّر تحليل الرد. حاول مجددًا.');
      }
    } catch {
      setError('فشل الاتصال بـ Gemini API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="صف منتجك... مثل: عطر ذهبي فاخر للرجال"
        rows={2}
        className="w-full rounded-lg border border-[oklch(0.87_0_0)] dark:border-[oklch(0.32_0_0)] bg-white dark:bg-[oklch(0.2_0_0)] text-[oklch(0.2_0_0)] dark:text-[oklch(0.9_0_0)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none transition-all"
      />
      <button
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="w-full py-2 rounded-lg bg-gradient-to-l from-amber-500 to-orange-500 text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-600 hover:to-orange-600 transition-all shadow"
      >
        {loading ? 'جاري التوليد...' : 'توليد بالذكاء الاصطناعي'}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!apiKey && (
        <p className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
          أضف VITE_GEMINI_API_KEY في ملف .env لتفعيل الذكاء الاصطناعي
        </p>
      )}
    </div>
  );
}

// Need to import useState for AiPromptBox
import { useState } from 'react';
