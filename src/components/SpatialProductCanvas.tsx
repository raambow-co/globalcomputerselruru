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
  shadowAnimationClass: string;
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

  // Mouse, Touch & Parallax Coordinates with High-Refresh Lerp
  const physicsState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Intersection Observer to completely pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        physicsState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Tab visibility change handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        physicsState.current.isVisible = false;
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        physicsState.current.isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3. Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      physicsState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      physicsState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      if (activeTooltip) {
        // Prevent tooltip from overflowing screen edges
        const tooltipX = Math.min(e.clientX + 20, innerWidth - 280);
        const tooltipY = Math.min(e.clientY + 20, innerHeight - 120);
        setActiveTooltip((prev) =>
          prev ? { ...prev, x: tooltipX, y: tooltipY } : null
        );
      }
    };

    // 4. Touch Move Handler for Mobile/Tablet micro-pan
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        const touch = e.touches[0];
        physicsState.current.targetX = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
        physicsState.current.targetY = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 5. High-FPS Physics Render Loop with Delta-time & Organic Harmonic Drift
    let animationFrameId: number;

    const renderLoop = (time: number) => {
      if (physicsState.current.isVisible) {
        const dt = Math.min((time - physicsState.current.lastTime) / 1000, 0.1);
        physicsState.current.lastTime = time;

        // Subtle ambient harmonic drift (adds organic life even when cursor is stationary)
        const ambientX = Math.sin(time * 0.0008) * 0.04;
        const ambientY = Math.cos(time * 0.0006) * 0.04;

        const effectiveTargetX = physicsState.current.targetX + ambientX;
        const effectiveTargetY = physicsState.current.targetY + ambientY;

        // Lerp smoothing formula calibrated for 60Hz - 240Hz screens
        const lerpFactor = 1 - Math.pow(0.001, dt);
        physicsState.current.currentX +=
          (effectiveTargetX - physicsState.current.currentX) * lerpFactor;
        physicsState.current.currentY +=
          (effectiveTargetY - physicsState.current.currentY) * lerpFactor;

        const curX = physicsState.current.currentX;
        const curY = physicsState.current.currentY;

        // Apply hardware-accelerated 3D transforms to depth planes
        layerRefs.current.forEach((layer) => {
          if (!layer) return;
          const depth = parseFloat(layer.getAttribute('data-depth') || '0.05');
          const tx = (curX * depth * 280).toFixed(2);
          const ty = (curY * depth * 180).toFixed(2);
          const rx = (-curY * depth * 10).toFixed(2);
          const ry = (curX * depth * 10).toFixed(2);

          layer.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTooltip]);

  const products: ProductItem[] = [
    // 1. Background Anchor Left Upper: Motherboard
    {
      id: 'motherboard',
      name: 'Gigabyte B760M Motherboard',
      spec: 'LGA1700 · DDR5 Memory · PCIe 4.0 · Dual M.2 Slots',
      category: 'Core Components',
      status: '● Verified In Stock',
      image: '/assets/motherboardhero.webp',
      className:
        'top-[17%] xs:top-[16%] sm:top-[12%] lg:top-[12%] left-[2%] sm:left-[3%] lg:left-[4.5%] w-[92px] xs:w-[108px] sm:w-[135px] md:w-[175px] lg:w-[220px] -rotate-6 opacity-100',
      depth: 0.03,
      hotspotLabel: 'Gigabyte B760M',
      hotspotStyle: { top: '35%', right: '-15px' },
      dropShadowClass: 'drop-shadow-motherboard',
      animationClass: 'animate-float-1',
      shadowAnimationClass: 'animate-shadow-1',
    },
    // 2. Foreground Hero Anchor Left Lower: Epson EcoTank All-in-One Printer
    {
      id: 'printer',
      name: 'Epson EcoTank All-in-One Series',
      spec: 'PrecisionCore Heat-Free · Wi-Fi Direct · Borderless Printing',
      category: 'Business Printers',
      status: '● Verified In Stock',
      image: '/assets/epsonprinterhero.webp',
      className:
        'top-[75%] xs:top-[73%] sm:top-[56%] lg:top-[54%] left-[2%] sm:left-[2.5%] lg:left-[4%] w-[102px] xs:w-[118px] sm:w-[155px] md:w-[200px] lg:w-[255px] rotate-2 opacity-100',
      depth: 0.07,
      hotspotLabel: 'Epson EcoTank',
      hotspotStyle: { bottom: '-10px', left: '50%', transform: 'translateX(-50%)' },
      dropShadowClass: 'drop-shadow-printer',
      animationClass: 'animate-float-main',
      shadowAnimationClass: 'animate-shadow-main',
    },
    // 3. Foreground Hero Anchor Right Upper: Samsung Odyssey G5 Curved Display
    {
      id: 'monitor',
      name: 'Samsung Odyssey G5 Curved Display',
      spec: '1000R Curvature · 165Hz Refresh Rate · 1ms Response HDR10',
      category: 'Displays',
      status: '● Verified In Stock',
      image: '/assets/monitorherocurved.webp',
      className:
        'top-[17%] xs:top-[16%] sm:top-[12%] lg:top-[12%] right-[2%] sm:right-[3%] lg:right-[4.5%] w-[118px] xs:w-[136px] sm:w-[185px] md:w-[255px] lg:w-[320px] -rotate-2 opacity-100',
      depth: 0.05,
      hotspotLabel: 'Samsung Odyssey G5',
      hotspotStyle: { top: '-10px', left: '50%', transform: 'translateX(-50%)' },
      dropShadowClass: 'drop-shadow-monitor',
      animationClass: 'animate-float-2',
      shadowAnimationClass: 'animate-shadow-2',
    },
    // 4. Foreground Hero Anchor Right Lower: Compact Mechanical Keyboard
    {
      id: 'keyboard',
      name: 'Mechanical RGB Gaming Keyboard',
      spec: 'RGB Backlit · Tactile Mechanical Switches · Anti-Ghosting',
      category: 'Peripherals',
      status: '● In Stock',
      image: '/assets/keyboardhero.webp',
      className:
        'top-[78%] xs:top-[76%] sm:top-[64%] lg:top-[62%] right-[2%] sm:right-[3%] lg:right-[4.5%] w-[104px] xs:w-[120px] sm:w-[155px] md:w-[205px] lg:w-[255px] rotate-2 opacity-100',
      depth: 0.08,
      hotspotLabel: 'Mechanical RGB',
      hotspotStyle: { bottom: '-10px', right: '12%' },
      dropShadowClass: 'drop-shadow-keyboard',
      animationClass: 'animate-float-1',
      shadowAnimationClass: 'animate-shadow-1',
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
          className="absolute inset-0 preserve-3d will-change-transform pointer-events-none transform-gpu"
        >
          {layer.products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.name)}
              onMouseEnter={(e) => {
                const { innerWidth, innerHeight } = window;
                const tooltipX = Math.min(e.clientX + 20, innerWidth - 280);
                const tooltipY = Math.min(e.clientY + 20, innerHeight - 120);
                setActiveTooltip({
                  x: tooltipX,
                  y: tooltipY,
                  name: prod.name,
                  spec: prod.spec,
                  status: prod.status,
                });
              }}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`absolute cursor-pointer pointer-events-auto transition-transform duration-300 ease-out hover:scale-105 hover:z-30 group ${prod.className}`}
            >
              {/* Product Structure with Hardware & 3D Ground Shadow */}
              <div className="relative flex flex-col items-center">
                
                {/* 1. Hardware Image Floating Layer */}
                <div className={prod.animationClass}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    width={240}
                    height={240}
                    className={`w-full h-auto select-none pointer-events-auto ${prod.dropShadowClass} transition-all duration-300`}
                    loading="eager"
                    decoding="async"
                    // @ts-ignore
                    fetchpriority="high"
                  />
                </div>

                {/* 2. Realistic 3D Ground Floating Ambient Shadow beneath Hardware */}
                <div className={`w-[85%] h-3 sm:h-4.5 mx-auto -mt-2 sm:-mt-3 pointer-events-none ${prod.shadowAnimationClass}`}>
                  {/* Deep core elliptical contact shadow */}
                  <div className="w-full h-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.48)_0%,rgba(15,23,42,0.22)_45%,transparent_75%)] blur-[3px] sm:blur-[5px]" />
                  {/* Diffused wider ambient floor shadow */}
                  <div className="w-[110%] -ml-[5%] h-full -mt-2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(241,90,36,0.14)_0%,rgba(15,23,42,0.09)_50%,transparent_75%)] blur-[6px] sm:blur-[10px]" />
                </div>

              </div>

              {/* Hotspot Pulse Badge */}
              {prod.hotspotLabel && (
                <div
                  style={prod.hotspotStyle}
                  className="absolute hidden xs:flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 sm:px-2.5 py-0.5 rounded-full border border-black/10 shadow-md text-[#0E1117] transition-all duration-200 group-hover:border-[#F15A24]/40 group-hover:-translate-y-0.5"
                >
                  <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full animate-ping" />
                  <span className="font-mono text-[0.55rem] sm:text-[0.6rem] font-semibold whitespace-nowrap">
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
            <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full" />
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

