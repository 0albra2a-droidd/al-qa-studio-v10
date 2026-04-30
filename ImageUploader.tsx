import { useRef, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (dataUrl: string) => void;
  label: string;
  preview?: string | null;
}

export default function ImageUploader({ onImageSelect, label, preview }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelect(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all duration-200 min-h-[140px] flex items-center justify-center
        ${dragging
          ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/10'
          : 'border-[oklch(0.85_0_0)] dark:border-[oklch(0.35_0_0)] hover:border-amber-400 bg-[oklch(0.97_0_0)] dark:bg-[oklch(0.18_0_0)] hover:bg-amber-50/50 dark:hover:bg-amber-900/5'
        }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <div className="w-full h-full">
          <img
            src={preview}
            alt={label}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">تغيير الصورة</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-6 px-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-[oklch(0.3_0_0)] dark:text-[oklch(0.75_0_0)]">{label}</p>
            <p className="text-xs text-[oklch(0.55_0_0)] dark:text-[oklch(0.5_0_0)] mt-0.5">اسحب وأفلت أو انقر للرفع</p>
          </div>
          <Upload className="w-4 h-4 text-amber-500" />
        </div>
      )}
    </div>
  );
}
