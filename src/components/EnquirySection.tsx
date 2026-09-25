import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

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
    { label: 'BUSINESS REQUIREMENTS', value: 'Business Requirement' },
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
      className="relative bg-white text-[#0E1117] py-20 sm:py-28 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Ambient Lighting & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.022)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
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

          {/* Large Studio Spatial Curves */}
          <circle
            cx="50%"
            cy="45%"
            r="480"
            fill="none"
            stroke="rgba(241, 90, 36, 0.035)"
            strokeWidth="1.2"
            strokeDasharray="8 10"
          />
        </svg>

        {/* Technical Corner Markers */}
        <div className="absolute top-12 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SEC.ENQUIRY</span>
        </div>
        <div className="absolute top-12 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">CONSULTATION.DIRECT</span>
        </div>
        <div className="absolute bottom-10 left-8 sm:left-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">SHOWROOM.ELURU</span>
        </div>
        <div className="absolute bottom-10 right-8 sm:right-14 font-mono text-[0.66rem] tracking-widest text-[#9AA5B5]">
          + <span className="text-[#64748B]">DISPATCH.READY</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* 2. Centered Section Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-4 w-fit">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.70rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
              LET’S TALK TECHNOLOGY
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.2rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-4 select-none">
            Looking for a Specific Product,<br />
            <span className="text-[#F15A24] relative inline-block pb-0.5">
              Hardware or Solution?
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#F15A24]/20 rounded-full" />
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[1.02rem] sm:text-[1.1rem] text-[#4A5364] leading-relaxed font-normal">
            Looking for a specific product, computer hardware or a technology solution? Send us your requirement and our team will get back to you.
          </p>
        </div>

        {/* 3. Centered Sleek Form Card */}
        <div className="max-w-3xl mx-auto bg-[#FAFBFD] rounded-3xl p-6 sm:p-10 md:p-12 border border-black/[0.07] shadow-[0_16px_50px_rgba(15,23,42,0.035)] relative overflow-hidden">
          
          {/* Subtle Top-Right Orange Glow Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_0%,rgba(241,90,36,0.04),transparent_70%)] pointer-events-none" />

          {!isSubmitted ? (
            <div>
              
              {/* 1. Quick Requirement Selector */}
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[0.68rem] font-bold tracking-wider text-[#0E1117] uppercase">
                    WHAT CAN WE HELP YOU WITH?
                  </span>
                  <span className="font-mono text-[0.62rem] text-[#828E9E]">
                    SELECT TO PRE-FILL
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickCategories.map((cat) => {
                    const isSelected = selectedQuickCategory === cat.label;
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => handleQuickSelect(cat)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-[0.68rem] font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
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

              {/* 2. Main Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 text-left">
                
                {/* Full Name & Phone Number Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  
                  {/* Full Name */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-fullname"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
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
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem]"
                    />
                    {errors.fullName && (
                      <span className="font-mono text-[0.64rem] text-[#F15A24] mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-phone"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
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
                      placeholder="Your phone number"
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem]"
                    />
                    {errors.phoneNumber && (
                      <span className="font-mono text-[0.64rem] text-[#F15A24] mt-1 block">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>

                </div>

                {/* Email Address & Requirement Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  
                  {/* Email Address */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-email"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                    >
                      EMAIL ADDRESS <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem]"
                    />
                  </div>

                  {/* Requirement Type */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-type"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                    >
                      REQUIREMENT TYPE
                    </label>
                    <div className="relative">
                      <select
                        id="enquiry-type"
                        value={requirementType}
                        onChange={(e) => setRequirementType(e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem] appearance-none pr-8 cursor-pointer"
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
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#828E9E] pointer-events-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Product / Requirement & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
                  
                  {/* Product / Requirement Title */}
                  <div className="sm:col-span-2 relative group">
                    <label
                      htmlFor="enquiry-product"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                    >
                      PRODUCT / REQUIREMENT <span className="text-[#F15A24]">*</span>
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
                      placeholder="Tell us what product or solution you’re looking for"
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem]"
                    />
                    {errors.productRequirement && (
                      <span className="font-mono text-[0.64rem] text-[#F15A24] mt-1 block">
                        {errors.productRequirement}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-quantity"
                      className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                    >
                      QUANTITY <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="enquiry-quantity"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 1, 5, 20"
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem]"
                    />
                  </div>

                </div>

                {/* Additional Details Message */}
                <div className="relative group">
                  <label
                    htmlFor="enquiry-message"
                    className="block font-mono text-[0.66rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1 transition-colors duration-200"
                  >
                    ADDITIONAL DETAILS <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add any additional details about your workspace, model requirement, or specific configuration..."
                    className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.94rem] resize-none"
                  />
                </div>

                {/* Submit Action Button & Subtext */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.96rem] tracking-tight rounded-xl flex items-center justify-center gap-2.5 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                  >
                    <span>
                      {isSubmitting ? 'Submitting Requirement...' : 'Submit Requirement'}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/30">
                      <ArrowRight size={13} />
                    </div>
                  </button>

                  <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[0.76rem] text-[#64748B]">
                    <span>Our team will review your requirement and reach out shortly.</span>
                    <span className="text-[#828E9E] font-mono text-[0.70rem]">
                      100% Genuine Certified Hardware Desk
                    </span>
                  </div>
                </div>

              </form>
            </div>
          ) : (
            /* Premium Confirmation State */
            <div className="py-6 text-left animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#F15A24] shadow-xs mb-5">
                <CheckCircle2 size={24} className="text-[#F15A24]" />
              </div>

              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
                <span className="font-mono text-[0.68rem] font-bold text-[#F15A24] tracking-wider uppercase">
                  REQUIREMENT RECEIVED
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] text-[#0E1117] leading-tight mb-2">
                Thank You, {fullName}!
              </h3>

              <p className="text-[0.95rem] text-[#4A5364] leading-relaxed max-w-lg mb-6">
                Your requirement for <strong className="text-[#0E1117]">{productRequirement}</strong> has been logged. Our Eluru team will contact you at <strong className="text-[#0E1117]">{phoneNumber}</strong> shortly.
              </p>

              {/* Summary Snapshot Card */}
              <div className="bg-white rounded-2xl p-4 border border-black/[0.06] mb-6 max-w-md space-y-1.5">
                <div className="flex justify-between text-[0.82rem]">
                  <span className="text-[#828E9E] font-mono">Contact Phone:</span>
                  <span className="text-[#0E1117] font-semibold">{phoneNumber}</span>
                </div>
                <div className="flex justify-between text-[0.82rem]">
                  <span className="text-[#828E9E] font-mono">Requirement:</span>
                  <span className="text-[#0E1117] font-semibold">{requirementType}</span>
                </div>
                {quantity && (
                  <div className="flex justify-between text-[0.82rem]">
                    <span className="text-[#828E9E] font-mono">Requested Quantity:</span>
                    <span className="text-[#0E1117] font-semibold">{quantity}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors cursor-pointer"
                >
                  <span>Submit Another Requirement →</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
