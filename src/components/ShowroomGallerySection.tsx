import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2,
  Cpu,
  Monitor,
  HardDrive
} from 'lucide-react';

export interface GallerySlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  specs: string[];
  accentColor?: string;
  category: string;
}

interface ShowroomGallerySectionProps {
  onOpenEnquiry?: (productName?: string) => void;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'custom-rigs',
    category: 'CUSTOM WORKSTATIONS',
    tag: 'FLAGSHIP RIG ARCHITECTURE',
    title: 'Custom High-End Rigs & Creator Workstations',
    subtitle: 'Hand-crafted precision assemblies built with Intel Core i9 / AMD Ryzen 9, custom liquid cooling loops, and ultra-quiet airflow dynamics.',
    image: '/assets/special_offer_1.png',
    specs: ['Intel Core i9 14th Gen', 'RTX 4080 / 4090 Super', '64GB DDR5 RGB RAM', '3-Year On-Site Warranty'],
    accentColor: '#F15A24'
  },
  {
    id: 'ultrawide-display',
    category: 'CREATOR DISPLAYS',
    tag: 'STUDIO COLOR ACCURACY',
    title: '34" Curved 4K HDR Ultra-Wide Workflow Display',
    subtitle: 'Immersive panoramic canvas featuring 99% DCI-P3 wide color gamut, 10-bit color depth, and anti-glare IPS black panel technology.',
    image: '/assets/pro_monitor.webp',
    specs: ['4K UHD Curved Panel', '10-Bit Studio Color', '144Hz Refresh Rate', 'Thunderbolt 4 / Type-C'],
    accentColor: '#0284C7'
  },
  {
    id: 'creator-ecosystem',
    category: 'STUDIO GEAR',
    tag: 'COMPLETE COMPUTING ECOSYSTEM',
    title: 'Ultra Pro Computing & Gaming Showcase',
    subtitle: 'From elite esports peripherals to heavy-duty multi-monitor creator suites, discover top-tier computing setups tuned for maximum productivity.',
    image: '/assets/special_offer_2.png',
    specs: ['Zero-Lag Latency', 'Acoustic Sound Treatment', 'Ergonomic Desk Fit', 'Instant Showroom Demo'],
    accentColor: '#D97706'
  },
  {
    id: 'rtx-gpu',
    category: 'GRAPHICS & AI',
    tag: 'EXTREME RAY TRACING',
    title: 'GeForce RTX 4080 Super 16GB Triple-Fan Edition',
    subtitle: 'Powerhouse graphics acceleration engineered for 4K ray-traced gaming, 3D Blender rendering, and local AI model execution.',
    image: '/assets/gpu_card.webp',
    specs: ['16GB GDDR6X VRAM', 'DLSS 3.5 Frame Gen', 'IceStorm 2.0 Cooling', 'PCIe 4.0 Super-Fast'],
    accentColor: '#059669'
  },
  {
    id: 'z790-board',
    category: 'MOTHERBOARDS',
    tag: 'EXTREME VRM THERMALS',
    title: 'Z790 PCIe 5.0 Extreme Workstation Motherboard',
    subtitle: 'Military-grade power stages, quad Gen5 M.2 NVMe thermal heatsinks, and ultra-high frequency DDR5 XMP 3.0 memory overclocking.',
    image: '/assets/motherboard.webp',
    specs: ['20+1 Power Stages', 'PCIe 5.0 x16 Slot', 'WiFi 7 & 2.5G LAN', 'Reinforced Metal Armor'],
    accentColor: '#7C3AED'
  },
  {
    id: 'mech-keyboard',
    category: 'PERIPHERALS',
    tag: 'CNC ALUMINUM CRAFTSMANSHIP',
    title: 'AeroCNC Solid Aluminum Mechanical Keyboard',
    subtitle: 'CNC-machined anodized aluminum chassis with custom factory-lubed mechanical switches, hot-swappable sockets, and acoustic foam dampening.',
    image: '/assets/mech_keyboard.webp',
    specs: ['Hot-Swappable PCB', 'Per-Key RGB Matrix', 'Gasket Mount Feel', 'Detachable Aviator Cable'],
    accentColor: '#DB2777'
  }
];

