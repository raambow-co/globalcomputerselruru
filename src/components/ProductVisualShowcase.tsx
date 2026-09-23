import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, Eye, Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface ProductVisualShowcaseProps {
  onOpenAvailability: (productName?: string) => void;
}

interface ShowcaseProduct {
  id: string;
  category: string;
  categorySlug: 'all' | 'printers' | 'monitors' | 'motherboards' | 'gpus' | 'ram' | 'keyboards';
  name: string;
  editorialTitle: string;
  tagline: string;
  description: string;
  specs: string[];
  image: string;
  imageAlt: string;
  positionDesktop: string;
  depth: number;
  rotation: string;
  annotationLabel: string;
  annotationValue: string;
  markerCoordinate: string;
  zIndex: number;
  shadowClass: string;
}

export const ProductVisualShowcase: React.FC<ProductVisualShowcaseProps> = ({
  onOpenAvailability,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProductId, setActiveProductId] = useState<string | null>('epson-printer');
  const [hoveredProduct, setHoveredProduct] = useState<ShowcaseProduct | null>(null);

  // High-performance physics state for subtle smooth parallax
  const parallaxState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  const layerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const products: ShowcaseProduct[] = [
    // 1. Center / Foreground Hero: Epson EcoTank Pro Series Printer
    {
      id: 'epson-printer',
      category: 'Business Printing',
      categorySlug: 'printers',
      name: 'Epson EcoTank Pro Series',
      editorialTitle: 'EPSON PRINTERS',
      tagline: 'Reliable printing solutions for modern workspaces.',
      description:
        'Engineered with PrecisionCore Heat-Free technology for high-volume enterprise efficiency, ultra-low running costs, and crisp laser-quality output.',
      specs: ['PrecisionCore Heat-Free', 'High-Yield Ink Reservoirs', 'Enterprise Fleet Ready'],
      image: '/assets/epson_printer.png',
      imageAlt: 'Epson EcoTank Pro High-Efficiency Business Printer',
      positionDesktop: 'top-[36%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-[clamp(280px,32vw,480px)]',
      depth: 0.08,
      rotation: 'rotate-1',
      annotationLabel: 'PRECISION',
      annotationValue: 'Heat-Free 4800dpi',
      markerCoordinate: '01 / PRT',
      zIndex: 30,
      shadowClass: 'drop-shadow-[0_28px_46px_rgba(15,23,42,0.16)]',
    },
    // 2. Behind Center at Perspective: UltraVision 4K Studio Display
    {
      id: 'pro-monitor',
      category: 'Professional Displays',
      categorySlug: 'monitors',
      name: 'UltraVision 4K Studio Display',
      editorialTitle: 'PROFESSIONAL MONITORS',
      tagline: 'Clear, reliable displays for work and productivity.',
      description:
        'Frameless curved IPS architecture with factory-calibrated color accuracy, eye-comfort certified backlighting, and USB-C single-cable power delivery.',
      specs: ['4K UHD IPS Curved', '99% DCI-P3 Color Accuracy', 'Hardware Calibrated'],
      image: '/assets/pro_monitor.png',
      imageAlt: 'UltraVision 4K Frameless Studio Display',
      positionDesktop: 'top-[16%] left-[58%] -translate-x-1/2 -translate-y-1/2 w-[clamp(260px,30vw,460px)]',
      depth: 0.04,
      rotation: '-rotate-2',
      annotationLabel: 'CLARITY',
      annotationValue: '99% DCI-P3 Delta E < 1',
      markerCoordinate: '02 / DISP',
      zIndex: 20,
      shadowClass: 'drop-shadow-[0_24px_40px_rgba(15,23,42,0.13)]',
    },
    // 3. Right Foreground / Diagonal Edge: AeroCNC Mechanical Keyboard
    {
      id: 'mech-keyboard',
      category: 'Precision Peripherals',
      categorySlug: 'keyboards',
      name: 'AeroCNC Mechanical Keyboard',
      editorialTitle: 'PRECISION PERIPHERALS',
      tagline: 'Tactile accuracy and durable industrial craftsmanship.',
      description:
        'CNC-milled solid anodized aluminum chassis with custom lubricated mechanical switches, PBT double-shot keycaps, and ergonomic typing pitch.',
      specs: ['Anodized Solid Aluminum', 'Hot-Swappable Switches', 'Acoustic Sound Dampening'],
      image: '/assets/mech_keyboard.png',
      imageAlt: 'AeroCNC Custom Aluminum Mechanical Keyboard',
      positionDesktop: 'top-[68%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-[clamp(220px,24vw,360px)]',
      depth: 0.09,
      rotation: 'rotate-4',
      annotationLabel: 'TACTILITY',
      annotationValue: 'CNC Milled Chassis',
      markerCoordinate: '03 / INP',
      zIndex: 35,
      shadowClass: 'drop-shadow-[0_20px_34px_rgba(15,23,42,0.14)]',
    },
    // 4. Left Mid-depth: Z790 Workstation Motherboard
    {
      id: 'z790-motherboard',
      category: 'Workstation Architecture',
      categorySlug: 'motherboards',
      name: 'Z790 Workstation Motherboard',
      editorialTitle: 'WORKSTATION PLATFORMS',
      tagline: 'Enterprise-grade thermal engineering and stability.',
      description:
        'Multi-layer server-grade PCB with fortified PCIe 5.0 lanes, massive metallic VRM heatsinks, and dual 2.5G LAN for uninterrupted compute workflows.',
      specs: ['PCIe 5.0 x16 Reinforced', '18+1+1 Digital Power Phase', 'Multi M.2 Thermal Shields'],
      image: '/assets/motherboard.png',
      imageAlt: 'Z790 Enterprise Workstation Motherboard',
      positionDesktop: 'top-[22%] left-[14%] -translate-x-1/2 -translate-y-1/2 w-[clamp(190px,21vw,320px)]',
      depth: 0.03,
      rotation: '-rotate-6',
      annotationLabel: 'RELIABILITY',
      annotationValue: 'Server-Grade VRM',
      markerCoordinate: '04 / MB',
      zIndex: 15,
      shadowClass: 'drop-shadow-[0_18px_30px_rgba(15,23,42,0.1)]',
    },
    // 5. Left Lower Mid-depth: Pro Graphics Card GPU
    {
      id: 'pro-gpu',
      category: 'Graphics & Compute',
      categorySlug: 'gpus',
      name: 'Apex RTX Studio Graphics Card',
      editorialTitle: 'GRAPHICS ACCELERATORS',
      tagline: 'Dedicated visual computing for creator and CAD workloads.',
      description:
        'Triple axial-tech cooling system with vapor chamber base, dedicated AI Tensor cores, and high-bandwidth VRAM for real-time 3D rendering.',
      specs: ['16GB High-Speed GDDR6X', 'Vapor Chamber Cooling', 'Dedicated Hardware Ray Tracing'],
      image: '/assets/gpu_card.png',
      imageAlt: 'Apex RTX Studio Dedicated Graphics Card',
      positionDesktop: 'top-[64%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[clamp(190px,22vw,330px)]',
      depth: 0.05,
      rotation: 'rotate-3',
      annotationLabel: 'PERFORMANCE',
      annotationValue: 'Tensor Compute 85 TFLOPS',
      markerCoordinate: '05 / GPU',
      zIndex: 22,
      shadowClass: 'drop-shadow-[0_22px_36px_rgba(15,23,42,0.13)]',
    },
    // 6. Right Top Mid-depth: High-Speed DDR5 RAM Modules
    {
      id: 'ddr5-ram',
      category: 'Performance Memory',
      categorySlug: 'ram',
      name: 'Vanguard DDR5 Memory Kit',
      editorialTitle: 'HIGH-SPEED MEMORY',
      tagline: 'Ultra-low latency modules engineered for zero bottleneck performance.',
      description:
        'Precision hand-sorted memory ICs paired with sleek brushed aluminum thermal spreaders and on-die ECC error correction for maximum workstation uptime.',
      specs: ['6400MHz Low Latency', 'On-Die ECC Protection', 'Brushed Aluminum Heatspreader'],
      image: '/assets/ram_modules.png',
      imageAlt: 'Vanguard High-Performance DDR5 Workstation RAM Kit',
      positionDesktop: 'top-[22%] left-[84%] -translate-x-1/2 -translate-y-1/2 w-[clamp(180px,20vw,300px)]',
      depth: 0.05,
      rotation: '-rotate-8',
      annotationLabel: 'EFFICIENCY',
      annotationValue: 'DDR5 6400 CL32',
      markerCoordinate: '06 / MEM',
      zIndex: 18,
      shadowClass: 'drop-shadow-[0_16px_28px_rgba(15,23,42,0.11)]',
    },
  ];

  // Selected spotlighted product
  const currentFocusedProduct =
    hoveredProduct ||
    products.find((p) => p.id === activeProductId) ||
    products[0];

  useEffect(() => {
    // 1. Intersection Observer to preserve frame rate when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        parallaxState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      parallaxState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      parallaxState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    // 3. Touch Move Listener for Mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        const touch = e.touches[0];
        parallaxState.current.targetX = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
        parallaxState.current.targetY = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 4. Smooth Animation Lerp Physics Loop
    let animationFrameId: number;

    const renderLoop = (time: number) => {
      if (parallaxState.current.isVisible) {
        const dt = Math.min((time - parallaxState.current.lastTime) / 1000, 0.1);
        parallaxState.current.lastTime = time;

        // Subtle ambient natural float drift
        const ambientX = Math.sin(time * 0.0006) * 0.03;
        const ambientY = Math.cos(time * 0.0005) * 0.03;

        const targetX = parallaxState.current.targetX + ambientX;
        const targetY = parallaxState.current.targetY + ambientY;

        const lerpFactor = 1 - Math.pow(0.002, dt);
        parallaxState.current.currentX +=
          (targetX - parallaxState.current.currentX) * lerpFactor;
        parallaxState.current.currentY +=
          (targetY - parallaxState.current.currentY) * lerpFactor;

        const cx = parallaxState.current.currentX;
        const cy = parallaxState.current.currentY;

        products.forEach((prod) => {
          const el = layerRefs.current[prod.id];
          if (!el) return;

          const tx = (cx * prod.depth * 240).toFixed(2);
          const ty = (cy * prod.depth * 150).toFixed(2);
          const rx = (-cy * prod.depth * 8).toFixed(2);
          const ry = (cx * prod.depth * 8).toFixed(2);

          el.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Category filter triggers
  const categories = [
    { id: 'all', label: 'All Showcase' },
    { id: 'printers', label: 'Epson Printers' },
    { id: 'monitors', label: 'Pro Monitors' },
    { id: 'keyboards', label: 'Peripherals' },
    { id: 'motherboards', label: 'Motherboards' },
    { id: 'gpus', label: 'Graphics / GPUs' },
    { id: 'ram', label: 'Memory / RAM' },
  ];

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setActiveProductId('epson-printer');
    } else {
      const match = products.find((p) => p.categorySlug === catId);
      if (match) {
        setActiveProductId(match.id);
      }
    }
  };

  return (
    <section
      id="technology-showcase"
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-24 sm:py-32 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Lighting & Subtle Architectural Depth Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Soft Studio Directional Overhead Keylight (Pure White Center, Gentle Falloff) */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(50%_50%_at_50%_40%,rgba(255,255,255,1)_0%,rgba(247,249,252,0.85)_60%,rgba(255,255,255,0)_100%)]" />

        {/* Studio Floor Soft Contact Horizon Shadow */}
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-[1300px] h-[340px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(15,23,42,0.025)_0%,rgba(15,23,42,0)_70%)]" />

        {/* Architectural Geometry Linework Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-65"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="studioGrid"
              width="160"
              height="160"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 160 0 L 0 0 0 160"
                fill="none"
                stroke="rgba(15, 23, 42, 0.025)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#studioGrid)" />

          {/* Large Minimal Studio Horizon Circles */}
          <circle
            cx="50%"
            cy="52%"
            r="440"
            fill="none"
            stroke="rgba(241, 90, 36, 0.04)"
            strokeWidth="1.2"
            strokeDasharray="10 12"
          />
          <circle
            cx="50%"
            cy="52%"
            r="680"
            fill="none"
            stroke="rgba(15, 23, 42, 0.02)"
            strokeWidth="1"
          />
        </svg>

        {/* Fine Technical Spatial Corner Markers */}
        <div className="absolute top-12 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">EXP.INSIDE_TECH</span>
        </div>
        <div className="absolute top-12 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">STUDIO.3D_WHITE</span>
        </div>
        <div className="absolute bottom-10 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">HARDWARE.VERIFIED</span>
        </div>
        <div className="absolute bottom-10 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">ELURU.HEADQUARTERS</span>
        </div>
      </div>

      {/* 2. Compact Editorial Introduction */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-6 sm:px-8 text-center mb-8 sm:mb-12">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-5 transition-transform duration-200 hover:scale-[1.02]">
          <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
          <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
            INSIDE THE TECHNOLOGY
          </span>
          <span className="w-1 h-1 bg-black/20 rounded-full" />
          <span className="font-mono text-[0.66rem] text-[#64748B] tracking-wider uppercase">
            STUDIO SHOWCASE
          </span>
        </div>

        {/* Section Headline */}
        <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4.5vw,3.65rem)] text-[#0E1117] leading-[1.08] tracking-tight mb-4 select-none">
          Built Around{' '}
          <span className="text-[#F15A24] relative inline-block">
            Better Technology.
            <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
          </span>
        </h2>

        {/* Compact Supporting Editorial Lead */}
        <p className="text-[0.98rem] sm:text-[1.12rem] text-[#4A5364] leading-relaxed max-w-2xl mx-auto font-normal">
          From everyday computing to professional business environments, we bring together reliable hardware and practical technology solutions.
        </p>

        {/* Interactive Category Filter Pills */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-[0.74rem] font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0E1117] text-white shadow-sm border border-[#0E1117]'
                    : 'bg-white/80 hover:bg-white text-[#4A5364] hover:text-[#0E1117] border border-black/[0.08] hover:border-black/20 shadow-2xs'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Immersive 3D Technology Gallery Viewport (Desktop Full Interactive Composition) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[580px] sm:min-h-[720px] lg:min-h-[820px] px-4 my-2 hidden md:block">
        
        {/* Editorial Minimal Background Technical Annotations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle Thin Red Accent Coordinate Lines */}
          <div className="absolute top-[28%] left-[26%] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
            <div className="w-16 h-[1px] bg-[#F15A24]/30" />
            <span className="font-mono text-[0.62rem] font-bold text-[#F15A24] tracking-widest uppercase">
              PRECISION
            </span>
          </div>

          <div className="absolute top-[18%] right-[22%] flex items-center gap-2">
            <span className="font-mono text-[0.62rem] font-bold text-[#64748B] tracking-widest uppercase">
              PERFORMANCE
            </span>
            <div className="w-16 h-[1px] bg-black/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E1117]/40" />
          </div>

          <div className="absolute bottom-[24%] left-[20%] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]/60" />
            <div className="w-20 h-[1px] bg-[#F15A24]/20" />
            <span className="font-mono text-[0.62rem] font-bold text-[#F15A24] tracking-widest uppercase">
              RELIABILITY
            </span>
          </div>

          <div className="absolute bottom-[22%] right-[18%] flex items-center gap-2">
            <span className="font-mono text-[0.62rem] font-bold text-[#64748B] tracking-widest uppercase">
              ENTERPRISE READY
            </span>
            <div className="w-12 h-[1px] bg-black/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* 3D Hardware Objects Spatial Layer */}
        <div className="absolute inset-0 preserve-3d perspective-1200">
          {products.map((product) => {
            const isDimmed =
              activeCategory !== 'all' && product.categorySlug !== activeCategory;
            const isFocused =
              activeProductId === product.id || hoveredProduct?.id === product.id;

            return (
              <div
                key={product.id}
                ref={(el) => {
                  layerRefs.current[product.id] = el;
                }}
                onClick={() => {
                  setActiveProductId(product.id);
                  onOpenAvailability(product.name);
                }}
                onMouseEnter={() => {
                  setHoveredProduct(product);
                  setActiveProductId(product.id);
                }}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ zIndex: isFocused ? 45 : product.zIndex }}
                className={`absolute cursor-pointer transition-all duration-500 ease-out will-change-transform transform-gpu ${
                  product.positionDesktop
                } ${
                  isDimmed
                    ? 'opacity-25 grayscale scale-95 pointer-events-none'
                    : 'opacity-100'
                } ${isFocused ? 'scale-[1.04]' : 'scale-100 hover:scale-[1.02]'}`}
              >
                {/* 3D Hardware Image with Multi-Layer Drop Shadow */}
                <div className={`relative transition-transform duration-300 ${product.rotation}`}>
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className={`w-full h-auto object-contain select-none pointer-events-auto ${product.shadowClass} transition-all duration-300`}
                    loading="eager"
                  />

                  {/* Micro Editorial Marker Coordinate */}
                  <div className="absolute -top-3 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded border border-black/10 shadow-2xs">
                    <span className="font-mono text-[0.58rem] font-bold text-[#0E1117] tracking-wider">
                      {product.markerCoordinate}
                    </span>
                  </div>

                  {/* Red Pulse Hotspot Dot */}
                  <div className="absolute bottom-4 right-4 flex items-center justify-center">
                    <span className="absolute w-4 h-4 bg-[#F15A24]/20 rounded-full animate-ping" />
                    <span className="relative w-2 h-2 bg-[#F15A24] rounded-full shadow-xs" />
                  </div>
                </div>

                {/* Subtle Floating Editorial Annotation (Active on Hover/Selection) */}
                {isFocused && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-full w-max max-w-[280px] bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-black/[0.08] shadow-[0_16px_36px_rgba(15,23,42,0.12)] z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[0.62rem] font-bold tracking-widest text-[#F15A24] uppercase">
                        {product.editorialTitle}
                      </span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>

                    <p className="text-[0.78rem] text-[#333D4B] font-medium leading-snug mb-2.5">
                      {product.tagline}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-black/[0.06]">
                      <span className="font-mono text-[0.68rem] font-bold text-[#F15A24] flex items-center gap-1 group-hover:underline">
                        <span>Check Availability</span>
                        <ArrowRight size={12} />
                      </span>
                      <span className="font-mono text-[0.58rem] text-[#828E9E]">
                        {product.annotationValue}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Editorial Inspector Dock (Bottom Center Overview Card) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[780px] px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-black/[0.08] shadow-[0_20px_50px_rgba(15,23,42,0.08)] flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-300 hover:border-black/15">
            
            {/* Left Hardware Info */}
            <div className="flex items-center gap-4 text-left w-full sm:w-auto">
              <div className="w-14 h-14 rounded-xl bg-[#F8F9FA] border border-black/[0.06] p-1.5 flex items-center justify-center flex-shrink-0">
                <img
                  src={currentFocusedProduct.image}
                  alt={currentFocusedProduct.name}
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
                  <span className="font-mono text-[0.68rem] font-bold text-[#F15A24] tracking-wider uppercase">
                    {currentFocusedProduct.category}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-[1.12rem] text-[#0E1117] leading-tight mt-0.5">
                  {currentFocusedProduct.name}
                </h4>
                <p className="text-[0.8rem] text-[#64748B] mt-0.5 line-clamp-1">
                  {currentFocusedProduct.tagline}
                </p>
              </div>
            </div>

            {/* Right Action Trigger */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onOpenAvailability(currentFocusedProduct.name)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.88rem] rounded-xl flex items-center justify-center gap-2 shadow-orange-cta transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Check Availability</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Mobile & Tablet Vertical Recomposition (Large High-Resolution Cards, Touch Friendly) */}
      <div className="md:hidden px-6 space-y-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onOpenAvailability(prod.name)}
            className="group bg-white rounded-3xl p-6 border border-black/[0.08] shadow-[0_8px_30px_rgba(15,23,42,0.03)] active:scale-[0.99] transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Coordinate & Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
                <span className="font-mono text-[0.7rem] font-bold text-[#F15A24] tracking-widest uppercase">
                  {prod.editorialTitle}
                </span>
              </div>
              <span className="font-mono text-[0.66rem] text-[#9AA5B5] bg-[#F8F9FA] px-2 py-0.5 rounded border border-black/[0.06]">
                {prod.markerCoordinate}
              </span>
            </div>

            {/* Large 3D Hardware Image */}
            <div className="py-6 flex items-center justify-center relative">
              <div className="absolute w-48 h-48 rounded-full bg-[#FFF2EB]/70 pointer-events-none" />
              <img
                src={prod.image}
                alt={prod.imageAlt}
                className="relative z-10 w-full max-w-[260px] h-auto object-contain drop-shadow-[0_20px_32px_rgba(15,23,42,0.12)]"
                loading="lazy"
              />
            </div>

            {/* Product Meta */}
            <div>
              <h3 className="font-heading font-bold text-[1.25rem] text-[#0E1117] mb-1">
                {prod.name}
              </h3>
              <p className="text-[0.88rem] text-[#4A5364] leading-relaxed mb-4">
                {prod.description}
              </p>

              {/* Specs Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {prod.specs.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.64rem] bg-[#F4F6F8] text-[#333D4B] px-2.5 py-1 rounded-md border border-black/[0.04]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
              <span className="font-mono text-[0.74rem] font-bold text-[#F15A24] flex items-center gap-1.5">
                <span>Check Availability</span>
                <ArrowRight size={14} />
              </span>
              <span className="font-mono text-[0.64rem] text-[#828E9E]">
                {prod.annotationValue}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Lower Section Statement & Brand Assurance */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-6 sm:px-8 mt-20 sm:mt-28">
        
        {/* Subtle Horizontal Divider with Centered Brand Knot */}
        <div className="relative flex items-center justify-center mb-16">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />
          <div className="absolute bg-white px-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
            <span className="font-mono text-[0.64rem] font-bold tracking-[0.25em] text-[#828E9E] uppercase">
              GLOBAL COMPUTERS ASSURANCE
            </span>
          </div>
        </div>

        {/* Two-Column Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Statement Typography */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
              <span className="font-mono text-[0.68rem] font-bold text-[#F15A24] tracking-wider uppercase">
                HARDWARE INTEGRITY
              </span>
            </div>
            
            <h3 className="font-heading font-extrabold text-[clamp(1.9rem,3.6vw,3.1rem)] text-[#0E1117] leading-[1.12] tracking-tight mb-5">
              Technology that{' '}
              <span className="text-[#F15A24] relative inline-block">
                works.
                <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
              </span>{' '}
              Solutions that{' '}
              <span className="underline decoration-[#F15A24] decoration-2 underline-offset-4">
                last.
              </span>
            </h3>

            <p className="text-[1.02rem] sm:text-[1.08rem] text-[#4A5364] leading-relaxed max-w-xl font-normal">
              Every system and component in our Eluru showroom undergoes rigorous physical inspection and benchmark testing to ensure dependable performance in corporate offices, educational institutions, and home studios.
            </p>
          </div>

          {/* Three Pillar Specification Badges */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              {
                title: 'BUSINESS READY',
                desc: 'Turnkey enterprise hardware with direct invoice and bulk warranty support.',
                icon: ShieldCheck,
              },
              {
                title: 'PROFESSIONAL HARDWARE',
                desc: '100% genuine components sourced exclusively through authorized OEM channels.',
                icon: Zap,
              },
              {
                title: 'RELIABLE SUPPORT',
                desc: 'Immediate on-site and showroom technical guidance from certified specialists in Eluru.',
                icon: CheckCircle2,
              },
            ].map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-[#FAFBFD] rounded-2xl p-4 sm:p-5 border border-black/[0.06] flex items-start gap-4 transition-all duration-200 hover:bg-white hover:border-[#F15A24]/25 hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center flex-shrink-0 text-[#F15A24] shadow-2xs">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-[0.72rem] font-bold tracking-wider text-[#0E1117] uppercase mb-0.5">
                      {pillar.title}
                    </div>
                    <p className="text-[0.84rem] text-[#64748B] leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Direct Action Row */}
        <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[0.86rem] text-[#64748B]">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Showroom open for direct physical inspection in Eluru</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenAvailability()}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0E1117] hover:bg-black text-white rounded-xl font-semibold text-[0.92rem] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
          >
            <span>Check Full Showroom Availability</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
};
