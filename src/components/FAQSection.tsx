import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, HelpCircle, MessageSquare, Minus, Plus, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  onOpenEnquiry: (topic?: string) => void;
}

interface FAQItem {
  id: string;
  number: string;
  category: 'all' | 'products' | 'availability' | 'services' | 'support';
  question: string;
  answer: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hardwareRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  // Parallax physics loop for the 3D studio motherboard/hardware
  const physicsState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      number: '01',
      category: 'availability',
      question: 'How can I check whether a product is available in stock?',
      answer:
        'Use the Check Product Availability button on the website or message us with your required model. Our Eluru showroom team will instantly confirm live inventory, pricing, and dispatch timelines.',
    },
    {
      id: 'faq-2',
      number: '02',
      category: 'services',
      question: 'Do you supply computers and hardware for businesses & offices?',
      answer:
        'Yes. We provide turnkey enterprise desktop workstation setups, school computer lab packages, and commercial hardware fleets with genuine OEM warranties and GST input tax invoices.',
    },
    {
      id: 'faq-3',
      number: '03',
      category: 'products',
      question: 'Do you provide Epson EcoTank printers and genuine ink supplies?',
      answer:
        'Yes. We are an authorized provider for Epson EcoTank all-in-one printers, heavy-duty duplex office printers, and 100% genuine replacement ink bottle sets with on-site maintenance support.',
    },
    {
      id: 'faq-4',
      number: '04',
      category: 'products',
      question: 'Can I get custom PC workstation builds, components, and 4K displays?',
      answer:
        'Yes. You can configure custom workstation builds with latest Intel/AMD processors, Z-series motherboards, GPUs, DDR5 RAM, and UltraVision color-accurate displays with free professional assembly.',
    },
    {
      id: 'faq-5',
      number: '05',
      category: 'support',
      question: 'Where is your showroom located and do you provide support?',
      answer:
        'Our showroom is on Main Road, Powerpet, Eluru. We provide dedicated hardware consultation, direct OEM warranty support, and prompt tech specialist assistance Monday to Saturday (9:30 AM – 8:30 PM).',
    },
  ];

  const filteredFaqs = faqs;

  useEffect(() => {
    // 1. Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        physicsState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Mouse Move Listener
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

    // 3. Smooth Delta-time Lerp loop
    let frameId: number;
    const renderLoop = (time: number) => {
      if (physicsState.current.isVisible) {
        const dt = Math.min((time - physicsState.current.lastTime) / 1000, 0.1);
        physicsState.current.lastTime = time;

        const ambientX = Math.sin(time * 0.0006) * 0.02;
        const ambientY = Math.cos(time * 0.0005) * 0.02;

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
          const tx = (cx * 16).toFixed(2);
          const ty = (cy * 12).toFixed(2);
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

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-24 sm:py-32 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Ambient Lighting & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.018)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="faqGrid"
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
          <rect width="100%" height="100%" fill="url(#faqGrid)" />

          {/* Large Minimal Studio Curves */}
          <circle
            cx="25%"
            cy="60%"
            r="400"
            fill="none"
            stroke="rgba(241, 90, 36, 0.03)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
        </svg>

        {/* Technical Corner Markers */}
        <div className="absolute top-12 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SEC.FAQ</span>
        </div>
        <div className="absolute top-12 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">KNOWLEDGE.DESK</span>
        </div>
        <div className="absolute bottom-10 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">CLARITY.DIRECT</span>
        </div>
        <div className="absolute bottom-10 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">ELURU.SUPPORT</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* 2. Compact Section Introduction */}
        <div className="max-w-2xl mb-16 sm:mb-20 text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-5">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
              NEED TO KNOW?
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4.2vw,3.4rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-4 select-none">
            Questions?{' '}
            <span className="text-[#F15A24] relative inline-block">
              We’ve Got Answers.
              <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Concise Supporting Text */}
          <p className="text-[1.02rem] sm:text-[1.12rem] text-[#4A5364] leading-relaxed max-w-xl font-normal">
            Find quick answers to common questions about our products, availability and technology solutions.
          </p>
        </div>

        {/* 3. Main Asymmetrical Editorial Layout (Left: Brand Statement & 3D Element; Right: Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Editorial Typography, Subtle 3D Hardware & Direct Action (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between relative lg:sticky lg:top-28">
            
            {/* Editorial Statement Typography */}
            <div className="relative z-10 mb-8">
              <h3 className="font-heading font-extrabold text-[clamp(1.85rem,3.2vw,2.75rem)] text-[#0E1117] leading-[1.14] tracking-tight mb-4">
                Let’s make<br />
                technology<br />
                <span className="text-[#F15A24] relative inline-block">
                  simple.
                  <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/20 rounded-full" />
                </span>
              </h3>

              <p className="text-[0.98rem] text-[#4A5364] leading-relaxed max-w-sm mb-6">
                Not finding what you’re looking for? Our team can help you identify the right solution for your requirements.
              </p>

              {/* Direct Text CTA Action */}
              <button
                type="button"
                onClick={() => onOpenEnquiry('General Consultation & FAQ')}
                className="group inline-flex items-center gap-2 font-mono text-[0.84rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors duration-200 cursor-pointer"
              >
                <span>Talk to Our Team</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                />
              </button>
            </div>

            {/* Subtle Studio 3D Hardware Element (Partially behind/adjacent with delicate parallax) */}
            <div className="relative my-4 flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
              
              {/* Studio Backdrop Disc */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-tr from-[#FFF2EB]/60 to-[#FAFBFD] border border-[#F15A24]/10 pointer-events-none" />

              {/* 3D Hardware Object */}
              <div
                ref={hardwareRef}
                className="relative z-10 w-full max-w-[280px] transition-transform duration-300 ease-out will-change-transform transform-gpu opacity-90"
              >
                <img
                  src="/assets/motherboard.png"
                  alt="Z790 Workstation Motherboard Architecture"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_18px_30px_rgba(15,23,42,0.11)]"
                  loading="lazy"
                />
              </div>

              {/* Micro Technical Tag */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 shadow-2xs z-20 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
                <span className="font-mono text-[0.62rem] font-medium text-[#0E1117]">
                  Hardware Consultation Desk
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Minimalist Horizontal FAQ List (7 Columns on LG) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Clean Horizontal Question Rows */}
            <div className="divide-y divide-black/[0.07]">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="py-5 sm:py-6 group transition-all duration-200"
                  >
                    {/* Question Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 text-left transition-transform duration-200 group-hover:translate-x-1 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-start gap-4">
                        {/* Number Indicator */}
                        <span
                          className={`font-mono text-[0.76rem] font-bold mt-0.5 transition-colors duration-200 ${
                            isOpen
                              ? 'text-[#F15A24]'
                              : 'text-[#828E9E] group-hover:text-[#F15A24]'
                          }`}
                        >
                          {faq.number}
                        </span>

                        {/* Question Title */}
                        <span
                          className={`font-heading text-[1.02rem] sm:text-[1.12rem] tracking-tight leading-snug transition-colors duration-200 ${
                            isOpen
                              ? 'font-bold text-[#0E1117]'
                              : 'font-semibold text-[#1C2028] group-hover:text-[#F15A24]'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Minimal Minimalist Plus/Minus Control */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border ${
                          isOpen
                            ? 'bg-[#F15A24] text-white border-[#F15A24] shadow-2xs'
                            : 'bg-white text-[#828E9E] group-hover:text-[#0E1117] border-black/10 group-hover:border-black/20 shadow-2xs'
                        }`}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>

                    {/* Smooth Collapsible Answer Container */}
                    {isOpen && (
                      <div className="mt-4 pl-9 pr-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="border-l-2 border-[#F15A24] pl-4 py-1">
                          <p className="text-[0.92rem] sm:text-[0.96rem] text-[#4A5364] leading-relaxed font-normal">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Transition Statement */}
            <div className="mt-10 pt-8 border-t border-black/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[0.92rem] font-medium text-[#4A5364]">
                Still have a question?
              </span>

              <button
                type="button"
                onClick={() => onOpenEnquiry('Direct Question / Enquiry')}
                className="group inline-flex items-center gap-2 font-mono text-[0.8rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors duration-200 cursor-pointer"
              >
                <span>Talk to Global Computers</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
