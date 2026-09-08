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
      <div className="max-w-[1360px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#0E1117] rounded-lg relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-sm">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-[3px]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E51E2B] rounded-full shadow-[0_0_6px_#E51E2B]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-[1.2rem] tracking-wider text-[#0E1117]">
              GLOBAL
            </span>
            <span className="font-mono text-[0.62rem] font-semibold tracking-[0.22em] text-[#E51E2B] mt-0.5">
              COMPUTERS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { label: 'Home', href: '#' },
            { label: "What's New", href: '#updates', highlight: true },
            { label: 'Showroom Products', href: '#updates' },
            { label: 'Enterprise Fleet', href: '#updates' },
            { label: 'Eluru Showroom', href: '#updates' },
          ].map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[0.92rem] font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                idx === 0
                  ? 'text-[#0E1117] font-semibold'
                  : 'text-[#4A5364] hover:text-[#0E1117]'
              }`}
            >
              {link.highlight && <span className="w-1.5 h-1.5 bg-[#E51E2B] rounded-full animate-pulse" />}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#E51E2B]/30 text-[#E51E2B] font-semibold text-[0.88rem] transition-all duration-200 hover:bg-[#E51E2B] hover:text-white hover:shadow-[0_4px_16px_rgba(229,30,43,0.25)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 bg-[#E51E2B] rounded-full animate-ping group-hover:bg-white" />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0E1117] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-black/10 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            {['Home', 'About Global Computers', 'Products & Hardware', 'Enterprise Services', 'Client Reviews', 'Contact & Showroom'].map((label, idx) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[1.05rem] font-semibold ${
                  idx === 0 ? 'text-[#E51E2B]' : 'text-[#0E1117]'
                }`}
              >
                {label}
              </a>
            ))}
            <div className="pt-4 border-t border-black/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 bg-[#E51E2B] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-red-cta"
              >
                <span>Enquire Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
