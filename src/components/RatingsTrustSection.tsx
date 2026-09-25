import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  QrCode,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GoogleMapsIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

interface SocialMediaQRSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

interface SocialCard {
  id: string;
  name: string;
  badge: string;
  qrImage: string;
  directUrl: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  brandBg: string;
  brandBorder: string;
  brandText: string;
  buttonText: string;
  handleOrSub: string;
}

export const RatingsTrustSection: React.FC<SocialMediaQRSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const socialChannels: SocialCard[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      badge: 'OFFICIAL PROFILE',
      qrImage: '/assets/qr/qr_instagram.png',
      directUrl: 'https://www.instagram.com/globalcomputerseluru',
      description: 'Daily hardware arrivals, custom workstation builds & customer stories in Eluru.',
      icon: InstagramIcon,
      accentColor: '#E1306C',
      brandBg: 'bg-gradient-to-br from-[#FFF0F5] to-white',
      brandBorder: 'group-hover:border-[#E1306C]/40',
      brandText: 'text-[#E1306C]',
      buttonText: 'Open Instagram',
      handleOrSub: '@GLOBALCOMPUTERSELURU',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      badge: 'TECH REVIEWS & BUILDS',
      qrImage: '/assets/qr/qr_youtube.png',
      directUrl: 'https://www.youtube.com/@globalcomputerseluru',
      description: 'Workstation benchmarks, component walkthroughs & hardware unboxing videos.',
      icon: YoutubeIcon,
      accentColor: '#FF0000',
      brandBg: 'bg-gradient-to-br from-[#FFF5F5] to-white',
      brandBorder: 'group-hover:border-[#FF0000]/40',
      brandText: 'text-[#FF0000]',
      buttonText: 'Visit Channel',
      handleOrSub: 'Global Computer Services',
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      badge: 'SHOWROOM DIRECTIONS',
      qrImage: '/assets/qr/qr_googlemaps.png',
      directUrl: 'https://maps.google.com/?q=Global+Computers+Eluru',
      description: 'Instant GPS showroom navigation, verified ratings & reviews on Main Road, Eluru.',
      icon: GoogleMapsIcon,
      accentColor: '#4285F4',
      brandBg: 'bg-gradient-to-br from-[#F0F7FF] to-white',
      brandBorder: 'group-hover:border-[#4285F4]/40',
      brandText: 'text-[#4285F4]',
      buttonText: 'Showroom Location',
      handleOrSub: 'Powerpet, Eluru, AP',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      badge: 'LIVE TECH DESK',
      qrImage: '/assets/qr/qr_whatsapp.png',
      directUrl: 'https://wa.me/919848123456?text=Hi%20Global%20Computers,%20I%20would%20like%20to%20inquire%20about%20product%20availability%20and%20pricing',
      description: 'Chat directly with our senior technicians for live stock availability and instant quotes.',
      icon: WhatsAppIcon,
      accentColor: '#25D366',
      brandBg: 'bg-gradient-to-br from-[#F0FDF4] to-white',
      brandBorder: 'group-hover:border-[#25D366]/40',
      brandText: 'text-[#25D366]',
      buttonText: 'Chat on WhatsApp',
      handleOrSub: '+91 98481 23456',
    },
  ];

  return (
    <section
      id="social-media"
      className="relative bg-white text-[#0E1117] py-6 sm:py-10 md:py-12 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Ambient Studio Geometry & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.025)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="socialGrid"
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
          <rect width="100%" height="100%" fill="url(#socialGrid)" />

          {/* Focal Concentric Rings */}
          <circle
            cx="50%"
            cy="50%"
            r="440"
            fill="none"
            stroke="rgba(241, 90, 36, 0.03)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Centered Section Header */}
        <div className="max-w-3xl mx-auto mb-4 sm:mb-6 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FAFBFD] px-3 py-0.5 rounded-full border border-black/[0.08] shadow-2xs mb-1.5">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.64rem] font-black tracking-[0.16em] text-[#F15A24] uppercase">
              CONNECT WITH US
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.5rem,2.8vw,2.3rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-1.5 select-none">
            Connect with Us on{' '}
            <span className="text-[#F15A24] relative inline-block">
              Social Media.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[0.82rem] sm:text-[0.92rem] text-[#4A5364] leading-relaxed max-w-2xl font-normal">
            Scan any QR code with your smartphone or tap the links below for instant updates, live tech support, workstation videos &amp; showroom directions.
          </p>
        </div>

        {/* 3. 4 Side-By-Side Interactive QR Cards (Touch-Swipeable on Mobile, Grid on Desktop) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch">
          {socialChannels.map((channel) => {
            const Icon = channel.icon;
            const isHovered = hoveredCard === channel.id;

            return (
              <div
                key={channel.id}
                onMouseEnter={() => setHoveredCard(channel.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`w-[82vw] max-w-[285px] sm:w-auto sm:max-w-none flex-shrink-0 sm:flex-shrink snap-center group bg-white rounded-2xl p-3.5 sm:p-4.5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${channel.brandBorder} ${
                  isHovered
                    ? 'shadow-[0_18px_45px_rgba(15,23,42,0.08)] -translate-y-1'
                    : 'border-black/[0.08] shadow-[0_4px_20px_rgba(15,23,42,0.03)]'
                }`}
              >
                {/* Top Subtle Brand Gradient Accent Bar */}
                <div
                  className="h-1 w-full absolute top-0 left-0 right-0 transition-opacity duration-300"
                  style={{
                    backgroundColor: channel.accentColor,
                    opacity: isHovered ? 1 : 0.6,
                  }}
                />

                {/* Card Top: Platform Icon, Badge & Title */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pt-0.5">
                    {/* Platform Icon & Name */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-2xs ${channel.brandBg}`}
                      >
                        <Icon size={16} className={channel.brandText} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-heading font-extrabold text-[0.98rem] sm:text-[1.05rem] text-[#0E1117] leading-tight">
                          {channel.name}
                        </h3>
                        <span className="font-mono text-[0.60rem] text-slate-400 block -mt-0.5 truncate max-w-[110px]">
                          {channel.handleOrSub}
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span
                      className="font-mono text-[0.55rem] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase whitespace-nowrap"
                      style={{
                        backgroundColor: `${channel.accentColor}12`,
                        color: channel.accentColor,
                      }}
                    >
                      {channel.badge}
                    </span>
                  </div>

                  {/* QR Code Direct Display without excess white space/frames */}
                  <div className="relative my-1.5 flex items-center justify-center overflow-hidden group/qr">
                    {/* Scanner Line Effect on Hover */}
                    {isHovered && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 w-full max-w-[195px] h-[2px] z-20 pointer-events-none shadow-[0_0_8px_rgba(241,90,36,0.8)] animate-pulse"
                        style={{
                          backgroundColor: channel.accentColor,
                          animation: 'qrScan 2s linear infinite alternate',
                        }}
                      />
                    )}

                    {/* Clean Exact Cropped QR Code Image */}
                    <div className="relative z-10 w-full max-w-[195px] flex items-center justify-center">
                      <img
                        src={channel.qrImage}
                        alt={`${channel.name} QR Code - Global Computers Eluru`}
                        className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover/qr:scale-102 rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    {/* Micro Scan Helper Pill */}
                    <div className="absolute bottom-1.5 z-20 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-white font-mono text-[0.55rem] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                      <QrCode size={10} className="text-[#F15A24]" />
                      <span>Scan Code</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[0.74rem] sm:text-[0.78rem] text-[#64748B] leading-snug text-left mb-2.5 font-normal line-clamp-2">
                    {channel.description}
                  </p>
                </div>

                {/* Bottom Action CTA Button */}
                <div className="pt-2 border-t border-black/[0.05]">
                  <a
                    href={channel.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl font-heading font-bold text-[0.80rem] flex items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer group/btn"
                    style={{
                      backgroundColor: isHovered ? channel.accentColor : '#F8FAFC',
                      color: isHovered ? '#FFFFFF' : '#1E293B',
                      border: isHovered ? `1px solid ${channel.accentColor}` : '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span>{channel.buttonText}</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* 4. Bottom Quick Reassurance Bar */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[0.78rem] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Official verified handles for Global Computers, Main Road, Powerpet, Eluru</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[0.70rem] text-[#828E9E]">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#F15A24]" />
              INSTANT RESPONSE
            </span>
            <span>·</span>
            <span>UPDATED LIVE</span>
          </div>
        </div>

      </div>

      {/* Global CSS for Scanner Animation */}
      <style>{`
        @keyframes qrScan {
          0% { top: 8%; }
          100% { top: 92%; }
        }
      `}</style>
    </section>
  );
};
