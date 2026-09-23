import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';

interface EnquirySectionProps {
  initialProduct?: string;
  onSuccess?: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  initialProduct = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hardwareRef = useRef<HTMLDivElement>(null);

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

  // Parallax physics state
  const parallaxState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  useEffect(() => {
    // 1. Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        parallaxState.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      parallaxState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      parallaxState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        const touch = e.touches[0];
        parallaxState.current.targetX = (touch.clientX - innerWidth / 2) / (innerWidth / 2);
        parallaxState.current.targetY = (touch.clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 3. Smooth Delta-time Lerp loop
    let frameId: number;
    const renderLoop = (time: number) => {
      if (parallaxState.current.isVisible) {
        const dt = Math.min((time - parallaxState.current.lastTime) / 1000, 0.1);
        parallaxState.current.lastTime = time;

        const ambientX = Math.sin(time * 0.0006) * 0.025;
        const ambientY = Math.cos(time * 0.0005) * 0.025;

        const targetX = parallaxState.current.targetX + ambientX;
        const targetY = parallaxState.current.targetY + ambientY;

        const lerpFactor = 1 - Math.pow(0.002, dt);
        parallaxState.current.currentX +=
          (targetX - parallaxState.current.currentX) * lerpFactor;
        parallaxState.current.currentY +=
          (targetY - parallaxState.current.currentY) * lerpFactor;

        if (hardwareRef.current) {
          const cx = parallaxState.current.currentX;
          const cy = parallaxState.current.currentY;
          const tx = (cx * 20).toFixed(2);
          const ty = (cy * 14).toFixed(2);
          const rx = (-cy * 5).toFixed(2);
          const ry = (cx * 5).toFixed(2);

          hardwareRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

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
    // Simulate instantaneous verified dispatch
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
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-24 sm:py-32 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. White Studio Ambient Lighting & Technical Coordinate Geometry */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Directional Lighting */}
        <div className="absolute top-1/3 left-1/3 w-[800px] h-[800px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241, 90, 36,0.022)_0%,rgba(255,255,255,0)_100%)]" />

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
            cx="25%"
            cy="48%"
            r="440"
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

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* 2. Section Transition & Eyebrow */}
        <div className="max-w-2xl mb-14 sm:mb-18 text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-xs mb-5">
            <span className="w-2.5 h-[2.5px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-[#F15A24] uppercase">
              LET’S TALK TECHNOLOGY
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4.4vw,3.6rem)] text-[#0E1117] leading-[1.08] tracking-tight mb-4 select-none">
            Looking for Something?<br />
            <span className="text-[#0E1117]">Tell us </span>
            <span className="text-[#F15A24] relative inline-block">
              what you need.
              <span className="absolute left-0 bottom-1 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-[1.02rem] sm:text-[1.12rem] text-[#4A5364] leading-relaxed max-w-xl font-normal">
            Looking for a specific product, computer hardware or a technology solution? Send us your requirement and our team will get back to you.
          </p>
        </div>

        {/* 3. Main Two-Sided Composition (Left: Editorial Story & 3D Hardware; Right: Consultation Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Large Typography, Realistic 3D Hardware & Showroom Details (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col justify-between relative lg:sticky lg:top-28">
            
            {/* Editorial Statement */}
            <div className="mb-6">
              <h3 className="font-heading font-extrabold text-[clamp(1.75rem,2.8vw,2.4rem)] text-[#0E1117] leading-[1.15] tracking-tight mb-3">
                Tell us what<br />
                you’re looking for.
              </h3>
              <p className="text-[0.94rem] text-[#4A5364] leading-relaxed">
                Whether you need a single printer replacement, custom multi-monitor workstation, or complete enterprise fleet hardware in Eluru, our showroom specialists can assist directly.
              </p>
            </div>

            {/* 3D Hardware Composition in White Studio Environment */}
            <div className="relative my-4 flex items-center justify-center min-h-[260px] sm:min-h-[310px]">
              
              {/* Studio Backdrop Halo */}
              <div className="absolute w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full bg-gradient-to-b from-[#FFF2EB]/70 via-white to-[#FAFBFD] border border-[#F15A24]/10 pointer-events-none" />

              {/* 3D Hardware Objects Layer */}
              <div
                ref={hardwareRef}
                className="relative z-10 w-full max-w-[360px] transition-transform duration-300 ease-out will-change-transform transform-gpu"
              >
                {/* Foreground Hero Product: Epson Printer */}
                <img
                  src="/assets/epson_printer.png"
                  alt="Epson EcoTank Pro Precision Printing"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_24px_38px_rgba(15,23,42,0.13)]"
                  loading="lazy"
                />
              </div>

              {/* Minimal Annotation Pill */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-xs flex items-center gap-2 z-20 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
                <span className="font-mono text-[0.66rem] font-semibold text-[#0E1117]">
                  Same-Day Physical Verification
                </span>
              </div>
            </div>

            {/* Concise Showroom Contact Strip */}
            <div className="mt-6 pt-6 border-t border-black/[0.06] space-y-3">
              <div className="flex items-center gap-3 text-[0.88rem] text-[#4A5364]">
                <div className="w-7 h-7 rounded-lg bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0">
                  <Phone size={14} />
                </div>
                <span>Showroom Desk: <strong className="text-[#0E1117] font-semibold">+91 98481 23456</strong></span>
              </div>

              <div className="flex items-center gap-3 text-[0.88rem] text-[#4A5364]">
                <div className="w-7 h-7 rounded-lg bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Main Road Showroom, Eluru, Andhra Pradesh</span>
              </div>

              <div className="flex items-center gap-3 text-[0.88rem] text-[#4A5364]">
                <div className="w-7 h-7 rounded-lg bg-[#FAFBFD] border border-black/[0.06] flex items-center justify-center text-[#F15A24] flex-shrink-0">
                  <Clock size={14} />
                </div>
                <span>Mon – Sat: 9:30 AM – 8:30 PM</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Consultation & Enquiry Interface (7 Columns on LG) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-[0_12px_45px_rgba(15,23,42,0.035)] relative overflow-hidden">
            
            {/* Subtle Top-Right Red Halo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_0%,rgba(241, 90, 36,0.04),transparent_70%)] pointer-events-none" />

            {!isSubmitted ? (
              <div>
                
                {/* 1. Quick Requirement Selector */}
                <div className="mb-10">
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-[0.7rem] font-bold tracking-wider text-[#0E1117] uppercase">
                      WHAT CAN WE HELP YOU WITH?
                    </span>
                    <span className="font-mono text-[0.64rem] text-[#828E9E]">
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
                          className={`px-3.5 py-1.5 rounded-full font-mono text-[0.7rem] font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#0E1117] text-white shadow-2xs'
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

                {/* 2. Main Editorial Form (Clean Bottom-Border Horizontal Fields) */}
                <form onSubmit={handleSubmit} className="space-y-7">
                  
                  {/* Full Name & Phone Number Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    
                    {/* Full Name */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-fullname"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
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
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem]"
                      />
                      {errors.fullName && (
                        <span className="font-mono text-[0.66rem] text-[#F15A24] mt-1 block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-phone"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
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
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem]"
                      />
                      {errors.phoneNumber && (
                        <span className="font-mono text-[0.66rem] text-[#F15A24] mt-1 block">
                          {errors.phoneNumber}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Email Address & Requirement Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    
                    {/* Email Address */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-email"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
                      >
                        EMAIL ADDRESS <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="Your email address"
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem]"
                      />
                    </div>

                    {/* Requirement Type */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-type"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
                      >
                        REQUIREMENT TYPE
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-type"
                          value={requirementType}
                          onChange={(e) => setRequirementType(e.target.value)}
                          className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem] appearance-none pr-8 cursor-pointer"
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
                          size={16}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#828E9E] pointer-events-none"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Product / Requirement & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    
                    {/* Product / Requirement Title */}
                    <div className="sm:col-span-2 relative group">
                      <label
                        htmlFor="enquiry-product"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
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
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem]"
                      />
                      {errors.productRequirement && (
                        <span className="font-mono text-[0.66rem] text-[#F15A24] mt-1 block">
                          {errors.productRequirement}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="relative group">
                      <label
                        htmlFor="enquiry-quantity"
                        className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
                      >
                        QUANTITY <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        id="enquiry-quantity"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 1, 5, 20"
                        className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem]"
                      />
                    </div>

                  </div>

                  {/* Additional Details Message */}
                  <div className="relative group">
                    <label
                      htmlFor="enquiry-message"
                      className="block font-mono text-[0.68rem] font-bold text-[#4A5364] group-focus-within:text-[#F15A24] uppercase tracking-wider mb-1.5 transition-colors duration-200"
                    >
                      ADDITIONAL DETAILS <span className="text-[#828E9E] font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add any additional details about your workspace, intended use, or specific configuration..."
                      className="w-full bg-transparent border-0 border-b border-black/15 group-focus-within:border-[#F15A24] py-2.5 text-[#0E1117] font-medium placeholder-[#9AA5B5] focus:ring-0 focus:outline-none transition-all duration-200 text-[0.96rem] resize-none"
                    />
                  </div>

                  {/* Submit Action Button & Reassurance */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[1.02rem] tracking-tight rounded-xl flex items-center justify-center gap-3 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                    >
                      <span>
                        {isSubmitting ? 'Confirming Availability...' : 'Check Product Availability'}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 group-hover:bg-white/30">
                        <ArrowRight size={15} />
                      </div>
                    </button>

                    {/* Trust / Reassurance Subtext */}
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[0.78rem] text-[#64748B]">
                      <span>Share your requirement and our team will get back to you.</span>
                      <span className="text-[#828E9E] font-mono text-[0.72rem]">
                        Your information is used only to respond to your enquiry.
                      </span>
                    </div>
                  </div>

                </form>
              </div>
            ) : (
              /* 3. Premium Confirmation State */
              <div className="py-8 text-left animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#F15A24] shadow-sm mb-6">
                  <CheckCircle2 size={28} className="text-[#F15A24]" />
                </div>

                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
                  <span className="font-mono text-[0.7rem] font-bold text-[#F15A24] tracking-wider uppercase">
                    CONSULTATION RECORD CREATED
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-[clamp(1.75rem,3vw,2.4rem)] text-[#0E1117] leading-tight mb-3">
                  Requirement Received.
                </h3>

                <p className="text-[1rem] text-[#4A5364] leading-relaxed max-w-lg mb-8">
                  Thank you, <strong className="text-[#0E1117]">{fullName}</strong>. Your enquiry for <strong className="text-[#0E1117]">{productRequirement}</strong> has been received. Our team will review stock availability and contact you shortly.
                </p>

                {/* Summary Snapshot Card */}
                <div className="bg-white rounded-2xl p-5 border border-black/[0.06] mb-8 max-w-md space-y-2">
                  <div className="flex justify-between text-[0.84rem]">
                    <span className="text-[#828E9E] font-mono">Contact Phone:</span>
                    <span className="text-[#0E1117] font-semibold">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between text-[0.84rem]">
                    <span className="text-[#828E9E] font-mono">Requirement:</span>
                    <span className="text-[#0E1117] font-semibold">{requirementType}</span>
                  </div>
                  {quantity && (
                    <div className="flex justify-between text-[0.84rem]">
                      <span className="text-[#828E9E] font-mono">Requested Quantity:</span>
                      <span className="text-[#0E1117] font-semibold">{quantity}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 font-mono text-[0.8rem] font-bold text-[#F15A24] hover:text-[#C03C0D] transition-colors cursor-pointer"
                  >
                    <span>Submit Another Enquiry →</span>
                  </button>

                  <span className="text-black/20">|</span>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 font-mono text-[0.8rem] text-[#4A5364] hover:text-[#0E1117] transition-colors"
                  >
                    <span>Back to Top</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