export const ShowroomGallerySection: React.FC<ShowroomGallerySectionProps> = ({ onOpenEnquiry }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['ALL', ...Array.from(new Set(GALLERY_SLIDES.map(s => s.category)))];

  const filteredSlides = activeCategory === 'ALL' 
    ? GALLERY_SLIDES 
    : GALLERY_SLIDES.filter(s => s.category === activeCategory);

  const currentSlide = filteredSlides[currentIndex] || filteredSlides[0] || GALLERY_SLIDES[0];

  // Auto-play timer (5.5 seconds per slide)
  useEffect(() => {
    if (isPaused || filteredSlides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredSlides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, filteredSlides.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredSlides.length);
  };

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <section
      id="gallery"
      className="relative bg-[#FAFBFD] text-[#0E1117] py-10 sm:py-14 md:py-16 overflow-hidden border-t border-black/[0.06] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Subtle Ambient Glows & Accents */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] blur-[120px] opacity-10 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: currentSlide.accentColor || '#F15A24' }}
        />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[250px] bg-gradient-to-r from-amber-400/5 to-orange-500/5 blur-3xl" />

        {/* Minimal Precision Corner Cross Accents */}
        <div className="absolute top-6 left-6 sm:left-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13V1H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="1" r="2" fill="#F59E0B" />
          </svg>
        </div>
        <div className="absolute top-6 right-6 sm:right-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 13V1H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="1" r="2" fill="#F15A24" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Header & Filter Badges */}
        <div className="flex flex-col items-center justify-center text-center mb-7 sm:mb-9">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 bg-orange-50/90 px-3.5 py-1 rounded-full border border-orange-200/80 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F15A24] animate-bounce" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F15A24] uppercase">
              SHOWROOM SHOWCASE &amp; HARDWARE GALLERY
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,2.8vw,2.3rem)] text-[#0E1117] tracking-tight leading-tight">
            Experience The Craft of{' '}
            <span className="text-[#F15A24] font-black">
              Next-Gen Computing.
            </span>
          </h2>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-[0.68rem] sm:text-[0.72rem] font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#EA580C] text-white border-[#F15A24] shadow-orange-cta'
                      : 'bg-white hover:bg-slate-50 text-[#4A5364] hover:text-[#0E1117] border-black/[0.08] shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main Featured Slider Stage (Light Theme) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-3xl border border-black/[0.08] shadow-[0_16px_45px_rgba(15,23,42,0.06)] overflow-hidden transition-all duration-300 group"
        >
          {/* Top Progress Accent Bar */}
          <div className="h-1.5 w-full bg-slate-100 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24] transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px] sm:min-h-[460px]">
            
            {/* Left Side: Product Details & Specs (5 Cols on LG) */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-9 flex flex-col justify-between z-20 border-b lg:border-b-0 lg:border-r border-black/[0.06] bg-[#FAFBFD]">
              <div>
                {/* Top Badge & Slide Index */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span 
                    className="font-mono text-[0.62rem] sm:text-[0.66rem] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase border shadow-2xs"
                    style={{
                      backgroundColor: `${currentSlide.accentColor || '#F15A24'}12`,
                      color: currentSlide.accentColor || '#F15A24',
                      borderColor: `${currentSlide.accentColor || '#F15A24'}35`
                    }}
                  >
                    {currentSlide.tag}
                  </span>

                  <span className="font-mono text-[0.70rem] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-black/10 shadow-2xs">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filteredSlides.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-[1.25rem] sm:text-[1.5rem] md:text-[1.65rem] text-[#0E1117] leading-tight tracking-tight mb-2">
                  {currentSlide.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-[0.82rem] sm:text-[0.88rem] text-[#4A5364] leading-relaxed font-normal mb-5">
                  {currentSlide.subtitle}
                </p>

                {/* Hardware Spec Tags */}
                <div className="space-y-2 mb-5">
                  <div className="font-mono text-[0.62rem] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Zap size={12} className="text-[#F15A24]" />
                    <span>KEY HIGHLIGHTS &amp; SPECIFICATIONS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentSlide.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 bg-white border border-black/[0.06] hover:border-black/15 rounded-xl px-3 py-2 text-[0.76rem] sm:text-[0.80rem] text-[#1E293B] shadow-2xs transition-colors"
                      >
                        <CheckCircle2 size={13} className="text-[#F15A24] flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Inquire CTA */}
              <div className="pt-3.5 border-t border-black/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry(currentSlide.title)}
                  className="py-3 px-5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-[#0E1117] font-heading font-bold text-[0.86rem] rounded-xl flex items-center justify-center gap-2 shadow-yellow-cta transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>Inquire Availability &amp; Price</span>
                  <ArrowUpRight size={15} />
                </button>

                <div className="text-center sm:text-left text-[0.72rem] text-slate-500 font-mono">
                  Verified In Stock @ Eluru
                </div>
              </div>
            </div>

            {/* Right Side: High-Impact Visual Showcase Stage (7 Cols on LG) */}
            <div className="lg:col-span-7 relative p-4 sm:p-8 md:p-10 flex items-center justify-center overflow-hidden bg-white">
              
              {/* Radial Backdrop Glow */}
              <div 
                className="absolute inset-0 opacity-40 blur-2xl pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${currentSlide.accentColor || '#F15A24'}15 0%, transparent 70%)`
                }}
              />

              {/* Main Image with Zoom & Floating Shadow Animation */}
              <div className="relative z-10 w-full h-[250px] sm:h-[330px] md:h-[380px] flex items-center justify-center p-2">
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="max-h-full max-w-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(15,23,42,0.12)] rounded-2xl animate-in fade-in zoom-in-95 duration-400 transition-all select-none"
                  loading="eager"
                />
              </div>

              {/* Navigation Left Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-amber-400 text-[#0E1117] border border-black/10 hover:border-amber-400 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Navigation Right Arrow */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-amber-400 text-[#0E1117] border border-black/10 hover:border-amber-400 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

          {/* 4. Interactive Filmstrip Thumbnails Navigation (Bottom Rail) */}
          <div className="p-3 sm:p-4 bg-[#FAFBFD] border-t border-black/[0.06] flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3 flex-grow overflow-x-auto py-1 no-scrollbar">
              {filteredSlides.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white p-1 flex items-center justify-center shadow-2xs ${
                      isSelected
                        ? 'border-[#F15A24] shadow-[0_0_12px_rgba(241,90,36,0.35)] scale-105'
                        : 'border-black/10 opacity-70 hover:opacity-100 hover:border-black/25'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#F15A24]/10 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Slide Status Indicator */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0 font-mono text-[0.68rem] text-slate-500 pl-3 border-l border-black/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Showroom Inventory</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default ShowroomGallerySection;
