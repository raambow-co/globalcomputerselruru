import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FAQSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const FAQSection: React.FC<FAQSectionProps> = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqsLeft: FAQItem[] = [
    {
      id: 'faq-1',
      number: '01',
      question: 'How can I check whether a product is available in stock?',
      answer:
        'Use the Check Product Availability button on the website or message us with your required model. Our Eluru showroom team will instantly confirm live inventory, pricing, and dispatch timelines.',
    },
    {
      id: 'faq-2',
      number: '02',
      question: 'Do you supply computers and hardware for businesses & offices?',
      answer:
        'Yes. We provide turnkey enterprise desktop workstation setups, school computer lab packages, and commercial hardware fleets with genuine OEM warranties and GST input tax invoices.',
    },
    {
      id: 'faq-3',
      number: '03',
      question: 'Do you provide Epson EcoTank printers and genuine ink supplies?',
      answer:
        'Yes. We are an authorized provider for Epson EcoTank all-in-one printers, heavy-duty duplex office printers, and 100% genuine replacement ink bottle sets with on-site maintenance support.',
    },
    {
      id: 'faq-4',
      number: '04',
      question: 'Can I get custom PC workstation builds, components, and 4K displays?',
      answer:
        'Yes. You can configure custom workstation builds with latest Intel/AMD processors, Z-series motherboards, GPUs, DDR5 RAM, and UltraVision color-accurate displays with free professional assembly.',
    },
    {
      id: 'faq-5',
      number: '05',
      question: 'Where is your showroom located and what are your working hours?',
      answer:
        'Our showroom is located on Main Road, Powerpet, Eluru. We are open Monday to Saturday from 9:30 AM to 8:30 PM for hardware consultation, testing, and direct sales.',
    },
  ];

  const faqsRight: FAQItem[] = [
    {
      id: 'faq-6',
      number: '06',
      question: 'Do you provide chip-level servicing and repairs for laptops?',
      answer:
        'Yes. We have in-house micro-soldering and diagnostic specialists for chip-level motherboard repairs, display panel replacements, GPU rework, and liquid damage recovery for HP, Dell, Lenovo, ASUS, and Acer.',
    },
    {
      id: 'faq-7',
      number: '07',
      question: 'Do you offer CCTV surveillance and biometric attendance installation?',
      answer:
        'Yes. We design and install commercial CCTV setups (Hikvision, CP Plus, Dahua) and biometric fingerprint/facial recognition systems (eSSL, BioMax) for offices, shops, and residences in Eluru.',
    },
    {
      id: 'faq-8',
      number: '08',
      question: 'Are all products sold with 100% genuine manufacturer warranty?',
      answer:
        'Absolutely. Every desktop, laptop, printer, and component comes brand new in factory sealed packaging with official manufacturer warranty and valid GST tax invoice.',
    },
    {
      id: 'faq-9',
      number: '09',
      question: 'Can I upgrade my existing laptop with SSD storage and RAM?',
      answer:
        'Yes. We provide same-day high-speed NVMe/SATA SSD upgrades and DDR4/DDR5 RAM expansions with complete OS migration and data preservation for immediate performance gains.',
    },
    {
      id: 'faq-10',
      number: '10',
      question: 'Do you provide Annual Maintenance Contracts (AMC) for corporate offices?',
      answer:
        'Yes. We offer comprehensive and non-comprehensive AMC plans covering regular preventive maintenance, network cabling, printer servicing, and urgent on-site technical support for business fleets.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqColumn = (items: FAQItem[]) => (
    <div className="divide-y divide-black/[0.07] border-t border-b border-black/[0.07]">
      {items.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className="py-2.5 sm:py-3 group transition-all duration-200"
          >
            {/* Question Header Button */}
            <button
              type="button"
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-3 text-left transition-transform duration-200 group-hover:translate-x-0.5 cursor-pointer focus:outline-none"
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                {/* Number Indicator */}
                <span
                  className={`font-mono text-[0.68rem] sm:text-[0.72rem] font-bold mt-0.5 transition-colors duration-200 flex-shrink-0 ${
                    isOpen
                      ? 'text-[#F15A24]'
                      : 'text-[#828E9E] group-hover:text-[#F15A24]'
                  }`}
                >
                  {faq.number}
                </span>

                {/* Question Title */}
                <span
                  className={`font-heading text-[0.88rem] sm:text-[0.92rem] tracking-tight leading-snug transition-colors duration-200 ${
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
                className={`w-5.5 h-5.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border ${
                  isOpen
                    ? 'bg-[#F15A24] text-white border-[#F15A24] shadow-2xs'
                    : 'bg-white text-[#828E9E] group-hover:text-[#0E1117] border-black/10 group-hover:border-black/20 shadow-2xs'
                }`}
              >
                {isOpen ? <Minus size={11} /> : <Plus size={11} />}
              </div>
            </button>

            {/* Smooth Collapsible Answer Container */}
            {isOpen && (
              <div className="mt-2 pl-5 sm:pl-6 pr-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="border-l-2 border-[#F15A24] pl-2.5 py-0.5">
                  <p className="text-[0.80rem] sm:text-[0.84rem] text-[#4A5364] leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="faq"
      className="relative bg-white text-[#0E1117] py-6 sm:py-10 md:py-14 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
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

        {/* Minimal Precision Corner Accents */}
        <div className="absolute top-6 left-6 sm:left-14 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13V1H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="1" r="1.5" fill="#F15A24" />
          </svg>
        </div>
        <div className="absolute top-6 right-6 sm:right-14 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 13V1H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="1" r="1.5" fill="#F15A24" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* 2. CENTERED REFINED HEADER */}
        <div className="mb-6 sm:mb-10 text-center flex flex-col items-center">
          
          {/* Pill Badge with Orange Highlight Tag */}
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-black/[0.08] shadow-xs mb-2.5 w-fit">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="bg-[#F15A24] text-white font-mono text-[0.62rem] font-black tracking-[0.16em] px-2 py-0.5 rounded-sm uppercase">
              NEED TO KNOW?
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-black text-[clamp(1.6rem,2.8vw,2.3rem)] text-[#0E1117] leading-[1.1] tracking-tight select-none">
            Questions?{' '}
            <span className="text-[#F15A24] relative inline-block pb-0.5">
              We’ve Got Answers.
              <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-[#F15A24] rounded-full" />
            </span>
          </h2>

        </div>

        {/* 3. Sleek 2-Column FAQ Grid (5 FAQs on Mobile, 10 on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Column 1 (01 - 05) - Always visible on mobile & desktop */}
          <div>
            {renderFaqColumn(faqsLeft)}
          </div>

          {/* Column 2 (06 - 10) - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block">
            {renderFaqColumn(faqsRight)}
          </div>
        </div>

      </div>
    </section>
  );
};
