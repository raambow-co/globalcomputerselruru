import React, { useState, useEffect } from "react";
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
  Crown, 
  Star,
  Zap,
  Flame,
  ThumbsUp
} from "lucide-react";
import { db, collection, onSnapshot, doc } from "../firebase";

interface LeadershipSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

export interface TeamMemberData {
  id: string;
  name: string;
  department: string;
  image: string;
  tag: string;
  icon?: string;
  badgeType?: "gold" | "cyan" | "purple" | "emerald" | "custom" | "none" | string;
  badgeTitle?: string;
  bio?: string;
  order?: number;
}

const DEFAULT_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: "team-kamal",
    name: "Kamal",
    department: "Custom PC & Gaming Division",
    image: "/assets/Kamal.webp",
    tag: "PC ARCHITECTURE",
    badgeType: "none",
    badgeTitle: "",
    order: 0
  },
  {
    id: "team-krupamani",
    name: "Krupamani",
    department: "Laptop & Hardware Service Lab",
    image: "/assets/Krupamani.webp",
    tag: "CHIP-LEVEL LAB",
    badgeType: "none",
    badgeTitle: "",
    order: 1
  },
  {
    id: "team-phani",
    name: "Phani",
    department: "Commercial & B2B Sales",
    image: "/assets/Phani.webp",
    tag: "ENTERPRISE FLEETS",
    badgeType: "none",
    badgeTitle: "",
    order: 2
  },
  {
    id: "team-srinu",
    name: "Srinu",
    department: "Surveillance & Infrastructure",
    image: "/assets/Srinu.webp",
    tag: "SECURITY & CCTV",
    badgeType: "none",
    badgeTitle: "",
    order: 3
  }
];

