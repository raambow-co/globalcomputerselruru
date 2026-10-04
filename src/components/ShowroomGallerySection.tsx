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

import { db, collection, onSnapshot } from '../firebase';

export interface GallerySlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  specs: string[];
  accentColor?: string;
  category: string;
  order?: number;
}

interface ShowroomGallerySectionProps {
  onOpenEnquiry?: (productName?: string) => void;
}

export const DEFAULT_GALLERY_SLIDES: GallerySlide[] = [
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
  const [slides, setSlides] = useState<GallerySlide[]>(() => {
    try {
      const saved = localStorage.getItem('gc_gallery_slides_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_GALLERY_SLIDES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time Firestore sync
  useEffect(() => {
    try {
      const unsub = onSnapshot(
        collection(db, 'gallery_slides'),
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteSlides: GallerySlide[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              remoteSlides.push({
                id: docSnap.id,
                tag: data.tag || 'FLAGSHIP HARDWARE',
                title: data.title || 'Showroom Specimen',
                subtitle: data.subtitle || '',
                image: data.image || '/assets/special_offer_1.png',
                specs: Array.isArray(data.specs) ? data.specs : (typeof data.specs === 'string' ? data.specs.split(',').map((s: string) => s.trim()) : []),
                accentColor: data.accentColor || '#F15A24',
                category: data.category || 'WORKSTATIONS',
                order: typeof data.order === 'number' ? data.order : 0
              });
            });
            if (remoteSlides.length > 0) {
              remoteSlides.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
              setSlides(remoteSlides);
              localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(remoteSlides));
            }
          }
        },
        (error) => {
          console.warn('Firestore gallery listener error:', error);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Firestore subscription failed:', e);
    }
  }, []);

  // Listen for local storage cross-tab sync
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('gc_gallery_slides_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setSlides(parsed);
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const categories = ['ALL', ...Array.from(new Set(slides.map(s => s.category || 'GENERAL')))];

  const filteredSlides = activeCategory === 'ALL' 
    ? slides 
    : slides.filter(s => s.category === activeCategory);

  const currentSlide = filteredSlides[currentIndex] || filteredSlides[0] || DEFAULT_GALLERY_SLIDES[0];

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
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Header & Category Filter Badges */}
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 bg-orange-50/90 px-3.5 py-1 rounded-full border border-orange-200/80 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F15A24] animate-bounce" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F15A24] uppercase">
              SHOWROOM SHOWCASE &amp; HARDWARE GALLERY
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,2.8vw,2.4rem)] text-[#0E1117] tracking-tight leading-tight">
            Experience The Craft of{' '}
            <span className="text-[#F15A24] font-black">
              Next-Gen Computing.
            </span>
          </h2>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
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
          )}
        </div>

        {/* 3. Fully-Occupied Cinematic Image Slideshow */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-slate-950 rounded-3xl border border-black/15 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group"
        >
          {/* Top Progress Accent Bar */}
          <div className="h-1.5 w-full bg-black/40 relative overflow-hidden z-30">
            <div 
              className="h-full bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24] transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / filteredSlides.length) * 100}%` }}
            />
          </div>

          {/* Main Full-Image Container */}
          <div className="relative w-full h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px] bg-slate-950 flex items-center justify-center overflow-hidden">
            
            {/* Background Ambient Blur of Slide Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
              style={{ backgroundImage: `url(${currentSlide.image})` }}
            />

            {/* Fully Occupied Image */}
            <img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="relative z-10 w-full h-full object-contain p-2 sm:p-6 animate-in fade-in zoom-in-95 duration-500 select-none"
              loading="eager"
            />

            {/* Top Right Counter Badge */}
            <div className="absolute top-5 right-5 z-30 bg-black/70 backdrop-blur-md text-white font-mono text-[0.70rem] font-bold px-3 py-1 rounded-full border border-white/15 shadow-md">
              <span className="text-amber-400">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/40 mx-1">/</span>
              <span>{String(filteredSlides.length).padStart(2, '0')}</span>
            </div>

            {/* Top Left Category Pill */}
            {currentSlide.category && (
              <div className="absolute top-5 left-5 z-30 bg-black/70 backdrop-blur-md text-white font-mono text-[0.64rem] font-bold px-3 py-1 rounded-full border border-white/15 uppercase tracking-wider">
                {currentSlide.category}
              </div>
            )}

            {/* Navigation Left Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#F15A24] text-white backdrop-blur-md border border-white/20 hover:border-[#F15A24] shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Navigation Right Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#F15A24] text-white backdrop-blur-md border border-white/20 hover:border-[#F15A24] shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* 4. Bottom Dark Gradient Shade / Scrim with Big White Text & Tagline */}
            <div className="absolute inset-x-0 bottom-0 pt-32 pb-6 sm:pb-8 px-6 sm:px-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col justify-end z-20 text-left">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                
                {/* Text Content */}
                <div className="max-w-3xl">
                  
                  {/* Eyebrow Tag */}
                  {currentSlide.tag && (
                    <div className="inline-flex items-center gap-2 mb-2 font-mono text-[0.66rem] sm:text-[0.72rem] font-extrabold tracking-widest uppercase px-3 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>{currentSlide.tag}</span>
                    </div>
                  )}

                  {/* Big Headline Title in White */}
                  <h3 className="font-heading font-black text-[1.35rem] sm:text-[1.8rem] md:text-[2.2rem] text-white leading-tight tracking-tight mb-2 drop-shadow-md">
                    {currentSlide.title}
                  </h3>

                  {/* Tagline / Subtitle in White */}
                  {currentSlide.subtitle && (
                    <p className="text-[0.85rem] sm:text-[0.95rem] text-slate-200 font-normal leading-relaxed drop-shadow max-w-2xl">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>

                {/* Direct Action Button on Bottom Right */}
                <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry && onOpenEnquiry(currentSlide.title)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-heading font-extrabold text-[0.88rem] rounded-xl flex items-center justify-center gap-2 shadow-yellow-cta transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Inquire Availability &amp; Price</span>
                    <ArrowUpRight size={16} className="stroke-[2.5]" />
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* 5. Minimal Bottom Pagination Indicators */}
          <div className="py-3 bg-slate-950 border-t border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              {filteredSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-[#F15A24]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-[0.70rem] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Showroom Showcase</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ShowroomGallerySection;
