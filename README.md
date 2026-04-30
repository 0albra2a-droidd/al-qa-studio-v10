# القحطاني ستوديو V10.1.0 — Bolt Pro Edition

استوديو تصميم إعلانات احترافي مبني بتقنية PWA يعمل بالكامل في المتصفح.

## المميزات

- **إزالة الخلفية تلقائيًا** باستخدام `@imgly/background-removal` (يعمل محليًا في المتصفح)
- **توليد النصوص بالذكاء الاصطناعي** عبر Gemini API
- **استخراج الألوان السائدة** من صورة المنتج تلقائيًا
- **ثلاثة تخطيطات** (مركزي، منقسم، بسيط)
- **تحميل الإعلان** بصيغة PNG عالية الجودة
- **الوضع الداكن/الفاتح** مع حفظ الإعداد
- **تصميم RTL كامل** باللغة العربية
- **تطبيق ويب تقدمي (PWA)** يعمل بدون إنترنت

## متطلبات التشغيل

- Node.js 18+
- npm 9+

## التثبيت

```bash
# نسخ ملف المتغيرات
cp .env.example .env

# تعديل المفتاح (اختياري للذكاء الاصطناعي)
# VITE_GEMINI_API_KEY=your_key_here

# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run dev

# البناء للإنتاج
npm run build
```

## المتغيرات البيئية

| المتغير | الوصف | مطلوب |
|---------|-------|--------|
| `VITE_GEMINI_API_KEY` | مفتاح Gemini API لتوليد النصوص | لا |

## هيكل الملفات

```
src/
├── components/
│   ├── Header.tsx         # رأس الصفحة مع زر الوضع الداكن
│   ├── ImageUploader.tsx  # رفع الصور بالسحب والإفلات
│   ├── AdCanvas.tsx       # منطقة عرض الإعلان
│   └── ControlPanel.tsx   # لوحة التحكم في التصميم
├── lib/
│   └── utils.ts           # أدوات مساعدة (getLuminance, cn)
├── App.tsx                # المكوّن الرئيسي
└── index.css              # نظام الألوان OKLCH + خط Tajawal
```

## رفع المشروع على GitHub

بعد البناء، نفّذ الأوامر التالية:

```bash
git init
git add .
git commit -m "feat: Al-Qa Studio V10.1.0 - Bolt Pro Edition"
git remote add origin https://github.com/YOUR_USERNAME/al-qa-studio.git
git push -u origin main
```

## التقنيات المستخدمة

- React 18.3.1 + TypeScript
- Vite 5 + PWA Plugin
- Tailwind CSS (OKLCH Design Tokens)
- @imgly/background-removal 1.4.5
- html-to-image 1.11
- colorthief 2.4.0
- lucide-react 0.446.0

---

> النص الثابت في أسفل كل إعلان: **القحطاني | 0501234567**