export const LeadershipSection: React.FC<LeadershipSectionProps> = () => {
  const [teamList, setTeamList] = useState<TeamMemberData[]>(() => {
    try {
      const saved = localStorage.getItem("gc_team_members_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_TEAM_MEMBERS;
  });

  const [legacyBestId, setLegacyBestId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("gc_best_employee_id");
    } catch (e) {
      return null;
    }
  });

  // 1. Real-time Firestore sync for dynamic Team Members
  useEffect(() => {
    try {
      if (!db) return;
      const unsub = onSnapshot(collection(db, "team_members"), (snapshot) => {
        if (!snapshot.empty) {
          const list: TeamMemberData[] = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as TeamMemberData);
          });
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setTeamList(list);
          try {
            localStorage.setItem("gc_team_members_v2", JSON.stringify(list));
          } catch (e) {}
        }
      });
      return () => unsub();
    } catch (e) {
      console.warn("Firestore team_members listener error:", e);
    }
  }, []);

  // 2. Backward compatibility for legacy employee of the month doc
  useEffect(() => {
    try {
      if (!db) return;
      const unsubLegacy = onSnapshot(doc(db, "team_settings", "employee_of_the_month"), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const id = data?.employeeId || null;
          setLegacyBestId(id);
        } else {
          setLegacyBestId(null);
        }
      });
      return () => unsubLegacy();
    } catch (e) {}
  }, []);

  // Cross-tab storage sync
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem("gc_team_members_v2");
        if (saved) setTeamList(JSON.parse(saved));
        setLegacyBestId(localStorage.getItem("gc_best_employee_id"));
      } catch (e) {}
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <section
      id="leadership"
      className="relative bg-[#FAFBFD] text-[#0E1117] py-6 sm:py-10 md:py-12 overflow-hidden border-t border-black/[0.05] selection:bg-[#F15A24] selection:text-white"
    >
      {/* 1. Subtle Ambient Studio Geometry Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(241,90,36,0.028)_0%,rgba(250,251,253,0)_100%)]" />

        <svg className="absolute inset-0 w-full h-full opacity-55" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leadershipGrid" width="140" height="140" patternUnits="userSpaceOnUse">
              <path d="M 140 0 L 0 0 0 140" fill="none" stroke="rgba(15, 23, 42, 0.022)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(15, 23, 42, 0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leadershipGrid)" />
          <circle cx="50%" cy="50%" r="420" fill="none" stroke="rgba(241, 90, 36, 0.03)" strokeWidth="1.2" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        {/* 2. Section Introduction Header */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full border border-black/[0.08] shadow-2xs mb-2.5">
            <span className="w-2 h-[2px] bg-[#F15A24] rounded-full" />
            <span className="font-mono text-[0.66rem] font-black tracking-[0.18em] text-[#F15A24] uppercase">
              FOUNDER &amp; TEAM LEADERSHIP
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] text-[#0E1117] leading-[1.1] tracking-tight mb-2 select-none">
            The People Behind <span className="text-[#F15A24] relative inline-block">Global Computers</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-[0.92rem] leading-relaxed max-w-2xl font-normal">
            Decades of technical mastery in Eluru, combining genuine tier-1 component distribution with certified chip-level diagnostics and custom rig engineering.
          </p>
        </div>

        {/* 3. Founder Story Card */}
        <div className="bg-white rounded-3xl border border-black/[0.08] p-5 sm:p-7 md:p-8 mb-8 sm:mb-10 shadow-sm relative overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Founder Image */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center">
              <div className="relative w-44 sm:w-52 md:w-full max-w-[240px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#F15A24]/20 shadow-md group">
                <img
                  src="/assets/gce_founder.webp"
                  alt="Raju Pabolu — Founder, Global Computers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.retried) {
                      target.dataset.retried = "1";
                      target.src = "https://www.globalcomputerseluru.com/assets/gce_founder.webp";
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white text-center">
                  <span className="font-mono text-[0.62rem] font-extrabold uppercase tracking-widest text-[#F15A24] block">FOUNDER &amp; MD</span>
                  <span className="font-heading font-bold text-sm">Raju Pabolu</span>
                </div>
              </div>
            </div>

            {/* Founder Message & Heritage */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#FFF2EB] text-[#F15A24] px-2.5 py-0.5 rounded-full font-mono text-[0.64rem] font-bold uppercase tracking-wider">
                <ShieldCheck size={12} />
                <span>BUILDING ELURU’S TECH HUB SINCE 2000s</span>
              </div>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0E1117] leading-tight">
                “Genuine hardware, transparent guidance, and lifelong customer trust are non-negotiable.”
              </h3>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                <p>
                  Under the leadership of Raju Pabolu, Global Computers has grown into the premier technology showroom in West Godavari district — providing trusted IT infrastructure, expert multi-brand laptop servicing, and turnkey enterprise computing for educational institutions, corporate offices, and tech enthusiasts.
                </p>
              </div>

              {/* Three Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 sm:pt-4 border-t border-black/[0.06]">
                <div className="flex items-start gap-2 text-[0.80rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>100% Genuine Box-Pack Hardware</span>
                </div>
                <div className="flex items-start gap-2 text-[0.80rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>In-House Chip Diagnostics Lab</span>
                </div>
                <div className="flex items-start gap-2 text-[0.80rem] text-[#0E1117] font-medium">
                  <CheckCircle2 size={15} className="text-[#F15A24] flex-shrink-0 mt-0.5" />
                  <span>Direct Showroom Assistance</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 4. Team Specialists Section */}
        <div>
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

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch">
            {teamList.map((member) => {
              // Determine badge tier
              const isGold = member.badgeType === "gold" || (!member.badgeType && legacyBestId === member.id);
              const isCyan = member.badgeType === "cyan";
              const isPurple = member.badgeType === "purple";
              const isEmerald = member.badgeType === "emerald";
              const isCustom = member.badgeType === "custom";

              // Styling variants
              let cardClass = "bg-white border border-black/[0.08] shadow-2xs hover:border-[#F15A24]/30 hover:shadow-[0_12px_30px_rgba(241,90,36,0.08)]";
              let topBar = null;
              let badgePill = null;
              let avatarRing = "border-2 border-[#F15A24]/30 group-hover:border-[#F15A24] bg-slate-100";
              let statusDot = <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />;

              if (isGold) {
                cardClass = "bg-gradient-to-b from-[#FFFDF0] via-[#FFFBEB] to-[#FEF3C7] border-2 border-amber-400 shadow-[0_12px_35px_rgba(245,158,11,0.25)] ring-2 ring-amber-300/70";
                topBar = <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-pulse" />;
                badgePill = (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                    <Crown size={12} className="text-slate-950 fill-slate-950" />
                    <span className="font-mono text-[0.60rem] font-black tracking-wider uppercase">
                      {member.badgeTitle || "EMPLOYEE OF THE MONTH"}
                    </span>
                  </div>
                );
                avatarRing = "ring-4 ring-amber-400 ring-offset-2 border-2 border-amber-500 bg-amber-50";
                statusDot = (
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                    <Star size={9} className="text-white fill-white" />
                  </div>
                );
              } else if (isCyan) {
                cardClass = "bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD] border-2 border-sky-400 shadow-[0_12px_35px_rgba(14,165,233,0.25)] ring-2 ring-sky-300/70";
                topBar = <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500" />;
                badgePill = (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <PhoneCall size={11} className="text-white" />
                    <span className="font-mono text-[0.60rem] font-black tracking-wider uppercase">
                      {member.badgeTitle || "BEST CALLS & SUPPORT"}
                    </span>
                  </div>
                );
                avatarRing = "ring-4 ring-sky-400 ring-offset-2 border-2 border-sky-500 bg-sky-50";
                statusDot = (
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                    <ThumbsUp size={8} className="text-white fill-white" />
                  </div>
                );
              } else if (isPurple) {
                cardClass = "bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF] border-2 border-purple-400 shadow-[0_12px_35px_rgba(168,85,247,0.25)] ring-2 ring-purple-300/70";
                topBar = <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-500" />;
                badgePill = (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <Zap size={11} className="text-amber-300 fill-amber-300" />
                    <span className="font-mono text-[0.60rem] font-black tracking-wider uppercase">
                      {member.badgeTitle || "MASTER ARCHITECT"}
                    </span>
                  </div>
                );
                avatarRing = "ring-4 ring-purple-400 ring-offset-2 border-2 border-purple-500 bg-purple-50";
              } else if (isEmerald) {
                cardClass = "bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0] border-2 border-emerald-400 shadow-[0_12px_35px_rgba(16,185,129,0.25)] ring-2 ring-emerald-300/70";
                topBar = <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600" />;
                badgePill = (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <Wrench size={11} className="text-white" />
                    <span className="font-mono text-[0.60rem] font-black tracking-wider uppercase">
                      {member.badgeTitle || "SERVICE LAB STAR"}
                    </span>
                  </div>
                );
                avatarRing = "ring-4 ring-emerald-400 ring-offset-2 border-2 border-emerald-500 bg-emerald-50";
              } else if (isCustom) {
                cardClass = "bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] border-2 border-orange-400 shadow-[0_12px_35px_rgba(249,115,22,0.25)] ring-2 ring-orange-300/70";
                topBar = <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#F15A24] via-amber-400 to-[#F15A24]" />;
                badgePill = (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F15A24] to-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <Flame size={11} className="text-yellow-300 fill-yellow-300" />
                    <span className="font-mono text-[0.60rem] font-black tracking-wider uppercase">
                      {member.badgeTitle || "SPECIAL HONOR"}
                    </span>
                  </div>
                );
                avatarRing = "ring-4 ring-orange-400 ring-offset-2 border-2 border-orange-500 bg-orange-50";
              }

              return (
                <div
                  key={member.id}
                  className={`min-w-[260px] sm:min-w-0 flex-shrink-0 sm:flex-shrink snap-center group rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left relative overflow-hidden ${cardClass}`}
                >
                  {topBar}

                  <div>
                    {/* Top Tag / Honor Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {badgePill ? (
                        badgePill
                      ) : (
                        <span className="font-mono text-[0.60rem] font-bold tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase group-hover:bg-[#FFF2EB] group-hover:text-[#F15A24] transition-colors">
                          {member.tag || "SHOWROOM SPECIALIST"}
                        </span>
                      )}

                      {isGold ? (
                        <Sparkles size={16} className="text-amber-500 animate-bounce" />
                      ) : isCyan ? (
                        <PhoneCall size={14} className="text-sky-600" />
                      ) : isPurple ? (
                        <Zap size={14} className="text-purple-600" />
                      ) : isEmerald ? (
                        <Award size={14} className="text-emerald-600" />
                      ) : (
                        <Cpu size={14} className="text-slate-400 group-hover:text-[#F15A24] transition-colors" />
                      )}
                    </div>

                    {/* Member Photo, Name & Department */}
                    <div className="flex items-center gap-3.5">
                      <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden relative flex-shrink-0 transition-all shadow-md ${avatarRing}`}>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.retried) {
                              target.dataset.retried = "1";
                              target.src = "https://www.globalcomputerseluru.com/assets/" + target.src.split("/").pop();
                            }
                          }}
                        />
                        {statusDot}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h5 className={`font-heading leading-tight transition-colors ${
                            isGold
                              ? "font-black text-[1.12rem] sm:text-[1.20rem] text-amber-950"
                              : isCyan
                              ? "font-black text-[1.12rem] sm:text-[1.20rem] text-sky-950"
                              : isPurple
                              ? "font-black text-[1.12rem] sm:text-[1.20rem] text-purple-950"
                              : isEmerald
                              ? "font-black text-[1.12rem] sm:text-[1.20rem] text-emerald-950"
                              : "font-extrabold text-[1.1rem] sm:text-[1.18rem] text-[#0E1117] group-hover:text-[#F15A24]"
                          }`}>
                            {member.name}
                          </h5>
                          {isGold && <Award size={16} className="text-amber-600 fill-amber-400 flex-shrink-0" />}
                        </div>

                        <span className={`font-mono text-[0.68rem] sm:text-[0.72rem] block mt-1 ${
                          isGold
                            ? "font-bold text-amber-800"
                            : isCyan
                            ? "font-bold text-sky-800"
                            : isPurple
                            ? "font-bold text-purple-800"
                            : isEmerald
                            ? "font-bold text-emerald-800"
                            : "font-semibold text-slate-500"
                        }`}>
                          {member.department}
                        </span>
                      </div>
                    </div>

                    {/* Bio / Achievement Note if provided */}
                    {member.bio && (
                      <p className="mt-3 text-[0.72rem] text-slate-600 italic bg-white/70 backdrop-blur-xs p-2 rounded-lg border border-black/[0.04] line-clamp-2">
                        "{member.bio}"
                      </p>
                    )}
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
