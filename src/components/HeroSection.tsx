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
      
      {/* 1. Ambient Light Spatial Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Top Red Ambient Glow */}
        <div className="absolute top-0 left-0 right-0 h-[360px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(241, 90, 36,0.035)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Technical Coordinate SVG Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-80"
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
            <radialGradient id="ringGlow" cx="50%" cy="48%" r="50%">
              <stop offset="0%" stopColor="#F15A24" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#F15A24" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          {/* Spatial Depth Rings */}
          <circle
            cx="50%"
            cy="47%"
            r="300"
            fill="none"
            stroke="rgba(241, 90, 36, 0.05)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle
            cx="50%"
            cy="47%"
            r="460"
            fill="none"
            stroke="rgba(15, 23, 42, 0.03)"
            strokeWidth="1"
          />
          <circle
            cx="50%"
            cy="47%"
            r="640"
            fill="none"
            stroke="rgba(15, 23, 42, 0.02)"
            strokeWidth="1"
            strokeDasharray="14 10"
          />
          <circle cx="50%" cy="47%" r="380" fill="url(#ringGlow)" />
        </svg>

        {/* Technical Crosshairs */}
        <div className="absolute top-20 left-8 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">SYS.01</span>
        </div>
        <div className="absolute top-20 right-8 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">LOC.ELURU</span>
        </div>
        <div className="absolute bottom-5 left-8 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">GC.ELURU</span>
        </div>
        <div className="absolute bottom-5 right-8 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">ELURU.AP</span>
        </div>
      </div>

      {/* 2. 3D Spatial Product Canvas (Floating Transparent Hardware) */}
      <SpatialProductCanvas onSelectProduct={onSelectProduct} />

      {/* 3. Central Direct Integrated Editorial Copy & CTAs */}
      <div className="relative z-20 max-w-[840px] mx-auto px-4 text-center my-auto flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-black/[0.08] shadow-sm mb-4 transition-transform duration-200 hover:scale-[1.02]">
          <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
          <span className="font-mono text-[0.66rem] font-bold tracking-[0.14em] text-[#0E1117] uppercase">
            COMPUTER TECHNOLOGY &amp; SOLUTIONS
          </span>
          <span className="font-mono text-[0.58rem] font-extrabold tracking-wider bg-[#FFF2EB] text-[#F15A24] px-2 py-0.5 rounded uppercase">
            IN ELURU
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-[clamp(2.1rem,4.2vw,3.65rem)] text-[#0E1117] leading-[1.08] tracking-tight mb-5 sm:mb-6 select-none">
          Powering Your<br />
          <span className="text-[#F15A24] relative inline-block">
            Digital
            <span className="absolute left-0 bottom-1 sm:bottom-1.5 w-full h-1 sm:h-1.5 bg-[#F15A24]/15 rounded-full" />
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

        {/* Quick Hardware Inventory Status Ticker */}
        <div className="inline-flex items-center justify-center flex-wrap gap-2.5 sm:gap-5 text-[0.78rem] text-[#4A5364] bg-white/85 backdrop-blur-md px-4 py-1.5 sm:py-2 rounded-full border border-black/[0.08] shadow-sm transition-all duration-200 hover:border-black/15">
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
            className="font-mono text-[0.72rem] font-bold text-[#F15A24] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Quick Availability Lookup</span>
            <ExternalLink size={11} />
          </button>
        </div>

      </div>

      {/* 4. Popping Offers CTA Scroll Trigger */}
      <div className="w-full mb-2 flex justify-center z-20">
        {/* Popping Orange 'Get Latest Offers' Scroll Trigger with Down Arrow */}
        <a
          href="#deals"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-heading font-extrabold text-[0.82rem] sm:text-[0.86rem] tracking-wide rounded-full shadow-[0_4px_18px_rgba(241,90,36,0.45)] hover:shadow-[0_6px_25px_rgba(241,90,36,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 animate-bounce cursor-pointer group uppercase"
        >
          <Sparkles size={13} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
          <span>Get Latest Offers</span>
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
            <ChevronDown size={12} className="text-white stroke-[3]" />
          </div>
        </a>
      </div>

    </section>
  );
};
