import React from 'react';
import { ArrowRight, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { SpatialProductCanvas } from './SpatialProductCanvas';

interface HeroSectionProps {
  onOpenAvailability: () => void;
  onSelectProduct: (productName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAvailability,
  onSelectProduct,
}) => {
  return (
    <section className="relative min-h-screen pt-18 sm:pt-20 pb-3 sm:pb-4 flex flex-col justify-between items-center bg-white overflow-hidden">
      
      {/* 1. Ambient Multi-Color Light Spatial Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Exactly Centered Radiant Warm Orange Ambient Shade */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[620px] h-[460px] sm:h-[540px] rounded-full bg-[radial-gradient(circle_at_center,rgba(241,90,36,0.13)_0%,rgba(245,158,11,0.06)_45%,rgba(255,255,255,0)_72%)] blur-2xl sm:blur-3xl pointer-events-none" />

        {/* Technical Coordinate SVG Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="gridPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="rgba(15, 23, 42, 0.03)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.08)" />
            </pattern>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F15A24" stopOpacity="0.09" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#F15A24" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          {/* Spatial Depth Rings Centered Exactly at 50% */}
          <circle
            cx="50%"
            cy="50%"
            r="280"
            fill="none"
            stroke="rgba(241, 90, 36, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle
            cx="50%"
            cy="50%"
            r="440"
            fill="none"
            stroke="rgba(245, 158, 11, 0.06)"
            strokeWidth="1"
          />
          <circle
            cx="50%"
            cy="50%"
            r="620"
            fill="none"
            stroke="rgba(15, 23, 42, 0.03)"
            strokeWidth="1"
            strokeDasharray="14 10"
          />
          <circle cx="50%" cy="50%" r="360" fill="url(#ringGlow)" />
        </svg>

        {/* Minimal Precision Corner Accents */}
        <div className="absolute top-8 left-6 sm:left-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13V1H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="1" r="2" fill="#F59E0B" />
          </svg>
        </div>
        <div className="absolute top-8 right-6 sm:right-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 13V1H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="1" r="2" fill="#F15A24" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 sm:left-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1V13H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="1" r="2" fill="#10B981" />
          </svg>
        </div>
        <div className="absolute bottom-6 right-6 sm:right-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1V13H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="1" r="2" fill="#F15A24" />
          </svg>
        </div>
      </div>

      {/* 2. 3D Spatial Product Canvas (Floating Transparent Hardware) */}
      <SpatialProductCanvas onSelectProduct={onSelectProduct} />

      {/* 3. Central Direct Integrated Editorial Copy & CTAs */}
      <div className="relative z-20 max-w-[840px] mx-auto px-4 text-center my-auto flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50/90 px-4 py-1.2 rounded-full border border-orange-200/80 shadow-sm mb-4 transition-transform duration-200 hover:scale-[1.02]">
          <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
          <span className="font-mono text-[0.66rem] font-bold tracking-[0.14em] text-[#0E1117] uppercase">
            PREMIUM TECHNOLOGY &amp; SOLUTIONS
          </span>
          <span className="font-mono text-[0.58rem] font-extrabold tracking-wider bg-[#F15A24] text-white px-2 py-0.5 rounded uppercase shadow-xs">
            IN ELURU
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-[clamp(2.1rem,4.2vw,3.65rem)] text-[#0E1117] leading-[1.08] tracking-tight mb-5 sm:mb-6 select-none">
          Powering Your<br />
          <span className="text-[#F15A24] relative inline-block font-black">
            Digital
            <span className="absolute left-0 bottom-1 sm:bottom-1.5 w-full h-1 sm:h-1.5 bg-[#F15A24]/20 rounded-full" />
          </span>{' '}
          World.
        </h1>

        {/* CTA Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-none mb-5">
          
          {/* Primary Action CTA: Check Product Availability */}
          <button
            type="button"
            onClick={onOpenAvailability}
            className="w-full sm:w-auto px-6 py-3 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.92rem] tracking-tight rounded-xl flex items-center justify-center gap-2.5 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <span>Check Product Availability</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/30">
              <ArrowRight size={13} />
            </div>
          </button>

          {/* Secondary CTA: Explore Our Solutions */}
          <a
            href="#technology-showcase"
            className="w-full sm:w-auto px-5 py-3 text-[#333D4B] hover:text-[#0E1117] bg-white/85 hover:bg-white backdrop-blur-md border border-black/[0.08] hover:border-black/20 shadow-sm font-semibold text-[0.88rem] rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Explore Inside Technology</span>
            <ChevronDown size={14} className="text-[#828E9E]" />
          </a>
        </div>

        {/* Quick Hardware Inventory Status Ticker (Hidden on Mobile) */}
        <div className="hidden sm:inline-flex items-center justify-center flex-wrap gap-2.5 sm:gap-5 text-[0.78rem] text-[#4A5364] bg-white/85 backdrop-blur-md px-4 py-1.5 sm:py-2 rounded-full border border-black/[0.08] shadow-sm transition-all duration-200 hover:border-black/15">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-green" />
            <span>
              Showroom Live Inventory: <strong className="text-[#0E1117] font-semibold">480+ Enterprise SKUs</strong>
            </span>
          </div>

          <span className="hidden sm:inline text-black/20">|</span>

          <button
            type="button"
            onClick={onOpenAvailability}
            className="font-mono text-[0.72rem] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200/80 hover:border-amber-300 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Quick Availability Lookup</span>
            <ExternalLink size={11} />
          </button>
        </div>

      </div>

      {/* 4. Popping Offers CTA Scroll Trigger */}
      <div className="w-full mb-2 flex justify-center z-20">
        {/* Aesthetic Golden Yellow 'Get Latest Offers' Scroll Trigger with Down Arrow */}
        <a
          href="#deals"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 active:scale-95 text-[#0E1117] font-heading font-extrabold text-[0.82rem] sm:text-[0.86rem] tracking-wide rounded-full shadow-[0_4px_22px_rgba(245,158,11,0.48)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.68)] hover:scale-105 transition-all duration-200 animate-bounce cursor-pointer group uppercase"
        >
          <Sparkles size={14} className="text-[#0E1117] animate-spin" style={{ animationDuration: '3s' }} />
          <span>Get Latest Offers &amp; Deals</span>
          <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
            <ChevronDown size={12} className="text-[#0E1117] stroke-[3]" />
          </div>
        </a>
      </div>

    </section>
  );
};
