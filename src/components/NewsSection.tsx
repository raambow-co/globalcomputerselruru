import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { NewsStory, NewsModal } from './NewsModal';

interface NewsSectionProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onOpenEnquiry }) => {
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);

  // Editorial Stories Data
  const featuredStory: NewsStory = {
    id: 'featured-arrival',
    category: 'LATEST ARRIVAL',
    date: '08 SEP 2026',
    tag: 'FLAGSHIP DISPLAY & COMPUTING',
    title: 'New Technology, New Possibilities.',
    description:
      'Explore the latest computer hardware and technology solutions now available through Global Computers.',
    fullContent: [
      'The next generation of enterprise workstation displays and high-efficiency computing architecture has arrived at our Eluru showroom.',
      'Designed specifically for creators, data analysts, and modern corporate environments, these systems deliver pixel-accurate 4K IPS clarity, thermal efficiency, and plug-and-play multi-device connectivity.',
      'Our showroom inventory includes pre-calibrated displays, high-end motherboard kits, and enterprise-grade peripherals ready for same-day inspection and commercial deployment.',
    ],
    highlights: [
      'Frameless 4K IPS Curved Studio Displays',
      'Factory Color Calibrated 99% DCI-P3 Accuracy',
      'Immediate Physical Verification in Showroom',
      'Complete OEM Manufacturer Warranty',
    ],
    image: '/assets/pro_monitor.png',
    imageAlt: 'UltraVision 4K Studio Display',
    productInquiryName: 'UltraVision 4K Studio Display (Showroom Arrival)',
  };

  const secondaryStories: NewsStory[] = [
    {
      id: 'secondary-workspace',
      category: 'BUSINESS TECHNOLOGY',
      date: '04 SEP 2026',
      tag: 'ENTERPRISE FLEET ARCHITECTURE',
      title: 'Smart Technology for Modern Workspaces',
      description:
        'Deploying precision workstation hardware, quiet enterprise print fleets, and ergonomic architecture tailored for growing organizations.',
      fullContent: [
        'Modern businesses require more than standard desktop PCs. High-efficiency heat-free printing and dedicated graphics accelerators streamline daily corporate operations.',
        'Global Computers provides turnkey business hardware solutions—from Epson EcoTank high-capacity fleet printers to custom multi-monitor workstation setups with on-site installation in Eluru and Andhra Pradesh.',
      ],
      highlights: [
        'Heat-Free PrecisionCore Enterprise Printers',
        'Bulk Corporate Procurement Tier Pricing',
        'Direct Dedicated Business Support Specialist',
      ],
      image: '/assets/epson_printer.png',
      imageAlt: 'Epson EcoTank Pro Fleet Printer',
      productInquiryName: 'Enterprise Business Technology Package',
    },
    {
      id: 'secondary-support',
      category: 'GLOBAL COMPUTERS',
      date: '28 AUG 2026',
      tag: 'SHOWROOM ASSURANCE & SERVICE',
      title: 'Reliable Hardware. Professional Support.',
      description:
        'Direct OEM warranty backing, same-day physical inspection at our Eluru showroom, and certified enterprise deployment specialists.',
      fullContent: [
        'At Global Computers, authenticity and client confidence stand paramount. Every component, motherboard, and workstation is sourced exclusively through authorized distributor channels.',
        'Clients can physically examine hardware, review real-time performance benchmarks, and consult with senior technical specialists prior to deployment.',
      ],
      highlights: [
        '100% Genuine Certified Hardware',
        'Live Pre-Dispatch Hardware Testing',
        'Fast Local Warranty Assistance in Eluru',
      ],
      image: '/assets/motherboard.png',
      imageAlt: 'Z790 Workstation Motherboard Architecture',
      productInquiryName: 'Genuine Hardware & Service Consultation',
    },
  ];

  return (
    <section
      id="updates"
      className="relative py-8 sm:py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center bg-[#FAFBFD] text-[#0E1117] overflow-hidden border-t border-black/[0.04]"
    >
      {/* 1. Subtle Background Linework & Technical Grid Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Radial Light */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.025)_0%,rgba(250,251,253,0)_100%)]" />
        <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(15,23,42,0.015)_0%,rgba(250,251,253,0)_100%)]" />

        {/* Minimal Grid Coordinates SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="newsGrid"
              width="140"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 140 0 L 0 0 0 140"
                fill="none"
                stroke="rgba(15, 23, 42, 0.025)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsGrid)" />

          {/* Thin Atmospheric Curves */}
          <circle
            cx="85%"
            cy="35%"
            r="420"
            fill="none"
            stroke="rgba(241, 90, 36, 0.035)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <circle
            cx="15%"
            cy="75%"
            r="380"
            fill="none"
            stroke="rgba(15, 23, 42, 0.02)"
            strokeWidth="1"
          />
        </svg>

        {/* Subtle Technical Markers */}
        <div className="absolute top-6 left-6 sm:left-12 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB]">
          + <span className="text-[#828E9E]">SEC.NEWSROOM</span>
        </div>
        <div className="absolute top-6 right-6 sm:right-12 font-mono text-[0.62rem] tracking-widest text-[#A0ABBB]">
          + <span className="text-[#828E9E]">LOC.ELURU</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Section Header (Editorial Style) */}
        <div className="max-w-2xl mb-4 sm:mb-5">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-black/[0.07] shadow-xs mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F15A24] uppercase">
              WHAT'S NEW
            </span>
          </div>

          {/* Section Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,2.8vw,2.3rem)] text-[#0E1117] leading-[1.12] tracking-tight mb-1.5">
            Stay Ahead of{' '}
            <span className="text-[#F15A24] relative inline-block">
              Technology.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Supporting Lead Copy */}
          <p className="text-[0.88rem] sm:text-[0.94rem] text-[#4A5364] leading-relaxed font-normal max-w-xl">
            Discover the latest arrivals, technology updates and solutions from Global Computers.
          </p>
        </div>

        {/* 3. Main Editorial Layout (Asymmetric: 1 Large Left + 2 Stacked Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* LEFT: Featured Story Visual Article (7 Columns on LG) */}
          <div
            onClick={() => setSelectedStory(featuredStory)}
            className="lg:col-span-7 group cursor-pointer bg-white rounded-2xl p-5 sm:p-6 border border-black/[0.07] shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(241, 90, 36,0.07)] hover:border-[#F15A24]/25 active:scale-[0.995] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle red corner glow indicator */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle_at_100%_0%,rgba(241, 90, 36,0.04),transparent_70%)] pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top Meta Header */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
                  <span className="font-mono text-[0.66rem] font-bold tracking-widest text-[#F15A24] uppercase">
                    {featuredStory.category}
                  </span>
                </div>

                <span className="font-mono text-[0.68rem] text-[#828E9E] tracking-wider">
                  {featuredStory.date}
                </span>
              </div>

              {/* Featured Headline */}
              <h3 className="font-heading font-extrabold text-[clamp(1.25rem,2vw,1.6rem)] text-[#0E1117] leading-[1.18] tracking-tight mb-2 group-hover:text-[#F15A24] transition-colors duration-200">
                {featuredStory.title}
              </h3>

              {/* Description */}
              <p className="text-[0.84rem] sm:text-[0.88rem] text-[#4A5364] leading-relaxed max-w-lg mb-3">
                {featuredStory.description}
              </p>
            </div>

            {/* 3D Realistic Product Composition */}
            <div className="relative my-2 py-2 flex items-center justify-center">
              {/* Subtle Red Graphic Halo Ring Behind Hardware */}
              <div className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-gradient-to-tr from-[#FFF2EB] to-white border border-[#F15A24]/10 transition-transform duration-500 group-hover:scale-105 pointer-events-none" />

              {/* 3D Hardware Display Render */}
              <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.imageAlt}
                  className="w-full h-[140px] sm:h-[160px] object-contain select-none drop-shadow-[0_18px_30px_rgba(15,23,42,0.12)] transition-all duration-300 group-hover:drop-shadow-[0_24px_38px_rgba(15,23,42,0.16)]"
                  loading="lazy"
                />
              </div>

              {/* Floating Spec Capsule Tag */}
              <div className="absolute bottom-1 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/10 shadow-xs flex items-center gap-1.5 transition-transform duration-200 group-hover:-translate-y-0.5">
                <Sparkles size={11} className="text-[#F15A24]" />
                <span className="font-mono text-[0.64rem] font-semibold text-[#0E1117]">
                  4K IPS · Frameless Curved
                </span>
              </div>
            </div>

            {/* Featured Story Action CTA */}
            <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[0.84rem] font-semibold text-[#0E1117] group-hover:text-[#F15A24] transition-colors duration-200">
                <span>Explore Update</span>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#F15A24] group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-2xs">
                  <ArrowRight size={12} />
                </div>
              </div>

              <span className="font-mono text-[0.66rem] text-[#828E9E] uppercase tracking-wider hidden sm:inline">
                Read Briefing · 2 min
              </span>
            </div>
          </div>

          {/* RIGHT: Two Stacked Secondary Editorial Updates (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
            {secondaryStories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.07] shadow-[0_6px_24px_rgba(15,23,42,0.025)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(241, 90, 36,0.06)] hover:border-[#F15A24]/20 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Category & Date */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                      <span className="font-mono text-[0.66rem] font-bold tracking-wider text-[#F15A24] uppercase">
                        {story.category}
                      </span>
                    </div>

                    <span className="font-mono text-[0.7rem] text-[#828E9E]">
                      {story.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-[1.28rem] sm:text-[1.38rem] text-[#0E1117] leading-tight tracking-tight mb-2.5 group-hover:text-[#F15A24] transition-colors duration-200">
                    {story.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[0.88rem] sm:text-[0.92rem] text-[#4A5364] leading-relaxed mb-4">
                    {story.description}
                  </p>
                </div>

                {/* Supporting Micro 3D Hardware Visual & Dynamic Action Link */}
                <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between gap-4">
                  
                  {/* Expanding Red Accent Line + Arrow Action */}
                  <div className="inline-flex items-center gap-2 text-[0.86rem] font-semibold text-[#0E1117] group-hover:text-[#F15A24] transition-colors duration-200">
                    <div className="w-0 group-hover:w-3 h-[2px] bg-[#F15A24] rounded-full transition-all duration-300" />
                    <span>Read Briefing</span>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#828E9E] group-hover:text-[#F15A24]"
                    />
                  </div>

                  {/* Micro 3D Hardware Render Preview */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center relative">
                    <img
                      src={story.image}
                      alt={story.imageAlt}
                      className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      loading="lazy"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 4. Section Footer (Clean Minimal Text Navigation) */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-black/[0.06]">
          <div className="text-[0.84rem] text-[#828E9E] font-mono">
            UPDATES VERIFIED BY GLOBAL COMPUTERS EDITORIAL DESK
          </div>

          <button
            type="button"
            onClick={() => setSelectedStory(featuredStory)}
            className="group inline-flex items-center gap-2 text-[0.92rem] font-semibold text-[#4A5364] hover:text-[#F15A24] transition-colors duration-200 cursor-pointer"
          >
            <span>View All Showroom Updates</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1.5 text-[#828E9E] group-hover:text-[#F15A24]"
            />
          </button>
        </div>

      </div>

      {/* Interactive Editorial Story Modal */}
      <NewsModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onInquire={(productName) => {
          setSelectedStory(null);
          onOpenEnquiry(productName);
        }}
      />
    </section>
  );
};
