import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ExternalLink, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface RatingsTrustSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

export const RatingsTrustSection: React.FC<RatingsTrustSectionProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hardwareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax physics loop for the 3D hardware element
  const physicsState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  useEffect(() => {
    // 1. Intersection Observer to preserve frame rate when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        physicsState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Mouse Move Listener for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      physicsState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      physicsState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        const touch = e.touches[0];
        physicsState.current.targetX = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
        physicsState.current.targetY = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 3. Delta-time Lerp Smoothing Render Loop
    let frameId: number;
    const renderLoop = (time: number) => {
      if (physicsState.current.isVisible) {
        const dt = Math.min((time - physicsState.current.lastTime) / 1000, 0.1);
        physicsState.current.lastTime = time;

        const ambientX = Math.sin(time * 0.0006) * 0.025;
        const ambientY = Math.cos(time * 0.0005) * 0.025;

        const targetX = physicsState.current.targetX + ambientX;
        const targetY = physicsState.current.targetY + ambientY;

        const lerpFactor = 1 - Math.pow(0.002, dt);
        physicsState.current.currentX +=
          (targetX - physicsState.current.currentX) * lerpFactor;
        physicsState.current.currentY +=
          (targetY - physicsState.current.currentY) * lerpFactor;

        if (hardwareRef.current) {
          const cx = physicsState.current.currentX;
          const cy = physicsState.current.currentY;
          const tx = (cx * 22).toFixed(2);
          const ty = (cy * 16).toFixed(2);
          const rx = (-cy * 6).toFixed(2);
          const ry = (cx * 6).toFixed(2);

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

  return (
    <section
      id="trust-ratings"
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-24 sm:py-32 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Subtle White Studio Environment & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute -top-[10%] right-1/4 w-[700px] h-[550px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.02)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="trustGrid"
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
          <rect width="100%" height="100%" fill="url(#trustGrid)" />

          {/* Large Minimal Studio Focal Rings */}
          <circle
            cx="65%"
            cy="50%"
            r="420"
            fill="none"
            stroke="rgba(241, 90, 36, 0.03)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Technical Corner Markers */}
        <div className="absolute top-12 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SEC.RATINGS</span>
        </div>
        <div className="absolute top-12 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">REPUTATION.GENUINE</span>
        </div>
        <div className="absolute bottom-10 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">VERIFICATION.PUBLIC</span>
        </div>
        <div className="absolute bottom-10 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">ELURU.LOCAL_PRESENCE</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* 2. Section Introduction */}
        <div className="max-w-2xl mb-16 sm:mb-20 text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-5">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
              TRUSTED BY CUSTOMERS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4.2vw,3.4rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-4 select-none">
            Good Technology.{' '}
            <span className="text-[#F15A24] relative inline-block">
              Better Experience.
              <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Concise Supporting Text */}
          <p className="text-[1.02rem] sm:text-[1.12rem] text-[#4A5364] leading-relaxed max-w-xl font-normal">
            See the reputation built through customer experiences and reliable technology solutions.
          </p>
        </div>

        {/* 3. Main Editorial Trust Composition (Asymmetrical Showcase Canvas) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-[#FAFBFD] rounded-3xl border border-black/[0.07] p-8 sm:p-12 lg:p-16 shadow-[0_12px_45px_rgba(15,23,42,0.03)] relative overflow-hidden transition-all duration-300 hover:border-[#F15A24]/20 hover:shadow-[0_20px_55px_rgba(241, 90, 36,0.04)]"
        >
          {/* Subtle Top-Right Ambient Red Radial Halo */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_100%_0%,rgba(241, 90, 36,0.045),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT: Dominant Verified Rating & Trust Metrics (7 Columns on LG) */}
            <div className="lg:col-span-7 flex flex-col justify-between z-20">
              
              {/* Primary Rating Display */}
              <div className="mb-8">
                
                {/* Source & Verified Label */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-black/[0.07] shadow-2xs">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="font-mono text-[0.7rem] font-bold tracking-wider text-[#0E1117] uppercase">
                      PUBLIC REPUTATION RECORD
                    </span>
                  </div>
                  <span className="font-mono text-[0.68rem] text-[#828E9E]">
                    ELURU SHOWROOM
                  </span>
                </div>

                {/* Rating Number + Stars Header */}
                <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                  <span className="font-heading font-black text-[clamp(4.2rem,8vw,6.5rem)] text-[#0E1117] leading-none tracking-tight transition-transform duration-300 group-hover:scale-[1.02]">
                    4.8
                  </span>

                  <div className="flex flex-col justify-center">
                    {/* Minimal, Crisp Red Stars */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={22}
                          className="text-[#F15A24] fill-[#F15A24] transition-transform duration-200"
                        />
                      ))}
                    </div>

                    <div className="font-mono text-[0.78rem] font-semibold text-[#4A5364]">
                      Overall Customer Rating
                    </div>
                  </div>
                </div>

                {/* Verification Statement */}
                <p className="text-[0.92rem] sm:text-[0.98rem] text-[#64748B] mt-4 leading-relaxed max-w-md">
                  Based on verified customer feedback and Google Business Profile reviews in Eluru.
                </p>
              </div>

              {/* Horizontal Editorial Information Separators */}
              <div className="pt-8 border-t border-black/[0.07] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                
                {/* Metric 1 */}
                <div className="border-l-2 border-[#F15A24] pl-4">
                  <div className="font-mono text-[0.66rem] font-bold text-[#828E9E] uppercase tracking-widest mb-0.5">
                    HARDWARE SOURCE
                  </div>
                  <div className="font-heading font-bold text-[1.05rem] text-[#0E1117]">
                    100% Genuine
                  </div>
                  <div className="text-[0.76rem] text-[#64748B] mt-0.5">
                    Direct OEM Channels
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="border-l-2 border-black/[0.12] pl-4">
                  <div className="font-mono text-[0.66rem] font-bold text-[#828E9E] uppercase tracking-widest mb-0.5">
                    TESTING PROTOCOL
                  </div>
                  <div className="font-heading font-bold text-[1.05rem] text-[#0E1117]">
                    Pre-Dispatch
                  </div>
                  <div className="text-[0.76rem] text-[#64748B] mt-0.5">
                    Live Benchmarked
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="border-l-2 border-black/[0.12] pl-4">
                  <div className="font-mono text-[0.66rem] font-bold text-[#828E9E] uppercase tracking-widest mb-0.5">
                    LOCAL SUPPORT
                  </div>
                  <div className="font-heading font-bold text-[1.05rem] text-[#0E1117]">
                    Showroom Desk
                  </div>
                  <div className="text-[0.76rem] text-[#64748B] mt-0.5">
                    Same-Day Assistance
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT: Supporting 3D Hardware Object (Extending Subtly Behind with Studio Lighting) (5 Columns on LG) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
              
              {/* Studio Backdrop Disc */}
              <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full bg-white border border-[#F15A24]/10 shadow-[0_8px_30px_rgba(15,23,42,0.03)] pointer-events-none" />

              {/* 3D Hardware Display with Studio Lighting */}
              <div
                ref={hardwareRef}
                className="relative z-10 w-full max-w-[360px] transition-transform duration-300 ease-out will-change-transform transform-gpu"
              >
                <img
                  src="/assets/pro_monitor.png"
                  alt="UltraVision 4K Studio Display Hardware Architecture"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_26px_42px_rgba(15,23,42,0.14)]"
                  loading="lazy"
                />
              </div>

              {/* Floating Specification Capsule */}
              <div className="absolute bottom-2 sm:bottom-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-xs flex items-center gap-2 z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
                <span className="font-mono text-[0.66rem] font-semibold text-[#0E1117]">
                  OEM Manufacturer Backing
                </span>
              </div>
            </div>

          </div>

          {/* 4. Bottom Subtle Link Action */}
          <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[0.84rem] text-[#64748B] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Public reviews verified via Google Business Profile &amp; direct client feedback</span>
            </div>

            <a
              href="https://maps.google.com/?q=Global+Computers+Eluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors duration-200 group cursor-pointer"
            >
              <span>Read Customer Reviews on Google</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
