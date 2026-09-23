import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquare, Quote, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface CustomerReviewsSectionProps {
  onOpenEnquiry: (topic?: string) => void;
}

interface Testimonial {
  id: string;
  number: string;
  quote: string;
  highlightPhrase: string;
  customerName: string;
  designation: string;
  companyOrLocation: string;
  source: string;
  verified: boolean;
  solutionType: string;
  featuredProductImage: string;
  featuredProductAlt: string;
  featuredProductLabel: string;
}

interface SupportingReview {
  id: string;
  quote: string;
  customerName: string;
  designation: string;
  location: string;
  source: string;
  verified: boolean;
  contextTag: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Parallax physics state for the 3D studio hardware
  const parallaxState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  const hardwareRef = useRef<HTMLDivElement>(null);

  // Featured Testimonials Dataset
  const featuredTestimonials: Testimonial[] = [
    {
      id: 'review-1',
      number: '01',
      quote:
        'Global Computers helped us find the right technology for our requirements. The process was straightforward, and the team was supportive throughout.',
      highlightPhrase: 'straightforward and supportive throughout',
      customerName: 'K. Satyanarayana',
      designation: 'Managing Director',
      companyOrLocation: 'Sri Krishna Agro Logistics, Eluru',
      source: 'Verified Showroom Client',
      verified: true,
      solutionType: 'Commercial Workspace Setup',
      featuredProductImage: '/assets/epson_printer.png',
      featuredProductAlt: 'Epson EcoTank Fleet Printer',
      featuredProductLabel: 'Epson Enterprise Print Solution',
    },
    {
      id: 'review-2',
      number: '02',
      quote:
        'We needed dependable workstations with color-accurate displays for our CAD drafting team. They configured the entire setup with authentic components and handled on-site testing seamlessly.',
      highlightPhrase: 'authentic components and seamless testing',
      customerName: 'P. V. Ramana Rao',
      designation: 'Principal Architect',
      companyOrLocation: 'Studio Designworks, West Godavari',
      source: 'Google Business Review',
      verified: true,
      solutionType: 'Precision CAD Workstation Fleet',
      featuredProductImage: '/assets/pro_monitor.png',
      featuredProductAlt: 'UltraVision 4K Studio Display',
      featuredProductLabel: '4K Studio Multi-Monitor Deployment',
    },
    {
      id: 'review-3',
      number: '03',
      quote:
        'Finding genuine hardware with direct manufacturer warranty locally in Eluru was our top priority. Global Computers delivered with complete transparency and fast turnaround.',
      highlightPhrase: 'complete transparency and fast turnaround',
      customerName: 'V. Suresh Babu',
      designation: 'Technical Operations Lead',
      companyOrLocation: 'Apex Diagnostic Labs, Eluru',
      source: 'Customer Feedback Record',
      verified: true,
      solutionType: 'High-Uptime Server & Network Hardware',
      featuredProductImage: '/assets/motherboard.png',
      featuredProductAlt: 'Z790 Enterprise Workstation Motherboard',
      featuredProductLabel: 'Server-Grade Motherboard Architecture',
    },
  ];

  // Supporting Editorial Customer Experiences
  const supportingReviews: SupportingReview[] = [
    {
      id: 'sup-1',
      quote:
        'Prompt hardware diagnosis and genuine replacement parts for our office systems. Honest technical advice without upselling unnecessary parts.',
      customerName: 'D. Naga Lakshmi',
      designation: 'Accounts Administrator',
      location: 'Eluru Commercial Complex',
      source: 'Verified Google Review',
      verified: true,
      contextTag: 'OFFICE IT HARDWARE',
    },
    {
      id: 'sup-2',
      quote:
        'Setup our high-efficiency printing fleet with EcoTank systems. Ink running costs dropped significantly and the hardware has been running smoothly without downtime.',
      customerName: 'M. Venkata Reddy',
      designation: 'Business Owner',
      location: 'Powerpet, Eluru',
      source: 'Customer Feedback',
      verified: true,
      contextTag: 'BUSINESS PRINTING',
    },
    {
      id: 'sup-3',
      quote:
        'Consulted them for a custom desktop build for data processing. The thermal design and component balance were spot on.',
      customerName: 'T. Rajesh Kumar',
      designation: 'Software Consultant',
      location: 'Sanivarapupeta, Eluru',
      source: 'Direct Consultation Record',
      verified: true,
      contextTag: 'CUSTOM WORKSTATIONS',
    },
  ];

  const currentTestimonial = featuredTestimonials[activeIdx];

