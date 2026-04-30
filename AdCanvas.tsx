import { useRef, forwardRef } from 'react';

export interface AdData {
  productImage: string | null;
  logoImage: string | null;
  title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  badge: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  layout: 'centered' | 'split' | 'minimal';
  showBgRemoved: boolean;
}

interface AdCanvasProps {
  data: AdData;
  dominantColor?: [number, number, number] | null;
}

const AdCanvas = forwardRef<HTMLDivElement, AdCanvasProps>(({ data, dominantColor }, ref) => {
  const bgStyle: React.CSSProperties = {
    background: dominantColor
      ? `linear-gradient(135deg, rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]}) 0%, ${data.bgColor} 100%)`
      : data.bgColor,
  };

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: '1/1', ...bgStyle }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Layout: centered */}
      {data.layout === 'centered' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
          {/* Badge */}
          {data.badge && (
            <div className="self-start mt-1">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                style={{ background: data.accentColor, color: '#fff' }}
              >
                {data.badge}
              </span>
            </div>
          )}

          {/* Logo */}
          {data.logoImage && (
            <div className="absolute top-3 left-3">
              <img
                src={data.logoImage}
                alt="شعار"
                className="h-10 w-auto object-contain drop-shadow-lg"
              />
            </div>
          )}

          {/* Product image */}
          <div className="flex-1 flex items-center justify-center w-full px-4">
            {data.productImage ? (
              <img
                src={data.productImage}
                alt="المنتج"
                className="max-h-[55%] w-auto object-contain drop-shadow-2xl"
                style={{ maxHeight: '55%', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                <span className="text-white/50 text-xs">صورة المنتج</span>
              </div>
            )}
          </div>

          {/* Text content */}
          <div className="w-full text-center pb-10">
            {data.title && (
              <h2
                className="font-black text-lg leading-tight text-shadow-ad"
                style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
              >
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p
                className="text-sm mt-1 text-shadow-ad opacity-90"
                style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
              >
                {data.subtitle}
              </p>
            )}
            {(data.price || data.oldPrice) && (
              <div className="flex items-center justify-center gap-3 mt-2">
                {data.price && (
                  <span
                    className="text-2xl font-black text-shadow-ad"
                    style={{ color: data.accentColor, fontFamily: 'Tajawal, sans-serif' }}
                  >
                    {data.price}
                  </span>
                )}
                {data.oldPrice && (
                  <span
                    className="text-base line-through opacity-60 text-shadow-ad"
                    style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
                  >
                    {data.oldPrice}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Layout: split */}
      {data.layout === 'split' && (
        <div className="absolute inset-0 flex">
          {/* Right side: text */}
          <div className="w-1/2 flex flex-col justify-center pr-4 pl-2 py-4 gap-2">
            {data.logoImage && (
              <img src={data.logoImage} alt="شعار" className="h-8 w-auto object-contain self-start drop-shadow-lg" />
            )}
            {data.badge && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start shadow"
                style={{ background: data.accentColor, color: '#fff' }}
              >
                {data.badge}
              </span>
            )}
            {data.title && (
              <h2
                className="font-black text-base leading-snug text-shadow-ad"
                style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
              >
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xs text-shadow-ad opacity-90" style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}>
                {data.subtitle}
              </p>
            )}
            {data.price && (
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-shadow-ad" style={{ color: data.accentColor, fontFamily: 'Tajawal, sans-serif' }}>
                  {data.price}
                </span>
                {data.oldPrice && (
                  <span className="text-sm line-through opacity-60 text-shadow-ad" style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}>
                    {data.oldPrice}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Left side: image */}
          <div className="w-1/2 flex items-center justify-center">
            {data.productImage ? (
              <img
                src={data.productImage}
                alt="المنتج"
                className="max-h-[80%] w-auto object-contain"
                style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.5))' }}
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center">
                <span className="text-white/40 text-xs">صورة</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Layout: minimal */}
      {data.layout === 'minimal' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
          {data.logoImage && (
            <img src={data.logoImage} alt="شعار" className="h-12 w-auto object-contain drop-shadow-lg mb-2" />
          )}
          {data.title && (
            <h2
              className="font-black text-2xl text-center leading-tight text-shadow-ad"
              style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
            >
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p
              className="text-sm text-center text-shadow-ad opacity-85"
              style={{ color: data.textColor, fontFamily: 'Tajawal, sans-serif' }}
            >
              {data.subtitle}
            </p>
          )}
          {data.price && (
            <div className="mt-2 px-6 py-2 rounded-full shadow-lg" style={{ background: data.accentColor }}>
              <span className="text-xl font-black text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {data.price}
              </span>
            </div>
          )}
          {data.productImage && (
            <img
              src={data.productImage}
              alt="المنتج"
              className="mt-2 max-h-32 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
            />
          )}
        </div>
      )}

      {/* Fixed footer - always visible */}
      <div
        className="absolute bottom-0 left-0 right-0 py-2 px-4 flex items-center justify-center"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }}
      >
        <span
          className="text-sm font-bold text-shadow-ad"
          style={{
            color: '#ffffff',
            fontFamily: 'Tajawal, sans-serif',
            textShadow: '1px 1px 3px #000, -1px -1px 3px #000, 1px -1px 3px #000, -1px 1px 3px #000, 0 2px 8px rgba(0,0,0,0.9)',
          }}
        >
          القحطاني | 0501234567
        </span>
      </div>
    </div>
  );
});

AdCanvas.displayName = 'AdCanvas';

export default AdCanvas;
