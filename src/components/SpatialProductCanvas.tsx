import React, { useRef, useEffect, useState } from 'react';

interface SpatialProductCanvasProps {
  onSelectProduct: (productName: string) => void;
}

interface ProductItem {
  id: string;
  name: string;
  spec: string;
  category: string;
  status: string;
  image: string;
  className: string;
  depth: number;
  hotspotStyle?: React.CSSProperties;
  hotspotLabel?: string;
  dropShadowClass: string;
  animationClass: string;
}

export const SpatialProductCanvas: React.FC<SpatialProductCanvasProps> = ({
  onSelectProduct,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    name: string;
    spec: string;
    status: string;
  } | null>(null);

  // Mouse & Parallax Coordinates with Lerp
  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      if (activeTooltip) {
        setActiveTooltip((prev) =>
          prev ? { ...prev, x: e.clientX + 20, y: e.clientY + 20 } : null
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const renderLoop = () => {
      // Lerp smoothing
      mouseState.current.currentX +=
        (mouseState.current.targetX - mouseState.current.currentX) * 0.06;
      mouseState.current.currentY +=
        (mouseState.current.targetY - mouseState.current.currentY) * 0.06;

      const curX = mouseState.current.currentX;
      const curY = mouseState.current.currentY;

      // Apply transformations to layers
      layerRefs.current.forEach((layer) => {
        if (!layer) return;
        const depth = parseFloat(layer.getAttribute('data-depth') || '0.05');
        const tx = curX * depth * 320;
        const ty = curY * depth * 220;
        const rx = -curY * depth * 12;
        const ry = curX * depth * 12;

        layer.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTooltip]);

  const products: ProductItem[] = [
    // 1. Background Anchor Left Upper: Motherboard
    {
      id: 'motherboard',
      name: 'Z790 Workstation Motherboard',
      spec: 'PCIe 5.0 · Dual LAN · Metallic VRM Heatsinks',
      category: 'Core Components',
      status: '● Verified In Stock',
      image: '/assets/motherboard.png',
      className: 'top-[10%] left-[1%] sm:left-[3%] lg:left-[5%] w-[220px] sm:w-[280px] lg:w-[330px] -rotate-6 opacity-40 sm:opacity-100',
      depth: 0.03,
      hotspotLabel: 'Z790 Architecture',
      hotspotStyle: { top: '35%', right: '-20px' },
      dropShadowClass: 'drop-shadow-motherboard',
      animationClass: 'animate-float-1',
    },
    // 2. Foreground Hero Anchor Left Lower: Epson EcoTank Pro Printer
    {
      id: 'printer',
      name: 'Epson EcoTank Pro Series',
      spec: 'PrecisionCore Heat-Free Enterprise Printing',
      category: 'Business Printers',
      status: '● Verified In Stock',
      image: '/assets/epson_printer.png',
      className: 'top-[46%] left-[0.5%] sm:left-[2%] lg:left-[4%] w-[270px] sm:w-[350px] lg:w-[420px] rotate-2 opacity-40 sm:opacity-100',
      depth: 0.07,
      hotspotLabel: 'Epson EcoTank Pro',
      hotspotStyle: { bottom: '-15px', left: '50%', transform: 'translateX(-50%)' },
      dropShadowClass: 'drop-shadow-printer',
      animationClass: 'animate-float-main',
    },
    // 3. Foreground Hero Anchor Right Upper: UltraVision 4K Curved Display (Above Keyboard)
    {
      id: 'monitor',
      name: 'UltraVision 4K Studio Display',
      spec: 'Frameless Curved IPS · 99% DCI-P3 Color Accuracy',
      category: 'Displays',
      status: '● Verified In Stock',
      image: '/assets/pro_monitor.png',
      className: 'top-[10%] sm:top-[12%] lg:top-[14%] right-[1%] sm:right-[3%] lg:right-[5%] w-[260px] sm:w-[340px] lg:w-[410px] -rotate-2 opacity-40 sm:opacity-100',
      depth: 0.05,
      hotspotLabel: 'UltraVision 4K',
      hotspotStyle: { top: '-12px', left: '50%', transform: 'translateX(-50%)' },
      dropShadowClass: 'drop-shadow-monitor',
      animationClass: 'animate-float-2',
    },
    // 4. Foreground Hero Anchor Right Lower: Mechanical Keyboard (Directly Below Display)
    {
      id: 'keyboard',
      name: 'AeroCNC Mechanical Keyboard',
      spec: 'Anodized Solid Aluminum Frame · Red Enter Accent',
      category: 'Peripherals',
      status: '● In Stock',
      image: '/assets/mech_keyboard.png',
      className: 'top-[47%] sm:top-[49%] lg:top-[51%] right-[2%] sm:right-[3.5%] lg:right-[5.5%] w-[220px] sm:w-[280px] lg:w-[330px] rotate-2 opacity-40 sm:opacity-100',
      depth: 0.08,
      hotspotLabel: 'AeroCNC Keyboard',
      hotspotStyle: { bottom: '-12px', right: '15%' },
      dropShadowClass: 'drop-shadow-keyboard',
      animationClass: 'animate-float-1',
    },
  ];

  // Group products dynamically by depth layer
  const uniqueDepths = Array.from(new Set(products.map((p) => p.depth)));
  const layers = uniqueDepths.map((depth) => ({
    depth,
    products: products.filter((p) => p.depth === depth),
  }));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 perspective-1200 overflow-hidden select-none"
    >
      {layers.map((layer, lIdx) => (
        <div
          key={layer.depth}
          ref={(el) => {
            layerRefs.current[lIdx] = el;
          }}
          data-depth={layer.depth}
          className="absolute inset-0 preserve-3d will-change-transform pointer-events-none"
        >
          {layer.products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.name)}
              onMouseEnter={(e) => {
                setActiveTooltip({
                  x: e.clientX + 20,
                  y: e.clientY + 20,
                  name: prod.name,
                  spec: prod.spec,
                  status: prod.status,
                });
              }}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`absolute cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105 hover:z-30 group ${prod.className}`}
            >
              {/* Product Image with clean transparency and drop shadow */}
              <div className={prod.animationClass}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  className={`w-full h-auto select-none pointer-events-auto ${prod.dropShadowClass}`}
                  loading="eager"
                />
              </div>

              {/* Hotspot Pulse Badge */}
              {prod.hotspotLabel && (
                <div
                  style={prod.hotspotStyle}
                  className="absolute flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 shadow-md text-[#0E1117] transition-all duration-200 group-hover:border-[#E51E2B]/40 group-hover:-translate-y-0.5"
                >
                  <span className="w-1.5 h-1.5 bg-[#E51E2B] rounded-full animate-ping" />
                  <span className="font-mono text-[0.66rem] font-semibold whitespace-nowrap">
                    {prod.hotspotLabel}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Floating HUD Tooltip following cursor */}
      {activeTooltip && (
        <div
          style={{ left: activeTooltip.x, top: activeTooltip.y }}
          className="fixed z-50 pointer-events-none bg-[#0E1117]/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl border border-white/15 shadow-2xl transition-opacity duration-150 max-w-[260px] animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 bg-[#E51E2B] rounded-full" />
            <span className="font-mono text-[0.6rem] tracking-wider text-white/60 uppercase">
              HARDWARE SPEC
            </span>
          </div>
          <div className="font-heading font-bold text-[0.88rem] text-white leading-tight">
            {activeTooltip.name}
          </div>
          <div className="text-[0.74rem] text-white/80 mt-0.5">
            {activeTooltip.spec}
          </div>
          <div className="font-mono text-[0.68rem] text-emerald-400 mt-1">
            {activeTooltip.status}
          </div>
        </div>
      )}
    </div>
  );
};