  useEffect(() => {
    // 1. Viewport observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        parallaxState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Subtle cursor parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      parallaxState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      parallaxState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        const touch = e.touches[0];
        parallaxState.current.targetX = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
        parallaxState.current.targetY = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 3. Smooth Lerp loop
    let frameId: number;
    const renderLoop = (time: number) => {
      if (parallaxState.current.isVisible) {
        const dt = Math.min((time - parallaxState.current.lastTime) / 1000, 0.1);
        parallaxState.current.lastTime = time;

        const ambientX = Math.sin(time * 0.0007) * 0.02;
        const ambientY = Math.cos(time * 0.0005) * 0.02;

        const targetX = parallaxState.current.targetX + ambientX;
        const targetY = parallaxState.current.targetY + ambientY;

        const lerpFactor = 1 - Math.pow(0.002, dt);
        parallaxState.current.currentX +=
          (targetX - parallaxState.current.currentX) * lerpFactor;
        parallaxState.current.currentY +=
          (targetY - parallaxState.current.currentY) * lerpFactor;

        if (hardwareRef.current) {
          const cx = parallaxState.current.currentX;
          const cy = parallaxState.current.currentY;
          const tx = (cx * 18).toFixed(2);
          const ty = (cy * 14).toFixed(2);
          const rx = (-cy * 5).toFixed(2);
          const ry = (cx * 5).toFixed(2);

          hardwareRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) =>
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-24 sm:py-32 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Minimal White Studio Environment & Technical Coordinate Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Soft Ambient Overhead Red Keylight Tint */}
        <div className="absolute -top-[10%] left-1/4 w-[750px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.025)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="reviewsGrid"
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
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reviewsGrid)" />

          {/* Large Atmospheric Spatial Ring */}
          <circle
            cx="75%"
            cy="45%"
            r="440"
            fill="none"
            stroke="rgba(241, 90, 36, 0.035)"
            strokeWidth="1.2"
            strokeDasharray="8 10"
          />
        </svg>

        {/* Technical Corner Markers */}
        <div className="absolute top-12 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SEC.TESTIMONIALS</span>
        </div>
        <div className="absolute top-12 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">FEEDBACK.VERIFIED</span>
        </div>
        <div className="absolute bottom-10 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">TRUST.AUTHENTIC</span>
        </div>
        <div className="absolute bottom-10 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">ELURU.RELATIONSHIPS</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* 2. Section Introduction */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-5">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
              CUSTOMER EXPERIENCES
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4.2vw,3.4rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-4 select-none">
            Technology That{' '}
            <span className="text-[#F15A24] relative inline-block">
              Earns Trust.
              <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Concise Supporting Text */}
          <p className="text-[1.02rem] sm:text-[1.12rem] text-[#4A5364] leading-relaxed max-w-xl font-normal">
            Every interaction matters. Discover what customers have to say about their experience with Global Computers.
          </p>
        </div>

        {/* 3. Main Asymmetrical Layout: Large Featured Editorial Testimonial + Realistic 3D Metaphor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 sm:mb-24">
          
          {/* LEFT: Featured Dominant Testimonial Experience (7 Columns on LG) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-[0_12px_40px_rgba(15,23,42,0.035)] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            
            {/* Ambient Red Studio Accent Corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_100%_0%,rgba(241, 90, 36,0.045),transparent_70%)] pointer-events-none" />

            {/* Top Bar: Large Red Quotation Mark & Verified Source Badge */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-8">
                
                {/* Large Stylized Global Computers RED Quotation Mark */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#F15A24] shadow-2xs">
                  <Quote size={24} className="fill-[#F15A24]/10 stroke-[#F15A24] stroke-[2.2]" />
                </div>

                {/* Verified Source Capsule */}
                <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-black/[0.07] shadow-2xs">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="font-mono text-[0.68rem] font-semibold text-[#0E1117] tracking-wide">
                    {currentTestimonial.source}
                  </span>
                </div>
              </div>

              {/* Large Featured Quotation */}
              <blockquote className="font-heading font-semibold text-[clamp(1.35rem,2.2vw,1.95rem)] text-[#0E1117] leading-[1.32] tracking-tight mb-8">
                “{currentTestimonial.quote}”
              </blockquote>
            </div>

            {/* Bottom Meta & Author Details */}
            <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              {/* Customer Attribution */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-[1.12rem] text-[#0E1117]">
                    {currentTestimonial.customerName}
                  </h3>
                  <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full" />
                </div>

                <div className="text-[0.88rem] text-[#4A5364] mt-0.5">
                  {currentTestimonial.designation}
                </div>

                <div className="font-mono text-[0.72rem] text-[#828E9E] mt-0.5">
                  {currentTestimonial.companyOrLocation}
                </div>
              </div>

              {/* Solution Tag */}
              <div className="bg-white px-3.5 py-1.5 rounded-xl border border-black/[0.06] shadow-2xs self-start sm:self-auto">
                <span className="font-mono text-[0.66rem] font-bold text-[#F15A24] tracking-wider uppercase">
                  {currentTestimonial.solutionType}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Visual Studio 3D Hardware Metaphor + Refined Testimonial Switcher (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* 3D Hardware Studio Metaphor Display */}
            <div className="bg-white rounded-3xl p-8 border border-black/[0.07] shadow-[0_8px_30px_rgba(15,23,42,0.03)] flex-grow flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] sm:min-h-[340px]">
              
              {/* Subtle Studio Radial Floor Light */}
              <div className="absolute w-[260px] h-[260px] rounded-full bg-gradient-to-b from-[#FFF2EB] to-[#FAFBFD] border border-[#F15A24]/10 pointer-events-none" />

              {/* 3D Hardware Object with Delicate Parallax */}
              <div
                ref={hardwareRef}
                className="relative z-10 w-full max-w-[320px] transition-transform duration-300 ease-out preserve-3d"
              >
                <img
                  key={currentTestimonial.featuredProductImage}
                  src={currentTestimonial.featuredProductImage}
                  alt={currentTestimonial.featuredProductAlt}
                  className="w-full h-auto object-contain select-none drop-shadow-[0_24px_38px_rgba(15,23,42,0.13)] animate-in fade-in zoom-in-95 duration-300"
                  loading="lazy"
                />
              </div>

              {/* Minimal Metaphor Label */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-xs flex items-center gap-2 whitespace-nowrap z-20">
                <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full" />
                <span className="font-mono text-[0.66rem] font-semibold text-[#0E1117]">
                  {currentTestimonial.featuredProductLabel}
                </span>
              </div>

              {/* Top Right Technical Index */}
              <div className="absolute top-6 right-6 font-mono text-[0.66rem] text-[#9AA5B5]">
                REF / {currentTestimonial.number}
              </div>
            </div>

            {/* Refined Calm Testimonial Selector Navigation */}
            <div className="bg-[#FAFBFD] rounded-2xl p-5 border border-black/[0.06] flex items-center justify-between gap-4">
              
              {/* Numbered Progress Indicators */}
              <div className="flex items-center gap-3">
                {featuredTestimonials.map((t, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`group flex items-center gap-2 font-mono text-[0.76rem] font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-[#F15A24]'
                          : 'text-[#828E9E] hover:text-[#0E1117]'
                      }`}
                      aria-label={`View testimonial ${t.number}`}
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'w-8 bg-[#F15A24]' : 'w-2.5 bg-black/15 group-hover:bg-black/30'
                        }`}
                      />
                      <span>{t.number}</span>
                    </button>
                  );
                })}
              </div>

              {/* Calm Minimal Next / Previous Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 border border-black/[0.08] flex items-center justify-center text-[#0E1117] transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-x-0.5"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-xl bg-[#0E1117] hover:bg-black active:bg-[#1C2028] text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs hover:translate-x-0.5"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 4. Supporting Customer Experiences (Restrained Editorial Staggered Layout) */}
        <div className="mb-20 sm:mb-28">
          
          {/* Section Subtitle Bar */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
            <h4 className="font-mono text-[0.74rem] font-bold text-[#0E1117] tracking-wider uppercase">
              ADDITIONAL CLIENT EXPERIENCES &amp; SERVICE FEEDBACK
            </h4>
            <div className="flex-grow h-[1px] bg-black/[0.06]" />
          </div>

          {/* Staggered 3-Column Editorial Grid with Subtle Separators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {supportingReviews.map((review, i) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-7 border border-black/[0.06] shadow-[0_4px_20px_rgba(15,23,42,0.02)] transition-all duration-200 hover:border-[#F15A24]/25 hover:shadow-[0_12px_32px_rgba(241, 90, 36,0.04)] flex flex-col justify-between relative group"
              >
                {/* Thin Top Red Hover Line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-[#F15A24] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

                <div>
                  {/* Top Context Tag & Source */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[0.64rem] font-bold text-[#F15A24] tracking-wider uppercase">
                      {review.contextTag}
                    </span>
                    <span className="font-mono text-[0.62rem] text-[#9AA5B5]">
                      {review.source}
                    </span>
                  </div>

                  {/* Supporting Quote */}
                  <p className="text-[0.92rem] text-[#333D4B] leading-relaxed mb-6 font-normal">
                    “{review.quote}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-black/[0.05]">
                  <div className="font-heading font-bold text-[0.94rem] text-[#0E1117]">
                    {review.customerName}
                  </div>
                  <div className="text-[0.8rem] text-[#64748B]">
                    {review.designation} · <span className="text-[#828E9E]">{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 5. Bottom Brand Trust Statement */}
        <div className="relative pt-12 border-t border-black/[0.07] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          {/* Brand Philosophy Typography */}
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
              <span className="font-mono text-[0.68rem] font-bold text-[#F15A24] tracking-widest uppercase">
                COMMITMENT
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-[1.45rem] sm:text-[1.75rem] text-[#0E1117] leading-tight tracking-tight">
              Built on service.{' '}
              <span className="text-[#F15A24] relative inline-block">
                Strengthened by trust.
                <span className="absolute left-0 bottom-0.5 w-full h-0.5 bg-[#F15A24]/20 rounded-full" />
              </span>
            </h3>
          </div>

          {/* Action Consultation Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenEnquiry('Customer Review & Consultation')}
              className="px-6 py-3.5 bg-white hover:bg-[#FAFBFD] text-[#0E1117] hover:text-[#F15A24] border border-black/10 hover:border-[#F15A24]/30 rounded-xl font-semibold text-[0.9rem] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <span>Connect with Showroom Team</span>
              <ArrowRight size={15} className="text-[#F15A24]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
