import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Wrench, 
  Monitor, 
  Laptop, 
  Camera, 
  Fingerprint, 
  Printer, 
  CheckCircle2, 
  PhoneCall, 
  ExternalLink,
  Layers,
  Cpu,
  Zap,
  HardDrive
} from 'lucide-react';

interface ProductVisualShowcaseProps {
  onOpenAvailability: (serviceOrBrandName?: string) => void;
}

export interface BrandService {
  id: string;
  name: string;
  logo: string;
  categories: ('pcs' | 'laptops' | 'cameras' | 'biometrics' | 'printers')[];
  categoryLabel: string;
  serviceOfferings: string[];
  tagline: string;
  warrantyBadge: string;
  // Spatial coordinates for floating dispersed canvas (percentages)
  posAll: { top: string; left: string; depth: number; anim: string };
  posCategory: { [key: string]: { top: string; left: string } };
}

export const ProductVisualShowcase: React.FC<ProductVisualShowcaseProps> = ({
  onOpenAvailability,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('hp');
  const [hoveredBrandId, setHoveredBrandId] = useState<string | null>(null);

  // Parallax physics for floating in air effect
  const physicsState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isVisible: true,
    lastTime: performance.now(),
  });

  const layerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const brands: BrandService[] = [
    // --- OPTIMIZED SPATIAL ORBITAL CONSTELLATION COORDINATES ---
    // 1. HP (Inner Orbit Top)
    {
      id: 'hp',
      name: 'HP',
      logo: '/assets/brands/01_HP.png',
      categories: ['pcs', 'laptops'],
      categoryLabel: "PC & Laptop Services",
      tagline: 'Desktops, ProBooks, Pavilion, EliteBook & OMEN Servicing & Upgrades',
      warrantyBadge: 'Authorized Spares & Support',
      serviceOfferings: ['Motherboard Chip-Level Repair', 'Screen & Hinge Replacement', 'High-Speed NVMe SSD Upgrade', 'Thermal Paste Re-pasting'],
      posAll: { top: '34%', left: '50%', depth: 0.04, anim: 'animate-float-1' },
      posCategory: { pcs: { top: '26%', left: '28%' }, laptops: { top: '26%', left: '28%' } },
    },
    // 2. Dell (Equator Right)
    {
      id: 'dell',
      name: 'Dell',
      logo: '/assets/brands/02_Dell.png',
      categories: ['pcs', 'laptops'],
      categoryLabel: "PC & Laptop Services",
      tagline: 'OptiPlex, Inspiron, Vostro, Latitude & Alienware Diagnostics',
      warrantyBadge: 'Original Component Diagnostics',
      serviceOfferings: ['Power Supply Unit (PSU) Repairs', 'Display & Backlight Repair', 'RAM & Graphics Upgrades', 'Original Battery Replacements'],
      posAll: { top: '50%', left: '72%', depth: 0.07, anim: 'animate-float-2' },
      posCategory: { pcs: { top: '26%', left: '72%' }, laptops: { top: '26%', left: '72%' } },
    },
    // 3. Lenovo (Inner Orbit Bottom)
    {
      id: 'lenovo',
      name: 'Lenovo',
      logo: '/assets/brands/03_Lenovo.png',
      categories: ['pcs', 'laptops'],
      categoryLabel: "PC & Laptop Services",
      tagline: 'ThinkPad, IdeaPad, Legion & ThinkCentre Commercial Maintenance',
      warrantyBadge: 'Genuine Parts Certified',
      serviceOfferings: ['Keyboard & Trackpad Repair', 'Liquid Spill Diagnostics', 'BIOS & Firmware Recovery', 'Custom RAM Expansions'],
      posAll: { top: '66%', left: '50%', depth: 0.05, anim: 'animate-float-3' },
      posCategory: { pcs: { top: '50%', left: '50%' }, laptops: { top: '50%', left: '50%' } },
    },
    // 4. Apple (Equator Left)
    {
      id: 'apple',
      name: 'Apple',
      logo: '/assets/brands/04_Apple.png',
      categories: ['pcs'],
      categoryLabel: "Mac & Apple Desktop Services",
      tagline: 'iMac, Mac mini, Mac Studio & Mac Pro Precision Troubleshooting',
      warrantyBadge: 'Specialist Mac Technicians',
      serviceOfferings: ['macOS Clean Setup & Migration', 'Logic Board Micro-Soldering', 'Thermal Management Cleaning', 'SSD Storage Expansion'],
      posAll: { top: '50%', left: '28%', depth: 0.08, anim: 'animate-float-main' },
      posCategory: { pcs: { top: '74%', left: '28%' } },
    },
    // 5. Epson (Mid Orbit Lower-Left)
    {
      id: 'epson',
      name: 'Epson',
      logo: '/assets/brands/08_Epson.png',
      categories: ['printers'],
      categoryLabel: "Printer & Printhead Services",
      tagline: 'EcoTank, L-Series, WorkForce & Commercial Plotters Servicing',
      warrantyBadge: 'Direct PrecisionCore Support',
      serviceOfferings: ['Printhead Ultrasonic Cleaning', 'Waste Ink Pad Reset & Replacement', 'Paper Feed Roller Alignment', 'Continuous Ink Tank Overhaul'],
      posAll: { top: '62%', left: '22%', depth: 0.09, anim: 'animate-float-main' },
      posCategory: { printers: { top: '28%', left: '28%' } },
    },
    // 6. Hikvision (Upper Left)
    {
      id: 'hikvision',
      name: 'Hikvision',
      logo: '/assets/brands/15_Hikvision.png',
      categories: ['cameras'],
      categoryLabel: "CCTV & IP Surveillance",
      tagline: 'ColorVu, Turbo HD, 4K IP Dome & Bullet Surveillance Systems',
      warrantyBadge: 'Leading CCTV Brand Solutions',
      serviceOfferings: ['NVR/DVR Channel Configuration', 'Night-Vision IR Sensor Alignment', 'CAT6 / BNC Cable Diagnostics', 'Mobile App Remote View Setup'],
      posAll: { top: '24%', left: '34%', depth: 0.08, anim: 'animate-float-main' },
      posCategory: { cameras: { top: '28%', left: '28%' } },
    },
    // 7. ASUS (Outer Right)
    {
      id: 'asus',
      name: 'ASUS',
      logo: '/assets/brands/06_ASUS.png',
      categories: ['laptops'],
      categoryLabel: "Laptop & Gaming Services",
      tagline: 'ROG, TUF Gaming, ZenBook & VivoBook Performance Tuning',
      warrantyBadge: 'Gaming & ROG Specialists',
      serviceOfferings: ['GPU & VRAM Chip Diagnostics', 'Dual-Fan Cooling Overhaul', 'OLED Screen Replacement', 'Gaming BIOS Optimization'],
      posAll: { top: '48%', left: '90%', depth: 0.06, anim: 'animate-float-2' },
      posCategory: { laptops: { top: '74%', left: '28%' } },
    },
    // 8. Acer (Mid Orbit Lower-Right)
    {
      id: 'acer',
      name: 'Acer',
      logo: '/assets/brands/07_Acer.png',
      categories: ['laptops'],
      categoryLabel: "Laptop Services",
      tagline: 'Predator, Nitro, Aspire & Swift Professional Care',
      warrantyBadge: 'Multi-Model Diagnostic Support',
      serviceOfferings: ['Hinge & Chassis Repair', 'Motherboard Power IC Fix', 'Type-C Port Micro-Soldering', 'Performance Boost Upgrades'],
      posAll: { top: '62%', left: '78%', depth: 0.05, anim: 'animate-float-3' },
      posCategory: { laptops: { top: '74%', left: '72%' } },
    },
    // 9. Canon (Bottom Left)
    {
      id: 'canon',
      name: 'Canon',
      logo: '/assets/brands/10_Canon.png',
      categories: ['printers'],
      categoryLabel: "Laser & Inkjet Printer Services",
      tagline: 'PIXMA, imageCLASS, MAXIFY & Laser Multi-Function Printers',
      warrantyBadge: 'Genuine Toner & Cartridge Support',
      serviceOfferings: ['Laser Drum Unit Reconditioning', 'Logic Board Firmware Updates', 'Toner Cartridge Servicing', 'Color Calibration Tuning'],
      posAll: { top: '80%', left: '32%', depth: 0.07, anim: 'animate-float-2' },
      posCategory: { printers: { top: '74%', left: '28%' } },
    },
    // 10. Brother (Outer Left)
    {
      id: 'brother',
      name: 'Brother',
      logo: '/assets/brands/11_Brother.png',
      categories: ['printers'],
      categoryLabel: "Monochrome & Color Printers",
      tagline: 'DCP Series, High-Speed Duplex Laser & Network Printers',
      warrantyBadge: 'High-Volume Maintenance Care',
      serviceOfferings: ['Fuser Unit Replacement', 'Network Wi-Fi Card Repair', 'Duplex Jam Resolution', 'OEM Ink & Toner Supplies'],
      posAll: { top: '48%', left: '10%', depth: 0.05, anim: 'animate-float-3' },
      posCategory: { printers: { top: '74%', left: '72%' } },
    },
    // 11. TVS Electronics (Top Left Corner)
    {
      id: 'tvs',
      name: 'TVS Electronics',
      logo: '/assets/brands/09_TVS_Electronics.png',
      categories: ['printers'],
      categoryLabel: "POS & Dot Matrix Printers",
      tagline: 'Dot Matrix, Thermal Receipt Printers & Commercial POS Systems',
      warrantyBadge: 'Billing & POS Specialist',
      serviceOfferings: ['Ribbon Mechanism Replacement', 'Printhead Pin Alignment', 'Thermal Head Calibration', 'Commercial POS Maintenance'],
      posAll: { top: '12%', left: '24%', depth: 0.04, anim: 'animate-float-1' },
      posCategory: { printers: { top: '28%', left: '72%' } },
    },
    // 12. CP Plus (Upper Right)
    {
      id: 'cpplus',
      name: 'CP Plus',
      logo: '/assets/brands/16_CP_Plus.png',
      categories: ['cameras'],
      categoryLabel: "Smart Security & CCTV",
      tagline: 'EzyKam Wi-Fi, HD Analog & Commercial 16/32-Channel NVRs',
      warrantyBadge: 'Certified Surveillance Support',
      serviceOfferings: ['Hard Disk Surveillance Error Fix', 'PTZ 360° Motor Repair', 'Power Supply SMPS Overhaul', 'On-Site Installation & Aligning'],
      posAll: { top: '24%', left: '66%', depth: 0.04, anim: 'animate-float-1' },
      posCategory: { cameras: { top: '28%', left: '72%' } },
    },
    // 13. Toshiba (Top North Apex)
    {
      id: 'toshiba',
      name: 'Toshiba',
      logo: '/assets/brands/05_Toshiba.png',
      categories: ['pcs'],
      categoryLabel: "PC & Storage Services",
      tagline: 'Desktop Systems, Hard Drives & Industrial Storage Solutions',
      warrantyBadge: 'Enterprise Storage Support',
      serviceOfferings: ['Data Recovery & Forensics', 'Hard Drive Replacement', 'Power Distribution Repair', 'Legacy System Maintenance'],
      posAll: { top: '7%', left: '50%', depth: 0.03, anim: 'animate-float-1' },
      posCategory: { pcs: { top: '74%', left: '72%' } },
    },
    // 14. eSSL (Top Right Corner)
    {
      id: 'essl',
      name: 'eSSL',
      logo: '/assets/brands/12_eSSL.png',
      categories: ['biometrics'],
      categoryLabel: "Biometric & Attendance Solutions",
      tagline: 'Fingerprint, Face Recognition & RFID Access Control Terminals',
      warrantyBadge: 'Security Hardware Specialist',
      serviceOfferings: ['Optical Sensor Replacement', 'Time-Attendance Software Sync', 'Access Controller Wiring & Setup', 'Firmware Security Updates'],
      posAll: { top: '12%', left: '76%', depth: 0.08, anim: 'animate-float-main' },
      posCategory: { biometrics: { top: '28%', left: '50%' } },
    },
    // 15. BioMax (Far Bottom Right)
    {
      id: 'biomax',
      name: 'BioMax',
      logo: '/assets/brands/13_BioMax.png',
      categories: ['biometrics'],
      categoryLabel: "Biometrics & Time-Trackers",
      tagline: 'AI Face Attendance, Palm Scanners & Enterprise Turnstiles',
      warrantyBadge: 'Enterprise Attendance Integration',
      serviceOfferings: ['Cloud Attendance Sync Setup', 'Camera Module Calibration', 'Electromagnetic Lock Integration', 'On-Site Machine Servicing'],
      posAll: { top: '78%', left: '88%', depth: 0.03, anim: 'animate-float-1' },
      posCategory: { biometrics: { top: '74%', left: '72%' } },
    },
    // 16. Intercom (Bottom South Apex)
    {
      id: 'intercom',
      name: 'Intercom',
      logo: '/assets/brands/14_Intercom.png',
      categories: ['biometrics'],
      categoryLabel: "Communication & Access Devices",
      tagline: 'Video Door Phones, Commercial Intercoms & Multi-Unit Systems',
      warrantyBadge: 'Two-Way Audio/Video Support',
      serviceOfferings: ['EPABX & Intercom Cabling', 'Audio Amplifier Troubleshooting', 'Video Door Screen Repair', 'Multi-Office Channel Setup'],
      posAll: { top: '93%', left: '50%', depth: 0.06, anim: 'animate-float-2' },
      posCategory: { biometrics: { top: '74%', left: '28%' } },
    },
    // 17. Dahua (Far Bottom Left)
    {
      id: 'dahua',
      name: 'Dahua',
      logo: '/assets/brands/17_Dahua.png',
      categories: ['cameras'],
      categoryLabel: "Commercial Video Surveillance",
      tagline: 'Full-Color AI Detection, Thermal Cameras & Smart Security Solutions',
      warrantyBadge: 'Enterprise Video Analytics',
      serviceOfferings: ['PoE Switch & Network Setup', 'AI Motion Trigger Calibration', 'Firmware Hardening & Recovery', 'Annual Maintenance Contracts (AMC)'],
      posAll: { top: '78%', left: '12%', depth: 0.07, anim: 'animate-float-2' },
      posCategory: { cameras: { top: '74%', left: '28%' } },
    },
    // 18. D-Link (Far Upper Left)
    {
      id: 'dlink',
      name: 'D-Link',
      logo: '/assets/brands/18_D_Link.png',
      categories: ['cameras'],
      categoryLabel: "Surveillance & Networking",
      tagline: 'PoE Switches, Wi-Fi Cloud Cameras, Routers & Network Racks',
      warrantyBadge: 'High-Speed Networking Care',
      serviceOfferings: ['Gigabit Switch Troubleshooting', 'Long-Range Wi-Fi Link Setup', 'IP Camera Subnet Routing', 'Network Rack Cable Dressing'],
      posAll: { top: '24%', left: '11%', depth: 0.05, anim: 'animate-float-3' },
      posCategory: { cameras: { top: '74%', left: '72%' } },
    },
  ];

  // Mouse move handler for organic 3D spatial float
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      physicsState.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      physicsState.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const renderLoop = (time: number) => {
      if (physicsState.current.isVisible) {
        const dt = Math.min((time - physicsState.current.lastTime) / 1000, 0.1);
        physicsState.current.lastTime = time;

        const ambientX = Math.sin(time * 0.0007) * 0.03;
        const ambientY = Math.cos(time * 0.0006) * 0.03;

        const targetX = physicsState.current.targetX + ambientX;
        const targetY = physicsState.current.targetY + ambientY;

        physicsState.current.currentX += (targetX - physicsState.current.currentX) * 0.06;
        physicsState.current.currentY += (targetY - physicsState.current.currentY) * 0.06;

        const curX = physicsState.current.currentX;
        const curY = physicsState.current.currentY;

        Object.keys(layerRefs.current).forEach((brandId) => {
          const el = layerRefs.current[brandId];
          if (!el) return;
          const depth = parseFloat(el.getAttribute('data-depth') || '0.05');
          const tx = (curX * depth * 80).toFixed(2);
          const ty = (curY * depth * 60).toFixed(2);
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
        });
      }
      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Services & Brands', icon: Layers, count: 18 },
    { id: 'pcs', label: "PC's", icon: Monitor, count: 5 },
    { id: 'laptops', label: 'Laptops', icon: Laptop, count: 5 },
    { id: 'cameras', label: 'CC Cameras', icon: Camera, count: 4 },
    { id: 'biometrics', label: 'Bio Metric', icon: Fingerprint, count: 3 },
    { id: 'printers', label: 'Printers', icon: Printer, count: 4 },
  ];

  // Filtered brands: in 'all', every brand appears exactly once without duplicates
  const visibleBrands = activeTab === 'all'
    ? brands
    : brands.filter((b) => b.categories.includes(activeTab as any));

  const activeSelectedBrand = brands.find((b) => b.id === (hoveredBrandId || selectedBrandId)) || brands[0];

  return (
    <section
      id="technology-showcase"
      ref={containerRef}
      className="relative bg-white text-[#0E1117] py-8 sm:py-12 min-h-[calc(100vh-60px)] flex flex-col justify-center overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Spatial Linework & Coordinate Architecture Background (Clean Studio White Theme) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/3 w-[750px] h-[750px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.025)_0%,rgba(255,255,255,0)_100%)]" />
        
        {/* Spatial Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brandsGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(15, 23, 42, 0.022)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brandsGrid)" />
          
          <circle cx="50%" cy="50%" r="360" fill="none" stroke="rgba(241, 90, 36, 0.035)" strokeWidth="1.2" strokeDasharray="8 8" />
          <circle cx="50%" cy="50%" r="560" fill="none" stroke="rgba(15, 23, 42, 0.02)" strokeWidth="1" />
        </svg>

        {/* Minimal Precision Corner Accents */}
        <div className="absolute top-6 left-6 sm:left-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13V1H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="1" r="1.5" fill="#F15A24" />
          </svg>
        </div>
        <div className="absolute top-6 right-6 sm:right-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 13V1H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="1" r="1.5" fill="#F15A24" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 sm:left-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1V13H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="1" cy="13" r="1.5" fill="#F15A24" />
          </svg>
        </div>
        <div className="absolute bottom-6 right-6 sm:right-10 text-black/15 pointer-events-none select-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1V13H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="13" cy="13" r="1.5" fill="#F15A24" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Editorial Section Header */}
        <div className="max-w-3xl mb-4 sm:mb-5 text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FAFBFD] px-3 py-1 rounded-full border border-black/[0.08] shadow-2xs mb-2">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em] text-[#F15A24] uppercase">
              SERVICES &amp; SUPPORTED BRANDS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.6rem,2.8vw,2.4rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-2 select-none">
            Expert Multi-Brand<br />
            <span className="text-[#F15A24] relative inline-block">
              Sales, Services &amp; Solutions.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>
        </div>

        {/* 3. Category Filter Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 sm:mb-5 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTab(cat.id);
                  // select first brand in category
                  const firstInCat = cat.id === 'all' 
                    ? brands[0] 
                    : brands.find((b) => b.categories.includes(cat.id as any));
                  if (firstInCat) setSelectedBrandId(firstInCat.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg font-heading text-[0.80rem] sm:text-[0.84rem] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#F15A24] text-white shadow-orange-cta scale-[1.02]'
                    : 'bg-[#FAFBFD] hover:bg-slate-100 text-[#4A5364] hover:text-[#0E1117] border border-black/[0.06] hover:border-black/15 shadow-2xs'
                }`}
              >
                <Icon size={14} className={isSelected ? 'text-white' : 'text-[#F15A24]'} />
                <span>{cat.label}</span>
                <span
                  className={`font-mono text-[0.66rem] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white font-bold' : 'bg-black/5 text-[#828E9E]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Spatial Floating in Air Interactive Arena + Detail HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT/CENTER: 3D Spatial Floating in Air Canvas (8 Columns on LG) */}
          <div className="lg:col-span-8 bg-[#FAFBFD] rounded-2xl border border-black/[0.08] shadow-[0_12px_40px_rgba(15,23,42,0.04)] relative min-h-0 md:min-h-[520px] p-4 sm:p-5 flex flex-col justify-between select-none">
            
            {/* Ambient Radial Ring Lighting inside the Arena */}
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.04)_0%,rgba(250,251,253,0)_100%)] pointer-events-none rounded-3xl" />

            {/* Arena Header Coordinates */}
            <div className="flex items-center justify-between gap-4 z-20 mb-3 pb-3 border-b border-black/[0.05]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F15A24] animate-ping" />
                <span className="font-mono text-[0.72rem] font-bold text-[#0E1117] uppercase tracking-wider">
                  RADIAL BRAND CONSTELLATION
                </span>
                <span className="hidden sm:inline font-mono text-[0.68rem] text-slate-400">
                  · {visibleBrands.length} BRANDS IN ORBIT
                </span>
              </div>

              <div className="font-mono text-[0.68rem] text-[#828E9E] flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#F15A24]" />
                <span>Hover / Click Any Logo to Inspect Services</span>
              </div>
            </div>

            {/* The Floating Constellation Space Arena */}
            <div className="relative w-full h-[450px] sm:h-[480px] md:h-[490px] overflow-hidden">
              
              {/* CENTRAL ANCHOR BASE / ORBITAL CORE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center justify-center">
                {/* Orbital radar rings */}
                <div className="absolute w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] rounded-full border border-[#F15A24]/15 animate-ping opacity-20" style={{ animationDuration: '4.5s' }} />
                <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-[#F15A24]/15" />
                <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] rounded-full border border-black/[0.035]" />
                
                {/* Core Center Emblem */}
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#F15A24]/20 shadow-[0_4px_20px_rgba(241,90,36,0.10)] flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F15A24] animate-pulse" />
                  <span className="font-mono text-[0.55rem] sm:text-[0.66rem] md:text-[0.70rem] font-extrabold text-[#0E1117] tracking-wider uppercase whitespace-nowrap">
                    {activeTab === 'all' ? 'CENTRAL TECH HUB' : `${categories.find(c => c.id === activeTab)?.label} CORE`}
                  </span>
                </div>
              </div>

              {visibleBrands.map((brand) => {
                const isHovered = (hoveredBrandId || selectedBrandId) === brand.id;
                
                // Determine layout coordinates
                let topPos = brand.posAll.top;
                let leftPos = brand.posAll.left;

                if (activeTab !== 'all' && brand.posCategory[activeTab]) {
                  topPos = brand.posCategory[activeTab].top;
                  leftPos = brand.posCategory[activeTab].left;
                }

                return (
                  <div
                    key={brand.id}
                    style={{
                      top: topPos,
                      left: leftPos,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20 transition-all duration-500 ease-out"
                  >
                    <div
                      ref={(el) => {
                        layerRefs.current[brand.id] = el;
                      }}
                      data-depth={brand.posAll.depth}
                      className={`cursor-pointer ${brand.posAll.anim} ${
                        isHovered 
                          ? (activeTab === 'all' ? 'scale-115 sm:scale-120 z-40' : 'scale-108 sm:scale-112 z-40') 
                          : (activeTab === 'all' ? 'hover:scale-108 active:scale-105' : 'hover:scale-105 active:scale-102')
                      }`}
                      onClick={() => {
                        setSelectedBrandId(brand.id);
                        setHoveredBrandId(brand.id);
                      }}
                      onMouseEnter={() => setHoveredBrandId(brand.id)}
                      onMouseLeave={() => setHoveredBrandId(null)}
                    >
                      {/* Floating Brand Card with Crisp White Drop Shadow */}
                      <div
                        className={`relative bg-white border transition-all duration-300 flex flex-col items-center justify-center text-center ${
                          activeTab === 'all'
                            ? 'p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl min-w-[56px] sm:min-w-[85px] md:min-w-[100px] max-w-[70px] sm:max-w-[100px] md:max-w-[118px]'
                            : 'p-2 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl min-w-[95px] sm:min-w-[145px] md:min-w-[210px] max-w-[130px] sm:max-w-[185px] md:max-w-[240px]'
                        } ${
                          isHovered
                            ? 'border-[#F15A24] bg-[#FFF9F6] shadow-[0_12px_32px_rgba(241,90,36,0.25)] ring-2 ring-[#F15A24]/30'
                            : 'border-black/[0.08] shadow-[0_6px_18px_rgba(15,23,42,0.06)] hover:border-[#F15A24]/40 hover:shadow-[0_10px_28px_rgba(241,90,36,0.14)]'
                        }`}
                      >
                        {/* Logo Image Container */}
                        <div
                          className={`flex items-center justify-center overflow-hidden ${
                            activeTab === 'all'
                              ? 'w-8 h-4 sm:w-12 sm:h-8 md:w-15 md:h-10'
                              : 'w-14 h-8 sm:w-24 sm:h-14 md:w-36 md:h-22'
                          }`}
                        >
                          <img
                            src={brand.logo}
                            alt={`${brand.name} Authorized Service & Sales`}
                            className="max-h-full max-w-full object-contain select-none transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>

                        {/* Brand Label */}
                        <span
                          className={`font-heading font-bold transition-colors truncate max-w-full block ${
                            activeTab === 'all'
                              ? 'text-[0.58rem] sm:text-[0.72rem] md:text-[0.78rem] mt-0.5 sm:mt-1'
                              : 'text-[0.78rem] sm:text-[0.96rem] md:text-[1.12rem] font-extrabold mt-1 sm:mt-2.5'
                          } ${
                            isHovered ? 'text-[#F15A24]' : 'text-[#0E1117]'
                          }`}
                        >
                          {brand.name}
                        </span>

                        {/* Category-Specific Badge */}
                        {activeTab !== 'all' && (
                          <span className="font-mono text-[0.52rem] sm:text-[0.62rem] md:text-[0.68rem] text-slate-400 mt-0.5 sm:mt-1 uppercase tracking-wider hidden sm:block">
                            Authorized Spares
                          </span>
                        )}

                        {/* Mini Verified Dot */}
                        {isHovered && (
                          <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 bg-[#F15A24] text-white rounded-full flex items-center justify-center shadow-xs text-[0.52rem] sm:text-[0.65rem] font-bold animate-pulse">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Arena Footer Status Bar */}
            <div className="pt-3 mt-2 border-t border-black/[0.05] flex items-center justify-between text-[0.78rem] text-slate-500 z-20">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#F15A24]" />
                <span className="font-medium text-[#0E1117]">100% Genuine Box-Pack &amp; Certified Component Spares</span>
              </span>
              <span className="font-mono text-[0.7rem] text-[#F15A24] font-semibold hidden sm:inline">
                ELURU SERVICE DESK
              </span>
            </div>

          </div>

          {/* RIGHT: Live Interactive Brand Service HUD Card (4 Columns on LG) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Selected Brand Detail Card */}
            <div className="bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)] text-left relative overflow-hidden transition-all duration-300">
              
              {/* Brand Top Highlight Accent */}
              <div className="h-1 w-full bg-gradient-to-r from-[#F15A24] via-[#FF7844] to-[#F15A24] absolute top-0 left-0 right-0" />

              {/* Logo Header Banner */}
              <div className="flex items-center justify-between gap-4 mb-5 pt-2">
                <div className="bg-[#FAFBFD] p-3 rounded-2xl border border-black/[0.06] shadow-2xs flex items-center justify-center w-24 h-16">
                  <img
                    src={activeSelectedBrand.logo}
                    alt={activeSelectedBrand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="text-right">
                  <span className="font-mono text-[0.64rem] font-bold tracking-wider bg-[#FFF2EB] text-[#F15A24] px-2.5 py-1 rounded-full uppercase border border-[#F15A24]/15 block">
                    {activeSelectedBrand.warrantyBadge}
                  </span>
                  <span className="font-mono text-[0.66rem] text-slate-400 mt-1 block">
                    {activeSelectedBrand.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-heading font-extrabold text-[1.35rem] text-[#0E1117] leading-tight mb-2">
                {activeSelectedBrand.name} Services &amp; Sales
              </h3>
              
              <p className="text-[0.88rem] text-[#64748B] leading-relaxed mb-6 font-normal">
                {activeSelectedBrand.tagline}
              </p>

              {/* Service Capabilities Checklist */}
              <div className="mb-6 pt-5 border-t border-black/[0.06]">
                <span className="font-mono text-[0.68rem] font-bold tracking-wider text-slate-400 uppercase mb-3 block">
                  AVAILABLE SERVICE CAPABILITIES
                </span>
                
                <div className="space-y-2.5">
                  {activeSelectedBrand.serviceOfferings.map((offering, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[0.85rem] text-[#0E1117] font-medium">
                      <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                      <span>{offering}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Enquiry for this Brand */}
              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => onOpenAvailability(`${activeSelectedBrand.name} ${activeSelectedBrand.categoryLabel}`)}
                  className="w-full py-3.5 bg-[#F15A24] hover:bg-[#D94814] active:bg-[#C03C0D] text-white font-semibold text-[0.92rem] rounded-xl flex items-center justify-center gap-2 shadow-orange-cta transition-all duration-200 hover:shadow-orange-hover hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Book {activeSelectedBrand.name} Service / Enquiry</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="#location"
                  className="w-full py-2.5 bg-[#FAFBFD] hover:bg-slate-100 text-[#0E1117] font-semibold text-[0.84rem] rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-black/[0.06] cursor-pointer"
                >
                  <span>Visit Eluru Service Showroom</span>
                  <ExternalLink size={13} className="text-[#828E9E]" />
                </a>
              </div>

            </div>

            {/* Quick Consultation Badge */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-black/[0.06] p-4 flex items-center gap-3.5 text-left shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2EB] text-[#F15A24] flex items-center justify-center flex-shrink-0">
                <PhoneCall size={18} />
              </div>
              <div className="leading-tight">
                <span className="font-heading font-bold text-[0.88rem] text-[#0E1117] block">
                  Need Immediate Technical Assistance?
                </span>
                <span className="text-[0.78rem] text-slate-500 mt-0.5 block">
                  Call or visit our direct tech desk on Main Road, Powerpet, Eluru.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
