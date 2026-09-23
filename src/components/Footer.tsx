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
      {/* Main Footer Body: Well Dispersed 4-Column Grid */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 bg-[#080B10]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Brand & Showroom Summary Column (4 Columns on LG) */}
          <div className="lg:col-span-4 text-left">
            
            {/* Global Computers Logo Wordmark */}
            <a href="#" className="inline-flex items-center gap-3 group mb-5 bg-white/95 px-3.5 py-2 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
              <img
                src="/assets/gce_logo.png"
                alt="Global Computer Services"
                className="h-9 sm:h-10 w-auto object-contain select-none"
              />
            </a>

            {/* Brand Statement */}
            <div className="font-mono text-[0.78rem] font-bold text-[#FF7844] tracking-wider uppercase mb-3">
              Technology. Hardware. Solutions.
            </div>

            <p className="text-[0.96rem] text-slate-200 leading-relaxed mb-6 max-w-sm font-normal">
              Delivering verified genuine computer hardware, enterprise workstation setups, high-efficiency print fleets, and dependable technology support in Eluru.
            </p>

            {/* Quick Showroom Metadata */}
            <div className="space-y-3 text-[0.88rem] text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF7844] flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 font-medium leading-snug">Main Road, Powerpet, Eluru — 534002</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF7844] flex-shrink-0" />
                <span className="text-white font-bold tracking-wide">+91 98481 23456</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#FF7844] flex-shrink-0" />
                <span className="text-slate-300 font-medium">Mon – Sat: 9:30 AM – 8:30 PM</span>
              </div>
            </div>

          </div>

          {/* Column 1: Explore (2 Columns on LG) */}
          <div className="lg:col-span-2 text-left sm:pl-2">
            <h4 className="font-mono text-[0.78rem] font-bold text-white tracking-[0.18em] uppercase mb-5 pb-2 border-b border-white/10">
              EXPLORE
            </h4>
            <ul className="space-y-3.5 text-[0.94rem]">
              {[
                { label: 'Home', href: '#' },
                { label: 'Inside Technology', href: '#technology-showcase' },
                { label: "What's New in Tech", href: '#updates' },
                { label: 'Customer Experiences', href: '#reviews' },
                { label: 'Verified Ratings', href: '#trust-ratings' },
                { label: 'Eluru Showroom', href: '#location' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#F15A24] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Technology (3 Columns on LG) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-[0.78rem] font-bold text-white tracking-[0.18em] uppercase mb-5 pb-2 border-b border-white/10">
              TECHNOLOGY
            </h4>
            <ul className="space-y-3.5 text-[0.94rem]">
              {[
                { label: 'Epson EcoTank Fleet Printers', href: '#technology-showcase' },
                { label: 'UltraVision 4K Studio Displays', href: '#technology-showcase' },
                { label: 'AeroCNC Precision Keyboards', href: '#technology-showcase' },
                { label: 'Z790 Workstation Motherboards', href: '#technology-showcase' },
                { label: 'Apex RTX Studio Graphics / GPUs', href: '#technology-showcase' },
                { label: 'Vanguard High-Speed DDR5 Memory', href: '#technology-showcase' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#F15A24] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Inquiry (3 Columns on LG) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-[0.78rem] font-bold text-white tracking-[0.18em] uppercase mb-5 pb-2 border-b border-white/10">
              CONNECT
            </h4>
            <ul className="space-y-3.5 text-[0.94rem] mb-6">
              {[
                { label: 'Check Product Availability', href: '#enquiry' },
                { label: 'Frequently Asked Questions', href: '#faq' },
                { label: 'Get Physical Directions', href: '#location' },
                { label: 'Hardware Consultation Desk', href: '#enquiry' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#F15A24] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => onOpenEnquiry('Footer Quick Connect')}
              className="w-full px-4 py-3 bg-white/10 hover:bg-[#F15A24] text-white border border-white/20 hover:border-[#F15A24] rounded-xl font-mono text-[0.78rem] font-bold flex items-center justify-between transition-all duration-200 shadow-md cursor-pointer group"
            >
              <span className="tracking-wider">DIRECT ENQUIRY DESK</span>
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
