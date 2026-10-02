import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 26, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export const FloatingContactWidget: React.FC = () => {
  const [hoveredBtn, setHoveredBtn] = useState<'call' | 'whatsapp' | null>(null);

  const phoneNumber = '+917093897614';
  const whatsappUrl = 'https://wa.me/917093897614?text=Hi%20Global%20Computers,%20I%20would%20like%20to%20inquire%20about%20products,%20pricing%20and%20tech%20support';

  return (
    <aside aria-label="Quick contact links" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none">
      
      {/* 1. Classic Blue Phone Call Action Button */}
      <div className="relative flex items-center">
        {/* Tooltip on Hover */}
        <div
          role="tooltip"
          className={`hidden sm:flex absolute right-16 items-center bg-[#0E1117] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hoveredBtn === 'call' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span>Call: <strong className="font-semibold text-blue-400">+91 70938 97614</strong></span>
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0E1117] rotate-45" />
        </div>

        {/* Button */}
        <a
          href={`tel:${phoneNumber}`}
          aria-label="Call Global Computers at +91 70938 97614"
          onMouseEnter={() => setHoveredBtn('call')}
          onMouseLeave={() => setHoveredBtn(null)}
          className="group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0066FF] hover:bg-[#0055DD] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,102,255,0.32)] hover:shadow-[0_12px_24px_rgba(0,102,255,0.42)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-hidden focus:ring-3 focus:ring-blue-300"
        >
          <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 group-hover:scale-110" />
        </a>
      </div>

      {/* 2. Classic Green WhatsApp Action Button */}
      <div className="relative flex items-center">
        {/* Tooltip on Hover */}
        <div
          role="tooltip"
          className={`hidden sm:flex absolute right-16 items-center bg-[#0E1117] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hoveredBtn === 'whatsapp' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span>Chat on <strong className="font-semibold text-emerald-400">WhatsApp</strong></span>
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0E1117] rotate-45" />
        </div>

        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat directly on WhatsApp"
          onMouseEnter={() => setHoveredBtn('whatsapp')}
          onMouseLeave={() => setHoveredBtn(null)}
          className="group w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20BD58] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.32)] hover:shadow-[0_12px_24px_rgba(37,211,102,0.42)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-hidden focus:ring-3 focus:ring-emerald-300"
        >
          <WhatsAppIcon size={26} className="transition-transform duration-200 group-hover:scale-110" />
        </a>
      </div>

    </aside>
  );
};
