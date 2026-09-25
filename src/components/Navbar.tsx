import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
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
            src="/assets/gce_logo.png"
            alt="Global Computer Services"
            className="h-10 sm:h-11 w-auto max-w-[190px] object-contain transition-transform duration-200 group-hover:scale-105 select-none"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { label: 'Home', href: '#' },
            { label: 'Offers & Deals', href: '#deals', highlight: true, badge: 'OFFERS' },
            { label: 'Inside Technology', href: '#technology-showcase' },
            { label: "What's New", href: '#updates' },
            { label: 'Social & QRs', href: '#social-media' },
            { label: 'Leadership', href: '#leadership' },
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

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F15A24]/30 text-[#F15A24] font-semibold text-[0.8rem] transition-all duration-200 hover:bg-[#F15A24] hover:text-white hover:shadow-[0_4px_16px_rgba(241, 90, 36,0.25)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full animate-ping group-hover:bg-white" />
            <span>Enquire Now</span>
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
              { label: 'Inside Technology', href: '#technology-showcase' },
              { label: "What's New in Tech", href: '#updates' },
              { label: 'Connect on Social Media', href: '#social-media' },
              { label: 'Founder & Leadership', href: '#leadership' },
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
            <div className="pt-4 border-t border-black/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 bg-[#F15A24] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-orange-cta text-[0.92rem]"
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
