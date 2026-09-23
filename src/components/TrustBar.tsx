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
    <div className="w-full max-w-[1040px] mx-auto px-4 z-20">
      <div className="bg-white/90 backdrop-blur-xl border border-black/[0.07] rounded-xl p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(241, 90, 36,0.06)] hover:border-black/[0.12] flex flex-col lg:flex-row items-center justify-between gap-2.5">
        
        {/* Left Regional Brand Anchor */}
        <div className="flex items-center gap-2.5 px-2.5 py-1 w-full lg:w-auto justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-black/[0.06] lg:pr-5">
          <div className="relative flex items-center justify-center w-4 h-4 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#F15A24] animate-ping opacity-75" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-[#F15A24]" />
          </div>
          <div className="flex flex-col text-center lg:text-left leading-tight">
            <div className="flex items-center gap-1.5 justify-center lg:justify-start">
              <span className="font-heading font-extrabold text-[0.82rem] text-[#0E1117] tracking-tight">
                Trusted Tech Partner in Eluru
              </span>
              <Sparkles className="w-3 h-3 text-[#F15A24]" />
            </div>
            <span className="font-mono text-[0.6rem] text-[#828E9E] tracking-wider uppercase mt-0.5">
              Authorized Showroom &amp; Solutions
            </span>
          </div>
        </div>

        {/* Right Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto flex-grow">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group/item flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded-lg bg-slate-50/70 hover:bg-[#FFF2EB] border border-black/[0.04] hover:border-[#F15A24]/25 transition-all duration-200 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-white group-hover/item:bg-[#F15A24] border border-black/[0.06] group-hover/item:border-transparent flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200">
                  <Icon className="w-3.5 h-3.5 text-[#F15A24] group-hover/item:text-white transition-colors duration-200" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-heading font-bold text-[0.78rem] text-[#0E1117] group-hover/item:text-[#F15A24] transition-colors">
                    {item.title}
                  </span>
                  <span className="font-mono text-[0.6rem] text-[#828E9E] mt-0.5 whitespace-nowrap">
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
