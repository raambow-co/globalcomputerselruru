import React, { useState } from 'react';
import { ArrowRight, Minus, Plus, HelpCircle, MessageSquare } from 'lucide-react';

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
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.022)_0%,rgba(255,255,255,0)_100%)]" />

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
            cx="30%"
            cy="50%"
            r="450"
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

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* 2. TOP-ALIGNED PROMINENT HEADER */}
        <div className="mb-10 sm:mb-12 text-left max-w-2xl">
          
          {/* Pill Badge with Orange Highlight Tag */}
          <div className="inline-flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-4 w-fit">
            <span className="w-3.5 h-[3px] bg-[#F15A24] rounded-full" />
            <span className="bg-[#F15A24] text-white font-mono text-[0.68rem] font-black tracking-[0.16em] px-2.5 py-0.5 rounded-sm uppercase">
              NEED TO KNOW?
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-black text-[clamp(1.85rem,3.2vw,2.6rem)] text-[#0E1117] leading-[1.08] tracking-tight select-none">
            Questions?<br />
            <span className="text-[#F15A24] relative inline-block pb-0.5">
              We’ve Got Answers.
              <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#F15A24] rounded-full" />
            </span>
          </h2>

        </div>

        {/* 3. Sleek Horizontal Accordion Cards Container */}
        <div className="max-w-4xl">
          
          {/* Clean Horizontal Question Rows */}
          <div className="divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
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
                    className="w-full flex items-start justify-between gap-6 text-left transition-transform duration-200 group-hover:translate-x-1 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Number Indicator */}
                      <span
                        className={`font-mono text-[0.78rem] sm:text-[0.84rem] font-bold mt-0.5 transition-colors duration-200 ${
                          isOpen
                            ? 'text-[#F15A24]'
                            : 'text-[#828E9E] group-hover:text-[#F15A24]'
                        }`}
                      >
                        {faq.number}
                      </span>

                      {/* Question Title */}
                      <span
                        className={`font-heading text-[1.02rem] sm:text-[1.14rem] tracking-tight leading-snug transition-colors duration-200 ${
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
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border ${
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
                    <div className="mt-4 pl-10 sm:pl-12 pr-4 sm:pr-12 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="border-l-2 border-[#F15A24] pl-4 sm:pl-5 py-1">
                        <p className="text-[0.92rem] sm:text-[0.98rem] text-[#4A5364] leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
