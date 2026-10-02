import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Flame
} from 'lucide-react';
import { db, collection, onSnapshot } from '../firebase';

export interface OfferSlide {
  id: string;
  image: string;
  badge?: string;
  description: string;
  offerTitle?: string;
}

interface OffersDealsSectionProps {
  onOpenEnquiry: (dealName?: string) => void;
}

const DEFAULT_OFFERS: OfferSlide[] = [
  {
    id: 'offer-1',
    badge: 'EXCLUSIVE SHOWROOM DEAL',
    offerTitle: 'Next-Gen Performance Rig & Workstation Specials',
    image: '/assets/special_offer_1.jpg',
    description: 'Special Launch Offer: Premium Custom PC Builds with Genuine Warranty, High-Speed Performance & Zero-Cost Assembly.',
  },
  {
    id: 'offer-2',
    badge: 'FESTIVE COMBO OFFER',
    offerTitle: 'Ultra Pro Computing & Accessories Showcase',
    image: '/assets/special_offer_2.jpg',
    description: 'Limited Period Clearance: Best Price Guarantee on Gaming Monitors, Mechanical Keyboards, and Enterprise Hardware in Eluru.',
  },
  {
    id: '1',
    badge: 'MEGA COMBO DEAL',
    offerTitle: 'Creator Studio 4K Workstation Bundle',
    image: '/assets/pro_monitor.webp',
    description: 'Special Festive Discount: Intel Core i9 14th Gen + RTX 4080 Super + 34" Curved 4K Display with ₹45,000 Instant Savings.',
  },
  {
    id: '2',
    badge: 'BUSINESS SPECIAL',
    offerTitle: 'Epson EcoTank Heavy-Duty Print Fleet',
    image: '/assets/epson_printer.webp',
    description: 'Get Flat ₹4,500 Cashback + 2 Free Extra Genuine Ink Bottle Sets with every Epson EcoTank Duplex All-in-One.',
  },
  {
    id: '3',
    badge: 'HARDWARE COMBO',
    offerTitle: 'Z790 Workstation Board + DDR5 Fast RAM',
    image: '/assets/motherboard.webp',
    description: 'Save 18% on High-Speed Z790 PCIe 5.0 Motherboard + 32GB 6000MHz DDR5 Memory Combo Kit with Free Assembly.',
  },
  {
    id: '4',
    badge: 'LIMITED FLASH SALE',
    offerTitle: 'AeroCNC Solid Aluminum Mechanical Keyboard',
    image: '/assets/mech_keyboard.webp',
    description: 'Flash Deal: 30% Flat Off on Anodized CNC Mechanical Keyboards with Free Braided Aviator Coiled Cable.',
  },
];

