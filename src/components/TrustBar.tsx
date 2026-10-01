import React from 'react';
import { ShieldCheck, Headphones, Building2, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Quality Hardware',
      subtitle: '100% Genuine Certified',
      accentColor: '#10B981',
      bgHover: 'hover:bg-emerald-50/60',
      borderHover: 'hover:border-emerald-500/30',
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      subtitle: 'Direct Tech Specialists',
      accentColor: '#06B6D4',
      bgHover: 'hover:bg-cyan-50/60',
      borderHover: 'hover:border-cyan-500/30',
      iconBg: 'bg-cyan-50 text-cyan-600 group-hover/item:bg-cyan-600 group-hover/item:text-white',
    },
    {
      icon: Building2,
      title: 'Business Solutions',
      subtitle: 'Enterprise Fleet Supply',
      accentColor: '#F59E0B',
      bgHover: 'hover:bg-amber-50/60',
      borderHover: 'hover:border-amber-500/30',
      iconBg: 'bg-amber-50 text-amber-700 group-hover/item:bg-amber-500 group-hover/item:text-slate-950',
    },
  ];

  return (
    <div className="w-full max-w-[1040px] mx-auto px-4 z-20">
      <div className="bg-white/95 backdrop-blur-xl border border-black/[0.07] rounded-xl p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(241,90,36,0.08)] hover:border-orange-500/20 flex flex-col lg:flex-row items-center justify-between gap-2.5">
        
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
              <Sparkles className="w-3.5 h-3.5 text-[#F15A24] animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="font-mono text-[0.6rem] text-[#828E9E] tracking-wider uppercase mt-0.5">
              Premier Tech Showroom &amp; Solutions
            </span>
          </div>
        </div>

        {/* Right Feature Cards Grid with Colorful Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto flex-grow">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group/item flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded-lg bg-slate-50/70 ${item.bgHover} border border-black/[0.04] ${item.borderHover} transition-all duration-200 cursor-default shadow-2xs`}
              >
                <div className={`w-8 h-8 rounded-lg ${item.iconBg} border border-black/[0.06] group-hover/item:border-transparent flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200`}>
                  <Icon className="w-4 h-4 transition-colors duration-200" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-heading font-bold text-[0.78rem] text-[#0E1117] transition-colors">
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
