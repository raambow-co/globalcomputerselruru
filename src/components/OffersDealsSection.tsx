import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Tag, 
  ArrowRight, 
  Plus, 
  Upload, 
  Trash2, 
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';

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
    id: '1',
    badge: 'MEGA COMBO DEAL',
    offerTitle: 'Creator Studio 4K Workstation Bundle',
    image: '/assets/pro_monitor.png',
    description: 'Special Festive Discount: Intel Core i9 14th Gen + RTX 4080 Super + 34" Curved 4K Display with ₹45,000 Instant Savings.',
  },
  {
    id: '2',
    badge: 'BUSINESS SPECIAL',
    offerTitle: 'Epson EcoTank Heavy-Duty Print Fleet',
    image: '/assets/epson_printer.png',
    description: 'Get Flat ₹4,500 Cashback + 2 Free Extra Genuine Ink Bottle Sets with every Epson EcoTank Duplex All-in-One.',
  },
  {
    id: '3',
    badge: 'HARDWARE COMBO',
    offerTitle: 'Z790 Workstation Board + DDR5 Fast RAM',
    image: '/assets/motherboard.png',
    description: 'Save 18% on High-Speed Z790 PCIe 5.0 Motherboard + 32GB 6000MHz DDR5 Memory Combo Kit with Free Assembly.',
  },
  {
    id: '4',
    badge: 'LIMITED FLASH SALE',
    offerTitle: 'AeroCNC Solid Aluminum Mechanical Keyboard',
    image: '/assets/mech_keyboard.png',
    description: 'Flash Deal: 30% Flat Off on Anodized CNC Mechanical Keyboards with Free Braided Aviator Coiled Cable.',
  },
];

