import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Volume2, 
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface CustomerReviewsSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

interface VideoReview {
  id: string;
  postId: string;
  title: string;
  customerName: string;
  location: string;
  tag: string;
  description: string;
  embedUrl: string;
  instagramUrl: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reels'>('all');

  const videoReviews: VideoReview[] = [
    {
      id: 'reel-1',
      postId: 'Db-zPh2Tq7p',
      title: 'Showroom Client Delivery & Genuine Hardware Experience',
      customerName: 'Verified Showroom Customer',
      location: 'Powerpet, Eluru Showroom',
      tag: 'CLIENT REEL & DELIVERY',
      description: 'Real customer feedback on showroom consultation, authentic components, and same-day delivery.',
      embedUrl: 'https://www.instagram.com/p/Db-zPh2Tq7p/embed/',
      instagramUrl: 'https://www.instagram.com/p/Db-zPh2Tq7p/',
    },
    {
      id: 'reel-2',
      postId: 'DdI0i0kTvKB',
      title: 'High-Performance Computing Setup & Service Review',
      customerName: 'Verified Showroom Customer',
      location: 'Eluru, Andhra Pradesh',
      tag: 'HARDWARE & WORKSTATION',
      description: 'Customer review on custom PC architecture, seamless testing, and transparent pricing in Eluru.',
      embedUrl: 'https://www.instagram.com/p/DdI0i0kTvKB/embed/',
      instagramUrl: 'https://www.instagram.com/p/DdI0i0kTvKB/',
    },
  ];

  return (
    <section
      id="reviews"
      className="relative bg-white text-[#0E1117] py-8 sm:py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Ambient Studio Geometry & Subtle Coordinate System */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Overhead Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.025)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Technical Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="videoGrid"
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
          <rect width="100%" height="100%" fill="url(#videoGrid)" />

          {/* Large Atmospheric Ring */}
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

        {/* Technical Corner Markers */}
        <div className="absolute top-6 left-6 sm:left-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SEC.VIDEO_EXPERIENCES</span>
        </div>
        <div className="absolute top-6 right-6 sm:right-12 font-mono text-[0.62rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">AUTHENTIC_STORIES</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Section Header */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FAFBFD] px-3.5 py-1 rounded-full border border-black/[0.08] shadow-2xs mb-2.5">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.66rem] font-black tracking-[0.18em] text-[#F15A24] uppercase">
              REAL CLIENT STORIES &amp; VIDEO REVIEWS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-2 select-none">
            Real Customers.{' '}
            <span className="text-[#F15A24] relative inline-block">
              Real Experiences.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-[0.88rem] sm:text-[0.96rem] text-[#4A5364] leading-relaxed max-w-2xl font-normal">
            Watch authentic customer feedback and workstation deliveries recorded live at our Global Computers Eluru showroom.
          </p>
        </div>

        {/* 3. Side-by-Side In-Site Video Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-stretch">
          {videoReviews.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(241,90,36,0.08)] transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#F15A24]/30"
            >
              {/* Card Top Banner with Brand Accent */}
              <div className="h-1 w-full bg-gradient-to-r from-[#F15A24] via-[#FF7844] to-[#F15A24]" />

              {/* Video Info Header */}
              <div className="p-4 sm:p-5 pb-3 flex items-center justify-between gap-3 border-b border-black/[0.05] bg-[#FAFBFD]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFF0F5] to-white border border-[#E1306C]/20 flex items-center justify-center text-[#E1306C] shadow-2xs">
                    <InstagramIcon size={16} />
                  </div>
                  <div className="text-left">
                    <span className="font-heading font-extrabold text-[0.88rem] text-[#0E1117] block leading-tight">
                      Global Computers Eluru
                    </span>
                    <span className="font-mono text-[0.62rem] text-slate-400 block -mt-0.5">
                      @GLOBALCOMPUTERSELURU
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-[#FFF2EB] text-[#F15A24] font-mono text-[0.62rem] font-bold px-2.5 py-0.5 rounded-full border border-[#F15A24]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
                  <span>{video.tag}</span>
                </div>
              </div>

              {/* Direct In-Site Embedded Instagram Video Frame */}
              <div className="relative w-full bg-[#080B10] flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="w-full h-[460px] sm:h-[500px] border-0"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media; autoplay"
                />
              </div>

              {/* Video Card Footer Info */}
              <div className="p-4 sm:p-5 bg-white flex flex-col justify-between flex-grow text-left">
                <div>
                  <h3 className="font-heading font-bold text-[1.02rem] text-[#0E1117] leading-snug mb-1.5 group-hover:text-[#F15A24] transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-[0.82rem] text-[#64748B] leading-relaxed mb-3">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-[0.76rem]">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <ShieldCheck size={14} />
                    <span>Verified Customer Story</span>
                  </div>

                  <a
                    href={video.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-bold text-[#F15A24] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open on Instagram</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 4. Bottom Reassurance Bar */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-black/[0.06] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[0.78rem] text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#F15A24]" />
            <span>Have you purchased or serviced your hardware with us? Share your feedback!</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry('Customer Video Feedback')}
            className="font-heading font-bold text-[#F15A24] hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <span>Share Your Showroom Story</span>
            <ExternalLink size={12} />
          </button>
        </div>

      </div>
    </section>
  );
};
