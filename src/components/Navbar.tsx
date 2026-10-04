import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.04)] border-b border-black/[0.08]'
          : 'bg-white/80 backdrop-blur-md border-b border-black/[0.05]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <a href="#" className="flex items-center gap-2 group py-1">
          <img
            src="/assets/gce_logo.webp"
            alt="Global Computer Services"
            className="h-10 sm:h-11 w-auto max-w-[190px] object-contain transition-transform duration-200 group-hover:scale-105 select-none"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5">
          {[
            { label: 'Home', href: '#' },
            { label: 'Offers & Deals', href: '#deals', highlight: true, badge: 'OFFERS' },
            { label: 'Brands We Service', href: '#technology-showcase' },
            { label: 'Client Reviews', href: '#reviews' },
            { label: 'Showroom Gallery', href: '#gallery' },
            { label: 'Social & QRs', href: '#social-media' },
            { label: 'Founder & Team', href: '#leadership' },
            { label: 'Enquiry', href: '#enquiry' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Eluru Showroom', href: '#location' },
          ].map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[0.84rem] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                idx === 0
                  ? 'text-[#0E1117] font-semibold'
                  : 'text-[#4A5364] hover:text-[#0E1117]'
              }`}
            >
              {link.highlight && <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full animate-pulse" />}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin Portal Button */}
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0E1117] font-mono text-[0.72rem] font-bold border border-black/10 transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Open Admin Desk (Alt+A)"
            >
              <ShieldCheck size={13} className="text-[#F15A24]" />
              <span className="hidden lg:inline">Admin Desk</span>
            </button>
          )}

          {/* Enquire CTA */}
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-[#0E1117] font-bold text-[0.80rem] tracking-tight transition-all duration-300 shadow-[0_4px_16px_rgba(245,158,11,0.38)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 bg-[#0E1117] rounded-full animate-ping" />
            <span>Enquire Now</span>
            <ArrowRight size={13} className="text-[#0E1117] group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0E1117] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-black/10 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            {[
              { label: 'Home', href: '#' },
              { label: 'Special Offers & Deals', href: '#deals' },
              { label: 'Brands We Service', href: '#technology-showcase' },
              { label: 'Client Video Reviews', href: '#reviews' },
              { label: 'Showroom Hardware Gallery', href: '#gallery' },
              { label: 'Connect on Social Media', href: '#social-media' },
              { label: 'Founder & Leadership', href: '#leadership' },
              { label: 'Consultation & Enquiry', href: '#enquiry' },
              { label: 'Frequently Asked Questions', href: '#faq' },
              { label: 'Eluru Showroom & Location', href: '#location' },
            ].map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[1rem] font-semibold ${
                  idx === 0 ? 'text-[#F15A24]' : 'text-[#0E1117]'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0E1117] rounded-xl font-mono text-[0.82rem] font-bold flex items-center justify-center gap-2 border border-black/10 cursor-pointer"
              >
                <ShieldCheck size={16} className="text-[#F15A24]" />
                <span>Admin Management Desk</span>
              </button>
            )}

            <div className="pt-2 border-t border-black/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-[#0E1117] rounded-xl font-bold flex items-center justify-center gap-2 shadow-yellow-cta text-[0.92rem] cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
