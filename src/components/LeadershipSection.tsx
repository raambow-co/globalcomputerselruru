import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  User, 
  Wrench, 
  Cpu, 
  Briefcase, 
  Network, 
  PhoneCall, 
  CheckCircle2,
  Plus
} from 'lucide-react';

interface LeadershipSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

interface TeamMemberPlaceholder {
  id: string;
  role: string;
  department: string;
  placeholderName: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  onOpenEnquiry,
}) => {
  const teamMembers: TeamMemberPlaceholder[] = [
    {
      id: 'team-1',
      placeholderName: 'Senior Hardware Architect',
      role: 'Custom Workstation Builds & Performance Tuning',
      department: 'Custom PC & Gaming Division',
      icon: Cpu,
      tag: 'PC ARCHITECTURE',
    },
    {
      id: 'team-2',
      placeholderName: 'Chip-Level Service Specialist',
      role: 'Micro-Soldering, GPU Rework & Motherboard Repair',
      department: 'Laptop & Hardware Service Lab',
      icon: Wrench,
      tag: 'CHIP-LEVEL LAB',
    },
    {
      id: 'team-3',
      placeholderName: 'Enterprise Solutions Lead',
      role: 'Corporate Fleet Hardware, AMC & School Labs',
      department: 'Commercial & B2B Sales',
      icon: Briefcase,
      tag: 'ENTERPRISE FLEETS',
    },
    {
      id: 'team-4',
      placeholderName: 'Network & Security Engineer',
      role: 'Commercial CCTV, Biometrics & Structured Cabling',
      department: 'Surveillance & Infrastructure',
      icon: Network,
      tag: 'SECURITY & CCTV',
    },
  ];

  return (
    <section
      id="leadership"
      className="relative bg-[#FAFBFD] text-[#0E1117] py-6 sm:py-10 md:py-12 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Subtle Ambient Studio Geometry Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Soft Ambient Radial Light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.028)_0%,rgba(250,251,253,0)_100%)]" />

        {/* Minimal Grid SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="leadershipGrid"
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
          <rect width="100%" height="100%" fill="url(#leadershipGrid)" />

          {/* Large Minimal Spatial Rings */}
          <circle
            cx="50%"
            cy="50%"
            r="420"
            fill="none"
            stroke="rgba(241, 90, 36, 0.03)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
          />
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
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        
        {/* 2. Section Introduction Header */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full border border-black/[0.08] shadow-2xs mb-2.5">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.66rem] font-black tracking-[0.18em] text-[#F15A24] uppercase">
              FOUNDER &amp; TEAM LEADERSHIP
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-2 select-none">
            The People Behind{' '}
            <span className="text-[#F15A24] relative inline-block">
              Global Computers.
              <span className="absolute left-0 bottom-0.5 w-full h-1 bg-[#F15A24]/15 rounded-full" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="hidden sm:block text-[0.88rem] sm:text-[0.96rem] text-[#4A5364] leading-relaxed max-w-2xl font-normal">
            Decades of technical mastery, transparent pricing, and unwavering dedication to delivering genuine hardware solutions in Eluru.
          </p>
        </div>

        {/* 3. Founder & Proprietor Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-black/[0.08] shadow-[0_12px_45px_rgba(15,23,42,0.04)] mb-8 sm:mb-10 relative overflow-hidden transition-all duration-300 hover:border-[#F15A24]/20 hover:shadow-[0_20px_55px_rgba(241,90,36,0.05)]">
          
          {/* Top Brand Orange Gradient Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#F15A24] via-[#FF7844] to-[#F15A24] absolute top-0 left-0 right-0" />

          {/* Subtle Ambient Radial Lighting in Card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_100%_0%,rgba(241,90,36,0.04),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* LEFT: Founder Circle Image Frame with Glowing Halo (4 Columns on LG) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              
              {/* Circular Frame with Orange Gradient Border */}
              <div className="relative group cursor-pointer">
                
                {/* Ambient Glowing Outer Rings */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#F15A24] via-[#FF7844] to-[#F15A24] rounded-full opacity-35 blur-md group-hover:opacity-60 transition duration-500 animate-pulse" style={{ animationDuration: '4s' }} />
                
                {/* Thin Ring Frame */}
                <div className="relative p-1.5 bg-white rounded-full shadow-lg">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#F15A24]/30 shadow-inner bg-slate-100 flex items-center justify-center">
                    <img
                      src="/assets/gce_founder.jpg"
                      alt="Raju Pabolu - Founder & Proprietor of Global Computers Eluru"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Founder Verification Badge */}
                <div className="absolute bottom-1 right-2 bg-[#F15A24] text-white p-2 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
              </div>

              {/* Founder Name & Title */}
              <div className="mt-4">
                <h3 className="font-heading font-black text-[1.4rem] sm:text-[1.6rem] text-[#0E1117] leading-tight">
                  Raju Pabolu
                </h3>
                <div className="inline-flex items-center gap-1.5 mt-1 bg-[#FFF2EB] text-[#F15A24] font-mono text-[0.72rem] font-bold px-3 py-0.5 rounded-full border border-[#F15A24]/15">
                  <Sparkles size={11} />
                  <span>FOUNDER &amp; PROPRIETOR</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Leadership Vision & Achievements (8 Columns on LG) */}
            <div className="lg:col-span-8 flex flex-col justify-between text-left">
              
              <div>
                {/* Vision Quote Header */}
                <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-[0.68rem] tracking-wider uppercase mb-3">
                  <Award size={14} className="text-[#F15A24]" />
                  <span>FOUNDER'S VISION &amp; LOCAL COMMITMENT</span>
                </div>

                {/* Inspiring Statement */}
                <blockquote className="font-heading font-semibold text-[1.1rem] sm:text-[1.25rem] text-[#0E1117] leading-snug tracking-tight mb-4">
                  “Empowering Eluru with 100% genuine hardware, professional workstation engineering, and transparent local support has been our single guiding mission from day one.”
                </blockquote>

                <p className="hidden sm:block text-[0.86rem] sm:text-[0.92rem] text-[#64748B] leading-relaxed mb-6 font-normal">
                  Under the leadership of Raju Pabolu, Global Computers has grown into the premier technology showroom in West Godavari district — providing trusted IT infrastructure, authorized laptop servicing, and turnkey enterprise computing for educational institutions, corporate offices, and tech enthusiasts.
                </p>
              </div>

              {/* Three Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-black/[0.06]">
                <div className="flex items-start gap-2 text-[0.82rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={16} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>100% Genuine Box-Pack Hardware Only</span>
                </div>
                <div className="flex items-start gap-2 text-[0.82rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={16} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>In-House Micro-Soldering &amp; Diagnostics</span>
                </div>
                <div className="flex items-start gap-2 text-[0.82rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={16} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>Direct Showroom Assistance in Eluru</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4. Team Specialists Section (Frames with Role Badges for Future Emp Details) */}
        <div>
          {/* Subheader */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F15A24]" />
              <h4 className="font-mono text-[0.74rem] font-bold text-[#0E1117] tracking-wider uppercase">
                SHOWROOM SPECIALISTS &amp; TECHNICAL DEPARTMENTS
              </h4>
            </div>
            <span className="font-mono text-[0.66rem] text-slate-400 hidden sm:inline">
              GLOBAL COMPUTERS TEAM
            </span>
          </div>

          {/* 4 Side-by-Side Team Placeholder Frames (Touch-Swipeable on Mobile, Grid on Desktop) */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch">
            {teamMembers.map((member) => {
              const Icon = member.icon;

              return (
                <div
                  key={member.id}
                  className="min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink snap-center group bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.08] shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#F15A24]/30 hover:shadow-[0_12px_30px_rgba(241,90,36,0.08)] flex flex-col justify-between text-left relative overflow-hidden"
                >
                  {/* Top Category Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[0.60rem] font-bold tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase group-hover:bg-[#FFF2EB] group-hover:text-[#F15A24] transition-colors">
                        {member.tag}
                      </span>
                      <Icon size={14} className="text-slate-400 group-hover:text-[#F15A24] transition-colors" />
                    </div>

                    {/* Circular Placeholder Frame for Future Employee Photo */}
                    <div className="flex items-center gap-3.5 mb-3">
                      {/* Avatar Frame */}
                      <div className="w-13 h-13 rounded-full border-2 border-dashed border-black/15 group-hover:border-[#F15A24]/60 bg-[#FAFBFD] flex items-center justify-center relative flex-shrink-0 transition-colors shadow-inner">
                        <User size={20} className="text-slate-400 group-hover:text-[#F15A24] transition-colors" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border border-white flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      </div>

                      {/* Name & Department */}
                      <div>
                        <h5 className="font-heading font-extrabold text-[0.96rem] text-[#0E1117] leading-tight group-hover:text-[#F15A24] transition-colors">
                          {member.placeholderName}
                        </h5>
                        <span className="font-mono text-[0.66rem] text-slate-400 block mt-0.5">
                          {member.department}
                        </span>
                      </div>
                    </div>

                    {/* Role Description */}
                    <p className="text-[0.78rem] text-[#64748B] leading-relaxed line-clamp-2">
                      {member.role}
                    </p>
                  </div>

                  {/* Frame Status Badge */}
                  <div className="pt-3 mt-3 border-t border-black/[0.05] flex items-center justify-between text-[0.70rem] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Showroom Active
                    </span>
                    <span className="text-[#F15A24] font-semibold">Eluru Lab</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
