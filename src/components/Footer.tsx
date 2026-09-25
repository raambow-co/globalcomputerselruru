import React from 'react';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  return (
    <footer
      id="footer"
      className="relative bg-[#080B10] text-white overflow-hidden border-t border-white/15 selection:bg-[#F15A24] selection:text-white"
    >
      {/* Main Footer Body: Clean Minimal 2-Column Composition */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 bg-[#080B10]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Brand & Showroom Summary Column (7 Columns on LG) */}
          <div className="lg:col-span-7 text-left">
            
            {/* Global Computers Logo Wordmark */}
            <a href="#" className="inline-flex items-center gap-3 group mb-4 bg-white/95 px-3.5 py-2 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
              <img
                src="/assets/gce_logo.png"
                alt="Global Computer Services"
                className="h-8 sm:h-9 w-auto object-contain select-none"
              />
            </a>

            {/* Brand Statement */}
            <div className="font-mono text-[0.76rem] font-bold text-[#FF7844] tracking-wider uppercase mb-2">
              Technology. Hardware. Solutions.
            </div>

            <p className="text-[0.92rem] text-slate-300 leading-relaxed mb-6 max-w-lg font-normal">
              Delivering verified genuine computer hardware, enterprise workstation setups, high-efficiency print fleets, and dependable technology support in Eluru.
            </p>

            {/* Quick Showroom Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[0.84rem] text-slate-200 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#FF7844] flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 font-medium leading-snug">Main Road, Powerpet, Eluru — 534002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#FF7844] flex-shrink-0" />
                <span className="text-white font-bold tracking-wide">+91 98481 23456</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-[#FF7844] flex-shrink-0" />
                <span className="text-slate-300 font-medium">Mon – Sat: 9:30 AM – 8:30 PM</span>
              </div>
            </div>

          </div>

          {/* Quick Navigation & Direct Action Column (5 Columns on LG) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <h4 className="font-mono text-[0.74rem] font-bold text-white tracking-[0.18em] uppercase mb-4 pb-2 border-b border-white/10">
              QUICK NAVIGATION
            </h4>
            
            <div className="grid grid-cols-2 gap-2.5 mb-6 text-[0.88rem]">
              {[
                { label: 'Home', href: '#' },
                { label: 'Multi-Brand Services', href: '#technology-showcase' },
                { label: 'Founder & Team', href: '#leadership' },
                { label: 'Social Media & QRs', href: '#social-media' },
                { label: 'Product Enquiry', href: '#enquiry' },
                { label: 'Eluru Showroom Map', href: '#location' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 hover:text-[#FF7844] transition-colors py-1 inline-flex items-center gap-2 group font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#F15A24] transition-colors" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* Direct Action Button */}
            <button
              type="button"
              onClick={() => onOpenEnquiry('Footer Quick Connect')}
              className="w-full px-4 py-3 bg-white/10 hover:bg-[#F15A24] text-white border border-white/20 hover:border-[#F15A24] rounded-xl font-mono text-[0.78rem] font-bold flex items-center justify-between transition-all duration-200 shadow-md cursor-pointer group"
            >
              <span className="tracking-wider">DIRECT ENQUIRY &amp; CONSULTATION DESK</span>
              <ArrowUpRight size={16} className="text-slate-300 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

      </div>

      {/* 3. Bottom Legal & Architectural Coordinate Strip (Deep Dark Theme) */}
      <div className="border-t border-white/15 bg-[#05070B] py-8">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Copyright */}
          <div className="text-[0.88rem] text-slate-300 font-medium">
            © {new Date().getFullYear()} Global Computers. All rights reserved.
          </div>

          {/* Micro Brand Technical Coordinate Badge */}
          <div className="flex items-center gap-2 text-[0.76rem] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#F15A24] shadow-[0_0_8px_#F15A24]" />
            <span className="text-white font-semibold">ELURU.AP // AUTHENTIC HARDWARE DESK</span>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex items-center gap-5 text-[0.88rem] text-slate-300 font-medium">
            <a href="#faq" className="hover:text-white transition-colors">
              Privacy Information
            </a>
            <span className="text-white/30">·</span>
            <a href="#faq" className="hover:text-white transition-colors">
              Terms &amp; Support Policy
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
