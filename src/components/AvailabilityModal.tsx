import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  initialProduct = '',
}) => {
  const [category, setCategory] = useState('printers');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [timeline, setTimeline] = useState('immediate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setModel(initialProduct);
      const lower = initialProduct.toLowerCase();
      if (lower.includes('printer') || lower.includes('epson')) {
        setCategory('printers');
      } else if (lower.includes('monitor') || lower.includes('display')) {
        setCategory('displays');
      } else if (lower.includes('gpu') || lower.includes('graphics')) {
        setCategory('gpus');
      } else if (lower.includes('keyboard')) {
        setCategory('accessories');
      } else {
        setCategory('components');
      }
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const catPrefix = category.slice(0, 3).toUpperCase();
    setTrackingId(`GC-${randomCode}-${catPrefix}`);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setModel('');
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full animate-pulse" />
              <span className="font-mono text-[0.68rem] font-bold tracking-widest text-[#F15A24] uppercase">
                SHOWROOM INVENTORY ENQUIRY
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-[#0E1117]">
              Check Product Availability
            </h2>
            <p className="text-[0.86rem] text-[#4A5364] mt-1">
              Verify real-time warehouse availability &amp; commercial dispatch timeline.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#828E9E] hover:text-[#0E1117] hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                  Product Category <span className="text-[#F15A24]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  required
                >
                  <option value="printers">Epson EcoTank &amp; Precision Fleet Printers</option>
                  <option value="displays">Professional 4K &amp; Ultra-Wide Displays</option>
                  <option value="gpus">Enterprise Workstation Graphics Cards (RTX)</option>
                  <option value="components">Core Hardware (Motherboards, DDR5 RAM, Cooling)</option>
                  <option value="workstations">Complete Desktop &amp; Workstation Systems</option>
                  <option value="accessories">Custom Keyboards &amp; Peripherals</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                  Specific Hardware Model / Requirements
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., Epson EcoTank Pro ET-5850 or RTX 24GB Studio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Required Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  >
                    <option value="1">1 Unit (Single Item)</option>
                    <option value="2-5">2 - 5 Units (Team Setup)</option>
                    <option value="6-20">6 - 20 Units (Department)</option>
                    <option value="20+">20+ Units (Enterprise Fleet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Procurement Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  >
                    <option value="immediate">Immediate / Same-Day Dispatch</option>
                    <option value="this-week">Within This Week</option>
                    <option value="this-month">Planned This Month</option>
                    <option value="rfp">Quarterly Corporate Purchase</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 pb-1 border-t border-black/[0.06]">
                <span className="font-mono text-[0.72rem] font-semibold tracking-wider text-[#828E9E] uppercase">
                  Contact Information
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Your Name <span className="text-[#F15A24]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Business Email <span className="text-[#F15A24]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Phone Number <span className="text-[#F15A24]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[0.84rem] font-semibold text-[#0E1117] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-[0.92rem] text-[#0E1117] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Showroom Guarantee Box */}
              <div className="flex items-start gap-3 bg-[#FFF2EB] border border-[#F15A24]/20 rounded-xl p-3.5 text-left">
                <ShieldCheck className="w-5 h-5 text-[#F15A24] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[0.82rem] text-[#F15A24] block font-semibold">
                    Official Showroom Guarantee
                  </strong>
                  <p className="text-[0.78rem] text-[#4A5364] leading-snug">
                    Direct OEM warranty, sealed units, and pre-dispatch physical inspection available.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F15A24] hover:bg-[#D94814] text-white font-semibold text-[0.98rem] rounded-xl flex items-center justify-center gap-2 shadow-orange-cta transition-all hover:shadow-orange-hover hover:-translate-y-0.5"
              >
                <span>Request Availability Status</span>
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#FFF2EB] text-[#F15A24] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#0E1117] mb-2">
                Availability Request Logged
              </h3>
              <p className="text-[0.92rem] text-[#4A5364] max-w-md mx-auto mb-6">
                Our inventory team is verifying physical showroom &amp; warehouse stock. A formal confirmation report will be delivered to <strong>{email}</strong>.
              </p>

              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 inline-flex flex-col gap-1 mb-6">
                <span className="font-mono text-[0.68rem] text-[#828E9E] font-semibold tracking-wider">
                  ENQUIRY TRACKING ID
                </span>
                <span className="font-mono text-xl font-bold text-[#F15A24]">
                  {trackingId}
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#0E1117] font-semibold rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
