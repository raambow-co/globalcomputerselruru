import React from 'react';
import { ShieldCheck, Headphones, Building2, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Quality Hardware',
      subtitle: '100% Genuine Certified',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      subtitle: 'Direct Tech Specialists',
    },
    {
      icon: Building2,
      title: 'Business Solutions',
      subtitle: 'Enterprise Fleet Supply',
    },
  ];

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 z-20">
      <div className="bg-white/90 backdrop-blur-xl border border-black/[0.07] rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(229,30,43,0.06)] hover:border-black/[0.12] flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Left Regional Brand Anchor */}
        <div className="flex items-center gap-3 px-3 py-1.5 w-full lg:w-auto justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-black/[0.06] lg:pr-6">
          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E51E2B] animate-ping opacity-75" />
            <span className="absolute w-2 h-2 rounded-full bg-[#E51E2B]" />
          </div>
          <div className="flex flex-col text-center lg:text-left leading-tight">
            <div className="flex items-center gap-1.5 justify-center lg:justify-start">
              <span className="font-heading font-extrabold text-[0.88rem] text-[#0E1117] tracking-tight">
                Trusted Tech Partner in Eluru
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E51E2B]" />
            </div>
            <span className="font-mono text-[0.64rem] text-[#828E9E] tracking-wider uppercase mt-0.5">
              Authorized Showroom &amp; Solutions
            </span>
          </div>
        </div>

        {/* Right Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto flex-grow">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group/item flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FFF0F1] border border-black/[0.04] hover:border-[#E51E2B]/25 transition-all duration-200 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-white group-hover/item:bg-[#E51E2B] border border-black/[0.06] group-hover/item:border-transparent flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200">
                  <Icon className="w-4 h-4 text-[#E51E2B] group-hover/item:text-white transition-colors duration-200" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-heading font-bold text-[0.82rem] text-[#0E1117] group-hover/item:text-[#E51E2B] transition-colors">
                    {item.title}
                  </span>
                  <span className="font-mono text-[0.64rem] text-[#828E9E] mt-0.5 whitespace-nowrap">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