export const OffersDealsSection: React.FC<OffersDealsSectionProps> = ({ onOpenEnquiry }) => {
  const [offers, setOffers] = useState<OfferSlide[]>(() => {
    const saved = localStorage.getItem('gc_offers_slides');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // use default
      }
    }
    return DEFAULT_OFFERS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Upload Form State
  const [newImage, setNewImage] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newBadge, setNewBadge] = useState('SPECIAL OFFER');
  const [newDescription, setNewDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage when offers change
  useEffect(() => {
    localStorage.setItem('gc_offers_slides', JSON.stringify(offers));
  }, [offers]);

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

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage || !newDescription) return;

    const newOffer: OfferSlide = {
      id: Date.now().toString(),
      image: newImage,
      badge: newBadge.trim() || 'LATEST OFFER',
      offerTitle: newTitle.trim() || 'Special Showroom Deal',
      description: newDescription.trim(),
    };

    setOffers((prev) => [newOffer, ...prev]);
    setCurrentIndex(0);
    setIsUploadOpen(false);
    setNewImage('');
    setNewTitle('');
    setNewBadge('SPECIAL OFFER');
    setNewDescription('');
  };

  const handleDeleteCurrent = () => {
    if (offers.length <= 1) {
      alert('You must keep at least one active offer in the slider.');
      return;
    }
    const updated = offers.filter((_, idx) => idx !== currentIndex);
    setOffers(updated);
    setCurrentIndex(0);
  };

  const currentOffer = offers[currentIndex] || offers[0];

  return (
    <section
      id="deals"
      className="relative bg-[#FAFBFD] text-[#0E1117] py-8 sm:py-12 min-h-[calc(100vh-70px)] flex flex-col justify-center overflow-hidden border-t border-black/[0.06] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Ambient Background Glow & Markers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.035)_0%,rgba(250,251,253,0)_100%)]" />
        <div className="absolute top-6 left-6 sm:left-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">OFFERS.SLIDER_FEED</span>
        </div>
        <div className="absolute top-6 right-6 sm:right-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">ELURU.SHOWROOM</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Clean Minimal Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-4 sm:mb-5 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-0.5 rounded-full border border-black/[0.08] shadow-2xs mb-1">
              <Flame className="w-3 h-3 text-[#F15A24] animate-bounce" />
              <span className="font-mono text-[0.64rem] font-bold tracking-[0.14em] text-[#F15A24] uppercase">
                SHOWROOM EXCLUSIVES
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] text-[#0E1117] tracking-tight leading-tight">
              Latest Offers &amp; <span className="text-[#F15A24]">Special Deals.</span>
            </h2>
          </div>

          {/* Upload New Offer Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FFF2EB] text-[#F15A24] border border-[#F15A24]/30 hover:border-[#F15A24] font-semibold text-[0.76rem] rounded-lg shadow-2xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Upload size={12} />
              <span>Upload Offer</span>
            </button>

            {offers.length > 1 && (
              <button
                type="button"
                onClick={handleDeleteCurrent}
                title="Remove this offer"
                className="p-1.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-black/10 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 3. Main Featured Slider Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(15,23,42,0.05)] overflow-hidden transition-all duration-300 group"
        >
          {/* Top Brand Orange Accent Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#F15A24] via-[#FF7844] to-[#F15A24]" />

          {/* Image Slide Area */}
          <div className="relative w-full h-[210px] sm:h-[260px] md:h-[290px] bg-[#FAFBFD] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
            
            {/* Background Subtle Gradient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.05)_0%,rgba(250,251,253,0)_100%)] pointer-events-none" />

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

            {/* Floating Top-Left Badge */}
            {currentOffer.badge && (
              <div className="absolute top-4 left-4 z-20 bg-[#F15A24] text-white font-mono text-[0.64rem] font-bold tracking-wider px-3 py-1 rounded-full shadow-orange-cta uppercase flex items-center gap-1">
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
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-[#F15A24] text-[#0E1117] hover:text-white border border-black/10 hover:border-transparent shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Offer Slide"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next Navigation Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-[#F15A24] text-[#0E1117] hover:text-white border border-black/10 hover:border-transparent shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Offer Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* 4. Small One-Line Description Bar (Below the Image) */}
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
              className="w-full sm:w-auto px-5 py-2.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.84rem] rounded-lg flex items-center justify-center gap-1.5 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 flex-shrink-0 cursor-pointer"
            >
              <span>Claim This Offer</span>
              <ArrowRight size={14} />
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

      {/* 6. Upload Offer Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative text-left">
            
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#FFF2EB] text-[#F15A24] flex items-center justify-center">
                <Upload size={18} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[1.15rem] text-[#0E1117]">
                  Upload New Offer Slide
                </h3>
                <p className="text-[0.8rem] text-slate-500">
                  Select any promotional image and write a one-line description.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddOffer} className="space-y-4">
              {/* Image Input */}
              <div>
                <label className="block text-[0.82rem] font-semibold text-[#0E1117] mb-1.5">
                  Offer Image <span className="text-[#F15A24]">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-black/15 hover:border-[#F15A24]/50 rounded-xl p-4 text-center bg-slate-50/60 hover:bg-[#FFF2EB]/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  {newImage ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <img src={newImage} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                      <span className="absolute bottom-1 bg-black/75 text-white text-[0.65rem] px-2 py-0.5 rounded">
                        Click to change
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[#F15A24]" />
                      <span className="text-[0.84rem] text-slate-600 font-medium">
                        Click to select image file from computer
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-[0.82rem] font-semibold text-[#0E1117] mb-1">
                  Offer Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekend Mega Workstation Sale"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.9rem] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                />
              </div>

              {/* Badge Input */}
              <div>
                <label className="block text-[0.82rem] font-semibold text-[#0E1117] mb-1">
                  Offer Tag / Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. FLAT 25% OFF · LIMITED STOCK"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.9rem] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                />
              </div>

              {/* One-line Description */}
              <div>
                <label className="block text-[0.82rem] font-semibold text-[#0E1117] mb-1">
                  One-Line Description <span className="text-[#F15A24]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Save ₹10,000 on custom workstation builds with 3-year on-site warranty."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.9rem] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!newImage || !newDescription}
                  className="w-full py-3 bg-[#F15A24] hover:bg-[#D94814] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[0.92rem] rounded-xl flex items-center justify-center gap-2 shadow-orange-cta transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Publish Slide to Offers Section</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
