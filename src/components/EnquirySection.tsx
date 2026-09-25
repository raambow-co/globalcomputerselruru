import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Check, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

interface EnquirySectionProps {
  initialProduct?: string;
  onSuccess?: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  initialProduct = '',
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [requirementType, setRequirementType] = useState('Product Availability');
  const [productRequirement, setProductRequirement] = useState(initialProduct);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<string>('ALL');

  // Form validation & submission state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update requirement field when initialProduct prop changes
  useEffect(() => {
    if (initialProduct) {
      setProductRequirement(initialProduct);
      setRequirementType('Product Availability');
    }
  }, [initialProduct]);

  const quickCategories = [
    { label: 'ALL', value: 'Product Availability' },
    { label: 'PRINTERS', value: 'Printer' },
    { label: 'MONITORS', value: 'Monitor' },
    { label: 'COMPUTERS', value: 'Computer / Desktop' },
    { label: 'PERIPHERALS', value: 'Keyboard & Peripherals' },
    { label: 'COMPONENTS', value: 'Computer Components' },
  ];

  const handleQuickSelect = (cat: { label: string; value: string }) => {
    setSelectedQuickCategory(cat.label);
    setRequirementType(cat.value);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your phone number.';
    } else if (phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!productRequirement.trim()) {
      newErrors.productRequirement = 'Please specify the product or requirement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setProductRequirement('');
    setQuantity('');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section
      id="enquiry"
      className="relative bg-white text-[#0E1117] py-6 sm:py-10 md:py-14 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Ambient Lighting & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/3 left-1/4 w-[750px] h-[750px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.025)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="enquiryGrid"
              width="140"
              height="140"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 140 0 L 0 0 0 140"
                fill="none"
                stroke="rgba(15, 23, 42, 0.022)"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enquiryGrid)" />

