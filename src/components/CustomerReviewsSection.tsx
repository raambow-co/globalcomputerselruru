import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
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
  description?: string;
  embedUrl: string;
  instagramUrl: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reels'>('all');
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    'reel-1': true,
    'reel-2': true,
    'reel-3': true,
  });

  const toggleMute = (id: string) => {
    setMutedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const videoReviews: VideoReview[] = [
    {
      id: 'reel-1',
      postId: 'Db-zPh2Tq7p',
      title: 'Showroom Client Delivery & Genuine Hardware Experience',
      customerName: 'Verified Showroom Customer',
      location: 'Powerpet, Eluru Showroom',
      tag: 'CLIENT REEL & DELIVERY',
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
      embedUrl: 'https://www.instagram.com/p/DdI0i0kTvKB/embed/',
      instagramUrl: 'https://www.instagram.com/p/DdI0i0kTvKB/',
    },
    {
      id: 'reel-3',
      postId: 'Da7A88IzGnO',
      title: 'Custom PC Architecture & Tech Consultation Experience',
      customerName: 'Verified Showroom Customer',
      location: 'Powerpet, Eluru Showroom',
      tag: 'TECH CONSULTATION & DELIVERY',
      embedUrl: 'https://www.instagram.com/p/Da7A88IzGnO/embed/',
      instagramUrl: 'https://www.instagram.com/p/Da7A88IzGnO/',
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
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Section Header */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80 shadow-2xs mb-2.5">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-amber-800 uppercase">
              REAL CLIENT STORIES &amp; VIDEO REVIEWS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-0 select-none">
            Real Customers.{' '}
            <span className="text-[#F15A24] font-black relative inline-block">
              Real Experiences.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/20 rounded-full" />
            </span>
          </h2>
        </div>

        {/* 3. Side-by-Side In-Site Video Reviews (Horizontal Swipeable on Mobile, 3-Column Grid on Desktop) */}
        <div className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch">
          {videoReviews.map((video) => (
            <div
              key={video.id}
              className="w-[85vw] max-w-[340px] sm:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-center bg-white rounded-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col overflow-hidden group hover:border-amber-400/40"
            >
              {/* Card Top Banner with Aesthetic Yellow/Amber Accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

              {/* Direct In-Site Embedded Instagram Video Frame */}
              <div className="relative w-full bg-[#080B10] flex items-center justify-center min-h-[460px] sm:min-h-[500px] overflow-hidden group/video">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  className="w-full h-[460px] sm:h-[500px] border-0"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media; autoplay"
                />

                {/* Small Instagram-style Mute / Unmute Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleMute(video.id)}
                  aria-label={mutedStates[video.id] ? "Unmute video" : "Mute video"}
                  title={mutedStates[video.id] ? "Click to Unmute" : "Click to Mute"}
                  className="absolute bottom-3 right-3 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 group/mute"
                >
                  {mutedStates[video.id] ? (
                    <VolumeX size={14} className="text-white/90 group-hover/mute:text-white" />
                  ) : (
                    <Volume2 size={14} className="text-emerald-400 group-hover/mute:text-emerald-300" />
                  )}
                </button>
              </div>

              {/* Video Card Footer Info */}
              <div className="p-4 sm:p-5 bg-white flex flex-col justify-between flex-grow text-left">
                <div>
                  <h3 className="font-heading font-bold text-[1.02rem] text-[#0E1117] leading-snug mb-1.5 group-hover:text-[#D94814] transition-colors">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-[0.82rem] text-[#475569] leading-relaxed mb-3">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-[0.76rem]">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck size={14} />
                    <span>Verified Customer Story</span>
                  </div>

                  <a
                    href={video.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Instagram review: ${video.title}`}
                    className="font-heading font-bold text-[#D94814] hover:underline inline-flex items-center gap-1"
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
        <div className="mt-6 sm:mt-8 pt-4 border-t border-black/[0.06] max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[0.78rem] text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#F15A24]" />
            <span>Have you purchased or serviced your hardware with us? Share your feedback!</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry('Customer Video Feedback')}
            className="font-heading font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/90 px-3.5 py-1.5 rounded-lg border border-amber-300/80 hover:border-amber-400 cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 shadow-2xs hover:shadow-xs"
          >
            <span>Share Your Showroom Story</span>
            <ExternalLink size={12} className="text-amber-700" />
          </button>
        </div>

      </div>
    </section>
  );
};
