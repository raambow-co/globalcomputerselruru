import React, { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';

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
  const [openId, setOpenId] = useState<string | null>('faq-1');

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

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-white text-[#0E1117] py-20 sm:py-28 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Ambient Lighting & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.018)_0%,rgba(255,255,255,0)_100%)]" />

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
        
        {/* 2. Main 2-Column Editorial Layout (Left: Exact Screenshot Header & Support Card; Right: 5 FAQs Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Exactly matching the uploaded design */}
          <div className="lg:col-span-5 flex flex-col justify-start relative lg:sticky lg:top-28 text-left">
            
            {/* Pill Badge with Orange Highlight Tag */}
            <div className="inline-flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-6 w-fit">
              <span className="w-3.5 h-[3px] bg-[#F15A24] rounded-full" />
              <span className="bg-[#F15A24] text-white font-mono text-[0.70rem] font-black tracking-[0.18em] px-2.5 py-0.5 rounded-sm uppercase">
                NEED TO KNOW?
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading font-black text-[clamp(2.4rem,4.4vw,3.8rem)] text-[#0E1117] leading-[1.04] tracking-tight mb-6 select-none">
              Questions?<br />
              <span className="text-[#F15A24] relative inline-block pb-1">
                We’ve Got Answers.
                <span className="absolute left-0 bottom-0 w-full h-[3.5px] bg-[#F15A24] rounded-full" />
              </span>
            </h2>

            {/* Supporting Help Card */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-black/[0.06] p-5 max-w-sm shadow-2xs mt-2">
              <p className="text-[0.92rem] text-[#4A5364] leading-relaxed mb-4 font-normal">
                Looking for specific hardware pricing, bulk supply, or custom build assistance? Our specialists are ready to help.
              </p>

              <button
                type="button"
                onClick={() => onOpenEnquiry('General Consultation & FAQ')}
                className="group inline-flex items-center gap-2 font-mono text-[0.82rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors duration-200 cursor-pointer"
              >
                <span>Talk to Our Specialists</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Clean Minimalist 5 FAQ Accordion List (7 Columns on LG) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Clean Horizontal Question Rows */}
            <div className="divide-y divide-black/[0.07]">
              {faqs.map((faq) => {
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

                      {/* Minimalist Plus/Minus Control */}
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
            <div className="mt-8 pt-6 border-t border-black/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[0.90rem] font-medium text-[#4A5364]">
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
