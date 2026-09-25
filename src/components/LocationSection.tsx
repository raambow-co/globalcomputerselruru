import React, { useState } from 'react';
import { ArrowRight, Clock, Compass, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';

interface LocationSectionProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [mapMode, setMapMode] = useState<'interactive' | 'architectural'>('interactive');

  const googleMapsUrl = 'https://www.google.com/maps/place/Global+Computer+Services/@16.7102582,81.1043477,17z/data=!4m6!3m5!1s0x3a3615c1eb4f8433:0x38a4cb39246fc0ab!8m2!3d16.7102582!4d81.1043477!16s%2Fg%2F11hfz0tts8';

  return (
    <section
      id="location"
      className="relative bg-white text-[#0E1117] py-8 sm:py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Architectural White Studio Linework & Subtle Coordinate System */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.018)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="locationGrid"
              width="140"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 140 0 L 0 0 0 140"
                fill="none"
                stroke="rgba(15, 23, 42, 0.022)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#locationGrid)" />

          {/* Large Architectural Focus Ring */}
          <circle
            cx="65%"
            cy="52%"
            r="420"
            fill="none"
            stroke="rgba(241, 90, 36, 0.035)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Technical Corner Coordinate Markers */}
        <div className="absolute top-6 left-6 sm:left-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">LOC.ELURU_AP</span>
        </div>
        <div className="absolute top-6 right-6 sm:right-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">GEO.16.7103N_81.1043E</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Asymmetric Two-Column Editorial Layout (Left 40% / Right 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Editorial Information & Direct Navigation (5 Columns on LG ~ 42%) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-black/[0.08] shadow-xs mb-3 self-start">
              <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
              <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F15A24] uppercase">
                VISIT GLOBAL COMPUTERS
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.3rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-8 select-none">
              Find Us.{' '}
              <span className="text-[#F15A24] relative inline-block">
                Let’s Talk Technology.
                <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
              </span>
            </h2>

            {/* Structured Location Information */}
            <div className="space-y-5 mb-10 pt-6 border-t border-black/[0.06]">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0 mt-0.5 shadow-2xs">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="font-mono text-[0.68rem] font-bold text-[#828E9E] uppercase tracking-wider mb-0.5">
                    SHOWROOM LOCATION
                  </div>
                  <div className="font-heading font-bold text-[1rem] text-[#0E1117] leading-snug">
                    Main Road, Near Fire Station, Powerpet
                  </div>
                  <div className="text-[0.86rem] text-[#64748B] mt-0.5">
                    Eluru, West Godavari District, Andhra Pradesh — 534002
                  </div>
                </div>
              </div>

              {/* Phone & Direct Desk */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0 mt-0.5 shadow-2xs">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="font-mono text-[0.68rem] font-bold text-[#828E9E] uppercase tracking-widest mb-0.5">
                    DIRECT DESK &amp; ASSISTANCE
                  </div>
                  <div className="font-heading font-bold text-[1rem] text-[#0E1117]">
                    +91 98481 23456
                  </div>
                  <div className="text-[0.82rem] text-[#64748B] mt-0.5">
                    Available during showroom operational hours
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0 mt-0.5 shadow-2xs">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="font-mono text-[0.68rem] font-bold text-[#828E9E] uppercase tracking-widest mb-0.5">
                    SHOWROOM HOURS
                  </div>
                  <div className="font-heading font-bold text-[0.98rem] text-[#0E1117]">
                    Monday – Saturday: 9:30 AM – 8:30 PM
                  </div>
                  <div className="text-[0.82rem] text-[#64748B] mt-0.5">
                    Sunday: Prior Appointment / Urgent Enterprise Requests
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary CTA: Get Directions */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.95rem] rounded-xl flex items-center justify-center gap-2.5 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Get Directions</span>
                <Navigation size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              {/* Secondary Link: Contact Our Team */}
              <button
                type="button"
                onClick={() => onOpenEnquiry('Showroom Visit / Directions')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FAFBFD] text-[#0E1117] hover:text-[#F15A24] border border-black/10 hover:border-[#F15A24]/30 rounded-xl font-semibold text-[0.92rem] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
              >
                <span>Contact Our Team</span>
                <ArrowRight size={14} className="text-[#828E9E] group-hover:text-[#F15A24]" />
              </button>
            </div>

          </div>

          {/* RIGHT SIDE: Architectural Map & 3D Hardware Overlap (7 Columns on LG ~ 58%) */}
          <div className="lg:col-span-7 relative">
            
            {/* 1. Architectural Framing Map Container */}
            <div className="bg-[#FAFBFD] rounded-3xl border border-black/[0.08] shadow-[0_16px_50px_rgba(15,23,42,0.04)] overflow-hidden relative min-h-[420px] sm:min-h-[480px] flex flex-col justify-between transition-all duration-300">
              
              {/* Map Canvas Header Bar */}
              <div className="p-4 sm:p-5 border-b border-black/[0.06] bg-white/90 backdrop-blur-md flex items-center justify-between gap-4 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[0.7rem] font-bold text-[#0E1117] uppercase tracking-wider">
                    ELURU SHOWROOM DESK
                  </span>
                  <span className="hidden sm:inline font-mono text-[0.66rem] text-[#828E9E]">
                    · OPEN TODAY
                  </span>
                </div>

                {/* Map View Toggle */}
                <div className="flex items-center gap-1 bg-[#F4F6F8] p-1 rounded-xl border border-black/[0.04]">
                  <button
                    type="button"
                    onClick={() => setMapMode('architectural')}
                    className={`px-3 py-1 rounded-lg font-mono text-[0.66rem] font-semibold transition-all duration-150 cursor-pointer ${
                      mapMode === 'architectural'
                        ? 'bg-white text-[#0E1117] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0E1117]'
                    }`}
                  >
                    Architectural
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('interactive')}
                    className={`px-3 py-1 rounded-lg font-mono text-[0.66rem] font-semibold transition-all duration-150 cursor-pointer ${
                      mapMode === 'interactive'
                        ? 'bg-white text-[#0E1117] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0E1117]'
                    }`}
                  >
                    Google Map
                  </button>
                </div>
              </div>

              {/* Map Surface View */}
              {mapMode === 'architectural' ? (
                /* Clean High-End Architectural Map Drawing */
                <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px] bg-[#F7F9FC] overflow-hidden select-none">
                  
                  {/* Subtle Vector Street & Canal Geometry SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern id="streetTexture" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(15,23,42,0.015)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#streetTexture)" />

                    {/* Eluru Tammileru River / Canal Curve */}
                    <path
                      d="M -50 80 Q 200 120 400 60 T 900 160"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="28"
                      strokeLinecap="round"
                    />

                    {/* Grand Trunk Main Road Corridor */}
                    <path
                      d="M 50 -30 L 480 480"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="32"
                    />
                    <path
                      d="M 50 -30 L 480 480"
                      fill="none"
                      stroke="#E5E9F0"
                      strokeWidth="24"
                    />

                    {/* Powerpet Main Connecting Avenue */}
                    <path
                      d="M -20 280 L 800 200"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="24"
                    />
                    <path
                      d="M -20 280 L 800 200"
                      fill="none"
                      stroke="#E5E9F0"
                      strokeWidth="16"
                    />

                    {/* Secondary Arterial Streets */}
                    <path
                      d="M 280 -20 L 220 500"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="14"
                    />
                    <path
                      d="M 280 -20 L 220 500"
                      fill="none"
                      stroke="#EAEEF4"
                      strokeWidth="8"
                    />

                    <path
                      d="M 120 420 L 680 340"
                      fill="none"
                      stroke="#EAEEF4"
                      strokeWidth="8"
                    />

                    {/* Landmark Building Blocks */}
                    <rect x="80" y="160" width="70" height="50" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <rect x="180" y="140" width="80" height="60" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <rect x="360" y="240" width="90" height="70" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <rect x="420" y="110" width="75" height="55" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                  </svg>

                  {/* Street Names / Annotations */}
                  <div className="absolute top-[38%] left-[12%] font-mono text-[0.62rem] tracking-widest text-[#828E9E] -rotate-6 select-none">
                    POWERPET MAIN RD
                  </div>
                  <div className="absolute top-[22%] right-[16%] font-mono text-[0.62rem] tracking-widest text-[#828E9E] rotate-45 select-none">
                    GT ROAD ELURU
                  </div>

                  {/* Prominent Global Computers Red Location Marker Pin */}
                  <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer">
                    
                    {/* Glowing Pulse Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#F15A24]/15 rounded-full animate-ping pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#F15A24]/20 rounded-full pointer-events-none" />

                    {/* Red Location Badge */}
                    <div className="relative bg-[#0E1117] text-white px-3.5 py-1.5 rounded-full border border-black/15 shadow-xl flex items-center gap-2 transition-transform duration-200 group-hover:scale-105">
                      <span className="w-2 h-2 rounded-full bg-[#F15A24] shadow-[0_0_6px_#F15A24]" />
                      <span className="font-mono text-[0.72rem] font-bold tracking-wider uppercase whitespace-nowrap">
                        GLOBAL COMPUTERS
                      </span>
                    </div>

                    {/* Pin Tip Arrow */}
                    <div className="w-2.5 h-2.5 bg-[#0E1117] rotate-45 mx-auto -mt-1 shadow-xs" />
                  </div>

                  {/* Compass Rose Mini Widget */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-black/10 shadow-2xs flex items-center gap-1.5">
                    <Compass size={14} className="text-[#F15A24]" />
                    <span className="font-mono text-[0.62rem] font-bold text-[#0E1117]">
                      N · ELURU
                    </span>
                  </div>
                </div>
              ) : (
                /* Live Interactive Google Map Embed (Clean Light Theme) */
                <div className="relative w-full h-[260px] sm:h-[300px] md:h-[320px]">
                  <iframe
                    title="Global Computer Services Eluru Location"
                    src="https://maps.google.com/maps?q=16.7102582,81.1043477&hl=en&z=17&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Map Footer Bar */}
              <div className="p-4 sm:p-5 bg-white border-t border-black/[0.06] flex items-center justify-between gap-4 z-20">
                <div className="flex items-center gap-2 text-[0.82rem] text-[#64748B]">
                  <span className="font-mono text-[0.72rem] text-[#0E1117] font-semibold">16.7103° N, 81.1043° E</span>
                  <span className="hidden sm:inline text-black/20">|</span>
                  <span className="hidden sm:inline">West Godavari District</span>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.74rem] font-bold text-[#F15A24] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