export const OffersDealsSection: React.FC<OffersDealsSectionProps> = ({ onOpenEnquiry }) => {
  const [offers, setOffers] = useState<OfferSlide[]>(() => {
    try {
      const saved = localStorage.getItem('gc_offers_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_OFFERS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Real-time Cloud Sync from Firebase Firestore
  useEffect(() => {
    try {
      const unsub = onSnapshot(
        collection(db, 'offers'),
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteOffers: OfferSlide[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              remoteOffers.push({
                id: doc.id,
                image: data.image || '',
                badge: data.badge || 'SPECIAL OFFER',
                offerTitle: data.offerTitle || '',
                description: data.description || '',
              });
            });
            if (remoteOffers.length > 0) {
              setOffers(remoteOffers);
              localStorage.setItem('gc_offers_slides', JSON.stringify(remoteOffers));
            }
          }
        },
        () => {
          // Fallback gracefully to local storage if Firestore isn't reachable
        }
      );
      return () => unsub();
    } catch (e) {}
  }, []);

  // Sync with storage changes
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('gc_offers_slides');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setOffers(parsed);
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || offers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, offers.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const currentOffer = offers[currentIndex] || offers[0] || DEFAULT_OFFERS[0];

  // Dynamic colorful badge styling based on badge keyword
  const getBadgeStyle = (badgeText?: string) => {
    const text = (badgeText || '').toUpperCase();
    if (text.includes('MEGA') || text.includes('WORKSTATION')) {
      return 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-extrabold shadow-[0_4px_16px_rgba(245,158,11,0.4)]';
    }
    if (text.includes('BUSINESS') || text.includes('PRINT')) {
      return 'bg-gradient-to-r from-[#F15A24] to-[#D94814] text-white shadow-orange-cta';
    }
    if (text.includes('HARDWARE') || text.includes('COMBO')) {
      return 'bg-gradient-to-r from-slate-900 to-slate-800 text-amber-400 border border-amber-400/30 shadow-sm';
    }
    if (text.includes('FLASH') || text.includes('LIMITED')) {
      return 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_4px_16px_rgba(220,38,38,0.35)]';
    }
    return 'bg-gradient-to-r from-[#F15A24] to-[#EA580C] text-white shadow-orange-cta';
  };

  return (
    <section
      id="deals"
      className="relative bg-[#FAFBFD] text-[#0E1117] py-6 sm:py-10 md:py-12 overflow-hidden border-t border-black/[0.06] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Ambient Background Multi-Color Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-gradient-to-r from-amber-400/6 to-orange-500/6 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.06)_0%,rgba(250,251,253,0)_100%)]" />

        {/* Minimal Precision Corner Accents */}
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

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Clean Minimal Header */}
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-50/90 px-3.5 py-0.5 rounded-full border border-orange-200/80 shadow-2xs mb-1.5">
            <Flame className="w-3.5 h-3.5 text-[#F15A24] animate-bounce" />
            <span className="font-mono text-[0.64rem] font-bold tracking-[0.14em] text-[#F15A24] uppercase">
              SHOWROOM EXCLUSIVES &amp; PROMOS
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-[clamp(1.5rem,2.5vw,2.1rem)] text-[#0E1117] tracking-tight leading-tight">
            Latest Offers &amp;{' '}
            <span className="text-[#F15A24] font-black">
              Special Deals.
            </span>
          </h2>
        </div>

        {/* 3. Main Featured Slider Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(15,23,42,0.05)] overflow-hidden transition-all duration-300 group"
        >
          {/* Top Multi-Color Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24]" />

          {/* Image Slide Area */}
          <div className="relative w-full h-[210px] sm:h-[260px] md:h-[290px] bg-[#FAFBFD] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
            
            {/* Background Multi-Color Gradient Glow */}
            <div className="absolute inset-0 bg-radial-aurora pointer-events-none opacity-60" />

            {/* Slide Image with Clean Transition */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                key={currentOffer.id}
                src={currentOffer.image}
                alt={currentOffer.offerTitle || 'Latest Offer'}
                className="max-h-full max-w-full object-contain drop-shadow-[0_16px_28px_rgba(15,23,42,0.1)] animate-in fade-in zoom-in-95 duration-400"
                loading="eager"
              />
            </div>

            {/* Floating Top-Left Badge with Dynamic Vibrant Gradient */}
            {currentOffer.badge && (
              <div className={`absolute top-4 left-4 z-20 font-mono text-[0.64rem] font-bold tracking-wider px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${getBadgeStyle(currentOffer.badge)}`}>
                <Sparkles size={11} className="text-white animate-spin" style={{ animationDuration: '4s' }} />
                <span>{currentOffer.badge}</span>
              </div>
            )}

            {/* Slide Index Counter */}
            <div className="absolute top-4 right-4 z-20 bg-black/75 backdrop-blur-md text-white font-mono text-[0.66rem] font-semibold px-2.5 py-0.5 rounded-full border border-white/15">
              <span>{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/40 mx-1">/</span>
              <span>{String(offers.length).padStart(2, '0')}</span>
            </div>

            {/* Prev Navigation Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-amber-400 text-[#0E1117] border border-black/10 hover:border-amber-400 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Offer Slide"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next Navigation Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-amber-400 text-[#0E1117] border border-black/10 hover:border-amber-400 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Offer Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* 4. Description Bar (Below the Image) */}
          <div className="p-3.5 sm:p-4 px-5 sm:px-6 bg-white border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Description Text */}
            <div className="text-center sm:text-left flex-grow">
              {currentOffer.offerTitle && (
                <div className="font-heading font-bold text-[0.98rem] sm:text-[1.05rem] text-[#0E1117] mb-0.5 leading-snug">
                  {currentOffer.offerTitle}
                </div>
              )}
              <p className="text-[0.82rem] sm:text-[0.86rem] text-[#64748B] font-medium leading-relaxed">
                {currentOffer.description}
              </p>
            </div>

            {/* Claim Offer Action Button */}
            <button
              type="button"
              onClick={() => onOpenEnquiry(currentOffer.offerTitle || currentOffer.description)}
              className="w-full sm:w-auto px-5.5 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 active:scale-98 text-[#0E1117] font-bold text-[0.86rem] rounded-xl flex items-center justify-center gap-2 shadow-yellow-cta transition-all duration-200 hover:shadow-yellow-hover hover:-translate-y-0.5 flex-shrink-0 cursor-pointer group"
            >
              <span>Claim This Offer</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#0E1117]" />
            </button>
          </div>

          {/* 5. Pagination Indicator Dots */}
          <div className="py-2 bg-slate-50/80 border-t border-black/[0.04] flex items-center justify-center gap-1.5">
            {offers.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-[#F15A24]'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
