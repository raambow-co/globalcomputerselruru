import React from 'react';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { SpatialProductCanvas } from './SpatialProductCanvas';
import { TrustBar } from './TrustBar';

interface HeroSectionProps {
  onOpenAvailability: () => void;
  onSelectProduct: (productName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAvailability,
  onSelectProduct,
}) => {
  return (
    <section className="relative min-h-screen pt-24 pb-8 flex flex-col justify-between items-center bg-white overflow-hidden">
      
      {/* 1. Ambient Light Spatial Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Top Red Ambient Glow */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(229,30,43,0.035)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Technical Coordinate SVG Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="gridPattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="rgba(15, 23, 42, 0.03)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.08)" />
            </pattern>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E51E2B" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#E51E2B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          {/* Spatial Depth Rings */}
          <circle
            cx="50%"
            cy="48%"
            r="380"
            fill="none"
            stroke="rgba(229, 30, 43, 0.05)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle
            cx="50%"
            cy="48%"
            r="580"
            fill="none"
            stroke="rgba(15, 23, 42, 0.03)"
            strokeWidth="1"
          />
          <circle
            cx="50%"
            cy="48%"
            r="780"
            fill="none"
            stroke="rgba(15, 23, 42, 0.02)"
            strokeWidth="1"
            strokeDasharray="14 10"
          />
          <circle cx="50%" cy="48%" r="480" fill="url(#ringGlow)" />
        </svg>

        {/* Technical Crosshairs */}
        <div className="absolute top-28 left-10 font-mono text-[0.68rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">SYS.01</span>
        </div>
        <div className="absolute top-28 right-10 font-mono text-[0.68rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">LOC.ELURU</span>
        </div>
        <div className="absolute bottom-8 left-10 font-mono text-[0.68rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">GC.ELURU</span>
        </div>
        <div className="absolute bottom-8 right-10 font-mono text-[0.68rem] tracking-widest text-[#A0ABBB] select-none">
          + <span className="text-[#828E9E]">ELURU.AP</span>
        </div>
      </div>

      {/* 2. 3D Spatial Product Canvas (Floating Transparent Hardware) */}
      <SpatialProductCanvas onSelectProduct={onSelectProduct} />

      {/* 3. Central Direct Integrated Editorial Copy & CTAs */}
      <div className="relative z-20 max-w-[920px] mx-auto px-4 text-center my-auto flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/[0.08] shadow-sm mb-6 transition-transform duration-200 hover:scale-[1.02]">
          <span className="w-3 h-[3px] bg-[#E51E2B] rounded-full" />
          <span className="font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#0E1117] uppercase">
            COMPUTER TECHNOLOGY &amp; SOLUTIONS
          </span>
          <span className="font-mono text-[0.64rem] font-extrabold tracking-wider bg-[#FFF0F1] text-[#E51E2B] px-2.5 py-0.5 rounded uppercase">
            IN ELURU
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-[2.9rem] sm:text-[4.2rem] lg:text-[4.9rem] text-[#0E1117] leading-[1.06] tracking-tight mb-8 select-none">
          Powering Your<br />
          <span className="text-[#E51E2B] relative inline-block">
            Digital
            <span className="absolute left-0 bottom-1.5 w-full h-1.5 bg-[#E51E2B]/15 rounded-full" />
          </span>{' '}
          World.
        </h1>

        {/* CTA Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-7">
          
          {/* Primary Action CTA: Check Product Availability */}
          <button
            type="button"
            onClick={onOpenAvailability}
            className="w-full sm:w-auto px-8 py-4 bg-[#E51E2B] hover:bg-[#D11724] active:bg-[#BA121E] text-white font-semibold text-[1.02rem] tracking-tight rounded-xl flex items-center justify-center gap-3 shadow-red-cta transition-all duration-200 hover:shadow-red-hover hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <span>Check Product Availability</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/30">
              <ArrowRight size={15} />
            </div>
          </button>

          {/* Secondary CTA: Explore Our Solutions */}
          <a
            href="#updates"
            className="w-full sm:w-auto px-7 py-4 text-[#333D4B] hover:text-[#0E1117] bg-white/85 hover:bg-white backdrop-blur-md border border-black/[0.08] hover:border-black/20 shadow-sm font-semibold text-[0.98rem] rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Explore Our Solutions</span>
            <ChevronDown size={16} className="text-[#828E9E]" />
          </a>
        </div>

        {/* Quick Hardware Inventory Status Ticker */}
        <div className="inline-flex items-center justify-center flex-wrap gap-3 sm:gap-6 text-[0.84rem] text-[#4A5364] bg-white/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/[0.08] shadow-sm transition-all duration-200 hover:border-black/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-green" />
            <span>
              Showroom Live Inventory: <strong className="text-[#0E1117] font-semibold">480+ Enterprise SKUs</strong>
            </span>
          </div>

          <span className="hidden sm:inline text-black/20">|</span>

          <button
            type="button"
            onClick={onOpenAvailability}
            className="font-mono text-[0.76rem] font-bold text-[#E51E2B] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Quick Availability Lookup</span>
            <ExternalLink size={12} />
          </button>
        </div>

      </div>

      {/* 4. Bottom Trust Indicators & Credibility Strip */}
      <div className="w-full mt-6">
        <TrustBar />
      </div>

    </section>
  );
};
