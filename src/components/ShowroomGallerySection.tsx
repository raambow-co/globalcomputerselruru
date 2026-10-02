import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Maximize2, 
  Cpu, 
  Monitor, 
  Zap, 
  CheckCircle2 
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
    accentColor: '#3B82F6'
  },
  {
    id: 'creator-ecosystem',
    category: 'STUDIO GEAR',
    tag: 'COMPLETE COMPUTING ECOSYSTEM',
    title: 'Ultra Pro Computing & Gaming Showcase',
    subtitle: 'From elite esports peripherals to heavy-duty multi-monitor creator suites, discover top-tier computing setups tuned for maximum productivity.',
    image: '/assets/special_offer_2.png',
    specs: ['Zero-Lag Latency', 'Acoustic Sound Treatment', 'Ergonomic Desk Fit', 'Instant Showroom Demo'],
    accentColor: '#F59E0B'
  },
  {
    id: 'rtx-gpu',
    category: 'GRAPHICS & AI',
    tag: 'EXTREME RAY TRACING',
    title: 'GeForce RTX 4080 Super 16GB Triple-Fan Edition',
    subtitle: 'Powerhouse graphics acceleration engineered for 4K ray-traced gaming, 3D Blender rendering, and local AI model execution.',
    image: '/assets/gpu_card.webp',
    specs: ['16GB GDDR6X VRAM', 'DLSS 3.5 Frame Gen', 'IceStorm 2.0 Cooling', 'PCIe 4.0 Super-Fast'],
    accentColor: '#10B981'
  },
  {
    id: 'z790-board',
    category: 'MOTHERBOARDS',
    tag: 'EXTREME VRM THERMALS',
    title: 'Z790 PCIe 5.0 Extreme Workstation Motherboard',
    subtitle: 'Military-grade power stages, quad Gen5 M.2 NVMe thermal heatsinks, and ultra-high frequency DDR5 XMP 3.0 memory overclocking.',
    image: '/assets/motherboard.webp',
    specs: ['20+1 Power Stages', 'PCIe 5.0 x16 Slot', 'WiFi 7 & 2.5G LAN', 'Reinforced Metal Armor'],
    accentColor: '#8B5CF6'
  },
  {
    id: 'mech-keyboard',
    category: 'PERIPHERALS',
    tag: 'CNC ALUMINUM CRAFTSMANSHIP',
    title: 'AeroCNC Solid Aluminum Mechanical Keyboard',
    subtitle: 'CNC-machined anodized aluminum chassis with custom factory-lubed mechanical switches, hot-swappable sockets, and acoustic foam dampening.',
    image: '/assets/mech_keyboard.webp',
    specs: ['Hot-Swappable PCB', 'Per-Key RGB Matrix', 'Gasket Mount Feel', 'Detachable Aviator Cable'],
    accentColor: '#EC4899'
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
      className="relative bg-[#0E1117] text-white py-12 sm:py-16 md:py-20 overflow-hidden selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Dynamic Ambient Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Dynamic ambient color matching active slide */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] blur-[140px] opacity-25 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: currentSlide.accentColor || '#F15A24' }}
        />
        
        {/* Subtle geometric dot grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        {/* Diagonal high-tech line accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Header & Filter Badges */}
        <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-md px-4 py-1 rounded-full border border-white/15 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F15A24] animate-pulse" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-orange-400 uppercase">
              SHOWROOM SHOWCASE &amp; HARDWARE GALLERY
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-heading font-extrabold text-[clamp(1.75rem,3.2vw,2.6rem)] text-white tracking-tight leading-tight mb-2.5">
            Experience The Craft of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24] font-black">
              Next-Gen Computing.
            </span>
          </h2>

          <p className="text-[0.84rem] sm:text-[0.94rem] text-slate-300 max-w-2xl font-normal leading-relaxed">
            Explore authentic workstation assemblies, certified high-speed hardware, and flagship peripherals available for live demo at our Powerpet, Eluru showroom.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-[0.68rem] sm:text-[0.72rem] font-bold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#D94814] text-white border-[#F15A24] shadow-[0_4px_16px_rgba(241,90,36,0.35)]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main Cinematic Slideshow Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 group"
        >
          {/* Top Progress Accent Bar (Dynamic width based on active index) */}
          <div className="h-1 w-full bg-white/10 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24] transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px] sm:min-h-[480px] md:min-h-[520px]">
            
            {/* Left Side: Product Details & Live Spec Badges (5 Cols on LG) */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-20 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/25">
              <div>
                {/* Top Badge & Slide Index */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span 
                    className="font-mono text-[0.62rem] sm:text-[0.66rem] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase border shadow-2xs"
                    style={{
                      backgroundColor: `${currentSlide.accentColor || '#F15A24'}20`,
                      color: currentSlide.accentColor || '#F15A24',
                      borderColor: `${currentSlide.accentColor || '#F15A24'}45`
                    }}
                  >
                    {currentSlide.tag}
                  </span>

                  <span className="font-mono text-[0.70rem] font-semibold text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filteredSlides.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-[1.35rem] sm:text-[1.6rem] md:text-[1.75rem] text-white leading-tight tracking-tight mb-2.5">
                  {currentSlide.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-[0.82rem] sm:text-[0.88rem] text-slate-300 leading-relaxed font-normal mb-6">
                  {currentSlide.subtitle}
                </p>

                {/* Hardware Spec Tags */}
                <div className="space-y-2 mb-6">
                  <div className="font-mono text-[0.62rem] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Zap size={12} className="text-amber-400" />
                    <span>KEY HIGHLIGHTS &amp; CERTIFICATION</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentSlide.specs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-xl px-3 py-2 text-[0.76rem] sm:text-[0.80rem] text-slate-200 transition-colors"
                      >
                        <CheckCircle2 size={13} className="text-[#F15A24] flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Inquire CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry(currentSlide.title)}
                  className="py-3 px-5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-heading font-bold text-[0.86rem] rounded-xl flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.45)] transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>Inquire Availability &amp; Price</span>
                  <ArrowUpRight size={15} />
                </button>

                <div className="text-center sm:text-left text-[0.72rem] text-slate-400 font-mono">
                  Verified In Stock @ Eluru
                </div>
              </div>
            </div>

            {/* Right Side: High-Impact Visual Showcase Stage (7 Cols on LG) */}
            <div className="lg:col-span-7 relative p-4 sm:p-8 md:p-10 flex items-center justify-center overflow-hidden bg-radial-at-c from-white/[0.04] to-transparent">
              
              {/* Radial Backdrop Glow */}
              <div 
                className="absolute inset-0 opacity-40 blur-2xl pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${currentSlide.accentColor || '#F15A24'}25 0%, transparent 70%)`
                }}
              />

              {/* Main Image with Zoom & Floating Shadow Animation */}
              <div className="relative z-10 w-full h-[260px] sm:h-[340px] md:h-[400px] flex items-center justify-center p-2">
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="max-h-full max-w-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] rounded-2xl animate-in fade-in zoom-in-95 duration-400 transition-all select-none"
                  loading="eager"
                />
              </div>

              {/* Navigation Left Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#F15A24] text-white border border-white/20 hover:border-[#F15A24] backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Navigation Right Arrow */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#F15A24] text-white border border-white/20 hover:border-[#F15A24] backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

          {/* 4. Interactive Filmstrip Thumbnails Navigation (Bottom Rail) */}
          <div className="p-3 sm:p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3 flex-grow overflow-x-auto py-1 no-scrollbar">
              {filteredSlides.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white/5 p-1 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#F15A24] shadow-[0_0_12px_rgba(241,90,36,0.6)] scale-105'
                        : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
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
            <div className="hidden md:flex items-center gap-2 flex-shrink-0 font-mono text-[0.68rem] text-slate-400 pl-3 border-l border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Showroom Inventory</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default ShowroomGallerySection;
