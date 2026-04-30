import { Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Header({ darkMode, onToggleDark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[oklch(0.922_0_0/0.2)] backdrop-blur-xl bg-white/80 dark:bg-[oklch(0.145_0_0/0.85)] dark:border-[oklch(0.3_0_0/0.3)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)]">
              القحطاني ستوديو
            </h1>
            <p className="text-[10px] text-[oklch(0.5_0_0)] dark:text-[oklch(0.6_0_0)] leading-none">
              V10.1.0 — Bolt Pro Edition
            </p>
          </div>
        </div>

        <button
          onClick={onToggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-[oklch(0.922_0_0)] dark:border-[oklch(0.3_0_0)] bg-white dark:bg-[oklch(0.2_0_0)] hover:bg-gray-50 dark:hover:bg-[oklch(0.25_0_0)] transition-all duration-200 shadow-sm"
          title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
        >
          {darkMode
            ? <Sun className="w-4 h-4 text-amber-500" />
            : <Moon className="w-4 h-4 text-slate-600" />
          }
        </button>
      </div>
    </header>
  );
}