          {/* Large Studio Spatial Curve */}
          <circle
            cx="35%"
            cy="50%"
            r="440"
            fill="none"
            stroke="rgba(241, 90, 36, 0.035)"
            strokeWidth="1.2"
            strokeDasharray="8 10"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Side-By-Side One-Screen Hero Composition (Left: Info / Story; Right: Interactive Compact Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Exactly matching requested content (5 Columns on LG) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#FAFBFD] px-3.5 py-1.5 rounded-full border border-black/[0.08] shadow-2xs mb-4 w-fit">
              <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
              <span className="font-mono text-[0.68rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
                LET’S TALK TECHNOLOGY
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading font-black text-[clamp(2.1rem,3.6vw,3.1rem)] text-[#0E1117] leading-[1.08] tracking-tight mb-4 select-none">
              Looking for a Specific Product,<br />
              <span className="text-[#F15A24] relative inline-block pb-0.5">
                Hardware or Solution?
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#F15A24]/20 rounded-full" />
              </span>
            </h2>

            {/* Supporting Description Text */}
            <p className="hidden sm:block text-[0.98rem] sm:text-[1.04rem] text-[#4A5364] leading-relaxed mb-6 font-normal">
              Looking for a specific product, computer hardware or a technology solution? Send us your requirement and our team will get back to you.
            </p>

            {/* Reassurance Points */}
            <div className="hidden sm:block space-y-2.5 pt-4 border-t border-black/[0.06]">
              <div className="flex items-center gap-2.5 text-[0.84rem] text-[#0E1117] font-medium">
                <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0" />
                <span>Instant response from our Eluru showroom desk</span>
              </div>
              <div className="flex items-center gap-2.5 text-[0.84rem] text-[#0E1117] font-medium">
                <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0" />
                <span>100% Genuine brand warranty &amp; verified stock</span>
              </div>
              <div className="flex items-center gap-2.5 text-[0.84rem] text-[#0E1117] font-medium">
                <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0" />
                <span>Enterprise GST invoices &amp; on-site tech assistance</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Compact One-Screen Form Interface (7 Columns on LG) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] rounded-3xl p-6 sm:p-8 md:p-9 border border-black/[0.07] shadow-[0_12px_40px_rgba(15,23,42,0.035)] relative overflow-hidden text-left">
            
            {/* Subtle Top-Right Accent Halo */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-[radial-gradient(circle_at_100%_0%,rgba(241,90,36,0.04),transparent_70%)] pointer-events-none" />

            {!isSubmitted ? (
              <div>
                
                {/* 1. Quick Requirement Selector Pills */}
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[0.66rem] font-bold tracking-wider text-[#0E1117] uppercase">
                      SELECT REQUIREMENT
                    </span>
                    <span className="font-mono text-[0.60rem] text-[#828E9E]">
                      QUICK PRE-FILL
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {quickCategories.map((cat) => {
                      const isSelected = selectedQuickCategory === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => handleQuickSelect(cat)}
                          className={`px-3 py-1 rounded-full font-mono text-[0.66rem] font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#0E1117] text-white shadow-2xs scale-[1.02]'
                              : 'bg-white hover:bg-slate-100 text-[#4A5364] hover:text-[#0E1117] border border-black/[0.06]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 bg-[#F15A24] rounded-full" />}
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Compact Form Grid */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    
                    {/* Full Name */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-fullname"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        FULL NAME <span className="text-[#F15A24]">*</span>
                      </label>
                      <input
                        id="enquiry-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: '' }));
                          }
                        }}
                        placeholder="Your name"
                        className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem]"
                      />
                      {errors.fullName && (
                        <span className="font-mono text-[0.62rem] text-[#F15A24] mt-1 block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-phone"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        PHONE NUMBER <span className="text-[#F15A24]">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                          }
                        }}
                        placeholder="Phone / WhatsApp number"
                        className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem]"
                      />
                      {errors.phoneNumber && (
                        <span className="font-mono text-[0.62rem] text-[#F15A24] mt-1 block">
                          {errors.phoneNumber}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Product Requirement & Requirement Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    
                    {/* Product Requirement */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-product"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        PRODUCT / MODEL <span className="text-[#F15A24]">*</span>
                      </label>
                      <input
                        id="enquiry-product"
                        type="text"
                        required
                        value={productRequirement}
                        onChange={(e) => {
                          setProductRequirement(e.target.value);
                          if (errors.productRequirement) {
                            setErrors((prev) => ({ ...prev, productRequirement: '' }));
                          }
                        }}
                        placeholder="e.g. Epson L3250, Dell Latitude..."
                        className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem]"
                      />
                      {errors.productRequirement && (
                        <span className="font-mono text-[0.62rem] text-[#F15A24] mt-1 block">
                          {errors.productRequirement}
                        </span>
                      )}
                    </div>

                    {/* Requirement Type */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-type"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        CATEGORY TYPE
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-type"
                          value={requirementType}
                          onChange={(e) => setRequirementType(e.target.value)}
                          className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem] appearance-none pr-8 cursor-pointer"
                        >
                          <option value="Product Availability">Product Availability</option>
                          <option value="Computer / Desktop">Computer / Desktop</option>
                          <option value="Printer">Printer</option>
                          <option value="Monitor">Monitor</option>
                          <option value="Keyboard & Peripherals">Keyboard &amp; Peripherals</option>
                          <option value="Computer Components">Computer Components</option>
                          <option value="Business Requirement">Business Requirement</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828E9E] pointer-events-none"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Quantity & Optional Note */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    
                    <div className="sm:col-span-1 relative group">
                      <label
                        htmlFor="enquiry-quantity"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        QTY <span className="text-[#828E9E] font-normal lowercase">(opt)</span>
                      </label>
                      <input
                        id="enquiry-quantity"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="1, 5..."
                        className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem]"
                      />
                    </div>

                    <div className="sm:col-span-2 relative group">
                      <label
                        htmlFor="enquiry-message"
                        className="block font-mono text-[0.64rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                      >
                        SPECIFIC NOTE <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        id="enquiry-message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any extra requirements..."
                        className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/15 focus:outline-none transition-all duration-200 text-[0.90rem]"
                      />
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.92rem] tracking-tight rounded-xl flex items-center justify-center gap-2 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                    >
                      <span>
                        {isSubmitting ? 'Sending Requirement...' : 'Send Requirement'}
                      </span>
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <div className="mt-2.5 flex items-center justify-between text-[0.72rem] text-[#828E9E]">
                      <span>Instant confirmation from our showroom desk.</span>
                      <span className="font-mono text-[#F15A24] font-medium">Powerpet, Eluru</span>
                    </div>
                  </div>

                </form>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="py-6 text-left animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#F15A24] shadow-xs mb-4">
                  <CheckCircle2 size={24} className="text-[#F15A24]" />
                </div>

                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
                  <span className="font-mono text-[0.66rem] font-bold text-[#F15A24] tracking-wider uppercase">
                    REQUIREMENT LOGGED
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-[1.4rem] text-[#0E1117] leading-tight mb-2">
                  Thank You, {fullName}!
                </h3>

                <p className="text-[0.90rem] text-[#4A5364] leading-relaxed mb-4">
                  Your requirement for <strong className="text-[#0E1117]">{productRequirement}</strong> has been received. We will contact you at <strong className="text-[#0E1117]">{phoneNumber}</strong> shortly.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 font-mono text-[0.76rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors cursor-pointer"
                >
                  <span>Submit Another Requirement →</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
